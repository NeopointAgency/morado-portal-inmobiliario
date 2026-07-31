import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as directus } from "./directus_B0UXzgzJ.mjs";
import { r as slugify } from "./format_DkXTey0E.mjs";
import { readItems } from "@directus/sdk";
//#region src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ request }) => {
	const sitio = "http://localhost:4321";
	const abs = (ruta) => new URL(ruta, sitio).href;
	const urls = [
		{ loc: abs("/") },
		{ loc: abs("/propiedades") },
		{ loc: abs("/asesores") },
		{ loc: abs("/contacto") }
	];
	try {
		const [propiedades, asesores] = await Promise.all([directus.request(readItems("propiedades", {
			fields: [
				"slug",
				"date_updated",
				"date_created"
			],
			filter: { estatus: { _nin: ["vendida", "rentada"] } },
			limit: -1
		})), directus.request(readItems("asesores", {
			fields: ["nombre"],
			filter: { activo: { _eq: true } },
			limit: -1
		}))]);
		for (const p of propiedades) urls.push({
			loc: abs(`/propiedades/${p.slug}`),
			lastmod: (p.date_updated ?? p.date_created)?.slice(0, 10)
		});
		for (const a of asesores) urls.push({ loc: abs(`/asesores/${slugify(a.nombre)}`) });
	} catch (error) {
		console.error("[sitemap] Error al consultar Directus", error);
	}
	const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;
	return new Response(cuerpo, { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
//#endregion
export { page };
