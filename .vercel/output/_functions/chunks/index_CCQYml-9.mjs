import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_ClptnfvP.mjs";
import { r as configuracionSitio, s as propiedadesDestacadas } from "./queries_4NYa_xL2.mjs";
import { n as assetUrl } from "./images_CQgbxwnI.mjs";
import { t as $$TarjetaPropiedad } from "./TarjetaPropiedad_gafhivUm.mjs";
import { n as OPERACIONES, r as TIPOS, t as CIUDADES } from "./types_DyI1oIAp.mjs";
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
	try {
		destacadas = await propiedadesDestacadas(config);
	} catch (error) {
		console.error("[home] Error al cargar destacadas", error);
	}
	const sitio = "http://localhost:4321";
	const tituloHero = config?.hero_titular ?? "Encuentra tu próxima casa en Celaya y la región";
	const subtituloHero = config?.hero_subtitulo ?? "Casas, departamentos y terrenos con un asesor que te acompaña de principio a fin.";
	const ctaHero = config?.hero_cta_texto ?? "Ver propiedades";
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
		"descripcion": "Portal inmobiliario de Morado Bienes Raíces. Casas, departamentos, terrenos y locales en Celaya y otras plazas de Guanajuato. Habla directo con un asesor.",
		"ogImagen": config?.og_image ? assetUrl(config.og_image, "card") : void 0
	}, {
		"default": ($$result2) => renderTemplate`${maybeRenderHead($$result2)}<section class="heroe"><div class="contenedor"><h1>${tituloHero}</h1><p>${subtituloHero}</p><form class="barra-filtros" method="get" action="/propiedades" aria-label="Buscar propiedades"><div class="campo"><label for="b-operacion">Quiero</label><select id="b-operacion" name="operacion"><option value="">Comprar o rentar</option>${OPERACIONES.map((o) => renderTemplate`<option${addAttribute(o.valor, "value")}>${o.etiqueta}</option>`)}</select></div><div class="campo"><label for="b-tipo">Tipo</label><select id="b-tipo" name="tipo"><option value="">Todos</option>${TIPOS.map((t) => renderTemplate`<option${addAttribute(t.valor, "value")}>${t.etiqueta}</option>`)}</select></div><div class="campo"><label for="b-ciudad">Ciudad</label><select id="b-ciudad" name="ciudad"><option value="">Todas</option>${CIUDADES.map((c) => renderTemplate`<option${addAttribute(c.valor, "value")}>${c.etiqueta}</option>`)}</select></div><div class="campo"><label for="b-precio-max">Precio hasta</label><input type="number" id="b-precio-max" name="precio_max" min="0" step="50000" inputmode="numeric"></div><button type="submit" class="boton">${ctaHero}</button></form></div></section>${destacadas.length > 0 && renderTemplate`<section class="contenedor seccion" aria-labelledby="titulo-destacadas"><h2 id="titulo-destacadas">Propiedades destacadas</h2><ul class="cuadricula-propiedades">${destacadas.map((p, i) => renderTemplate`<li>${renderComponent($$result2, "TarjetaPropiedad", $$TarjetaPropiedad, {
			"propiedad": p,
			"prioridad": i < 3
		})}</li>`)}</ul><p style="margin-top: 1.5rem;"><a class="boton boton-secundario" href="/propiedades">Ver todas las propiedades</a></p></section>`}${destacadas.length === 0 && renderTemplate`<section class="contenedor seccion"><p class="aviso">Muy pronto verás aquí nuestras propiedades destacadas.<a href="/propiedades">Explora el catálogo completo</a>.</p></section>`}`,
		"head": ($$result2) => renderTemplate`<script type="application/ld+json">${unescapeHTML(JSON.stringify(jsonLd))}<\/script>`
	})}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/index.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
