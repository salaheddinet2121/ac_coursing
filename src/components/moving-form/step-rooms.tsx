import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ROOMS } from "./data";
import { StepFrame } from "./step-frame";
import type { RoomName, SelectedInventoryItem } from "./types";

export function StepRooms({
  selectedItems,
  onRoomChange,
  onNext,
  onPrev,
  isLast,
}: {
  selectedItems: SelectedInventoryItem[];
  onRoomChange: (itemId: string, room: RoomName) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}) {
  return (
    <StepFrame
      step={3}
      kicker="Pieces"
      title="Rangeons les objets par espace"
      description="Une attribution simple par piece suffit pour prevoir le chargement, les rotations et la manutention."
      onNext={onNext}
      onPrev={onPrev}
      isLast={isLast}
    >
      <div className="grid gap-3">
        {selectedItems.length ? (
          selectedItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-[1.5rem] bg-white py-0 ring-1 ring-black/5"
            >
              <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantite {item.quantity} · Taille {item.size}
                  </p>
                </div>

                <div className="w-full md:w-64">
                  <Select
                    value={item.assignedRoom}
                    onValueChange={(next) => onRoomChange(item.id, next as RoomName)}
                  >
                    <SelectTrigger className="!h-12 w-full rounded-2xl border-border bg-muted px-4 text-sm">
                      <SelectValue placeholder="Choisir une piece" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROOMS.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="rounded-[1.5rem] bg-white py-0 ring-1 ring-dashed ring-border">
            <CardContent className="p-4 text-sm leading-6 text-muted-foreground">
              L'etape inventaire est encore vide. Ajoutez quelques meubles pour
              pouvoir les affecter a une piece.
            </CardContent>
          </Card>
        )}
      </div>
    </StepFrame>
  );
}
