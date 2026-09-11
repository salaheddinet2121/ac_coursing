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

export function HeroFloorSelect({ name, floors, defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue ?? floors[0]?.value ?? "0");

  return (
    <Select name={name} value={value} onValueChange={setValue}>
      <SelectTrigger className="relative h-auto w-full rounded-xl border border-primary-fg/15 bg-primary-fg/[0.06] py-3 pr-3 pl-9 text-sm font-medium text-primary-fg outline-none data-[state=open]:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&>svg]:text-primary-fg/60">
        <span className="pointer-events-none absolute left-3 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center overflow-hidden text-primary-fg/70 [&_svg]:size-4">
          <TablerIcon name="stairs" />
        </span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={6}
        className="rounded-xl border-primary-fg/15 bg-dark-surface p-1 text-primary-fg shadow-lg"
      >
        {floors.map((f) => (
          <SelectItem
            key={f.value}
            value={f.value}
            className="rounded-lg text-primary-fg focus:bg-primary-fg/10 focus:text-primary-fg [&_svg]:text-primary-fg"
          >
            {f.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
