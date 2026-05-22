import { Plus } from 'lucide-react'
import { cn } from '../../lib/utils'

type AddEntityButtonProps = {
  label: string
  onClick: () => void
  className?: string
}

export function AddEntityButton({ label, onClick, className }: AddEntityButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/25 px-4 text-sm font-semibold text-white shadow-[var(--qos-glow-blue)] transition-colors hover:border-cyan-400/50',
        className,
      )}
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}
