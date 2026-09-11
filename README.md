# Small Business Starter

A fast, mobile-first website template for trade and service businesses — handymen, electricians, plumbers, landscapers, and more. Built with [Astro 6](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com). Ready for Node-based deployment, now with Astro SSR support for server-side form handling.

---

## What's included

- Full homepage with Hero, Trust Bar, Services, About, Reviews, Gallery, and CTA sections
- Inner pages: About, Services, Contact, Reviews, Blog
- SEO-ready: `<title>`, meta descriptions, canonical URLs, Open Graph, JSON-LD structured data, sitemap, robots.txt
- Mobile-first responsive layout with a hamburger drawer nav and sticky desktop header
- Astro View Transitions for smooth page navigation
- Google Fonts (Oswald + Inter) optimized via Astro's built-in font API
- Tailwind v4 design token system — swap the entire brand with two file edits

---

## Quick start

```bash
# 1. Install dependencies (uses pnpm)
pnpm install

# 2. Start the dev server
pnpm run dev
# → http://localhost:4321

# If Linux watcher limits are exhausted in your environment
pnpm run dev:poll

# 3. Build for production
pnpm run build

# 4. Preview the production build locally
pnpm run preview
```

> **Note:** This project uses `pnpm`. Do not use `npm install` or `yarn` — they will create a conflicting lockfile.

### SMTP environment variables

Copy `.env.example` to `.env` and fill in your SMTP provider details before testing the forms:

```bash
cp .env.example .env
```

Required variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_RECIPIENT_EMAIL`

---

## Customising for a client — start here

All placeholder content lives in exactly **two files**. You do not need to touch any component or page files to swap out a client's information.

### Step 1 — Business data: `src/data/client.ts`

Open this file and replace every placeholder value with the real business information.

```ts
export const client = {
  name: 'Your Business Name',         // Used in the header, footer, and SEO
  email: 'hello@yourbusiness.com',
  phoneForTel: '303-555-0100',        // Format: digits and hyphens only (used in tel: links)
  phoneFormatted: '(303) 555-0100',   // Format: however you want it displayed
  license: 'Lic# 123456',            // Contractor license number — leave empty '' to hide
  address: {
    lineOne: '123 Main Street',
    lineTwo: 'Suite 100',             // Leave empty '' if no suite/unit
    city: 'Denver',
    state: 'CO',
    zip: '80206',
    country: 'US',
    mapLink: 'https://maps.app.goo.gl/your-link', // Google Maps link to the business
  },
  socials: {
    facebook:  'https://facebook.com/yourbusiness',   // Leave empty '' to hide the icon
    instagram: 'https://instagram.com/yourbusiness',  // Leave empty '' to hide the icon
    google:    'https://g.page/yourbusiness',          // Google Business Profile link
  },
  domain: 'https://www.yourdomain.com',
};
```

This data flows automatically into the header, footer, contact page, and all SEO tags. You never need to search-and-replace a phone number across multiple files.

---

### Step 2 — Visual identity: `src/styles/theme.css` + `astro.config.mjs`

Colors, spacing, radius and shadows are Tailwind v4 design tokens defined once in `src/styles/theme.css`'s `:root` block (`--background`, `--primary`, `--border`, etc.) and consumed everywhere through Tailwind utility classes (`bg-background`, `text-primary`, `border-border`, ...). There is no separate color config to keep in sync — edit the hex values there and every component picks it up.

```css
:root {
  --background: #F7F7F5;
  --primary:    #2563EB;
  --primary-foreground: #FFFFFF;
  --border:     #E3E5E8;
  /* ...see the file for the full token list */
}
```

Fonts are set in two places that must match:

1. `astro.config.mjs` — the `fonts:` array's `name` field (Google Font name, loaded via Astro's font API).
2. `src/styles/theme.css` — the `--font-heading` / `--font-body` fallback stacks, near the bottom of the `@theme inline { }` block.

`src/config/brand.ts` only holds identity text (`name`, `tagline`, `description`, `url`, `locale`) used in metadata and copy — it is not a source of visual tokens.

---

## Project structure

```
small-business-starter/
├── public/                     # Static files served as-is (favicon, og-image.png)
├── src/
│   ├── components/             # Reusable UI sections
│   │   ├── Header.astro        # Sticky nav with mobile hamburger drawer
│   │   ├── Footer.astro        # Dark footer with columns and social links
│   │   ├── Hero.astro          # Homepage hero with dual CTA
│   │   ├── TrustBar.astro      # Trust signals strip (years, reviews, guarantee)
│   │   ├── Services.astro      # Services grid
│   │   ├── About.astro         # About section with benefits list
│   │   ├── Reviews.astro       # Customer testimonials grid
│   │   ├── Gallery.astro       # Project photo grid with skeleton loading
│   │   ├── CTA.astro           # Full-bleed call-to-action section
│   │   └── Banner.astro        # Inner-page hero with auto breadcrumbs
│   ├── config/
│   │   └── brand.ts            # ✏️  Identity text (name, tagline, description)
│   ├── content/
│   │   └── blog/               # ✏️  Markdown blog posts (.md files)
│   ├── data/
│   │   └── client.ts           # ✏️  Business info (phone, address, socials)
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Master HTML shell (SEO, fonts, skip link)
│   │   └── PostLayout.astro    # Blog post layout
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── reviews.astro
│   │   ├── contact/
│   │   │   ├── index.astro     # Contact form page
│   │   │   └── success.astro   # Confirmation page after form submit
│   │   └── blog/
│   │       ├── index.astro     # Blog listing
│   │       └── [...slug].astro # Individual post pages (auto-generated)
│   └── styles/
│       ├── global.css          # Base styles, dark mode, reduced motion
│       └── theme.css           # Tailwind v4 @theme design tokens
├── astro.config.mjs            # Astro config (fonts, integrations, site URL)
├── netlify.toml                # Legacy hosting config (optional)
└── package.json
```

Files marked ✏️ are the ones you will edit most often.

---

## Replacing placeholder images

The theme ships with placeholder photos from Unsplash so it looks great immediately. To replace them with a client's real photos, edit **one file**: `src/config/images.ts`.

### Folder structure

```
src/assets/images/
  hero/        ← one image for the homepage Hero section
  about/       ← one image for the About section
  gallery/     ← all project photos (add as many as you like)
