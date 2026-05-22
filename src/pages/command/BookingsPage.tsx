import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import { StatusBadge } from '../../components/command/StatusBadge'
import { DEMO_BOOKINGS } from '../../lib/demo/demo-data'
import { useTradieSettings } from '../../hooks/useTradieSettings'

function formatBookingTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function BookingsPage() {
  const { settings } = useTradieSettings()

  return (
    <CommandCentreLayout
      title="Bookings"
      subtitle="Booking requests — confirm via your calendar link"
    >
      <p className="mb-6 text-sm text-slate-500">
        Demo mode: use Calendly or Google Calendar. No live booking sync yet.
      </p>

      <ul className="space-y-4">
        {DEMO_BOOKINGS.map((booking) => (
          <li key={booking.id} className="glass-card rounded-xl p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm text-cyan-400/90">
                  {formatBookingTime(booking.requestedAt)}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-50">
                  {booking.customer}
                </h3>
                <p className="text-sm text-slate-500">
                  {booking.jobType} · {booking.suburb}
                </p>
              </div>
              <StatusBadge status={booking.status} />
            </div>

            <PageActions className="mt-4">
              <ActionBtn
                variant="primary"
                href={settings.calendlyUrl}
              >
                Open calendar
              </ActionBtn>
              <ActionBtn href="https://calendar.google.com">
                Google Calendar
              </ActionBtn>
            </PageActions>
          </li>
        ))}
      </ul>
    </CommandCentreLayout>
  )
}
