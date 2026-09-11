"use client";

import { BofuAddressField } from "./BofuAddressField";
import { BofuFloorSelect } from "./BofuFloorSelect";
import { BofuDatePicker } from "./BofuDatePicker";

interface FloorOption { value: string; label: string }

interface Props {
  floors: FloorOption[];
}

/** Same bundling as HeroFormFields (one island instead of three), styled
 * for the white quote-form card used on BOFU landing pages. */
export function BofuFormFields({ floors }: Props) {
  return (
    <div className="mb-5 space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-foreground/70">Adresse de départ</span>
        <BofuAddressField name="address" placeholder="Ex : 12 rue de la Loge, Montpellier" />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-foreground/70">Étage</span>
          <BofuFloorSelect name="floor" floors={floors} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-foreground/70">Date</span>
          <BofuDatePicker name="date" placeholder="Choisir une date" />
        </label>
      </div>
    </div>
  );
}
