---
name: generate-business-website
description: Autonomous website generation skill for Belgian small businesses. Clones a Next.js/Tailwind starter repo, scrapes and analyzes the client's existing website, creates a structured plan (sitemap, wireframes, branding, design system), then builds a complete production-ready marketing website. Use when a user provides a company name and/or website URL and asks to build or redesign their website, or references the Digital Horizon website generation process.
---

# Generate Business Website

Autonomous skill for building complete, branded small-business marketing websites following the Digital Horizon internal process.

## Starter repository

```
TODO: https://github.com/MikeAgtenD/website-template.git
```

> Always clone this repo first before doing anything else. Preserve its architecture throughout.

---

## Mandatory tech stack

- **Next.js** (use the starter's router setup — App Router or Pages Router, whichever the starter uses)
- **Tailwind CSS**
- **PayloadCMS** — the CMS for every project; already integrated into the starter
- Never replace PayloadCMS with another CMS unless the user explicitly requests it

---

## Workflow (always follow in order)

### Step 1 — Clone and inspect starter

```bash
git clone TODO:STARTER_URL <project-folder>
cd <project-folder>
```

Inspect and understand:
- App/router directory structure
- Reusable component library
- Layout system and shared wrappers
- PayloadCMS setup: `payload.config.ts`, existing collections, globals, and field definitions
- How Next.js fetches Payload data (Local API, REST, or GraphQL)
- Styling conventions (Tailwind config, tokens, fonts)
- SEO setup (metadata, `<Head>`, sitemap)
- Form handling pattern
- Shared utilities and hooks

Keep this architecture intact unless there is a strong reason to improve it.

---

### Step 2 — Scrape and analyze source website

When the user provides a **company name** and **website URL**:

1. Fetch the homepage and all discoverable pages (use WebFetch on each URL found in nav + footer)
2. For each page, capture:
   - Page title and purpose
   - Section-by-section headings and copy
   - Services offered with descriptions
   - Contact details (address, phone, email, opening hours)
   - Trust markers (reviews, certifications, years of experience)
   - Calls to action (text + placement)
   - Images described / alt text patterns
   - Footer links and legal pages
3. Identify:
   - Branding signals (logo shape, color palette, visual style)
   - UX weaknesses and conversion gaps
   - Missing but strategically useful pages

Do **not** blindly copy the old site. Reinterpret and improve it.

---

### Step 3 — Create a structured plan (required before any coding)

Present this plan to the user and confirm before implementing.

#### A. Sitemap proposal
List every page:
- Homepage
- Service overview page (if applicable)
- Service detail pages (one per service)
- About page (if strategically useful — see [design-rules.md](design-rules.md#about-page-rules))
- Contact page
- Privacy policy page
- Any additional strategic pages

#### B. Wireframe plan per page
Describe each page section-by-section (not code, just layout intent).

#### C. Content mapping
Map old content → improved content structure. Note rewrites needed.

#### D. Branding extraction
Analyze logo + existing colors. Define:
- Primary color (hex)
- Secondary color (hex)
- Accent color (hex)
- Neutral palette
- Branded decorative elements (lines, shapes, geometry from logo)
- Recurring visual motif to carry through the site

#### E. Design system intent
Describe how brand elements appear consistently in:
- Section backgrounds
- Title decorations / overlines
- Borders and dividers
- Icon wrappers
- Buttons
- Cards
- SVG section dividers
- Subtle overlays and patterns

> See [design-rules.md](design-rules.md) for detailed section design rules.

---

### Step 4 — Implement page by page

After plan confirmation:

1. Update Tailwind config with brand colors and fonts
2. Add or extend Payload collections and globals for new content types (see [content-cms-seo.md](content-cms-seo.md#payloadcms-rules))
3. Build shared components first (Header, Footer, reusable section blocks)
4. Implement pages in sitemap order, starting with Homepage
5. Keep component files organized and named consistently
6. Reuse starter components where they fit; create new ones in the same style when needed
7. Do **not** break the starter's architecture

---

### Step 5 — Polish and verify

- Check responsive layout at mobile / tablet / desktop
- Verify semantic heading structure (one `h1` per page)
- Confirm all forms include honeypot, visible labels, placeholders, success/error states
- Verify all dev-phase form submissions route to: `digitalhorizonservice@gmail.com`
- Check alt texts on all images
- Verify metadata (title, description) exists on every page
- Check internal links and CTA buttons work correctly
- Confirm privacy page exists and is linked in footer
- Confirm sitemap is included if starter supports it

---

## Quick reference

- Detailed section design rules → [design-rules.md](design-rules.md)
- Content, CMS, forms, SEO rules → [content-cms-seo.md](content-cms-seo.md)
