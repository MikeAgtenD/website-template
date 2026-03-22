import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ImageText } from '@/components/sections/ImageText'
import { CTABanner } from '@/components/sections/CTABanner'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { Stats } from '@/components/sections/Stats'
import { RichTextContent } from '@/components/sections/RichTextContent'
import { ContactSection } from '@/components/sections/ContactSection'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = Record<string, any> & { blockType: string }

interface BlockRendererProps {
  blocks: Block[]
  contactDetails?: {
    phone?: string | null
    email?: string | null
    address?: string | null
    openingHours?: string | null
  } | null
}

export function BlockRenderer({ blocks, contactDetails }: BlockRendererProps) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `block-${index}`

        switch (block.blockType) {
          case 'hero':
            return (
              <Hero
                key={key}
                overline={block.overline}
                title={block.title}
                subtitle={block.subtitle}
                primaryCTA={block.primaryCTA}
                secondaryCTA={block.secondaryCTA}
                image={block.image?.url ? { url: block.image.url, alt: block.image.alt ?? '' } : null}
              />
            )

          case 'services-grid':
            return (
              <ServicesGrid
                key={key}
                overline={block.overline}
                title={block.title}
                subtitle={block.subtitle}
                columns={block.columns ?? '3'}
                services={(block.services ?? []).map((s: Block) => ({
                  id: s.id,
                  title: s.title,
                  slug: s.slug,
                  shortDescription: s.shortDescription,
                  image: s.image?.url ? { url: s.image.url, alt: s.image.alt ?? '' } : null,
                }))}
              />
            )

          case 'image-text':
            return (
              <ImageText
                key={key}
                image={{ url: block.image?.url ?? '', alt: block.image?.alt ?? '' }}
                imagePosition={block.imagePosition ?? 'left'}
                overline={block.overline}
                title={block.title}
                content={block.content}
                cta={block.cta}
              />
            )

          case 'cta-banner':
            return (
              <CTABanner
                key={key}
                title={block.title}
                subtitle={block.subtitle}
                primaryCTA={block.primaryCTA}
                secondaryCTA={block.secondaryCTA}
                variant={block.variant ?? 'brand'}
              />
            )

          case 'process':
            return (
              <ProcessSteps
                key={key}
                overline={block.overline}
                title={block.title}
                subtitle={block.subtitle}
                steps={block.steps ?? []}
              />
            )

          case 'testimonials':
            return (
              <Testimonials
                key={key}
                overline={block.overline}
                title={block.title}
                testimonials={(block.testimonials ?? []).map((t: Block) => ({
                  id: t.id,
                  authorName: t.authorName,
                  authorRole: t.authorRole,
                  quote: t.quote,
                  rating: t.rating,
                  photo: t.photo?.url ? { url: t.photo.url, alt: t.photo.alt ?? '' } : null,
                }))}
              />
            )

          case 'faq':
            return <FAQ key={key} title={block.title} subtitle={block.subtitle} items={block.items ?? []} />

          case 'stats':
            return <Stats key={key} title={block.title} items={block.items ?? []} />

          case 'rich-text':
            return <RichTextContent key={key} content={block.content} />

          case 'contact-section':
            return (
              <ContactSection
                key={key}
                title={block.title}
                intro={block.intro}
                showContactDetails={block.showContactDetails}
                contactDetails={contactDetails ?? null}
              />
            )

          default:
            return null
        }
      })}
    </>
  )
}
