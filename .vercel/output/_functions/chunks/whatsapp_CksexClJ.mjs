//#region src/lib/whatsapp.ts
/**
* URL de wa.me con mensaje prellenado. El asesor sabe de qué propiedad
* le hablan sin preguntar.
*/
function whatsappUrl(numero, titulo, urlFicha) {
	const limpio = numero.replace(/[^0-9]/g, "");
	if (!titulo) return `https://wa.me/${limpio}?text=${encodeURIComponent("Hola, me gustaría más información")}`;
	const texto = `Hola, me interesa ${titulo}${urlFicha ? ` — ${urlFicha}` : ""}`;
	return `https://wa.me/${limpio}?text=${encodeURIComponent(texto)}`;
}
//#endregion
export { whatsappUrl as t };
