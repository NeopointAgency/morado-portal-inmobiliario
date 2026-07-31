# Esquema Directus — Portal Morado Bienes Raíces

Stack: **Astro (SSR, Vercel) + Directus + Postgres**
Objetivo: portal inmobiliario autoadministrable con asignación de propiedad por asesor.

---

## 1. Colección `asesores`

Se crea **primero**, porque `propiedades` la referencia.

| Campo | Interface / Tipo | Notas |
|---|---|---|
| `id` | UUID (PK) | Automático |
| `nombre` | Input (string) | Requerido |
| `puesto` | Input (string) | Ej. "Asesor Inmobiliario Senior" |
| `foto` | File (image) | Requerido para la ficha |
| `telefono` | Input (string) | Para mostrar. Formato libre |
| `whatsapp` | Input (string) | **E.164 sin espacios ni signos: `5214611234567`**. Validación regex `^52[0-9]{10,11}$`. Si se captura como "461 123 4567" el enlace `wa.me` se rompe |
| `email` | Input (string) | Validación de email |
| `bio` | Textarea | Opcional, 2–3 líneas |
| `activo` | Toggle (boolean) | Default `true`. Si se va un asesor, se desactiva sin borrar propiedades |

> Los asesores **no son usuarios del sistema** en esta fase. Son registros de contenido. Cuando Morado quiera darles acceso, se agrega un campo `usuario` (M2O → `directus_users`) y el rol correspondiente, sin tocar `propiedades` ni `leads`.

---

## 2. Colección `propiedades`

El corazón del portal.

### Identidad

| Campo | Interface / Tipo | Notas |
|---|---|---|
| `id` | UUID (PK) | |
| `titulo` | Input (string) | Requerido |
| `slug` | Input (string) | Único. URL: `/propiedades/{slug}` |
| `descripcion` | WYSIWYG / Markdown | Texto largo |
| `precio` | Input (decimal) | Sin formato, solo número |
| `moneda` | Dropdown | `MXN` (default), `USD` |

### Clasificación

| Campo | Interface / Tipo | Valores |
|---|---|---|
| `operacion` | Dropdown | `venta`, `renta` |
| `estatus` | Dropdown | `disponible`, `apartada`, `vendida`, `rentada` |
| `tipo` | Dropdown | `casa`, `departamento`, `terreno`, `local`, `bodega`, `oficina` |
| `destacada` | Toggle | Para la sección de destacadas del home |

> ⚠️ `operacion`, `estatus` y `tipo` van como **dropdown con valores fijos**, no como texto libre. Si son texto libre, los filtros se rompen en cuanto alguien escriba "Casa" con mayúscula.

### Características

| Campo | Tipo | Notas |
|---|---|---|
| `recamaras` | Integer | Nullable (terrenos no tienen) |
| `banos` | Decimal | Decimal para permitir `2.5` |
| `estacionamientos` | Integer | |
| `m2_terreno` | Decimal | |
| `m2_construccion` | Decimal | Nullable |
| `antiguedad` | Integer | Años. Opcional |
| `amenidades` | Tags / JSON | Alberca, jardín, seguridad, etc. |

### Ubicación

| Campo | Tipo | Notas |
|---|---|---|
| `zona` | Dropdown o M2O → `zonas` | **Dropdown si son <15 zonas.** Si Morado opera en varias ciudades de Guanajuato, hacer colección `zonas` aparte |
| `ciudad` | Dropdown | Celaya, Querétaro, etc. |
| `direccion` | Input (string) | Referencia interna, no siempre pública |
| `ubicacion` | Map (Geometry Point) | Lat/long para el mapa de la ficha |
| `mostrar_direccion_exacta` | Toggle | Muchos vendedores no quieren dirección pública |

### Media y relaciones

| Campo | Tipo | Notas |
|---|---|---|
| `imagen_principal` | File (image) | Requerida. La que sale en el listado |
| `galeria` | Files (M2M) | Orden manual arrastrable |
| `video_url` | Input (string) | YouTube/Vimeo, opcional |
| `asesor` | **M2O → `asesores`** | Requerido. Aquí vive el requisito principal |

