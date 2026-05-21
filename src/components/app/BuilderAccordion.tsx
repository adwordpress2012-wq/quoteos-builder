import { ChevronDown } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

type BuilderAccordionProps = {
  title: string
  subtitle?: string
  defaultOpen?: boolean
  forceOpen?: boolean
  badge?: string
  children: ReactNode
}

export function BuilderAccordion({
  title,
  subtitle,
  defaultOpen = false,
  forceOpen,
  badge,
  children,
}: BuilderAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const isOpen = forceOpen ?? open
  const panelId = useId()

  return (
    <section className="glass-card overflow-hidden rounded-2xl">
      <button
        type="button"
        className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-4 text-left sm:px-5"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-slate-50 sm:text-lg">{title}</h3>
            {badge ? (
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-medium text-cyan-200">
                {badge}
              </span>
            ) : null}
          </div>
          {subtitle ? (
            <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-cyan-400/80 transition-transform',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        hidden={!isOpen}
        className="border-t border-blue-500/15 px-4 pb-5 pt-4 sm:px-5"
      >
        {children}
      </div>
    </section>
  )
}
