# AC Coursing Déménagement - Style Reference

> Calm, premium local-service design built around trust, proof and fast conversion.

**Theme:** light

AC Coursing uses a clean warm-white canvas with deep ink typography and one confident blue accent. The visual system should feel operational, reassuring and premium without looking like a generic corporate transport company. White cards, thin neutral borders, strong photography and compact trust signals do most of the work. Blue is reserved for primary actions, selected states and small proof accents.

The brand should communicate one idea immediately: the move is controlled, the price is clear and the team handles the difficult parts.

The interface must stay calm even when the page contains a lot of local SEO content. Strong hierarchy, short content blocks, generous spacing and repeated conversion points keep long pages easy to scan.

---

## Tokens - Colors

| Name | Value | Token | Role |
|---|---:|---|---|
| Warm Canvas | `#F7F7F5` | `--color-canvas` | Main page background. Warm enough to avoid a sterile SaaS feel. |
| Pure White | `#FFFFFF` | `--color-white` | Cards, nav, form surfaces, floating panels. |
| Soft Surface | `#F1F3F5` | `--color-soft-surface` | Secondary panels, FAQ rows, muted blocks. |
| Border | `#E3E5E8` | `--color-border` | Hairline borders on cards, forms, chips and separators. |
| Muted Border | `#D4D7DC` | `--color-border-strong` | Stronger form and selected-state borders. |
| Muted Text | `#6B7280` | `--color-muted` | Secondary body copy, metadata and helper text. |
| Body | `#3F4650` | `--color-body` | Main paragraph copy. |
| Ink | `#111318` | `--color-ink` | H1, H2, key numbers, nav emphasis. |
| Deep Ink | `#0A0D12` | `--color-deep-ink` | Dark CTA/footer surfaces. |
| Trust Blue | `#2563EB` | `--color-trust-blue` | Main CTA, active state, small proof accents. |
| Trust Blue Hover | `#1D4ED8` | `--color-trust-blue-hover` | Hover/pressed state. |
| Blue Wash | `#EAF1FF` | `--color-blue-wash` | Soft label, selected chip or highlight background. |
| Success Wash | `#EFF7F1` | `--color-success-wash` | Optional subtle assurance background only. |
| Star | `#F5B301` | `--color-star` | Google rating stars only. Do not use as a general accent. |

### Color Principle

The page is primarily neutral.

Use blue for:
- primary CTA
- active filters
- selected service/form states
- small proof icons
- one highlighted phrase or word per major section

Do not create a rainbow of service colors.

---

## Tokens - Typography

### Manrope - Display and headings - `--font-display`

Use Manrope for H1, H2, H3, large numbers and strong CTA headings.

**Substitute:** Inter Tight, Geist, Satoshi

**Weights:** 500, 600, 700

**Sizes:** 20px, 28px, 40px, 56px, 64px

**Line height:** 1.05 to 1.25

**Letter spacing:** `-0.03em` for display, `-0.02em` for section headings

**Role:** confident but controlled. Headings should feel precise and competent, not aggressive.

### Inter - Body, nav, forms and UI - `--font-body`

Use Inter for body copy, form labels, nav links, metadata, buttons and captions.

**Weights:** 400, 500, 600

**Sizes:** 12px, 14px, 15px, 16px, 18px

**Line height:** 1.45 to 1.7

**Role:** high legibility on long SEO/service pages and dense forms.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|---|---:|---:|---:|---|
| caption | 12px | 1.4 | 0 | `--text-caption` |
| body-sm | 14px | 1.55 | 0 | `--text-body-sm` |
| body | 16px | 1.65 | 0 | `--text-body` |
| body-lg | 18px | 1.55 | -0.01em | `--text-body-lg` |
| subheading | 20px | 1.35 | -0.01em | `--text-subheading` |
| heading-sm | 28px | 1.2 | -0.02em | `--text-heading-sm` |
| heading | 40px | 1.12 | -0.025em | `--text-heading` |
| display | 56px | 1.04 | -0.035em | `--text-display` |

