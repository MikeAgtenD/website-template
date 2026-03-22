import { cn } from '@/lib/utils'

interface StatItem {
  value: string
  label: string
}

interface StatsProps {
  title?: string | null
  items: StatItem[]
  className?: string
}

export function Stats({ title, items, className }: StatsProps) {
  return (
    <section className={cn('bg-brand-primary text-white', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {title && (
          <h2 className="text-center text-2xl font-bold text-white mb-10">{title}</h2>
        )}
        <ul
          className={cn(
            'grid gap-8 text-center',
            items.length === 2 && 'grid-cols-2',
            items.length === 3 && 'grid-cols-1 sm:grid-cols-3',
            items.length >= 4 && 'grid-cols-2 sm:grid-cols-4',
          )}
        >
          {items.map((item, index) => (
            <li key={index}>
              <p className="text-4xl font-extrabold text-white mb-1">{item.value}</p>
              <p className="text-white/75 text-sm font-medium uppercase tracking-wide">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
