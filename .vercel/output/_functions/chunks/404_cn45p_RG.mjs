import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_Be9o9pQ6.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "titulo": "Página no encontrada | Morado Bienes Raíces" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6"><p class="font-display text-7xl text-morado-300">404</p><h1 class="mt-4 text-3xl sm:text-4xl">No encontramos esa página</h1><p class="mx-auto mt-3 max-w-md text-morado-950/70">Puede que la propiedad ya no esté publicada o que el enlace haya cambiado.</p><p class="mt-8"><a class="boton-oscuro" href="/propiedades">Ver propiedades disponibles</a></p></div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/404.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
