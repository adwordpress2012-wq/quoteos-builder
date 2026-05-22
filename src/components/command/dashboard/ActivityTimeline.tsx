import { Link } from 'react-router-dom'
import {
  CalendarPlus,
  FileText,
  Receipt,
  UserPlus,
} from 'lucide-react'
import { RECENT_ACTIVITY } from '../../../lib/demo/demo-data'
import type { RecentActivityType } from '../../../lib/demo/types'
import { cn } from '../../../lib/utils'

const ACTIVITY_META: Record<
  RecentActivityType,
  { icon: typeof FileText; label: string; dotClass: string }
> = {
  'quote-sent': {
    icon: FileText,
    label: 'Quote',
    dotClass: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]',
  },
  'invoice-paid': {
    icon: Receipt,
    label: 'Invoice',
    dotClass: 'bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.5)]',
  },
  'booking-created': {
    icon: CalendarPlus,
    label: 'Booking',
    dotClass: 'bg-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]',
  },
  'lead-added': {
    icon: UserPlus,
    label: 'Lead',
    dotClass: 'bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]',
  },
}

export function ActivityTimeline() {
  return (
    <section
      className="glass-card rounded-2xl p-4 sm:p-5"
      aria-labelledby="activity-timeline-heading"
    >
      <h2
        id="activity-timeline-heading"
        className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90"
      >
        Recent Activity
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Latest moves across quotes, invoices, bookings, and leads
      </p>

      <ol className="relative mt-5 space-y-0">
        {RECENT_ACTIVITY.map((item, index) => {
          const meta = ACTIVITY_META[item.type]
          const Icon = meta.icon
          const isLast = index === RECENT_ACTIVITY.length - 1

          return (
            <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast ? (
                <span
                  className="absolute left-[11px] top-7 bottom-0 w-px bg-gradient-to-b from-blue-500/40 to-transparent"
                  aria-hidden="true"
                />
              ) : null}
              <span
                className={cn(
                  'relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                  meta.dotClass,
                )}
                aria-hidden="true"
              >
                <Icon className="h-3 w-3 text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <Link
                  to={item.href}
                  className="group block rounded-lg pr-2 transition-colors hover:bg-white/[0.03]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-semibold text-slate-100 group-hover:text-cyan-100">
                      {item.title}
                    </p>
                    <time className="text-[11px] font-medium text-slate-500">
                      {item.timeLabel}
                    </time>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">{item.description}</p>
                  <span className="mt-1 inline-block text-[11px] font-medium text-cyan-400/80 opacity-0 transition-opacity group-hover:opacity-100">
                    View →
                  </span>
                </Link>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
