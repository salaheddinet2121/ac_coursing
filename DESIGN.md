# AC Coursing Déménagement - Style Reference

> Calm analyst's-desk restraint, adapted for a moving company

**Theme:** light

AC Coursing sits on a warm-stone canvas (`#fafaf9`) with a single vivid sky-blue as its only chromatic accent — every other color is a neutral pulled from a warm stone scale. Headlines use Inter Tight at weight 400 with tight negative tracking: unhurried, sentence-case, never shouting. UI surfaces are flat white cards with a 1px stone hairline border as the primary structural device — shadows are reserved for exactly one element per page (the floating hero photo). The overall feel is editorial, not "moving-company generic": calm, monochrome, confident, where the blue CTA is the loudest thing on the page by deliberate restraint of everything else.

Real project photography carries the proof; there is no dashboard screenshot or mascot to borrow here, so a floating real photo (in a real move, not stock) takes the "hero visual" role Seline gives its dashboard preview.

---

## Colors

| Name | Value | Token | Role |
|---|---:|---|---|
| Stone Canvas | `#FAFAF9` | `--background` | Page background — warm off-white, reads as paper not screen-white |
| Pure White | `#FFFFFF` | `--card` | Card surfaces, nav, form fills — flat and shadowless by default |
| Stone Border | `#E8E6E5` | `--border` | Hairline borders on cards, nav, inputs — the primary structural separator, not shadows |
| Stone Muted | `#D6D3D1` | `--input` | Input borders, subtle tints, decorative separators |
| Warm Gray | `#78716C` | `--muted-foreground` | Body copy, nav links, secondary text |
| Ink Black | `#0C0A09` | `--foreground` | Headings, emphasized body, strong icons |
| Soot | `#1C1917` | `--color-dark` | Dark/inverted section backgrounds (footer, stats band, process steps) |
| Sky Wash | `#C1E1F7` | `--accent` | Soft highlight background behind an inline highlighted phrase |
| Sky Signal | `#3BA6F1` | `--primary` | Primary CTA fill, active links, brand accent — the only chromatic voice |
| Sky Edge | `#3398E1` | `--accent-foreground` / `--color-primary-light` | Outlined-action borders, secondary link emphasis — never promote to primary CTA color |
| Sky Soft | `#8DCEF5` | `--color-primary-soft` | The accent's dark-surface-safe variant — use for eyebrows/notes sitting on Soot, never the saturated primary directly on dark (it reads neon there) |

### Color Principle

The page is primarily neutral. Use sky-blue for: primary CTA, active states, one highlighted phrase per major headline, small proof icons. On any Soot/dark background, swap the saturated primary for Sky Soft — a fully-saturated accent on near-black looks aggressive, not confident.

---

## Typography

### Inter Tight — Display and headings — `--font-display`

Weight 400 is the signature. **Never bump headline weight to 600/700** — size and the highlight span carry emphasis, not boldness. This is a hard rule, not a default: it applies even where a bold moment feels tempting.

**Substitute:** Satoshi, system sans

**Weights:** 400, 500

**Sizes:** clamp-based, desktop caps at ~52px (h1/display), ~32px (h2/h3 clamp down from there)

**Line height:** 1.2

**Letter spacing:** `-0.02em` (set globally on all headings)

### Inter — Body, nav, forms, UI — `--font-body`

**Weights:** 400, 500, 600 (600 reserved for buttons, labels, and small emphasis — never headlines)

**Role:** the dominant reading rhythm; keep body copy legible and unhurried.

---

## Spacing & Shape

**Base unit:** 4px · **Density:** compact-comfortable

### Border Radius

| Element | Value | Token |
|---|---:|---|
| tags / buttons | 9999px | `rounded-full` |
| cards | 10px | `--radius` / `rounded-lg` |
| inputs | 6px | `rounded-sm` |
| icon containers | 4px | `--radius-icon` |
| feature/photo/hero panels | 16px | `--radius-hero` / `--radius-photo` |

### Shadows

| Name | Value | Token | Use |
|---|---|---|---|
| hairline | `0 1px 2px rgba(0,0,0,.05)` | `--shadow-sm` | Nav, buttons |
| card | `0 4px 16px rgba(0,0,0,.05)` | `--shadow-md` | Content cards — subtle lift, not weight |
| floating | `0 12px 45px rgba(17,12,46,.12)` | `--shadow-lg` | Reserved for the ONE hero photo per page — never more than one floating element per viewport |

