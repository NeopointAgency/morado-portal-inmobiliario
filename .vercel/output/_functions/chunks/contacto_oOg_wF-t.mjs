import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { _ as addAttribute, d as renderTemplate, h as maybeRenderHead, i as renderComponent } from "./server_Dg-2fS8-.mjs";
import { t as createComponent } from "./compiler_DPULFsOY.mjs";
import { t as $$Layout } from "./Layout_BiuUJuFu.mjs";
import { r as configuracionSitio } from "./queries_RLFKqUUE.mjs";
import { t as whatsappUrl } from "./whatsapp_CksexClJ.mjs";
import { t as $$FormularioLead } from "./FormularioLead_C8dG8f6P.mjs";
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-morado-950 text-white"><div class="mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6"><h1 class="text-4xl sm:text-5xl">Contacto</h1><p class="mt-2 max-w-xl text-white/70">Cuéntanos qué buscas y te contactamos. O si prefieres, escríbenos directo por WhatsApp.</p></div></div><div class="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div class="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start"><section aria-label="Formulario de contacto" class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-morado-950/5 sm:p-8">${renderComponent($$result, "FormularioLead", $$FormularioLead, { "origen": "contacto" })}</section><aside class="rounded-xl bg-morado-100 p-6 sm:p-8" aria-label="Datos de contacto">${config?.whatsapp_general && renderTemplate`<a class="boton-oscuro w-full"${addAttribute(whatsappUrl(config.whatsapp_general), "href")}>Enviar WhatsApp</a>`}<dl class="mt-6 space-y-4 text-sm">${config?.telefono_general && renderTemplate`<div><dt class="font-medium text-morado-950/50 uppercase">Teléfono</dt><dd class="mt-0.5 text-base"><a${addAttribute(`tel:${config.telefono_general.replace(/\s/g, "")}`, "href")} class="no-underline hover:underline">${config.telefono_general}</a></dd></div>`}${config?.email_contacto && renderTemplate`<div><dt class="font-medium text-morado-950/50 uppercase">Correo</dt><dd class="mt-0.5 text-base"><a${addAttribute(`mailto:${config.email_contacto}`, "href")} class="no-underline hover:underline">${config.email_contacto}</a></dd></div>`}${config?.direccion_oficina && renderTemplate`<div><dt class="font-medium text-morado-950/50 uppercase">Oficina</dt><dd class="mt-0.5 text-base whitespace-pre-line">${config.direccion_oficina}</dd></div>`}</dl>${!config && renderTemplate`<p class="text-morado-950/70">Muy pronto encontrarás aquí nuestros datos de contacto.</p>`}</aside></div></div>` })}`;
}, "/Users/edgarortega/morado-portal-inmobiliario/src/pages/contacto.astro", void 0);
var $$file = "/Users/edgarortega/morado-portal-inmobiliario/src/pages/contacto.astro";
var $$url = "/contacto";
//#endregion
//#region \0virtual:astro:page:src/pages/contacto@_@astro
var page = () => contacto_exports;
//#endregion
export { page };
