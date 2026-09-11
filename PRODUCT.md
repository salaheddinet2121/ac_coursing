# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily individuals and households in and around Montpellier, France, arranging a residential move: local moves, long-distance/nationwide moves, moves requiring full packing service, moves of bulky items, and moves for senior clients needing extra care. Professional/office relocations are secondary and not the primary audience.

## Product Purpose

The marketing and lead-generation website for AC Coursing Déménagement, a moving company operating since 2015 out of Montpellier. It informs prospective clients about services and drives them to request a free quote (devis) via a multi-step quote form or contact form. Success is a completed quote request or contact submission.

## Positioning

Two combined claims a nearby competitor could not casually match: a fixed-price guarantee (the quoted price is the final invoiced price, barring a scope change agreed with the client) and a fast free quote (within 24h). This is paired with careful, attentive handling — protection of furniture, transport insurance, and extra patience for fragile items and senior clients — but the price-certainty and speed claims are the primary differentiator.

## Operating Context

- Quote requests flow through a multi-step "devis" form (src/components/moving-form) capturing rooms, inventory, special items, and contact details, in addition to a simpler contact form.
- Services offered: moves within France/nationwide, moves with full packing, bulky-item moves, local Montpellier-area moves (incl. Castelnau-le-Lez, Lattes, Saint-Jean-de-Védas, Béziers), senior-focused moves, long-distance moves, and post-move junk/debris removal.
- Site content and UI copy are in French; the business serves the Montpellier/Occitanie region and beyond for long-distance jobs.
- SMTP-based email delivery handles contact/quote submissions (see `.env` / `.env.example`).

## Capabilities and Constraints

- Built on Astro 6 + Tailwind v4 with Astro SSR (Node adapter) for server-side form handling; React islands used for the moving-form wizard and some UI primitives (Radix-based).
- Business data (`src/data/client.ts`) and brand/visual tokens (`src/config/brand.ts`) are centralized and already populated with AC Coursing's real business info (name, address, phone, license/founding year, Google Business link).
- SEO: per-page titles/descriptions, Open Graph, JSON-LD (`MovingCompany` schema), sitemap, robots.txt.
- Deployment target: Node-based hosting (Coolify), pinned Node/pnpm versions.

## Brand Commitments

- Business name: AC Coursing Déménagement. Tagline: "Votre déménagement, géré avec soin, livré parfait."
- Founded 2015, based at 48 Rue Claude Balbastre, Montpellier (34070).
- Voice: French, direct and reassuring, emphasizing structure/predictability ("cadrage précis, devis fixe, planning clair") over sales hype.
- Existing color/font system in `src/config/brand.ts` (primary indigo `#1c1a77`, accent orange `#ffab4b`, Inter body / Oswald display) is the current live identity — treat as incumbent visual authority, not yet formally documented in DESIGN.md.

## Evidence on Hand

- Reviews (`src/pages/reviews.astro`) and gallery (`src/pages/galerie.astro`) contain real client testimonials and real project photos — genuine evidence, safe to reference and preserve.
- Some imagery elsewhere in the site (e.g. the About page's Unsplash stock photo) is still placeholder stock, not real evidence of this business's work — future work must not present it as an authentic project photo or fabricate additional claims around it.
- No case studies, press mentions, or third-party benchmarks exist; none should be invented.

## Product Principles

1. Reduce the client's uncertainty first: the fixed-price guarantee and fast quote turnaround are the core trust mechanism — never bury or dilute them.
2. Keep the quote path (devis form) short and low-friction; it is the primary conversion mechanism, not just the contact form.
3. Speak plainly and reassuringly in French, favoring concrete process description ("cadrage, devis fixe, planning") over generic sales language.
4. Preserve real evidence (reviews, gallery photos) as the credibility backbone; never fabricate testimonials, benchmarks, or claims.
5. Local relevance matters — surface Montpellier-area specificity (named neighboring towns) alongside nationwide/long-distance capability.
