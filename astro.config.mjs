// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://josephsmithvaz777-svg.github.io',
  base: '/digitalstoretrujillo-v1',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    port: 4321,
    host: true
  }
});