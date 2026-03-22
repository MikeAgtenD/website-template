import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface HeroProps {
  overline?: string | null
  title: string
  subtitle?: string | null
  primaryCTA?: { label?: string | null; url?: string | null } | null
  secondaryCTA?: { label?: string | null; url?: string | null } | null
  image?: { url: string; alt: string } | null
  className?: string
}

export function Hero({ overline, title, subtitle, primaryCTA, secondaryCTA, image, className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[75vh] flex items-center overflow-hidden bg-brand-dark',
        className,
      )}
    >
      {/* Background image */}
      {image?.url && (
        <div className="absolute inset-0">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {overline && (
            <p className="brand-overline text-brand-accent mb-4">{overline}</p>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg sm:text-xl text-neutral-200 mb-10 leading-relaxed">
              {subtitle}
            </p>
          )}

          {(primaryCTA?.label || secondaryCTA?.label) && (
            <div className="flex flex-wrap gap-4">
              {primaryCTA?.label && primaryCTA.url && (
                <Button href={primaryCTA.url} variant="primary" size="lg">
                  {primaryCTA.label}
                </Button>
              )}
              {secondaryCTA?.label && secondaryCTA.url && (
                <Button
                  href={secondaryCTA.url}
                  variant="white"
                  size="lg"
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-brand-primary"
                >
                  {secondaryCTA.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Brand accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-primary" />
    </section>
  )
}
