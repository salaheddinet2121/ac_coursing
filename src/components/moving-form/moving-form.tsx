"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchAddressSuggestions, type AddressSuggestion } from "@/lib/address-suggestions";
import { TablerIcon } from "./tabler-icon";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const TOTAL_STEPS = 5;

type MoveType = "particulier" | "professionnel";
type AccessType = "ascenseur" | "escaliers" | "rdc";
interface InventoryItem { id: string; qty: number }
interface FormData {
  moveType: MoveType;
  fromCity: string;
  toCity: string;
  moveDate: Date | undefined;
  accessTypeDeparture: AccessType;
  accessTypeDestination: AccessType;
  floorDeparture: string;
  floorDestination: string;
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
  accessTypeDeparture: "ascenseur", accessTypeDestination: "ascenseur",
  floorDeparture: "", floorDestination: "",
  inventory: [], otherItems: "", specialItems: [],
  name: "", phone: "", email: "",
};

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

function Field({ label, icon, optional, children, className }: {
  label: string; icon?: string; optional?: boolean;
  children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground/70">
        {icon && <TablerIcon name={icon} className="size-4 text-primary" />}
        {label}
        {optional && <span className="text-xs font-normal text-muted-foreground">(facultatif)</span>}
      </label>
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

// ── Address autocomplete ──────────────────────────────────────────────────────
// fetchAddressSuggestions / AddressSuggestion now live in @/lib/address-suggestions
// so the hero card's address field can share the same lookup.

function AddressInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
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
        const results = await fetchAddressSuggestions(query);
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

  const select = (s: AddressSuggestion) => {
    const display = s.postcode ? `${s.label} (${s.postcode})` : s.label;
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

const STEPPER_STEPS: { icon: string; label: string }[] = [
  { icon: "truck-delivery", label: "Trajet" },
  { icon: "box", label: "Inventaire" },
  { icon: "package", label: "Spécial" },
  { icon: "file-description", label: "Résumé" },
  { icon: "user", label: "Contact" },
];

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center" aria-label={`Étape ${step} sur ${TOTAL_STEPS}`}>
      {STEPPER_STEPS.map((s, i) => {
        const n = i + 1;
        const isDone = n < step;
        const isCurrent = n === step;
        const isLast = n === STEPPER_STEPS.length;
        return (
          <li key={s.label} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5">
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors sm:size-9",
                  isDone || isCurrent
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {isDone ? (
                  <TablerIcon name="check" className="size-4" />
                ) : (
                  <TablerIcon name={s.icon} className="size-4" />
                )}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] font-semibold whitespace-nowrap sm:block",
                  isDone || isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </div>
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn("mx-1.5 h-0.5 flex-1 rounded-full transition-colors sm:mx-2", isDone ? "bg-primary" : "bg-border")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepHeader({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="space-y-5">
      <Stepper step={step} />
      <div>
        <p className="text-xl font-bold tracking-tight text-foreground">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// ── Floor Stepper ─────────────────────────────────────────────────────────────

function FloorStepper({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const floor = parseInt(value || "0", 10);
  const dec = () => onChange(String(Math.max(0, floor - 1)));
  const inc = () => onChange(String(Math.min(20, floor + 1)));
  return (
    <div className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-border bg-background px-1.5">
      <button type="button" onClick={dec} disabled={floor === 0}
        className="flex size-9 items-center justify-center rounded-lg border-2 border-primary bg-primary/10 text-primary transition hover:bg-primary hover:text-white active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Diminuer l'étage">
        <TablerIcon name="minus" className="size-4" />
      </button>
      <span className="text-[0.95rem] font-bold text-foreground">{floor === 0 ? "RDC" : `Étage ${floor}`}</span>
      <button type="button" onClick={inc} disabled={floor === 20}
        className="flex size-9 items-center justify-center rounded-lg border-2 border-primary bg-primary/10 text-primary transition hover:bg-primary hover:text-white active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Augmenter l'étage">
        <TablerIcon name="plus" className="size-4" />
      </button>
    </div>
  );
}

// ── Step 1 ────────────────────────────────────────────────────────────────────

function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      <TablerIcon name={icon} className="size-3.5 text-primary" />
      {children}
    </p>
  );
}

function AccessSelect({ value, onChange }: { value: AccessType; onChange: (v: AccessType) => void }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as AccessType)}>
      <SelectTrigger className="h-12! w-full rounded-xl border-2 border-border bg-background px-4 text-[0.95rem] text-foreground focus:border-primary data-[state=open]:border-primary">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-border shadow-lg">
        <SelectItem value="ascenseur">Ascenseur disponible</SelectItem>
        <SelectItem value="escaliers">Escaliers uniquement</SelectItem>
        <SelectItem value="rdc">Rez-de-chaussée</SelectItem>
      </SelectContent>
    </Select>
  );
}

/** Adresse + accès + étage, for one end of the move. */
function AddressBlock({
  icon, title, address, onAddressChange, placeholder,
  access, onAccessChange, floor, onFloorChange,
}: {
  icon: string; title: string;
  address: string; onAddressChange: (v: string) => void; placeholder: string;
  access: AccessType; onAccessChange: (v: AccessType) => void;
  floor: string; onFloorChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionTitle icon={icon}>{title}</SectionTitle>
      <Field label="Adresse" optional>
        <AddressInput value={address} onChange={onAddressChange} placeholder={placeholder} />
        <p className="text-xs text-muted-foreground">
          Une ville ou une commune suffit si vous n'avez pas l'adresse exacte.
        </p>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Type d'accès" icon="elevator">
          <AccessSelect value={access} onChange={onAccessChange} />
        </Field>
        <Field label="Étage" icon="stairs">
          <FloorStepper value={floor} onChange={onFloorChange} />
        </Field>
      </div>
    </div>
  );
}

function Step1({ data, onChange, onNext }: {
  data: FormData; onChange: (p: Partial<FormData>) => void; onNext: () => void;
}) {
  return (
    <div className="space-y-8">
      <StepHeader step={1} title="Votre déménagement" description="Adresses, accès et date. Tout est facultatif à cette étape." />

      <div className="space-y-3">
        <SectionTitle icon="truck">Type de déménagement</SectionTitle>
        <ChoiceCard selected={data.moveType === "particulier"} onClick={() => onChange({ moveType: "particulier" })} icon="home" label="Particulier" sub="Appartement, maison, studio" />
        <ChoiceCard selected={data.moveType === "professionnel"} onClick={() => onChange({ moveType: "professionnel" })} icon="building" label="Professionnel" sub="Bureaux, locaux, commerce" />
      </div>

      <div className="space-y-6">
        <AddressBlock
          icon="home"
          title="Adresse de départ"
          address={data.fromCity}
          onAddressChange={(v) => onChange({ fromCity: v })}
          placeholder="Ex : 12 rue de la Loge, Montpellier"
          access={data.accessTypeDeparture}
          onAccessChange={(v) => onChange({ accessTypeDeparture: v })}
          floor={data.floorDeparture}
          onFloorChange={(v) => onChange({ floorDeparture: v })}
        />

        <hr className="border-border" />

        <AddressBlock
          icon="map-pin"
          title="Adresse d'arrivée"
          address={data.toCity}
          onAddressChange={(v) => onChange({ toCity: v })}
          placeholder="Ex : 5 avenue de Lodève, Lattes"
          access={data.accessTypeDestination}
          onAccessChange={(v) => onChange({ accessTypeDestination: v })}
          floor={data.floorDestination}
          onFloorChange={(v) => onChange({ floorDestination: v })}
        />

        <hr className="border-border" />

        <div className="space-y-4">
          <SectionTitle icon="calendar">Date souhaitée</SectionTitle>
          <Field label="Quand souhaitez-vous déménager ?">
            <DatePicker value={data.moveDate} onChange={(d) => onChange({ moveDate: d })} />
            <p className="text-xs text-muted-foreground">Pas de date fixe ? Laissez vide, on s'adapte à votre planning.</p>
          </Field>
        </div>
      </div>

      <NavButtons onPrev={() => window.location.assign("/")} onNext={onNext} />
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
        <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground/70">
          <TablerIcon name="box" className="size-4 text-primary" />
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

  const floorLabel = (floor: string) =>
    floor === "" ? "" : floor === "0" ? "RDC" : `Étage ${floor}`;

  /** "12 rue de la Loge, Montpellier — Ascenseur disponible · Étage 3" */
  const endpointValue = (address: string, access: AccessType, floor: string) =>
    [
      address.trim() || "Adresse non renseignée",
      [ACCESS_LABELS[access] ?? access, floorLabel(floor)].filter(Boolean).join(" · "),
    ]
      .filter(Boolean)
      .join(" — ");

  return (
    <div className="space-y-6">
      <StepHeader step={4} title="Récapitulatif" description="Vérifiez vos informations avant d'envoyer." />
      <div className="rounded-2xl border border-border bg-muted/30 px-4 divide-y divide-border">
        <SummaryRow icon="home" label="Départ" value={endpointValue(data.fromCity, data.accessTypeDeparture, data.floorDeparture)} />
        <SummaryRow icon="map-pin" label="Arrivée" value={endpointValue(data.toCity, data.accessTypeDestination, data.floorDestination)} />
        {data.moveDate && <SummaryRow icon="calendar" label="Date" value={format(data.moveDate, "d MMMM yyyy", { locale: fr })} />}
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
        <Field label="Nom complet" icon="user">
          <TextInput value={data.name} onChange={(v) => onChange({ name: v })} placeholder="Jean Dupont" autoComplete="name" invalid={Boolean(errors.name)} />
          <FieldError message={errors.name} />
        </Field>
        <Field label="Téléphone" icon="phone">
          <TextInput value={data.phone} onChange={(v) => onChange({ phone: v })} placeholder="06 12 34 56 78" type="tel" autoComplete="tel" inputMode="tel" invalid={Boolean(errors.phone)} />
          <FieldError message={errors.phone} />
        </Field>
        <Field label="Adresse email" icon="mail">
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

export function MovingForm({
  phone = "07 51 24 90 26", phoneLink = "0751249026",
  prefillAddress, prefillFloor, prefillDate,
}: {
  phone?: string; phoneLink?: string;
  prefillAddress?: string; prefillFloor?: string; prefillDate?: string;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(() => {
    const parsedDate = prefillDate ? new Date(prefillDate) : undefined;
    return {
      ...initial,
      fromCity: prefillAddress ?? initial.fromCity,
      floorDeparture: prefillFloor ?? initial.floorDeparture,
      moveDate: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : initial.moveDate,
    };
  });
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
