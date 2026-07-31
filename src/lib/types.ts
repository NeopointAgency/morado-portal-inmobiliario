// Tipos de las colecciones de Directus.
// Espejo de directus-schema-morado.md — si cambia el esquema, cambia aquí.

export type Operacion = 'venta' | 'renta';
export type Estatus = 'disponible' | 'apartada' | 'vendida' | 'rentada';
export type TipoPropiedad = 'casa' | 'departamento' | 'terreno' | 'local' | 'bodega' | 'oficina';
export type Moneda = 'MXN' | 'USD';

export interface Asesor {
  id: string;
  nombre: string;
  puesto: string | null;
  foto: string | null; // UUID de directus_files
  telefono: string | null;
  /** E.164 sin espacios ni signos: 5214611234567 */
  whatsapp: string;
  email: string | null;
  bio: string | null;
  activo: boolean;
}

export interface GaleriaItem {
  id: number;
  directus_files_id: string; // UUID de directus_files
}

export interface Propiedad {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string | null;
  precio: number;
  moneda: Moneda;

  operacion: Operacion;
  estatus: Estatus;
  tipo: TipoPropiedad;
  destacada: boolean;

  recamaras: number | null;
  banos: number | null;
  estacionamientos: number | null;
  m2_terreno: number | null;
  m2_construccion: number | null;
  antiguedad: number | null;
  amenidades: string[] | null;

  zona: string | null;
  ciudad: string | null;
  direccion: string | null;
  ubicacion: { type: 'Point'; coordinates: [number, number] } | null;
  mostrar_direccion_exacta: boolean;

  imagen_principal: string | null; // UUID de directus_files
  galeria: GaleriaItem[] | number[] | null;
  video_url: string | null;
  asesor: Asesor | string | null;

  meta_titulo: string | null;
  meta_descripcion: string | null;

  date_created: string;
  date_updated: string | null;
  sort: number | null;
}

export interface DestacadaJunction {
  id: number;
  propiedades_id: Propiedad;
}

export interface ConfiguracionSitio {
  id: number;
  hero_imagen: string | null;
  hero_titular: string | null;
  hero_subtitulo: string | null;
  hero_cta_texto: string | null;
  propiedades_destacadas: DestacadaJunction[] | number[] | null;
  telefono_general: string | null;
  whatsapp_general: string | null;
  email_contacto: string | null;
  direccion_oficina: string | null;
  redes_sociales: { nombre: string; url: string }[] | null;
  logo: string | null;
  og_image: string | null;
}

export interface Lead {
  id: string;
  nombre: string;
  telefono: string;
  email: string | null;
  mensaje: string | null;
  propiedad: string | null;
  asesor: string | null;
  origen: 'ficha' | 'contacto' | 'whatsapp';
  estatus: 'nuevo' | 'contactado' | 'descartado';
}

export interface Testimonio {
  id: number;
  texto: string;
  autor: string;
  estrellas: number;
  activo: boolean;
  sort: number | null;
}

export interface Schema {
  testimonios: Testimonio[];
  asesores: Asesor[];
  propiedades: Propiedad[];
  configuracion_sitio: ConfiguracionSitio; // singleton
  leads: Lead[];
  propiedades_files: GaleriaItem[];
  configuracion_sitio_propiedades: DestacadaJunction[];
}

// Valores fijos de los dropdowns de Directus. Deben coincidir 1:1 con el esquema.
export const OPERACIONES: { valor: Operacion; etiqueta: string }[] = [
  { valor: 'venta', etiqueta: 'Comprar' },
  { valor: 'renta', etiqueta: 'Rentar' },
];

export const TIPOS: { valor: TipoPropiedad; etiqueta: string }[] = [
  { valor: 'casa', etiqueta: 'Casa' },
  { valor: 'departamento', etiqueta: 'Departamento' },
  { valor: 'terreno', etiqueta: 'Terreno' },
  { valor: 'local', etiqueta: 'Local comercial' },
  { valor: 'bodega', etiqueta: 'Bodega' },
  { valor: 'oficina', etiqueta: 'Oficina' },
];

export const CIUDADES: { valor: string; etiqueta: string }[] = [
  { valor: 'celaya', etiqueta: 'Celaya' },
  { valor: 'queretaro', etiqueta: 'Querétaro' },
  { valor: 'san_miguel_de_allende', etiqueta: 'San Miguel de Allende' },
  { valor: 'apaseo_el_grande', etiqueta: 'Apaseo el Grande' },
  { valor: 'villagran', etiqueta: 'Villagrán' },
  { valor: 'cortazar', etiqueta: 'Cortazar' },
];
