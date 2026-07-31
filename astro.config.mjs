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
      // Expose .env vars to process.env in dev (needed by server-side modules
      // that avoid import.meta.env to prevent key baking).
      //
      // Note: reading Vite's `config.env` does NOT work here — it only holds
      // client-exposed vars (VITE_*), so server-only secrets like
      // RESEND_API_KEY are absent from it and never reach process.env.
      // Existing process.env values win, so real env vars (Coolify, CI)
      // always take precedence over a local .env file.
      {
        name: 'env-to-process',
        config() {
          const before = { ...process.env };
          try {
            process.loadEnvFile('.env');
          } catch {
            return; // no .env file — production supplies real env vars
          }
          for (const key of Object.keys(before)) {
            if (before[key] !== undefined) process.env[key] = before[key];
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
