import type { InventoryItemDefinition, RoomName, SpecialItemDefinition } from "./types";

export const ROOMS: RoomName[] = [
  "Salon",
  "Chambre",
  "Cuisine",
  "Salle a manger",
  "Bureau",
  "Salle de bain",
  "Garage",
  "Cave / Grenier",
  "Jardin / Exterieur",
];

// ── Full inventory from the official moving checklist ─────────────────────────
// Each item: id, label (French), room, size (volume hint), icon (Tabler name), category, tags
export const INVENTORY_ITEMS: InventoryItemDefinition[] = [
  // ── Assises ────────────────────────────────────────────────────────────────
  { id: "canape-2-3", label: "Canapé 2/3 places", room: "Salon", size: "Large", icon: "sofa", category: "Assises", tags: "sofa salon tissu cuir convertible" },
  { id: "canape-angle", label: "Canapé d'angle", room: "Salon", size: "Extra large", icon: "sofa", category: "Assises", tags: "angle salon canapé" },
  { id: "canape-bz", label: "Canapé BZ / clic-clac", room: "Salon", size: "Large", icon: "sofa", category: "Assises", tags: "bz clic clac convertible lit" },
  { id: "fauteuil", label: "Fauteuil bureau / salon", room: "Salon", size: "Standard", icon: "armchair", category: "Assises", tags: "fauteuil cuir tissu bois bureau" },
  { id: "fauteuil-jardin", label: "Fauteuil de jardin", room: "Jardin / Exterieur", size: "Standard", icon: "armchair", category: "Assises", tags: "jardin teck plastique fer forge exterieur" },
  { id: "chaise", label: "Chaise", room: "Salle a manger", size: "Petit", icon: "armchair", category: "Assises", tags: "chaise standard pliante bureau jardin" },
  { id: "tabouret", label: "Tabouret", room: "Cuisine", size: "Petit", icon: "armchair", category: "Assises", tags: "tabouret cuisine bar pliant" },
  { id: "pouf", label: "Pouf / repose-pieds", room: "Salon", size: "Petit", icon: "circle", category: "Assises", tags: "pouf repose pieds salon" },
  { id: "banc", label: "Banc", room: "Salon", size: "Standard", icon: "armchair", category: "Assises", tags: "banc bois metal pierre plastique" },
  { id: "transat", label: "Transat", room: "Jardin / Exterieur", size: "Standard", icon: "armchair", category: "Assises", tags: "transat teck pliant plastique jardin" },

  // ── Lits & Chambres ────────────────────────────────────────────────────────
  { id: "lit-2", label: "Lit 2 places", room: "Chambre", size: "Extra large", icon: "bed", category: "Chambres", tags: "queen king matelas sommier double motorise pont mezzanine" },
  { id: "lit-1", label: "Lit 1 place", room: "Chambre", size: "Standard", icon: "bed", category: "Chambres", tags: "enfant simple standard motorise pont mezzanine" },
  { id: "lit-bebe", label: "Lit bébé", room: "Chambre", size: "Petit", icon: "bed", category: "Chambres", tags: "bebe barreaux toile parapluie" },
  { id: "table-de-nuit", label: "Table de nuit / chevet", room: "Chambre", size: "Petit", icon: "square", category: "Chambres", tags: "chevet table nuit ancien standard" },
  { id: "commode", label: "Commode", room: "Chambre", size: "Standard", icon: "layout-grid", category: "Chambres", tags: "commode miroir marbre semainier chiffonnier" },
  { id: "coiffeuse", label: "Coiffeuse", room: "Chambre", size: "Standard", icon: "mirror", category: "Chambres", tags: "coiffeuse miroir maquillage" },
  { id: "valet-chambre", label: "Valet de chambre", room: "Chambre", size: "Petit", icon: "hanger", category: "Chambres", tags: "valet chambre portant" },
  { id: "penderie-tissu", label: "Penderie tissu", room: "Chambre", size: "Standard", icon: "hanger", category: "Chambres", tags: "penderie tissu vetements portant" },

  // ── Rangement ─────────────────────────────────────────────────────────────
  { id: "armoire-2p", label: "Armoire 2 portes", room: "Chambre", size: "Large", icon: "archive", category: "Rangement", tags: "armoire penderie garde robe bois" },
  { id: "armoire-3p", label: "Armoire 3/4 portes", room: "Chambre", size: "Extra large", icon: "archive", category: "Rangement", tags: "armoire penderie garde robe 3 4 portes" },
  { id: "armoire-metal", label: "Armoire métallique", room: "Bureau", size: "Large", icon: "archive", category: "Rangement", tags: "armoire metal rideau bureau" },
  { id: "bibliotheque", label: "Bibliothèque", room: "Salon", size: "Large", icon: "books", category: "Rangement", tags: "bibliotheque living meuble tv hifi livre etagere" },
  { id: "etagere", label: "Étagère", room: "Salon", size: "Standard", icon: "books", category: "Rangement", tags: "etagere bois metal fer forge mural" },
  { id: "bonnetiere", label: "Bonnetière / homme debout", room: "Chambre", size: "Large", icon: "archive", category: "Rangement", tags: "bonnetiere homme debout penderie" },
  { id: "meuble-chaussures", label: "Meuble à chaussures", room: "Couloir", size: "Standard", icon: "archive", category: "Rangement", tags: "chaussures entree couloir mural bas" },
  { id: "coffre-jouets", label: "Coffre à jouets", room: "Chambre", size: "Standard", icon: "box", category: "Rangement", tags: "coffre jouets bois plastique enfant" },
  { id: "malle", label: "Malle", room: "Cave / Grenier", size: "Standard", icon: "box", category: "Rangement", tags: "malle bois osier metal voyage cave grenier" },
  { id: "meuble-classeur", label: "Meuble classeur", room: "Bureau", size: "Standard", icon: "file-cabinet", category: "Rangement", tags: "classeur bureau dossier papier" },

  // ── Tables & Repas ─────────────────────────────────────────────────────────
  { id: "table-manger", label: "Table à manger", room: "Salle a manger", size: "Large", icon: "table", category: "Repas", tags: "table manger ferme pliante jardin bois verre" },
  { id: "table-basse", label: "Table basse", room: "Salon", size: "Standard", icon: "table", category: "Repas", tags: "table basse salon marbre vitree verre" },
  { id: "table-gigogne", label: "Table gigogne", room: "Salon", size: "Petit", icon: "table", category: "Repas", tags: "table gigogne salon empilable" },
  { id: "table-roulante", label: "Table roulante", room: "Cuisine", size: "Standard", icon: "table", category: "Repas", tags: "table roulante cuisine service" },
  { id: "table-langer", label: "Table à langer", room: "Chambre", size: "Standard", icon: "table", category: "Repas", tags: "table langer bebe standard commode combinee" },
  { id: "gueridon", label: "Guéridon", room: "Salon", size: "Petit", icon: "table", category: "Repas", tags: "gueridon table ronde colonne cafe" },
  { id: "vaisselier", label: "Vaisselier", room: "Salle a manger", size: "Large", icon: "archive", category: "Repas", tags: "vaisselier 1 2 3 4 portes salle manger" },
  { id: "argentier", label: "Argentier", room: "Salle a manger", size: "Standard", icon: "archive", category: "Repas", tags: "argentier argent vaisselle salle manger" },

  // ── Meubles de salon ──────────────────────────────────────────────────────
  { id: "meuble-tv", label: "Meuble TV / hifi", room: "Salon", size: "Standard", icon: "device-tv", category: "Salon", tags: "meuble tv hifi informatique telephone living" },
  { id: "living", label: "Living / ensemble salon", room: "Salon", size: "Extra large", icon: "layout-grid", category: "Salon", tags: "living ensemble salon meuble combiné" },
  { id: "console", label: "Console", room: "Couloir", size: "Standard", icon: "table", category: "Salon", tags: "console verre bois fer forge entree couloir" },
  { id: "sellette", label: "Sellette", room: "Salon", size: "Petit", icon: "plant", category: "Salon", tags: "sellette bois fer forge colonne plante" },
  { id: "horloge", label: "Horloge / comtoise", room: "Salon", size: "Large", icon: "clock", category: "Salon", tags: "horloge comtoise murale ancienne pendule" },
  { id: "miroir", label: "Miroir", room: "Salon", size: "Standard", icon: "mirror", category: "Salon", tags: "miroir ancien moderne trumeau dimensions" },
  { id: "tableau", label: "Tableau / cadre", room: "Salon", size: "Standard", icon: "frame", category: "Salon", tags: "tableau cadre peinture miroir trumeau dimensions" },
  { id: "luminaire", label: "Luminaire / lustre", room: "Salon", size: "Standard", icon: "bulb", category: "Salon", tags: "luminaire applique lustre halogene lampe" },
  { id: "tapis", label: "Tapis", room: "Salon", size: "Large", icon: "layout-grid", category: "Salon", tags: "tapis salon dimensions" },

  // ── Bureau & Travail ──────────────────────────────────────────────────────
  { id: "bureau", label: "Bureau", room: "Bureau", size: "Large", icon: "desk", category: "Bureau", tags: "bureau ministre retour secretaire ancien standard" },
  { id: "ordinateur", label: "Ordinateur / écran", room: "Bureau", size: "Standard", icon: "device-desktop", category: "Bureau", tags: "ordinateur ecran desktop informatique" },
  { id: "machine-coudre", label: "Machine à coudre", room: "Bureau", size: "Standard", icon: "tools", category: "Bureau", tags: "machine coudre ancienne" },

  // ── Buffets & Rangements repas ─────────────────────────────────────────────
  { id: "buffet-bas", label: "Buffet bas", room: "Salle a manger", size: "Large", icon: "archive", category: "Rangement", tags: "buffet bas 1 2 3 4 portes marbre" },
  { id: "buffet-2corps", label: "Buffet 2 corps", room: "Salle a manger", size: "Extra large", icon: "archive", category: "Rangement", tags: "buffet 2 corps 2 3 4 portes marbre" },
  { id: "bar-comptoir", label: "Bar / comptoir", room: "Salon", size: "Large", icon: "glass-cocktail", category: "Rangement", tags: "bar comptoir dimensions" },

  // ── Électroménager ────────────────────────────────────────────────────────
  { id: "refrigerateur", label: "Réfrigérateur", room: "Cuisine", size: "Large", icon: "fridge", category: "Electromenager", tags: "refrigerateur combine americain top congelateur cave vin" },
  { id: "congelateur", label: "Congélateur", room: "Cuisine", size: "Large", icon: "fridge", category: "Electromenager", tags: "congelateur top armoire coffre" },
  { id: "lave-linge", label: "Lave-linge", room: "Cuisine", size: "Large", icon: "wash-machine", category: "Electromenager", tags: "lave linge standard 8kg sechant seche" },
  { id: "lave-vaisselle", label: "Lave-vaisselle", room: "Cuisine", size: "Large", icon: "tools-kitchen-2", category: "Electromenager", tags: "lave vaisselle cuisine" },
  { id: "seche-linge", label: "Sèche-linge", room: "Cuisine", size: "Large", icon: "wash-machine", category: "Electromenager", tags: "seche linge" },
  { id: "four", label: "Four / micro-ondes", room: "Cuisine", size: "Standard", icon: "tools-kitchen-2", category: "Electromenager", tags: "four encastre micro ondes" },
  { id: "gaziniere", label: "Gazinière / plaque", room: "Cuisine", size: "Standard", icon: "flame", category: "Electromenager", tags: "gaziniere plaque cuisson vitroceramique standard large" },
  { id: "hotte", label: "Hotte de cuisine", room: "Cuisine", size: "Standard", icon: "tools-kitchen-2", category: "Electromenager", tags: "hotte cuisine aspiration" },
  { id: "cave-vin", label: "Cave à vin", room: "Cuisine", size: "Standard", icon: "bottle", category: "Electromenager", tags: "cave vin refrigerateur dimensions" },
  { id: "climatiseur", label: "Climatiseur", room: "Salon", size: "Standard", icon: "air-conditioning", category: "Electromenager", tags: "climatiseur clim split reversible" },

  // ── Cuisine (meubles) ─────────────────────────────────────────────────────
  { id: "element-cuisine", label: "Meuble élément cuisine", room: "Cuisine", size: "Standard", icon: "archive", category: "Cuisine", tags: "element cuisine haut bas porte angle colonne" },
  { id: "billot-cuisine", label: "Billot de cuisine", room: "Cuisine", size: "Standard", icon: "table", category: "Cuisine", tags: "billot cuisine bois dimensions" },
  { id: "plan-travail", label: "Plan de travail", room: "Cuisine", size: "Large", icon: "table", category: "Cuisine", tags: "plan travail 1 2 3 metres" },

  // ── Salle de bain ─────────────────────────────────────────────────────────
  { id: "element-sdb", label: "Élément salle de bain", room: "Salle de bain", size: "Standard", icon: "bath", category: "Salle de bain", tags: "element salle bain haut bas porte colonne sous lavabo" },

  // ── Instruments & déco ───────────────────────────────────────────────────
  { id: "instrument-musique", label: "Instrument de musique", room: "Salon", size: "Standard", icon: "music", category: "Decoration", tags: "guitare batterie ampli synthetiseur instrument musique" },
  { id: "aquarium", label: "Aquarium", room: "Salon", size: "Large", icon: "fish", category: "Decoration", tags: "aquarium 20 75 250 litres poisson" },
  { id: "statue", label: "Statue", room: "Salon", size: "Standard", icon: "plant-2", category: "Decoration", tags: "statue sculpture 1 2 3 metres" },
  { id: "jarres-potiches", label: "Jarres / vasques / potiches", room: "Jardin / Exterieur", size: "Standard", icon: "plant-2", category: "Decoration", tags: "jarres vasques potiches jardin exterieur" },

  // ── Jardin & Extérieur ────────────────────────────────────────────────────
  { id: "plantes", label: "Plantes intérieures / extérieures", room: "Jardin / Exterieur", size: "Variable", icon: "plant", category: "Jardin", tags: "plantes interieur exterieur 1 2 metres jardin" },
  { id: "velo", label: "Vélo adulte / enfant", room: "Garage", size: "Standard", icon: "bike", category: "Jardin", tags: "velo adulte enfant bicyclette" },
  { id: "outils-jardin", label: "Outils de jardin", room: "Garage", size: "Standard", icon: "tools", category: "Jardin", tags: "outils jardin pelle rateau tondeuse brouette" },
  { id: "tondeuse", label: "Tondeuse à gazon", room: "Garage", size: "Large", icon: "tractor", category: "Jardin", tags: "tondeuse gazon standard microtracteur" },
  { id: "parasol", label: "Parasol", room: "Jardin / Exterieur", size: "Standard", icon: "umbrella", category: "Jardin", tags: "parasol standard grand format terrasse" },
  { id: "barbecue", label: "Barbecue", room: "Jardin / Exterieur", size: "Standard", icon: "flame", category: "Jardin", tags: "barbecue standard pierre" },
  { id: "balancoire", label: "Balançoire / toboggan", room: "Jardin / Exterieur", size: "Extra large", icon: "friends", category: "Jardin", tags: "balancoire toboggan balancelle enfant jardin" },

  // ── Garage & Atelier ──────────────────────────────────────────────────────
  { id: "cartons", label: "Cartons / placards", room: "Cave / Grenier", size: "Variable", icon: "box", category: "Cartons & Volume", tags: "cartons placards integres rayonnages garage atelier cave" },
  { id: "rayonnages", label: "Rayonnages", room: "Garage", size: "Large", icon: "layout-grid", category: "Cartons & Volume", tags: "rayonnages garage atelier arriere cuisine metal bois" },
  { id: "echafaudage", label: "Échafaudage / échelle", room: "Garage", size: "Large", icon: "tools", category: "Cartons & Volume", tags: "echafaudage echelle escabeau dimensions" },
  { id: "etabli", label: "Établi", room: "Garage", size: "Large", icon: "tools", category: "Cartons & Volume", tags: "etabli bois metal pliant atelier" },
  { id: "appareil-muscu", label: "Appareil de musculation", room: "Garage", size: "Extra large", icon: "barbell", category: "Cartons & Volume", tags: "musculation fitness sport appareil" },
  { id: "billard", label: "Billard", room: "Salon", size: "Extra large", icon: "circle-dot", category: "Cartons & Volume", tags: "billard table jeu salon" },
  { id: "baby-foot", label: "Baby-foot", room: "Salon", size: "Large", icon: "friends", category: "Cartons & Volume", tags: "baby foot table jeu" },
  { id: "table-ping-pong", label: "Table de ping-pong", room: "Garage", size: "Extra large", icon: "table", category: "Cartons & Volume", tags: "ping pong tennis table" },
];

