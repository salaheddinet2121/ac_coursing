/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CLIENT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const client = {
  name: 'AC Coursing Déménagement',
  email: 'contact@ac-coursing.fr',
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
    mapLink: 'https://maps.google.com/?cid=7916219538418612696',
  },
  socials: {
    facebook: '',
    instagram: '',
    google: 'https://maps.google.com/?cid=7916219538418612696',
    // Paste the "Demander des avis" link from the Google Business Profile dashboard (g.page/r/…/review).
    // The invite block on /reviews only shows once this is set.
    googleReview: '',
  },
  domain: 'https://ac-coursing.fr',
} as const;

export type Client = typeof client;
