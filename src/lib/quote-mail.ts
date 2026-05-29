import { escapeHtml, formatFrenchDate } from './form-utils';

export type QuoteRequest = {
  moveType: 'particulier' | 'professionnel';
  fromCity: string;
  toCity: string;
  moveDate?: string;
  accessType: 'ascenseur' | 'escaliers' | 'rdc';
  inventory: Array<{ id: string; qty: number }>;
  otherItems: string;
  specialItems: string[];
  name: string;
  phone: string;
  email: string;
};

const accessLabels: Record<QuoteRequest['accessType'], string> = {
  ascenseur: 'Ascenseur disponible',
  escaliers: 'Escaliers uniquement',
  rdc: 'Rez-de-chaussée',
};

const specialLabels: Record<string, string> = {
  piano: 'Piano',
  coffre: 'Coffre-fort',
  moto: 'Moto / scooter',
  fragile: 'Objets fragiles',
  art: "Oeuvres d'art",
  aquarium: 'Aquarium',
};

const inventoryLabels: Record<string, string> = {
  canape: 'Canapé',
  fauteuil: 'Fauteuil',
  'table-basse': 'Table basse',
  'meuble-tv': 'Meuble TV',
  bibliotheque: 'Bibliothèque',
  tapis: 'Tapis',
  lit: 'Lit',
  armoire: 'Armoire',
  commode: 'Commode',
  bureau: 'Bureau',
  chevet: 'Table de chevet',
  frigo: 'Réfrigérateur',
  'lave-linge': 'Lave-linge',
  'lave-vaisselle': 'Lave-vaisselle',
  'table-repas': 'Table à manger',
  'micro-ondes': 'Four / micro-ondes',
  'bureau-pro': 'Bureau professionnel',
  ordinateur: 'Ordinateur',
  etagere: 'Étagère',
  'fauteuil-bureau': 'Fauteuil de bureau',
  cartons: 'Cartons',
  velo: 'Vélo',
  plantes: 'Plantes',
  'appareils-muscu': 'Appareils de musculation',
};

export function summarizeInventory(items: QuoteRequest['inventory']) {
  const lines = items
    .filter((item) => item.qty > 0)
    .map((item) => `${item.qty} x ${inventoryLabels[item.id] ?? item.id}`);

  return lines.length > 0 ? lines.join(', ') : 'Non renseigné';
}

export function summarizeSpecialItems(items: string[]) {
  return items.length > 0 ? items.map((item) => specialLabels[item] ?? item).join(', ') : 'Aucun';
}

export function buildQuoteEmail(payload: QuoteRequest) {
  const formattedDate = payload.moveDate ? formatFrenchDate(payload.moveDate) : 'Non renseignée';
  const inventory = summarizeInventory(payload.inventory);
  const specialItems = summarizeSpecialItems(payload.specialItems);
  const moveType = payload.moveType === 'professionnel' ? 'Professionnel' : 'Particulier';

  const text = [
    'Nouvelle demande de devis',
    '',
    `Nom: ${payload.name}`,
    `Téléphone: ${payload.phone}`,
    `Email: ${payload.email}`,
    '',
    `Type: ${moveType}`,
    `Trajet: ${payload.fromCity} -> ${payload.toCity}`,
    `Date souhaitée: ${formattedDate}`,
    `Accès: ${accessLabels[payload.accessType]}`,
    `Mobilier: ${inventory}`,
    `Objets particuliers: ${specialItems}`,
    `Autres objets: ${payload.otherItems || 'Aucun'}`,
  ].join('\n');

  const rows = [
    ['Nom', payload.name],
    ['Téléphone', payload.phone],
    ['Email', payload.email],
    ['Type', moveType],
    ['Trajet', `${payload.fromCity} → ${payload.toCity}`],
    ['Date souhaitée', formattedDate],
    ['Accès', accessLabels[payload.accessType]],
    ['Mobilier', inventory],
    ['Objets particuliers', specialItems],
    ['Autres objets', payload.otherItems || 'Aucun'],
  ];

  const html = `
    <h1>Nouvelle demande de devis</h1>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#d7d7d7;">
      <tbody>
        ${rows
          .map(
            ([label, value]) =>
              `<tr><th align="left" style="background:#f5f5f5;">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
          )
          .join('')}
      </tbody>
    </table>
  `;

  return { html, text };
}
