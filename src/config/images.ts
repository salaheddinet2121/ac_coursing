import type { ImageMetadata } from 'astro';

export const heroImage: ImageMetadata | undefined = undefined;
export const aboutImage: ImageMetadata | undefined = undefined;

export interface GalleryImage {
  src: ImageMetadata | string;
  alt: string;
}

const discovered = Object.entries(
  import.meta.glob<{ default: ImageMetadata }>(
    '../assets/images/gallery/*.{jpg,jpeg,png,webp,avif}',
    { eager: true },
  ),
).map(([path, mod]): GalleryImage => ({
  src: mod.default,
  alt: path
    .split('/')
    .pop()!
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()),
}));

const placeholders: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=900&q=80', alt: 'Équipe de déménageurs en intervention' },
  { src: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=900&q=80', alt: 'Cartons protégés et prêts au chargement' },
  { src: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=900&q=80', alt: 'Camion de déménagement chargé pour un départ' },
  { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80', alt: 'Installation du mobilier dans un nouvel appartement' },
  { src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80', alt: 'Garde-meubles sécurisé pour stockage temporaire' },
  { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80', alt: 'Livraison longue distance organisée avec soin' },
];

export const galleryImages: GalleryImage[] = discovered.length > 0 ? discovered : placeholders;
