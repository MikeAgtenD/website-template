import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getPayload } from '@/lib/getPayload'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  return buildMetadata({
    siteName: settings?.siteName ?? 'Website',
    description: settings?.defaultSeo?.description,
    ogImage: (settings?.defaultSeo?.ogImage as any)?.url,
  })
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload()

  const [settings, navigation, footerSettings] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    payload.findGlobal({ slug: 'navigation' }).catch(() => null),
    payload.findGlobal({ slug: 'footer-settings' }).catch(() => null),
  ])

  const logo = settings?.logo as any
  const navItems = (navigation?.items ?? []) as any[]
  const footerNavItems = (footerSettings?.navItems ?? []) as any[]
  const legalItems = (footerSettings?.legalItems ?? []) as any[]
  const social = settings?.social as any

  return (
    <>
      <Header
        siteName={settings?.siteName ?? null}
        logoUrl={logo?.url ?? null}
        logoAlt={logo?.alt ?? null}
        navItems={navItems}
        cta={navigation?.ctaButton as any}
      />
      <main id="main-content">{children}</main>
      <Footer
        siteName={settings?.siteName ?? null}
        logoUrl={logo?.url ?? null}
        logoAlt={logo?.alt ?? null}
        tagline={settings?.tagline ?? null}
        footerIntro={footerSettings?.intro ?? null}
        contact={settings?.contact as any}
        navItems={footerNavItems}
        legalItems={legalItems}
        social={social}
      />
    </>
  )
}
