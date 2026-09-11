/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BRAND CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  name: 'AC Coursing Déménagement',
  tagline: 'Votre déménagement, géré avec soin, livré parfait.',
  description:
    'Entreprise de déménagement à Montpellier: devis gratuit sous 24h, prix fixe garanti, assurance transport incluse et accompagnement partout en France.',
  url: 'https://ac-coursing.fr',
  locale: 'fr_FR',
} as const;

export type Brand = typeof brand;
