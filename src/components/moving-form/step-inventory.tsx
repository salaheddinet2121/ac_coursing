import { useState } from "react";
import { Search, Plus, Minus, Trash2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { CATEGORIES, INVENTORY_ITEMS, POPULAR_ITEM_IDS } from "./data";
import { TablerIcon } from "./tabler-icon";
import { StepFrame } from "./step-frame";
import type { CategoryName } from "./data";
import type { InventoryItemDefinition, SelectedInventoryItem } from "./types";

// ── small icon chip ─────────────────────────────────────────────────────────
function IconChip({
  name,
  active = false,
  className,
}: {
  name: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[0.65rem] transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-amber-50 text-[#7b6423]",
        className,
      )}
    >
      <TablerIcon name={name} className="size-[1.1rem]" />
    </span>
  );
}

// ── add button ──────────────────────────────────────────────────────────────
function AddButton({
  added,
  onClick,
}: {
  added: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full transition-all",
        added
          ? "size-7 bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(246,191,29,0.4)]"
          : "size-7 border-2 border-border bg-white text-muted-foreground hover:border-primary/60 hover:text-primary",
      )}
      aria-label={added ? "Déjà ajouté" : "Ajouter"}
    >
      {added ? <CheckCircle2 className="size-4" /> : <Plus className="size-3.5" />}
    </button>
  );
}

// ── item row (search results / full list) ───────────────────────────────────
function ItemRow({
  item,
  added,
  onAdd,
}: {
  item: InventoryItemDefinition;
  added: boolean;
  onAdd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition",
        added
          ? "border-primary/40 bg-amber-50/60"
          : "border-border bg-white hover:border-primary/40 hover:bg-amber-50/30",
      )}
    >
      <IconChip name={item.icon} active={added} className="size-10" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-foreground">{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.category}</p>
      </div>
      <AddButton added={added} onClick={onAdd} />
    </button>
  );
}

// ── selected card ───────────────────────────────────────────────────────────
function SelectedCard({
  item,
  onQuantity,
  onFragile,
  onRemove,
}: {
  item: SelectedInventoryItem;
  onQuantity: (next: number) => void;
  onFragile: (val: boolean) => void;
  onRemove: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* main row */}
      <div className="flex items-center gap-3 p-3">
        <IconChip name={item.icon} active className="size-10" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{item.label}</p>
          <p className="text-xs text-muted-foreground">{item.assignedRoom}</p>
        </div>
        {/* quantity stepper */}
        <div className="flex items-center gap-1 rounded-full bg-muted px-1 py-0.5">
          <button
            type="button"
            onClick={() => onQuantity(item.quantity - 1)}
            className="flex size-6 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-red-50 hover:text-red-500"
            aria-label="Retirer un"
          >
            <Minus className="size-3" />
          </button>
          <span className="min-w-5 text-center text-sm font-bold">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantity(item.quantity + 1)}
            className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition hover:bg-primary/90"
            aria-label="Ajouter un"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>
      {/* footer tray */}
      <div className="flex items-center justify-between border-t border-border bg-muted/40 px-3 py-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
          <input
            type="checkbox"
            checked={item.fragile}
            onChange={(e) => onFragile(e.target.checked)}
            className="accent-primary"
          />
          Fragile
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition hover:bg-red-50 hover:text-red-500"
          aria-label="Supprimer"
        >
          <Trash2 className="size-3" />
          Retirer
        </button>
      </div>
    </div>
  );
}

// ── main step ───────────────────────────────────────────────────────────────
export function StepInventory({
  selectedItems,
  onAddItem,
  onQuantityChange,
  onFragileChange,
  onRemoveItem,
  onNext,
  onPrev,
  isLast,
}: {
  selectedItems: SelectedInventoryItem[];
  onAddItem: (itemId: string) => void;
  onQuantityChange: (itemId: string, next: number) => void;
  onFragileChange: (itemId: string, val: boolean) => void;
  onRemoveItem: (itemId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryName>("Tous");

  const selectedIds = new Set(selectedItems.map((i) => i.id));

  // when searching: flat list across all items
  const isSearching = search.trim().length > 0;

  const searchResults = isSearching
    ? INVENTORY_ITEMS.filter((item) => {
        const q = search.toLowerCase();
        return `${item.label} ${item.category} ${item.room} ${item.size} ${item.tags}`
          .toLowerCase()
          .includes(q);
      }).slice(0, 12)
    : [];

  const categoryItems =
    !isSearching && activeCategory !== "Tous"
      ? INVENTORY_ITEMS.filter((i) => i.category === activeCategory)
      : !isSearching
        ? INVENTORY_ITEMS.filter((i) => POPULAR_ITEM_IDS.includes(i.id))
        : [];

  return (
    <StepFrame
      step={2}
      kicker="Inventaire"
      title="Quels meubles emportez-vous ?"
      description="Parcourez par categorie ou recherchez directement. Ajoutez chaque objet a votre liste."
      onNext={onNext}
      onPrev={onPrev}
      isLast={isLast}
    >
      {/* ── Search bar ── */}
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Canapé, réfrigérateur, armoire..."
          className="h-12 w-full rounded-2xl border border-border bg-white pl-11 pr-4 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>

      {/* ── Category chips (hidden while searching) ── */}
      {!isSearching && (
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(246,191,29,0.35)]"
                  : "border-border bg-white text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Item grid / results ── */}
      <div className="grid gap-2 sm:grid-cols-2">
        {(isSearching ? searchResults : categoryItems).map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            added={selectedIds.has(item.id)}
            onAdd={() => onAddItem(item.id)}
          />
        ))}
        {isSearching && searchResults.length === 0 && (
          <p className="col-span-2 rounded-2xl border border-dashed border-border bg-white p-4 text-center text-sm text-muted-foreground">
            Aucun objet trouvé. Essayez un autre terme.
          </p>
        )}
      </div>

      {/* ── Selected items ── */}
      {selectedItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#7b6423]">
              Liste sélectionnée
            </p>
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-bold text-[#7b6423]">
              {selectedItems.length} article{selectedItems.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {selectedItems.map((item) => (
              <SelectedCard
                key={item.id}
                item={item}
                onQuantity={(next) => onQuantityChange(item.id, next)}
                onFragile={(val) => onFragileChange(item.id, val)}
                onRemove={() => onRemoveItem(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {selectedItems.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-white p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Votre liste est vide. Ajoutez vos meubles ci-dessus.
          </p>
        </div>
      )}
    </StepFrame>
  );
}