### Responsive Display

Desktop H1: `56px`

Tablet H1: `46px`

Mobile H1: `38px`

Do not reduce mobile headings below 34px unless the phrase is unusually long.

---

## Tokens - Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---:|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |
| 120 | 120px | `--spacing-120` |

### Border Radius

| Element | Value |
|---|---:|
| tags | 9999px |
| buttons | 9999px |
| inputs | 10px |
| cards | 16px |
| photo cards | 18px |
| hero media | 24px |
| CTA band | 24px |
| icon containers | 10px |

### Shadows

| Name | Value | Token |
|---|---|---|
| subtle | `0 1px 2px rgba(15,23,42,.04)` | `--shadow-subtle` |
| card | `0 8px 30px rgba(15,23,42,.06)` | `--shadow-card` |
| floating | `0 20px 60px rgba(15,23,42,.12)` | `--shadow-floating` |

Use shadows sparingly. Border structure is preferred.

---

## Layout

**Page max width:** `1240px`

**Reading width:** `720px`

**Section gap desktop:** `112px`

**Section gap mobile:** `72px`

**Card padding desktop:** `28px`

**Card padding mobile:** `20px`

**Grid gap:** `24px`

**Hero top padding:** `56px`

**Hero bottom padding:** `72px`

### Container

```css
.ac-container {
  width: min(1240px, calc(100% - 40px));
  margin-inline: auto;
}

@media (max-width: 640px) {
  .ac-container {
    width: min(100% - 28px, 1240px);
  }
}
```

---

## Components

### Primary CTA Button

**Role:** highest-priority conversion action.

Examples:
- Estimer le coût gratuitement
- Demander mon devis
- Obtenir mon devis

Style:
- trust blue fill
- white text
- pill radius
- 15px Inter 600
- 44 to 48px minimum height
- compact arrow icon optional
- subtle darkening on hover

```css
background: #2563EB;
color: #FFFFFF;
border: 1px solid #2563EB;
border-radius: 9999px;
padding: 12px 20px;
```

The primary CTA should be visually obvious without becoming oversized.

---

### Secondary Button

**Role:** lower-priority navigation or supporting action.

Examples:
- Voir les services
- Voir les réalisations
- Voir les avis Google

Style:
- white or transparent fill
- ink text
- neutral border
- pill radius
- same height as primary CTA

```css
background: #FFFFFF;
color: #111318;
border: 1px solid #E3E5E8;
border-radius: 9999px;
padding: 12px 20px;
```

---

### Navigation

**Role:** simple conversion-first top navigation.

Desktop structure:

`Logo | Services | Comment ça marche | Avis | Garanties | FAQ | Téléphone | Devis gratuit`

Rules:
- max 5 to 6 text links
- phone number sits close to primary CTA
- sticky behavior allowed
- white or slightly translucent surface
- subtle bottom hairline only
- no oversized mega menu unless future service architecture requires it

---

### Hero Eyebrow

Small local-intent label above H1.

Example:

`Déménagement à Montpellier`

Style:
- 13px Inter 600
- blue text or ink text with blue dot
- optional soft blue pill
- no uppercase tracking-heavy treatment

---

### Hero Headline

The H1 should communicate the service promise before trying to sound clever.

Recommended structure:

`Votre déménagement, géré avec soin, livré parfait.`

Rules:
- maximum 3 lines desktop
- maximum 4 lines mobile
- one short phrase may use blue
- no gradient text
- no decorative outline text
- avoid forced line breaks unless composition improves

---

### Hero Trust Copy

Below the H1, place proof instead of generic marketing language.

Pattern:

`1 500+ déménagements réussis. Devis gratuit sous 24h. Assurance transport incluse. Prix fixe garanti.`

Style:
- 17 to 18px body
- max width around 680px
- body color
- line height 1.55

---

### Trust Strip

**Role:** compress credibility into one scan.

Suggested items:
- `5,0/5 sur Google`
- `225 avis vérifiés`
- `1 500+ déménagements`
- `Depuis 2015`
- `Réponse sous 24h`

