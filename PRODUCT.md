# Product

<!-- impeccable:product-schema 1 -->

# AC Coursing Déménagement — SEO Product Specification

This file is the product and SEO source of truth for the AC Coursing website.

When implementation, copy, templates, legacy URLs, or generic SEO advice conflict with this document, follow this document unless verified business information has changed.

---

## Platform

Web.

Stack-agnostic. The implementation technology is not fixed by this document; any stack is acceptable provided it satisfies the non-negotiable requirements below.

Non-negotiable platform requirements:

* Primary page content must be server-rendered and fully present in the initial HTML.
* Pages must be crawlable and indexable without depending on client-side JavaScript to render primary content.
* Every SEO landing page must return a normal `200` and be reachable via a clean, static-looking URL.
* Form delivery must be reliable (e.g. email/SMTP or an equivalent) and never block the page from rendering.
* Business information and brand configuration should be centralized in one place so copy, NAP, and brand values are not duplicated or drifting across pages.

If interactivity is required (e.g. the multi-step quote form), it must enhance a page that already renders and reads correctly without it.

---

## Business

**Business name:** AC Coursing Déménagement

**Location:**
48 Rue Claude Balbastre
34070 Montpellier
France

**Founded:** 2015

**Primary market:** Montpellier and surrounding areas.

**Extended market:** Occitanie and nationwide moves across France.

**Tagline:**
"Votre déménagement, géré avec soin, livré parfait."

---

## Primary Users

The primary audience is individuals and households preparing a residential move.

Typical users include:

* people moving inside Montpellier
* people moving to or from nearby cities
* people moving from Montpellier to another French city
* families
* students and small-volume movers
* people needing a full packing service
* people moving bulky or fragile items
* senior clients requiring additional assistance
* customers looking for a predictable fixed price

Professional and office relocations are an important secondary market.

The website must primarily speak to people already considering or planning a move rather than broad awareness audiences.

---

## Product Purpose

AC Coursing is a lead-generation and trust-building website for a professional moving company.

Its primary commercial objective is:

**completed quote request**

Secondary conversions are:

* phone call
* contact request
* interaction with the quote funnel

The multi-step quote form is the primary conversion mechanism.

The generic contact form is secondary.

SEO traffic must therefore be designed around commercially relevant search intent rather than traffic volume alone.

---

# Commercial Positioning

The primary positioning is based on reducing uncertainty.

## Core differentiators

### Fixed-price guarantee

The quoted amount is the final invoiced amount unless the customer agrees to a change in scope.

Communicate this as:

* devis fixe
* prix fixe
* prix annoncé = prix payé
* pas de mauvaise surprise

Do not invent stronger contractual wording than the business actually provides.

### Fast free quote

The customer receives a free quote within 24 hours.

This is one of the primary conversion promises and should remain visible near major CTAs.

---

## Supporting trust signals

Secondary differentiators include:

* transport insurance
* careful furniture protection
* professional packing
* clear planning
* attentive handling of fragile items
* senior-friendly assistance
* local Montpellier knowledge
* nationwide capability

These strengthen the main proposition but must not replace the fixed-price and 24-hour quote messages.

---

# SEO North Star

AC Coursing is not building a generic moving-information website.

The SEO strategy is:

**capture high-commercial-intent searches around Montpellier first, then expand only into validated services, cities and routes.**

Every indexable commercial landing page must have one clearly owned search intent.

Pages must not be created simply because AC Coursing provides the service.

A real service does not automatically justify a dedicated SEO landing page.

---

# Search Intent Ownership

This mapping is authoritative.

