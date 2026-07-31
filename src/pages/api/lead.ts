import type { APIRoute } from 'astro';
import { createItem, readItem } from '@directus/sdk';
import { directus } from '../../lib/directus';
import { configuracionSitio } from '../../lib/queries';
import { whatsappUrl } from '../../lib/whatsapp';
import type { Asesor } from '../../lib/types';

export const prerender = false;

/**
 * Único camino de conversión del sitio:
 * formulario → guardar lead en Directus → redirect 303 a wa.me del asesor.
 *
 * Regla de oro: si falla el guardado del lead, el usuario SE VA A WHATSAPP
 * IGUAL. La conversación importa más que el registro.
 */

// Rate limit por IP, en memoria. En Vercel es por instancia de función,
// suficiente contra ráfagas de un mismo bot; no es un WAF.
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const intentos = new Map<string, number[]>();

function excedeLimite(ip: string): boolean {
  const ahora = Date.now();
  const previos = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  previos.push(ahora);
  intentos.set(ip, previos);
  if (intentos.size > 5000) intentos.clear(); // no crecer sin límite
  return previos.length > MAX_POR_VENTANA;
}

const ES_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ES_TELEFONO = /^[0-9+\s().-]{7,20}$/;
const ES_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function redirigir(url: string): Response {
  return new Response(null, { status: 303, headers: { Location: url } });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response('Solicitud inválida', { status: 400 });
  }

  const campo = (n: string) => String(form.get(n) ?? '').trim();

  const nombre = campo('nombre');
  const telefono = campo('telefono');
  const email = campo('email');
  const mensaje = campo('mensaje').slice(0, 1000);
  const propiedadId = campo('propiedad_id');
  const origen = campo('origen') === 'contacto' ? 'contacto' : 'ficha';
  const honeypot = campo('sitio_web'); // un humano nunca llena este campo

  // Bot detectado: fingir éxito sin guardar nada ni entregar el número.
  if (honeypot) {
    return redirigir('/');
  }

  // Validación en servidor. El navegador ya valida, pero el navegador miente.
  const errores: string[] = [];
  if (nombre.length < 2 || nombre.length > 120) errores.push('nombre');
  if (!ES_TELEFONO.test(telefono)) errores.push('telefono');
  if (email && !ES_EMAIL.test(email)) errores.push('email');
  if (propiedadId && !ES_UUID.test(propiedadId)) errores.push('propiedad');

  const volver = origen === 'contacto' ? '/contacto' : request.headers.get('referer') || '/propiedades';

  if (errores.length > 0) {
    const destino = new URL(volver, request.url);
    destino.searchParams.set('error', 'datos');
    return redirigir(destino.pathname + destino.search);
  }

  const limitado = excedeLimite(clientAddress ?? 'desconocida');

  // 1. Resolver la propiedad y su asesor (el WhatsApp apunta al asesor
  //    asignado, no a un número general).
  let asesor: Asesor | null = null;
  let tituloPropiedad: string | undefined;
  let urlFicha: string | undefined;

  if (propiedadId) {
    try {
      const propiedad = await directus.request(
        readItem('propiedades', propiedadId, {
          fields: ['id', 'titulo', 'slug', { asesor: ['id', 'whatsapp', 'activo'] }],
        })
      );
      tituloPropiedad = propiedad.titulo;
      const sitio = import.meta.env.PUBLIC_SITE_URL ?? new URL(request.url).origin;
      urlFicha = new URL(`/propiedades/${propiedad.slug}`, sitio).href;
      const a = propiedad.asesor;
      if (a && typeof a === 'object' && a.activo && a.whatsapp) {
        asesor = a as Asesor;
      }
    } catch (error) {
      console.error('[lead] No se pudo resolver la propiedad', propiedadId, error);
    }
  }

  // 2. Guardar el lead. Si falla, se loguea y se sigue: nunca bloquear
  //    al usuario camino a WhatsApp.
  if (!limitado) {
    try {
      await directus.request(
        createItem('leads', {
          nombre,
          telefono,
          email: email || null,
          mensaje: mensaje || null,
          propiedad: propiedadId || null,
          asesor: asesor?.id ?? null,
          origen,
          estatus: 'nuevo',
        })
      );
    } catch (error) {
      console.error('[lead] No se pudo guardar el lead', error);
    }
  } else {
    console.warn('[lead] Rate limit alcanzado para', clientAddress);
  }

  // 3. Mandar al usuario a WhatsApp: asesor de la propiedad, o el número
  //    general como último recurso.
  if (asesor) {
    return redirigir(whatsappUrl(asesor.whatsapp, tituloPropiedad, urlFicha));
  }

  try {
    const config = await configuracionSitio();
    if (config?.whatsapp_general) {
      return redirigir(whatsappUrl(config.whatsapp_general, tituloPropiedad, urlFicha));
    }
  } catch (error) {
    console.error('[lead] No se pudo leer configuracion_sitio', error);
  }

  // Sin ningún número disponible: de vuelta con aviso.
  const destino = new URL(volver, request.url);
  destino.searchParams.set('enviado', '1');
  return redirigir(destino.pathname + destino.search);
};
