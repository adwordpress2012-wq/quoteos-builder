import { Link } from 'react-router-dom'
import {
  CalendarPlus,
  FileText,
  Receipt,
  UserPlus,
  Wallet,
} from 'lucide-react'
import { cn } from '../../../lib/utils'

type QuickAction = {
  label: string
  href: string
  icon: typeof FileText
  primary?: boolean
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'New Quote',
    href: '/app/builder',
    icon: FileText,
    primary: true,
  },
  { label: 'Add Lead', href: '/app/leads', icon: UserPlus },
  { label: 'Add Booking', href: '/app/bookings', icon: CalendarPlus },
  { label: 'Create Invoice', href: '/app/invoices', icon: Receipt },
  { label: 'Add Expense', href: '/app/tools', icon: Wallet },
]

export function QuickActionsRow() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        Quick Actions
      </h2>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.label}
              to={action.href}
              className={cn(
                'inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors',
                'primary' in action && action.primary
                  ? 'border-blue-400/45 bg-gradient-to-r from-blue-600/40 to-purple-600/30 text-white shadow-[var(--qos-glow-blue)] hover:border-cyan-400/50'
                  : 'border-[var(--qos-border)] bg-white/[0.04] text-slate-200 hover:border-cyan-400/35 hover:bg-white/[0.06]',
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {action.label}
            </Link>
          )
        })}
      </div>
      <p className="mt-2 text-[11px] text-slate-600">
        Shortcuts open the relevant workspace — nothing sends automatically.
      </p>
    </section>
  )
}
