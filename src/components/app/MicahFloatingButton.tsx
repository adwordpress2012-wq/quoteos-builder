import { Sparkles } from 'lucide-react'
import { cn } from '../../lib/utils'

type MicahFloatingButtonProps = {
  onClick: () => void
  className?: string
}

export function MicahFloatingButton({ onClick, className }: MicahFloatingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Micah assistant"
      className={cn(
        'micah-float-btn fixed bottom-24 right-4 z-30 flex flex-col items-center gap-1 print:hidden xl:hidden',
        className,
      )}
    >
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-purple-400/50 bg-gradient-to-br from-blue-600/90 to-purple-600/90 text-white shadow-[var(--qos-glow-blue)]">
        <span
          className="absolute inset-0 rounded-full bg-purple-500/30 blur-md"
          aria-hidden="true"
        />
        <Sparkles className="relative h-6 w-6" aria-hidden="true" />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/90">
        Micah
      </span>
    </button>
  )
}