Style:
- one horizontal row desktop
- 2-column or horizontally scrollable mobile
- light borders between items
- large number or rating above small caption
- star color allowed only inside Google rating item

Avoid turning every metric into a separate heavy card.

---

### Service Card

**Role:** explain one service with enough local relevance to drive a deeper click.

Structure:
1. icon or image
2. service label
3. short benefit-led title
4. 2 to 3 lines of copy
5. small text link

Style:
- white surface
- 1px border
- 16px radius
- 24 to 28px padding
- no heavy shadow
- hover may lift 2px

Desktop: 3-column grid.

Mobile: stacked.

---

### Process Step Card

**Role:** make the moving process feel controlled.

Pattern:
1. large step number
2. short title
3. one main sentence
4. one reassurance sentence

Examples:
- Vous nous appelez
- Devis gratuit & fixe
- On gère tout
- Vous êtes chez vous

Step number:
- 44 to 52px Manrope 600
- blue or very light blue treatment

Avoid arrows between every step on mobile.

---

### Formula / Package Card

**Role:** compare Économique, Standard and Confort.

Structure:
- formula name
- short positioning line
- included items
- CTA
- optional `Populaire` pill for Standard

The middle recommended package may receive:
- trust-blue border
- very light blue surface tint
- small `Populaire` pill

Do not enlarge the popular card dramatically.

---

### Review Block

**Role:** social proof.

Structure:
- Google stars
- short customer quote
- customer name
- city
- optional Google icon
- no fake avatar required

Style:
- white card or borderless quote block
- 16px quote
- 14px metadata
- allow 2 to 3 cards visible desktop
- mobile carousel allowed

Keep the quote readable. Do not overdecorate.

---

### Google Rating Badge

Example:

`★★★★★ 5,0/5 sur Google`

Style:
- neutral or white surface
- thin border
- yellow stars only
- ink text
- compact pill

Do not make yellow a brand color.

---

### Area Chip

**Role:** local coverage links.

Examples:
- Montpellier
- Lunel
- Nîmes
- Sète
- Béziers

Style:
- white or transparent
- neutral border
- pill shape
- 14px text
- blue border/text only for hover or selected state

These chips should look navigational, not decorative.

---

### Location Coverage Panel

**Role:** combine local SEO usefulness with a clean visual summary.

Structure:
- section intro
- zone principale
- zone élargie
- long-distance statement
- optional simple map graphic

Do not create a fake detailed map if geographic accuracy is not guaranteed.

---

### Quote / Estimation Form

**Role:** primary lead capture.

Fields:
- nom
- téléphone
- email
- adresse départ
- étage départ
- adresse arrivée
- étage arrivée
- date souhaitée
- volume estimé
- précisions

Style:
- white panel
- 16 to 20px radius
- neutral 1px border
- 48px field height
- labels visible above fields
- blue focus ring
- CTA full-width on mobile

Avoid placeholder-only forms.

---

### Form Input

```css
background: #FFFFFF;
border: 1px solid #D4D7DC;
border-radius: 10px;
min-height: 48px;
padding: 0 14px;
font: 400 15px/1.4 Inter, sans-serif;
color: #111318;
```

Focus:

```css
border-color: #2563EB;
box-shadow: 0 0 0 3px rgba(37, 99, 235, .12);
```

---

### Gallery Card

**Role:** show actual work and reduce perceived risk.

Structure:
- large real project image
- small category chip
- short factual caption
- optional location

Style:
- image ratio around `4:3` or `3:2`
- 18px radius
- no artificial vignette
- no text over busy image unless a dark scrim is required

---

### FAQ Row

**Role:** answer purchase objections and capture SEO long-tail questions.

Style:
- accordion
- 1px top/bottom border
- 18px question
- 15 to 16px answer
- generous 20 to 24px vertical padding
- simple plus/minus icon

Avoid putting each FAQ inside a floating card.

---

### Final CTA Band

