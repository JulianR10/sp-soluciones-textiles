// @ts-check

import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://JulianR10.github.io',
  base: process.env.VERCEL ? '/' : '/sp-soluciones-textiles',
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwind()],
  },
});
