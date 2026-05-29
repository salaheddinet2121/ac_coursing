import { Card, CardContent } from "@/components/ui/card";
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
import type { MoveDetails, MoveType } from "./types";

const moveTypes: Array<{
  value: MoveType;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    value: "particulier",
    title: "Demenagement particulier",
    description: "Appartement, maison, studio ou residence secondaire.",
    icon: "home",
  },
  {
    value: "professionnel",
    title: "Demenagement professionnel",
    description: "Bureaux, locaux, commerce ou transfert d'activite.",
    icon: "truck",
  },
];

export function StepIntro({
  value,
  onChange,
  onNext,
  onPrev,
  isLast,
}: {
  value: MoveDetails;
  onChange: (patch: Partial<MoveDetails>) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}) {
  return (
    <StepFrame
      step={1}
      kicker="Demarrage"
      title="Preparons votre projet"
      description="On commence par les informations qui cadrent le devis: type de demenagement, trajets, date et accessibilite."
      onNext={onNext}
      onPrev={onPrev}
      isLast={isLast}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {moveTypes.map((option) => {
          const checked = value.moveType === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ moveType: option.value })}
              className={`rounded-[1.4rem] border p-0 text-left transition ${
                checked
                  ? "border-primary shadow-[0_0_0_4px_rgba(246,191,29,0.18)]"
                  : "border-border hover:border-foreground/15"
              }`}
            >
              <Card className="gap-0 rounded-[1.4rem] py-0 ring-0">
                <CardContent className="space-y-4 p-5">
                  <span className="flex size-12 items-center justify-center rounded-full bg-muted text-[#7b6423]">
                    <TablerIcon name={option.icon} className="size-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">{option.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-foreground">
          Ville de depart
          <div className="relative">
            <Input
              value={value.fromCity}
              onChange={(event) => onChange({ fromCity: event.target.value })}
              placeholder="Montpellier"
              className="h-12 rounded-2xl border-border bg-white pr-10"
            />
            <TablerIcon
              name="map-pin"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </label>

        <label className="space-y-2 text-sm font-medium text-foreground">
          Ville d'arrivee
          <div className="relative">
            <Input
              value={value.toCity}
              onChange={(event) => onChange({ toCity: event.target.value })}
              placeholder="Lattes, Sete, Paris..."
              className="h-12 rounded-2xl border-border bg-white pr-10"
            />
            <TablerIcon
              name="map-pin"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </label>

        <label className="space-y-2 text-sm font-medium text-foreground">
          Date souhaitee
          <div className="relative">
            <Input
              type="date"
              value={value.moveDate}
              onChange={(event) => onChange({ moveDate: event.target.value })}
              className="h-12 rounded-2xl border-border bg-white pr-10"
            />
            <TablerIcon
              name="calendar"
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </label>

        <div className="space-y-2 text-sm font-medium text-foreground">
          Type d'acces
          <Select
            value={value.accessType}
            onValueChange={(next) =>
              onChange({ accessType: next as MoveDetails["accessType"] })
            }
          >
            <SelectTrigger className="!h-12 w-full rounded-2xl border-border bg-white px-4 text-sm">
              <SelectValue placeholder="Choisir un acces" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ascenseur">Ascenseur disponible</SelectItem>
              <SelectItem value="escaliers">Escaliers uniquement</SelectItem>
              <SelectItem value="rdc">Rez-de-chaussee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </StepFrame>
  );
}