export const POPULAR_ITEM_IDS = [
  "canape-2-3",
  "lit-2",
  "armoire-2p",
  "refrigerateur",
  "table-manger",
  "cartons",
  "bureau",
  "meuble-tv",
];

export const CATEGORIES = [
  "Tous",
  "Assises",
  "Chambres",
  "Rangement",
  "Repas",
  "Salon",
  "Bureau",
  "Electromenager",
  "Cuisine",
  "Salle de bain",
  "Jardin",
  "Cartons & Volume",
  "Decoration",
] as const;

export type CategoryName = (typeof CATEGORIES)[number];

export const SPECIAL_ITEMS: SpecialItemDefinition[] = [
  { id: "piano", label: "Piano", icon: "piano", hint: "Piano droit ou instrument lourd." },
  { id: "coffre-fort", label: "Coffre-fort", icon: "shield-lock", hint: "Indiquez le poids si possible." },
  { id: "moto", label: "Moto / scooter", icon: "motorbike", hint: "Moto, mobylette, scooter ou quad." },
  { id: "billard-special", label: "Billard", icon: "circle-dot", hint: "Table de billard, tres lourde." },
  { id: "fragile", label: "Objets fragiles", icon: "package", hint: "Vaisselle, miroir, marbre, antiquites." },
  { id: "aquarium-special", label: "Aquarium volumineux", icon: "fish", hint: "Aquarium de plus de 75 litres." },
  { id: "plantes-speciales", label: "Plantes volumineuses", icon: "plant", hint: "Plantes hautes ou tres lourdes." },
  { id: "oeuvres-art", label: "Œuvres d'art", icon: "frame", hint: "Tableaux, sculptures, antiquites de valeur." },
];