### Sistema

| Campo | Tipo | Notas |
|---|---|---|
| `date_created` | Timestamp | Automático |
| `date_updated` | Timestamp | Automático |
| `user_created` | M2O → users | Automático. Sirve para permisos |
| `sort` | Integer | Orden manual en destacadas |

### SEO

| Campo | Tipo |
|---|---|
| `meta_titulo` | Input (string) |
| `meta_descripcion` | Textarea |

---

## 3. Colección `configuracion_sitio` (singleton)

Marcar como **Singleton** en Directus: un solo registro, sin listado. Es lo que resuelve "cambiar el héroe desde el dashboard".

| Campo | Tipo |
|---|---|
| `hero_imagen` | File (image) |
| `hero_titular` | Input (string) |
| `hero_subtitulo` | Textarea |
| `hero_cta_texto` | Input (string) |
| `propiedades_destacadas` | M2M → `propiedades` |
| `telefono_general` | Input (string) |
| `whatsapp_general` | Input (string) |
| `email_contacto` | Input (string) |
| `direccion_oficina` | Textarea |
| `redes_sociales` | JSON o Repeater |
| `logo` | File (image) |
| `og_image` | File (image) |

---

## 4. Colección `leads`

Para que los formularios del sitio caigan en Directus y no solo en un correo.

| Campo | Tipo |
|---|---|
| `nombre` | Input |
| `telefono` | Input |
| `email` | Input |
| `mensaje` | Textarea |
| `propiedad` | M2O → `propiedades` (nullable) |
| `asesor` | M2O → `asesores` (nullable) |
| `origen` | Dropdown: `ficha`, `contacto`, `whatsapp` |
| `estatus` | Dropdown: `nuevo`, `contactado`, `descartado` |
| `date_created` | Timestamp |

> **No se notifica a nadie.** El lead se guarda y el usuario se va directo al WhatsApp del asesor. El administrador revisa los leads dentro de Directus. Sin Flows, sin correos.

---

## 5. Roles y permisos

Fase 1: **solo dos roles.** Los asesores no entran a Directus.

**`admin_morado`** — CRUD total en todas las colecciones. Es quien carga propiedades y revisa los leads.

**`api_front`** (token estático que usa Astro) —
- `propiedades`, `asesores`, `configuracion_sitio`: **read only**
- `leads`: **create only** (sin read, sin update)
- Sin acceso a ninguna colección de sistema

> El token de `api_front` vive **solo en el servidor de Astro**, nunca en el navegador. Por eso el formulario postea a un endpoint propio y no directo a Directus.

---

## 6. Transformaciones de imagen

En Settings → Files, presets obligatorios (los asesores suben fotos de 6MB desde el celular):

| Preset | Uso | Config |
|---|---|---|
| `thumb` | Tarjeta de listado | 600×400, cover, WebP, q80 |
| `card` | Destacadas | 800×600, cover, WebP, q80 |
| `hero` | Ficha / héroe | 1920×1080, cover, WebP, q85 |
| `galeria` | Lightbox | 1600 ancho, contain, WebP, q85 |

Uso en Astro: `{DIRECTUS_URL}/assets/{id}?key=thumb`

Activar también límite de subida y conversión automática a WebP.

---

## 7. Notas para el front (Astro)

- **SSR / render on-demand**, no static puro. Adapter de Vercel.
- **Filtros contra la API**, no en cliente: query params → filtro de Directus.
- **Índices en Postgres** sobre `operacion`, `estatus`, `tipo`, `zona`, `precio`.
- **JSON-LD `RealEstateListing`** en cada ficha de propiedad.
- SDK: `@directus/sdk`.

---

## Orden de construcción (Directus)

1. `asesores`
2. `propiedades` (ya con la relación)
3. `configuracion_sitio`
4. `leads`
5. Roles y permisos
6. Presets de imagen
7. Cargar 8–10 propiedades reales → **enseñarle avance a Morado**
8. Front en Astro desde el Figma
