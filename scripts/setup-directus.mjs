/**
 * Crea el esquema completo del portal Morado en una instancia de Directus 11:
 * colecciones, relaciones, carpeta de archivos, presets de imagen, roles,
 * políticas y el usuario api_front con token estático.
 *
 * Idempotente: lo que ya existe se salta, se puede correr varias veces.
 *
 * Uso:
 *   DIRECTUS_URL=https://... DIRECTUS_ADMIN_TOKEN=... node scripts/setup-directus.mjs [--seed]
 *
 * --seed agrega un asesor y dos propiedades de demostración (título con [DEMO]).
 */

import { randomBytes } from 'node:crypto';

const URL_BASE = process.env.DIRECTUS_URL?.replace(/\/$/, '');
const TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
const SEED = process.argv.includes('--seed');

if (!URL_BASE || !TOKEN) {
  console.error('Faltan DIRECTUS_URL y/o DIRECTUS_ADMIN_TOKEN');
  process.exit(1);
}

async function api(metodo, ruta, cuerpo) {
  const res = await fetch(`${URL_BASE}${ruta}`, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(cuerpo ? { 'Content-Type': 'application/json' } : {}),
    },
    body: cuerpo ? JSON.stringify(cuerpo) : undefined,
  });
  const texto = await res.text();
  let json;
  try {
    json = texto ? JSON.parse(texto) : {};
  } catch {
    json = { raw: texto };
  }
  if (!res.ok) {
    const err = new Error(`${metodo} ${ruta} → ${res.status}: ${JSON.stringify(json.errors ?? json).slice(0, 400)}`);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json.data;
}

const log = (m) => console.log(`  ${m}`);

// ---------------------------------------------------------------- utilidades

async function existeColeccion(nombre) {
  try {
    await api('GET', `/collections/${nombre}`);
    return true;
  } catch (e) {
    if (e.status === 403 || e.status === 404) return false;
    throw e;
  }
}

async function crearColeccion(def) {
  if (await existeColeccion(def.collection)) {
    log(`colección ${def.collection} ya existe, se salta`);
    return;
  }
  await api('POST', '/collections', def);
  log(`colección ${def.collection} creada`);
}

async function crearRelacion(rel) {
  try {
    await api('POST', '/relations', rel);
    log(`relación ${rel.collection}.${rel.field} → ${rel.related_collection} creada`);
  } catch (e) {
    if (String(e.message).includes('already') || e.status === 400) {
      log(`relación ${rel.collection}.${rel.field} ya existía (${e.status})`);
    } else {
      throw e;
    }
  }
}

// Atajos para definir campos
const pkUuid = {
  field: 'id',
  type: 'uuid',
  meta: { hidden: true, readonly: true, interface: 'input', special: ['uuid'] },
  schema: { is_primary_key: true, length: 36, has_auto_increment: false },
};
const pkAuto = {
  field: 'id',
  type: 'integer',
  meta: { hidden: true },
  schema: { is_primary_key: true, has_auto_increment: true },
};
const texto = (field, extra = {}, schema = {}) => ({
  field,
  type: 'string',
  meta: { interface: 'input', ...extra },
  schema,
});
const dropdown = (field, choices, extra = {}, schema = {}) => ({
  field,
  type: 'string',
  meta: {
    interface: 'select-dropdown',
    options: { choices: choices.map(([text, value]) => ({ text, value })) },
    ...extra,
  },
  schema,
});
const toggle = (field, defecto, extra = {}) => ({
  field,
  type: 'boolean',
  meta: { interface: 'boolean', ...extra },
  schema: { default_value: defecto },
});
const archivo = (field, folder, extra = {}) => ({
  field,
  type: 'uuid',
  meta: { interface: 'file-image', special: ['file'], options: folder ? { folder } : {}, ...extra },
});
const fechaCreada = { field: 'date_created', type: 'timestamp', meta: { special: ['date-created'], interface: 'datetime', readonly: true, hidden: true, width: 'half' } };
const fechaActualizada = { field: 'date_updated', type: 'timestamp', meta: { special: ['date-updated'], interface: 'datetime', readonly: true, hidden: true, width: 'half' } };

