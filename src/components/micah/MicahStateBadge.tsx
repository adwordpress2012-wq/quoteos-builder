import { AlertTriangle, Check, Circle, Clock3, Sparkles } from 'lucide-react'
import { getMicahStateConfig, type MicahState } from '../../lib/micah/micahStates'
import { cn } from '../../lib/utils'

type MicahStateBadgeProps = {
  state: MicahState
  reminderCount?: number
  compact?: boolean
  className?: string
}

export function MicahStateBadge({
  state,
  reminderCount = 0,
  compact = false,
  className,
}: MicahStateBadgeProps) {
  const config = getMicahStateConfig(state)
  const Icon =
    state === 'success'
      ? Check
      : state === 'warning'
        ? AlertTriangle
        : state === 'reminder'
          ? Clock3
          : state === 'thinking'
            ? Sparkles
            : Circle

  return (
    <div
      className={cn(
        'inline-flex min-h-[32px] items-center gap-2 rounded-full border border-blue-400/25 bg-slate-950/75 px-3 py-1 text-xs font-medium backdrop-blur-xl',
        config.toneClass,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{compact ? config.label : config.message}</span>
      {state === 'thinking' ? (
        <span className="micah-typing-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      ) : null}
      {reminderCount > 0 ? (
        <span className="rounded-full bg-purple-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {reminderCount}
        </span>
      ) : null}
    </div>
  )
}
