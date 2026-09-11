"use client";

import { useEffect, useRef, useState } from "react";
import { fetchAddressSuggestions, type AddressSuggestion } from "@/lib/address-suggestions";
import TablerIcon from "./TablerIcon";

interface Props {
  name: string;
  placeholder?: string;
  defaultValue?: string;
}

/** Same address autocomplete as HeroAddressField, styled for a white card
 * instead of the dark glass hero (used on BOFU landing pages). */
export function BofuAddressField({ name, placeholder, defaultValue = "" }: Props) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedRef = useRef(false);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      if (selectedRef.current) return;
      try {
        const results = await fetchAddressSuggestions(query);
        if (selectedRef.current) return;
        const seen = new Set<string>();
        const unique = results.filter((r) => {
          const key = r.label + r.postcode;
          if (seen.has(key)) return false;
          seen.add(key); return true;
        });
        setSuggestions(unique); setOpen(unique.length > 0); setActive(-1);
      } catch {
        setSuggestions([]); setOpen(false); setActive(-1);
      }
    }, 250);
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const select = (s: AddressSuggestion) => {
    const display = s.postcode ? `${s.label} (${s.postcode})` : s.label;
    selectedRef.current = true;
    setQuery(display); setSuggestions([]); setOpen(false);
    setTimeout(() => { selectedRef.current = false; }, 300);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, suggestions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); select(suggestions[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex items-center">
      <span className="pointer-events-none absolute left-3 flex size-4 items-center justify-center overflow-hidden text-muted-foreground [&_svg]:size-4">
        <TablerIcon name="map-pin" />
      </span>
      <input
        type="text"
        name={name}
        value={query}
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="w-full rounded-lg border border-border bg-background py-3 pr-3 pl-9 text-sm font-medium text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus:border-primary transition-colors"
      />
      {open && (
        <ul className="absolute top-full z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-background shadow-lg">
          {suggestions.map((s, i) => (
            <li key={s.label + s.postcode}>
              <button
                type="button"
                onMouseDown={() => select(s)}
                className={
                  "flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors " +
                  (i === active ? "bg-muted text-foreground" : "text-foreground/80 hover:bg-muted/60")
                }
              >
                <TablerIcon name="map-pin" className="size-3.5 shrink-0 text-primary" />
                <span>
                  <span className="font-semibold text-foreground">{s.label}</span>
                  <span className="ml-1.5 text-muted-foreground">{s.postcode}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
