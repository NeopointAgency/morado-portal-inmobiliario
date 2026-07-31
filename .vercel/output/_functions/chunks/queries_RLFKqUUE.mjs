import { n as directus } from "./directus_B0UXzgzJ.mjs";
import { aggregate, readItems, readSingleton } from "@directus/sdk";
var CAMPOS_TARJETA = [
	"id",
	"titulo",
	"slug",
	"precio",
	"moneda",
	"operacion",
	"estatus",
	"tipo",
	"recamaras",
	"banos",
	"estacionamientos",
	"m2_terreno",
	"m2_construccion",
	"zona",
	"ciudad",
	"imagen_principal"
];
/** Query params → filtros tipados. Ignora valores vacíos o no numéricos. */
function filtrosDesdeParams(params) {
	const num = (clave) => {
		const v = Number(params.get(clave));
		return Number.isFinite(v) && v > 0 ? v : void 0;
	};
	const str = (clave) => params.get(clave)?.trim() || void 0;
	return {
		ciudad: str("ciudad"),
		zona: str("zona"),
		operacion: str("operacion"),
		tipo: str("tipo"),
		precio_min: num("precio_min"),
		precio_max: num("precio_max"),
		recamaras: num("recamaras"),
		banos: num("banos"),
		pagina: Math.max(1, num("pagina") ?? 1)
	};
}
/** Filtros tipados → filtro de Directus. Siempre del lado del servidor. */
function filtroDirectus(f) {
	const filtro = { estatus: { _nin: ["vendida", "rentada"] } };
	if (f.ciudad) filtro.ciudad = { _eq: f.ciudad };
	if (f.zona) filtro.zona = { _eq: f.zona };
	if (f.operacion) filtro.operacion = { _eq: f.operacion };
	if (f.tipo) filtro.tipo = { _eq: f.tipo };
	if (f.precio_min || f.precio_max) filtro.precio = {
		...f.precio_min ? { _gte: f.precio_min } : {},
		...f.precio_max ? { _lte: f.precio_max } : {}
	};
	if (f.recamaras) filtro.recamaras = { _gte: f.recamaras };
	if (f.banos) filtro.banos = { _gte: f.banos };
	return filtro;
}
async function buscarPropiedades(f) {
	const filter = filtroDirectus(f);
	const [items, conteo] = await Promise.all([directus.request(readItems("propiedades", {
		fields: [...CAMPOS_TARJETA],
		filter,
		sort: ["-date_created"],
		limit: 12,
		offset: (f.pagina - 1) * 12
	})), directus.request(aggregate("propiedades", {
		aggregate: { count: "*" },
		query: { filter }
	}))]);
	const total = Number(conteo[0]?.count ?? 0);
	return {
		items,
		total,
		pagina: f.pagina,
		totalPaginas: Math.max(1, Math.ceil(total / 12))
	};
}
async function propiedadPorSlug(slug) {
	return (await directus.request(readItems("propiedades", {
		fields: [
			"*",
			{ asesor: ["*"] },
			{ galeria: ["id", "directus_files_id"] }
		],
		filter: { slug: { _eq: slug } },
		limit: 1
	})))[0] ?? null;
}
async function propiedadesDeAsesor(asesorId) {
	return await directus.request(readItems("propiedades", {
		fields: [...CAMPOS_TARJETA],
		filter: {
			asesor: { _eq: asesorId },
			estatus: { _nin: ["vendida", "rentada"] }
		},
		sort: ["-date_created"],
		limit: 50
	}));
}
async function asesoresActivos() {
	return await directus.request(readItems("asesores", {
		fields: ["*"],
		filter: { activo: { _eq: true } },
		sort: ["nombre"]
	}));
}
async function configuracionSitio() {
	try {
		return await directus.request(readSingleton("configuracion_sitio", { fields: ["*", { propiedades_destacadas: ["id", { propiedades_id: [...CAMPOS_TARJETA] }] }] }));
	} catch {
		return null;
	}
}
/** Imágenes para los sliders del héroe: destacadas primero, luego recientes. */
async function propiedadesParaHero() {
	return await directus.request(readItems("propiedades", {
		fields: [
			"slug",
			"titulo",
			"imagen_principal"
		],
		filter: {
			estatus: { _nin: ["vendida", "rentada"] },
			imagen_principal: { _nnull: true }
		},
		sort: ["-destacada", "-date_created"],
		limit: 14
	}));
}
/** Destacadas del singleton; si no hay, cae al toggle `destacada`. */
async function propiedadesDestacadas(config) {
	const delSingleton = (config?.propiedades_destacadas ?? []).filter((j) => typeof j === "object" && j !== null).map((j) => j.propiedades_id).filter((p) => p && !["vendida", "rentada"].includes(p.estatus));
	if (delSingleton.length > 0) return delSingleton;
	return await directus.request(readItems("propiedades", {
		fields: [...CAMPOS_TARJETA],
		filter: {
			destacada: { _eq: true },
			estatus: { _nin: ["vendida", "rentada"] }
		},
		sort: ["sort", "-date_created"],
		limit: 6
	}));
}
//#endregion
export { propiedadPorSlug as a, propiedadesParaHero as c, filtrosDesdeParams as i, buscarPropiedades as n, propiedadesDeAsesor as o, configuracionSitio as r, propiedadesDestacadas as s, asesoresActivos as t };
