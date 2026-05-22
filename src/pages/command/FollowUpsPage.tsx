import { useState } from 'react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import { DEMO_FOLLOW_UPS } from '../../lib/demo/demo-data'
import type { DemoFollowUp } from '../../lib/demo/types'
import { cn } from '../../lib/utils'

const KIND_LABELS: Record<DemoFollowUp['kind'], string> = {
  quote: 'Quote not replied',
  invoice: 'Invoice unpaid',
  booking: 'Booking pending',
  customer: 'Customer needs reply',
}

export function FollowUpsPage() {
  const [items, setItems] = useState(DEMO_FOLLOW_UPS)

  const markDone = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <CommandCentreLayout
      title="Follow-Ups"
      subtitle="Quotes, invoices, bookings, and customers needing a nudge"
    >
      <ul className="space-y-4">
        {items.length === 0 ? (
          <li className="glass-card rounded-xl p-8 text-center text-slate-500">
            All caught up — nothing due right now.
          </li>
        ) : (
          items.map((item) => (
            <li
              key={item.id}
              className={cn(
                'glass-card rounded-xl p-4 sm:p-5',
                item.priority === 'high' && 'border-red-500/20',
              )}
            >
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {KIND_LABELS[item.kind]}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-50">{item.title}</h3>
              <p className="text-sm text-slate-400">
                {item.customer} · {item.dueLabel}
              </p>

              <PageActions className="mt-4">
                <ActionBtn to="/app/builder" variant="primary">
                  Draft Follow-Up Email
                </ActionBtn>
                <ActionBtn to="/app/customers">Open Customer</ActionBtn>
                <ActionBtn variant="ghost" onClick={() => markDone(item.id)}>
                  Mark Done
                </ActionBtn>
              </PageActions>
            </li>
          ))
        )}
      </ul>
    </CommandCentreLayout>
  )
}
