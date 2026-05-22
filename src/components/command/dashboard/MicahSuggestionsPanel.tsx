import { Link } from 'react-router-dom'
import { ListChecks } from 'lucide-react'
import { MICAH_DASHBOARD_REMINDERS } from '../../../lib/demo/demo-data'

export function MicahSuggestionsPanel() {
  return (
    <section
      className="glass-card rounded-2xl border-blue-500/20 p-4 sm:p-5"
      aria-labelledby="micah-suggestions-heading"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2
            id="micah-suggestions-heading"
            className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90"
          >
            Micah Suggestions
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Reminders for today — review before you act
          </p>
        </div>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10"
          aria-hidden="true"
        >
          <ListChecks className="h-4 w-4 text-cyan-300" />
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {MICAH_DASHBOARD_REMINDERS.map((item) => (
          <li key={item.id}>
            <Link
              to={item.href}
              className="block rounded-lg border border-[var(--qos-border)] bg-white/[0.03] px-3 py-2.5 text-sm leading-snug text-slate-300 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.05] hover:text-slate-100"
            >
              <span className="font-medium text-slate-200">{item.label}</span>
              <span className="mt-0.5 block text-xs text-slate-500">
                {item.hint}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[11px] text-slate-600">
        Demo reminders only. Micah prepares drafts — you send quotes and invoices.
      </p>
    </section>
  )
}