| Page                                         | Primary search intent                      | Role                                  |
| -------------------------------------------- | ------------------------------------------ | ------------------------------------- |
| `/`                                          | `déménageur montpellier`                   | Primary local commercial landing page |
| `/prestations/`                              | none intentionally                         | SEO/navigation hub                    |
| `/devis-demenagement/`                       | `devis déménagement montpellier`           | Highest-conversion quote page         |
| `/petit-demenagement-montpellier/`           | `petit déménagement montpellier`           | Service BOFU                          |
| `/demenagement-entreprise-montpellier/`      | `déménagement entreprise montpellier`      | B2B BOFU                              |
| `/demenagement-urgent-montpellier/`          | `déménagement urgent montpellier`          | Urgent-service BOFU                   |
| `/demenagement-longue-distance-montpellier/` | `déménagement longue distance montpellier` | Long-distance BOFU                    |
| `/demenageur-nimes/`                         | `déménageur nîmes`                         | City BOFU                             |
| `/demenageur-lunel/`                         | `déménageur lunel`                         | City BOFU                             |
| `/demenageur-sete/`                          | `déménageur sète`                          | City BOFU                             |
| `/demenageur-beziers/`                       | `déménageur béziers`                       | City BOFU                             |
| `/demenagement-montpellier-paris/`           | `déménagement montpellier paris`           | Route BOFU                            |
| `/demenagement-montpellier-lyon/`            | `déménagement montpellier lyon`            | Route BOFU                            |
| `/demenagement-montpellier-marseille/`       | `déménagement montpellier marseille`       | Route BOFU                            |
| `/demenagement-montpellier-toulouse/`        | `déménagement montpellier toulouse`        | Route BOFU                            |
| `/avis-clients/`                             | branded trust intent                       | Evidence/trust                        |
| `/galerie/`                                  | branded evidence intent                    | Real project evidence                 |
| `/ressources/`                               | informational intent                       | Supporting topical authority          |

---

# Main Pages

These are the primary pages of the website. Each has one owned role. Nothing beyond this set is created without validated demand.

## Homepage — `/`

**Role:** primary local commercial landing page.
**Owns:** `déménageur montpellier`.
**Job:** prove Montpellier relevance, state what AC Coursing does, surface the fixed-price guarantee and 24h-quote promise, and push the primary quote CTA — all above the fold. Enough service/local depth to demonstrate relevance, without trying to rank for every individual service. Carries `MovingCompany` schema.

## Prestations hub — `/prestations/`

**Role:** SEO + navigation hub. Owns no commercial query intentionally.
**Job:** expose every validated commercial page, distribute internal link equity, and keep all BOFU pages within ~2 clicks of the homepage. Concise and navigational — grouped links by zone / route / service + a direct devis link. Never a second Montpellier landing page.

## Devis — `/devis-demenagement/`

**Role:** highest-conversion page on the site.
**Owns:** `devis déménagement montpellier`.
**Job:** put the multi-step quote form at or extremely near the top, then support it below with pricing logic, fixed-price guarantee, 24h turnaround, insurance, real reviews, FAQ, and related-service links. Any displayed pricing carries a visible update date.

## Service BOFU pages

`/petit-demenagement-montpellier/`, `/demenagement-entreprise-montpellier/`, `/demenagement-urgent-montpellier/`, `/demenagement-longue-distance-montpellier/`.
**Role:** one owned service intent each.
**Job:** match the specific service intent, answer what that searcher needs, prove capability with a non-template operational/evidence section, and convert into the quote funnel. Carry `Service` schema where applicable.

## City BOFU pages

`/demenageur-nimes/`, `/demenageur-lunel/`, `/demenageur-sete/`, `/demenageur-beziers/`.
**Role:** one owned city intent each.
**Job:** genuine city-specific content (distance/logistics from base, local access/parking, city-specific pricing factors, city FAQ, real imagery). Never produced by keyword substitution. If unique info can't be produced, the city stays a hub mention, not a page.

## Route BOFU pages

`/demenagement-montpellier-paris/`, `/demenagement-montpellier-lyon/`, `/demenagement-montpellier-marseille/`, `/demenagement-montpellier-toulouse/`.
**Role:** one owned route intent each.
**Job:** answer "how will my move from Montpellier to X work, what drives the price, can AC Coursing do it" — with real distance, duration, constraints, pricing factors, and transport organisation. Never a generic long-distance article with the destination swapped.

