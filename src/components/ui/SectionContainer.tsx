import { cn } from '@/lib/utils'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  as?: 'section' | 'div' | 'article'
  tight?: boolean
}

export function SectionContainer({
  children,
  className,
  innerClassName,
  as: Tag = 'section',
  tight = false,
}: SectionContainerProps) {
  return (
    <Tag className={cn('w-full', className)}>
      <div
        className={cn(
          'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
          tight ? 'py-10 lg:py-16' : 'py-16 lg:py-24',
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  )
}
