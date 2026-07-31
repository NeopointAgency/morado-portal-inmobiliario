import { _ as addAttribute, c as renderSlot, d as renderTemplate, g as renderHead, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
//#region src/components/Header.astro
createAstro("https://astro.build");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const ruta = Astro.url.pathname;
	const enlaces = [
		{
			href: "/propiedades",
			texto: "Ver propiedades"
		},
		{
			href: "/asesores",
			texto: "Nuestro equipo"
		},
		{
			href: "/contacto",
			texto: "Contacto"
		}
	];
	const activo = (href) => ruta === href || ruta.startsWith(href + "/") ? "page" : void 0;
	return renderTemplate`${maybeRenderHead($$result)}<header class="encabezado"><div class="contenedor encabezado-interior"><a class="marca" href="/">Morado Bienes Raíces</a><nav class="nav-principal" aria-label="Navegación principal"><ul>${enlaces.map((e) => renderTemplate`<li><a${addAttribute(e.href, "href")}${addAttribute(activo(e.href), "aria-current")}>${e.texto}</a></li>`)}</ul></nav></div></header>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/Header.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const anio = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="pie"><div class="contenedor"><p>© ${anio} Morado Bienes Raíces · Celaya, Guanajuato</p><nav aria-label="Navegación del pie"><ul class="nav-pie" style="list-style:none; padding:0; display:flex; gap:1rem; flex-wrap:wrap;"><li><a href="/propiedades">Ver propiedades</a></li><li><a href="/asesores">Nuestro equipo</a></li><li><a href="/contacto">Contacto</a></li></ul></nav></div></footer>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/Footer.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Layout;
	const { titulo, descripcion, ogImagen, ogTipo = "website" } = Astro2.props;
	const canonical = new URL(Astro2.url.pathname, "http://localhost:4321").href;
	return renderTemplate`<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${titulo}</title>${descripcion && renderTemplate`<meta name="description"${addAttribute(descripcion, "content")}>`}<link rel="canonical"${addAttribute(canonical, "href")}><meta property="og:title"${addAttribute(titulo, "content")}>${descripcion && renderTemplate`<meta property="og:description"${addAttribute(descripcion, "content")}>`}<meta property="og:type"${addAttribute(ogTipo, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:locale" content="es_MX">${ogImagen && renderTemplate`<meta property="og:image"${addAttribute(ogImagen, "content")}>`}${ogImagen && renderTemplate`<meta name="twitter:card" content="summary_large_image">`}<link rel="icon" href="/favicon.svg" type="image/svg+xml">${renderSlot($$result, $$slots["head"])}${renderHead($$result)}</head><body><a class="visualmente-oculto" href="#contenido">Ir al contenido</a>${renderComponent($$result, "Header", $$Header, {})}<main id="contenido">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
