import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, _ as addAttribute, a as Fragment, d as renderTemplate, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_Be9o9pQ6.mjs";
import { c as propiedadesParaHero, r as configuracionSitio, s as propiedadesDestacadas, t as asesoresActivos } from "./queries_RLFKqUUE.mjs";
import { n as assetUrl } from "./images_CGQAYpRQ.mjs";
import { r as slugify } from "./format_DkXTey0E.mjs";
import { t as $$TarjetaPropiedad } from "./TarjetaPropiedad_BwYq-nSE.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Index;
	const config = await configuracionSitio();
	let destacadas = [];
	let imagenesHero = [];
	let asesores = [];
	try {
		[destacadas, imagenesHero, asesores] = await Promise.all([
			propiedadesDestacadas(config),
			propiedadesParaHero(),
			asesoresActivos()
		]);
	} catch (error) {
		console.error("[home] Error al cargar datos", error);
	}
	const sitio = "http://localhost:4321";
	const tituloHero = config?.hero_titular ?? "Encontrar casa emociona. Comprarla bien, tranquiliza.";
	const subtituloHero = config?.hero_subtitulo ?? "Venta y renta de propiedades en regla y sin letras chicas — Celaya, Querétaro y SMA.";
	const ctaHero = config?.hero_cta_texto ?? "Agendar asesoría";
	function repetirHasta(arr, min) {
		if (arr.length === 0) return [];
		const salida = [...arr];
		while (salida.length < min) salida.push(...arr);
		return salida.slice(0, Math.max(min, arr.length));
	}
	const filaSuperior = repetirHasta(imagenesHero.filter((_, i) => i % 2 === 0), 6);
	const filaInferior = repetirHasta(imagenesHero.filter((_, i) => i % 2 === 1), 6);
	const ciudades = [
		{
			valor: "celaya",
			nombre: "Celaya",
			lema: "Explorar hogares seguros",
			clase: "from-morado-800 to-morado-600"
		},
		{
			valor: "san_miguel_de_allende",
			nombre: "San Miguel de Allende",
			lema: "Explorar hogares mágicos",
			clase: "from-morado-900 to-morado-700"
		},
		{
			valor: "queretaro",
			nombre: "Querétaro",
			lema: "Explorar hogares funcionales",
			clase: "from-morado-950 to-morado-800"
		}
	];
	const testimonios = [
		{
			texto: "Compramos nuestra primera casa y nos explicaron cada papel antes de firmar. Cero sorpresas.",
			autor: "Fernanda G., Celaya"
		},
		{
			texto: "El precio publicado fue el precio real. Se agradece no perder el tiempo.",
			autor: "Ricardo M., Querétaro"
		},
		{
			texto: "Nos acompañaron con el crédito INFONAVIT de principio a fin. Muy recomendados.",
			autor: "Sofía y Luis, Celaya"
		}
	];
	const pasosMetodo = [
		{
			titulo: "Papeles",
			texto: "Revisamos escrituras y estado legal. Si algo no cuadra, no se publica."
		},
		{
			titulo: "Crédito",
			texto: "Confirmamos si de verdad acepta INFONAVIT o crédito bancario — no se dice que sí por decir."
		},
		{
			titulo: "Precio y datos reales",
			texto: "El precio publicado es el precio real. Metros, recámaras y zona, verificados."
		}
	];
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "RealEstateAgent",
		name: "Morado Bienes Raíces",
		url: sitio,
		areaServed: "Celaya, Guanajuato, México",
		...config?.telefono_general ? { telephone: config.telefono_general } : {},
		...config?.email_contacto ? { email: config.email_contacto } : {},
		...config?.logo ? { logo: assetUrl(config.logo, "thumb") } : {}
	};
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"titulo": "Morado Bienes Raíces | Casas y propiedades en venta y renta en Celaya",
		"descripcion": "Inmobiliaria en Celaya. Venta y renta de propiedades en regla y sin letras chicas — Celaya, Querétaro y San Miguel de Allende. Habla directo con un asesor.",
		"ogImagen": config?.og_image ? assetUrl(config.og_image, "card") : void 0,
		"encabezadoSobrepuesto": true
	}, {
		"default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section class="relative flex min-h-svh items-end overflow-hidden bg-morado-950 pt-24">${filaSuperior.length > 0 && renderTemplate`<div class="absolute inset-0 flex flex-col justify-center gap-4" aria-hidden="true"><div class="marquee-fila" style="--marquee-duracion: 80s;">${[...filaSuperior, ...filaSuperior].map((p) => renderTemplate`<img${addAttribute(assetUrl(p.imagen_principal, "card"), "src")} alt="" width="800" height="600" loading="eager" decoding="async" class="aspect-[4/3] h-[34vh] w-auto rounded-xl object-cover sm:h-[38vh]">`)}</div><div class="marquee-fila marquee-invertido" style="--marquee-duracion: 95s;">${[...filaInferior, ...filaInferior].map((p) => renderTemplate`<img${addAttribute(assetUrl(p.imagen_principal, "card"), "src")} alt="" width="800" height="600" loading="eager" decoding="async" class="aspect-[4/3] h-[34vh] w-auto rounded-xl object-cover sm:h-[38vh]">`)}</div></div>`}<!-- Velo para legibilidad del texto --><div class="absolute inset-0 bg-gradient-to-t from-morado-950 via-morado-950/70 to-morado-950/40" aria-hidden="true"></div><div class="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20"><div class="grid items-end gap-10 lg:grid-cols-[1.4fr_auto]"><div class="max-w-2xl"><span class="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur-sm">Inmobiliaria en Celaya</span><h1 class="mt-5 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">${tituloHero}</h1><p class="mt-4 max-w-xl text-lg text-white/80">${subtituloHero}</p><div class="mt-8 flex flex-wrap items-center gap-4"><a href="/propiedades" class="boton-claro">Ver propiedades</a><div class="flex items-center gap-3"><span class="hidden text-sm text-white/70 sm:inline">¿Buscas asesoría personalizada?</span><a href="/contacto" class="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10">${ctaHero}</a></div></div></div><ul class="flex flex-row flex-wrap gap-3 lg:flex-col" aria-label="Por qué confiar en Morado">${[
			"+30 años de experiencia",
			"Miembro AMPI",
			"Aliados para tu crédito"
		].map((t) => renderTemplate`<li class="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"><span class="h-1.5 w-1.5 rounded-full bg-dorado-400" aria-hidden="true"></span>${t}</li>`)}</ul></div></div></section><section class="bg-morado-100" aria-labelledby="titulo-ciudades"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"><h2 id="titulo-ciudades" class="text-3xl sm:text-4xl">Encuentra tu espacio</h2><div class="mt-8 grid gap-5 sm:grid-cols-3">${ciudades.map((c) => renderTemplate`<a${addAttribute(`/propiedades?ciudad=${c.valor}`, "href")}${addAttribute(`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-b ${c.clase} p-6 text-white no-underline sm:aspect-[3/4]`, "class")}><span class="font-display text-2xl">${c.nombre}</span><span class="mt-1 text-sm text-white/75 transition-colors group-hover:text-white">${c.lema} <span aria-hidden="true">→</span></span></a>`)}</div></div></section><section class="bg-morado-50" aria-labelledby="titulo-destacadas"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"><h2 id="titulo-destacadas" class="text-3xl sm:text-4xl">Propiedades destacadas</h2>${destacadas.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`<ul class="mt-8 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">${destacadas.map((p, i) => renderTemplate`<li>${renderComponent($$result3, "TarjetaPropiedad", $$TarjetaPropiedad, {
			"propiedad": p,
			"prioridad": i < 3
		})}</li>`)}</ul><div class="mt-10 text-center"><a href="/propiedades" class="boton-oscuro">Ver más →</a></div>` })}` : renderTemplate`<p class="mt-8 rounded-xl bg-white p-6 text-morado-950/70">Muy pronto verás aquí nuestras propiedades destacadas.<a href="/propiedades">Explora el catálogo completo</a>.</p>`}</div></section><section class="bg-white" aria-labelledby="titulo-testimonios"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"><h2 id="titulo-testimonios" class="text-3xl sm:text-4xl">Lo que dicen nuestros clientes</h2><ul class="mt-8 grid list-none gap-6 p-0 md:grid-cols-3">${testimonios.map((t) => renderTemplate`<li class="flex flex-col rounded-xl border border-morado-100 bg-white p-6 shadow-sm"><span class="text-dorado-400" aria-hidden="true">★★★★★</span><blockquote class="mt-3 flex-1"><p class="text-morado-950/85">${t.texto}</p></blockquote><p class="mt-5 border-t border-morado-100 pt-4 text-sm font-medium text-morado-700">${t.autor}</p></li>`)}</ul></div></section><section id="metodo" class="bg-morado-950 text-white" aria-labelledby="titulo-metodo"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24"><p class="text-xs font-semibold tracking-[0.25em] text-morado-300 uppercase">Nuestro método</p><h2 id="titulo-metodo" class="mt-3 max-w-3xl text-3xl leading-snug sm:text-4xl lg:text-5xl">Ninguna propiedad entra al portal sin pasar por el Expediente Morado.</h2><p class="mt-4 max-w-2xl text-white/70">Tres revisiones antes de publicar. Por eso lo que ves aquí ya está en regla.</p><ol class="mt-12 grid list-none gap-5 p-0 md:grid-cols-3">${pasosMetodo.map((paso, i) => renderTemplate`<li class="rounded-xl border border-morado-700 bg-morado-900 p-7"><span class="flex h-9 w-9 items-center justify-center rounded-full border border-morado-500 font-display text-lg text-morado-200">${i + 1}</span><h3 class="mt-5 text-2xl">${paso.titulo}</h3><p class="mt-2 text-sm leading-relaxed text-white/70">${paso.texto}</p></li>`)}</ol><p class="mt-12 text-center text-sm text-white/60">Asesores certificados CONOCER-SEP&ensp;·&ensp;Miembro AMPI</p></div></section>${asesores.length > 0 && renderTemplate`<section class="bg-morado-100" aria-labelledby="titulo-equipo"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"><div class="flex flex-wrap items-end justify-between gap-4"><h2 id="titulo-equipo" class="text-3xl sm:text-4xl">El equipo que te acompaña</h2><a href="/asesores" class="text-sm font-medium text-morado-700 no-underline hover:text-morado-950 hover:underline">Conoce a todo el equipo →</a></div><ul class="carril mt-8 flex list-none gap-5 overflow-x-auto p-0 pb-2">${asesores.map((a) => renderTemplate`<li class="w-56 shrink-0"><a${addAttribute(`/asesores/${slugify(a.nombre)}`, "href")} class="group block no-underline">${a.foto ? renderTemplate`<img${addAttribute(assetUrl(a.foto, "card"), "src")}${addAttribute(`Fotografía de ${a.nombre}`, "alt")} width="448" height="560" loading="lazy" decoding="async" class="aspect-[4/5] w-full rounded-xl bg-morado-200 object-cover">` : renderTemplate`<span class="flex aspect-[4/5] w-full items-center justify-center rounded-xl bg-morado-200 font-display text-4xl text-morado-700">${a.nombre.charAt(0)}</span>`}<span class="mt-3 block font-medium text-morado-950 group-hover:underline">${a.nombre}</span>${a.puesto && renderTemplate`<span class="block text-sm text-morado-950/60">${a.puesto}</span>`}</a></li>`)}</ul></div></section>`}`,
		"head": ($$result2) => renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>`
	})}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/index.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
