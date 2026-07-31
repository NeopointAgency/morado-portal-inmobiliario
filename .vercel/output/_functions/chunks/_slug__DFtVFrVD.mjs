import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_ClptnfvP.mjs";
import { o as propiedadesDeAsesor, t as asesoresActivos } from "./queries_4NYa_xL2.mjs";
import { t as whatsappUrl } from "./whatsapp_CksexClJ.mjs";
import { n as assetUrl } from "./images_CQgbxwnI.mjs";
import { r as slugify } from "./format_DkXTey0E.mjs";
import { t as $$TarjetaPropiedad } from "./TarjetaPropiedad_gafhivUm.mjs";
//#region src/pages/asesores/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Slug;
	const { slug } = Astro2.params;
	const asesor = (await asesoresActivos().catch((e) => {
		console.error("[asesor] Error al consultar Directus", e);
		return [];
	})).find((a) => slugify(a.nombre) === slug);
	if (!asesor) return Astro2.rewrite("/404");
	let propiedades = [];
	try {
		propiedades = await propiedadesDeAsesor(asesor.id);
	} catch (error) {
		console.error("[asesor] Error al cargar propiedades", error);
	}
	const sitio = "http://localhost:4321";
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "RealEstateAgent",
		name: asesor.nombre,
		...asesor.puesto ? { jobTitle: asesor.puesto } : {},
		...asesor.telefono ? { telephone: asesor.telefono } : {},
		...asesor.email ? { email: asesor.email } : {},
		...asesor.foto ? { image: assetUrl(asesor.foto, "card") } : {},
		url: new URL(`/asesores/${slug}`, sitio).href,
		worksFor: {
			"@type": "RealEstateAgent",
			name: "Morado Bienes Raíces"
		}
	};
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"titulo": `${asesor.nombre} | Morado Bienes Raíces`,
		"descripcion": `${asesor.nombre}${asesor.puesto ? `, ${asesor.puesto}` : ""} en Morado Bienes Raíces. Conoce sus propiedades y contáctale directo por WhatsApp.`,
		"ogImagen": asesor.foto ? assetUrl(asesor.foto, "card") : void 0,
		"ogTipo": "profile"
	}, {
		"default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="contenedor seccion"><nav aria-label="Ruta de navegación" style="font-size: 0.9rem; margin-bottom: 1rem;"><a href="/asesores">← Nuestro equipo</a></nav><header style="display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap; margin-bottom: 2rem;">${asesor.foto && renderTemplate`<img${addAttribute(assetUrl(asesor.foto, "thumb"), "src")}${addAttribute(`Fotografía de ${asesor.nombre}`, "alt")} width="112" height="112" style="border-radius: 50%; object-fit: cover; width: 7rem; height: 7rem;">`}<div><h1 style="margin: 0;">${asesor.nombre}</h1>${asesor.puesto && renderTemplate`<p style="margin: 0.25rem 0; color: var(--tinta-suave);">${asesor.puesto}</p>`}${asesor.bio && renderTemplate`<p style="margin: 0.5rem 0; max-width: 45rem;">${asesor.bio}</p>`}<p style="margin-top: 0.75rem;"><a class="boton"${addAttribute(whatsappUrl(asesor.whatsapp), "href")}>Enviar WhatsApp</a>${asesor.telefono && renderTemplate`<a class="boton boton-secundario"${addAttribute(`tel:${asesor.telefono.replace(/\s/g, "")}`, "href")} style="margin-left: 0.5rem;">Llamar</a>`}</p></div></header><section aria-labelledby="titulo-propiedades"><h2 id="titulo-propiedades">Propiedades de ${asesor.nombre.split(" ")[0]}</h2>${propiedades.length === 0 && renderTemplate`<p class="aviso">Por ahora no tiene propiedades publicadas.</p>`}<ul class="cuadricula-propiedades">${propiedades.map((p) => renderTemplate`<li>${renderComponent($$result2, "TarjetaPropiedad", $$TarjetaPropiedad, { "propiedad": p })}</li>`)}</ul></section></div>`,
		"head": ($$result2) => renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>`
	})}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/asesores/[slug].astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/asesores/[slug].astro";
var $$url = "/asesores/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/asesores/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
