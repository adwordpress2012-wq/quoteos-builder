import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type BuilderOverlayProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function BuilderOverlay({
  open,
  onClose,
  title,
  children,
  className,
}: BuilderOverlayProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="builder-overlay-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-2xl border border-blue-500/25 bg-[var(--qos-bg)] shadow-2xl sm:max-h-[88vh] sm:rounded-2xl',
          className,
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-blue-500/15 px-4 py-4 sm:px-5">
          <h2
            id="builder-overlay-title"
            className="text-lg font-semibold text-slate-50"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/25 text-slate-300 hover:text-cyan-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          {children}
        </div>
      </div>
    </div>
  )
}
