import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_ClptnfvP.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "titulo": "Página no encontrada | Morado Bienes Raíces" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="contenedor seccion"><h1>No encontramos esa página</h1><p>Puede que la propiedad ya no esté publicada o que el enlace haya cambiado.</p><p><a class="boton" href="/propiedades">Ver propiedades disponibles</a></p></div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/404.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/404.astro";
var $$url = "/404";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