**Role:** close long pages with one decisive action.

Suggested heading:

`Votre estimation en 4 étapes, en moins de 2 minutes.`

Style:
- dark ink surface or blue wash
- 24px radius
- large heading
- short supporting line
- primary CTA
- phone number
- reassurance line

Reassurance example:

`100 % gratuit · Sans engagement · Réponse sous 24h`

---

### Footer

Dark footer is allowed.

Structure:
- AC Coursing wordmark
- one-sentence positioning
- phone
- email
- address
- services/navigation
- legal links

Do not overload the footer with every SEO location.

---

## Do's and Don'ts

### Do

- Keep the palette neutral with one main blue accent.
- Use real moving-team, vehicle, furniture protection and project imagery.
- Show trust proof close to every major CTA.
- Use thin borders before shadows.
- Keep headlines compact and operational.
- Repeat the quote CTA naturally through long pages.
- Use local city names where they genuinely help navigation and SEO.
- Keep price, insurance and response-time reassurance highly visible.
- Use the Google rating as proof, not decoration.
- Let white space separate sections instead of excessive background colors.
- Keep forms simple and visibly labelled.
- Use icons with one consistent 1.5px to 2px stroke style.

### Don't

- Do not introduce multiple bright accent colors.
- Do not use gradients as a core visual treatment.
- Do not use glassmorphism.
- Do not use cartoon trucks, cartoon boxes or mascot illustrations.
- Do not use generic handshake stock photography.
- Do not cover real project images with large text overlays.
- Do not use huge 72px+ headings on service pages.
- Do not turn every block into a shadowed card.
- Do not make the site feel like a SaaS dashboard.
- Do not hide critical reassurance behind accordions.
- Do not use vague CTAs like `Découvrir` when `Demander un devis` is clearer.
- Do not let local SEO text become an uninterrupted wall of paragraphs.

---

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas | `#F7F7F5` | Main page background |
| 1 | Card | `#FFFFFF` | Services, forms, reviews |
| 2 | Soft Panel | `#F1F3F5` | Secondary content grouping |
| 3 | Blue Wash | `#EAF1FF` | Selected/recommended state |
| 4 | Dark Surface | `#0A0D12` | Footer or final CTA section |

---

## Elevation

**Standard card**

`0 1px 2px rgba(15,23,42,.04)`

**Hover card**

`0 8px 30px rgba(15,23,42,.06)`

**Hero image / floating trust card**

`0 20px 60px rgba(15,23,42,.12)`

One visually floating element per section is enough.

---

## Imagery

Photography is a core part of the AC Coursing visual system.

Preferred imagery:
- real AC Coursing team
- furniture being protected
- careful loading
- boxes and wrapping materials
- vans/trucks in context
- before/after room state
- office moves
- long-distance loading
- storage/garde-meubles
- customer handoff moments

Image treatment:
- natural daylight where possible
- clean white balance
- moderate contrast
- no heavy cinematic grade
- no blue overlay
- rounded corners 18 to 24px
- show people working, not posing

Avoid:
- generic stock families holding cardboard boxes
- exaggerated smiling models
- isolated truck renders
- AI-looking impossible interiors
- oversaturated HDR

The visual proof should communicate care and organization.

---

## Iconography

Use simple outline icons.

Recommended style:
- Lucide-like
- 1.5px or 2px stroke
- rounded joins
- 18 to 22px
- ink or trust blue
- icons sit in 36 to 44px light-neutral or blue-wash containers

Useful icon concepts:
- shield
- clock
- package
- truck
- map pin
- phone
- badge check
- house
- building
- box
- route
- warehouse

Never mix outline, filled and 3D icons in the same interface.

---

## Layout Strategy

### Homepage

1. Navigation
2. Hero with proof-rich copy
3. Trust strip
4. About / core promise
5. 4-step process
6. Zones
7. Services
8. Formulas
9. Reviews
10. Recent interventions
11. FAQ
12. Final estimation CTA
13. Footer

### Service Page

