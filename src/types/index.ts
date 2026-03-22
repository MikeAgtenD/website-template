// ─── Shared frontend types ─────────────────────────────────────────────────────
// These complement the auto-generated Payload types (src/payload-types.ts).
// Run `npm run generate:types` after any schema change to regenerate payload-types.ts.

export interface NavItem {
  label: string
  url: string
  children?: { label: string; url: string }[]
}

export interface CTALink {
  label?: string | null
  url?: string | null
  newTab?: boolean | null
}

export interface MediaObject {
  id: string
  url: string
  alt: string
  width?: number | null
  height?: number | null
  thumbnailURL?: string | null
}

export interface ContactDetails {
  phone?: string | null
  email?: string | null
  address?: string | null
  openingHours?: string | null
}

export interface SocialLinks {
  facebook?: string | null
  instagram?: string | null
  linkedin?: string | null
  youtube?: string | null
}

// ─── Contact form ──────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  // honeypot — must be empty on submission
  website?: string
}

export interface ContactFormResponse {
  success: boolean
  message: string
}

// ─── Block types ───────────────────────────────────────────────────────────────

export type BlockType =
  | 'hero'
  | 'services-grid'
  | 'image-text'
  | 'cta-banner'
  | 'process'
  | 'testimonials'
  | 'faq'
  | 'stats'
  | 'rich-text'
  | 'contact-section'

export interface BaseBlock {
  id?: string | null
  blockType: BlockType
}
