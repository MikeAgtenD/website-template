import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { buildMetadata } from '@/lib/seo'
import { PageBanner } from '@/components/sections/PageBanner'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTABanner } from '@/components/sections/CTABanner'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  return buildMetadata({
    title: 'Diensten',
    description: 'Bekijk ons volledige dienstenaanbod.',
    siteName: settings?.siteName ?? 'Website',
  })
}

export default async function DienstenPage() {
  const payload = await getPayload()

  const { docs: services } = await payload.find({
    collection: 'services',
    limit: 24,
    depth: 1,
  })

  const mapped = (services as any[]).map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    shortDescription: s.shortDescription,
    image: s.image?.url ? { url: s.image.url, alt: s.image.alt ?? '' } : null,
  }))

  return (
    <>
      <PageBanner
        title="Onze Diensten"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Diensten' }]}
      />
      <ServicesGrid services={mapped} columns="3" />
      <CTABanner
        title="Klaar om samen te werken?"
        subtitle="Neem contact op voor een vrijblijvende offerte."
        primaryCTA={{ label: 'Contacteer ons', url: '/contact' }}
        variant="brand"
      />
    </>
  )
}
