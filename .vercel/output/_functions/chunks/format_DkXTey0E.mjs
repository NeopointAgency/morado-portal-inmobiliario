//#region src/lib/format.ts
var formatters = {
	MXN: new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN",
		maximumFractionDigits: 0
	}),
	USD: new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	})
};
function formatoPrecio(precio, moneda = "MXN", operacion) {
	const base = formatters[moneda].format(precio);
	const sufijo = moneda === "USD" ? " USD" : "";
	return operacion === "renta" ? `${base}${sufijo} / mes` : `${base}${sufijo}`;
}
/** "apaseo_el_grande" → "Apaseo El Grande" (fallback para valores fuera del catálogo) */
function etiqueta(valor) {
	return valor.split(/[_-]/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}
/** Slug estable a partir de un nombre ("María Pérez" → "maria-perez") */
function slugify(texto) {
	return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
//#endregion
export { formatoPrecio as n, slugify as r, etiqueta as t };
