import { Eye, Sparkles, Wand2 } from 'lucide-react'
import { cn } from '../../lib/utils'

type MobileBottomBarProps = {
  onGenerate: () => void
  onReview: () => void
  onOpenMicah: () => void
}

export function MobileBottomBar({
  onGenerate,
  onReview,
  onOpenMicah,
}: MobileBottomBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-blue-500/25 bg-[var(--qos-bg)]/95 px-3 py-3 backdrop-blur-xl xl:hidden print:hidden"
      role="toolbar"
      aria-label="Builder actions"
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        <BarButton
          icon={Wand2}
          label="Generate"
          onClick={onGenerate}
          primary
        />
        <BarButton icon={Eye} label="Preview" onClick={onReview} />
        <BarButton icon={Sparkles} label="Micah" onClick={onOpenMicah} />
      </div>
    </div>
  )
}

function BarButton({
  icon: Icon,
  label,
  onClick,
  primary,
}: {
  icon: typeof Wand2
  label: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl border px-2 py-2 text-xs font-semibold transition-all',
        primary
          ? 'border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/30 text-white shadow-[var(--qos-glow-blue)]'
          : 'border-blue-500/25 bg-blue-500/8 text-cyan-200',
      )}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      {label}
    </button>
  )
}
