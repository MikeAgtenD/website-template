import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'li'
}

export function Card({ children, className, hover = false, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'bg-white rounded-card shadow-card overflow-hidden',
        hover && 'transition-shadow duration-300 hover:shadow-elevated',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
