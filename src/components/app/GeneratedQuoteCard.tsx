import {
  Check,
  Globe,
  Link2,
  Mail,
  MessageSquare,
  Pencil,
  Send,
  Sparkles,
} from 'lucide-react'
import { formatAud } from '../../lib/quoteos/calculations'
import {
  getPackagePriceById,
  validateQuotePricing,
} from '../../lib/quoteos/pricing'
import {
  getPackageDisplayName,
} from '../../lib/quoteos/quote-display'
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
  onReview: () => void
  onEditItems: () => void
  onCopyLink: () => void
  onSendQuote: () => void
  onStatusChange: (status: QuoteStatus) => void
}

export function GeneratedQuoteCard({
  quote,
  totals,
  setup,
  onReview,
  onEditItems,
  onCopyLink,
  onSendQuote,
  onStatusChange,
}: GeneratedQuoteCardProps) {
  if (!quote.quoteGenerated) return null

  const packageName = getPackageDisplayName(quote, setup)
  const packagePrice = getPackagePriceById(quote.quoteTypeId)
  const validation = validateQuotePricing(quote)
  const hasValidTotals = [
    totals.oneOffTotal,
    totals.monthlyRecurringTotal,
    totals.yearlyRecurringTotal,
    totals.depositAmount,
    totals.remainingBalance,
  ].every(Number.isFinite)
  const summary =
    quote.projectSummary.trim() ||
    quote.inclusions.slice(0, 1).join('') ||
    packagePrice?.suggestedSummary ||
    'Pricing missing — please set price'

  return (
    <section className="glass-card rounded-2xl p-5 shadow-[var(--qos-glow-blue)] sm:p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
        Suggested by Micah
      </p>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
              {packageName}
            </h3>
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-200">
              Great fit
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{summary}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2 text-right">
          {!validation.canSend ? (
            <p className="rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-100">
              Pricing missing — please set price
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

      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <PricePill
          label="Today / setup"
          value={
            hasValidTotals && totals.oneOffTotal > 0
              ? formatAud(totals.oneOffTotal)
              : 'Pricing missing — please set price'
          }
          strong={totals.oneOffTotal > 0}
        />
        <PricePill
          label="Ongoing"
          value={formatOngoing(totals.monthlyRecurringTotal, totals.yearlyRecurringTotal)}
          muted={
            totals.monthlyRecurringTotal <= 0 && totals.yearlyRecurringTotal <= 0
          }
        />
        {quote.depositEnabled ? (
          <PricePill label="Deposit" value={formatAud(totals.depositAmount)} />
        ) : null}
        {quote.depositEnabled ? (
          <PricePill label="Balance" value={formatAud(totals.remainingBalance)} />
        ) : null}
      </div>

      {quote.inclusions.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {quote.inclusions.map((item) => (
            <li key={item}>
              <InclusionChip label={item} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {quote.lineItems.slice(0, 5).map((item) => (
            <li key={item.id}>
              <InclusionChip label={item.label} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <ActionBtn icon={Sparkles} label="View proposal" onClick={onReview} primary />
        <ActionBtn icon={Pencil} label="Edit Items" onClick={onEditItems} />
        <ActionBtn icon={Link2} label="Copy Link" onClick={onCopyLink} />
        <ActionBtn icon={Send} label="Send quote" onClick={onSendQuote} accent />
      </div>
    </section>
  )
}

function formatOngoing(monthly: number, yearly: number): string {
  const parts: string[] = []
  if (Number.isFinite(monthly) && monthly > 0) {
    parts.push(`${formatAud(monthly)}/month`)
  }
  if (Number.isFinite(yearly) && yearly > 0) {
    parts.push(`${formatAud(yearly)}/year`)
  }
  return parts.join(' + ') || 'No ongoing support'
}

function PricePill({
  label,
  value,
  strong,
  muted,
}: {
  label: string
  value: string
  strong?: boolean
  muted?: boolean
}) {
  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/8 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={cn(
          'mt-1 text-sm font-semibold',
          strong ? 'text-slate-50' : muted ? 'text-slate-500' : 'text-cyan-200',
        )}
      >
        {value}
      </p>
    </div>
  )
}

function InclusionChip({ label }: { label: string }) {
  const iconType = pickInclusionIconType(label)
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1.5 text-xs text-slate-300">
      <InclusionIcon type={iconType} />
      {label}
    </span>
  )
}

type InclusionIconType = 'mail' | 'chat' | 'globe' | 'check' | 'sparkles'

function pickInclusionIconType(label: string): InclusionIconType {
  const lower = label.toLowerCase()
  if (/email|mail/.test(lower)) return 'mail'
  if (/chat|widget|micah|ai/.test(lower)) return 'chat'
  if (/google|seo|analytics|search/.test(lower)) return 'globe'
  if (/support|hosting|month/.test(lower)) return 'check'
  return 'sparkles'
}

function InclusionIcon({ type }: { type: InclusionIconType }) {
  const className = 'h-3.5 w-3.5 shrink-0 text-cyan-400/90'
  switch (type) {
    case 'mail':
      return <Mail className={className} aria-hidden="true" />
    case 'chat':
      return <MessageSquare className={className} aria-hidden="true" />
    case 'globe':
      return <Globe className={className} aria-hidden="true" />
    case 'check':
      return <Check className={className} aria-hidden="true" />
    default:
      return <Sparkles className={className} aria-hidden="true" />
  }
}

function ActionBtn({
  icon: Icon,
  label,
  onClick,
  primary,
  accent,
}: {
  icon: typeof Sparkles
  label: string
  onClick: () => void
  primary?: boolean
  accent?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all',
        primary
          ? 'col-span-2 border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/30 text-white shadow-[var(--qos-glow-blue)] sm:col-span-1 sm:flex-1'
          : accent
            ? 'border-purple-400/40 bg-gradient-to-r from-purple-600/35 to-blue-600/25 text-white'
            : 'border-blue-500/25 bg-blue-500/8 text-cyan-200 hover:border-cyan-400/35',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}
