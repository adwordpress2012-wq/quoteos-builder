import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import {
  CalendarExternalLinks,
  DosCalendarView,
} from '../../components/command/calendar/DosCalendarView'
import { CalendarEventFormDrawer } from '../../components/command/forms/CommandForms'
import { useDemoStore } from '../../hooks/useDemoStore'
import { useTradieSettings } from '../../hooks/useTradieSettings'
import type { DemoCalendarEvent } from '../../lib/demo/types'
import { toDateInputValue } from '../../lib/command/calendar-utils'

export function DosCalendarPage() {
  const { settings } = useTradieSettings()
  const {
    calendarEvents,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
  } = useDemoStore()
  const [editEvent, setEditEvent] = useState<DemoCalendarEvent | null>(null)
  const [formOpen, setFormOpen] = useState(false)

  const openNew = (date?: Date) => {
    if (date) {
      const d = toDateInputValue(date)
      setEditEvent({
        id: '',
        title: '',
        startsAt: `${d}T09:00:00`,
        endsAt: `${d}T11:00:00`,
        kind: 'job_booking',
      })
    } else {
      setEditEvent(null)
    }
    setFormOpen(true)
  }

  const openEdit = (event: DemoCalendarEvent) => {
    setEditEvent(event)
    setFormOpen(true)
  }

  const saveEvent = (event: DemoCalendarEvent) => {
    const { id, ...input } = event
    if (id && calendarEvents.some((e) => e.id === id)) {
      updateCalendarEvent(id, input)
    } else {
      addCalendarEvent(input)
    }
  }

  return (
    <CommandCentreLayout
      title="DOS Calendar"
      subtitle="Internal schedule — jobs, site visits, and admin time"
    >
      <div className="glass-card mb-6 flex items-start gap-4 rounded-xl p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-500/35 bg-blue-500/15">
          <CalendarDays className="h-6 w-6 text-cyan-200" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-400">
            Your command-centre calendar for planning the week. Customer booking
            requests are under Bookings — use Day, Week, or Month view and tap any
            event to edit.
          </p>
          <PageActions className="mt-3">
            <ActionBtn to="/app/bookings" variant="secondary">
              View booking requests
            </ActionBtn>
          </PageActions>
        </div>
      </div>

      <DosCalendarView
        events={calendarEvents}
        onSelectEvent={openEdit}
        onAddEvent={openNew}
        externalActions={
          <CalendarExternalLinks
            calendlyUrl={settings.calendlyUrl}
            googleCalendarUrl={settings.googleCalendarUrl}
          />
        }
      />

      <p className="mt-6 text-sm text-slate-500">
        Saved on this device. Optional external calendars in{' '}
        <Link to="/app/settings" className="text-cyan-400 hover:underline">
          Settings
        </Link>
        .
      </p>

      <CalendarEventFormDrawer
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditEvent(null)
        }}
        initial={editEvent}
        onSave={saveEvent}
        onDelete={
          editEvent?.id && calendarEvents.some((e) => e.id === editEvent.id)
            ? () => deleteCalendarEvent(editEvent.id)
            : undefined
        }
      />
    </CommandCentreLayout>
  )
}
