import { DIRECTUS_URL } from './directus';

export type PresetImagen = 'thumb' | 'card' | 'hero' | 'galeria';

// Dimensiones de cada preset (definidas en Directus → Settings → Files).
// Se usan para width/height explícitos y evitar layout shift.
export const PRESETS: Record<PresetImagen, { width: number; height: number }> = {
  thumb: { width: 600, height: 400 },
  card: { width: 800, height: 600 },
  hero: { width: 1920, height: 1080 },
  galeria: { width: 1600, height: 1200 },
};

/**
 * URL de un asset con preset. Nunca usar el asset original:
 * los asesores suben fotos de 6MB desde el celular.
 */
export function assetUrl(fileId: string, preset: PresetImagen): string {
  return `${DIRECTUS_URL}/assets/${fileId}?key=${preset}`;
}
