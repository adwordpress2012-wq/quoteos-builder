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
        'fixed bottom-24 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-purple-400/50 bg-gradient-to-br from-blue-600/90 to-purple-600/90 text-white shadow-[var(--qos-glow-blue)] transition-transform hover:scale-105 active:scale-95 xl:hidden print:hidden',
        className,
      )}
    >
      <Sparkles className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}