1. Breadcrumb
2. Service H1 + short commercial intent copy
3. CTA + trust proof
4. Service benefits
5. What's included
6. Process
7. Pricing indicators where appropriate
8. Local proof / related locations
9. Reviews
10. FAQ
11. Final CTA

### Local SEO Page

1. Local-intent eyebrow
2. City-specific H1
3. Clear local service promise
4. CTA
5. Local proof and logistics
6. Price / timing indicators
7. Services available
8. Access / area specifics where real
9. Nearby service areas
10. Reviews
11. FAQ
12. Devis CTA

Do not reuse the exact same copy block across every city page.

---

## Content Rhythm

Use a repeating section rhythm:

`eyebrow -> heading -> 1 short paragraph -> visual/proof -> CTA`

Long-form SEO content should be broken every 120 to 220 words by one of:
- bullet list
- service card
- proof metric
- quote
- image
- FAQ
- CTA
- location chips

This prevents the page from feeling like an SEO article.

---

## Agent Prompt Guide

### Quick Color Reference

- page background: `#F7F7F5`
- card surface: `#FFFFFF`
- soft surface: `#F1F3F5`
- primary text: `#111318`
- body text: `#3F4650`
- muted text: `#6B7280`
- border: `#E3E5E8`
- accent: `#2563EB`
- accent hover: `#1D4ED8`
- accent wash: `#EAF1FF`
- star only: `#F5B301`
- dark surface: `#0A0D12`

### Example Component Prompts

1. **Hero**
   Create a premium moving-company hero for AC Coursing. Use a warm off-white `#F7F7F5` background, Manrope 56px/600 heading in `#111318`, Inter 18px body in `#3F4650`, a blue `#2563EB` pill CTA and a neutral ghost CTA. Include a real moving-team image in a 24px-radius frame and a compact trust strip showing Google rating, reviews, completed moves and response time. Keep the design clean and operational.

2. **Service card**
   White `#FFFFFF` card, 16px radius, 1px `#E3E5E8` border, 28px padding, no strong shadow. Use a 40px icon container with soft-blue `#EAF1FF` fill and `#2563EB` outline icon. Heading Manrope 20px/600. Body Inter 15px `#6B7280`.

3. **Process section**
   Four calm steps in a responsive grid. Each step uses a large Manrope number, a short heading and two short lines of copy. Use blue only on the number or tiny accent icon. Keep the surface mostly neutral and avoid arrows on mobile.

4. **Formula cards**
   Three white pricing-style service cards for Économique, Standard and Confort. Standard gets a 1px blue border, soft-blue wash and small `Populaire` pill. No oversized pricing-card SaaS treatment.

5. **Review section**
   Use compact Google-star trust header, then 2 to 3 customer quote cards. Yellow only for stars. White cards, neutral borders, 16px quote copy, customer name and city below.

6. **Quote form**
   Create a white 18px-radius form card on warm canvas with two-column desktop grid and one-column mobile. Inputs are 48px high with 10px radius and neutral borders. Focus uses blue ring. Primary CTA spans full width on mobile.

7. **Final CTA**
   Dark `#0A0D12` rounded 24px panel with white heading, muted-light supporting copy and a blue CTA. Include the phone number as a secondary action and a short reassurance line.

---

## Highlight Pattern

AC Coursing does not need a highlight on every heading.

For top-level conversion sections only, one short phrase may receive blue text.

Example:

`Votre déménagement,` **`géré avec soin.`**

Rules:
- maximum one highlighted phrase per H1/H2
- no blue marker background behind full sentences
- no gradient text
- no multiple brand colors inside one heading

---

## Trust Pattern

Every high-intent section should answer at least one anxiety:

- How much will it cost?
- Will the price change?
- Are my belongings insured?
- Will the team arrive on time?
- How fast can I get a quote?
- Do you serve my city?
- Can you handle fragile or bulky items?
- Can you manage everything for me?

Use proof close to the anxiety.

