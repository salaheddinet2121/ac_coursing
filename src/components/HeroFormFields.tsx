"use client";

import { HeroAddressField } from "./HeroAddressField";
import { HeroFloorSelect } from "./HeroFloorSelect";
import { HeroDatePicker } from "./HeroDatePicker";

interface FloorOption { value: string; label: string }

interface Props {
  floors: FloorOption[];
}

/** Bundles the hero card's three interactive fields into a single Astro
 * island instead of three, so the marketing hero only pays one React
 * hydration cost instead of three. */
export function HeroFormFields({ floors }: Props) {
  return (
    <>
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-primary-fg/85">Adresse de départ</span>
        <HeroAddressField name="address" placeholder="Ex : 12 rue de la Loge, Montpellier" />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-primary-fg/85">Étage</span>
          <HeroFloorSelect name="floor" floors={floors} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-primary-fg/85">Date</span>
          <HeroDatePicker name="date" placeholder="Choisir une date" />
        </label>
      </div>
    </>
  );
}
