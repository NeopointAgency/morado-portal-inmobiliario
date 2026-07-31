import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_Dg-2fS8-.mjs";
import { t as createComponent } from "./compiler_DPULFsOY.mjs";
import { t as $$Layout } from "./Layout_BiuUJuFu.mjs";
import { t as asesoresActivos } from "./queries_RLFKqUUE.mjs";
import { n as assetUrl } from "./images_CGQAYpRQ.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-morado-950 text-white"><div class="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6"><h1 class="text-4xl sm:text-5xl">Nuestro equipo</h1><p class="mt-2 max-w-xl text-white/70">Asesores certificados CONOCER-SEP que te acompañan de principio a fin.</p></div></div><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">${errorCarga && renderTemplate`<p class="rounded-xl bg-morado-100 p-6 text-morado-950/80" role="alert">No pudimos cargar al equipo en este momento. Intenta de nuevo en unos minutos.</p>`}${!errorCarga && asesores.length === 0 && renderTemplate`<p class="rounded-xl bg-morado-100 p-6 text-morado-950/80">Muy pronto conocerás aquí a nuestro equipo.</p>`}<ul class="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">${asesores.map((a) => renderTemplate`<li><a${addAttribute(`/asesores/${slugify(a.nombre)}`, "href")} class="group block no-underline">${a.foto ? renderTemplate`<img${addAttribute(assetUrl(a.foto, "card"), "src")}${addAttribute(`Fotografía de ${a.nombre}`, "alt")} width="448" height="560" loading="lazy" decoding="async" class="aspect-[4/5] w-full rounded-xl bg-morado-100 object-cover">` : renderTemplate`<span class="flex aspect-[4/5] w-full items-center justify-center rounded-xl bg-morado-100 font-display text-5xl text-morado-500">${a.nombre.charAt(0)}</span>`}<span class="mt-3 block text-lg font-medium group-hover:underline">${a.nombre}</span>${a.puesto && renderTemplate`<span class="block text-sm text-morado-950/60">${a.puesto}</span>`}</a></li>`)}</ul></div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/asesores/index.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/asesores/index.astro";
var $$url = "/asesores";
//#endregion
//#region \0virtual:astro:page:src/pages/asesores/index@_@astro
var page = () => asesores_exports;
//#endregion
export { page };
