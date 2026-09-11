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

export const routes: PrestationLink[] = [
  { title: 'Montpellier', icon: 'home', href: '/' },
  { title: 'Nîmes', icon: 'map-pin', href: '/lieu-intervention/demenageur-nimes' },
  { title: 'Déménagement Montpellier — Paris', icon: 'truck', href: '/lieu-intervention/demenagement-montpellier-paris' },
];
