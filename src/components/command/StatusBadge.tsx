import { cn } from '../../lib/utils'

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
  reviewed: 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  'quote-drafted': 'bg-purple-500/20 text-purple-200 border-purple-500/30',
  draft: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  sent: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/30',
  'follow-up': 'bg-orange-500/20 text-orange-200 border-orange-500/30',
  accepted: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
  lost: 'bg-red-500/15 text-red-300 border-red-500/25',
  requested: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
  confirmed: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
  completed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  paid: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30',
  overdue: 'bg-red-500/20 text-red-200 border-red-500/35',
  urgent: 'bg-red-500/25 text-red-100 border-red-500/40',
  normal: 'bg-blue-500/15 text-blue-200 border-blue-500/25',
  flexible: 'bg-slate-500/15 text-slate-400 border-slate-500/25',
}

type StatusBadgeProps = {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const key = status.toLowerCase().replace(/\s+/g, '-')
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize',
        STATUS_STYLES[key] ?? 'bg-white/5 text-slate-300 border-white/10',
        className,
      )}
    >
      {status.replace(/-/g, ' ')}
    </span>
  )
}
