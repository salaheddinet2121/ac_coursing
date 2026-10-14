/**
 * Curated Google-review excerpts.
 *
 * Rules (see the review map, 14 Oct 2026):
 *  - quotes are word for word; cut with "…", never reword or merge two reviews
 *  - author = first name + initial; `meta` only carries facts the map confirms
 *    (town, month + year, service) — leave a fact out rather than guess it
 *  - never feature the owner's own account, anyone tied to the business,
 *    or another company's name
 *  - team members (Walid, Abdelhak, Moncef, Youcef) are NOT named in new
 *    excerpts until each has agreed to it
 *
 * `quote` is stored without surrounding quotation marks.
 */
export interface ReviewExcerpt {
  quote: string;
  author: string;
  meta?: string;
}

const remi: ReviewExcerpt = {
  quote: '…rentre dans les temps (et même plus rapide !), et très soigneux du mobilier et des murs',
  author: 'Rémi V.',
  meta: 'Août 2026 · Déménagement local, 50 m³',
};
const enzo: ReviewExcerpt = {
  quote: "…c'était parfait du début à la fin ! Très polis, professionnels et chaleureux",
  author: 'Enzo C.',
  meta: 'Juillet 2026 · Longue distance, Montpellier → Lyon',
};
const marc: ReviewExcerpt = {
  quote: "Très grand merci à cette société qui m'a sauvé dimanche.",
  author: 'Marc S.',
  meta: 'Juillet 2026 · Déménagement urgent',
};
const isabelleD: ReviewExcerpt = {
  quote: '…le déménagement de notre établissement de 3000 m²… Une force tranquille et efficace',
  author: 'Isabelle D.',
  meta: 'Février 2026 · Déménagement d\'entreprise',
};
const corinne: ReviewExcerpt = {
  quote: 'très bonne écoute. Très important pour nous qui vieillissons',
  author: 'Corinne R.',
  meta: 'Octobre 2024 · Déménagement senior',
};
const emma: ReviewExcerpt = {
  quote: "…le chef d'entreprise répond systématiquement dans la minute",
  author: 'Emma S.',
  meta: 'Octobre 2024 · Déménagement local, 50 m³',
};
const alex: ReviewExcerpt = {
  quote: 'un devis et une date très rapidement, tout s\'est passé nickel',
  author: 'Alex S.',
  meta: 'Montpellier',
};
const valerie: ReviewExcerpt = {
  quote: '…ponctuelle, professionnelle, efficace et très soigneuse',
  author: 'Valérie G.',
  meta: 'Montpellier → Rouen → Paris',
};
const caroline: ReviewExcerpt = {
  quote: 'Prestation fidèle à ce qui a été promis dans le devis… Horaires, prix, prestations respectées',
  author: 'Caroline M.',
  meta: 'Région lyonnaise → Sète',
};
const paloma: ReviewExcerpt = {
  quote: "Il n'y a pas de mauvaise surprise après le devis",
  author: 'Paloma C.',
};

/** Homepage — six situations: local, long distance, urgent, business, seniors, responsiveness. */
export const homeReviews: ReviewExcerpt[] = [remi, enzo, marc, isabelleD, corinne, emma];

/** Per-page excerpts, keyed by route. Pages without a key (e.g. enlèvement de déchets) have no usable review yet. */
export const pageReviews = {
  local: [
    { ...remi, meta: 'Montpellier · 50 m³, 3e étage et demi, sans ascenseur' },
    { ...alex, meta: 'Dans Montpellier' },
    { quote: 'Très réactif pour trouver une date et s\'adapter à mes contraintes', author: 'Stéphanie E.' },
  ],
  entreprise: [
    { quote: '…notre établissement de 3000 m² et tout son mobilier et matériels', author: 'Isabelle D.', meta: 'Février 2026' },
    { quote: 'Nous avons atteint nos objectifs, dans les délais et la qualité', author: 'Charles-Henri D.' },
    { quote: "prennent soin de vos meubles dans les règles de l'art", author: 'Optic Point 2000' },
  ],
  longueDistance: [
    { ...valerie, meta: 'Montpellier → Rouen → Paris, du 5e au 4e étage' },
    { quote: 'super arrangeants malgré un très long trajet et un gros volume', author: 'Chaos Squat', meta: 'Région parisienne → Lodève' },
    caroline,
    { quote: 'Dates et heures du déménagement à la lettre !', author: 'Michail K.' },
  ],
  france: [
    { quote: 'tout était parfait !', author: 'Solenn L.', meta: 'Vannes → Montpellier' },
    { quote: 'le prix imbattable pour faire 1000 kms', author: 'Oliv V.' },
    paloma,
  ],
  miseEnCarton: [
    { quote: 'ils ont tout emballé dans les cartons, les meubles bien entouré du film', author: 'Karima L.', meta: 'Formule Confort' },
    { quote: 'adaptant à chaque chose leur emballage avec beaucoup de précaution et de délicatesse', author: 'Emma S.' },
    { quote: 'Tout a été bien rangé et soigneusement emballé !', author: 'Anaïs F.' },
  ],
  objetsVolumineux: [
    { quote: "pour transporter notre réfrigérateur américain 2 personnes… d'un professionnalisme remarquable", author: 'François M.' },
    { quote: "un déménagement d'objets lourds et encombrants… attentif aux détails des gestes et postures", author: 'Chifae' },
    { quote: 'Soigneux et attentifs', author: 'Noémie L.' },
  ],
  seniors: [
    { quote: 'Très important pour nous qui vieillissons et qui ne comprenons pas toujours à la 1ère explication', author: 'Corinne R.', meta: 'Octobre 2024' },
    { quote: 'L\'équipe a suivi toutes nos recommandations', author: 'Sylvie B.', meta: 'Déménagement senior' },
    { quote: 'calme avec beaucoup de gentillesse… votre patience dans ces moments difficiles', author: 'Marie C.' },
  ],
  // The map's "Emma S. … prix divisé par deux et demi" excerpt is left out on purpose:
  // a quantified price comparison against competitors, on a page that publishes no prices.
  tarif: [
    { quote: "pour moins cher que les autres que j'avais consulté", author: 'Alex S.' },
    { quote: 'Leurs tarifs sont attractifs et compétitifs', author: 'G M' },
    paloma,
  ],
  sete: [caroline],
  lyon: [enzo, caroline],
  about: [
    { quote: 'Un déménagement prévu sur 3 jours, réalisé comme prévu en 3 jours… bien dirigée par le patron', author: 'Benoît J.' },
    { quote: 'Le patron est très réactif… avant, pendant et après', author: 'Annick' },
    { quote: 'Je le recommande chaque fois que des amis ont besoin d\'un déménageur', author: 'Tania C.' },
    { quote: 'déjà 3 de ma familles ont fait appel à ses services', author: 'Florian R.' },
  ],
} satisfies Record<string, ReviewExcerpt[]>;
