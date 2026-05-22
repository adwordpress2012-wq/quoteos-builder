import { useState } from 'react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import { StatusBadge } from '../../components/command/StatusBadge'
import { DEMO_INVOICES, formatDemoMoney } from '../../lib/demo/demo-data'
import type { DemoInvoice, InvoiceStatus } from '../../lib/demo/types'

export function InvoicesPage() {
  const [invoices, setInvoices] = useState<DemoInvoice[]>(DEMO_INVOICES)

  const markPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'paid' as InvoiceStatus } : inv,
      ),
    )
  }

  return (
    <CommandCentreLayout
      title="Invoices"
      subtitle="PayID, bank transfer, direct deposit — no Stripe yet"
    >
      <ul className="space-y-4">
        {invoices.map((inv) => (
          <li key={inv.id} className="glass-card rounded-xl p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-sm text-cyan-400">{inv.invoiceNumber}</p>
                <h3 className="text-lg font-semibold text-slate-50">{inv.customer}</h3>
                <p className="text-sm text-slate-500">
                  Quote {inv.linkedQuoteId} · due {inv.dueDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-slate-50">
                  {formatDemoMoney(inv.amount)}
                </p>
                <StatusBadge status={inv.status} className="mt-1" />
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-500">{inv.paymentMethod}</p>

            <PageActions className="mt-4">
              <ActionBtn variant="primary">Generate PDF Invoice</ActionBtn>
              <ActionBtn>Draft Payment Email</ActionBtn>
              <ActionBtn variant="ghost" onClick={() => markPaid(inv.id)}>
                Mark Paid
              </ActionBtn>
            </PageActions>
          </li>
        ))}
      </ul>
    </CommandCentreLayout>
  )
}
