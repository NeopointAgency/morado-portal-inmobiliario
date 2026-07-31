import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_Be9o9pQ6.mjs";
import { o as propiedadesDeAsesor, t as asesoresActivos } from "./queries_RLFKqUUE.mjs";
import { t as whatsappUrl } from "./whatsapp_CksexClJ.mjs";
import { n as assetUrl } from "./images_CGQAYpRQ.mjs";
import { r as slugify } from "./format_DkXTey0E.mjs";
import { t as $$TarjetaPropiedad } from "./TarjetaPropiedad_BwYq-nSE.mjs";
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
		"default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="bg-morado-950 text-white"><div class="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6"><nav aria-label="Ruta de navegación" class="mb-6 text-sm"><a href="/asesores" class="text-white/70 no-underline hover:text-white hover:underline">← Nuestro equipo</a></nav><div class="flex flex-wrap items-center gap-6">${asesor.foto && renderTemplate`<img${addAttribute(assetUrl(asesor.foto, "thumb"), "src")}${addAttribute(`Fotografía de ${asesor.nombre}`, "alt")} width="112" height="112" class="h-28 w-28 rounded-full border-2 border-white/20 object-cover">`}<div><h1 class="text-3xl sm:text-4xl">${asesor.nombre}</h1>${asesor.puesto && renderTemplate`<p class="mt-1 text-white/70">${asesor.puesto}</p>`}${asesor.bio && renderTemplate`<p class="mt-3 max-w-xl text-white/80">${asesor.bio}</p>`}<p class="mt-5 flex flex-wrap gap-3"><a class="boton-claro"${addAttribute(whatsappUrl(asesor.whatsapp), "href")}>Enviar WhatsApp</a>${asesor.telefono && renderTemplate`<a class="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-medium text-white no-underline transition-colors hover:bg-white/10"${addAttribute(`tel:${asesor.telefono.replace(/\s/g, "")}`, "href")}>Llamar</a>`}</p></div></div></div></div><section class="mx-auto max-w-7xl px-4 py-12 sm:px-6" aria-labelledby="titulo-propiedades"><h2 id="titulo-propiedades" class="text-2xl sm:text-3xl">Propiedades de ${asesor.nombre.split(" ")[0]}</h2>${propiedades.length === 0 && renderTemplate`<p class="mt-6 rounded-xl bg-morado-100 p-6 text-morado-950/80">Por ahora no tiene propiedades publicadas.</p>`}<ul class="mt-6 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">${propiedades.map((p) => renderTemplate`<li>${renderComponent($$result2, "TarjetaPropiedad", $$TarjetaPropiedad, { "propiedad": p })}</li>`)}</ul></section>`,
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
