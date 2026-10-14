/**
* City photos from Wikimedia Commons, free licences. Credits are shown on each city page.
*/
export interface CityPhoto { src: string; author: string; license: string; licenseUrl: string; source: string }

export const cityPhotos: Record<string, { hero: CityPhoto; local: CityPhoto }> = {
  sete: {
    hero: { src: "/images/villes/sete-hero.webp", author: "Christian Ferrer", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0", source: "https://commons.wikimedia.org/wiki/File:Canal_de_S%C3%A8te_juste_avant_cr%C3%A9puscule_01.jpg" },
    local: { src: "/images/villes/sete-local.webp", author: "Florian Pépellin", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Centre-ville_de_S%C3%A8te_depuis_le_Mont_Saint-Clair_(%C3%A9t%C3%A9_2018).JPG" },
  },
  nimes: {
    hero: { src: "/images/villes/nimes-hero.webp", author: "Krzysztof Golik", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Arenes_de_Nimes_(1).jpg" },
    local: { src: "/images/villes/nimes-local.webp", author: "Krzysztof Golik", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Maison_Carree_in_Nimes_(1).jpg" },
  },
  beziers: {
    hero: { src: "/images/villes/beziers-hero.webp", author: "Christian Ferrer", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0", source: "https://commons.wikimedia.org/wiki/File:Pont_Vieux_et_Cath%C3%A9drale_Saint-Nazaire.jpg" },
    local: { src: "/images/villes/beziers-local.webp", author: "Sanchezn", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:CathedraleBeziers.jpg" },
  },
  agde: {
    hero: { src: "/images/villes/agde-hero.webp", author: "Jorge Franganillo", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", source: "https://commons.wikimedia.org/wiki/File:Agde-_Cath%C3%A9drale_Saint-%C3%89tienne_-_52269094373.jpg" },
    local: { src: "/images/villes/agde-local.webp", author: "Christian Ferrer", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0", source: "https://commons.wikimedia.org/wiki/File:H%C3%A9rault_River_in_Agde_02.jpg" },
  },
  narbonne: {
    hero: { src: "/images/villes/narbonne-hero.webp", author: "Matthieu", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0", source: "https://commons.wikimedia.org/wiki/File:Narbonne_-_Canal_de_la_Robine_01.jpg" },
    local: { src: "/images/villes/narbonne-local.webp", author: "Daniel CULSAN", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Canal_de_la_Robine_%C3%A0_Narbonne.jpg" },
  },
};
