import type { QuoteStatus } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

const STATUS_OPTIONS: { id: QuoteStatus; label: string }[] = [
  { id: 'draft', label: 'Draft' },
  { id: 'sent', label: 'Sent' },
  { id: 'follow-up', label: 'Follow-Up' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'lost', label: 'Lost' },
]

type StatusChipsProps = {
  value: QuoteStatus
  onChange: (status: QuoteStatus) => void
}

export function StatusChips({ value, onChange }: StatusChipsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Quote status"
    >
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            'min-h-[44px] rounded-xl border px-4 py-2.5 text-sm font-medium transition-all',
            value === opt.id
              ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-100 shadow-[var(--qos-glow-blue)]'
              : 'border-blue-500/25 bg-blue-500/5 text-slate-400 hover:border-blue-400/40 hover:text-slate-200',
          )}
          aria-pressed={value === opt.id}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
