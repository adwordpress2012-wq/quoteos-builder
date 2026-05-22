import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import { StatusBadge } from '../../components/command/StatusBadge'
import { InvoiceFormDrawer } from '../../components/command/forms/CommandForms'
import { formatDemoMoney } from '../../lib/demo/demo-data'
import type { InvoiceStatus } from '../../lib/demo/types'
import { useDemoStore } from '../../hooks/useDemoStore'

export function InvoicesPage() {
  const { invoices, quotes, createInvoice } = useDemoStore()
  const [searchParams] = useSearchParams()
  const [localStatuses, setLocalStatuses] = useState<Record<string, InvoiceStatus>>({})
  const [invoiceOpen, setInvoiceOpen] = useState(searchParams.get('action') === 'create')
  const [notice, setNotice] = useState('')
  const quoteId = searchParams.get('quoteId') ?? ''
  const quote = quotes.find((item) => item.id === quoteId)

  useEffect(() => {
    if (searchParams.get('action') === 'create' || quoteId) setInvoiceOpen(true)
  }, [quoteId, searchParams])

  const initialInvoice = useMemo(
    () =>
      quote
        ? {
            customer: quote.customer,
            linkedQuoteId: quote.id,
            amount: String(quote.amount),
          }
        : undefined,
    [quote],
  )

  const markPaid = (id: string) => {
    setLocalStatuses((current) => ({ ...current, [id]: 'paid' }))
  }

  return (
    <CommandCentreLayout
      title="Invoices"
      subtitle="PayID, bank transfer, and direct deposit for manual payments"
      actions={
        <ActionBtn variant="primary" onClick={() => setInvoiceOpen(true)}>
          Create Invoice
        </ActionBtn>
      }
    >
      {notice ? (
        <p className="mb-4 rounded-lg border border-cyan-400/25 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100">
          {notice}
        </p>
      ) : null}

      <ul className="space-y-4">
        {invoices.map((inv) => (
          <li key={inv.id} className="glass-card rounded-xl p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-sm text-cyan-400">{inv.invoiceNumber}</p>
                <h3 className="text-lg font-semibold text-slate-50">{inv.customer}</h3>
                <p className="text-sm text-slate-500">
                  Quote {inv.linkedQuoteId || 'manual'} - due {inv.dueDate}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-slate-50">
                  {formatDemoMoney(inv.amount)}
                </p>
                <StatusBadge status={localStatuses[inv.id] ?? inv.status} className="mt-1" />
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-500">{inv.paymentMethod}</p>

            <PageActions className="mt-4">
              <ActionBtn
                variant="primary"
                onClick={() => setNotice(`PDF invoice draft ready for ${inv.invoiceNumber}.`)}
              >
                Generate PDF Invoice
              </ActionBtn>
              <ActionBtn
                onClick={() =>
                  setNotice(
                    `Payment email drafted for ${inv.customer} with PayID / bank transfer instructions.`,
                  )
                }
              >
                Draft Payment Email
              </ActionBtn>
              <ActionBtn variant="ghost" onClick={() => markPaid(inv.id)}>
                Mark Paid
              </ActionBtn>
            </PageActions>
          </li>
        ))}
      </ul>

      <InvoiceFormDrawer
        open={invoiceOpen}
        initial={initialInvoice}
        onClose={() => setInvoiceOpen(false)}
        onSave={(values) => {
          const invoice = createInvoice({
            customer: values.customer,
            linkedQuoteId: values.linkedQuoteId,
            amount: parseFloat(values.amount) || 0,
            dueDate: values.dueDate,
          })
          setNotice(`Created draft invoice ${invoice.invoiceNumber}.`)
        }}
      />
    </CommandCentreLayout>
  )
}