// ---------------------------------------------------------------- ejecución

console.log(`\nConfigurando Morado en ${URL_BASE}\n`);

// 0. Carpeta de archivos propia (la instancia es compartida entre clientes)
console.log('Carpeta de archivos');
let carpetas = await api('GET', '/folders?filter[name][_eq]=Morado');
let carpetaMorado = carpetas[0]?.id;
if (!carpetaMorado) {
  carpetaMorado = (await api('POST', '/folders', { name: 'Morado' })).id;
  log('carpeta "Morado" creada');
} else {
  log('carpeta "Morado" ya existe');
}

// 1. asesores
console.log('Colección asesores');
await crearColeccion({
  collection: 'asesores',
  meta: { icon: 'support_agent', note: 'Equipo de Morado. No son usuarios del sistema.', display_template: '{{nombre}}' },
  schema: {},
  fields: [
    pkUuid,
    texto('nombre', { required: true, width: 'half' }),
    texto('puesto', { width: 'half', note: 'Ej. "Asesor Inmobiliario Senior"' }),
    archivo('foto', carpetaMorado, { note: 'Requerida para la ficha' }),
    texto('telefono', { width: 'half', note: 'Para mostrar. Formato libre' }),
    texto('whatsapp', {
      required: true,
      width: 'half',
      note: 'E.164 sin espacios ni signos: 5214611234567',
      validation: { _and: [{ whatsapp: { _regex: '^52[0-9]{10,11}$' } }] },
      validation_message: 'Debe ser 52 + 10 u 11 dígitos, sin espacios ni signos. Ej: 5214611234567',
    }),
    texto('email', {
      width: 'half',
      validation: { _and: [{ email: { _regex: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' } }] },
      validation_message: 'Correo no válido',
    }),
    { field: 'bio', type: 'text', meta: { interface: 'input-multiline', note: '2–3 líneas' } },
    toggle('activo', true, { note: 'Si se va un asesor, se desactiva sin borrar sus propiedades' }),
  ],
});
await crearRelacion({ collection: 'asesores', field: 'foto', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });

// 2. propiedades
console.log('Colección propiedades');
await crearColeccion({
  collection: 'propiedades',
  meta: {
    icon: 'home_work',
    display_template: '{{titulo}}',
    note: 'El corazón del portal. Cada propiedad tiene su asesor asignado.',
    sort_field: 'sort',
  },
  schema: {},
  fields: [
    pkUuid,
    texto('titulo', { required: true }),
    texto('slug', { required: true, note: 'URL: /propiedades/{slug}. Minúsculas y guiones.', options: { slug: true } }, { is_unique: true }),
    { field: 'descripcion', type: 'text', meta: { interface: 'input-rich-text-html' } },
    { field: 'precio', type: 'decimal', meta: { interface: 'input', required: true, width: 'half', note: 'Solo número, sin formato' }, schema: { numeric_precision: 12, numeric_scale: 2 } },
    dropdown('moneda', [['MXN', 'MXN'], ['USD', 'USD']], { width: 'half' }, { default_value: 'MXN' }),
    dropdown('operacion', [['Venta', 'venta'], ['Renta', 'renta']], { required: true, width: 'half' }),
    dropdown('estatus', [['Disponible', 'disponible'], ['Apartada', 'apartada'], ['Vendida', 'vendida'], ['Rentada', 'rentada']], { width: 'half' }, { default_value: 'disponible' }),
    dropdown('tipo', [['Casa', 'casa'], ['Departamento', 'departamento'], ['Terreno', 'terreno'], ['Local', 'local'], ['Bodega', 'bodega'], ['Oficina', 'oficina']], { required: true, width: 'half' }),
    toggle('destacada', false, { width: 'half', note: 'Aparece en la sección de destacadas del home' }),
    { field: 'recamaras', type: 'integer', meta: { interface: 'input', width: 'half' } },
    { field: 'banos', type: 'decimal', meta: { interface: 'input', width: 'half', note: 'Acepta medios baños: 2.5' }, schema: { numeric_precision: 4, numeric_scale: 1 } },
    { field: 'estacionamientos', type: 'integer', meta: { interface: 'input', width: 'half' } },
    { field: 'm2_terreno', type: 'decimal', meta: { interface: 'input', width: 'half' }, schema: { numeric_precision: 10, numeric_scale: 2 } },
    { field: 'm2_construccion', type: 'decimal', meta: { interface: 'input', width: 'half' }, schema: { numeric_precision: 10, numeric_scale: 2 } },
    { field: 'antiguedad', type: 'integer', meta: { interface: 'input', width: 'half', note: 'Años' } },
    { field: 'amenidades', type: 'json', meta: { interface: 'tags', special: ['cast-json'], note: 'Alberca, jardín, seguridad…' } },
    dropdown('zona', [['Centro', 'centro'], ['Norte', 'norte'], ['Sur', 'sur'], ['Oriente', 'oriente'], ['Poniente', 'poniente']], { width: 'half', options: { allowOther: true, choices: undefined } }),
    dropdown('ciudad', [['Celaya', 'celaya'], ['Querétaro', 'queretaro'], ['Apaseo el Grande', 'apaseo_el_grande'], ['Villagrán', 'villagran'], ['Cortazar', 'cortazar']], { width: 'half' }),
    texto('direccion', { note: 'Referencia interna, no siempre pública' }),
    toggle('mostrar_direccion_exacta', false, { note: 'Muchos vendedores no quieren dirección pública' }),
    archivo('imagen_principal', carpetaMorado, { required: true, note: 'La que sale en el listado' }),
    { field: 'galeria', type: 'alias', meta: { interface: 'files', special: ['files'], note: 'Arrastra para ordenar' } },
    texto('video_url', { note: 'YouTube o Vimeo, opcional' }),
    {
      field: 'asesor',
      type: 'uuid',
      meta: {
        interface: 'select-dropdown-m2o',
        special: ['m2o'],
        required: true,
        options: { template: '{{nombre}}' },
        note: 'El WhatsApp de la ficha apunta a este asesor',
      },
    },
    texto('meta_titulo', { note: 'SEO. Si se deja vacío se genera del título' }),
    { field: 'meta_descripcion', type: 'text', meta: { interface: 'input-multiline', note: 'SEO' } },
    { field: 'sort', type: 'integer', meta: { hidden: true, interface: 'input' } },
    fechaCreada,
    fechaActualizada,
    { field: 'user_created', type: 'uuid', meta: { special: ['user-created'], interface: 'select-dropdown-m2o', readonly: true, hidden: true } },
  ],
});
await crearRelacion({ collection: 'propiedades', field: 'imagen_principal', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
await crearRelacion({ collection: 'propiedades', field: 'asesor', related_collection: 'asesores', schema: { on_delete: 'NO ACTION' } });
await crearRelacion({ collection: 'propiedades', field: 'user_created', related_collection: 'directus_users', schema: { on_delete: 'SET NULL' } });

// 2b. galería M2M propiedades ↔ files
console.log('Galería (M2M a archivos)');
await crearColeccion({
  collection: 'propiedades_files',
  meta: { hidden: true, icon: 'import_export' },
  schema: {},
  fields: [
    pkAuto,
    { field: 'propiedades_id', type: 'uuid', meta: { hidden: true } },
    { field: 'directus_files_id', type: 'uuid', meta: { hidden: true } },
    { field: 'sort', type: 'integer', meta: { hidden: true } },
  ],
});
await crearRelacion({
  collection: 'propiedades_files',
  field: 'directus_files_id',
  related_collection: 'directus_files',
  meta: { junction_field: 'propiedades_id' },
  schema: { on_delete: 'CASCADE' },
});
await crearRelacion({
  collection: 'propiedades_files',
  field: 'propiedades_id',
  related_collection: 'propiedades',
  meta: { one_field: 'galeria', junction_field: 'directus_files_id', sort_field: 'sort', one_deselect_action: 'delete' },
  schema: { on_delete: 'CASCADE' },
});

// 3. configuracion_sitio (singleton)
console.log('Colección configuracion_sitio (singleton)');
await crearColeccion({
  collection: 'configuracion_sitio',
  meta: { icon: 'settings', singleton: true, note: 'Héroe, contacto general, destacadas, logo' },
  schema: {},
  fields: [
    pkAuto,
    archivo('hero_imagen', carpetaMorado),
    texto('hero_titular'),
    { field: 'hero_subtitulo', type: 'text', meta: { interface: 'input-multiline' } },
    texto('hero_cta_texto', { width: 'half' }),
    { field: 'propiedades_destacadas', type: 'alias', meta: { interface: 'list-m2m', special: ['m2m'], options: { template: '{{propiedades_id.titulo}}' } } },
    texto('telefono_general', { width: 'half' }),
    texto('whatsapp_general', {
      width: 'half',
      note: 'E.164 sin espacios: 5214611234567',
      validation: { _and: [{ whatsapp_general: { _regex: '^52[0-9]{10,11}$' } }] },
      validation_message: 'Debe ser 52 + 10 u 11 dígitos',
    }),
    texto('email_contacto', { width: 'half' }),
    { field: 'direccion_oficina', type: 'text', meta: { interface: 'input-multiline' } },
    {
      field: 'redes_sociales',
      type: 'json',
      meta: {
        interface: 'list',
        special: ['cast-json'],
        options: {
          fields: [
            { field: 'nombre', name: 'nombre', type: 'string', meta: { interface: 'input', field: 'nombre', type: 'string' } },
            { field: 'url', name: 'url', type: 'string', meta: { interface: 'input', field: 'url', type: 'string' } },
          ],
        },
      },
    },
    archivo('logo', carpetaMorado),
    archivo('og_image', carpetaMorado, { note: 'Imagen al compartir el sitio en redes/WhatsApp' }),
  ],
});
await crearRelacion({ collection: 'configuracion_sitio', field: 'hero_imagen', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
await crearRelacion({ collection: 'configuracion_sitio', field: 'logo', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });
await crearRelacion({ collection: 'configuracion_sitio', field: 'og_image', related_collection: 'directus_files', schema: { on_delete: 'SET NULL' } });

console.log('Destacadas (M2M)');
await crearColeccion({
  collection: 'configuracion_sitio_propiedades',
  meta: { hidden: true, icon: 'import_export' },
  schema: {},
  fields: [
    pkAuto,
    { field: 'configuracion_sitio_id', type: 'integer', meta: { hidden: true } },
    { field: 'propiedades_id', type: 'uuid', meta: { hidden: true } },
    { field: 'sort', type: 'integer', meta: { hidden: true } },
  ],
});
await crearRelacion({
  collection: 'configuracion_sitio_propiedades',
  field: 'propiedades_id',
  related_collection: 'propiedades',
  meta: { junction_field: 'configuracion_sitio_id' },
  schema: { on_delete: 'CASCADE' },
});
await crearRelacion({
  collection: 'configuracion_sitio_propiedades',
  field: 'configuracion_sitio_id',
  related_collection: 'configuracion_sitio',
  meta: { one_field: 'propiedades_destacadas', junction_field: 'propiedades_id', sort_field: 'sort', one_deselect_action: 'delete' },
  schema: { on_delete: 'CASCADE' },
});

// 4. leads
console.log('Colección leads');
await crearColeccion({
  collection: 'leads',
  meta: {
    icon: 'contact_phone',
    note: 'Capturas del formulario del sitio. Nadie recibe correo: se revisan aquí.',
    display_template: '{{nombre}} — {{telefono}}',
    sort: 4,
  },
  schema: {},
  fields: [
    pkUuid,
    texto('nombre', { required: true, width: 'half' }),
    texto('telefono', { required: true, width: 'half' }),
    texto('email', { width: 'half' }),
    { field: 'mensaje', type: 'text', meta: { interface: 'input-multiline' } },
    {
      field: 'propiedad',
      type: 'uuid',
      meta: { interface: 'select-dropdown-m2o', special: ['m2o'], options: { template: '{{titulo}}' } },
    },
    {
      field: 'asesor',
      type: 'uuid',
      meta: { interface: 'select-dropdown-m2o', special: ['m2o'], options: { template: '{{nombre}}' } },
    },
    dropdown('origen', [['Ficha de propiedad', 'ficha'], ['Página de contacto', 'contacto'], ['WhatsApp', 'whatsapp']], { width: 'half' }, { default_value: 'ficha' }),
    dropdown('estatus', [['Nuevo', 'nuevo'], ['Contactado', 'contactado'], ['Descartado', 'descartado']], { width: 'half' }, { default_value: 'nuevo' }),
    fechaCreada,
  ],
});
await crearRelacion({ collection: 'leads', field: 'propiedad', related_collection: 'propiedades', schema: { on_delete: 'SET NULL' } });
await crearRelacion({ collection: 'leads', field: 'asesor', related_collection: 'asesores', schema: { on_delete: 'SET NULL' } });

// 5. Presets de imagen (globales; se agregan sin pisar los existentes)
console.log('Presets de imagen');
const ajustes = await api('GET', '/settings');
const presetsActuales = ajustes.storage_asset_presets ?? [];
const presetsMorado = [
  { key: 'thumb', fit: 'cover', width: 600, height: 400, quality: 80, format: 'webp', withoutEnlargement: false, transforms: [] },
  { key: 'card', fit: 'cover', width: 800, height: 600, quality: 80, format: 'webp', withoutEnlargement: false, transforms: [] },
  { key: 'hero', fit: 'cover', width: 1920, height: 1080, quality: 85, format: 'webp', withoutEnlargement: false, transforms: [] },
  { key: 'galeria', fit: 'contain', width: 1600, height: 1600, quality: 85, format: 'webp', withoutEnlargement: true, transforms: [] },
];
const faltantes = presetsMorado.filter((p) => !presetsActuales.some((e) => e.key === p.key));
if (faltantes.length > 0) {
  await api('PATCH', '/settings', { storage_asset_presets: [...presetsActuales, ...faltantes] });
  log(`presets agregados: ${faltantes.map((p) => p.key).join(', ')}`);
} else {
  log('presets ya existían');
}

// 6. Acceso público de lectura a los archivos de la carpeta Morado
//    (el navegador pide /assets/{id} sin token para mostrar las imágenes)
console.log('Permiso público para /assets');
const politicas = await api('GET', '/policies?limit=-1&fields=id,name');
const politicaPublica = politicas.find((p) => /public/i.test(p.name ?? ''));
if (!politicaPublica) {
  log('AVISO: no encontré la política pública; agrega lectura de directus_files a mano');
} else {
  const permisosPub = await api(
    'GET',
    `/permissions?filter[policy][_eq]=${politicaPublica.id}&filter[collection][_eq]=directus_files&limit=-1`
  );
  if (permisosPub.length === 0) {
    await api('POST', '/permissions', {
      policy: politicaPublica.id,
      collection: 'directus_files',
      action: 'read',
      // Solo los archivos de Morado: la instancia se comparte con otros clientes
      permissions: { folder: { _eq: carpetaMorado } },
      fields: ['id', 'type', 'width', 'height', 'title', 'filename_download', 'modified_on'],
    });
    log('lectura pública de archivos (solo carpeta Morado) agregada');
  } else {
    log('la política pública ya tenía permiso sobre directus_files, no se toca');
  }
}

// 7. Política + rol + usuario api_front (token estático para Astro)
console.log('Rol api_front');
async function asegurar(ruta, filtro, crear) {
  const existentes = await api('GET', `${ruta}?filter[name][_eq]=${filtro}&limit=1`);
  if (existentes.length > 0) return { ...existentes[0], _existia: true };
  return await api('POST', ruta, crear);
}

const politicaFront = await asegurar('/policies', 'api_front', {
  name: 'api_front',
  icon: 'badge',
  description: 'Lectura del catálogo y alta de leads. La usa el servidor de Astro.',
  admin_access: false,
  app_access: false,
});

if (!politicaFront._existia) {
  const permisosFront = [
    { collection: 'asesores', action: 'read', fields: ['*'] },
    { collection: 'propiedades', action: 'read', fields: ['*'] },
    { collection: 'propiedades_files', action: 'read', fields: ['*'] },
    { collection: 'configuracion_sitio', action: 'read', fields: ['*'] },
    { collection: 'configuracion_sitio_propiedades', action: 'read', fields: ['*'] },
    {
      collection: 'leads',
      action: 'create',
      fields: ['nombre', 'telefono', 'email', 'mensaje', 'propiedad', 'asesor', 'origen', 'estatus'],
    },
  ];
  for (const p of permisosFront) {
    await api('POST', '/permissions', { policy: politicaFront.id, permissions: {}, ...p });
  }
  log(`política api_front creada con ${permisosFront.length} permisos`);
} else {
  log('política api_front ya existía');
}

const rolFront = await asegurar('/roles', 'api_front', {
  name: 'api_front',
  icon: 'smart_toy',
  description: 'Rol del token del front (Astro)',
});

// Vincular política ↔ rol (directus_access)
const rolConPoliticas = await api('GET', `/roles/${rolFront.id}?fields=id,policies.policy`);
const yaVinculada = (rolConPoliticas.policies ?? []).some((a) => (a.policy?.id ?? a.policy) === politicaFront.id);
if (!yaVinculada) {
  await api('PATCH', `/roles/${rolFront.id}`, {
    policies: { create: [{ role: rolFront.id, policy: { id: politicaFront.id } }], update: [], delete: [] },
  });
  log('política vinculada al rol');
}

// Usuario con token estático
const usuarios = await api('GET', `/users?filter[email][_eq]=api-front@morado.mx&limit=1`);
let tokenFront;
if (usuarios.length === 0) {
  tokenFront = randomBytes(24).toString('base64url');
  await api('POST', '/users', {
    first_name: 'API',
    last_name: 'Front Morado',
    email: 'api-front@morado.mx',
    role: rolFront.id,
    token: tokenFront,
    status: 'active',
  });
  log('usuario api-front@morado.mx creado con token estático');
} else {
  tokenFront = '(ya existía; el token no se puede releer — regenera uno en el usuario api-front@morado.mx si lo perdiste)';
  log('usuario api-front@morado.mx ya existía');
}

// 8. Política + rol admin_morado (para el administrador del cliente)
console.log('Rol admin_morado');
const politicaAdmin = await asegurar('/policies', 'admin_morado', {
  name: 'admin_morado',
  icon: 'verified_user',
  description: 'CRUD total de las colecciones de Morado. Sin acceso a otras colecciones.',
  admin_access: false,
  app_access: true,
});
if (!politicaAdmin._existia) {
  const colecciones = ['asesores', 'propiedades', 'propiedades_files', 'configuracion_sitio', 'configuracion_sitio_propiedades', 'leads'];
  for (const collection of colecciones) {
    for (const action of ['create', 'read', 'update', 'delete']) {
      await api('POST', '/permissions', { policy: politicaAdmin.id, collection, action, fields: ['*'], permissions: {} });
    }
  }
  // Archivos: subir sin restricción, ver/editar/borrar solo la carpeta Morado
  await api('POST', '/permissions', { policy: politicaAdmin.id, collection: 'directus_files', action: 'create', fields: ['*'], permissions: {} });
  for (const action of ['read', 'update', 'delete']) {
    await api('POST', '/permissions', {
      policy: politicaAdmin.id,
      collection: 'directus_files',
      action,
      fields: ['*'],
      permissions: { folder: { _eq: carpetaMorado } },
    });
  }
  await api('POST', '/permissions', { policy: politicaAdmin.id, collection: 'directus_folders', action: 'read', fields: ['*'], permissions: {} });
  log('política admin_morado creada');
} else {
  log('política admin_morado ya existía');
}
const rolAdmin = await asegurar('/roles', 'admin_morado', {
  name: 'admin_morado',
  icon: 'real_estate_agent',
  description: 'Administrador de Morado: carga propiedades y revisa leads',
});
const rolAdminPol = await api('GET', `/roles/${rolAdmin.id}?fields=id,policies.policy`);
if (!(rolAdminPol.policies ?? []).some((a) => (a.policy?.id ?? a.policy) === politicaAdmin.id)) {
  await api('PATCH', `/roles/${rolAdmin.id}`, {
    policies: { create: [{ role: rolAdmin.id, policy: { id: politicaAdmin.id } }], update: [], delete: [] },
  });
  log('política vinculada al rol');
}

// 9. Datos de demostración
if (SEED) {
  console.log('Datos de demostración');
  const asesoresDemo = await api('GET', '/items/asesores?filter[email][_eq]=demo@morado.mx&limit=1');
  if (asesoresDemo.length > 0) {
    log('ya había datos demo, se salta');
  } else {
    async function importarImagen(url, title) {
      try {
        const f = await api('POST', '/files/import', { url, data: { title, folder: carpetaMorado } });
        return f.id;
      } catch (e) {
        log(`no se pudo importar imagen (${e.status}); se sigue sin ella`);
        return null;
      }
    }
    const fotoAsesor = await importarImagen('https://picsum.photos/seed/asesora/800/800', '[DEMO] Foto asesora');
    const fotoCasa = await importarImagen('https://picsum.photos/seed/casa1/1920/1280', '[DEMO] Casa fachada');
    const fotoDepa = await importarImagen('https://picsum.photos/seed/depa1/1920/1280', '[DEMO] Departamento');

    const asesora = await api('POST', '/items/asesores', {
      nombre: 'María Demo',
      puesto: 'Asesora Inmobiliaria',
      whatsapp: '5214611234567',
      telefono: '461 123 4567',
      email: 'demo@morado.mx',
      bio: 'Asesora de demostración. Bórrame cuando haya datos reales.',
      activo: true,
      ...(fotoAsesor ? { foto: fotoAsesor } : {}),
    });

    await api('POST', '/items/propiedades', {
      titulo: '[DEMO] Casa en venta en Residencial Los Álamos',
      slug: 'demo-casa-venta-los-alamos-celaya',
      descripcion: '<p>Propiedad de demostración para revisar el portal. Bórrame cuando haya datos reales.</p>',
      precio: 2850000,
      moneda: 'MXN',
      operacion: 'venta',
      estatus: 'disponible',
      tipo: 'casa',
      destacada: true,
      recamaras: 3,
      banos: 2.5,
      estacionamientos: 2,
      m2_terreno: 160,
      m2_construccion: 210,
      amenidades: ['Jardín', 'Seguridad 24h', 'Casa club'],
      zona: 'norte',
      ciudad: 'celaya',
      asesor: asesora.id,
      ...(fotoCasa ? { imagen_principal: fotoCasa } : {}),
    });

    await api('POST', '/items/propiedades', {
      titulo: '[DEMO] Departamento en renta cerca del centro',
      slug: 'demo-departamento-renta-centro-celaya',
      descripcion: '<p>Propiedad de demostración. Bórrame cuando haya datos reales.</p>',
      precio: 12500,
      moneda: 'MXN',
      operacion: 'renta',
      estatus: 'disponible',
      tipo: 'departamento',
      destacada: true,
      recamaras: 2,
      banos: 1,
      estacionamientos: 1,
      m2_construccion: 85,
      amenidades: ['Amueblado', 'Mascotas permitidas'],
      zona: 'centro',
      ciudad: 'celaya',
      asesor: asesora.id,
      ...(fotoDepa ? { imagen_principal: fotoDepa } : {}),
    });

    await api('PATCH', '/items/configuracion_sitio', {
      hero_titular: 'Encuentra tu próxima casa en Celaya',
      hero_subtitulo: 'Casas, departamentos y terrenos con un asesor que te acompaña de principio a fin.',
      hero_cta_texto: 'Ver propiedades',
      telefono_general: '461 000 0000',
      whatsapp_general: '5214610000000',
      email_contacto: 'contacto@morado.mx',
    });
    log('asesora demo + 2 propiedades demo + configuración inicial creadas');
  }
}

console.log('\n================================================================');
console.log('Listo. Datos para el front (.env de Astro / Vercel):');
console.log(`  DIRECTUS_URL=${URL_BASE}`);
console.log(`  DIRECTUS_TOKEN=${tokenFront}`);
console.log('================================================================\n');
