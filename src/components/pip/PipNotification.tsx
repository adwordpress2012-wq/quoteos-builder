import { motion } from 'framer-motion'
import type {
  PipMood as PipMoodType,
  PipNotification as PipNotificationType,
  PipSurfaceVariant,
} from '../../types/pip'
import PipMood from './PipMood'

type PipNotificationProps = {
  notification: PipNotificationType
  mood?: PipMoodType
  variant?: PipSurfaceVariant
  onDismiss?: (id: string) => void
  onAction?: (id: string) => void
  timestamp?: string
}

const kindAccent: Record<PipNotificationType['kind'], string> = {
  nudge: 'border-amber-400/25 bg-amber-500/5',
  celebration: 'border-emerald-400/25 bg-emerald-500/5',
  empty: 'border-cyan-400/20 bg-cyan-500/5',
  onboarding: 'border-violet-400/25 bg-violet-500/5',
  info: 'border-white/10 bg-white/[0.03]',
}

export default function PipNotification({
  notification,
  mood = 'curious',
  onDismiss,
  onAction,
  timestamp,
}: PipNotificationProps) {
  const accent = kindAccent[notification.kind]

  return (
    <motion.article
      className={`rounded-xl border p-3 sm:p-4 ${accent}`}
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      role="status"
    >
      <div className="flex items-start gap-3">
        <PipMood mood={mood} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-slate-200">{notification.message}</p>
          {timestamp ? <p className="mt-1 text-[10px] text-slate-500">{timestamp}</p> : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {notification.actionLabel ? (
              <button
                type="button"
                onClick={() => onAction?.(notification.id)}
                className="rounded-lg bg-cyan-500/90 px-3 py-1.5 text-[11px] font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                {notification.actionLabel}
              </button>
            ) : null}
            {onDismiss ? (
              <button
                type="button"
                onClick={() => onDismiss(notification.id)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-[11px] font-semibold text-slate-400"
              >
                Not now
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
