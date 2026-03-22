'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import type { NavItem } from '@/types'

interface MobileNavProps {
  items: NavItem[]
  cta?: { label?: string | null; url?: string | null } | null
}

export function MobileNav({ items, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  // Close menu on route change / resize
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden p-2 rounded-sm text-neutral-600 hover:text-brand-primary hover:bg-neutral-100 transition-colors"
        aria-expanded={open}
        aria-label={open ? 'Sluit menu' : 'Open menu'}
      >
        <span className="sr-only">{open ? 'Sluit menu' : 'Open menu'}</span>
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        aria-label="Mobiele navigatie"
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 lg:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <p className="font-bold text-neutral-900">Menu</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-1.5 rounded text-neutral-500 hover:text-brand-primary"
            aria-label="Sluit menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {items.map((item) => (
            <li key={item.url}>
              <Link
                href={item.url}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 rounded-sm text-neutral-700 font-medium hover:text-brand-primary hover:bg-brand-light transition-colors"
              >
                {item.label}
              </Link>
              {item.children && item.children.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1 border-l-2 border-brand-light pl-3">
                  {item.children.map((child) => (
                    <li key={child.url}>
                      <Link
                        href={child.url}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm text-neutral-600 hover:text-brand-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {cta?.label && cta.url && (
          <div className="px-6 py-5 border-t border-neutral-100">
            <Button href={cta.url} variant="primary" className="w-full justify-center">
              {cta.label}
            </Button>
          </div>
        )}
      </nav>
    </>
  )
}
