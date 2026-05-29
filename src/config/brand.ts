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

  fonts: {
    body: 'Inter',
    display: 'Oswald',
  },

  colors: {
    primary: '#1c1a77',
    primaryLight: '#2c2a96',
    primaryFg: '#ffffff',

    accent: '#ffab4b',
    accentFg: '#1c1a77',

    background: '#f7f8fc',
    surface: '#ffffff',
    border: '#e6e9f5',

    text: '#1c1a77',
    textMuted: '#5f668a',

    dark: '#17155f',
    darkSurface: '#23217f',
  },

  radius: {
    sm: '0.375rem',
    md: '0.625rem',
    lg: '1rem',
    full: '9999px',
  },
} as const;

export type Brand = typeof brand;
