import Link from 'next/link'
import Image from 'next/image'

interface FooterProps {
  siteName: string | null
  logoUrl?: string | null
  logoAlt?: string | null
  tagline?: string | null
  footerIntro?: string | null
  contact?: {
    phone?: string | null
    email?: string | null
    address?: string | null
  } | null
  navItems?: { label: string; url: string }[]
  legalItems?: { label: string; url: string }[]
  social?: {
    facebook?: string | null
    instagram?: string | null
    linkedin?: string | null
  } | null
}

export function Footer({
  siteName,
  logoUrl,
  logoAlt,
  tagline,
  footerIntro,
  contact,
  navItems = [],
  legalItems = [],
  social,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Brand accent line */}
      <div className="h-1 bg-brand-primary" />

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Column 1: Logo + intro */}
          <div>
            <Link href="/" aria-label="Naar de homepage">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt ?? siteName ?? 'Logo'}
                  width={130}
                  height={40}
                  className="h-9 w-auto object-contain brightness-0 invert mb-4"
                />
              ) : (
                <span className="text-xl font-extrabold text-white block mb-4">
                  {siteName ?? 'Website'}
                </span>
              )}
            </Link>
            {(tagline || footerIntro) && (
              <p className="text-neutral-400 text-sm leading-relaxed">
                {footerIntro ?? tagline}
              </p>
            )}

            {/* Social links */}
            {social && (
              <div className="flex gap-3 mt-5">
                {social.facebook && (
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-neutral-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                )}
                {social.instagram && (
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-neutral-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  </a>
                )}
                {social.linkedin && (
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-neutral-500 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Column 2: Navigation */}
          {navItems.length > 0 && (
            <nav aria-label="Footer navigatie">
              <p className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                Navigatie
              </p>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className="text-neutral-400 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Column 3: Contact details */}
          {contact && (
            <div>
              <p className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                Contact
              </p>
              <address className="not-italic space-y-3 text-sm">
                {contact.address && (
                  <p className="text-neutral-400 leading-relaxed whitespace-pre-line">
                    {contact.address}
                  </p>
                )}
                {contact.phone && (
                  <p>
                    <a href={`tel:${contact.phone}`} className="text-neutral-400 hover:text-white transition-colors">
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.email && (
                  <p>
                    <a href={`mailto:${contact.email}`} className="text-neutral-400 hover:text-white transition-colors break-all">
                      {contact.email}
                    </a>
                  </p>
                )}
              </address>
            </div>
          )}
        </div>
      </div>

      {/* Subfooter */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {currentYear} {siteName ?? 'Website'}. Alle rechten voorbehouden.</p>
          <nav aria-label="Juridische links">
            <ul className="flex flex-wrap gap-4">
              {legalItems.map((item) => (
                <li key={item.url}>
                  <Link href={item.url} className="hover:text-neutral-300 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
