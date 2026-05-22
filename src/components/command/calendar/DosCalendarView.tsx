import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import {
  eventOnDay,
  formatDayHeader,
  formatMonthYear,
  formatShortDate,
  formatTime,
  getMonthGridCells,
  getWeekDays,
  isSameDay,
  startOfMonth,
  type CalendarView,
} from '../../../lib/command/calendar-utils'
import {
  formatCalendarTimeRange,
  getCalendarKindLabel,
} from '../../../lib/demo/demo-data'
import type { CalendarEventKind, DemoCalendarEvent } from '../../../lib/demo/types'
import { cn } from '../../../lib/utils'
import { ActionBtn } from '../PageActions'

const KIND_STYLES: Record<CalendarEventKind, string> = {
  quote_visit: 'bg-amber-500/25 text-amber-100 border-amber-500/30',
  job_booking: 'bg-cyan-500/25 text-cyan-100 border-cyan-500/30',
  invoice_reminder: 'bg-purple-500/25 text-purple-100 border-purple-500/30',
  admin: 'bg-blue-500/20 text-blue-100 border-blue-500/30',
  expense_reminder: 'bg-rose-500/20 text-rose-100 border-rose-500/30',
}

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type DosCalendarViewProps = {
  events: DemoCalendarEvent[]
  onSelectEvent: (event: DemoCalendarEvent) => void
  onAddEvent: (date?: Date) => void
  externalActions?: import('react').ReactNode
}