## Evidence & support pages

* `/avis-clients/` — branded trust intent; genuine reviews only, carries verified `Review`/`AggregateRating`.
* `/galerie/` — branded evidence intent; real project photography, reusable as supporting evidence on matching SEO pages.
* `/ressources/` — informational intent; supporting topical authority, built only after the BOFU set is live.

---

# Homepage SEO Contract

The homepage owns:

**Primary keyword:**
`déménageur montpellier`

Closely related semantic variants may appear naturally:

* entreprise de déménagement Montpellier
* société de déménagement Montpellier
* déménagement Montpellier
* déménageurs Montpellier

These variants describe the company.

They must not turn the homepage into a B2B landing page.

The phrase `déménagement entreprise Montpellier` belongs to the dedicated professional-moving intent.

## Homepage requirements

The homepage must communicate above the fold:

1. Montpellier relevance
2. what AC Coursing does
3. fixed-price guarantee
4. quote within 24h
5. primary quote CTA
6. genuine trust evidence

The homepage should contain enough local/service depth to demonstrate relevance without trying to rank independently for every individual service.

---

# Montpellier Cannibalization Rule

There must be **no separate `déménageur Montpellier` city landing page**.

The homepage already owns that query.

Do not create URLs such as:

`/demenageur-montpellier/`

or

`/lieux-intervention/montpellier/`

for the same intent.

Pages targeting Montpellier must serve a materially different intent such as:

* devis
* urgent
* petit déménagement
* entreprise
* longue distance

---

# Prestations Hub

Canonical URL:

`/prestations/`

The hub exists primarily to:

* expose all validated commercial pages
* distribute internal PageRank
* keep important landing pages within approximately two clicks of the homepage
* help users browse by need
* provide a clear site architecture

It must **not** attempt to outrank the homepage for `déménageur Montpellier`.

Recommended structure:

## Nos zones d'intervention

* Nîmes
* Lunel
* Sète
* Béziers

## Nos trajets longue distance

* Montpellier → Paris
* Montpellier → Lyon
* Montpellier → Marseille
* Montpellier → Toulouse

## Nos prestations

* Petit déménagement
* Déménagement d'entreprise
* Déménagement urgent
* Déménagement longue distance
* other validated service pages

## Votre devis

Direct link to `/devis-demenagement/`.

The hub should remain concise and navigational rather than becoming another giant Montpellier landing page.

---

# Devis SEO Intent

Canonical URL:

`/devis-demenagement/`

Primary query:

`devis déménagement montpellier`

Supporting commercial queries may include:

* prix déménagement Montpellier
* tarif déménagement Montpellier
* estimation déménagement Montpellier
* devis déménageur Montpellier

This page should be the strongest conversion page on the website.

## Primary UX

The multi-step moving form should appear immediately or extremely close to the top of the page.

The form may collect:

* departure address
* destination
* property type
* rooms
* approximate volume
* inventory
* special/bulky objects
* floor/access constraints
* desired date
* packing requirements
* contact information

Do not introduce unnecessary fields before the user has started the quote process.

## Supporting content

Below the quote experience, provide:

* explanation of how pricing is determined
* fixed-price guarantee
* quote turnaround
* insurance information
* genuine reviews
* pricing guidance where verified
* FAQ
* related service links

If pricing is displayed, include a visible update date.

---

# City Page Strategy

Initial validated city targets:

* Nîmes
* Lunel
* Sète
* Béziers

Do not create pages for every municipality surrounding Montpellier.

In particular, pages for places such as:

* Castelnau-le-Lez
* Lattes
* Mauguio
* La Grande-Motte
* Pérols
* Juvignac
* Saint-Jean-de-Védas

must remain coverage mentions until keyword demand and SERP intent justify dedicated pages.

---

## Mandatory City-Page Differentiation

A city page must not be produced by replacing one city name with another.

Every indexable city page requires real city-specific information.

At minimum include:

