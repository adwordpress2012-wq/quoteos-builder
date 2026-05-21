import { useState, type ReactNode } from 'react'
import { FileText, MessageSquare, Send, Sparkles } from 'lucide-react'
import {
  generateDealStrategy,
  generateFollowUpSuggestion,
  generateInvoiceSuggestion,
  generateMicahSuggestion,
  generateQuickQuoteFromPrompt,
  generateQuoteHealth,
  generateSmsDraft,
} from '../../lib/quoteos/micah'
import { getPackageDisplayName } from '../../lib/quoteos/quote-display'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { MicahActionId, QuoteFormState } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

const CHAT_ACTIONS: { id: MicahActionId | 'prepare-sms' | 'create-invoice'; label: string }[] = [
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
  const sourcePrompt =
    quote.micahPrompt || quote.projectSummary || quote.projectTitle || ''
  const quickQuote = generateQuickQuoteFromPrompt(
    sourcePrompt,
    quote.businessTypeId,
    setup,
  )
  const packageName = getPackageDisplayName(quote, setup)
  const dealStrategy = generateDealStrategy(quote)
  const quoteHealth = generateQuoteHealth(quote)
  const followUp = generateFollowUpSuggestion(quote, setup)
  const smsDraft = generateSmsDraft(quote)
  const invoiceSuggestion = generateInvoiceSuggestion(quote)

  const packagingMessage = showGenerateResponse
    ? `I recommend packaging this as ${packageName} instead of showing too many separate items. It keeps the offer simple and easier to approve.`
    : `G'day — tell me what you're quoting and I'll package it so it's easy for your client to say yes.`

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
    runEmailAction('improve-cta')
    setChatInput('')
  }

  const showInsights = showGenerateResponse || quote.quoteGenerated

  return (
    <aside
      className={cn(
        'flex max-h-[calc(100vh-5rem)] flex-col rounded-2xl border border-blue-500/20 bg-[rgba(10,15,30,0.55)] shadow-[var(--qos-glow-blue)] backdrop-blur-xl',
        className,
      )}
    >
      <header className="shrink-0 border-b border-blue-500/15 px-4 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="icon-block-purple flex h-11 w-11 items-center justify-center rounded-xl">
              <Sparkles className="h-5 w-5 text-purple-200" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                Micah, AI Quoting Assistant
              </h2>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online
          </span>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4">
        <ChatBubble role="assistant">{packagingMessage}</ChatBubble>

        {sourcePrompt.trim() && showGenerateResponse ? (
          <ChatBubble role="user">{sourcePrompt.trim()}</ChatBubble>
        ) : null}

        {showInsights ? (
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Quote insight
            </p>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="text-emerald-400" aria-hidden="true">
                  ✓
                </span>
                {quickQuote.dealNote}
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400" aria-hidden="true">
                  ✓
                </span>
                {quoteHealth.marginNote}
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400" aria-hidden="true">
                  ✓
                </span>
                {dealStrategy.ctaRecommendation}
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400" aria-hidden="true">
                  ✓
                </span>
                {followUp.recommendation}
              </li>
            </ul>
          </div>
        ) : null}

        {showInsights && quoteHealth.score < 100 && quoteHealth.warnings[0] ? (
          <p className="rounded-lg border border-amber-500/20 bg-amber-500/8 px-3 py-2 text-xs text-amber-100/90">
            Health {quoteHealth.score}/100 — {quoteHealth.warnings[0]}
          </p>
        ) : null}

        {showInsights && invoiceSuggestion.canSuggestInvoice ? (
          <p className="flex items-start gap-2 text-xs text-slate-500">
            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            {invoiceSuggestion.suggestion}
          </p>
        ) : null}

        {showInsights ? (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
            <MessageSquare
              className="h-4 w-4 shrink-0 text-emerald-300"
              aria-hidden="true"
            />
            <p className="text-xs text-slate-400">{smsDraft.text}</p>
          </div>
        ) : null}
      </div>

      <footer className="shrink-0 space-y-3 border-t border-blue-500/15 p-3">
        <div className="flex flex-wrap gap-2">
          {CHAT_ACTIONS.map((action) => (
            <button
              key={action.id}
              type="button"
              disabled={!quote.quoteGenerated && action.id !== 'improve-cta'}
              onClick={() => handleChip(action.id)}
              className="min-h-[40px] rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 transition-colors hover:border-purple-400/35 disabled:opacity-40"
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
            className="min-h-[44px] flex-1 rounded-xl border border-blue-500/25 bg-[rgba(10,15,30,0.75)] px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/25"
          />
          <button
            type="button"
            onClick={handleSend}
            aria-label="Send to Micah"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-400/40 bg-gradient-to-br from-blue-600/40 to-purple-600/35 text-cyan-100"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </footer>
    </aside>
  )
}

function ChatBubble({
  role,
  children,
}: {
  role: 'user' | 'assistant'
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'max-w-[95%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
        role === 'user'
          ? 'ml-auto border border-blue-500/25 bg-blue-600/20 text-slate-100'
          : 'mr-auto border border-purple-500/20 bg-purple-500/10 text-slate-300',
      )}
    >
      {children}
    </div>
  )
}
