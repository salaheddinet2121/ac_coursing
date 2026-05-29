"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { TablerIcon } from "./tabler-icon";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const TOTAL_STEPS = 5;

type MoveType = "particulier" | "professionnel";
type AccessType = "ascenseur" | "escaliers" | "rdc";
type LogementSize = "studio" | "t2" | "t3" | "t4" | "maison";
interface InventoryItem { id: string; qty: number }
interface FormData {
  moveType: MoveType;
  fromCity: string;
  toCity: string;
  moveDate: Date | undefined;
  accessType: AccessType;
  logementSize: LogementSize | "";
  inventory: InventoryItem[];
  otherItems: string;
  specialItems: string[];
  name: string;
  phone: string;
  email: string;
}

const initial: FormData = {
  moveType: "particulier",
  fromCity: "", toCity: "", moveDate: undefined,
  accessType: "ascenseur", logementSize: "",
  inventory: [], otherItems: "", specialItems: "",
  name: "", phone: "", email: "",
} as unknown as FormData;

type Room = { label: string; icon: string; items: { id: string; label: string; icon: string }[] };

const ROOMS: Room[] = [
  {
    label: "Salon", icon: "sofa",
    items: [
      { id: "canape",      label: "Canapé",          icon: "sofa" },
      { id: "fauteuil",    label: "Fauteuil",         icon: "armchair" },
      { id: "table-basse", label: "Table basse",      icon: "table" },
      { id: "meuble-tv",   label: "Meuble TV",        icon: "device-tv" },
      { id: "bibliotheque",label: "Bibliothèque",     icon: "books" },
      { id: "tapis",       label: "Tapis",            icon: "layout-grid" },
    ],
  },
  {
    label: "Chambre", icon: "bed",
    items: [
      { id: "lit",         label: "Lit",              icon: "bed" },
      { id: "armoire",     label: "Armoire",          icon: "archive" },
      { id: "commode",     label: "Commode",          icon: "layout-grid" },
      { id: "bureau",      label: "Bureau",           icon: "desk" },
      { id: "chevet",      label: "Table de chevet",  icon: "square" },
    ],
  },
  {
    label: "Cuisine", icon: "tools-kitchen-2",
    items: [
      { id: "frigo",           label: "Réfrigérateur",    icon: "fridge" },
      { id: "lave-linge",      label: "Lave-linge",       icon: "wash-machine" },
      { id: "lave-vaisselle",  label: "Lave-vaisselle",   icon: "tools-kitchen-2" },
      { id: "table-repas",     label: "Table à manger",   icon: "table" },
      { id: "micro-ondes",     label: "Four / micro-ondes",icon: "tools-kitchen-2" },
    ],
  },
  {
    label: "Bureau", icon: "desk",
    items: [
      { id: "bureau-pro",      label: "Bureau",           icon: "desk" },
      { id: "ordinateur",      label: "Ordinateur",       icon: "device-desktop" },
      { id: "etagere",         label: "Étagère",          icon: "books" },
      { id: "fauteuil-bureau", label: "Fauteuil",         icon: "armchair" },
    ],
  },
  {
    label: "Divers", icon: "box",
    items: [
      { id: "cartons",         label: "Cartons",          icon: "box" },
      { id: "velo",            label: "Vélo",             icon: "bike" },
      { id: "plantes",         label: "Plantes",          icon: "plant" },
      { id: "appareils-muscu", label: "Musculation",      icon: "barbell" },
    ],
  },
];

// ── Primitives ────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground/70">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text", autoComplete, inputMode, invalid }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  type?: string; autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  invalid?: boolean;
}) {
  return (
    <input
      type={type} value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-12 w-full rounded-xl border-2 bg-background px-4 text-[0.95rem] text-foreground outline-none placeholder:text-muted-foreground transition-colors",
        invalid ? "border-red-400 focus:border-red-500" : "border-border focus:border-primary",
      )}
    />
  );
}

