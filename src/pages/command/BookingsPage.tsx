import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { AddEntityButton } from '../../components/command/AddEntityButton'
import { BookingDetailDrawer } from '../../components/command/bookings/BookingDetailDrawer'
import {
  BookingFormDrawer,
  bookingFormToDemo,
} from '../../components/command/forms/CommandForms'
import { StatusBadge } from '../../components/command/StatusBadge'
import { useDemoStore } from '../../hooks/useDemoStore'
import { useTradieSettings } from '../../hooks/useTradieSettings'
import type { DemoBooking } from '../../lib/demo/types'
import { toDateInputValue, toTimeInputValue } from '../../lib/command/calendar-utils'

function formatBookingTime(iso: string): string {
  return new Date(iso).toLocaleString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function BookingsPage() {
  const { settings } = useTradieSettings()
  const { bookings, addBooking, updateBooking } = useDemoStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState<DemoBooking | null>(null)
  const [editBooking, setEditBooking] = useState<DemoBooking | null>(null)

  useEffect(() => {
    const state = location.state as { openAdd?: boolean } | null
    const shouldOpen = state?.openAdd || new URLSearchParams(location.search).get('action') === 'add'
    if (shouldOpen) {
      setAddOpen(true)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  return (
    <CommandCentreLayout
      title="Bookings"
      subtitle="Booking requests — confirm on your DOS Calendar"
      actions={<AddEntityButton label="Add booking" onClick={() => setAddOpen(true)} />}
    >
      <p className="mb-6 text-sm text-slate-500">
        Tap a booking for details. Open calendar uses your internal DOS Calendar;
        Google Calendar is optional for sync elsewhere.
      </p>

      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <button
              type="button"
              onClick={() => setSelected(booking)}
              className="glass-card w-full rounded-xl p-4 text-left transition-colors hover:border-cyan-400/30 sm:p-5"
            >
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
            </button>
          </li>
        ))}
      </ul>

      <BookingDetailDrawer
        booking={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        onEdit={() => {
          if (selected) {
            setEditBooking(selected)
            setSelected(null)
          }
        }}
        onOpenCalendar={() => navigate('/app/calendar')}
        googleCalendarUrl={settings.googleCalendarUrl}
      />

      <BookingFormDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(values) => addBooking(bookingFormToDemo(values))}
      />

      <BookingFormDrawer
        open={Boolean(editBooking)}
        onClose={() => setEditBooking(null)}
        title="Edit booking"
        initial={
          editBooking
            ? {
                customer: editBooking.customer,
                address: editBooking.address,
                date: toDateInputValue(new Date(editBooking.requestedAt)),
                time: toTimeInputValue(editBooking.requestedAt),
                jobType: editBooking.jobType,
                suburb: editBooking.suburb,
                notes: editBooking.notes,
                linkedQuoteNumber: editBooking.linkedQuoteNumber,
              }
            : undefined
        }
        onSave={(values) => {
          if (!editBooking) return
          updateBooking(editBooking.id, bookingFormToDemo(values))
          setEditBooking(null)
        }}
      />
    </CommandCentreLayout>
  )
}
