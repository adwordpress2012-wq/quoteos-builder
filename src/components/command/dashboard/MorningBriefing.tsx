import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  CalendarClock,
  CalendarDays,
  DollarSign,
  Receipt,
} from 'lucide-react'
import {
  formatDemoMoney,
  MORNING_BRIEFING,
} from '../../../lib/demo/demo-data'
import { cn } from '../../../lib/utils'

type BriefingItem = {
  key: keyof typeof MORNING_BRIEFING
  label: string
  href: string
  icon: typeof CalendarDays
  format: (v: number) => string
  urgentWhen?: (v: number) => boolean
}

const BRIEFING_ITEMS: BriefingItem[] = [
  {
    key: 'jobsToday',
    label: 'Jobs today',
    href: '/app/calendar',
    icon: CalendarDays,
    format: (v: number) => String(v),
  },
  {
    key: 'urgentLeads',
    label: 'Urgent leads',
    href: '/app/leads',
    icon: AlertTriangle,
    format: (v: number) => String(v),
    urgentWhen: (v: number) => v > 0,
  },
  {
    key: 'outstandingInvoices',
    label: 'Outstanding invoices',
    href: '/app/invoices',
    icon: Receipt,
    format: (v: number) => String(v),
    urgentWhen: (v: number) => v > 0,
  },
  {
    key: 'revenueWeek',
    label: 'Revenue this week',
    href: '/app/invoices',
    icon: DollarSign,
    format: (v: number) => formatDemoMoney(v),
  },
  {
    key: 'upcomingBookings',
    label: 'Upcoming bookings',
    href: '/app/bookings',
    icon: CalendarClock,
    format: (v: number) => String(v),
  },
]

export function MorningBriefing() {
  const briefing = MORNING_BRIEFING

  return (
    <section
      className="glass-card glow-dashboard rounded-2xl p-4 sm:p-5"
      aria-labelledby="morning-briefing-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-blue-500/15 pb-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400/90">
            Command Centre
          </p>
          <h2
            id="morning-briefing-heading"
            className="mt-1 text-lg font-semibold text-slate-50 sm:text-xl"
          >
            Morning Briefing
          </h2>
        </div>
        <p className="text-xs text-slate-500">Friday 22 May · demo snapshot</p>
      </div>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {BRIEFING_ITEMS.map((item) => {
          const raw = briefing[item.key]
          const urgent = item.urgentWhen ? item.urgentWhen(raw) : false
          const Icon = item.icon

          return (
            <li key={item.key}>
              <Link
                to={item.href}
                className={cn(
                  'flex min-h-[88px] flex-col justify-between rounded-xl border px-3.5 py-3 transition-colors',
                  'bg-white/[0.03] hover:border-cyan-400/35 hover:bg-white/[0.05]',
                  urgent
                    ? 'border-red-500/30'
                    : 'border-[var(--qos-border)]',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {item.label}
                  </span>
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      urgent ? 'text-red-300/90' : 'text-cyan-400/70',
                    )}
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={cn(
                    'mt-2 text-2xl font-semibold tabular-nums',
                    urgent ? 'text-red-200' : 'text-slate-50',
                  )}
                >
                  {item.format(raw)}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
