# Portal Morado Bienes Raíces

Portal inmobiliario para Morado Bienes Raíces (Celaya, Guanajuato). Cliente de Neopoint.

**El trabajo del sitio:** que alguien que busca casa encuentre una propiedad y termine
hablando por WhatsApp con el asesor asignado a esa propiedad.

## Stack

- **Astro** en modo SSR (`output: 'server'`) con adapter de **Vercel**
- **Directus** como CMS (VPS Hetzner vía Easypanel) + **Postgres**
- Imágenes en **Cloudflare R2**, servidas con los presets de Directus
- Estilos: CSS mínimo funcional — la identidad visual llega con el Figma

## Desarrollo

```sh
cp .env.example .env   # llenar DIRECTUS_URL y DIRECTUS_TOKEN
npm install
npm run dev            # localhost:4321
```

Sin Directus configurado, las páginas cargan con estados vacíos amigables (no truenan).

## Variables de entorno (Vercel)

| Variable | Notas |
|---|---|
| `DIRECTUS_URL` | `https://cms.morado.mx` |
| `DIRECTUS_TOKEN` | Token del rol `api_front`. **Solo servidor, nunca `PUBLIC_`** |
| `PUBLIC_SITE_URL` | `https://morado.mx` |

> Recordatorio: el dominio de Vercel (incluidos previews) debe estar en `CORS_ORIGIN`
> del servicio Directus en Easypanel, o todas las peticiones fallan sin mensaje claro.

## Rutas

```
/                        Home: héroe + buscador + destacadas
/propiedades             Listado con filtros (query params → filtro Directus, server-side)
/propiedades/[slug]      Ficha con datos del asesor + formulario
/asesores                Equipo
/asesores/[slug]         Perfil + sus propiedades (slug derivado del nombre)
/contacto                Contacto general
/api/lead                POST del formulario → guarda lead → 303 a wa.me del asesor
/sitemap.xml             Dinámico desde Directus
```

## El flujo del lead (crítico)

1. Formulario HTML puro postea a `/api/lead` (funciona sin JS en el cliente)
2. El endpoint valida (honeypot + rate limit por IP + formato), resuelve el asesor
   desde la propiedad y crea el registro en `leads`
3. Responde `303` a `wa.me/{asesor.whatsapp}` con mensaje prellenado
4. **Si falla el guardado, el usuario va a WhatsApp igual.** Se loguea el error.

No hay notificaciones: el administrador revisa los leads dentro de Directus.

## Estructura

```
src/
  components/     Header, Footer, TarjetaPropiedad, Paginacion, FormularioLead
  layouts/        Layout.astro (SEO, OG, canonical)
  lib/            directus.ts, types.ts, queries.ts, images.ts, format.ts, whatsapp.ts
  pages/          rutas (SSR) + api/lead.ts + sitemap.xml.ts
  styles/         global.css (mínimo funcional, accesible)
```

El esquema de Directus vive en `directus-schema-morado.md` (colecciones `asesores`,
`propiedades`, `configuracion_sitio`, `leads`; presets de imagen `thumb/card/hero/galeria`).

## Pendiente

- Aplicar el Figma cuando se entregue (decidir CSS vs Tailwind en ese momento)
- Índices en Postgres sobre `operacion`, `estatus`, `tipo`, `zona`, `ciudad`, `precio`
- Campo `slug` propio en `asesores` (hoy se deriva del nombre)
