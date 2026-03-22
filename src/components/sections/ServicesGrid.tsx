import Link from 'next/link'
import Image from 'next/image'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { cn } from '@/lib/utils'

interface ServiceCardData {
  id: string
  title: string
  slug: string
  shortDescription: string
  image?: { url: string; alt: string } | null
}

interface ServicesGridProps {
  overline?: string | null
  title?: string | null
  subtitle?: string | null
  services: ServiceCardData[]
  columns?: '2' | '3' | '4'
  className?: string
}

const gridCols: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function ServicesGrid({
  overline,
  title,
  subtitle,
  services,
  columns = '3',
  className,
}: ServicesGridProps) {
  return (
    <SectionContainer className={cn('bg-neutral-50', className)}>
      {(overline || title || subtitle) && (
        <div className="text-center mb-12">
          {overline && <p className="brand-overline mb-3">{overline}</p>}
          {title && <h2 className="section-title mb-4">{title}</h2>}
          {subtitle && <p className="section-subtitle max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <ul className={cn('grid gap-6', gridCols[columns] ?? gridCols['3'])}>
        {services.map((service) => (
          <li key={service.id}>
            <Link
              href={`/diensten/${service.slug}`}
              className="group flex flex-col h-full bg-white rounded-card shadow-card hover:shadow-elevated transition-shadow duration-300 overflow-hidden"
            >
              {service.image?.url && (
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={service.image.url}
                    alt={service.image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Brand accent on image */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed flex-1 mb-4">
                  {service.shortDescription}
                </p>
                <span className="text-brand-primary font-semibold text-sm inline-flex items-center gap-1">
                  Meer info
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionContainer>
  )
}
