# Content, CMS, Forms & SEO Rules

## Content writing rules

- Rewrite and improve weak or outdated source copy
- Use a clear, accessible, conversion-focused tone appropriate for Belgian/European small businesses
- Concise headings — one idea per heading
- Prioritize clarity over filler/fluff
- Preserve all factual business details (address, phone, services, certifications)
- Keep CTAs practical and specific ("Request a free quote", "Call us today", not "Learn more")
- Make contact information and trust signals easy to find on every page
- Use Belgian Dutch or French copy conventions when the source site uses those languages; default to English only if the source uses English

---

## PayloadCMS rules

Every project uses **PayloadCMS** as the CMS. The website must remain manageable by non-technical users after handoff.

### Collections vs Globals

| Type | Use for | Examples |
|------|---------|---------|
| **Collection** | Repeatable content items | Services, Testimonials, Pages, Media, Team members |
| **Global** | Site-wide singletons | Site settings, Contact details, Navigation, Footer |

### Standard collections to implement per project

Always create these collections if not already present in the starter:

- **Pages** — flexible page builder using Payload `blocks` field (Hero block, Services block, About block, CTA block, etc.)
- **Services** — title, slug, short description, full description, image, SEO fields
- **Testimonials** — author name, quote, optional company, optional rating, optional photo
- **Media** — Payload's built-in media collection; use for all uploaded images

### Standard globals to implement per project

Always create or extend these globals:

- **SiteSettings** — site name, logo, favicon, primary phone, primary email, address, opening hours
- **Navigation** — main nav items (label + link), optional CTA button
- **Footer** — tagline, secondary nav links, social links

### Field naming conventions

- Use camelCase for all field names
- Names must be self-explanatory to a non-developer viewing the Payload admin panel
- Add `label` and `description` properties to fields where the purpose isn't obvious
- Use `required: true` on all fields that must be filled before publishing

### Key field types to use

| Content need | Payload field type |
|-------------|-------------------|
| Short text | `text` |
| Long text / rich content | `richText` |
| Images | `upload` (relation to Media collection) |
| Multiple items in a list | `array` |
| Flexible page sections | `blocks` |
| Reference to another collection | `relationship` |
| True/false toggle | `checkbox` |
| SEO group | `group` with `title`, `description`, `ogImage` inside |

### SEO fields

Add an `seo` group field to every Page and every collection that has a public-facing detail page:

```ts
{
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
  ],
}
```

### Access control

- Public read access on all collections and globals that feed the front end
- Authenticated write access (admin only) on all collections and globals
- Use Payload's built-in `authenticated` access function

### Data fetching in Next.js

Prefer the **Payload Local API** when the Next.js app and Payload share the same process (common in starter setups):

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const services = await payload.find({ collection: 'services' })
```

Fall back to REST API fetch only if the starter uses a separate Payload instance.

### Implementation rules

- Extend the starter's existing `payload.config.ts` — never start a new one
- Add new collections and globals in the same file/import style as existing ones
- Do not hardcode content that belongs in Payload into React component files
- Keep block and field definitions in a dedicated `src/payload/` or `payload/` folder matching the starter's structure
- Register every new collection and global in `payload.config.ts`

---

## Form rules

Every form on the site must:

| Requirement | Details |
|-------------|---------|
| Visible labels | Always show labels above or beside inputs — never label-only-as-placeholder |
| Placeholders | Fill in helpful example values |
| Required fields | Mark and enforce all logically required fields |
| Honeypot | Include a hidden honeypot field for spam protection |
| Dev email | Route all submissions to `digitalhorizonservice@gmail.com` during development |
| Success state | Show a clear confirmation message after successful submission |
| Error state | Show inline validation errors on submission failure |
| Accessibility | All inputs must be keyboard-navigable and have correct ARIA labels |

### Minimum contact form fields

- Name (required)
- Email (required)
- Phone (optional unless business requires it)
- Message (required)
- Honeypot (hidden, never shown to user)

Add project-specific fields (service selection, preferred date, etc.) when relevant to the business type.

---

## SEO rules

Implement for every page:

| Element | Requirement |
|---------|-------------|
| `<title>` | Unique per page, includes business name |
| Meta description | Unique per page, 120–160 characters |
| `h1` | Exactly one per page |
| Heading hierarchy | Logical `h1` → `h2` → `h3` structure, no skipping |
| Alt text | All `<img>` tags have descriptive alt attributes |
| Internal links | Key pages linked from homepage and relevant service pages |
| Semantic HTML | Use `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` correctly |
| Open Graph | `og:title`, `og:description`, `og:image` per page |
| Canonical URL | Set canonical tag on all pages |
| Sitemap | Include XML sitemap if the starter supports it |
| Robots | Ensure `robots.txt` is present and correct |

### Performance

- Use Next.js `<Image>` component for all images (automatic optimization)
- Lazy-load images below the fold
- Avoid large unoptimized SVGs inline in components
- Prefer web-safe or self-hosted fonts over large font bundles

---

## Privacy policy page

Every site must include a privacy policy page.

Requirements:
- Reachable via footer subfooter link
- Covers: data collected via forms, cookies, third-party services, contact details of responsible party
- If the starter includes a privacy page template, extend it
- If not, create a simple static page in the starter's style

---

## Accessibility baseline

- All interactive elements (links, buttons, inputs) must be reachable via keyboard
- Focus states must be visible
- Color contrast must meet WCAG AA minimum
- Images must have alt text
- Form inputs must have associated labels (not just placeholders)
- Avoid using color alone to convey meaning
