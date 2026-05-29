/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CLIENT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const client = {
  name: 'AC Coursing Déménagement',
  email: 'contact@accoursing.fr',
  phoneForTel: '0751249026',
  phoneFormatted: '07 51 24 90 26',
  license: 'Depuis 2015',
  address: {
    lineOne: '48 Rue Claude Balbastre',
    lineTwo: '',
    city: 'Montpellier',
    state: 'Occitanie',
    zip: '34070',
    country: 'FR',
    mapLink: 'https://maps.app.goo.gl/i8CPg2Emk7VvuQ9SA',
  },
  socials: {
    facebook: '',
    instagram: '',
    google: 'https://share.google/bLVdZ4DXhNcknAGMB',
  },
  domain: 'https://ac-coursing.fr',
} as const;

export type Client = typeof client;
