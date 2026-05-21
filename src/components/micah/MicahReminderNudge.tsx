import { Bell, X } from 'lucide-react'
import type { MicahReminder } from '../../lib/micah/micahReminders'
import { cn } from '../../lib/utils'

type MicahReminderNudgeProps = {
  reminders: MicahReminder[]
  onDismiss?: () => void
  onOpen?: () => void
  className?: string
}

export function MicahReminderNudge({
  reminders,
  onDismiss,
  onOpen,
  className,
}: MicahReminderNudgeProps) {
  if (reminders.length === 0) return null

  const count = reminders.length
  const primary = reminders[0]

  return (
    <div
      className={cn(
        'w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-cyan-400/30 bg-slate-950/90 p-3 text-left shadow-[0_0_34px_rgba(59,130,246,0.32)] backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-cyan-200">
          <Bell className="h-4 w-4" aria-hidden="true" />
        </span>
        <button
          type="button"
          onClick={onOpen}
          className="min-w-0 flex-1 text-left"
        >
          <p className="text-sm font-semibold text-slate-50">
            You have {count} follow-up{count === 1 ? '' : 's'} due.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            {primary.detail}
          </p>
        </button>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full p-1 text-slate-500 transition-colors hover:bg-white/10 hover:text-slate-200"
            aria-label="Dismiss Micah reminder"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  )
}
