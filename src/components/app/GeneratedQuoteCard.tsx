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
  formatQuoteAmountLine,
  getPackageDisplayName,
  getRecurringAmountLine,
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
  const setupLine =
    totals.oneOffTotal > 0
      ? `${formatAud(totals.oneOffTotal)} One-off setup`
      : null
  const recurring = getRecurringAmountLine(totals)
  const recurringLine = recurring
    ? recurring.includes('/month')
      ? `${recurring.replace('/month', '')}/month Recurring support`
      : `${recurring} support`
    : null
  const summary =
    quote.projectSummary.trim() ||
    quote.inclusions.slice(0, 1).join('') ||
    formatQuoteAmountLine(totals)

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
          {setupLine ? (
            <p className="text-base font-bold text-slate-50">{setupLine}</p>
          ) : null}
          {recurringLine ? (
            <p className="text-sm font-medium text-purple-200">{recurringLine}</p>
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
        <ActionBtn icon={Sparkles} label="Review Quote" onClick={onReview} primary />
        <ActionBtn icon={Pencil} label="Edit Items" onClick={onEditItems} />
        <ActionBtn icon={Link2} label="Copy Link" onClick={onCopyLink} />
        <ActionBtn icon={Send} label="Send Quote" onClick={onSendQuote} accent />
      </div>
    </section>
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
