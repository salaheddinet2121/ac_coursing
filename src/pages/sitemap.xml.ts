import type { APIRoute } from 'astro';
import { client } from '../data/client';
import { services, regionalCities, longDistanceRoutes } from '../data/prestations';

const BASE = client.domain;

// Static pages not covered by src/data/prestations.ts.
// /devis/merci and /contact/success are deliberately excluded — they're
// disallowed in robots.txt and aren't meant to be indexed.
const staticRoutes = [
  '/',
  '/about/',
  '/services/',
  '/prestations/',
  '/devis/',
  '/contact/',
  '/reviews/',
  '/galerie/',
  '/conseils/demenagement-montpellier/',
  '/mentions-legales/',
  '/politique-confidentialite/',
];

export const GET: APIRoute = async () => {
  // regionalCities includes the homepage entry (href: '/') — dedupe against staticRoutes.
  const locationRoutes = [...regionalCities, ...longDistanceRoutes]
    .map((l) => (l.href.endsWith('/') ? l.href : `${l.href}/`))
    .filter((href) => href !== '/');

  const serviceRoutes = services.map((s) => (s.href.endsWith('/') ? s.href : `${s.href}/`));

  const urls = [...staticRoutes, ...serviceRoutes, ...locationRoutes];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
