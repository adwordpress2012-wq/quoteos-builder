import type { ReactNode } from 'react'
import { BuilderOverlay } from '../app/BuilderOverlay'
import { builderPrimaryBtnClass } from '../app/builder-styles'
import { cn } from '../../lib/utils'

type CommandFormDrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  onSubmit?: () => void
  submitLabel?: string
  footer?: ReactNode
}

export function CommandFormDrawer({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Save',
  footer,
}: CommandFormDrawerProps) {
  return (
    <BuilderOverlay open={open} onClose={onClose} title={title}>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.()
        }}
      >
        {children}
        {footer ?? (
          <div className="flex flex-col gap-2 border-t border-blue-500/15 pt-4 sm:flex-row">
            <button
              type="submit"
              className={cn(builderPrimaryBtnClass, 'sm:flex-1')}
            >
              {submitLabel}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-[var(--qos-border)] px-5 text-sm font-semibold text-slate-300 hover:border-cyan-400/35"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </BuilderOverlay>
  )
}
