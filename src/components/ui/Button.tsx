import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  className?: string
  newTab?: boolean
  ariaLabel?: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white hover:bg-brand-secondary focus-visible:ring-brand-primary',
  secondary:
    'bg-brand-accent text-white hover:opacity-90 focus-visible:ring-brand-accent',
  outline:
    'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-visible:ring-brand-primary',
  ghost:
    'text-brand-primary hover:bg-brand-light focus-visible:ring-brand-primary',
  white:
    'bg-white text-brand-primary hover:bg-neutral-100 focus-visible:ring-white',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className,
  newTab,
  ariaLabel,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-button',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    variants[variant],
    sizes[size],
    (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  )

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={base}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  )
}
