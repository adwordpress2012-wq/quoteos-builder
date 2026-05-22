import { Link, useLocation } from 'react-router-dom'
import {
  Calendar,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  Plus,
  Receipt,
  Settings,
  UserCircle,
  UserPlus,
} from 'lucide-react'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/app/dashboard' },
  { icon: UserPlus, label: 'Leads', href: '/app/leads' },
  { icon: UserCircle, label: 'Customers', href: '/app/customers' },
  { icon: FileText, label: 'Quotes', href: '/app/quotes' },
  { icon: Calendar, label: 'Bookings', href: '/app/bookings' },
  { icon: Receipt, label: 'Invoices', href: '/app/invoices' },
  { icon: CalendarDays, label: 'DOS Calendar', href: '/app/calendar' },
  { icon: LayoutGrid, label: 'Tools', href: '/app/tools' },
  { icon: Settings, label: 'Settings', href: '/app/settings' },
] as const

type CommandCentreSidebarProps = {
  onNewQuote?: () => void
  className?: string
}

export function CommandCentreSidebar({
  onNewQuote,
  className,
}: CommandCentreSidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'flex w-[220px] shrink-0 flex-col border-r border-[var(--qos-border)] bg-[rgba(5,5,16,0.6)] backdrop-blur-xl print:hidden',
        'max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-40 max-lg:shadow-2xl',
        className,
      )}
    >
      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-5">
        <Link
          to="/app/builder"
          onClick={onNewQuote}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-purple-400/40 bg-gradient-to-r from-purple-600/40 to-blue-600/35 px-4 text-sm font-semibold text-white shadow-[var(--qos-glow-purple)] transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Quote
        </Link>

        <nav className="mt-6 space-y-1" aria-label="Command Centre">
          {NAV_ITEMS.map((item) => {
            const active =
              location.pathname === item.href ||
              (item.href === '/app/dashboard' &&
                (location.pathname === '/app' ||
                  location.pathname === '/app/dashboard'))

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
                  active
                    ? 'border border-blue-500/30 bg-blue-500/15 text-cyan-100'
                    : 'text-slate-300 hover:bg-white/[0.04] hover:text-cyan-100',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <item.icon
                  className="h-4 w-4 shrink-0 text-cyan-400/80"
                  aria-hidden="true"
                />
                <span className="flex-1 text-left">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-blue-500/15 px-4 py-4">
        <a
          href="https://directiveos.com.au"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[11px] font-medium uppercase tracking-wider text-slate-500 transition-colors hover:text-cyan-300"
        >
          Powered by DOS
        </a>
      </div>
    </aside>
  )
}
