import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/getPayload'
import { buildMetadata } from '@/lib/seo'
import { PageBanner } from '@/components/sections/PageBanner'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { CTABanner } from '@/components/sections/CTABanner'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayload()
  const { docs } = await payload.find({ collection: 'services', limit: 100 })
  return (docs as any[]).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const [{ docs }, settings] = await Promise.all([
    payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 }),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const service = docs?.[0] as any
  if (!service) return {}

  return buildMetadata({
    title: service.seo?.title ?? service.title,
    description: service.seo?.description,
    ogImage: service.seo?.ogImage?.url,
    siteName: settings?.siteName ?? 'Website',
    noIndex: service.seo?.noIndex ?? false,
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const [{ docs }, settings] = await Promise.all([
    payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1, depth: 2 }),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const service = docs?.[0] as any
  if (!service) return notFound()

  const hasCTABannerInLayout = (service.layout ?? []).some((b: any) => b.blockType === 'cta-banner')

  return (
    <>
      <PageBanner
        title={service.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Diensten', href: '/diensten' },
          { label: service.title },
        ]}
      />

      <BlockRenderer
        blocks={service.layout ?? []}
        contactDetails={(settings?.contact as any) ?? null}
      />

      {/* Default CTA banner if the layout doesn't already include one */}
      {!hasCTABannerInLayout && (
        <CTABanner
          title="Interesse of vragen?"
          subtitle="Vraag vrijblijvend een offerte aan."
          primaryCTA={{ label: 'Contacteer ons', url: '/contact' }}
          variant="brand"
        />
      )}
    </>
  )
}
