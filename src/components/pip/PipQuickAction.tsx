import { Link } from 'react-router-dom'
import { Calendar, List, Plus, Sparkles } from 'lucide-react'
import type { PipQuickActionItem } from '../../types/pip'

const iconMap = {
  plus: Plus,
  calendar: Calendar,
  list: List,
  sparkles: Sparkles,
}

type PipQuickActionProps = {
  actions: PipQuickActionItem[]
  variant?: 'agent-os' | 'doshub'
  compact?: boolean
}

export default function PipQuickAction({
  actions,
  variant = 'doshub',
  compact = false,
}: PipQuickActionProps) {
  if (actions.length === 0) return null

  const btnClass =
    variant === 'agent-os'
      ? 'inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-[11px] font-semibold text-cyan-100 transition hover:border-cyan-400/50 hover:bg-cyan-500/15'
      : 'inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:bg-cyan-500/10'

  return (
    <div
      className={
        compact ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2 sm:flex-row sm:flex-wrap'
      }
    >
      {actions.map((action) => {
        const Icon = action.icon ? iconMap[action.icon] : Sparkles
        const inner = (
          <>
            <Icon className="h-3.5 w-3.5 shrink-0 text-cyan-300" aria-hidden />
            {action.label}
          </>
        )

        if (action.href?.startsWith('/')) {
          return (
            <Link key={action.id} to={action.href} className={btnClass}>
              {inner}
            </Link>
          )
        }

        if (action.href) {
          return (
            <a key={action.id} href={action.href} className={btnClass}>
              {inner}
            </a>
          )
        }

        return (
          <button key={action.id} type="button" onClick={action.onClick} className={btnClass}>
            {inner}
          </button>
        )
      })}
    </div>
  )
}
