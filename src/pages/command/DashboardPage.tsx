import { Link } from 'react-router-dom'
import {
  AlertCircle,
  Calendar,
  DollarSign,
  FileText,
  Inbox,
  Receipt,
  TrendingUp,
} from 'lucide-react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { StatCard } from '../../components/command/StatCard'
import {
  DASHBOARD_STATS,
  DEMO_BUSINESS,
  formatDemoMoney,
  TODAYS_ATTENTION,
} from '../../lib/demo/demo-data'
import { cn } from '../../lib/utils'

export function DashboardPage() {
  const stats = DASHBOARD_STATS

  return (
    <CommandCentreLayout
      title="Dashboard"
      subtitle={`${DEMO_BUSINESS.name} — what needs your attention today`}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="New enquiries" value={stats.newEnquiries} icon={Inbox} highlight />
        <StatCard label="Quotes waiting" value={stats.quotesWaiting} icon={FileText} />
        <StatCard label="Follow-ups due" value={stats.followUpsDue} icon={AlertCircle} />
        <StatCard label="Bookings today" value={stats.bookingsToday} icon={Calendar} />
        <StatCard label="Unpaid invoices" value={stats.unpaidInvoices} icon={Receipt} />
        <StatCard
          label="Revenue this week"
          value={formatDemoMoney(stats.revenueWeek)}
          icon={DollarSign}
        />
        <StatCard
          label="Revenue this month"
          value={formatDemoMoney(stats.revenueMonth)}
          icon={TrendingUp}
        />
        <StatCard
          label="Revenue this year"
          value={formatDemoMoney(stats.revenueYear)}
          icon={TrendingUp}
          highlight
        />
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90">
          Today&apos;s attention
        </h2>
        <ul className="mt-4 space-y-3">
          {TODAYS_ATTENTION.map((item) => (
            <li key={item.id}>
              <Link
                to={item.href}
                className={cn(
                  'glass-card flex min-h-[72px] flex-col gap-1 rounded-xl p-4 transition-colors hover:border-cyan-400/30 sm:flex-row sm:items-center sm:justify-between',
                  item.urgent && 'border-red-500/25',
                )}
              >
                <div>
                  <p className="font-semibold text-slate-100">{item.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{item.subtitle}</p>
                </div>
                {item.urgent ? (
                  <span className="text-xs font-bold uppercase tracking-wide text-red-300">
                    Urgent
                  </span>
                ) : (
                  <span className="text-xs text-cyan-400">View →</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/app/leads"
          className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl border border-[var(--qos-border)] bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 hover:border-cyan-400/35"
        >
          View leads
        </Link>
        <Link
          to="/app/builder"
          className="inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/25 px-4 text-sm font-semibold text-white"
        >
          Open quote builder
        </Link>
      </div>
    </CommandCentreLayout>
  )
}
