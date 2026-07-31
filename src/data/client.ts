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
    mapLink: 'https://maps.app.goo.gl/i8CPg2Emk7VvuQ9SA',
  },
  socials: {
    facebook: '',
    instagram: '',
    google: 'https://www.google.com/maps/place/Ac+Coursing+D%C3%A9m%C3%A9nagement/@43.5733038,3.8568844,17z/data=!3m2!4b1!5s0x12b6ae2a1368b97f:0xd4e32ba98aa5de0a!4m6!3m5!1s0x12b6afe39eda3587:0x6ddc0fba6f72b9d8!8m2!3d43.5733!4d3.8617553!16s%2Fg%2F11qm09_lbh?entry=ttu',
  },
  domain: 'https://ac-coursing.fr',
} as const;

export type Client = typeof client;