```

Images in `src/assets/` are processed by Astro at build time — they are automatically converted to modern formats (WebP/AVIF), resized, and given proper `srcset` attributes. This is significantly better than using external URLs.

### Hero and About images

1. Drop your image file into the matching folder (`hero/` or `about/`)
2. Open `src/config/images.ts` and find the section for that image
3. Uncomment the `import` line and update the filename:

```ts
// Before (placeholder is used):
// import heroImage from '../assets/images/hero/hero.jpg';
export const heroImage: ImageMetadata | undefined = undefined;

// After (your local image is used):
import heroImage from '../assets/images/hero/hero.jpg';
export const heroImage = heroImage;
```

### Gallery images — drop and done

The gallery uses automatic file discovery. You do not need to edit any code:

1. Delete the placeholder `.gitkeep` file from `src/assets/images/gallery/`
2. Drop your project photos into `src/assets/images/gallery/`
3. Run `pnpm run build` — your images appear automatically

**The filename becomes the caption.** Name your files descriptively:

```
kitchen-remodel.jpg       → "Kitchen Remodel"
deck-installation.jpg     → "Deck Installation"
bathroom-tile-work.jpg    → "Bathroom Tile Work"
```

Recommended image specs:

| Section | Min size | Aspect ratio |
|---|---|---|
| Hero | 1600 × 1200 px | 4:3 landscape |
| About | 900 × 700 px | 4:3 landscape |
| Gallery | 800 × 600 px each | 4:3 landscape |

Supported formats: `.jpg` `.jpeg` `.png` `.webp` `.avif`

---

## Writing blog posts

Blog posts live in `src/content/blog/` as Markdown files. Create a new `.md` file and add the required frontmatter at the top:

```md
---
title: "5 Signs You Need a New Roof"
description: "A short summary shown on the blog listing and in search results."
author: "Jane Smith"
date: 2026-04-01
tags: ["roofing", "maintenance"]
draft: false
---

Your post content goes here. Standard Markdown is supported.
```

The filename becomes the URL slug. Keep it lowercase with hyphens:
- `how-to-prepare-for-a-plumbing-inspection.md` → `/blog/how-to-prepare-for-a-plumbing-inspection`

Set `draft: true` to write a post without publishing it.

---

## Deploying to Node Hosting

1. Push the project to your Git provider
2. Build the app with `pnpm run build`
3. Run the generated server entry from `dist/server/entry.mjs` on your Node host
4. Set your live domain in three places after deploying:
   - `src/data/client.ts` → `domain`
   - `src/config/brand.ts` → `url`
   - `astro.config.mjs` → `site`

Make sure your hosting platform provides the SMTP environment variables from `.env.example`.

---

## Tech stack

| Tool | Version | Purpose |
|---|---|---|
| [Astro](https://astro.build) | 6 | Framework & static site generator |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first styling |
| Node host | — | SSR runtime |
| [pnpm](https://pnpm.io) | 9+ | Package manager |

---

## Commands reference

| Command | What it does |
|---|---|
| `pnpm install` | Install all dependencies |
| `pnpm run dev` | Start dev server at `localhost:4321` |
| `pnpm run build` | Build the production site to `./dist/` |
| `pnpm run preview` | Preview the production build locally |
| `pnpm run astro check` | Type-check all `.astro` files |
