import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import {
  DEMO_CALENDAR_EVENTS,
  formatCalendarTimeRange,
  getCalendarKindLabel,
} from '../../lib/demo/demo-data'
import { useTradieSettings } from '../../hooks/useTradieSettings'
import { cn } from '../../lib/utils'

const KIND_STYLES = {
  job: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
  booking: 'border-purple-500/30 bg-purple-500/10 text-purple-200',
  admin: 'border-blue-500/25 bg-blue-500/10 text-blue-200',
  'site-visit': 'border-amber-500/30 bg-amber-500/10 text-amber-200',
} as const

export function DosCalendarPage() {
  const { settings } = useTradieSettings()

  const sorted = [...DEMO_CALENDAR_EVENTS].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )

  const grouped = sorted.reduce<Record<string, typeof sorted>>((acc, event) => {
    const key = new Date(event.startsAt).toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    acc[key] = acc[key] ? [...acc[key], event] : [event]
    return acc
  }, {})

  return (
    <CommandCentreLayout
      title="DOS Calendar"
      subtitle="Internal schedule — jobs, site visits, and admin time"
    >
      <div className="glass-card mb-6 flex items-start gap-4 rounded-xl p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/35 bg-blue-500/15">
          <CalendarDays className="h-6 w-6 text-cyan-200" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm text-slate-400">
            Official QuoteOS internal calendar for planning your week. Customer
            booking requests still live under Bookings — this view is for your
            crew schedule and DOS admin blocks.
          </p>
          <PageActions className="mt-3">
            <ActionBtn to="/app/bookings" variant="secondary">
              View booking requests
            </ActionBtn>
            <ActionBtn href={settings.calendlyUrl} variant="primary">
              Open external calendar
            </ActionBtn>
          </PageActions>
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(grouped).map(([dayLabel, events]) => (
          <section key={dayLabel}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90">
              {dayLabel}
            </h2>
            <ul className="mt-4 space-y-3">
              {events.map((event) => (
                <li key={event.id} className="glass-card rounded-xl p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm text-cyan-400/90">
                        {formatCalendarTimeRange(event.startsAt, event.endsAt)}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-slate-50">
                        {event.title}
                      </h3>
                      {event.customer ? (
                        <p className="text-sm text-slate-500">
                          {event.customer}
                          {event.suburb ? ` · ${event.suburb}` : ''}
                        </p>
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                        KIND_STYLES[event.kind],
                      )}
                    >
                      {getCalendarKindLabel(event.kind)}
                    </span>
                  </div>
                  {event.notes ? (
                    <p className="mt-3 text-sm text-slate-400">{event.notes}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Demo mode — live Google Calendar sync coming later. Update your link in{' '}
        <Link to="/app/settings" className="text-cyan-400 hover:underline">
          Settings
        </Link>
        .
      </p>
    </CommandCentreLayout>
  )
}
