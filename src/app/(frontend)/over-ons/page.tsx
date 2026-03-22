import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/getPayload'
import { buildMetadata } from '@/lib/seo'
import { PageBanner } from '@/components/sections/PageBanner'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { CTABanner } from '@/components/sections/CTABanner'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  return buildMetadata({
    title: 'Over ons',
    description: 'Leer ons bedrijf kennen.',
    siteName: settings?.siteName ?? 'Website',
  })
}

export default async function OverOnsPage() {
  const payload = await getPayload()

  const [pageResult, settings] = await Promise.all([
    payload.find({ collection: 'pages', where: { slug: { equals: 'over-ons' } }, limit: 1, depth: 2 }),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const page = pageResult.docs?.[0] as any
  if (!page) return notFound()

  return (
    <>
      <PageBanner
        title={page.title}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: page.title }]}
      />
      <BlockRenderer
        blocks={page.layout ?? []}
        contactDetails={(settings?.contact as any) ?? null}
      />
      <CTABanner
        title="Benieuwd wat we voor u kunnen doen?"
        primaryCTA={{ label: 'Neem contact op', url: '/contact' }}
        variant="dark"
      />
    </>
  )
}
