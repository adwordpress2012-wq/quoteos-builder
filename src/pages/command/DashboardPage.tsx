import { Link } from 'react-router-dom'
import {
  Briefcase,
  CalendarCheck,
  DollarSign,
  Receipt,
  TrendingUp,
} from 'lucide-react'
import { ActivityTimeline } from '../../components/command/dashboard/ActivityTimeline'
import { MicahSuggestionsPanel } from '../../components/command/dashboard/MicahSuggestionsPanel'
import { MorningBriefing } from '../../components/command/dashboard/MorningBriefing'
import { QuickActionsRow } from '../../components/command/dashboard/QuickActionsRow'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { StatCard } from '../../components/command/StatCard'
import {
  DASHBOARD_KPIS,
  DEMO_BUSINESS,
  formatDemoMoney,
  TODAYS_ATTENTION,
} from '../../lib/demo/demo-data'
import { cn } from '../../lib/utils'

export function DashboardPage() {
  const kpis = DASHBOARD_KPIS

  return (
    <CommandCentreLayout
      title="Command Centre"
      subtitle={`${DEMO_BUSINESS.name} — your main operating screen`}
    >
      <div className="space-y-6">
        <MorningBriefing />
        <QuickActionsRow />

        <section aria-labelledby="dashboard-kpis-heading">
          <h2
            id="dashboard-kpis-heading"
            className="sr-only"
          >
            Dashboard metrics
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <StatCard
              label="Weekly revenue"
              value={formatDemoMoney(kpis.weeklyRevenue)}
              icon={DollarSign}
              highlight
            />
            <StatCard
              label="Monthly revenue"
              value={formatDemoMoney(kpis.monthlyRevenue)}
              icon={TrendingUp}
            />
            <StatCard
              label="Outstanding payments"
              value={formatDemoMoney(kpis.outstandingPayments)}
              icon={Receipt}
            />
            <StatCard
              label="Jobs completed"
              value={kpis.jobsCompleted}
              icon={CalendarCheck}
            />
            <StatCard
              label="Average job value"
              value={formatDemoMoney(kpis.averageJobValue)}
              icon={Briefcase}
              className="sm:col-span-2 lg:col-span-1"
            />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
          <section aria-labelledby="attention-heading">
            <h2
              id="attention-heading"
              className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90"
            >
              Today&apos;s jobs & follow-ups
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

          <div className="space-y-6">
            <MicahSuggestionsPanel />
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </CommandCentreLayout>
  )
}
