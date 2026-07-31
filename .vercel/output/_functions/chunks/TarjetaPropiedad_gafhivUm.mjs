import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { n as assetUrl, t as PRESETS } from "./images_CQgbxwnI.mjs";
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
	if (p.m2_construccion) detalles.push(`${p.m2_construccion} m² constr.`);
	else if (p.m2_terreno) detalles.push(`${p.m2_terreno} m² terreno`);
	return renderTemplate`${maybeRenderHead($$result)}<article class="tarjeta">${p.imagen_principal ? renderTemplate`<img${addAttribute(assetUrl(p.imagen_principal, "thumb"), "src")} alt=""${addAttribute(PRESETS.thumb.width, "width")}${addAttribute(PRESETS.thumb.height, "height")}${addAttribute(prioridad ? "eager" : "lazy", "loading")} decoding="async">` : renderTemplate`<div${addAttribute(`aspect-ratio: 3/2; background: var(--fondo-suave);`, "style")}></div>`}<div class="tarjeta-cuerpo"><span class="etiqueta-operacion">${p.operacion === "venta" ? "En venta" : "En renta"}${p.estatus === "apartada" ? " · Apartada" : ""}</span><p class="tarjeta-precio">${formatoPrecio(p.precio, p.moneda, p.operacion)}</p><h3 class="tarjeta-titulo"><a${addAttribute(`/propiedades/${p.slug}`, "href")}>${p.titulo}</a></h3>${ubicacion && renderTemplate`<p class="tarjeta-ubicacion">${ubicacion}</p>`}${detalles.length > 0 && renderTemplate`<ul class="tarjeta-detalles">${detalles.map((d) => renderTemplate`<li>${d}</li>`)}</ul>`}</div></article>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/TarjetaPropiedad.astro", void 0);
//#endregion
export { $$TarjetaPropiedad as t };