* actual relationship/distance to the operating base
* realistic travel/logistics considerations
* local access or parking considerations where relevant
* pricing factors specific to the job
* genuine local evidence when available
* city-specific FAQ questions
* real or appropriately relevant imagery

If sufficient unique information cannot be produced, do not create the page.

Keep the city as a mention/link in the hub instead.

---

# Route Page Strategy

Priority routes:

* Montpellier → Paris
* Montpellier → Lyon
* Montpellier → Marseille
* Montpellier → Toulouse

Route pages answer a different intent from generic long-distance moving.

A route page should help someone answer:

**“How will my move from Montpellier to this destination work, what will influence the price, and can AC Coursing do it?”**

## Mandatory route-specific information

Each route page should contain verified or defensible information about:

* distance
* expected driving/logistics duration
* departure and arrival constraints
* likely pricing factors
* approximate price guidance only where supported
* delivery organisation
* dedicated vs shared/grouped transport where actually offered
* volume impact
* access constraints
* route-specific FAQ

Never copy a generic long-distance article and change the destination.

---

# Service SEO Strategy

A service gets a dedicated SEO page only when all three are true:

1. AC Coursing genuinely provides it.
2. There is a meaningful search audience.
3. The SERP/search intent is sufficiently distinct from an existing page.

Current priority service intents:

* petit déménagement
* déménagement entreprise
* déménagement urgent
* déménagement longue distance

---

## Existing Real Services

AC Coursing also provides services such as:

* full packing / mise en carton
* bulky-item moving
* senior moving assistance
* local moving
* nationwide transport
* post-move junk/debris removal

These are real capabilities and should remain visible.

However, they are **not automatically mandatory standalone SEO pages**.

They may live as:

* sections of `/prestations/`
* supporting homepage content
* supporting service pages
* dedicated landing pages if demand is later validated

---

# Pages Requiring Validation Before Creation

Do not create dedicated pages for the following purely to increase page count:

* T2
* T3
* T4
* studio
* apartment size variants
* cabinet médical
* bureaux as a duplicate of entreprise
* every Montpellier suburb
* Hérault
* Gard
* Occitanie

Use SE Ranking/GSC/SERP-overlap data before splitting these intents.

For example:

`déménagement bureaux Montpellier`

should normally remain part of the professional-moving cluster unless evidence shows that users and Google treat it as a sufficiently separate intent from:

`déménagement entreprise Montpellier`.

---

# Geographic Coverage Terms

The following describe service coverage:

* Hérault
* Gard
* Occitanie

They should support local relevance but should not automatically receive commercial landing pages.

Coverage pages must not compete with city pages.

---

# Standard BOFU Page Structure

Commercial SEO pages should generally contain:

## 1. Intent-matched hero

* exact user problem
* location/service
* one meaningful value proposition
* primary quote CTA
* relevant real image whenever possible

## 2. Intent-specific explanation

Directly answer what the searcher needs to know.

Avoid generic paragraphs about moving.

## 3. Unique evidence / operational section

This section must be impossible to reproduce simply by replacing the target keyword.

Examples:

* route distance
* local access constraint
* actual process
* service-specific equipment
* pricing factor
* relevant job evidence
* real testimonial

## 4. Conversion CTA

Send users into the multi-step quote experience.

## 5. Reviews / trust

Use genuine evidence only.

## 6. FAQ

Questions must be specific to the current intent.

## 7. Relevant internal links

Link naturally to:

* `/devis-demenagement/`
* related service
* relevant city/route
* supporting resource

Do not create keyword-stuffed link blocks.

---

# Content Quality Rule

SEO safety does not come from achieving an arbitrary optimization score.

Do not treat scores such as 85–93 as proof that a page is safe or useful.

The requirement is:

**unique intent + unique information + real usefulness + real evidence**

Do not produce scaled pages where only:

* city
* destination
* title
* a few nouns

change between URLs.

---

# Search Intent Before Copy

Before creating any new SEO page, explicitly determine:

**Searcher:** Who is making this search?

**Need:** What are they trying to find immediately?

**Outcome:** What are they trying to accomplish after finding it?

