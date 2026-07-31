import type { APIRoute } from 'astro';
import { readItems } from '@directus/sdk';
import { directus } from '../lib/directus';
import { slugify } from '../lib/format';

export const prerender = false;

// Sitemap dinámico desde Directus: cada alta de propiedad aparece sola.
export const GET: APIRoute = async ({ request }) => {
  const sitio = import.meta.env.PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const abs = (ruta: string) => new URL(ruta, sitio).href;

  const urls: { loc: string; lastmod?: string }[] = [
    { loc: abs('/') },
    { loc: abs('/propiedades') },
    { loc: abs('/asesores') },
    { loc: abs('/contacto') },
  ];

  try {
    const [propiedades, asesores] = await Promise.all([
      directus.request(
        readItems('propiedades', {
          fields: ['slug', 'date_updated', 'date_created'],
          filter: { estatus: { _nin: ['vendida', 'rentada'] } },
          limit: -1,
        })
      ),
      directus.request(
        readItems('asesores', {
          fields: ['nombre'],
          filter: { activo: { _eq: true } },
          limit: -1,
        })
      ),
    ]);

    for (const p of propiedades) {
      urls.push({
        loc: abs(`/propiedades/${p.slug}`),
        lastmod: (p.date_updated ?? p.date_created)?.slice(0, 10),
      });
    }
    for (const a of asesores) {
      urls.push({ loc: abs(`/asesores/${slugify(a.nombre)}`) });
    }
  } catch (error) {
    console.error('[sitemap] Error al consultar Directus', error);
  }

  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(cuerpo, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
