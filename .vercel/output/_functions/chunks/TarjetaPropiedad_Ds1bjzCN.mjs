import { T as createAstro, _ as addAttribute, d as renderTemplate, h as maybeRenderHead } from "./server_Dg-2fS8-.mjs";
import { t as createComponent } from "./compiler_DPULFsOY.mjs";
import { n as assetUrl, t as PRESETS } from "./images_CGQAYpRQ.mjs";
import { n as formatoPrecio, t as etiqueta } from "./format_DkXTey0E.mjs";
//#region src/components/TarjetaPropiedad.astro
createAstro("https://astro.build");
var $$TarjetaPropiedad = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$TarjetaPropiedad;
	const { propiedad: p, prioridad = false } = Astro.props;
	const ubicacion = [p.zona && etiqueta(p.zona), p.ciudad && etiqueta(p.ciudad)].filter(Boolean).join(", ");
	const detalles = [];
	if (p.recamaras) detalles.push(`${p.recamaras} rec`);
	if (p.banos) detalles.push(`${p.banos} baños`);
	if (p.estacionamientos) detalles.push(`${p.estacionamientos} autos`);
	if (p.m2_construccion) detalles.push(`${p.m2_construccion} m²`);
	else if (p.m2_terreno) detalles.push(`${p.m2_terreno} m² terreno`);
	return renderTemplate`${maybeRenderHead($$result)}<article class="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-morado-950/5 transition-shadow hover:shadow-lg"><div class="relative">${p.imagen_principal ? renderTemplate`<img${addAttribute(assetUrl(p.imagen_principal, "thumb"), "src")} alt=""${addAttribute(PRESETS.thumb.width, "width")}${addAttribute(PRESETS.thumb.height, "height")}${addAttribute(prioridad ? "eager" : "lazy", "loading")} decoding="async" class="aspect-[3/2] w-full bg-morado-100 object-cover transition-transform duration-500 group-hover:scale-[1.03]">` : renderTemplate`<div class="aspect-[3/2] w-full bg-morado-100"></div>`}<span class="absolute top-3 left-3 rounded-full bg-morado-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">${p.operacion === "venta" ? "En venta" : "En renta"}${p.estatus === "apartada" ? " · Apartada" : ""}</span></div><div class="p-5"><p class="text-2xl font-semibold tracking-tight">${formatoPrecio(p.precio, p.moneda, p.operacion)}</p><h3 class="mt-1 font-sans text-sm font-normal text-morado-950/70"><a${addAttribute(`/propiedades/${p.slug}`, "href")} class="no-underline after:absolute after:inset-0 after:content-['']">${ubicacion || p.titulo}</a></h3>${detalles.length > 0 && renderTemplate`<p class="mt-2 text-sm text-morado-950/60">${detalles.join("  ·  ")}</p>`}<p class="mt-4 text-sm font-medium text-morado-700 transition-colors group-hover:text-morado-950">Ver propiedad <span aria-hidden="true">→</span></p></div></article>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/TarjetaPropiedad.astro", void 0);
//#endregion
export { $$TarjetaPropiedad as t };
