// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),

  vite: {
      plugins: [tailwindcss()],
	},


  integrations: [
    sanity({
      projectId: "i7q7u7k8",
      dataset: "production",
      useCdn: false,
    }),
  ],
});