// ── City autocomplete ─────────────────────────────────────────────────────────

interface CitySuggestion { label: string; postcode: string; context: string }

async function fetchCitySuggestions(query: string): Promise<CitySuggestion[]> {
  const requestPath = `/api/address-search?q=${encodeURIComponent(query)}`;
  const directUrl = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&type=municipality&limit=6`;

  const parseSuggestions = (payload: any): CitySuggestion[] => {
    if (Array.isArray(payload?.suggestions)) {
      return payload.suggestions;
    }

    if (Array.isArray(payload?.features)) {
      return payload.features.map((feature: any) => ({
        label: feature?.properties?.city ?? feature?.properties?.name ?? "",
        postcode: feature?.properties?.postcode ?? "",
        context: feature?.properties?.context ?? "",
      }));
    }

    return [];
  };

  const tryFetch = async (url: string) => {
    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.error || "La recherche d'adresses a échoué.");
    }

    return parseSuggestions(payload);
  };

  try {
    return await tryFetch(requestPath);
  } catch {
    return tryFetch(directUrl);
  }
}

function CityInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedRef = useRef(false);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setSuggestions([]);
      setOpen(false);
      setError("");
      return;
    }

    debounceRef.current = setTimeout(async () => {
      if (selectedRef.current) return; // selection happened — ignore stale fetch
      try {
        setError("");
        const results = await fetchCitySuggestions(query);
        if (selectedRef.current) return; // selection happened while fetch was in flight
        const seen = new Set<string>();
        const unique = results.filter((r) => {
          const key = r.label + r.postcode;
          if (seen.has(key)) return false;
          seen.add(key); return true;
        });
        setSuggestions(unique); setOpen(unique.length > 0); setActive(-1);
      } catch (err) {
        setSuggestions([]);
        setOpen(false);
        setActive(-1);
        setError(err instanceof Error ? err.message : "La recherche d'adresses a échoué.");
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

  const select = (s: CitySuggestion) => {
    const display = `${s.label} (${s.postcode})`;
    selectedRef.current = true;
    setQuery(display); onChange(display); setSuggestions([]); setOpen(false); setError("");
    // reset flag after a tick so future typing works normally
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
    <div ref={containerRef} className="relative">
      <input
        type="text" value={query} placeholder={placeholder} autoComplete="off"
        onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); }}
        onKeyDown={handleKey} onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="h-12 w-full rounded-xl border-2 border-border bg-background px-4 text-[0.95rem] text-foreground outline-none placeholder:text-muted-foreground focus:border-primary transition-colors"
      />
      {open && (
        <ul className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          {suggestions.map((s, i) => (
            <li key={s.label + s.postcode}>
              <button
                type="button" onMouseDown={() => select(s)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                  i === active ? "bg-primary/10 text-foreground" : "text-foreground/80 hover:bg-muted",
                )}
              >
                <TablerIcon name="map-pin" className="size-3.5 shrink-0 text-primary" />
                <span>
                  <span className="font-semibold">{s.label}</span>
                  <span className="ml-1.5 text-muted-foreground">{s.postcode}</span>
                  <span className="ml-1.5 text-xs text-muted-foreground">{s.context.split(",").slice(1).join(",").trim()}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="mt-2 text-xs text-amber-700">{error}</p>
      )}
    </div>
  );
}

function DatePicker({ value, onChange }: { value: Date | undefined; onChange: (d: Date | undefined) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border-2 border-border bg-background px-4 text-[0.95rem] outline-none transition-colors hover:border-primary/50",
          open && "border-primary", !value && "text-muted-foreground",
        )}>
          {value ? format(value, "d MMMM yyyy", { locale: fr }) : "Choisir une date"}
          <TablerIcon name="calendar" className="size-4 text-muted-foreground shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={(d) => { onChange(d); setOpen(false); }}
          disabled={{ before: new Date() }} locale={fr} />
      </PopoverContent>
    </Popover>
  );
}

function ChoiceCard({ selected, onClick, icon, label, sub }: {
  selected: boolean; onClick: () => void; icon: string; label: string; sub?: string;
}) {
  return (
    <button type="button" onClick={onClick} className={cn(
      "flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all",
      selected ? "border-primary bg-primary/5 shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_15%,transparent)]"
               : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
    )}>
      <span className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-xl",
        selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
      )}>
        <TablerIcon name={icon} className="size-5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-foreground">{label}</p>
        {sub && <p className="text-sm text-muted-foreground mt-0.5">{sub}</p>}
      </div>
      <span className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
        selected ? "border-primary bg-primary" : "border-border",
      )}>
        {selected && (
          <svg viewBox="0 0 10 8" fill="none" className="size-2.5">
            <path d="M1 4l2.5 3L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  );
}

function NavButtons({ onPrev, onNext, nextLabel = "Continuer", isLast }: {
  onPrev?: () => void; onNext?: () => void; nextLabel?: string; isLast?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      {onPrev ? (
        <button type="button" onClick={onPrev}
          className="flex items-center gap-2 rounded-full border-2 border-border bg-background px-6 py-3 text-sm font-semibold text-foreground/70 transition hover:border-primary/40 hover:text-foreground">
          <ArrowLeft className="size-4" />
          Retour
        </button>
      ) : <span />}
      {onNext && (
        <button type="button" onClick={onNext} className={cn(
          "flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold transition",
          isLast
            ? "bg-primary text-primary-foreground shadow-[0_4px_14px_color-mix(in_oklch,var(--primary)_40%,transparent)] hover:opacity-90"
            : "bg-primary text-primary-foreground shadow-[0_4px_14px_color-mix(in_oklch,var(--primary)_30%,transparent)] hover:opacity-90",
        )}>
          {nextLabel}
          {isLast ? <CheckCircle className="size-4" /> : <ArrowRight className="size-4" />}
        </button>
      )}
    </div>
  );
}

function StepHeader({ step, title, description }: { step: number; title: string; description: string }) {
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>Étape {step} sur {TOTAL_STEPS}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <div>
        <p className="text-xl font-bold tracking-tight text-foreground">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// ── Step 1 ────────────────────────────────────────────────────────────────────

function Step1({ data, onChange, onNext }: {
  data: FormData; onChange: (p: Partial<FormData>) => void; onNext: () => void;
}) {
  const canNext = data.fromCity.trim() && data.toCity.trim();
  return (
    <div className="space-y-6">
      <StepHeader step={1} title="Votre déménagement" description="Dites-nous d'où vous partez et où vous allez." />
      <div className="space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Type</p>
        <ChoiceCard selected={data.moveType === "particulier"} onClick={() => onChange({ moveType: "particulier" })} icon="home" label="Particulier" sub="Appartement, maison, studio" />
        <ChoiceCard selected={data.moveType === "professionnel"} onClick={() => onChange({ moveType: "professionnel" })} icon="building" label="Professionnel" sub="Bureaux, locaux, commerce" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Ville de départ">
          <CityInput value={data.fromCity} onChange={(v) => onChange({ fromCity: v })} placeholder="Montpellier" />
        </Field>
        <Field label="Ville d'arrivée">
          <CityInput value={data.toCity} onChange={(v) => onChange({ toCity: v })} placeholder="Paris, Lattes, Lyon..." />
        </Field>
        <Field label="Date souhaitée">
          <DatePicker value={data.moveDate} onChange={(d) => onChange({ moveDate: d })} />
        </Field>
        <Field label="Accès">
          <Select value={data.accessType} onValueChange={(v) => onChange({ accessType: v as AccessType })}>
            <SelectTrigger className="h-12! w-full rounded-xl border-2 border-border bg-background px-4 text-[0.95rem] text-foreground focus:border-primary data-[state=open]:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border shadow-lg">
              <SelectItem value="ascenseur">Ascenseur disponible</SelectItem>
              <SelectItem value="escaliers">Escaliers uniquement</SelectItem>
              <SelectItem value="rdc">Rez-de-chaussée</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <NavButtons onNext={canNext ? onNext : undefined} />
    </div>
  );
}

// ── Step 2 ────────────────────────────────────────────────────────────────────

function InventoryItemCard({ item, qty, onAdd, onRemove }: {
  item: { id: string; label: string; icon: string }; qty: number; onAdd: () => void; onRemove: () => void;
}) {
  const hasQty = qty > 0;
  return (
    <div className={cn(
      "flex items-center gap-3 rounded-2xl border-2 p-3 transition-all",
      hasQty ? "border-primary bg-primary/5" : "border-border bg-background",
    )}>
      <span className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-xl",
        hasQty ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
      )}>
        <TablerIcon name={item.icon} className="size-5" />
      </span>
      <span className="flex-1 text-sm font-semibold text-foreground">{item.label}</span>
      <div className="flex items-center gap-2 shrink-0">
        {hasQty && (
          <>
            <button type="button" onClick={onRemove}
              className="flex size-7 items-center justify-center rounded-full border-2 border-destructive/40 bg-destructive/10 text-destructive transition hover:bg-destructive hover:text-white hover:border-destructive">
              <TablerIcon name="minus" className="size-3" />
            </button>
            <span className="min-w-5 text-center text-sm font-bold text-foreground">{qty}</span>
          </>
        )}
        <button type="button" onClick={onAdd} className={cn(
          "flex size-7 items-center justify-center rounded-full transition",
          hasQty ? "border-2 border-primary bg-primary text-primary-foreground"
                 : "border-2 border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
        )}>
          <TablerIcon name="plus" className="size-3" />
        </button>
      </div>
    </div>
  );
}

function Step2({ data, onChange, onNext, onPrev }: {
  data: FormData; onChange: (p: Partial<FormData>) => void; onNext: () => void; onPrev: () => void;
}) {
  const [activeRoom, setActiveRoom] = useState(0);
  const getQty = (id: string) => data.inventory.find((i) => i.id === id)?.qty ?? 0;

  const add = (id: string) => {
    const exists = data.inventory.find((i) => i.id === id);
    onChange({ inventory: exists
      ? data.inventory.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      : [...data.inventory, { id, qty: 1 }]
    });
  };

  const remove = (id: string) => {
    const exists = data.inventory.find((i) => i.id === id);
    if (!exists) return;
    onChange({ inventory: exists.qty <= 1
      ? data.inventory.filter((i) => i.id !== id)
      : data.inventory.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i)
    });
  };

  const totalItems = data.inventory.reduce((s, i) => s + i.qty, 0);
  const room = ROOMS[activeRoom];

  return (
    <div className="space-y-6">
      <StepHeader step={2} title="Ce que vous déménagez" description="Sélectionnez les meubles et objets à transporter. Passez si vous préférez estimer vous-même." />

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {ROOMS.map((r, i) => {
          const roomTotal = r.items.reduce((s, it) => s + getQty(it.id), 0);
          return (
            <button key={r.label} type="button" onClick={() => setActiveRoom(i)} className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border-2 px-3.5 py-2 text-xs font-semibold transition-all",
              activeRoom === i ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-foreground/70 hover:border-primary/40",
            )}>
              <TablerIcon name={r.icon} className="size-3.5" />
              {r.label}
              {roomTotal > 0 && (
                <span className={cn(
                  "flex size-4 items-center justify-center rounded-full text-[10px] font-bold",
                  activeRoom === i ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground",
                )}>{roomTotal}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {room.items.map((item) => (
          <InventoryItemCard key={item.id} item={item} qty={getQty(item.id)} onAdd={() => add(item.id)} onRemove={() => remove(item.id)} />
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground/70">
          Autres objets <span className="ml-1.5 text-xs font-normal text-muted-foreground">Séparez par des virgules</span>
        </label>
        <div className="relative">
          <input type="text" value={data.otherItems} onChange={(e) => onChange({ otherItems: e.target.value })}
            placeholder="Vélo elliptique, cage à oiseaux, billard..."
            className="h-12 w-full rounded-xl border-2 border-border bg-background px-4 pr-10 text-[0.95rem] text-foreground outline-none placeholder:text-muted-foreground focus:border-primary transition-colors"
          />
          <TablerIcon name="pencil" className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
        </div>
        {data.otherItems.trim() && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {data.otherItems.split(",").map((s) => s.trim()).filter(Boolean).map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5">
          <TablerIcon name="box" className="size-4 text-primary shrink-0" />
          <p className="text-sm font-semibold text-primary">
            {totalItems} article{totalItems > 1 ? "s" : ""} sélectionné{totalItems > 1 ? "s" : ""}
          </p>
        </div>
      )}

      <NavButtons onPrev={onPrev} onNext={onNext} nextLabel={totalItems === 0 && !data.otherItems.trim() ? "Passer" : "Continuer"} />
    </div>
  );
}

// ── Step 3 ────────────────────────────────────────────────────────────────────

const SPECIAL_OPTIONS = [
  { id: "piano",    icon: "piano",    label: "Piano",           hint: "Piano droit ou à queue" },
  { id: "coffre",   icon: "lock",     label: "Coffre-fort",     hint: "Très lourd, démontage possible" },
  { id: "moto",     icon: "motorbike",label: "Moto / scooter",  hint: "Deux-roues motorisé" },
  { id: "fragile",  icon: "package",  label: "Objets fragiles", hint: "Vaisselle, miroirs, antiquités" },
  { id: "art",      icon: "frame",    label: "Œuvres d'art",    hint: "Tableaux, sculptures de valeur" },
  { id: "aquarium", icon: "fish",     label: "Aquarium",        hint: "Plus de 75 litres" },
];

function Step3({ data, onChange, onNext, onPrev }: {
  data: FormData; onChange: (p: Partial<FormData>) => void; onNext: () => void; onPrev: () => void;
}) {
  const toggle = (id: string) => {
    const next = data.specialItems.includes(id) ? data.specialItems.filter((x) => x !== id) : [...data.specialItems, id];
    onChange({ specialItems: next });
  };

  return (
    <div className="space-y-6">
      <StepHeader step={3} title="Objets particuliers ?" description="Sélectionnez ce qui s'applique. Passez si aucun." />
      <div className="space-y-2.5">
        {SPECIAL_OPTIONS.map((opt) => {
          const selected = data.specialItems.includes(opt.id);
          return (
            <button key={opt.id} type="button" onClick={() => toggle(opt.id)} className={cn(
              "flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all",
              selected ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
            )}>
              <span className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-xl",
                selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
              )}>
                <TablerIcon name={opt.icon} className="size-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{opt.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{opt.hint}</p>
              </div>
              <span className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                selected ? "border-primary bg-primary" : "border-border",
              )}>
                {selected && (
                  <svg viewBox="0 0 10 8" fill="none" className="size-2.5">
                    <path d="M1 4l2.5 3L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <NavButtons onPrev={onPrev} onNext={onNext} nextLabel={data.specialItems.length === 0 ? "Passer" : "Continuer"} />
    </div>
  );
}

// ── Step 4 ────────────────────────────────────────────────────────────────────

const ACCESS_LABELS: Record<string, string> = {
  ascenseur: "Ascenseur disponible", escaliers: "Escaliers uniquement", rdc: "Rez-de-chaussée",
};
const SPECIAL_LABELS: Record<string, string> = {
  piano: "Piano", coffre: "Coffre-fort", moto: "Moto / scooter",
  fragile: "Objets fragiles", art: "Œuvres d'art", aquarium: "Aquarium",
};

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary mt-0.5">
        <TablerIcon name={icon} className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-[0.9rem] font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Step4({ data, onNext, onPrev }: { data: FormData; onNext: () => void; onPrev: () => void }) {
  const totalItems = data.inventory.reduce((s, i) => s + i.qty, 0);
  const inventorySummary = totalItems > 0
    ? ROOMS.flatMap((r) => r.items
        .map((item) => ({ item, qty: data.inventory.find((x) => x.id === item.id)?.qty ?? 0 }))
        .filter(({ qty }) => qty > 0)
        .map(({ item, qty }) => `${qty}× ${item.label}`)
      ).join(", ")
    : "Non renseigné";

  return (
    <div className="space-y-6">
      <StepHeader step={4} title="Récapitulatif" description="Vérifiez vos informations avant d'envoyer." />
      <div className="rounded-2xl border border-border bg-muted/30 px-4 divide-y divide-border">
        <SummaryRow icon="map-pin" label="Trajet" value={`${data.fromCity} → ${data.toCity}`} />
        {data.moveDate && <SummaryRow icon="calendar" label="Date" value={format(data.moveDate, "d MMMM yyyy", { locale: fr })} />}
        <SummaryRow icon="elevator" label="Accès" value={ACCESS_LABELS[data.accessType] ?? data.accessType} />
        <SummaryRow icon="package" label="Mobilier" value={inventorySummary} />
        {data.otherItems.trim() && <SummaryRow icon="pencil" label="Autres objets" value={data.otherItems} />}
        {data.specialItems.length > 0 && <SummaryRow icon="alert-triangle" label="Objets particuliers" value={data.specialItems.map((id) => SPECIAL_LABELS[id] ?? id).join(", ")} />}
      </div>
      <p className="text-center text-sm text-muted-foreground">Tout semble correct ? Finalisez en 30 secondes.</p>
      <NavButtons onPrev={onPrev} onNext={onNext} nextLabel="Finaliser" />
    </div>
  );
}

// ── Step 5 ────────────────────────────────────────────────────────────────────

type FinalStepErrors = {
  name?: string;
  phone?: string;
  email?: string;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-red-600">{message}</p>;
}

function Step5({ data, onChange, onSubmit, onPrev, phone, phoneLink, isSubmitting, errors }: {
  data: FormData; onChange: (p: Partial<FormData>) => void; onSubmit: () => void; onPrev: () => void;
  phone: string; phoneLink: string; isSubmitting?: boolean; errors: FinalStepErrors;
}) {
  const canSubmit = data.name.trim() && data.phone.trim() && data.email.trim();
  return (
    <div className="space-y-6">
      <StepHeader step={5} title="Vos coordonnées" description="Nous vous enverrons votre estimation gratuite dans les 24h." />
      <div className="space-y-3">
        <Field label="Nom complet">
          <TextInput value={data.name} onChange={(v) => onChange({ name: v })} placeholder="Jean Dupont" autoComplete="name" invalid={Boolean(errors.name)} />
          <FieldError message={errors.name} />
        </Field>
        <Field label="Téléphone">
          <TextInput value={data.phone} onChange={(v) => onChange({ phone: v })} placeholder="06 12 34 56 78" type="tel" autoComplete="tel" inputMode="tel" invalid={Boolean(errors.phone)} />
          <FieldError message={errors.phone} />
        </Field>
        <Field label="Adresse email">
          <TextInput value={data.email} onChange={(v) => onChange({ email: v })} placeholder="vous@email.fr" type="email" autoComplete="email" invalid={Boolean(errors.email)} />
          <FieldError message={errors.email} />
        </Field>
      </div>
      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
          <TablerIcon name="lock" className="size-4" />
        </span>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Informations confidentielles, jamais partagées. Vous préférez appeler ?{" "}
          <a href={`tel:+33${phoneLink.slice(1)}`} className="font-semibold text-foreground underline underline-offset-2">{phone}</a>
        </p>
      </div>
      <NavButtons
        onPrev={onPrev}
        onNext={!isSubmitting && canSubmit ? onSubmit : undefined}
        nextLabel={isSubmitting ? "Envoi..." : "Envoyer ma demande"}
        isLast
      />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function MovingForm({ phone = "07 51 24 90 26", phoneLink = "0751249026" }: {
  phone?: string; phoneLink?: string;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ ...initial, specialItems: [] });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalStepErrors, setFinalStepErrors] = useState<FinalStepErrors>({});

  const patch = (p: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...p }));

    setFinalStepErrors((prev) => {
      const next = { ...prev };
      if (Object.prototype.hasOwnProperty.call(p, "name")) delete next.name;
      if (Object.prototype.hasOwnProperty.call(p, "phone")) delete next.phone;
      if (Object.prototype.hasOwnProperty.call(p, "email")) delete next.email;
      return next;
    });
  };
  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const validateFinalStep = (): FinalStepErrors => {
    const errors: FinalStepErrors = {};
    const email = data.email.trim();
    const phoneDigits = data.phone.replace(/\D/g, "");

    if (!data.name.trim()) {
      errors.name = "Merci d’indiquer votre nom.";
    }

    if (!phoneDigits) {
      errors.phone = "Merci d’indiquer votre téléphone.";
    } else if (phoneDigits.length < 10) {
      errors.phone = "Le numéro semble incomplet.";
    }

    if (!email) {
      errors.email = "Merci d’indiquer votre email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "L’adresse email n’est pas valide.";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateFinalStep();
    if (Object.keys(errors).length > 0) {
      setFinalStepErrors(errors);
      setSubmitError("Corrigez les champs signalés avant l’envoi.");
      return;
    }

    setFinalStepErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/devis", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          moveDate: data.moveDate?.toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.ok || !result?.redirectTo) {
        throw new Error(result?.message || "Une erreur est survenue pendant l'envoi.");
      }

      window.location.assign(result.redirectTo);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Une erreur est survenue pendant l'envoi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-2.5 md:px-6">
          <a href="/" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Retour</span>
          </a>
          <a href="/" className="flex items-center no-underline">
            <img
              src="/logo/full_logo.svg"
              alt="AC Coursing"
              className="h-9 w-auto"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                img.insertAdjacentHTML('afterend', '<span class="text-[0.95rem] font-bold tracking-tight text-foreground">AC Coursing</span>');
              }}
            />
          </a>
          <a href={`tel:+33${phoneLink.slice(1)}`} className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90">
            <Phone className="size-3.5 shrink-0" />
            <span className="hidden sm:inline">{phone}</span>
            <span className="sm:hidden">Appeler</span>
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl px-4 py-6 md:px-6 md:py-10">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6 md:p-8">
          {step === 1 && <Step1 data={data} onChange={patch} onNext={next} />}
          {step === 2 && <Step2 data={data} onChange={patch} onNext={next} onPrev={prev} />}
          {step === 3 && <Step3 data={data} onChange={patch} onNext={next} onPrev={prev} />}
          {step === 4 && <Step4 data={data} onNext={next} onPrev={prev} />}
          {step === 5 && <Step5 data={data} onChange={patch} onSubmit={handleSubmit} onPrev={prev} phone={phone} phoneLink={phoneLink} isSubmitting={isSubmitting} errors={finalStepErrors} />}
          {(submitError || isSubmitting) && step === 5 && (
            <div className={cn(
              "mt-4 rounded-xl border px-4 py-3 text-sm",
              submitError ? "border-red-300 bg-red-50 text-red-700" : "border-primary/20 bg-primary/5 text-foreground/80",
            )}>
              {submitError || "Envoi en cours..."}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
