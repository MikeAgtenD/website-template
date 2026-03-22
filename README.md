# DH Website Starter

**Digital Horizon — Reusable small-business website starter**

Built with Next.js 15, Tailwind CSS v4, and PayloadCMS v3.
Designed for rapidly cloning and customizing into client websites.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| CMS | PayloadCMS v3 |
| Database | SQLite (dev) → swap for Postgres/MongoDB in production |
| Language | TypeScript |
| Forms | Custom form + Nodemailer SMTP |

---

## Setup

### 1. Clone and install

```bash
git clone <this-repo> my-client-site
cd my-client-site
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values. Minimum required:

```
PAYLOAD_SECRET=a-strong-random-secret
DATABASE_URI=file:./payload.db
MAIL_TO=your-email@gmail.com
```

### 3. Generate Payload types

Run this once after setup, and again after any schema change:

```bash
npm run generate:types
npm run generate:importmap
```

### 4. Seed demo content

```bash
npm run seed
```

Creates a demo admin user, services, testimonials, homepage, and about page.
Admin login: `admin@example.com` / `Admin1234!`

### 5. Start development server

```bash
npm run dev
```

- Website: http://localhost:3000
- Admin panel: http://localhost:3000/admin

---

## Creating a new client site from this starter

1. `git clone` this repo into a new folder
2. Update `package.json` → `name` field
3. Update brand tokens in `src/styles/globals.css` → `@theme` block
4. Run seed, then log into the admin panel and update:
   - **Site Settings** → name, logo, contact details, SEO defaults
   - **Navigation** → menu items, CTA button
   - **Footer** → intro text, links
5. Create/edit **Pages**, **Services**, and **Testimonials** in the admin
6. Update `MAIL_TO` in `.env` to the client's email address

---

## Where to change branding

### Colours (most important)

Edit `src/styles/globals.css` inside the `@theme { }` block:

```css
@theme {
  --color-brand-primary: #1d4ed8;    /* Main brand colour */
  --color-brand-secondary: #1e3a8a;  /* Darker variant (hover states) */
  --color-brand-accent: #f59e0b;     /* Accent / highlight colour */
  --color-brand-light: #eff6ff;      /* Light tint for backgrounds */
  --color-brand-dark: #0f172a;       /* Dark backgrounds (hero, footer) */
}
```

### Typography

Change the font family in the same `@theme` block:

```css
--font-sans: 'Your Font', system-ui, sans-serif;
```

Add the font import to `src/app/layout.tsx` (Google Fonts or self-hosted).

### Logo

Upload the logo image in the Payload admin panel:
1. Go to **Media** → upload the logo file
2. Go to **Site Settings** → select the uploaded logo

---

## Folder structure

```
src/
├── app/
│   ├── (frontend)/          # Public website routes
│   │   ├── layout.tsx       # Fetches Header/Footer data from Payload
│   │   ├── page.tsx         # Homepage (renders 'home' page from Payload)
│   │   ├── diensten/        # Services overview + detail pages
│   │   ├── over-ons/        # About page
│   │   ├── contact/         # Contact page
│   │   └── privacy/         # Privacy policy page
│   ├── (payload)/           # Payload admin UI + REST API (auto-handled)
│   └── api/contact/         # Contact form email API route
├── blocks/                  # Payload block definitions (page builder)
├── collections/             # Payload collections (Pages, Services, etc.)
├── components/
│   ├── blocks/              # BlockRenderer — maps block types to components
│   ├── forms/               # ContactForm
│   ├── layout/              # Header, Footer, MobileNav
│   ├── sections/            # Reusable page sections (Hero, CTABanner, etc.)
│   └── ui/                  # Primitive UI components (Button, Card, etc.)
├── fields/                  # Reusable Payload field definitions
├── globals/                 # Payload globals (SiteSettings, Navigation, Footer)
├── lib/                     # getPayload, seo helpers, utils
├── seed/                    # Demo seed data script
├── styles/                  # globals.css with Tailwind @theme tokens
└── types/                   # Shared TypeScript types
```

---

## CMS structure

### Collections

| Collection | Purpose |
|------------|---------|
| `pages` | Flexible pages built with blocks (homepage, about, custom pages) |
| `services` | Service pages with their own block-based layout |
| `testimonials` | Client testimonials displayed in the Testimonials block |
| `media` | Image uploads (used throughout) |
| `users` | CMS admin users |

### Globals

| Global | Purpose |
|--------|---------|
| `site-settings` | Site name, logo, contact details, social links, default SEO |
| `navigation` | Main nav items + header CTA button |
| `footer-settings` | Footer intro, nav links, legal links |

### Available page blocks

| Block | Component |
|-------|-----------|
| `hero` | Full-width hero with background image, title, CTAs |
| `services-grid` | Grid of service cards (2/3/4 columns) |
| `image-text` | Image + text split section (image left or right) |
| `cta-banner` | Full-width CTA banner (brand / dark / light) |
| `process` | Numbered steps / process section |
| `testimonials` | Testimonial cards grid |
| `faq` | Accordion FAQ |
| `stats` | Key numbers / trust indicators row |
| `rich-text` | Free-form rich text content |
| `contact-section` | Contact form with optional contact details |

---

## Adding a new page section

1. Create the block definition in `src/blocks/MyBlock.ts`
2. Add the block to the relevant collection in `src/collections/Pages.ts` or `src/collections/Services.ts`
3. Create the React component in `src/components/sections/MySection.tsx`
4. Register it in `src/components/blocks/BlockRenderer.tsx` (add a new `case`)
5. Run `npm run generate:types` to update TypeScript types

---

## Switching to Postgres (production)

1. `npm install @payloadcms/db-postgres`
2. In `payload.config.ts`, replace the SQLite adapter:
   ```ts
   import { postgresAdapter } from '@payloadcms/db-postgres'
   // ...
   db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
   ```
3. Update `DATABASE_URI` in `.env` to your Postgres connection string

---

## Contact form

- All submissions go to `MAIL_TO` in `.env` (default: `digitalhorizonservice@gmail.com`)
- Server-side validation + honeypot spam protection included
- Uses Nodemailer with SMTP — configure via `.env` variables
- Before going live, update `MAIL_TO`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` to client credentials

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run seed` | Seed database with demo content |
| `npm run generate:types` | Regenerate Payload TypeScript types |
| `npm run generate:importmap` | Regenerate Payload import map |