The page must be designed around those three answers.

Do not start with a keyword and generate generic content around it.

---

# Title Strategy

Default commercial title pattern:

`Target Keyword | Primary Benefit | AC Coursing`

The target keyword comes first (it signals to the searcher "this result is for you" and lifts CTR, which is itself a ranking factor). The benefit segment differentiates from competitors. The brand comes last and is the acceptable casualty if the title is truncated.

## Length

* Target **≤ 60 characters** as a working ceiling.
* The real constraint is **pixel width (~600px on desktop)**, not character count. A 57-character title can still be cut mid-word if it uses wide words.
* **Pixel-cut caveat (French):** accented, long French words (`Déménagement`, `Montpellier`) are wide and truncate earlier than the character count suggests. When a title is at the limit, the keyword and most of the benefit must survive the cut — losing the trailing brand is acceptable, losing part of the benefit is not.
* Always preview every title in a SERP snippet tool before publishing.

## Examples

`Déménageur Montpellier | Devis Gratuit | AC Coursing`

`Déménageur Nîmes | Devis Gratuit | AC Coursing`

`Déménagement Montpellier-Paris | Devis | AC Coursing`  *(route titles hyphenate the pair and drop "Prix" to stay under the pixel cut — the generic `Déménagement Montpellier Paris | Prix & Devis | AC Coursing` runs long)*

## Rules

* Do not append the full company name twice.
* Do not stuff synonymous keywords into the title.
* One title = one intent. Do not blend two page intents into one title.

---

# H1 Strategy

One primary H1 per landing page.

The H1 should reflect the page intent naturally.

It does not need to be identical to the title.

Avoid using the marketing tagline as the only H1 when the page requires a strong SEO topic signal.

The H1 should contain the primary keyword or a natural, readable form of it. If the keyword is a fragment (e.g. `déménageur Nîmes`), turn it into a natural French phrase in the H1 — `Déménageur à Nîmes` — rather than pasting the raw fragment.

---

# Meta Description Strategy

The meta description does not directly rank the page, but it drives the SERP click. Because CTR is a ranking factor, treat the meta as conversion copy, not a keyword dump.

## Length

* Target **140–160 characters**.
* Google truncates by pixel width here too; ~155 characters is the safe working target. Front-load the important content so the message survives truncation.
* Every page must have a **unique** meta description. No two pages share one.

## What every commercial meta must do

1. Name the intent/location so the searcher recognises the match (contains the keyword or a natural variant, once — never stuffed).
2. State one concrete differentiator — the fixed-price guarantee or the 24h free quote.
3. End on an action cue that mirrors a CTA concept (`Devis gratuit en 24h`, `Estimez votre déménagement`).

## Logic by page type

* **Homepage / city:** keyword + Montpellier/city relevance + fixed price + 24h quote + CTA cue.
* **Devis:** emphasise free, fast, no-surprise pricing and the multi-step estimate.
* **Service:** name the specific service + who it's for + the concrete promise + CTA cue.
* **Route:** name the route + that it's an organised long-distance move + price-factor honesty + CTA cue.

## Examples (illustrative — verify against real offer before use)

* Homepage: `Déménageur à Montpellier depuis 2015. Prix fixe garanti, pas de mauvaise surprise, devis gratuit en 24h. Résidentiel et longue distance. Estimez votre déménagement.`
* Nîmes: `Déménageur à Nîmes : équipe locale, prix annoncé = prix payé, devis gratuit sous 24h. Emballage et transport assurés. Demandez votre estimation en ligne.`

## Rules

* Do not fabricate figures (ratings, years, volumes) that aren't verified business fact.
* Do not repeat the exact title as the meta.
* Do not keyword-stuff; one natural mention of the intent is enough.

---

# Keyword Coverage Threshold

SEO safety is not a numeric optimization score. This document explicitly rejects treating a score such as 85–93 as proof a page is safe or useful (see *Content Quality Rule*). The threshold that matters is **coverage discipline plus genuine uniqueness**, not a tool percentage.

