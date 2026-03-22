import type { Metadata } from 'next'

interface BuildMetadataOptions {
  title?: string | null
  description?: string | null
  ogImage?: string | null
  siteName?: string | null
  siteUrl?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  ogImage,
  siteName = 'Website',
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const resolvedSiteName = siteName ?? 'Website'
  const fullTitle = title ? `${title} | ${resolvedSiteName}` : resolvedSiteName

  return {
    title: fullTitle,
    description: description ?? undefined,
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: fullTitle,
      description: description ?? undefined,
      url: siteUrl,
      siteName: resolvedSiteName,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description ?? undefined,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
