import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TablerIcon } from "./tabler-icon";
import { StepFrame } from "./step-frame";
import type { ContactDetails, MoveDetails } from "./types";

export function StepContact({
  contact,
  densityScore,
  onContactChange,
  onDensityChange,
  onNext,
  onPrev,
  isLast,
}: {
  contact: ContactDetails;
  densityScore: string;
  onContactChange: (patch: Partial<ContactDetails>) => void;
  onDensityChange: (value: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}) {
  return (
    <StepFrame
      step={5}
      kicker="Contact"
      title="Ou envoyer votre estimation ?"
      description="Vos coordonnees serviront uniquement a vous envoyer le devis et a confirmer les details."
      onNext={onNext}
      onPrev={onPrev}
      isLast={isLast}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-foreground">
          Nom complet *
          <div className="relative">
            <Input
              value={contact.name}
              onChange={(e) => onContactChange({ name: e.target.value })}
              autoComplete="name"
              required
              placeholder="Jean Dupont"
              className="h-12 rounded-2xl border-border bg-white pr-10"
            />
            <TablerIcon
              name="user"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </label>

        <label className="space-y-2 text-sm font-medium text-foreground">
          Telephone *
          <div className="relative">
            <Input
              value={contact.phone}
              onChange={(e) => onContactChange({ phone: e.target.value })}
              autoComplete="tel"
              inputMode="tel"
              required
              placeholder="06 12 34 56 78"
              className="h-12 rounded-2xl border-border bg-white pr-10"
            />
            <TablerIcon
              name="phone"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </label>

        <label className="space-y-2 text-sm font-medium text-foreground md:col-span-2">
          Email *
          <div className="relative">
            <Input
              value={contact.email}
              onChange={(e) => onContactChange({ email: e.target.value })}
              type="email"
              autoComplete="email"
              required
              placeholder="vous@email.fr"
              className="h-12 rounded-2xl border-border bg-white pr-10"
            />
            <TablerIcon
              name="mail"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </label>

        <div className="space-y-2 text-sm font-medium text-foreground md:col-span-2">
          Volume estimatif du logement
          <Select value={densityScore} onValueChange={onDensityChange}>
            <SelectTrigger className="!h-12 w-full rounded-2xl border-border bg-white px-4 text-sm">
              <SelectValue placeholder="Choisir une estimation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Minimaliste — peu de meubles</SelectItem>
              <SelectItem value="5">Standard — logement meuble normalement</SelectItem>
              <SelectItem value="8">Charge — beaucoup d'affaires</SelectItem>
              <SelectItem value="10">Tres charge — logement tres rempli</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </StepFrame>
  );
}
