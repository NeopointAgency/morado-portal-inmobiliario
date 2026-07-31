// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// SSR on-demand: los asesores publican en Directus y la propiedad
// sale al aire al instante, sin rebuilds.
export default defineConfig({
  output: 'server',
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()],
  },
});