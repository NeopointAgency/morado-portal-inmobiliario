import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_90Bxd0vG.mjs";
import { t as createComponent } from "./compiler_CQrhOVPY.mjs";
import { t as $$Layout } from "./Layout_ClptnfvP.mjs";
import { r as configuracionSitio } from "./queries_4NYa_xL2.mjs";
import { t as whatsappUrl } from "./whatsapp_CksexClJ.mjs";
import { t as $$FormularioLead } from "./FormularioLead_x1RC8dKJ.mjs";
//#region src/pages/contacto.astro
var contacto_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contacto,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Contacto = createComponent(async ($$result, $$props, $$slots) => {
	const config = await configuracionSitio();
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"titulo": "Contacto | Morado Bienes Raíces",
		"descripcion": "Escríbenos por WhatsApp, llámanos o visítanos en Celaya. Te ayudamos a encontrar tu próxima propiedad."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="contenedor seccion"><h1>Contacto</h1><div class="ficha-columnas"><section aria-label="Formulario de contacto"><p>Cuéntanos qué buscas y te contactamos. O si prefieres, escríbenos directo por WhatsApp.</p>${renderComponent($$result, "FormularioLead", $$FormularioLead, { "origen": "contacto" })}</section><aside class="panel-asesor" aria-label="Datos de contacto">${config?.whatsapp_general && renderTemplate`<p><a class="boton" style="display: block; text-align: center;"${addAttribute(whatsappUrl(config.whatsapp_general), "href")}>Enviar WhatsApp</a></p>`}${config?.telefono_general && renderTemplate`<p><strong>Teléfono:</strong>${" "}<a${addAttribute(`tel:${config.telefono_general.replace(/\s/g, "")}`, "href")}>${config.telefono_general}</a></p>`}${config?.email_contacto && renderTemplate`<p><strong>Correo:</strong> <a${addAttribute(`mailto:${config.email_contacto}`, "href")}>${config.email_contacto}</a></p>`}${config?.direccion_oficina && renderTemplate`<p><strong>Oficina:</strong><br>${config.direccion_oficina}</p>`}${!config && renderTemplate`<p class="aviso">Muy pronto encontrarás aquí nuestros datos de contacto.</p>`}</aside></div></div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/contacto.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/contacto.astro";
var $$url = "/contacto";
//#endregion
//#region \0virtual:astro:page:src/pages/contacto@_@astro
var page = () => contacto_exports;
//#endregion
export { page };
