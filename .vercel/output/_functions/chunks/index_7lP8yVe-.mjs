import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as addAttribute, a as Fragment, d as renderTemplate, h as maybeRenderHead, i as renderComponent, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_Be9o9pQ6.mjs";
import { i as filtrosDesdeParams, n as buscarPropiedades } from "./queries_RLFKqUUE.mjs";
import { t as $$TarjetaPropiedad } from "./TarjetaPropiedad_BwYq-nSE.mjs";
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
	return renderTemplate`${totalPaginas > 1 && renderTemplate`${maybeRenderHead($$result)}<nav class="mt-12 flex items-center justify-center gap-6" aria-label="Paginación">${pagina > 1 ? renderTemplate`<a class="boton-borde"${addAttribute(urlPagina(pagina - 1), "href")} rel="prev">← Anterior</a>` : renderTemplate`<span></span>`}<span class="text-sm text-morado-950/60">Página ${pagina} de ${totalPaginas}</span>${pagina < totalPaginas ? renderTemplate`<a class="boton-borde"${addAttribute(urlPagina(pagina + 1), "href")} rel="next">Siguiente →</a>` : renderTemplate`<span></span>`}</nav>`}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/Paginacion.astro", void 0);
//#endregion
//#region src/lib/types.ts
var OPERACIONES = [{
	valor: "venta",
	etiqueta: "Comprar"
}, {
	valor: "renta",
	etiqueta: "Rentar"
}];
var TIPOS = [
	{
		valor: "casa",
		etiqueta: "Casa"
	},
	{
		valor: "departamento",
		etiqueta: "Departamento"
	},
	{
		valor: "terreno",
		etiqueta: "Terreno"
	},
	{
		valor: "local",
		etiqueta: "Local comercial"
	},
	{
		valor: "bodega",
		etiqueta: "Bodega"
	},
	{
		valor: "oficina",
		etiqueta: "Oficina"
	}
];
var CIUDADES = [
	{
		valor: "celaya",
		etiqueta: "Celaya"
	},
	{
		valor: "queretaro",
		etiqueta: "Querétaro"
	},
	{
		valor: "san_miguel_de_allende",
		etiqueta: "San Miguel de Allende"
	},
	{
		valor: "apaseo_el_grande",
		etiqueta: "Apaseo el Grande"
	},
	{
		valor: "villagran",
		etiqueta: "Villagrán"
	},
	{
		valor: "cortazar",
		etiqueta: "Cortazar"
	}
];
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
	const titulo = "Propiedades en venta y renta | Morado Bienes Raíces";
	const descripcion = "Casas, departamentos, terrenos y locales en Celaya, Querétaro y San Miguel de Allende. Encuentra tu propiedad y habla directo con el asesor.";
	const claseLabel = "mb-1 block text-sm font-medium";
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"titulo": titulo,
		"descripcion": descripcion
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-morado-950 text-white"><div class="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6"><h1 class="text-4xl sm:text-5xl">Propiedades</h1><p class="mt-2 text-white/70">Todo lo que ves aquí ya pasó por el Expediente Morado: en regla y sin letras chicas.</p></div></div><div class="mx-auto max-w-7xl px-4 pb-16 sm:px-6"><form class="relative z-10 -mt-6 grid items-end gap-4 rounded-xl bg-white p-5 shadow-lg ring-1 ring-morado-950/5 sm:grid-cols-2 lg:grid-cols-7" method="get" action="/propiedades"><div><label for="f-operacion"${addAttribute(claseLabel, "class")}>Quiero</label><select id="f-operacion" name="operacion" class="campo-input"><option value="">Comprar o rentar</option>${OPERACIONES.map((o) => renderTemplate`<option${addAttribute(o.valor, "value")}${addAttribute(filtros.operacion === o.valor, "selected")}>${o.etiqueta}</option>`)}</select></div><div><label for="f-tipo"${addAttribute(claseLabel, "class")}>Tipo</label><select id="f-tipo" name="tipo" class="campo-input"><option value="">Todos</option>${TIPOS.map((t) => renderTemplate`<option${addAttribute(t.valor, "value")}${addAttribute(filtros.tipo === t.valor, "selected")}>${t.etiqueta}</option>`)}</select></div><div><label for="f-ciudad"${addAttribute(claseLabel, "class")}>Ciudad</label><select id="f-ciudad" name="ciudad" class="campo-input"><option value="">Todas</option>${CIUDADES.map((c) => renderTemplate`<option${addAttribute(c.valor, "value")}${addAttribute(filtros.ciudad === c.valor, "selected")}>${c.etiqueta}</option>`)}</select></div><div><label for="f-recamaras"${addAttribute(claseLabel, "class")}>Recámaras</label><select id="f-recamaras" name="recamaras" class="campo-input"><option value="">Cualquiera</option>${[
		1,
		2,
		3,
		4
	].map((n) => renderTemplate`<option${addAttribute(String(n), "value")}${addAttribute(filtros.recamaras === n, "selected")}>${n}+</option>`)}</select></div><div><label for="f-precio-min"${addAttribute(claseLabel, "class")}>Precio desde</label><input type="number" id="f-precio-min" name="precio_min" min="0" step="50000" inputmode="numeric"${addAttribute(filtros.precio_min ?? "", "value")} class="campo-input"></div><div><label for="f-precio-max"${addAttribute(claseLabel, "class")}>Precio hasta</label><input type="number" id="f-precio-max" name="precio_max" min="0" step="50000" inputmode="numeric"${addAttribute(filtros.precio_max ?? "", "value")} class="campo-input"></div><button type="submit" class="boton-oscuro">Buscar</button></form><div class="mt-10">${errorCarga && renderTemplate`<p class="rounded-xl bg-morado-100 p-6 text-morado-950/80" role="alert">No pudimos cargar las propiedades en este momento. Intenta de nuevo en unos minutos.</p>`}${resultado && resultado.items.length === 0 && renderTemplate`<div class="rounded-xl bg-morado-100 p-6 text-morado-950/80"><p>No encontramos propiedades con esos filtros.</p><p class="mt-2"><a href="/propiedades" class="font-medium text-morado-700">Ver todas las propiedades</a></p></div>`}${resultado && resultado.items.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<p class="text-sm text-morado-950/60">${resultado.total} ${resultado.total === 1 ? "propiedad" : "propiedades"}</p><ul class="mt-4 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">${resultado.items.map((p, i) => renderTemplate`<li>${renderComponent($$result, "TarjetaPropiedad", $$TarjetaPropiedad, {
		"propiedad": p,
		"prioridad": i < 3 && filtros.pagina === 1
	})}</li>`)}</ul>${renderComponent($$result, "Paginacion", $$Paginacion, {
		"pagina": resultado.pagina,
		"totalPaginas": resultado.totalPaginas,
		"params": params,
		"ruta": "/propiedades"
	})}` })}`}</div></div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/propiedades/index.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/propiedades/index.astro";
var $$url = "/propiedades";
//#endregion
//#region \0virtual:astro:page:src/pages/propiedades/index@_@astro
var page = () => propiedades_exports;
//#endregion
export { page };
