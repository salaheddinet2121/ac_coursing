import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { SPECIAL_ITEMS } from "./data";
import { StepFrame } from "./step-frame";
import { TablerIcon } from "./tabler-icon";

export function StepSpecial({
  selectedSpecials,
  notes,
  onSpecialToggle,
  onNotesChange,
  onNext,
  onPrev,
  isLast,
}: {
  selectedSpecials: Record<string, boolean>;
  notes: string;
  onSpecialToggle: (specialId: string, enabled: boolean) => void;
  onNotesChange: (value: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}) {
  return (
    <StepFrame
      step={4}
      kicker="Objets speciaux"
      title="Signalons les elements sensibles"
      description="On capture ici ce qui peut influencer le materiel, l'equipe ou la protection pendant le transport."
      onNext={onNext}
      onPrev={onPrev}
      isLast={isLast}
    >
      <div className="grid gap-3">
        {SPECIAL_ITEMS.map((item) => (
          <Card key={item.id} className="rounded-[1.5rem] bg-white py-0 ring-1 ring-black/5">
            <CardContent className="flex items-center gap-4 p-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-muted text-[#7b6423]">
                <TablerIcon name={item.icon} className="size-5" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm leading-6 text-muted-foreground">{item.hint}</p>
              </div>
              <Switch
                checked={selectedSpecials[item.id] === true}
                onCheckedChange={(checked) => onSpecialToggle(item.id, checked)}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <label className="space-y-2 text-sm font-medium text-foreground">
          Observations
          <Textarea
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            rows={6}
            placeholder="Precisez les dimensions, le poids, les etages, les difficultes d'acces ou les objets de valeur."
            className="min-h-40 rounded-[1.5rem] border-border bg-white px-4 py-3 text-base"
          />
        </label>
        <p className="text-sm leading-6 text-muted-foreground">
          Vous pouvez ici signaler un miroir ancien, un aquarium, un marbre, un
          coffre fort ou des cartons tres sensibles.
        </p>
      </div>
    </StepFrame>
  );
}
