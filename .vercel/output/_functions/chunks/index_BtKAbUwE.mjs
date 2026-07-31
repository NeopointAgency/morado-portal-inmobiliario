import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_ClptnfvP.mjs";
import { t as asesoresActivos } from "./queries_4NYa_xL2.mjs";
import { n as assetUrl } from "./images_CQgbxwnI.mjs";
import { r as slugify } from "./format_DkXTey0E.mjs";
//#region src/pages/asesores/index.astro
var asesores_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	let asesores = [];
	let errorCarga = false;
	try {
		asesores = await asesoresActivos();
	} catch (error) {
		console.error("[asesores] Error al consultar Directus", error);
		errorCarga = true;
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"titulo": "Nuestro equipo | Morado Bienes Raíces",
		"descripcion": "Conoce a los asesores inmobiliarios de Morado Bienes Raíces en Celaya. Atención directa y personal por WhatsApp."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="contenedor seccion"><h1>Nuestro equipo</h1>${errorCarga && renderTemplate`<p class="aviso" role="alert">No pudimos cargar al equipo en este momento. Intenta de nuevo en unos minutos.</p>`}${!errorCarga && asesores.length === 0 && renderTemplate`<p class="aviso">Muy pronto conocerás aquí a nuestro equipo.</p>`}<ul class="cuadricula-asesores">${asesores.map((a) => renderTemplate`<li><article class="tarjeta-asesor">${a.foto && renderTemplate`<img${addAttribute(assetUrl(a.foto, "thumb"), "src")}${addAttribute(`Fotografía de ${a.nombre}`, "alt")} width="96" height="96" loading="lazy">`}<h2 style="font-size: 1.05rem; margin: 0 0 0.25rem;"><a${addAttribute(`/asesores/${slugify(a.nombre)}`, "href")} style="text-decoration: none;">${a.nombre}</a></h2>${a.puesto && renderTemplate`<p style="margin: 0; color: var(--tinta-suave); font-size: 0.9rem;">${a.puesto}</p>`}</article></li>`)}</ul></div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/asesores/index.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/asesores/index.astro";
var $$url = "/asesores";
//#endregion
//#region \0virtual:astro:page:src/pages/asesores/index@_@astro
var page = () => asesores_exports;
//#endregion
export { page };
