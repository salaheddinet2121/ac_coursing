// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://ac-coursing.fr',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),

  integrations: [
    sitemap(),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/devis/merci', '/contact/success'],
        },
      ],
    }),
    react(),
  ],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Oswald',
      cssVariable: '--font-display',
      weights: ['400', '600', '700'],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: ['400', '500', '700'],
      styles: ['normal'],
    },
  ],

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [
      tailwindcss(),
      // Expose .env vars to process.env in dev (needed by server-side modules that avoid import.meta.env to prevent key baking)
      {
        name: 'env-to-process',
        config(_, { command }) {
          if (command === 'serve') {
            // loadEnv is called by Vite before plugins; vars are available via import.meta.env at this point
            // We mirror them into process.env so runtime server modules can read them without baking
          }
        },
        configResolved(config) {
          for (const [k, v] of Object.entries(config.env)) {
            if (!(k in process.env)) process.env[k] = v;
          }
        },
      },
    ],
    server: {
      watch: process.env.USE_POLLING === 'true'
        ? {
            usePolling: true,
            interval: 1000,
          }
        : undefined,
    },
    build: {
      cssMinify: 'lightningcss',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