Examples:
- `Prix fixe garanti`
- `Assurance transport incluse`
- `Réponse sous 24h`
- `1 500+ déménagements`
- `5,0/5 sur Google`
- `Depuis 2015`

---

## Similar Visual References

These are visual-direction references, not layouts to copy.

- Linear-style restraint for typography and spacing
- Stripe-style clarity around conversion actions
- modern premium home-service websites for trust hierarchy
- high-end logistics websites for operational photography
- local-service landing pages with strong proof density

The final result must still feel like AC Coursing, not a SaaS template.

---

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-canvas: #F7F7F5;
  --color-white: #FFFFFF;
  --color-soft-surface: #F1F3F5;
  --color-border: #E3E5E8;
  --color-border-strong: #D4D7DC;
  --color-muted: #6B7280;
  --color-body: #3F4650;
  --color-ink: #111318;
  --color-deep-ink: #0A0D12;
  --color-trust-blue: #2563EB;
  --color-trust-blue-hover: #1D4ED8;
  --color-blue-wash: #EAF1FF;
  --color-success-wash: #EFF7F1;
  --color-star: #F5B301;

  /* Fonts */
  --font-display: "Manrope", "Inter Tight", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Type */
  --text-caption: 12px;
  --text-body-sm: 14px;
  --text-body: 16px;
  --text-body-lg: 18px;
  --text-subheading: 20px;
  --text-heading-sm: 28px;
  --text-heading: 40px;
  --text-display: 56px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;
  --spacing-120: 120px;

  /* Layout */
  --page-max-width: 1240px;
  --reading-max-width: 720px;
  --section-gap: 112px;
  --grid-gap: 24px;

  /* Radius */
  --radius-sm: 10px;
  --radius-card: 16px;
  --radius-photo: 18px;
  --radius-hero: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-subtle: 0 1px 2px rgba(15, 23, 42, .04);
  --shadow-card: 0 8px 30px rgba(15, 23, 42, .06);
  --shadow-floating: 0 20px 60px rgba(15, 23, 42, .12);
}
```

### Tailwind v4

```css
@theme {
  --color-canvas: #F7F7F5;
  --color-white: #FFFFFF;
  --color-soft-surface: #F1F3F5;
  --color-border: #E3E5E8;
  --color-border-strong: #D4D7DC;
  --color-muted: #6B7280;
  --color-body: #3F4650;
  --color-ink: #111318;
  --color-deep-ink: #0A0D12;
  --color-trust-blue: #2563EB;
  --color-trust-blue-hover: #1D4ED8;
  --color-blue-wash: #EAF1FF;
  --color-success-wash: #EFF7F1;
  --color-star: #F5B301;

  --font-display: "Manrope", "Inter Tight", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;

  --text-caption: 12px;
  --text-body-sm: 14px;
  --text-body: 16px;
  --text-body-lg: 18px;
  --text-subheading: 20px;
  --text-heading-sm: 28px;
  --text-heading: 40px;
  --text-display: 56px;

  --radius-sm: 10px;
  --radius-card: 16px;
  --radius-photo: 18px;
  --radius-hero: 24px;
  --radius-full: 9999px;

  --shadow-subtle: 0 1px 2px rgba(15, 23, 42, .04);
  --shadow-card: 0 8px 30px rgba(15, 23, 42, .06);
  --shadow-floating: 0 20px 60px rgba(15, 23, 42, .12);
}
```

---

## Default Agent Instruction

When generating or editing AC Coursing pages:

1. Preserve the warm neutral canvas, white cards and single blue accent.
2. Use Manrope for headings and Inter for all UI/body text.
3. Prefer real service photography over illustrations.
4. Keep commercial intent visible above the fold.
5. Put trust proof close to CTAs.
6. Use border-led cards with minimal shadow.
7. Keep copy direct, practical and reassuring.
8. Use local SEO naturally without turning pages into keyword blocks.
9. Preserve mobile conversion: phone, quote CTA and short forms must remain easy to reach.
10. Do not introduce gradients, glassmorphism, cartoon visuals, random accent colors or heavy visual effects.