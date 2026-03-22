import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/getPayload'
import { buildMetadata } from '@/lib/seo'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()

  const [page, settings] = await Promise.all([
    payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const doc = page?.docs?.[0] as any
  return buildMetadata({
    title: doc?.seo?.title ?? null,
    description: doc?.seo?.description ?? settings?.defaultSeo?.description ?? null,
    ogImage: doc?.seo?.ogImage?.url ?? (settings?.defaultSeo?.ogImage as any)?.url ?? null,
    siteName: settings?.siteName ?? 'Website',
    noIndex: doc?.seo?.noIndex ?? false,
  })
}

export default async function HomePage() {
  const payload = await getPayload()

  const [pageResult, settings] = await Promise.all([
    payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 2 }),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
  ])

  const page = pageResult.docs?.[0] as any
  if (!page) return notFound()

  return (
    <BlockRenderer
      blocks={page.layout ?? []}
      contactDetails={(settings?.contact as any) ?? null}
    />
  )
}
