import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, w as createAstro } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
//#region src/components/FormularioLead.astro
createAstro("https://astro.build");
var $$FormularioLead = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FormularioLead;
	const { propiedadId, origen = "ficha" } = Astro.props;
	const conError = Astro.url.searchParams.get("error") === "datos";
	const enviado = Astro.url.searchParams.get("enviado") === "1";
	return renderTemplate`${maybeRenderHead($$result)}<form method="post" action="/api/lead">${conError && renderTemplate`<p class="aviso" role="alert">Revisa tu nombre y teléfono; no pudimos procesar los datos.</p>`}${enviado && renderTemplate`<p class="aviso" role="status">Recibimos tu mensaje. Un asesor te contactará pronto.</p>`}${propiedadId && renderTemplate`<input type="hidden" name="propiedad_id"${addAttribute(propiedadId, "value")}>`}<input type="hidden" name="origen"${addAttribute(origen, "value")}><!-- Honeypot: oculto para humanos, irresistible para bots --><div class="campo-alterno" aria-hidden="true"><label for="sitio_web">No llenes este campo</label><input type="text" id="sitio_web" name="sitio_web" tabindex="-1" autocomplete="off"></div><div class="campo"><label for="lead-nombre">Tu nombre</label><input type="text" id="lead-nombre" name="nombre" required minlength="2" maxlength="120" autocomplete="name"></div><div class="campo"><label for="lead-telefono">Tu teléfono</label><input type="tel" id="lead-telefono" name="telefono" required pattern="[0-9+\\s().\\-]{7,20}" autocomplete="tel" inputmode="tel"></div><div class="campo"><label for="lead-email">Tu correo (opcional)</label><input type="email" id="lead-email" name="email" autocomplete="email"></div><div class="campo"><label for="lead-mensaje">¿Qué te gustaría saber?</label><textarea id="lead-mensaje" name="mensaje" rows="4" maxlength="1000"></textarea></div><button type="submit" class="boton">Hablar con el asesor</button><p style="font-size: 0.85rem; color: var(--tinta-suave); margin-top: 0.5rem;">Al enviar se abre WhatsApp con el asesor de esta propiedad.</p></form>`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/components/FormularioLead.astro", void 0);
//#endregion
export { $$FormularioLead as t };
