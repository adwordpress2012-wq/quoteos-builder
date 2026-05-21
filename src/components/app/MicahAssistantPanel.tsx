import {
  FileText,
  HeartPulse,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import {
  formatMicahQuickQuote,
  generateCustomerMemoryPlaceholder,
  generateDealStrategy,
  generateFollowUpSuggestion,
  generateInvoiceSuggestion,
  generateMicahSuggestion,
  generateQuickQuoteFromPrompt,
  generateQuoteHealth,
  generateSmsDraft,
} from '../../lib/quoteos/micah'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import { getDeliveryLabel } from '../../lib/quoteos/setup-wizard'
import { MICAH_ACTIONS, type MicahActionId } from '../../lib/quoteos/types'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

const EMAIL_ACTIONS: MicahActionId[] = [
  'fix-grammar',
  'make-professional',
  'make-casual-au',
  'improve-cta',
  'create-shorter',
]

type MicahAssistantPanelProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  emailDraft: string
  onEmailDraftChange: (text: string) => void
  setup?: SqbaSetupConfig | null
  onApplyPackageTier?: () => void
  className?: string
}

export function MicahAssistantPanel({
  quote,
  emailDraft,
  onEmailDraftChange,
  setup,
  className,
}: MicahAssistantPanelProps) {
  const sourcePrompt =
    quote.micahPrompt || quote.projectSummary || quote.projectTitle || emailDraft
  const quickQuote = generateQuickQuoteFromPrompt(
    sourcePrompt,
    quote.businessTypeId,
    setup,
  )
  const dealStrategy = generateDealStrategy(quote)
  const quoteHealth = generateQuoteHealth(quote)
  const followUp = generateFollowUpSuggestion(quote, setup)
  const smsDraft = generateSmsDraft(quote)
  const invoiceSuggestion = generateInvoiceSuggestion(quote)
  const memorySummary = generateCustomerMemoryPlaceholder(quote)

  const runEmailAction = (action: MicahActionId) => {
    const result = generateMicahSuggestion(action, {
      text: emailDraft,
      contactName: quote.contactName,
      projectTitle: quote.projectTitle,
      businessName: quote.clientBusinessName,
    })
    onEmailDraftChange(result.text)
  }

  return (
    <aside
      className={cn(
        'glass-card flex flex-col rounded-2xl p-4 sm:p-5',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-blue-500/15 pb-4">
        <span className="icon-block-purple flex h-12 w-12 items-center justify-center rounded-xl">
          <Sparkles className="h-6 w-6 text-purple-200" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Assistant
          </p>
          <h2 className="text-lg font-semibold text-slate-50">Micah</h2>
          <p className="text-xs text-slate-500">
            Local SQBA MVP - review before sending
            {setup?.completed && setup.delivery !== 'email'
              ? ` · ${getDeliveryLabel(setup.delivery)}`
              : ''}
          </p>
        </div>
      </div>

      <section className="mt-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Sparkles className="h-4 w-4 text-purple-300" aria-hidden="true" />
          Quick Quote Generator
        </h3>
        <div className="mt-2 rounded-lg border border-purple-500/20 bg-purple-500/8 px-3 py-2.5">
          <p className="text-sm font-semibold text-slate-100">
            {quickQuote.packageName}
          </p>
          <p className="mt-1 text-sm leading-snug text-slate-400">
            {quickQuote.dealNote}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            {quickQuote.inclusions.slice(0, 4).map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-3 min-h-[40px] rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-medium text-cyan-100 hover:border-cyan-400/40"
            onClick={() => onEmailDraftChange(formatMicahQuickQuote(quickQuote))}
          >
            Draft package notes
          </button>
        </div>
      </section>

      <section className="mt-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <HeartPulse className="h-4 w-4 text-cyan-400" aria-hidden="true" />
          Quote Health
        </h3>
        <div className="mt-2 rounded-lg bg-blue-500/5 px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-slate-500">Health score</span>
            <span className="font-medium text-cyan-200">
              {quoteHealth.score}/100
            </span>
          </div>
          <p className="mt-2 text-sm leading-snug text-slate-400">
            {quoteHealth.marginNote}
          </p>
        </div>
        {quoteHealth.warnings.length > 0 && (
          <ul className="mt-2 space-y-2">
            {quoteHealth.warnings.slice(0, 5).map((warning) => (
              <li
                key={warning}
                className="rounded-lg border border-amber-500/20 bg-amber-500/8 px-3 py-2 text-sm leading-snug text-amber-100/90"
              >
                {warning}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Target className="h-4 w-4 text-blue-400" aria-hidden="true" />
          Deal Strategy
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {dealStrategy.packageRecommendation}
        </p>
        <ul className="mt-2 space-y-2">
          {dealStrategy.smartTips.slice(0, 3).map((tip) => (
            <li
              key={tip}
              className="rounded-lg border border-blue-500/20 bg-blue-500/8 px-3 py-2 text-sm leading-snug text-slate-300"
            >
              {tip}
            </li>
          ))}
        </ul>
        <p className="mt-2 rounded-lg border border-cyan-500/20 bg-cyan-500/8 px-3 py-2 text-sm leading-snug text-cyan-100">
          {dealStrategy.ctaRecommendation}
        </p>
      </section>

      <section className="mt-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <TrendingUp className="h-4 w-4 text-teal-400" aria-hidden="true" />
          Follow-Up Assistant
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {followUp.recommendation}
        </p>
        <div className="mt-3 grid gap-2">
          <button
            type="button"
            className="min-h-[44px] rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-cyan-200 transition-all hover:border-cyan-400/40"
            onClick={() => onEmailDraftChange(followUp.emailDraft)}
          >
            Draft follow-up email
          </button>
          <button
            type="button"
            className="min-h-[44px] rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200 transition-all hover:border-emerald-400/40"
            onClick={() => onEmailDraftChange(smsDraft.text)}
          >
            Draft SMS text
          </button>
        </div>
        <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
          <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Micah drafts only. The operator reviews and sends manually.
        </p>
      </section>

      <section className="mt-4 border-t border-blue-500/15 pt-4">
        <h3 className="text-sm font-semibold text-slate-200">
          Customer Memory Placeholder
        </h3>
        <p className="mt-2 rounded-lg border border-blue-500/20 bg-blue-500/8 px-3 py-2 text-sm leading-snug text-slate-300">
          {memorySummary}
        </p>
      </section>

      <section className="mt-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <FileText className="h-4 w-4 text-purple-300" aria-hidden="true" />
          Invoice Placeholder
        </h3>
        <p
          className={cn(
            'mt-2 rounded-lg border px-3 py-2 text-sm leading-snug',
            invoiceSuggestion.canSuggestInvoice
              ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-100'
              : 'border-purple-500/20 bg-purple-500/8 text-slate-400',
          )}
        >
          {invoiceSuggestion.suggestion}
        </p>
      </section>

      <section className="mt-4 border-t border-blue-500/15 pt-4">
        <h3 className="text-sm font-semibold text-slate-200">Email Rewrite</h3>
        <p className="mt-1 text-xs text-slate-500">Local MVP - no API yet</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {MICAH_ACTIONS.filter((a) => EMAIL_ACTIONS.includes(a.id)).map(
            (action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => runEmailAction(action.id)}
                className="min-h-[40px] rounded-lg border border-blue-500/25 bg-blue-500/10 px-3 py-2 text-xs text-sky-200 hover:border-purple-400/35 hover:text-cyan-100"
              >
                {action.label}
              </button>
            ),
          )}
        </div>
      </section>
    </aside>
  )
}