## Coverage discipline (the actual "threshold")

For every commercial page, the primary keyword — or a natural, readable variant — must appear in all of:

1. `<title>`
2. `H1`
3. meta description
4. the **first ~100 words** of visible body copy (ideally the first sentence / hero line)
5. at least one `H2` where it reads naturally
6. the URL slug
7. one image `alt` where genuinely accurate

If those seven are covered naturally, the page is "optimized enough" for its main keyword. Adding more mentions past this point does not increase safety and starts to look like stuffing.

## Density

* Keyword density is a **soft ceiling, not a target**: roughly **0.5–1.5%** of body words. Above ~2% reads as stuffing and is a quality risk.
* Never insert a keyword where it breaks natural French. Readability and intent match outrank any density figure.

## The real safety gate

Coverage gets the keyword *recognised*. Safety comes from the *Content Quality Rule* requirement:

**unique intent + unique information + real usefulness + real evidence.**

A page can have perfect coverage and still be an unsafe scaled clone. Coverage is necessary, never sufficient — the non-template evidence/operational section (BOFU structure §3) is what actually protects the page.

---

# Internal Linking

The internal-linking model is:

`Homepage → Prestations Hub → BOFU Landing Pages → Devis`

BOFU pages should also link contextually to related BOFU pages and useful resources.

Important commercial pages should not be orphaned.

The hub should link directly to every priority BOFU page.

---

# Resources / Supporting Content

After the initial BOFU set is established, content expansion should move toward useful supporting resources rather than manufacturing more city pages.

Initial resource topics may include:

* checklist déménagement
* comment estimer son volume
* combien coûte un déménagement
* comment choisir une formule de déménagement
* préparer un déménagement longue distance
* déménagement professionnel vs particulier

Informational pages should answer the question immediately before expanding into detail.

Where appropriate they should internally link to one or two relevant commercial pages.

---

# Evidence

Real evidence is a major component of the product.

Approved evidence sources include:

* genuine customer reviews
* genuine project/gallery photographs
* verified company information
* actual services
* actual operating history
* actual pricing supplied by the business
* real logistics/process information

Do not fabricate:

* reviews
* case studies
* customer names
* certifications
* awards
* press mentions
* project locations
* statistics
* benchmark data
* partnerships
* guarantees beyond the real commercial offer

---

# Images

Prefer genuine AC Coursing photographs for commercial pages.

Images should be:

* relevant to the page intent
* compressed
* correctly sized
* served in a modern format (WebP/AVIF) with responsive sizes
* descriptive
* uniquely named
* never blocking render (lazy-load below-the-fold only; the hero image loads eagerly)

## Filename logic

Filename describes the actual subject and context, in lowercase, hyphen-separated, no accents (ASCII slug), before upload — never after.

Pattern:

`[sujet]-[contexte]-[lieu-ou-service].webp`

Examples:

* `camion-demenagement-nimes.webp`
* `equipe-mise-en-carton-montpellier.webp`
* `protection-mobilier-fragile.webp`

Never:

* `IMG_2291.webp`
* `image1.webp`
* accented or space-separated names

Include the page's location/service in the filename where the image genuinely shows it — this is a real ranking signal for image + local search. Do not force the keyword into a filename for an image that doesn't show it.

## Alt text logic

Alt text describes what is **genuinely visible in the image**, as a natural French phrase — it is an accessibility attribute first and an SEO signal second. Those two goals align: an honest, specific description is also the best SEO alt.

Rules:

* Describe the real subject and, where accurate, the location or action.
* Keep it to a natural phrase (~8–12 words); no sentence-length descriptions.
* Include the keyword/location **only when the image actually shows it** — otherwise describe honestly without it.
* One image per commercial page may carry the primary keyword in alt (see *Keyword Coverage Threshold* §7) — but only if it fits what's shown.
* Never keyword-stuff. `déménageur Nîmes déménagement Nîmes camion Nîmes` is a violation.
* Decorative-only images (borders, icons) take empty `alt=""` so screen readers skip them.

