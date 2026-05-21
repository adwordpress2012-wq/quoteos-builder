import { formatAud, getQuoteDisplayTitle } from '../../lib/quoteos/calculations'
import { getPackagePriceById } from '../../lib/quoteos/pricing'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'
import { QUOTE_TYPE_OPTIONS } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

type ProposalPreviewProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  id?: string
  /** Slightly tighter styling when embedded in the live preview column */
  hero?: boolean
}

export function ProposalPreview({ quote, totals, id, hero }: ProposalPreviewProps) {
  const title = getQuoteDisplayTitle(quote)
  const quoteTypeLabel =
    QUOTE_TYPE_OPTIONS.find((o) => o.id === quote.quoteTypeId)?.label ?? 'Quote'
  const packagePreset = getPackagePriceById(quote.quoteTypeId)
  const packageLabel = packagePreset?.label ?? quoteTypeLabel

  const oneOffItems = quote.lineItems.filter((i) => i.billingType === 'one-off')
  const monthlyItems = quote.lineItems.filter((i) => i.billingType === 'monthly')
  const yearlyItems = quote.lineItems.filter((i) => i.billingType === 'yearly')

  const setupTotal = Number.isFinite(totals.oneOffTotal) ? totals.oneOffTotal : 0
  const recurringMonthly = Number.isFinite(totals.monthlyRecurringTotal)
    ? totals.monthlyRecurringTotal
    : 0

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
                <p className="text-xs text-cyan-400/90">Smart Quote Builder</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Powered by DOS — Directive Operating Systems
            </p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold text-cyan-300">Proposal</p>
            <p className="text-slate-400">{quoteTypeLabel}</p>
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

      {quote.quoteGenerated || quote.lineItems.length > 0 ? (
        <section className="mt-5 rounded-xl border border-purple-500/20 bg-purple-500/8 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
            Selected package
          </p>
          <p className="mt-1 text-lg font-semibold text-slate-50">{packageLabel}</p>
          <p className="mt-1 text-sm text-cyan-200/90">
            {setupTotal > 0 ? formatAud(setupTotal) : '—'} setup
            {recurringMonthly > 0
              ? ` · ${formatAud(recurringMonthly)}/month`
              : ''}
          </p>
        </section>
      ) : null}

      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Prepared for
          </h2>
          <p className="mt-2 font-medium text-slate-100">
            {quote.clientBusinessName || '—'}
          </p>
          {quote.contactName ? (
            <p className="text-sm text-slate-400">{quote.contactName}</p>
          ) : null}
          {quote.email ? (
            <p className="text-sm text-slate-400">{quote.email}</p>
          ) : null}
          {quote.phone ? (
            <p className="text-sm text-slate-400">{quote.phone}</p>
          ) : null}
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Project
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-200">
            {title}
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Line items
        </h2>
        <LineItemTable items={oneOffItems} suffix="" />
        {monthlyItems.length > 0 ? (
          <LineItemTable items={monthlyItems} suffix="/mo" title="Monthly" />
        ) : null}
        {yearlyItems.length > 0 ? (
          <LineItemTable items={yearlyItems} suffix="/yr" title="Yearly" />
        ) : null}
      </section>

      {quote.projectSummary.trim() ? (
        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Implementation notes
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {quote.projectSummary}
          </p>
        </section>
      ) : null}

      <section className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-4">
        <dl className="space-y-2 text-sm">
          <TotalRow label="Total" value={formatAud(totals.subtotal)} />
          <TotalRow
            label="Setup total"
            value={
              setupTotal > 0
                ? formatAud(setupTotal)
                : 'Pricing missing — please set price'
            }
            highlight
          />
          {recurringMonthly > 0 ? (
            <TotalRow
              label="Recurring total"
              value={`${formatAud(recurringMonthly)}/mo`}
            />
          ) : null}
          {totals.yearlyRecurringTotal > 0 ? (
            <TotalRow
              label="Ongoing"
              value={`${formatAud(totals.yearlyRecurringTotal)}/yr`}
            />
          ) : null}
          {quote.depositEnabled && totals.depositAmount > 0 ? (
            <>
              <TotalRow
                label="Deposit (50%)"
                value={formatAud(totals.depositAmount)}
              />
              <TotalRow
                label="Balance"
                value={formatAud(totals.remainingBalance)}
              />
            </>
          ) : null}
        </dl>
      </section>

      {quote.inclusions.length > 0 ? (
        <section className="mt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Inclusions
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-300">
            {quote.inclusions.map((inc) => (
              <li key={inc}>{inc}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Payment terms
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          {quote.paymentTerms || 'As agreed.'}
        </p>
      </section>

      <footer className="mt-8 border-t border-blue-500/15 pt-6">
        <p className="text-sm font-medium text-cyan-300">
          Ready to proceed? Reply to accept this quote or contact us with any
          questions.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Generated with QuoteOS SQB · quoteos.com.au
        </p>
      </footer>
    </article>
  )
}

function LineItemTable({
  items,
  suffix,
  title,
}: {
  items: QuoteFormState['lineItems']
  suffix: string
  title?: string
}) {
  if (items.length === 0) return null
  return (
    <table className="mt-3 w-full text-sm">
      {title ? (
        <caption className="mb-1 text-left text-xs font-medium text-slate-500">
          {title}
        </caption>
      ) : null}
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b border-blue-500/10">
            <td className="py-2 pr-4 text-slate-300">{item.label || '—'}</td>
            <td className="py-2 text-right font-medium text-slate-100">
              {formatAud(item.amount)}
              {suffix}
            </td>
          </tr>
        ))}
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
