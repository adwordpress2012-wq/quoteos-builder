import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'
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
import {
  MICAH_ACTIONS,
  type MicahActionId,
  type QuoteFormState,
} from '../../lib/quoteos/types'

type MicahPanelProps = {
  quote: QuoteFormState
  draft: string
  onDraftChange: (text: string) => void
}

export function MicahPanel({
  quote,
  draft,
  onDraftChange,
}: MicahPanelProps) {
  const sourceText = draft || quote.projectSummary || quote.micahPrompt
  const quickQuote = generateQuickQuoteFromPrompt(
    sourceText,
    quote.businessTypeId,
  )
  const dealStrategy = generateDealStrategy(quote)
  const quoteHealth = generateQuoteHealth(quote)
  const followUp = generateFollowUpSuggestion(quote)
  const smsDraft = generateSmsDraft(quote)
  const invoiceSuggestion = generateInvoiceSuggestion(quote)
  const memorySummary = generateCustomerMemoryPlaceholder(quote)

  const runAction = (action: MicahActionId) => {
    const result = generateMicahSuggestion(action, {
      text: sourceText,
      contactName: quote.contactName,
      projectTitle: quote.projectTitle,
      businessName: quote.clientBusinessName,
    })
    onDraftChange(result.text)
  }

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className="icon-block-purple flex h-9 w-9 items-center justify-center rounded-lg">
          <Sparkles className="h-4 w-4 text-purple-200" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Micah SQBA Assistant
          </h2>
          <p className="text-[11px] text-slate-500">
            Local MVP - suggests only, no auto-send
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
          Quick quote generator
        </p>
        <h3 className="mt-1 text-sm font-semibold text-slate-100">
          {quickQuote.packageName}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          {quickQuote.dealNote}
        </p>
        <ul className="mt-3 space-y-1 text-xs text-slate-300">
          {quickQuote.inclusions.slice(0, 5).map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onDraftChange(formatMicahQuickQuote(quickQuote))}
          className="mt-3 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1.5 text-[11px] font-medium text-cyan-100 transition-colors hover:bg-cyan-500/15"
        >
          Draft quick quote notes
        </button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <MicahCard title="Deal strategy">
          <p>{dealStrategy.packageRecommendation}</p>
          <p className="mt-2 text-cyan-200">{dealStrategy.ctaRecommendation}</p>
        </MicahCard>

        <MicahCard title={`Quote health: ${quoteHealth.score}/100`}>
          {quoteHealth.warnings.length > 0 ? (
            <ul className="space-y-1">
              {quoteHealth.warnings.slice(0, 4).map((warning) => (
                <li key={warning}>- {warning}</li>
              ))}
            </ul>
          ) : (
            <p>No major warnings. Review costs before sending.</p>
          )}
        </MicahCard>

        <MicahCard title="Follow-up assistant">
          <p>{followUp.recommendation}</p>
          <button
            type="button"
            onClick={() => onDraftChange(followUp.emailDraft)}
            className="mt-2 rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-1 text-[10px] text-sky-200 hover:bg-blue-500/15"
          >
            Draft follow-up email
          </button>
        </MicahCard>

        <MicahCard title="Memory placeholder">
          <p>{memorySummary}</p>
        </MicahCard>
      </div>

      <div className="mt-3 rounded-xl border border-purple-500/20 bg-purple-500/[0.06] p-3 text-xs leading-relaxed text-slate-300">
        <p className="font-semibold text-purple-200">Smart tips</p>
        <ul className="mt-2 space-y-1">
          {dealStrategy.smartTips.slice(0, 3).map((tip) => (
            <li key={tip}>- {tip}</li>
          ))}
          <li>- SMS draft: {smsDraft.text}</li>
          <li>- {invoiceSuggestion.suggestion}</li>
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {MICAH_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => runAction(action.id)}
            className="rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-1 text-[10px] text-sky-200 transition-all hover:border-purple-400/35 hover:bg-purple-500/15 hover:text-cyan-100 sm:text-[11px]"
          >
            {action.label}
          </button>
        ))}
      </div>

      <textarea
        className="mt-4 min-h-[140px] w-full resize-y rounded-lg border border-purple-500/20 bg-purple-500/[0.06] p-3 text-sm leading-relaxed text-slate-200 focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/25"
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        placeholder="Micah drafts appear here. Review and confirm before sending anything."
        aria-label="Micah writing assistant draft"
      />
    </div>
  )
}

function MicahCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.05] p-3 text-xs leading-relaxed text-slate-300">
      <p className="mb-1 font-semibold text-slate-100">{title}</p>
      {children}
    </div>
  )
}
