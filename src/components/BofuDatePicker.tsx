"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import TablerIcon from "./TablerIcon";

interface Props {
  name: string;
  placeholder?: string;
}

/** Same as HeroDatePicker, styled for a white card (BOFU pages). */
export function BofuDatePicker({ name, placeholder = "Choisir une date" }: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <input type="hidden" name={name} value={date ? format(date, "yyyy-MM-dd") : ""} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="relative flex h-auto w-full items-center rounded-xl border border-border bg-background py-3 pr-3 pl-9 text-left text-sm font-medium outline-none transition-colors data-[state=open]:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="pointer-events-none absolute left-3 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center overflow-hidden text-muted-foreground [&_svg]:size-4">
              <TablerIcon name="calendar" />
            </span>
            <span className={date ? "text-foreground" : "text-muted-foreground"}>
              {date ? format(date, "d MMMM yyyy", { locale: fr }) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-auto rounded-xl border-border bg-background p-0 text-foreground shadow-lg"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => { setDate(d); setOpen(false); }}
            disabled={{ before: new Date() }}
            locale={fr}
            classNames={{
              caption_label: "text-sm font-medium text-foreground",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-border text-foreground",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 inline-flex items-center justify-center rounded-md text-sm text-foreground hover:bg-muted",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-muted text-foreground",
              day_outside: "day-outside text-muted-foreground/50 opacity-50",
              day_disabled: "text-muted-foreground/40 opacity-50",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
