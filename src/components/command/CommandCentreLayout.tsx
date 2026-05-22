import { useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { AppShell } from '../app/AppShell'
import { CommandCentreSidebar } from './CommandCentreSidebar'
import { cn } from '../../lib/utils'

type CommandCentreLayoutProps = {
  children: ReactNode
  title: string
  subtitle?: string
  onNewQuote?: () => void
  actions?: ReactNode
}

export function CommandCentreLayout({
  children,
  title,
  subtitle,
  onNewQuote,
  actions,
}: CommandCentreLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <AppShell showBuilderNav={false}>
      <div className="flex min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)]">
        {mobileNavOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
          />
        ) : null}

        <CommandCentreSidebar
          onNewQuote={onNewQuote}
          className={cn(
            'max-lg:transition-transform',
            mobileNavOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
          )}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3 border-b border-[var(--qos-border)] px-4 py-4 sm:px-6">
            <div className="flex min-w-0 items-start gap-3">
              <button
                type="button"
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--qos-border)] text-slate-300 lg:hidden"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <h1 className="text-xl font-semibold text-slate-50 sm:text-2xl">
                  {title}
                </h1>
                {subtitle ? (
                  <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                ) : null}
              </div>
            </div>
            {actions ? (
              <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>
            ) : null}
          </div>

          <main className="flex-1 overflow-x-clip px-4 py-5 pb-24 sm:px-6 sm:py-6 lg:pb-8">
            {children}
          </main>
        </div>

        {mobileNavOpen ? (
          <button
            type="button"
            className="fixed left-[200px] top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--qos-bg)] text-slate-300 lg:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </AppShell>
  )
}
