import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

type StatCardProps = {
  label: string
  value: string | number
  icon?: LucideIcon
  highlight?: boolean
  className?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  highlight,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-xl p-4',
        highlight && 'border-cyan-500/35 shadow-[var(--qos-glow-blue)]',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </p>
        {Icon ? (
          <Icon className="h-4 w-4 shrink-0 text-cyan-400/70" aria-hidden="true" />
        ) : null}
      </div>
      <p
        className={cn(
          'mt-2 text-2xl font-semibold tabular-nums',
          highlight ? 'text-cyan-200' : 'text-slate-50',
        )}
      >
        {value}
      </p>
    </div>
  )
}