Good:

* `Équipe AC Coursing chargeant du mobilier à Nîmes`
* `Cartons étiquetés prêts pour un déménagement longue distance`

Bad:

* `déménageur nîmes pas cher devis déménagement` (stuffed, not descriptive)
* `camion` (too vague)

## Evidence rule

Stock imagery may be used decoratively when necessary but must never be presented as evidence of an AC Coursing intervention. Any image implying a real job must be a real AC Coursing photograph. This overrides all SEO considerations — a keyword-perfect stock photo passed off as client work is a hard violation.

---

# Reviews

Reviews are trust evidence, not filler.

Use only real reviews from approved sources.

Preserve the original meaning.

Do not create synthetic location-specific testimonials merely to differentiate city pages.

If no review genuinely relates to a city or service, use other real evidence instead.

---

# Gallery

`/galerie/` is an evidence asset.

Its purpose is to demonstrate genuine work across:

* residential moving
* professional moving
* packing
* long-distance transport
* storage where applicable

Gallery imagery should be reusable as supporting evidence on relevant SEO pages when the underlying job actually matches the context.

---

# Structured Data

Use schema only when the corresponding information is visible and truthful.

## Homepage

Use:

`MovingCompany`

Include verified business information such as:

* name
* address
* telephone
* URL
* area served
* opening information where maintained
* sameAs where verified

## Service pages

Use:

`Service`

where applicable.

## Site hierarchy

Use:

`BreadcrumbList`

on nested landing pages.

## FAQs

Use FAQ structured data only for questions and answers visible on the page.

## Reviews

Review/aggregate rating data must correspond to genuine reviews and the current verified rating data.

Never invent structured-data values solely to obtain a rich result.

---

# Technical SEO

Every intended SEO landing page must have:

* unique `<title>`
* unique meta description
* unique H1
* canonical URL
* crawlable SSR content
* indexable status
* relevant internal links
* Open Graph metadata
* valid structured data where applicable
* inclusion in the XML sitemap

Important pages must return normal `200` responses.

Permanent URL replacements must use server-side `301` redirects.

Do not depend on JavaScript redirects for SEO migrations.

---

# Non-Indexable Utility Pages

Pages such as:

* quote success pages
* contact success pages
* internal confirmation pages

must not compete in organic search.

Use appropriate:

`noindex`

and exclude them from the SEO sitemap where appropriate.

---

# Legacy URL Migration

The current website contains a legacy information architecture.

When the SEO architecture is implemented, preserve existing signals with deliberate redirects.

Target migrations include:

`/services/`
→ `/prestations/`

`/devis/`
→ `/devis-demenagement/`

`/reviews/`
→ `/avis-clients/`

The existing local-moving URL must not become a duplicate Montpellier landing page.

Where:

`/services/demenagement-local/`

substantially targets generic Montpellier moving intent, consolidate its authority into the homepage or another genuinely distinct replacement.

Existing service URLs should either:

* map to a new equivalent SEO page
* remain only when they serve a useful distinct intent
* or be retired correctly

Do not bulk-redirect unrelated removed URLs to the homepage.

---

# Legacy Blog Cleanup

Generic template content unrelated to moving must not remain indexable.

Examples of unrelated legacy topics include contractor, plumbing or landscaping template articles.

If an old URL has no legitimate equivalent:

* remove it from internal links
* remove it from the sitemap
* return an appropriate removal status such as `410`, or otherwise retire it correctly

Do not redirect unrelated articles to commercial moving pages merely to preserve URL count.

---

# Montpellier Guide Cannibalization

Any informational page about moving in Montpellier must have a clearly informational intent.

A page such as:

`/conseils/demenagement-montpellier/`

must not become a second commercial `déménageur Montpellier` page.

Either:

1. make it a genuinely informational guide with informational title/H1/content and contextual links to the homepage/devis page, or
2. consolidate it if it does not provide unique value.

---

# Current Copy Cleanup

