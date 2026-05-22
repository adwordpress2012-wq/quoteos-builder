import { FileDown, Mail, Pencil, Send } from 'lucide-react'
import { formatAud, getQuoteDisplayTitle } from '../../lib/quoteos/calculations'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { QuoteFormState, QuoteStatus, QuoteTotals } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'
import { builderSelectClass } from './builder-styles'

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'follow-up', label: 'Follow-Up' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'lost', label: 'Lost' },
]

type GeneratedQuoteCardProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  setup?: SqbaSetupConfig | null
  onEditItems: () => void
  onExportPdf: () => void
  onCopyEmail: () => void
  onSendQuote: () => void
  onStatusChange: (status: QuoteStatus) => void
}

export function GeneratedQuoteCard({
  quote,
  totals,
  onEditItems,
  onExportPdf,
  onCopyEmail,
  onSendQuote,
  onStatusChange,
}: GeneratedQuoteCardProps) {
  const title = getQuoteDisplayTitle(quote)
  const hasPrice = totals.subtotal > 0

  return (
    <section className="glass-card rounded-2xl p-5 shadow-[var(--qos-glow-blue)] sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
        Manual trade quote
      </p>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Quote {quote.quoteNumber || '-'} {quote.jobAddress ? `- ${quote.jobAddress}` : ''}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 text-right">
          {!hasPrice ? (
            <p className="rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-100">
              Add manual pricing before sending
            </p>
          ) : null}
          <label className="sr-only" htmlFor="quote-status-select">
            Quote status
          </label>
          <select
            id="quote-status-select"
            className={cn(builderSelectClass, 'min-h-[40px] py-2 text-sm')}
            value={quote.quoteStatus}
            onChange={(e) => onStatusChange(e.target.value as QuoteStatus)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <PricePill
          label="Total"
          value={hasPrice ? formatAud(totals.subtotal) : 'Pricing missing'}
          strong={hasPrice}
        />
        {quote.depositEnabled ? (
          <PricePill label="Deposit" value={formatAud(totals.depositAmount)} />
        ) : null}
        {quote.depositEnabled ? (
          <PricePill label="Balance" value={formatAud(totals.remainingBalance)} />
        ) : null}
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {quote.lineItems.slice(0, 5).map((item) => (
          <li key={item.id}>
            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1.5 text-xs text-slate-300">
              {item.label || 'Custom item'}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <ActionBtn icon={Pencil} label="Edit Items" onClick={onEditItems} />
        <ActionBtn icon={FileDown} label="Export PDF" onClick={onExportPdf} />
        <ActionBtn icon={Mail} label="Copy Email" onClick={onCopyEmail} />
        <ActionBtn icon={Send} label="Send Quote" onClick={onSendQuote} accent />
      </div>
    </section>
  )
}

function PricePill({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className={cn('mt-1 text-sm font-semibold', strong ? 'text-slate-50' : 'text-cyan-200')}>
        {value}
      </p>
    </div>
  )
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  accent,
}: {
  icon: typeof Pencil
  label: string
  onClick: () => void
  accent?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all',
        accent
          ? 'border-purple-400/40 bg-gradient-to-r from-purple-600/35 to-blue-600/25 text-white sm:col-span-1'
          : 'border-blue-500/25 bg-blue-500/8 text-cyan-200 hover:border-cyan-400/35',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}
