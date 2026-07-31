import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as addAttribute, a as Fragment, d as renderTemplate, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_ClptnfvP.mjs";
import { i as filtrosDesdeParams, n as buscarPropiedades } from "./queries_4NYa_xL2.mjs";
import { t as $$TarjetaPropiedad } from "./TarjetaPropiedad_gafhivUm.mjs";
import { n as OPERACIONES, r as TIPOS, t as CIUDADES } from "./types_DyI1oIAp.mjs";
//#region src/components/Paginacion.astro
createAstro("https://astro.build");
var $$Paginacion = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Paginacion;
	const { pagina, totalPaginas, params, ruta } = Astro.props;
	function urlPagina(n) {
		const p = new URLSearchParams(params);
		if (n <= 1) p.delete("pagina");
		else p.set("pagina", String(n));
		const qs = p.toString();
		return qs ? `${ruta}?${qs}` : ruta;
	}
	return renderTemplate`${totalPaginas > 1 && renderTemplate`${maybeRenderHead($$result)}<nav class="paginacion" aria-label="Paginación">${pagina > 1 ? renderTemplate`<a class="boton boton-secundario"${addAttribute(urlPagina(pagina - 1), "href")} rel="prev">← Anterior</a>` : renderTemplate`<span></span>`}<span>Página ${pagina} de ${totalPaginas}</span>${pagina < totalPaginas ? renderTemplate`<a class="boton boton-secundario"${addAttribute(urlPagina(pagina + 1), "href")} rel="next">Siguiente →</a>` : renderTemplate`<span></span>`}</nav>`}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/Paginacion.astro", void 0);
//#endregion
//#region src/pages/propiedades/index.astro
var propiedades_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const params = Astro.url.searchParams;
	const filtros = filtrosDesdeParams(params);
	let resultado = null;
	let errorCarga = false;
	try {
		resultado = await buscarPropiedades(filtros);
	} catch (error) {
		console.error("[propiedades] Error al consultar Directus", error);
		errorCarga = true;
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"titulo": "Propiedades en venta y renta | Morado Bienes Raíces",
		"descripcion": "Casas, departamentos, terrenos y locales en Celaya y la región. Encuentra tu propiedad y habla directo con el asesor."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="contenedor seccion"><h1>Propiedades</h1><form class="barra-filtros" method="get" action="/propiedades"><div class="campo"><label for="f-operacion">Quiero</label><select id="f-operacion" name="operacion"><option value="">Comprar o rentar</option>${OPERACIONES.map((o) => renderTemplate`<option${addAttribute(o.valor, "value")}${addAttribute(filtros.operacion === o.valor, "selected")}>${o.etiqueta}</option>`)}</select></div><div class="campo"><label for="f-tipo">Tipo</label><select id="f-tipo" name="tipo"><option value="">Todos</option>${TIPOS.map((t) => renderTemplate`<option${addAttribute(t.valor, "value")}${addAttribute(filtros.tipo === t.valor, "selected")}>${t.etiqueta}</option>`)}</select></div><div class="campo"><label for="f-ciudad">Ciudad</label><select id="f-ciudad" name="ciudad"><option value="">Todas</option>${CIUDADES.map((c) => renderTemplate`<option${addAttribute(c.valor, "value")}${addAttribute(filtros.ciudad === c.valor, "selected")}>${c.etiqueta}</option>`)}</select></div><div class="campo"><label for="f-recamaras">Recámaras</label><select id="f-recamaras" name="recamaras"><option value="">Cualquiera</option>${[
		1,
		2,
		3,
		4
	].map((n) => renderTemplate`<option${addAttribute(String(n), "value")}${addAttribute(filtros.recamaras === n, "selected")}>${n}+</option>`)}</select></div><div class="campo"><label for="f-precio-min">Precio desde</label><input type="number" id="f-precio-min" name="precio_min" min="0" step="50000" inputmode="numeric"${addAttribute(filtros.precio_min ?? "", "value")}></div><div class="campo"><label for="f-precio-max">Precio hasta</label><input type="number" id="f-precio-max" name="precio_max" min="0" step="50000" inputmode="numeric"${addAttribute(filtros.precio_max ?? "", "value")}></div><button type="submit" class="boton">Buscar</button></form>${errorCarga && renderTemplate`<p class="aviso" role="alert">No pudimos cargar las propiedades en este momento. Intenta de nuevo en unos minutos.</p>`}${resultado && resultado.items.length === 0 && renderTemplate`<div class="aviso"><p>No encontramos propiedades con esos filtros.</p><p><a href="/propiedades">Ver todas las propiedades</a></p></div>`}${resultado && resultado.items.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<p style="color: var(--tinta-suave);">${resultado.total} ${resultado.total === 1 ? "propiedad" : "propiedades"}</p><ul class="cuadricula-propiedades">${resultado.items.map((p, i) => renderTemplate`<li>${renderComponent($$result, "TarjetaPropiedad", $$TarjetaPropiedad, {
		"propiedad": p,
		"prioridad": i < 3 && filtros.pagina === 1
	})}</li>`)}</ul>${renderComponent($$result, "Paginacion", $$Paginacion, {
		"pagina": resultado.pagina,
		"totalPaginas": resultado.totalPaginas,
		"params": params,
		"ruta": "/propiedades"
	})}` })}`}</div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/propiedades/index.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/propiedades/index.astro";
var $$url = "/propiedades";
//#endregion
//#region \0virtual:astro:page:src/pages/propiedades/index@_@astro
var page = () => propiedades_exports;
//#endregion
export { page };
