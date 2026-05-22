import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { QuoteOsLogo } from '../brand/QuoteOsLogo'
import { cn } from '../../lib/utils'

type AppHeaderProps = {
  showBuilderNav?: boolean
}

const COMMAND_PATHS = [
  '/app/dashboard',
  '/app/leads',
  '/app/quotes',
  '/app/bookings',
  '/app/invoices',
  '/app/follow-ups',
  '/app/customers',
  '/app/micah',
  '/app/calendar',
  '/app/tools',
  '/app/settings',
  '/app/builder',
]

export function AppHeader({ showBuilderNav = true }: AppHeaderProps) {
  const location = useLocation()
  const onDashboard =
    location.pathname === '/app/dashboard' || location.pathname === '/app'
  const inCommandCentre = COMMAND_PATHS.some((p) =>
    location.pathname.startsWith(p),
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--qos-border)] bg-[var(--qos-bg)]/90 shadow-[inset_0_-1px_0_rgba(59,130,246,0.08)] backdrop-blur-xl print:hidden">
      <div className="mx-auto flex min-h-14 max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 py-1.5 sm:min-h-16 sm:gap-3 sm:px-6">
        <div className="flex min-w-0 items-center">
          <Link
            to="/app/dashboard"
            className="group flex shrink-0 items-center py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <span className="sm:hidden">
              <QuoteOsLogo compact size="md" />
            </span>
            <span className="hidden sm:block">
              <QuoteOsLogo size="md" className="max-w-[11rem] md:max-w-[13rem]" />
            </span>
          </Link>
        </div>

        {showBuilderNav && inCommandCentre ? (
          <nav
            className="order-3 flex w-full justify-center gap-1 sm:order-none sm:w-auto"
            aria-label="App navigation"
          >
            <Link
              to="/app/dashboard"
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-medium transition-colors sm:text-sm',
                onDashboard
                  ? 'border border-blue-500/40 bg-blue-500/15 text-cyan-200'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-cyan-200',
              )}
              aria-current={onDashboard ? 'page' : undefined}
            >
              Dashboard
            </Link>
            <Link
              to="/app/builder"
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-medium transition-colors sm:text-sm',
                location.pathname === '/app/builder'
                  ? 'border border-blue-500/40 bg-blue-500/15 text-cyan-200'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-cyan-200',
              )}
              aria-current={
                location.pathname === '/app/builder' ? 'page' : undefined
              }
            >
              Builder
            </Link>
          </nav>
        ) : null}

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-xs text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-cyan-200 sm:text-sm"
          >
            Back to Website
          </Link>
          <a
            href="https://directiveos.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border border-[var(--qos-border)] px-3 py-2 text-xs text-slate-300 transition-all',
              'hover:border-blue-400/45 hover:text-cyan-100 hover:shadow-[var(--qos-glow-blue)] sm:text-sm',
            )}
          >
            Powered by DOS
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
