export type RoomName =
  | "Salon"
  | "Chambre"
  | "Cuisine"
  | "Salle a manger"
  | "Bureau"
  | "Salle de bain"
  | "Garage"
  | "Cave / Grenier"
  | "Jardin / Exterieur"
  | "Couloir";

export type MoveType = "particulier" | "professionnel";

export interface InventoryItemDefinition {
  id: string;
  label: string;
  room: RoomName;
  size: string;
  icon: string;
  tags: string;
  category: string;
}

export interface SpecialItemDefinition {
  id: string;
  label: string;
  icon: string;
  hint: string;
}

export interface SelectedInventoryItem extends InventoryItemDefinition {
  quantity: number;
  fragile: boolean;
  assignedRoom: RoomName;
}

export interface ContactDetails {
  name: string;
  phone: string;
  email: string;
}

export interface MoveDetails {
  moveType: MoveType;
  fromCity: string;
  toCity: string;
  moveDate: string;
  accessType: "ascenseur" | "escaliers" | "rdc";
  densityScore: string;
}
