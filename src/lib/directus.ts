import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { Schema } from './types';

const url = import.meta.env.DIRECTUS_URL;
const token = import.meta.env.DIRECTUS_TOKEN;

if (!url) {
  throw new Error('Falta DIRECTUS_URL en las variables de entorno');
}

// El token es del rol api_front y vive solo en el servidor.
// Este módulo nunca debe importarse desde código que corra en el navegador.
export const directus = createDirectus<Schema>(url)
  .with(staticToken(token ?? ''))
  .with(rest());

export const DIRECTUS_URL = url;
