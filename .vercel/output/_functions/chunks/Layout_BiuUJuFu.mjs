import { T as createAstro, _ as addAttribute, c as renderSlot, d as renderTemplate, g as renderHead, h as maybeRenderHead, i as renderComponent } from "./server_Dg-2fS8-.mjs";
import { t as createComponent } from "./compiler_DPULFsOY.mjs";
//#region src/components/Marca.astro
createAstro("https://astro.build");
var $$Marca = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Marca;
	const { clase = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<a href="/"${addAttribute(`inline-block no-underline ${clase}`, "class")}><img src="/images/logo.png" alt="Morado Bienes Raíces" width="208" height="68" class="h-12 w-auto sm:h-14"></a>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/Marca.astro", void 0);
//#endregion
//#region src/components/Header.astro
createAstro("https://astro.build");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const { sobrepuesto = false } = Astro.props;
	const ruta = Astro.url.pathname;
	const enlaces = [
		{
			href: "/",
			texto: "Inicio"
		},
		{
			href: "/propiedades",
			texto: "Propiedades"
		},
		{
			href: "/#metodo",
			texto: "Por qué nosotros"
		}
	];
	const activo = (href) => href !== "/" && href.startsWith("/") && !href.includes("#") && (ruta === href || ruta.startsWith(href + "/")) ? "page" : href === "/" && ruta === "/" ? "page" : void 0;
	return renderTemplate`${maybeRenderHead($$result)}<header${addAttribute(["text-white", sobrepuesto ? "absolute inset-x-0 top-0 z-30 bg-transparent" : "bg-morado-950"], "class:list")}><div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-6">${renderComponent($$result, "Marca", $$Marca, { "clase": "text-white" })}<nav aria-label="Navegación principal" class="flex items-center gap-x-5 gap-y-2 sm:gap-x-7"><ul class="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm tracking-[-0.05em] sm:gap-x-7 sm:text-base">${enlaces.map((e) => renderTemplate`<li><a${addAttribute(e.href, "href")}${addAttribute(activo(e.href), "aria-current")} class="text-white/80 no-underline transition-colors hover:text-white aria-[current=page]:text-white aria-[current=page]:underline aria-[current=page]:underline-offset-8">${e.texto}</a></li>`)}</ul><a href="/contacto" class="hidden rounded-full border border-white/40 px-5 py-2 text-sm font-medium tracking-[-0.05em] text-white no-underline transition-colors hover:border-white hover:bg-white/10 sm:inline-flex">Contáctanos</a></nav></div></header>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/Header.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const anio = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-morado-950 text-white"><div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]"><div>${renderComponent($$result, "Marca", $$Marca, { "clase": "text-white" })}<p class="mt-4 max-w-xs text-sm leading-relaxed text-white/60">Venta y renta de propiedades en regla y sin letras chicas — Celaya, Querétaro y San Miguel de Allende.</p></div><nav aria-label="Navegación del pie"><p class="mb-3 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Explora</p><ul class="space-y-2 text-sm"><li><a class="text-white/80 no-underline hover:text-white hover:underline" href="/propiedades">Ver propiedades</a></li><li><a class="text-white/80 no-underline hover:text-white hover:underline" href="/asesores">Nuestro equipo</a></li><li><a class="text-white/80 no-underline hover:text-white hover:underline" href="/#metodo">Por qué nosotros</a></li><li><a class="text-white/80 no-underline hover:text-white hover:underline" href="/contacto">Contáctanos</a></li></ul></nav><div><p class="mb-3 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Confianza</p><ul class="space-y-2 text-sm text-white/80"><li>+30 años de experiencia</li><li>Miembro AMPI</li><li>Asesores certificados CONOCER-SEP</li></ul></div></div><div class="border-t border-white/10"><p class="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 sm:px-6">© ${anio} Morado Bienes Raíces · Celaya, Guanajuato</p></div></footer>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/Footer.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Layout;
	const { titulo, descripcion, ogImagen, ogTipo = "website", encabezadoSobrepuesto = false } = Astro2.props;
	const canonical = new URL(Astro2.url.pathname, "http://localhost:4321").href;
	return renderTemplate`<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${titulo}</title>${descripcion && renderTemplate`<meta name="description"${addAttribute(descripcion, "content")}>`}<link rel="canonical"${addAttribute(canonical, "href")}><meta name="theme-color" content="#211036"><meta property="og:title"${addAttribute(titulo, "content")}>${descripcion && renderTemplate`<meta property="og:description"${addAttribute(descripcion, "content")}>`}<meta property="og:type"${addAttribute(ogTipo, "content")}><meta property="og:url"${addAttribute(canonical, "content")}><meta property="og:locale" content="es_MX">${ogImagen && renderTemplate`<meta property="og:image"${addAttribute(ogImagen, "content")}>`}${ogImagen && renderTemplate`<meta name="twitter:card" content="summary_large_image">`}<link rel="icon" href="/favicon.svg" type="image/svg+xml">${renderSlot($$result, $$slots["head"])}${renderHead($$result)}</head><body><a class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2" href="#contenido">Ir al contenido</a>${renderComponent($$result, "Header", $$Header, { "sobrepuesto": encabezadoSobrepuesto })}<main id="contenido">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
