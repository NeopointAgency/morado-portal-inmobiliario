import { readItems, readSingleton, aggregate } from '@directus/sdk';
import { directus } from './directus';
import type { Asesor, ConfiguracionSitio, Operacion, Propiedad, TipoPropiedad } from './types';

export const POR_PAGINA = 12;

// Campos que necesita una tarjeta de listado. No traer más.
const CAMPOS_TARJETA = [
  'id',
  'titulo',
  'slug',
  'precio',
  'moneda',
  'operacion',
  'estatus',
  'tipo',
  'recamaras',
  'banos',
  'estacionamientos',
  'm2_terreno',
  'm2_construccion',
  'zona',
  'ciudad',
  'imagen_principal',
] as const;

export interface FiltrosBusqueda {
  ciudad?: string;
  zona?: string;
  operacion?: Operacion;
  tipo?: TipoPropiedad;
  precio_min?: number;
  precio_max?: number;
  recamaras?: number;
  banos?: number;
  pagina: number;
}

/** Query params → filtros tipados. Ignora valores vacíos o no numéricos. */
export function filtrosDesdeParams(params: URLSearchParams): FiltrosBusqueda {
  const num = (clave: string): number | undefined => {
    const v = Number(params.get(clave));
    return Number.isFinite(v) && v > 0 ? v : undefined;
  };
  const str = (clave: string): string | undefined => params.get(clave)?.trim() || undefined;

  return {
    ciudad: str('ciudad'),
    zona: str('zona'),
    operacion: str('operacion') as Operacion | undefined,
    tipo: str('tipo') as TipoPropiedad | undefined,
    precio_min: num('precio_min'),
    precio_max: num('precio_max'),
    recamaras: num('recamaras'),
    banos: num('banos'),
    pagina: Math.max(1, num('pagina') ?? 1),
  };
}

/** Filtros tipados → filtro de Directus. Siempre del lado del servidor. */
function filtroDirectus(f: FiltrosBusqueda): Record<string, unknown> {
  const filtro: Record<string, unknown> = {
    // Nunca listar vendidas/rentadas salvo petición explícita
    estatus: { _nin: ['vendida', 'rentada'] },
  };
  if (f.ciudad) filtro.ciudad = { _eq: f.ciudad };
  if (f.zona) filtro.zona = { _eq: f.zona };
  if (f.operacion) filtro.operacion = { _eq: f.operacion };
  if (f.tipo) filtro.tipo = { _eq: f.tipo };
  if (f.precio_min || f.precio_max) {
    filtro.precio = {
      ...(f.precio_min ? { _gte: f.precio_min } : {}),
      ...(f.precio_max ? { _lte: f.precio_max } : {}),
    };
  }
  if (f.recamaras) filtro.recamaras = { _gte: f.recamaras };
  if (f.banos) filtro.banos = { _gte: f.banos };
  return filtro;
}

export interface ResultadoBusqueda {
  items: Propiedad[];
  total: number;
  pagina: number;
  totalPaginas: number;
}

export async function buscarPropiedades(f: FiltrosBusqueda): Promise<ResultadoBusqueda> {
  const filter = filtroDirectus(f);

  const [items, conteo] = await Promise.all([
    directus.request(
      readItems('propiedades', {
        fields: [...CAMPOS_TARJETA],
        filter,
        sort: ['-date_created'],
        limit: POR_PAGINA,
        offset: (f.pagina - 1) * POR_PAGINA,
      })
    ),
    directus.request(aggregate('propiedades', { aggregate: { count: '*' }, query: { filter } })),
  ]);

  const total = Number(conteo[0]?.count ?? 0);
  return {
    items: items as Propiedad[],
    total,
    pagina: f.pagina,
    totalPaginas: Math.max(1, Math.ceil(total / POR_PAGINA)),
  };
}

export async function propiedadPorSlug(slug: string): Promise<Propiedad | null> {
  const items = await directus.request(
    readItems('propiedades', {
      fields: ['*', { asesor: ['*'] }, { galeria: ['id', 'directus_files_id'] }],
      filter: { slug: { _eq: slug } },
      limit: 1,
    })
  );
  return (items[0] as Propiedad) ?? null;
}

export async function propiedadesDeAsesor(asesorId: string): Promise<Propiedad[]> {
  return (await directus.request(
    readItems('propiedades', {
      fields: [...CAMPOS_TARJETA],
      filter: {
        asesor: { _eq: asesorId },
        estatus: { _nin: ['vendida', 'rentada'] },
      },
      sort: ['-date_created'],
      limit: 50,
    })
  )) as Propiedad[];
}

export async function asesoresActivos(): Promise<Asesor[]> {
  return (await directus.request(
    readItems('asesores', {
      fields: ['*'],
      filter: { activo: { _eq: true } },
      sort: ['nombre'],
    })
  )) as Asesor[];
}

export async function configuracionSitio(): Promise<ConfiguracionSitio | null> {
  try {
    return (await directus.request(
      readSingleton('configuracion_sitio', {
        fields: ['*', { propiedades_destacadas: ['id', { propiedades_id: [...CAMPOS_TARJETA] }] }],
      })
    )) as ConfiguracionSitio;
  } catch {
    return null;
  }
}

/** Destacadas del singleton; si no hay, cae al toggle `destacada`. */
export async function propiedadesDestacadas(config: ConfiguracionSitio | null): Promise<Propiedad[]> {
  const delSingleton = (config?.propiedades_destacadas ?? [])
    .filter((j): j is Exclude<typeof j, number> => typeof j === 'object' && j !== null)
    .map((j) => j.propiedades_id)
    .filter((p) => p && !['vendida', 'rentada'].includes(p.estatus));

  if (delSingleton.length > 0) return delSingleton;

  return (await directus.request(
    readItems('propiedades', {
      fields: [...CAMPOS_TARJETA],
      filter: { destacada: { _eq: true }, estatus: { _nin: ['vendida', 'rentada'] } },
      sort: ['sort', '-date_created'],
      limit: 6,
    })
  )) as Propiedad[];
}
