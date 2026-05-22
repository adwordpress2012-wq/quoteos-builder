import { Link, useNavigate } from 'react-router-dom'
import {
  CalendarPlus,
  FileText,
  Receipt,
  UserPlus,
  Wallet,
} from 'lucide-react'
import { cn } from '../../../lib/utils'

type QuickAction =
  | {
      label: string
      icon: typeof FileText
      primary?: boolean
      kind: 'link'
      href: string
    }
  | {
      label: string
      icon: typeof FileText
      primary?: boolean
      kind: 'navigate'
      path: string
      state?: Record<string, unknown>
    }
  | {
      label: string
      icon: typeof FileText
      primary?: boolean
      kind: 'callback'
      onClick: () => void
    }

type QuickActionsRowProps = {
  onAddExpense?: () => void
  onCreateInvoice?: () => void
}

export function QuickActionsRow({
  onAddExpense,
  onCreateInvoice,
}: QuickActionsRowProps) {
  const navigate = useNavigate()

  const actions: QuickAction[] = [
    {
      label: 'New Quote',
      href: '/app/builder',
      icon: FileText,
      primary: true,
      kind: 'link',
    },
    {
      label: 'Add Lead',
      path: '/app/leads?action=add',
      state: { openAdd: true },
      icon: UserPlus,
      kind: 'navigate',
    },
    {
      label: 'Add Booking',
      path: '/app/bookings?action=add',
      state: { openAdd: true },
      icon: CalendarPlus,
      kind: 'navigate',
    },
    {
      label: 'Create Invoice',
      icon: Receipt,
      kind: 'callback',
      onClick: () =>
        onCreateInvoice ? onCreateInvoice() : navigate('/app/invoices?action=create'),
    },
    {
      label: 'Add Expense',
      icon: Wallet,
      kind: 'callback',
      onClick: () =>
        onAddExpense ? onAddExpense() : navigate('/app/tools?action=expense'),
    },
  ]

  return (
    <section aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="text-xs font-semibold uppercase tracking-wider text-slate-500"
      >
        Quick Actions
      </h2>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {actions.map((action) => {
          const Icon = action.icon
          const className = cn(
            'inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors',
            action.primary
              ? 'border-blue-400/45 bg-gradient-to-r from-blue-600/40 to-purple-600/30 text-white shadow-[var(--qos-glow-blue)] hover:border-cyan-400/50'
              : 'border-[var(--qos-border)] bg-white/[0.04] text-slate-200 hover:border-cyan-400/35 hover:bg-white/[0.06]',
          )

          if (action.kind === 'link') {
            return (
              <Link key={action.label} to={action.href} className={className}>
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {action.label}
              </Link>
            )
          }

          if (action.kind === 'navigate') {
            return (
              <button
                key={action.label}
                type="button"
                className={className}
                onClick={() => navigate(action.path, { state: action.state })}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {action.label}
              </button>
            )
          }

          return (
            <button
              key={action.label}
              type="button"
              className={className}
              onClick={action.onClick}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {action.label}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-[11px] text-slate-600">
        Shortcuts open forms or workspaces — nothing sends automatically.
      </p>
    </section>
  )
}
