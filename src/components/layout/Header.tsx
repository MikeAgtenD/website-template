import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { MobileNav } from './MobileNav'
import type { NavItem } from '@/types'

interface HeaderProps {
  siteName: string | null
  logoUrl?: string | null
  logoAlt?: string | null
  navItems: NavItem[]
  cta?: { label?: string | null; url?: string | null } | null
}

export function Header({ siteName, logoUrl, logoAlt, navItems, cta }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-100 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="Naar de homepage">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt ?? siteName ?? 'Logo'}
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            ) : (
              <span className="text-xl font-extrabold text-brand-primary">
                {siteName ?? 'Website'}
              </span>
            )}
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Hoofdnavigatie" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.url} className="relative group">
                <Link
                  href={item.url}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-brand-primary rounded-sm transition-colors"
                >
                  {item.label}
                  {item.children && item.children.length > 0 && (
                    <svg className="w-3 h-3 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && item.children.length > 0 && (
                  <ul className="absolute top-full left-0 mt-1 w-52 bg-white rounded-card shadow-elevated border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1.5">
                    {item.children.map((child) => (
                      <li key={child.url}>
                        <Link
                          href={child.url}
                          className="block px-4 py-2.5 text-sm text-neutral-700 hover:text-brand-primary hover:bg-brand-light transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {cta?.label && cta.url && (
              <Button href={cta.url} variant="primary" size="sm" className="ml-4">
                {cta.label}
              </Button>
            )}
          </nav>

          {/* Mobile nav */}
          <MobileNav items={navItems} cta={cta} />
        </div>
      </div>
    </header>
  )
}
