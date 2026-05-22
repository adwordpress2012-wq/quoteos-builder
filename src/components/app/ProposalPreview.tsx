import { formatAud, getQuoteDisplayTitle } from '../../lib/quoteos/calculations'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

type ProposalPreviewProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  id?: string
  hero?: boolean
}

export function ProposalPreview({ quote, totals, id, hero }: ProposalPreviewProps) {
  const title = getQuoteDisplayTitle(quote)
  const hasPayId = quote.paymentPayId.trim()
  const hasBankDetails =
    quote.paymentAccountName.trim() ||
    quote.paymentBsb.trim() ||
    quote.paymentAccountNumber.trim()

  return (
    <article
      id={id}
      className={cn(
        'proposal-print-root glass-card rounded-2xl border border-blue-500/30 bg-white/[0.03] text-slate-200 shadow-[var(--qos-glow-blue),0_0_60px_rgba(139,92,246,0.12)]',
        hero ? 'p-4 sm:p-5' : 'p-6 sm:p-8',
      )}
    >
      <header className="border-b border-blue-500/20 pb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/40 bg-gradient-to-br from-blue-600/30 to-purple-500/20 text-base font-bold text-cyan-200">
                Q
              </span>
              <div>
                <p className="text-xl font-semibold text-slate-50">QuoteOS</p>
                <p className="text-xs text-cyan-400/90">
                  Business logo placeholder
                </p>
              </div>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold text-cyan-300">Quote number</p>
            <p className="text-slate-400">{quote.quoteNumber || '-'}</p>
            {quote.quoteExpiryDate ? (
              <p className="mt-1 text-xs text-slate-500">
                Valid until {quote.quoteExpiryDate}
              </p>
            ) : null}
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          {title}
        </h1>
      </header>

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Customer
          </h2>
          <p className="mt-2 font-medium text-slate-100">
            {quote.clientBusinessName || '-'}
          </p>
          {quote.contactName ? <p className="text-sm text-slate-400">{quote.contactName}</p> : null}
          {quote.email ? <p className="text-sm text-slate-400">{quote.email}</p> : null}
          {quote.phone ? <p className="text-sm text-slate-400">{quote.phone}</p> : null}
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Job address
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-200">
            {quote.jobAddress || '-'}
          </p>
        </div>
      </section>

      {quote.projectSummary.trim() ? (
        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Job description
          </h2>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-300">
            {quote.projectSummary}
          </p>
        </section>
      ) : null}

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Line items
        </h2>
        <LineItemTable items={quote.lineItems} />
      </section>

      <section className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-4">
        <dl className="space-y-2 text-sm">
          <TotalRow label="Total" value={formatAud(totals.subtotal)} highlight />
          {quote.depositEnabled && totals.depositAmount > 0 ? (
            <>
              <TotalRow label="Deposit (50%)" value={formatAud(totals.depositAmount)} />
              <TotalRow label="Balance" value={formatAud(totals.remainingBalance)} />
            </>
          ) : null}
        </dl>
      </section>

      {quote.internalNotes.trim() ? (
        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Notes
          </h2>
          <p className="mt-2 whitespace-pre-line text-sm text-slate-300">
            {quote.internalNotes}
          </p>
        </section>
      ) : null}

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Payment instructions
        </h2>
        <div className="mt-2 space-y-3 text-sm text-slate-300">
          {hasPayId ? (
            <dl className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-3">
              <PaymentDetail label="PayID" value={quote.paymentPayId} />
            </dl>
          ) : (
            <dl className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-3">
              <PaymentDetail label="PayID" value="Not supplied" />
            </dl>
          )}
          {hasBankDetails ? (
            <dl className="grid gap-2 rounded-xl border border-blue-500/15 bg-blue-500/5 p-3">
              {quote.paymentAccountName.trim() ? (
                <PaymentDetail
                  label="Account name"
                  value={quote.paymentAccountName}
                />
              ) : null}
              {quote.paymentBsb.trim() ? (
                <PaymentDetail label="BSB" value={quote.paymentBsb} />
              ) : null}
              {quote.paymentAccountNumber.trim() ? (
                <PaymentDetail
                  label="Account number"
                  value={quote.paymentAccountNumber}
                />
              ) : null}
            </dl>
          ) : (
            <dl className="grid gap-2 rounded-xl border border-blue-500/15 bg-blue-500/5 p-3">
              <PaymentDetail label="Bank details" value="Not supplied" />
            </dl>
          )}
          <p className="whitespace-pre-line">
            {quote.paymentInstructions || quote.paymentTerms || 'As agreed.'}
          </p>
        </div>
      </section>

      <footer className="mt-8 border-t border-blue-500/15 pt-6">
        <p className="text-sm font-medium text-cyan-300">
          Reply to accept this quote or contact us with any questions.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Generated with QuoteOS Trade Quote Builder
        </p>
      </footer>
    </article>
  )
}

function PaymentDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      <dt className="font-medium text-slate-400">{label}</dt>
      <dd className="font-semibold text-slate-100">{value}</dd>
    </div>
  )
}

function LineItemTable({ items }: { items: QuoteFormState['lineItems'] }) {
  if (items.length === 0) {
    return (
      <p className="mt-3 rounded-xl border border-blue-500/15 bg-blue-500/5 p-3 text-sm text-slate-400">
        No line items added yet.
      </p>
    )
  }
  return (
    <table className="mt-3 w-full text-sm">
      <thead>
        <tr className="border-b border-blue-500/20 text-xs uppercase tracking-wider text-slate-500">
          <th className="py-2 pr-3 text-left font-semibold">Item</th>
          <th className="py-2 px-3 text-right font-semibold">Qty</th>
          <th className="py-2 px-3 text-right font-semibold">Unit price</th>
          <th className="py-2 pl-3 text-right font-semibold">Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const lineTotal = (item.quantity || 0) * (item.amount || 0)
          return (
            <tr key={item.id} className="border-b border-blue-500/10">
              <td className="py-2 pr-3 text-slate-300">{item.label || '-'}</td>
              <td className="py-2 px-3 text-right text-slate-300">{item.quantity || 0}</td>
              <td className="py-2 px-3 text-right text-slate-300">{formatAud(item.amount)}</td>
              <td className="py-2 pl-3 text-right font-medium text-slate-100">
                {formatAud(lineTotal)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function TotalRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={highlight ? 'font-semibold text-slate-200' : 'text-slate-400'}>
        {label}
      </dt>
      <dd className={highlight ? 'font-semibold text-cyan-300' : 'text-slate-200'}>
        {value}
      </dd>
    </div>
  )
}
