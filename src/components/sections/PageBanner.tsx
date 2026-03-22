import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageBannerProps {
  title: string
  subtitle?: string | null
  breadcrumbs?: BreadcrumbItem[]
  className?: string
}

export function PageBanner({ title, subtitle, breadcrumbs, className }: PageBannerProps) {
  return (
    <section className={cn('bg-brand-dark text-white', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-4 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_.text-neutral-700]:text-white/90">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/75 max-w-2xl">{subtitle}</p>
        )}
      </div>
      <div className="h-1 bg-brand-primary" />
    </section>
  )
}
