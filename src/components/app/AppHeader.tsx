import { Link, useLocation } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { cn } from '../../lib/utils'

type AppHeaderProps = {
  showBuilderNav?: boolean
}

export function AppHeader({ showBuilderNav = true }: AppHeaderProps) {
  const location = useLocation()
  const onDashboard =
    location.pathname === '/app' || location.pathname === '/app/dashboard'

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--qos-border)] bg-[var(--qos-bg)]/90 shadow-[inset_0_-1px_0_rgba(59,130,246,0.08)] backdrop-blur-xl print:hidden">
      <div className="mx-auto flex h-14 max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link
            to="/app/builder"
            className="group flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/40 bg-gradient-to-br from-blue-600/30 to-purple-500/20 text-sm font-bold text-cyan-200 shadow-[var(--qos-glow-blue)]">
              Q
            </span>
            <div className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-semibold text-slate-50 sm:text-base">
                QuoteOS SQBA
              </span>
              <span className="text-[10px] text-slate-500 sm:text-[11px]">
                Smart Quote Builder Assistant
              </span>
            </div>
          </Link>
        </div>

        {showBuilderNav ? (
          <nav
            className="order-3 flex w-full justify-center gap-1 sm:order-none sm:w-auto"
            aria-label="App navigation"
          >
            <Link
              to="/app"
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
          </nav>
        ) : null}

        <div className="flex items-center gap-2 sm:gap-3">
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
