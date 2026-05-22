import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type PageActionsProps = {
  children: ReactNode
  className?: string
}

export function PageActions({ children, className }: PageActionsProps) {
  return (
    <div className={cn('mt-4 flex flex-col gap-2 sm:flex-row', className)}>
      {children}
    </div>
  )
}

type ActionBtnProps = {
  children: ReactNode
  onClick?: () => void
  href?: string
  to?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export function ActionBtn({
  children,
  onClick,
  href,
  to,
  variant = 'secondary',
  className,
}: ActionBtnProps) {
  const base =
    'inline-flex min-h-[48px] flex-1 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors sm:flex-none sm:min-w-[140px]'

  const variants = {
    primary:
      'border border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/25 text-white shadow-[var(--qos-glow-blue)]',
    secondary:
      'border border-[var(--qos-border)] bg-white/[0.04] text-slate-200 hover:border-cyan-400/35',
    ghost: 'border border-transparent text-cyan-200 hover:bg-white/[0.04]',
  }

  const cls = cn(base, variants[variant], className)

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
