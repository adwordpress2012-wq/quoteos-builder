import { Copy, FileText, Printer } from 'lucide-react'
import { formatAud } from '../../lib/quoteos/calculations'
import { generateFollowUpSuggestion } from '../../lib/quoteos/micah'
import {
  formatQuoteAmountLine,
  getPackageDisplayName,
  getRecurringAmountLine,
} from '../../lib/quoteos/quote-display'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

const STATUS_LABEL: Record<QuoteFormState['quoteStatus'], string> = {
  draft: 'Draft',
  sent: 'Sent',
  'follow-up': 'Follow-Up',
  accepted: 'Accepted',
  lost: 'Lost',
}

type GeneratedQuoteCardProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  setup?: SqbaSetupConfig | null
  micahNote?: string
  onReview: () => void
  onCopyEmail: () => void
  onPrint: () => void
}

export function GeneratedQuoteCard({
  quote,
  totals,
  setup,
  micahNote,
  onReview,
  onCopyEmail,
  onPrint,
}: GeneratedQuoteCardProps) {
  if (!quote.quoteGenerated) return null

  const packageName = getPackageDisplayName(quote, setup)
  const amountLine = formatQuoteAmountLine(totals)
  const recurring = getRecurringAmountLine(totals)
  const followUp = generateFollowUpSuggestion(quote, setup)
  const clientLabel =
    quote.clientBusinessName.trim() || quote.contactName.trim() || 'Add client name'

  return (
    <section className="glass-card rounded-2xl p-5 shadow-[var(--qos-glow-blue)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Package
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-50 sm:text-xl">
            {packageName}
          </h3>
        </div>
        <span
          className={cn(
            'rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
            quote.quoteStatus === 'accepted'
              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200'
              : quote.quoteStatus === 'lost'
                ? 'border-slate-500/40 bg-slate-500/10 text-slate-400'
                : 'border-cyan-500/35 bg-cyan-500/10 text-cyan-200',
          )}
        >
          {STATUS_LABEL[quote.quoteStatus]}
        </span>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs text-slate-500">Client</dt>
          <dd className="mt-0.5 text-base font-medium text-slate-100">
            {clientLabel}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Amount</dt>
          <dd className="mt-0.5 text-base font-semibold text-cyan-300">
            {amountLine}
          </dd>
        </div>
        {recurring ? (
          <div className="sm:col-span-2">
            <dt className="text-xs text-slate-500">Recurring</dt>
            <dd className="mt-0.5 text-sm text-purple-200">{recurring}</dd>
          </div>
        ) : null}
        {totals.oneOffTotal > 0 ? (
          <div className="hidden sm:block">
            <dt className="text-xs text-slate-500">One-off total</dt>
            <dd className="mt-0.5 text-sm text-slate-300">
              {formatAud(totals.oneOffTotal)}
            </dd>
          </div>
        ) : null}
      </dl>

      <p className="mt-4 rounded-xl border border-blue-500/15 bg-blue-500/5 px-3 py-2.5 text-sm text-slate-400">
        <span className="font-medium text-cyan-300/90">Follow-up: </span>
        {followUp.nextStep || followUp.recommendation}
      </p>

      {micahNote ? (
        <p className="mt-3 text-sm italic text-slate-500">
          <span className="font-medium not-italic text-purple-300/90">
            Micah:{' '}
          </span>
          {micahNote}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <ActionBtn icon={FileText} label="Review Quote" onClick={onReview} primary />
        <ActionBtn icon={Copy} label="Copy Email" onClick={onCopyEmail} />
        <ActionBtn icon={Printer} label="Print / Save PDF" onClick={onPrint} />
      </div>
    </section>
  )
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  primary,
}: {
  icon: typeof FileText
  label: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all',
        primary
          ? 'border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/30 text-white shadow-[var(--qos-glow-blue)]'
          : 'border-blue-500/25 bg-blue-500/8 text-cyan-200 hover:border-cyan-400/35',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}
