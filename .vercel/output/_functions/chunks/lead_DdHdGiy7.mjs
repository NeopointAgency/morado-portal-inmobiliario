import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as directus } from "./directus_B0UXzgzJ.mjs";
import { r as configuracionSitio } from "./queries_RLFKqUUE.mjs";
import { t as whatsappUrl } from "./whatsapp_CksexClJ.mjs";
import { createItem, readItem } from "@directus/sdk";
//#region src/pages/api/lead.ts
var lead_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var VENTANA_MS = 6e5;
var MAX_POR_VENTANA = 5;
var intentos = /* @__PURE__ */ new Map();
function excedeLimite(ip) {
	const ahora = Date.now();
	const previos = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
	previos.push(ahora);
	intentos.set(ip, previos);
	if (intentos.size > 5e3) intentos.clear();
	return previos.length > MAX_POR_VENTANA;
}
var ES_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
var ES_TELEFONO = /^[0-9+\s().-]{7,20}$/;
var ES_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function redirigir(url) {
	return new Response(null, {
		status: 303,
		headers: { Location: url }
	});
}
var POST = async ({ request, clientAddress }) => {
	let form;
	try {
		form = await request.formData();
	} catch {
		return new Response("Solicitud inválida", { status: 400 });
	}
	const campo = (n) => String(form.get(n) ?? "").trim();
	const nombre = campo("nombre");
	const telefono = campo("telefono");
	const email = campo("email");
	const mensaje = campo("mensaje").slice(0, 1e3);
	const propiedadId = campo("propiedad_id");
	const origen = campo("origen") === "contacto" ? "contacto" : "ficha";
	if (campo("sitio_web")) return redirigir("/");
	const errores = [];
	if (nombre.length < 2 || nombre.length > 120) errores.push("nombre");
	if (!ES_TELEFONO.test(telefono)) errores.push("telefono");
	if (email && !ES_EMAIL.test(email)) errores.push("email");
	if (propiedadId && !ES_UUID.test(propiedadId)) errores.push("propiedad");
	const volver = origen === "contacto" ? "/contacto" : request.headers.get("referer") || "/propiedades";
	if (errores.length > 0) {
		const destino2 = new URL(volver, request.url);
		destino2.searchParams.set("error", "datos");
		return redirigir(destino2.pathname + destino2.search);
	}
	const limitado = excedeLimite(clientAddress ?? "desconocida");
	let asesor = null;
	let tituloPropiedad;
	let urlFicha;
	if (propiedadId) try {
		const propiedad = await directus.request(readItem("propiedades", propiedadId, { fields: [
			"id",
			"titulo",
			"slug",
			{ asesor: [
				"id",
				"whatsapp",
				"activo"
			] }
		] }));
		tituloPropiedad = propiedad.titulo;
		urlFicha = new URL(`/propiedades/${propiedad.slug}`, "http://localhost:4321").href;
		const a = propiedad.asesor;
		if (a && typeof a === "object" && a.activo && a.whatsapp) asesor = a;
	} catch (error) {
		console.error("[lead] No se pudo resolver la propiedad", propiedadId, error);
	}
	if (!limitado) try {
		await directus.request(createItem("leads", {
			nombre,
			telefono,
			email: email || null,
			mensaje: mensaje || null,
			propiedad: propiedadId || null,
			asesor: asesor?.id ?? null,
			origen,
			estatus: "nuevo"
		}));
	} catch (error) {
		console.error("[lead] No se pudo guardar el lead", error);
	}
	else console.warn("[lead] Rate limit alcanzado para", clientAddress);
	if (asesor) return redirigir(whatsappUrl(asesor.whatsapp, tituloPropiedad, urlFicha));
	try {
		const config = await configuracionSitio();
		if (config?.whatsapp_general) return redirigir(whatsappUrl(config.whatsapp_general, tituloPropiedad, urlFicha));
	} catch (error) {
		console.error("[lead] No se pudo leer configuracion_sitio", error);
	}
	const destino = new URL(volver, request.url);
	destino.searchParams.set("enviado", "1");
	return redirigir(destino.pathname + destino.search);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/lead@_@ts
var page = () => lead_exports;
//#endregion
export { page };
