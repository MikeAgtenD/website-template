import Image from 'next/image'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ImageTextProps {
  image: { url: string; alt: string }
  imagePosition?: 'left' | 'right'
  overline?: string | null
  title: string
  content?: string | null
  cta?: { label?: string | null; url?: string | null } | null
  className?: string
}

export function ImageText({
  image,
  imagePosition = 'left',
  overline,
  title,
  content,
  cta,
  className,
}: ImageTextProps) {
  const imageLeft = imagePosition === 'left'

  return (
    <SectionContainer className={className}>
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
          !imageLeft && 'lg:grid-flow-dense',
        )}
      >
        {/* Image column */}
        <div className={cn('relative', !imageLeft && 'lg:col-start-2')}>
          <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-elevated">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Decorative brand shape behind image */}
          <div
            className={cn(
              'absolute -z-10 w-3/4 h-3/4 rounded-card bg-brand-light',
              imageLeft ? '-bottom-4 -right-4' : '-bottom-4 -left-4',
            )}
          />
        </div>

        {/* Text column */}
        <div className={cn(!imageLeft && 'lg:col-start-1')}>
          {overline && <p className="brand-overline mb-3">{overline}</p>}
          <h2 className="section-title mb-6">{title}</h2>
          {content && (
            <p className="section-subtitle mb-8 whitespace-pre-line">{content}</p>
          )}
          {cta?.label && cta.url && (
            <Button href={cta.url} variant="primary">
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </SectionContainer>
  )
}