Never preserve legacy wording merely because it already exists.

Copy must use natural French moving terminology.

Incorrect or machine-translated labels must be corrected rather than propagated into new pages.

---

# Brand

The existing implementation is the incumbent visual authority. See `DESIGN.md` for the full token system (colors, radius, shadows, components); this section is a pointer, not a duplicate source of truth.

## Canvas

`#FAFAF9` (warm stone, not pure white)

## Primary / Accent

`#3BA6F1` — the single chromatic accent. A desaturated variant (`#8DCEF5`) is used instead on dark/Soot surfaces; the saturated value reads aggressive there.

## Typography

Display:

`Inter Tight`, weight 400 only — headlines never bump to 600/700.

Body:

`Inter`

Do not redesign the visual identity as part of an SEO-page implementation unless explicitly requested.

Do not redesign the visual identity as part of an SEO-page implementation unless explicitly requested.

---

# Voice

All customer-facing copy is French.

Tone:

* direct
* calm
* reassuring
* concrete
* professional

Prefer:

`Cadrage précis. Devis fixe. Planning clair.`

over:

`Nous sommes les meilleurs experts du déménagement pour une expérience exceptionnelle.`

Avoid generic hype.

Avoid unnecessary marketing superlatives.

Explain what happens, what is included and what the customer should expect.

---

# Conversion Rules

The default commercial CTA should send the user toward the quote funnel.

Preferred CTA concepts:

* Demander mon devis
* Estimer mon déménagement
* Obtenir mon devis gratuit
* Estimer le coût

Phone is a strong secondary conversion path.

Do not make a generic contact form the primary CTA on BOFU pages.

---

# SEO Publishing Strategy

Publishing order prioritizes commercial value rather than page count.

Initial sequence:

1. homepage — `déménageur Montpellier`
2. devis page
3. highest-value service pages
4. validated city pages
5. validated route pages
6. supporting resources

Different page types should be interleaved during rollout.

Do not publish clusters of near-identical city pages solely to meet a weekly quota.

---

# Measurement

SEO performance must be measured per URL.

Track at minimum:

* impressions
* clicks
* average position
* CTR
* quote CTA interactions
* completed quote requests
* phone-click conversions
* contact submissions

Use:

* Google Search Console
* SE Ranking
* first-party conversion analytics where configured

---

# Iteration

Review commercial pages regularly after indexing.

A page should not remain indefinitely merely because it exists.

If a landing page receives effectively no search visibility after an appropriate observation period, investigate:

* wrong intent
* weak keyword demand
* cannibalization
* insufficient uniqueness
* weak internal linking
* indexing issues
* poor content quality

Possible outcomes:

* improve
* merge
* redirect
* remove

Do not accumulate dead SEO pages.

---

# Definition of Done — SEO Landing Page

A commercial landing page is not ready merely because it renders.

Before publication it must have:

* one explicit primary search intent
* one owning URL
* intent-matched title
* intent-matched H1
* unique meta description
* useful above-the-fold content
* primary quote CTA
* real business relevance
* unique non-template information
* appropriate real evidence
* relevant internal links
* appropriate schema
* optimized image metadata
* canonical
* correct indexability
* mobile usability
* working form/CTA tracking

City and route pages additionally require real location/route differentiation.

---

# Hard SEO Constraints

Never:

* create `/demenageur-montpellier/`
* make `/prestations/` compete with the homepage
* create Hérault/Gard/Occitanie pages purely for keyword coverage
* create suburb pages without validated demand
* create T2/T3/T4 pages automatically
* create city pages by keyword substitution
* invent local reviews
* invent route prices
* invent certifications
* present stock photography as client work
* publish unrelated generic blog content
* use page count as the success metric
* sacrifice conversion UX for keyword density

---

# Product Principle

Every important SEO page should answer one question:

**“Why is AC Coursing the appropriate next step for this specific moving need?”**

Then make requesting the quote as easy as possible.

SEO brings the right user to the correct page.

Trust reduces uncertainty.

The quote funnel converts the visit.