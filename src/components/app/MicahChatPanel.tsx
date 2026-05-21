import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import {
  answerMicahQuestion,
  generateDealStrategy,
  generateMicahSuggestion,
  generateQuickQuoteFromPrompt,
  generateQuoteHealth,
  generateSmsDraft,
  generateInvoiceSuggestion,
} from '../../lib/quoteos/micah'
import { validateQuotePricing } from '../../lib/quoteos/pricing'
import { getPackageDisplayName } from '../../lib/quoteos/quote-display'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { MicahActionId, QuoteFormState } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

const QUICK_ACTIONS: { id: MicahActionId | 'prepare-sms' | 'create-invoice'; label: string }[] = [
  { id: 'improve-cta', label: 'Improve CTA' },
  { id: 'make-casual-au', label: 'Make Casual' },
  { id: 'make-professional', label: 'Make Professional' },
  { id: 'prepare-sms', label: 'Prepare SMS' },
  { id: 'create-invoice', label: 'Create Invoice' },
]

type MicahChatPanelProps = {
  quote: QuoteFormState
  emailDraft: string
  setup?: SqbaSetupConfig | null
  onEmailDraftChange: (text: string) => void
  showGenerateResponse?: boolean
  className?: string
}

export function MicahChatPanel({
  quote,
  emailDraft,
  setup,
  onEmailDraftChange,
  showGenerateResponse = false,
  className,
}: MicahChatPanelProps) {
  const [chatInput, setChatInput] = useState('')
  const [chatResponse, setChatResponse] = useState('')

  const sourcePrompt =
    quote.micahPrompt || quote.projectSummary || quote.projectTitle || ''
  const packageName = getPackageDisplayName(quote, setup)
  const quickQuote = generateQuickQuoteFromPrompt(
    sourcePrompt,
    quote.businessTypeId,
    setup,
  )
  const dealStrategy = generateDealStrategy(quote)
  const quoteHealth = generateQuoteHealth(quote)
  const smsDraft = generateSmsDraft(quote)
  const invoiceSuggestion = generateInvoiceSuggestion(quote)
  const pricingValidation = validateQuotePricing(quote)

  const mainMessage = showGenerateResponse
    ? `I've packaged this as the ${packageName}. It's simple, easy to understand and perfect for getting approved fast.`
    : `G'day — tell me what you're quoting and I'll package it so it's easy for your client to say yes.`

  const insightBullets = [
    quickQuote.dealNote,
    quoteHealth.marginNote,
    dealStrategy.ctaRecommendation,
  ]

  const runEmailAction = (action: MicahActionId) => {
    const result = generateMicahSuggestion(action, {
      text: emailDraft,
      contactName: quote.contactName,
      projectTitle: quote.projectTitle,
      businessName: quote.clientBusinessName,
    })
    onEmailDraftChange(result.text)
  }

  const handleChip = (id: MicahActionId | 'prepare-sms' | 'create-invoice') => {
    if (id === 'prepare-sms') {
      onEmailDraftChange(smsDraft.text)
      return
    }
    if (id === 'create-invoice') {
      onEmailDraftChange(
        `${invoiceSuggestion.suggestion}\n\n${emailDraft}`.trim(),
      )
      return
    }
    runEmailAction(id)
  }

  const handleSend = () => {
    const trimmed = chatInput.trim()
    if (!trimmed) return
    setChatResponse(answerMicahQuestion(trimmed, quote))
    setChatInput('')
  }

  const showInsights = showGenerateResponse || quote.quoteGenerated

  return (
    <aside
      className={cn(
        'flex max-h-[min(420px,42vh)] flex-col rounded-xl border border-blue-500/15 bg-[rgba(10,15,30,0.5)] shadow-[0_0_24px_rgba(59,130,246,0.12)] backdrop-blur-xl',
        className,
      )}
    >
      <header className="shrink-0 border-b border-blue-500/10 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="icon-block-purple flex h-8 w-8 items-center justify-center rounded-lg">
              <Sparkles className="h-3.5 w-3.5 text-purple-200" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-50">Micah</h2>
              <p className="text-[10px] text-slate-500">AI Quoting Assistant</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online
          </span>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
        <div className="rounded-xl border border-purple-500/15 bg-purple-500/8 px-3 py-2 text-sm leading-relaxed text-slate-300">
          {mainMessage}
        </div>

        {chatResponse ? (
          <div className="rounded-xl border border-purple-500/15 bg-purple-500/8 px-3 py-2 text-sm text-slate-300">
            {chatResponse}
          </div>
        ) : null}

        {showInsights ? (
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Quote insight - {pricingValidation.statusLabel}
            </p>
            <ul className="mt-1.5 space-y-1">
              {insightBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <span className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <footer className="shrink-0 space-y-2 border-t border-blue-500/10 p-2.5">
        <div className="flex flex-wrap gap-1.5">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              disabled={!quote.quoteGenerated && action.id !== 'improve-cta'}
              onClick={() => handleChip(action.id)}
              className="min-h-[32px] rounded-full border border-blue-500/20 bg-blue-500/8 px-2.5 py-1 text-[11px] font-medium text-cyan-200 transition-colors hover:border-purple-400/30 disabled:opacity-40"
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <label className="sr-only" htmlFor="micah-chat-input">
            Ask Micah anything
          </label>
          <input
            id="micah-chat-input"
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend()
            }}
            placeholder="Ask Micah anything…"
            className="min-h-[40px] flex-1 rounded-lg border border-blue-500/20 bg-[rgba(10,15,30,0.75)] px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/25"
          />
          <button
            type="button"
            onClick={handleSend}
            aria-label="Send to Micah"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-400/35 bg-gradient-to-br from-blue-600/35 to-purple-600/30 text-cyan-100"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </aside>
  )
}
