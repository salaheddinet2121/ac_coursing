"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TablerIcon from "./TablerIcon";

interface FloorOption { value: string; label: string }

interface Props {
  name: string;
  floors: FloorOption[];
  defaultValue?: string;
}

/** Same as HeroFloorSelect, styled for a white card (BOFU pages). */
export function BofuFloorSelect({ name, floors, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue ?? floors[0]?.value ?? "0");

  return (
    <Select name={name} value={value} onValueChange={setValue}>
      <SelectTrigger className="relative h-auto w-full rounded-xl border border-border bg-background py-3 pr-3 pl-9 text-sm font-medium text-foreground outline-none data-[state=open]:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:text-muted-foreground">
        <span className="pointer-events-none absolute left-3 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center overflow-hidden text-muted-foreground [&_svg]:size-4">
          <TablerIcon name="stairs" />
        </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={6}
        className="rounded-xl border-border bg-background p-1 text-foreground shadow-lg"
      >
        {floors.map((f) => (
          <SelectItem
            key={f.value}
            value={f.value}
            className="rounded-lg text-foreground focus:bg-muted focus:text-foreground [&_svg]:text-foreground"
          >
            {f.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