Borders are the primary structural device. Reach for a shadow only on that one floating hero visual.

---

## Components

### Primary CTA Button

Pill radius, `#3BA6F1` fill, white text, weight 600, `min-h-12`, subtle opacity-dim on hover. The only filled chromatic element competing for attention per viewport.

### Secondary / Ghost Button

Pill radius, transparent or white fill, 1-2px neutral or primary border, ink text. Quiet companion to the CTA.

### Highlighted Text Span

One phrase per headline may carry the accent — either as plain `text-primary`/`text-primary-soft` (on dark) or, where a stronger callout is wanted, `text-accent-foreground` on an `bg-accent` (sky-wash) pill background. Never more than one per headline; never a full heading in accent color when a single phrase would do (existing whole-heading accent treatments inherited from before this pass may still appear on secondary pages — swap to a single-phrase highlight opportunistically when touching those sections).

### Content Card

White fill, 10px radius, 1px stone-border, no shadow at rest — hover may add the `card` shadow as a lift, not a permanent decoration.

### Floating Hero Photo

The one element per page allowed the deep floating shadow: a real AC Coursing photo (truck, crew, a real move in progress), 16px radius, `shadow-lg`. Never a stock/generic image, never more than one per viewport.

### Eyebrow / Badge

Pill, 1px accent-tinted border, tinted background at low opacity, small bold uppercase label. On light backgrounds use `primary`; on Soot backgrounds use `primary-soft`.

### Dark / Inverted Section

Soot (`#1C1917`) background for footer, the "why us" statement band, and the process-steps band. Body text at `primary-fg/55-80` opacity for hierarchy; never place the saturated primary directly as text or thin borders here — always `primary-soft`.

---

## Do's and Don'ts

### Do
- Keep every headline at weight 400 — rely on size, tracking, and a single highlight phrase for emphasis.
- Use `#FAFAF9` as the page background and `#FFFFFF` only for card surfaces.
- Use 1px stone-border as the primary structural separator; reserve shadows for the one floating hero photo per page.
- Keep buttons pill-shaped with generous horizontal padding.
- Swap to Sky Soft (never the saturated primary) for any accent text/border sitting on a Soot background.
- Use real AC Coursing photography — never stock, never a decorative offset-frame or glow behind it.
- Center stat/number blocks that sit in a row (`items-center text-center`), not just `flex-col`.

### Don't
- Do not bump headline weight past 400/500.
- Do not use `#FFFFFF` as the page background — always the stone canvas; white is for elevated surfaces only.
- Do not add gradients, glassmorphism, or decorative blurred glow shapes.
- Do not add an offset outline "frame" behind a photo — it reads as generic filler, not craft.
- Do not use the saturated primary as text/border color directly on a dark surface.
- Do not stack more than one highlighted phrase per headline.
- Do not surface a metric that doesn't add proof (e.g. a headcount stat with no bearing on trust) just to fill a row.

---

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas | `#FAFAF9` | Main page background |
| 1 | Card | `#FFFFFF` | Services, forms, reviews |
| 2 | Sky Wash | `#C1E1F7` | Highlighted phrase background, selected state |
| 3 | Soot | `#1C1917` | Footer, statement band, process band |

---

## Imagery

Real AC Coursing photography only — crew, truck, protected furniture, real interiors. No stock handshake photos, no cartoon trucks, no decorative frame or glow behind an image. The one "floating" treatment (16px radius + deep shadow) is reserved for a single hero photo per page; every other photo sits flat with a hairline border at most.

## Iconography

Simple outline icons (Tabler), 1.5-2px stroke, sitting in small tinted containers. Keep icon-container radius tight (4px) rather than fully rounded, except where the container itself is a circle (badges, avatars, step numbers).

---

## Similar References

- **Seline / Plausible / Fathom Analytics** — the calm, single-accent-on-warm-canvas restraint this system borrows from.
- **Linear** — weight-400-at-large-size headline restraint.
- The result must still read as a Montpellier moving company, not a SaaS product — no dashboard, no mascot, real photography carries what those would.
