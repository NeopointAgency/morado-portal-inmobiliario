import type { Moneda, Operacion } from './types';

const formatters: Record<Moneda, Intl.NumberFormat> = {
  MXN: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }),
  USD: new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
};

export function formatoPrecio(precio: number, moneda: Moneda = 'MXN', operacion?: Operacion): string {
  const base = formatters[moneda].format(precio);
  const sufijo = moneda === 'USD' ? ' USD' : '';
  return operacion === 'renta' ? `${base}${sufijo} / mes` : `${base}${sufijo}`;
}

/** "apaseo_el_grande" → "Apaseo El Grande" (fallback para valores fuera del catálogo) */
export function etiqueta(valor: string): string {
  return valor
    .split(/[_-]/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

/** Slug estable a partir de un nombre ("María Pérez" → "maria-perez") */
export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
