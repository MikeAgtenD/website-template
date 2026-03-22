import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CTABannerProps {
  title: string
  subtitle?: string | null
  primaryCTA?: { label?: string | null; url?: string | null } | null
  secondaryCTA?: { label?: string | null; url?: string | null } | null
  variant?: 'brand' | 'dark' | 'light'
  className?: string
}

const variantStyles = {
  brand: 'bg-brand-primary text-white',
  dark: 'bg-neutral-900 text-white',
  light: 'bg-neutral-50 text-neutral-900',
}

export function CTABanner({
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  variant = 'brand',
  className,
}: CTABannerProps) {
  const isDark = variant === 'brand' || variant === 'dark'

  return (
    <section className={cn('w-full', variantStyles[variant], className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col items-center text-center gap-6 lg:flex-row lg:text-left lg:justify-between lg:items-center">
          <div className="max-w-2xl">
            <h2
              className={cn(
                'text-2xl sm:text-3xl font-extrabold leading-tight mb-3',
                isDark ? 'text-white' : 'text-neutral-900',
              )}
            >
              {title}
            </h2>
            {subtitle && (
              <p className={cn('text-lg', isDark ? 'text-white/80' : 'text-neutral-600')}>
                {subtitle}
              </p>
            )}
          </div>

          {(primaryCTA?.label || secondaryCTA?.label) && (
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              {primaryCTA?.label && primaryCTA.url && (
                <Button
                  href={primaryCTA.url}
                  variant={isDark ? 'white' : 'primary'}
                  size="lg"
                >
                  {primaryCTA.label}
                </Button>
              )}
              {secondaryCTA?.label && secondaryCTA.url && (
                <Button
                  href={secondaryCTA.url}
                  variant="outline"
                  size="lg"
                  className={isDark ? 'border-white text-white hover:bg-white hover:text-brand-primary' : ''}
                >
                  {secondaryCTA.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
