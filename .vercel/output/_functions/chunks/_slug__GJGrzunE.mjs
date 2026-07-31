import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, _ as addAttribute, a as Fragment, d as renderTemplate, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_ClptnfvP.mjs";
import { a as propiedadPorSlug } from "./queries_4NYa_xL2.mjs";
import { t as whatsappUrl } from "./whatsapp_CksexClJ.mjs";
import { n as assetUrl, t as PRESETS } from "./images_CQgbxwnI.mjs";
import { n as formatoPrecio, t as etiqueta } from "./format_DkXTey0E.mjs";
import { t as $$FormularioLead } from "./FormularioLead_x1RC8dKJ.mjs";
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
		"default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<div class="contenedor seccion"><nav aria-label="Ruta de navegación" style="font-size: 0.9rem; margin-bottom: 1rem;"><a href="/propiedades">← Ver propiedades</a></nav><div class="ficha-columnas"><article>${p.imagen_principal && renderTemplate`<img${addAttribute(assetUrl(p.imagen_principal, "hero"), "src")}${addAttribute(`Fotografía principal de ${p.titulo}`, "alt")}${addAttribute(PRESETS.hero.width, "width")}${addAttribute(PRESETS.hero.height, "height")} loading="eager" fetchpriority="high" style="border-radius: 0.5rem;">`}<header style="margin-top: 1.25rem;"><span class="etiqueta-operacion">${p.operacion === "venta" ? "En venta" : "En renta"} · ${etiqueta(p.tipo)}${p.estatus === "apartada" && " · Apartada"}</span><h1 style="margin: 0.25rem 0;">${p.titulo}</h1>${ubicacion && renderTemplate`<p class="tarjeta-ubicacion">${ubicacion}</p>`}${p.mostrar_direccion_exacta && p.direccion && renderTemplate`<p class="tarjeta-ubicacion">${p.direccion}</p>`}<p class="tarjeta-precio" style="font-size: 1.6rem;">${formatoPrecio(p.precio, p.moneda, p.operacion)}</p></header>${noDisponible && renderTemplate`<p class="aviso" role="status">Esta propiedad ya se ${p.estatus === "vendida" ? "vendió" : "rentó"}.<a href="/propiedades">Mira otras propiedades disponibles</a>.</p>`}${caracteristicas.length > 0 && renderTemplate`<section class="seccion"><h2>Características</h2><ul class="lista-caracteristicas">${caracteristicas.map(([nombre, valor]) => renderTemplate`<li><strong>${nombre}:</strong> ${valor}</li>`)}</ul></section>`}${amenidades.length > 0 && renderTemplate`<section class="seccion"><h2>Amenidades</h2><ul class="tarjeta-detalles" style="font-size: 1rem;">${amenidades.map((a) => renderTemplate`<li>${a}</li>`)}</ul></section>`}${p.descripcion && renderTemplate`<section class="seccion"><h2>Acerca de esta propiedad</h2><div>${unescapeHTML(p.descripcion)}</div></section>`}${p.video_url && renderTemplate`<section class="seccion"><h2>Video</h2><p><a${addAttribute(p.video_url, "href")} target="_blank" rel="noopener">Ver video de la propiedad</a></p></section>`}${galeria.length > 0 && renderTemplate`<section class="seccion"><h2>Galería</h2><ul class="galeria">${galeria.map((g, i) => renderTemplate`<li><img${addAttribute(assetUrl(g.directus_files_id, "galeria"), "src")}${addAttribute(`Fotografía ${i + 2} de ${p.titulo}`, "alt")}${addAttribute(PRESETS.galeria.width, "width")}${addAttribute(PRESETS.galeria.height, "height")} loading="lazy" decoding="async" style="border-radius: 0.375rem;"></li>`)}</ul></section>`}</article><aside class="panel-asesor">${asesor ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<div style="display: flex; gap: 0.875rem; align-items: center; margin-bottom: 1rem;">${asesor.foto && renderTemplate`<img${addAttribute(assetUrl(asesor.foto, "thumb"), "src")}${addAttribute(`Fotografía de ${asesor.nombre}`, "alt")} width="64" height="64" loading="lazy">`}<div><p style="margin: 0; font-weight: 700;">${asesor.nombre}</p>${asesor.puesto && renderTemplate`<p style="margin: 0; font-size: 0.85rem; color: var(--tinta-suave);">${asesor.puesto}</p>`}</div></div>${!noDisponible && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate`<a class="boton" style="display: block; text-align: center; margin-bottom: 1rem;"${addAttribute(whatsappUrl(asesor.whatsapp, p.titulo, urlFicha), "href")}>Enviar WhatsApp</a><p style="text-align: center; color: var(--tinta-suave); font-size: 0.9rem;">o déjanos tus datos:</p>` })}`}${!noDisponible && renderTemplate`${renderComponent($$result3, "FormularioLead", $$FormularioLead, {
			"propiedadId": p.id,
			"origen": "ficha"
		})}`}` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<p style="font-weight: 700;">¿Te interesa esta propiedad?</p>${!noDisponible && renderTemplate`${renderComponent($$result3, "FormularioLead", $$FormularioLead, {
			"propiedadId": p.id,
			"origen": "ficha"
		})}`}` })}`}</aside></div></div>`,
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
