import type { APIRoute } from 'astro';
import { client } from '../data/client';
import { services, regionalCities, longDistanceRoutes } from '../data/prestations';

const BASE = client.domain;

// Every <loc> must be identical to the page's canonical URL: no trailing slash
// (trailingSlash: 'never'), except the homepage which is "/".
//
// lastmod: bump DEFAULT_LASTMOD when the site-wide chrome (header, footer) changes;
// add an entry to LASTMOD_OVERRIDES when a single page's content changes.
const DEFAULT_LASTMOD = '2026-10-13';
const LASTMOD_OVERRIDES: Record<string, string> = {};

// Static pages not covered by src/data/prestations.ts.
// /devis/merci and /contact/success are deliberately excluded — they're
// disallowed in robots.txt and aren't meant to be indexed.
// /prestations 301s to /services, so it is not listed.
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/devis',
  '/contact',
  '/reviews',
  '/galerie',
  '/conseils',
  '/conseils/demenagement-montpellier',
  '/mentions-legales',
  '/politique-confidentialite',
];

const clean = (href: string) => (href === '/' ? href : href.replace(/\/+$/, ''));

export const GET: APIRoute = async () => {
  // regionalCities includes the homepage entry (href: '/') — dedupe against staticRoutes.
  const urls = [
    ...new Set(
      [...staticRoutes, ...services, ...regionalCities, ...longDistanceRoutes].map((r) =>
        clean(typeof r === 'string' ? r : r.href),
      ),
    ),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${BASE}${u === '/' ? '/' : u}</loc><lastmod>${LASTMOD_OVERRIDES[u] ?? DEFAULT_LASTMOD}</lastmod></url>`)
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