export function DosCalendarView({
  events,
  onSelectEvent,
  onAddEvent,
  externalActions,
}: DosCalendarViewProps) {
  const [view, setView] = useState<CalendarView>('month')
  const [anchor, setAnchor] = useState(() => new Date())

  const today = useMemo(() => new Date(), [])

  const shiftAnchor = (delta: number) => {
    setAnchor((d) => {
      const next = new Date(d)
      if (view === 'month') next.setMonth(next.getMonth() + delta)
      else next.setDate(next.getDate() + delta * (view === 'week' ? 7 : 1))
      return next
    })
  }

  const headerLabel =
    view === 'month'
      ? formatMonthYear(anchor)
      : view === 'week'
        ? `${formatShortDate(getWeekDays(anchor)[0])} – ${formatShortDate(getWeekDays(anchor)[6])}`
        : formatDayHeader(anchor)

  const dayEvents = events
    .filter((e) => eventOnDay(e.startsAt, anchor))
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())

  const weekDays = getWeekDays(anchor)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-xl border border-[var(--qos-border)] bg-white/[0.03] p-1">
          {(['day', 'week', 'month'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn(
                'min-h-[40px] rounded-lg px-4 text-sm font-semibold capitalize transition-colors',
                view === v
                  ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/30 text-white'
                  : 'text-slate-400 hover:text-slate-200',
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setAnchor(new Date())}
            className="min-h-[40px] rounded-xl border border-[var(--qos-border)] px-3 text-sm font-medium text-slate-300 hover:border-cyan-400/35"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => shiftAnchor(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--qos-border)] text-slate-300 hover:border-cyan-400/35"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="min-w-[10rem] text-center text-sm font-semibold text-slate-100">
              {headerLabel}
            </span>
            <button
              type="button"
              onClick={() => shiftAnchor(1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--qos-border)] text-slate-300 hover:border-cyan-400/35"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onAddEvent(anchor)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/25 px-4 text-sm font-semibold text-white"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add event
          </button>
        </div>
      </div>

      {externalActions ? (
        <div className="flex flex-wrap gap-2">{externalActions}</div>
      ) : null}

      {view === 'month' ? (
        <MonthGrid
          anchor={anchor}
          today={today}
          events={events}
          onSelectDay={(d) => {
            setAnchor(d)
            setView('day')
          }}
          onSelectEvent={onSelectEvent}
        />
      ) : null}

      {view === 'week' ? (
        <div className="grid gap-2 sm:grid-cols-7">
          {weekDays.map((day) => {
            const items = events
              .filter((e) => eventOnDay(e.startsAt, day))
              .sort(
                (a, b) =>
                  new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
              )
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'glass-card min-h-[140px] rounded-xl p-2',
                  isSameDay(day, today) && 'ring-1 ring-cyan-400/40',
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setAnchor(day)
                    setView('day')
                  }}
                  className={cn(
                    'mb-2 w-full text-left text-xs font-semibold',
                    isSameDay(day, today) ? 'text-cyan-300' : 'text-slate-400',
                  )}
                >
                  {day.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric' })}
                </button>
                <ul className="space-y-1.5">
                  {items.map((ev) => (
                    <li key={ev.id}>
                      <BookingCard event={ev} compact onClick={() => onSelectEvent(ev)} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      ) : null}

      {view === 'day' ? (
        <div className="space-y-3">
          {dayEvents.length === 0 ? (
            <p className="glass-card rounded-xl p-6 text-center text-sm text-slate-500">
              No events this day.{' '}
              <button
                type="button"
                className="text-cyan-400 hover:underline"
                onClick={() => onAddEvent(anchor)}
              >
                Add one
              </button>
            </p>
          ) : (
            dayEvents.map((ev) => (
              <BookingCard key={ev.id} event={ev} onClick={() => onSelectEvent(ev)} />
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}

function MonthGrid({
  anchor,
  today,
  events,
  onSelectDay,
  onSelectEvent,
}: {
  anchor: Date
  today: Date
  events: DemoCalendarEvent[]
  onSelectDay: (d: Date) => void
  onSelectEvent: (e: DemoCalendarEvent) => void
}) {
  const cells = getMonthGridCells(anchor)
  const monthStart = startOfMonth(anchor)

  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="grid grid-cols-7 border-b border-[var(--qos-border)] bg-white/[0.02]">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="px-1 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500"
          >
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day) => {
          const inMonth = day.getMonth() === monthStart.getMonth()
          const items = events
            .filter((e) => eventOnDay(e.startsAt, day))
            .sort(
              (a, b) =>
                new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
            )
          const visible = items.slice(0, 3)
          const more = items.length - visible.length

          return (
            <div
              key={day.toISOString()}
              className={cn(
                'min-h-[100px] border-b border-r border-[var(--qos-border)] p-1 sm:min-h-[110px] sm:p-1.5',
                !inMonth && 'bg-white/[0.01]',
              )}
            >
              <button
                type="button"
                onClick={() => onSelectDay(day)}
                className={cn(
                  'mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                  isSameDay(day, today)
                    ? 'bg-cyan-500 text-slate-950'
                    : inMonth
                      ? 'text-slate-200 hover:bg-white/10'
                      : 'text-slate-600',
                )}
              >
                {day.getDate()}
              </button>
              <ul className="space-y-0.5">
                {visible.map((ev) => (
                  <li key={ev.id}>
                    <button
                      type="button"
                      onClick={() => onSelectEvent(ev)}
                      className={cn(
                        'w-full truncate rounded border px-1 py-0.5 text-left text-[10px] font-medium leading-tight sm:text-[11px]',
                        KIND_STYLES[ev.kind],
                      )}
                      title={ev.title}
                    >
                      {formatTime(ev.startsAt)} {ev.title}
                    </button>
                  </li>
                ))}
                {more > 0 ? (
                  <li>
                    <button
                      type="button"
                      onClick={() => onSelectDay(day)}
                      className="text-[10px] font-medium text-cyan-400/90 hover:underline"
                    >
                      +{more} more
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function BookingCard({
  event,
  compact,
  onClick,
}: {
  event: DemoCalendarEvent
  compact?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-xl border text-left transition-colors hover:border-cyan-400/35',
        KIND_STYLES[event.kind],
        compact ? 'p-2' : 'glass-card p-4',
      )}
    >
      <p className={cn('font-semibold', compact ? 'text-xs' : 'text-base')}>
        {event.title}
      </p>
      {!compact ? (
        <p className="mt-1 text-sm text-slate-300/90">
          {formatCalendarTimeRange(event.startsAt, event.endsAt)}
        </p>
      ) : (
        <p className="text-[10px] opacity-90">{formatTime(event.startsAt)}</p>
      )}
      {event.customer ? (
        <p className={cn('text-slate-300/80', compact ? 'text-[10px]' : 'mt-1 text-sm')}>
          {event.customer}
          {event.suburb ? ` · ${event.suburb}` : ''}
        </p>
      ) : null}
      {!compact ? (
        <span className="mt-2 inline-block rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
          {getCalendarKindLabel(event.kind)}
        </span>
      ) : null}
    </button>
  )
}

export function CalendarExternalLinks({
  calendlyUrl,
  googleCalendarUrl,
}: {
  calendlyUrl: string
  googleCalendarUrl: string
}) {
  return (
    <>
      <ActionBtn href={googleCalendarUrl} variant="secondary">
        Google Calendar
      </ActionBtn>
      {calendlyUrl ? (
        <ActionBtn href={calendlyUrl} variant="ghost">
          Calendly
        </ActionBtn>
      ) : null}
    </>
  )
}
