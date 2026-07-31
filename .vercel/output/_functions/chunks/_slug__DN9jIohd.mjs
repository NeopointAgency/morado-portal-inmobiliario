import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as unescapeHTML, T as createAstro, _ as addAttribute, a as Fragment, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_Dg-2fS8-.mjs";
import { t as createComponent } from "./compiler_DPULFsOY.mjs";
import { t as $$Layout } from "./Layout_BiuUJuFu.mjs";
import { a as propiedadPorSlug } from "./queries_RLFKqUUE.mjs";
import { t as whatsappUrl } from "./whatsapp_CksexClJ.mjs";
import { n as assetUrl, t as PRESETS } from "./images_CGQAYpRQ.mjs";
import { n as formatoPrecio, t as etiqueta } from "./format_DkXTey0E.mjs";
import { t as $$FormularioLead } from "./FormularioLead_C8dG8f6P.mjs";
//#region src/pages/propiedades/[slug].astro
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
	const propiedad = slug ? await propiedadPorSlug(slug).catch((e) => {
		console.error("[ficha] Error al consultar Directus", e);
		return null;
	}) : null;
	if (!propiedad) return Astro2.rewrite("/404");
	const p = propiedad;
	const asesor = p.asesor && typeof p.asesor === "object" ? p.asesor : null;
	const noDisponible = p.estatus === "vendida" || p.estatus === "rentada";
	const urlFicha = new URL(`/propiedades/${p.slug}`, "http://localhost:4321").href;
	const ubicacion = [p.zona && etiqueta(p.zona), p.ciudad && etiqueta(p.ciudad)].filter(Boolean).join(", ");
	const tituloSeo = p.meta_titulo ?? `${p.titulo} | Morado Bienes Raíces`;
	const descripcionSeo = p.meta_descripcion ?? `${etiqueta(p.tipo)} en ${p.operacion} en ${ubicacion || "Celaya"}. ${formatoPrecio(p.precio, p.moneda, p.operacion)}. Habla directo con el asesor.`;
	const galeria = Array.isArray(p.galeria) ? p.galeria.filter((g) => typeof g === "object" && g !== null) : [];
	const caracteristicas = [];
	if (p.recamaras) caracteristicas.push(["Recámaras", String(p.recamaras)]);
	if (p.banos) caracteristicas.push(["Baños", String(p.banos)]);
	if (p.estacionamientos) caracteristicas.push(["Estacionamientos", String(p.estacionamientos)]);
	if (p.m2_terreno) caracteristicas.push(["Terreno", `${p.m2_terreno} m²`]);
	if (p.m2_construccion) caracteristicas.push(["Construcción", `${p.m2_construccion} m²`]);
	if (p.antiguedad) caracteristicas.push(["Antigüedad", `${p.antiguedad} años`]);
	const amenidades = Array.isArray(p.amenidades) ? p.amenidades : [];
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "RealEstateListing",
		name: p.titulo,
		url: urlFicha,
		...p.imagen_principal ? { image: [assetUrl(p.imagen_principal, "hero"), ...galeria.map((g) => assetUrl(g.directus_files_id, "galeria"))] } : {},
		offers: {
			"@type": "Offer",
			price: p.precio,
			priceCurrency: p.moneda,
			availability: noDisponible ? "https://schema.org/SoldOut" : "https://schema.org/InStock"
		},
		address: {
			"@type": "PostalAddress",
			...p.ciudad ? { addressLocality: etiqueta(p.ciudad) } : {},
			addressRegion: "Guanajuato",
			addressCountry: "MX"
		},
		...p.recamaras ? { numberOfRooms: p.recamaras } : {},
		...p.banos ? { numberOfBathroomsTotal: p.banos } : {},
		...p.m2_construccion ? { floorSize: {
			"@type": "QuantitativeValue",
			value: p.m2_construccion,
			unitCode: "MTK"
		} } : {}
	};
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"titulo": tituloSeo,
		"descripcion": descripcionSeo,
		"ogImagen": p.imagen_principal ? assetUrl(p.imagen_principal, "card") : void 0,
		"ogTipo": "article"
	}, {
		"default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6"><nav aria-label="Ruta de navegación" class="mb-5 text-sm"><a href="/propiedades" class="text-morado-700 no-underline hover:underline">← Ver propiedades</a></nav><div class="grid gap-10 lg:grid-cols-[1.8fr_1fr] lg:items-start"><article>${p.imagen_principal && renderTemplate`<img${addAttribute(assetUrl(p.imagen_principal, "hero"), "src")}${addAttribute(`Fotografía principal de ${p.titulo}`, "alt")}${addAttribute(PRESETS.hero.width, "width")}${addAttribute(PRESETS.hero.height, "height")} loading="eager" fetchpriority="high" class="aspect-[16/10] w-full rounded-xl bg-morado-100 object-cover">`}<header class="mt-6"><p class="text-sm font-medium tracking-wide text-morado-700 uppercase">${p.operacion === "venta" ? "En venta" : "En renta"} · ${etiqueta(p.tipo)}${p.estatus === "apartada" && " · Apartada"}</p><h1 class="mt-1 text-3xl sm:text-4xl">${p.titulo}</h1>${ubicacion && renderTemplate`<p class="mt-1 text-morado-950/60">${ubicacion}</p>`}${p.mostrar_direccion_exacta && p.direccion && renderTemplate`<p class="text-morado-950/60">${p.direccion}</p>`}<p class="mt-3 text-3xl font-semibold tracking-tight">${formatoPrecio(p.precio, p.moneda, p.operacion)}</p></header>${noDisponible && renderTemplate`<p class="mt-6 rounded-xl bg-morado-100 p-5 text-morado-950/80" role="status">Esta propiedad ya se ${p.estatus === "vendida" ? "vendió" : "rentó"}.<a href="/propiedades" class="font-medium text-morado-700">Mira otras propiedades disponibles</a>.</p>`}${caracteristicas.length > 0 && renderTemplate`<section class="mt-10"><h2 class="text-2xl">Características</h2><ul class="mt-4 grid list-none grid-cols-2 gap-x-6 gap-y-3 p-0 sm:grid-cols-3">${caracteristicas.map(([nombre, valor]) => renderTemplate`<li class="rounded-lg bg-morado-50 px-4 py-3"><span class="block text-xs text-morado-950/50 uppercase">${nombre}</span><span class="font-medium">${valor}</span></li>`)}</ul></section>`}${amenidades.length > 0 && renderTemplate`<section class="mt-10"><h2 class="text-2xl">Amenidades</h2><ul class="mt-4 flex list-none flex-wrap gap-2 p-0">${amenidades.map((a) => renderTemplate`<li class="rounded-full bg-morado-100 px-4 py-1.5 text-sm">${a}</li>`)}</ul></section>`}${p.descripcion && renderTemplate`<section class="mt-10"><h2 class="text-2xl">Acerca de esta propiedad</h2><div class="prose-morado mt-4 max-w-none leading-relaxed text-morado-950/80">${unescapeHTML(p.descripcion)}</div></section>`}${p.video_url && renderTemplate`<section class="mt-10"><h2 class="text-2xl">Video</h2><p class="mt-3"><a${addAttribute(p.video_url, "href")} target="_blank" rel="noopener" class="boton-borde">Ver video de la propiedad</a></p></section>`}${galeria.length > 0 && renderTemplate`<section class="mt-10"><h2 class="text-2xl">Galería</h2><ul class="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">${galeria.map((g, i) => renderTemplate`<li><img${addAttribute(assetUrl(g.directus_files_id, "galeria"), "src")}${addAttribute(`Fotografía ${i + 2} de ${p.titulo}`, "alt")}${addAttribute(PRESETS.galeria.width, "width")}${addAttribute(PRESETS.galeria.height, "height")} loading="lazy" decoding="async" class="w-full rounded-xl bg-morado-100 object-cover"></li>`)}</ul></section>`}</article><aside class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-morado-950/5 lg:sticky lg:top-6">${asesor ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<div class="flex items-center gap-4">${asesor.foto && renderTemplate`<img${addAttribute(assetUrl(asesor.foto, "thumb"), "src")}${addAttribute(`Fotografía de ${asesor.nombre}`, "alt")} width="64" height="64" loading="lazy" class="h-16 w-16 rounded-full object-cover">`}<div><p class="font-medium">${asesor.nombre}</p>${asesor.puesto && renderTemplate`<p class="text-sm text-morado-950/60">${asesor.puesto}</p>`}</div></div>${!noDisponible && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate`<a class="boton-oscuro mt-5 w-full"${addAttribute(whatsappUrl(asesor.whatsapp, p.titulo, urlFicha), "href")}>Enviar WhatsApp</a><p class="my-4 text-center text-sm text-morado-950/50">o déjanos tus datos:</p>${renderComponent($$result4, "FormularioLead", $$FormularioLead, {
			"propiedadId": p.id,
			"origen": "ficha"
		})}` })}`}` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<p class="font-medium">¿Te interesa esta propiedad?</p>${!noDisponible && renderTemplate`<div class="mt-4">${renderComponent($$result3, "FormularioLead", $$FormularioLead, {
			"propiedadId": p.id,
			"origen": "ficha"
		})}</div>`}` })}`}</aside></div></div>`,
		"head": ($$result2) => renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>`
	})}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/propiedades/[slug].astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/propiedades/[slug].astro";
var $$url = "/propiedades/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/propiedades/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
