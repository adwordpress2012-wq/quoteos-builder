import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

type MicahSpeechBubbleProps = {
  operatorName?: string
  followUpCount: number
  onShow: () => void
  onDismiss: () => void
  className?: string
}

export function MicahSpeechBubble({
  operatorName = 'Luke',
  followUpCount,
  onShow,
  onDismiss,
  className,
}: MicahSpeechBubbleProps) {
  if (followUpCount <= 0) return null

  return (
    <div
      className={cn(
        'relative w-[min(17.5rem,calc(100vw-2rem))] animate-fade-in rounded-2xl border border-cyan-400/30 bg-slate-950/92 p-3.5 shadow-[0_0_34px_rgba(59,130,246,0.32)] backdrop-blur-xl',
        className,
      )}
      role="dialog"
      aria-label="Micah follow-up reminder"
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-2 top-2 rounded-full p-1 text-slate-500 transition-colors hover:bg-white/10 hover:text-slate-200"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <p className="pr-6 text-sm font-semibold leading-snug text-slate-50">
        Hey {operatorName} 👋
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">
        You have {followUpCount} follow-up{followUpCount === 1 ? '' : 's'} due.
        Want me to help?
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onShow}
          className="min-h-[36px] flex-1 rounded-lg border border-blue-500/40 bg-gradient-to-r from-blue-600/30 to-purple-600/25 px-3 text-xs font-semibold text-cyan-100 transition-colors hover:border-blue-400/60"
        >
          Show me
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="min-h-[36px] rounded-lg border border-slate-700/60 bg-white/[0.04] px-3 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
        >
          Not now
        </button>
      </div>
      <span
        className="pointer-events-none absolute -bottom-2 right-14 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-950/92"
        aria-hidden="true"
      />
    </div>
  )
}
