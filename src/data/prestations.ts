export interface PrestationLink {
  title: string;
  icon: string;
  href: string;
}

export const services: PrestationLink[] = [
  { title: 'Déménagement local', icon: 'map-pin', href: '/services/demenagement-local' },
  { title: "Déménagement d'entreprise", icon: 'building', href: '/services/demenagement-entreprise-montpellier' },
  { title: 'Déménagement longue distance', icon: 'truck-delivery', href: '/services/longue-distance' },
  { title: 'Mise en carton', icon: 'box', href: '/services/mise-en-carton' },
  { title: 'Objets volumineux', icon: 'sofa', href: '/services/objets-volumineux' },
  { title: 'Déménagement seniors', icon: 'heart', href: '/services/seniors' },
  { title: 'Déménagement dans toute la France', icon: 'building', href: '/services/demenagement-france' },
  { title: 'Enlèvement de déchets', icon: 'trash', href: '/services/enlevement-dechets' },
  { title: 'Tarif déménagement', icon: 'file-description', href: '/services/tarif-demenagement-montpellier' },
];

/** P1 immédiat — région Occitanie */
export const regionalCities: PrestationLink[] = [
  { title: 'Montpellier', icon: 'home', href: '/' },
  { title: 'Nîmes', icon: 'map-pin', href: '/lieu-intervention/demenageur-nimes' },
  { title: 'Béziers', icon: 'map-pin', href: '/lieu-intervention/demenageur-beziers' },
  { title: 'Sète', icon: 'map-pin', href: '/lieu-intervention/demenageur-sete' },
  { title: 'Agde', icon: 'map-pin', href: '/lieu-intervention/demenageur-agde' },
  { title: 'Narbonne', icon: 'map-pin', href: '/lieu-intervention/demenageur-narbonne' },
];

/** P1 longue distance */
export const longDistanceRoutes: PrestationLink[] = [
  { title: 'Déménagement Montpellier — Toulouse', icon: 'truck', href: '/lieu-intervention/demenagement-montpellier-toulouse' },
  { title: 'Déménagement Montpellier — Lyon', icon: 'truck', href: '/lieu-intervention/demenagement-montpellier-lyon' },
  { title: 'Déménagement Montpellier — Marseille', icon: 'truck', href: '/lieu-intervention/demenagement-montpellier-marseille' },
];
