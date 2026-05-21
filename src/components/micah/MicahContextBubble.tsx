import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

type MicahContextBubbleProps = {
  message: string
  onOpen: () => void
  onDismiss: () => void
  className?: string
}

export function MicahContextBubble({
  message,
  onOpen,
  onDismiss,
  className,
}: MicahContextBubbleProps) {
  return (
    <div
      className={cn(
        'relative animate-fade-in rounded-2xl border border-cyan-400/30 bg-slate-950/92 p-3 shadow-[0_0_28px_rgba(59,130,246,0.28)] backdrop-blur-xl',
        className,
      )}
      role="status"
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute right-1.5 top-1.5 rounded-full p-1 text-slate-500 hover:bg-white/10 hover:text-slate-200"
        aria-label="Dismiss tip"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
      <p className="pr-5 text-xs leading-relaxed text-slate-200">{message}</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-2 min-h-[32px] w-full rounded-lg border border-blue-500/35 bg-blue-600/20 text-xs font-semibold text-cyan-100 hover:border-cyan-400/45"
      >
        Ask Micah
      </button>
      <span
        className="pointer-events-none absolute -bottom-1.5 right-8 h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-950/92"
        aria-hidden="true"
      />
    </div>
  )
}
