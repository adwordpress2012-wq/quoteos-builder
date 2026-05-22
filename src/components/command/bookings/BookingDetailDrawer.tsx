import { BuilderOverlay } from '../../app/BuilderOverlay'
import { ActionBtn, PageActions } from '../PageActions'
import { StatusBadge } from '../StatusBadge'
import type { DemoBooking } from '../../../lib/demo/types'

function formatBookingTime(iso: string): string {
  return new Date(iso).toLocaleString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
  })
}

type BookingDetailDrawerProps = {
  booking: DemoBooking | null
  open: boolean
  onClose: () => void
  onEdit: () => void
  onOpenCalendar: () => void
  googleCalendarUrl: string
}

export function BookingDetailDrawer({
  booking,
  open,
  onClose,
  onEdit,
  onOpenCalendar,
  googleCalendarUrl,
}: BookingDetailDrawerProps) {
  if (!booking) return null

  return (
    <BuilderOverlay open={open} onClose={onClose} title="Booking details">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-sm text-cyan-400/90">
              {formatBookingTime(booking.requestedAt)}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-slate-50">
              {booking.customer}
            </h3>
            <p className="text-sm text-slate-500">
              {booking.jobType} · {booking.suburb}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-slate-500">Address</dt>
            <dd className="text-slate-200">{booking.address || '—'}</dd>
          </div>
          {booking.linkedQuoteNumber ? (
            <div>
              <dt className="text-slate-500">Linked quote</dt>
              <dd className="font-mono text-cyan-300">{booking.linkedQuoteNumber}</dd>
            </div>
          ) : null}
          {booking.notes ? (
            <div>
              <dt className="text-slate-500">Notes</dt>
              <dd className="text-slate-300">{booking.notes}</dd>
            </div>
          ) : null}
        </dl>

        <PageActions>
          <ActionBtn variant="primary" onClick={onOpenCalendar}>
            Open DOS Calendar
          </ActionBtn>
          <ActionBtn href={googleCalendarUrl}>Google Calendar</ActionBtn>
          <ActionBtn variant="ghost" onClick={onEdit}>
            Edit booking
          </ActionBtn>
        </PageActions>
      </div>
    </BuilderOverlay>
  )
}
