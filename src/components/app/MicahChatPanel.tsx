import type { ReactNode } from 'react'
import { FileText, MessageSquare, Sparkles } from 'lucide-react'
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
import { getDeliveryLabel } from '../../lib/quoteos/setup-wizard'
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
    : null

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

  return (
    <aside
      className={cn(
        'flex h-full max-h-[calc(100vh-7rem)] flex-col rounded-2xl border border-blue-500/20 bg-[rgba(10,15,30,0.55)] shadow-[var(--qos-glow-blue)] backdrop-blur-xl',
        className,
      )}
    >
      <header className="shrink-0 border-b border-blue-500/15 px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="icon-block-purple flex h-11 w-11 items-center justify-center rounded-xl">
            <Sparkles className="h-5 w-5 text-purple-200" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Assistant
            </p>
            <h2 className="text-lg font-semibold text-slate-50">Micah</h2>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Your quoting assistant
          {setup?.completed && setup.delivery !== 'email'
            ? ` · ${getDeliveryLabel(setup.delivery)}`
            : ''}
        </p>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4">
        <ChatBubble role="assistant">
          G&apos;day — tell me what you&apos;re quoting and I&apos;ll package it
          so it&apos;s easy for your client to say yes.
        </ChatBubble>

        {sourcePrompt.trim() ? (
          <ChatBubble role="user">{sourcePrompt.trim()}</ChatBubble>
        ) : null}

        {packagingMessage ? (
          <ChatBubble role="assistant">{packagingMessage}</ChatBubble>
        ) : null}

        {(showGenerateResponse || quote.quoteGenerated) && (
          <>
            <InsightCard title="Package" accent="purple">
              <p className="font-semibold text-slate-100">{packageName}</p>
              <p className="mt-1 text-sm text-slate-400">{quickQuote.dealNote}</p>
            </InsightCard>

            <InsightCard title="Margin note" accent="cyan">
              <p className="text-sm text-slate-300">{quoteHealth.marginNote}</p>
            </InsightCard>

            <InsightCard title="Suggested CTA" accent="blue">
              <p className="text-sm text-cyan-100/90">
                {dealStrategy.ctaRecommendation}
              </p>
            </InsightCard>

            <InsightCard title="Follow-up" accent="teal">
              <p className="text-sm text-slate-300">
                {followUp.recommendation}
              </p>
            </InsightCard>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
              <MessageSquare
                className="h-4 w-4 shrink-0 text-emerald-300"
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                  SMS Ready
                </p>
                <p className="mt-0.5 text-sm text-slate-300">{smsDraft.text}</p>
              </div>
            </div>

            {quoteHealth.score < 100 && quoteHealth.warnings[0] ? (
              <p className="rounded-lg border border-amber-500/20 bg-amber-500/8 px-3 py-2 text-xs text-amber-100/90">
                Health {quoteHealth.score}/100 — {quoteHealth.warnings[0]}
              </p>
            ) : null}

            {invoiceSuggestion.canSuggestInvoice ? (
              <p className="flex items-start gap-2 text-xs text-slate-500">
                <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {invoiceSuggestion.suggestion}
              </p>
            ) : null}
          </>
        )}
      </div>

      <footer className="shrink-0 border-t border-blue-500/15 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Quick actions
        </p>
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

function InsightCard({
  title,
  accent,
  children,
}: {
  title: string
  accent: 'purple' | 'cyan' | 'blue' | 'teal'
  children: ReactNode
}) {
  const border =
    accent === 'purple'
      ? 'border-purple-500/25'
      : accent === 'cyan'
        ? 'border-cyan-500/25'
        : accent === 'teal'
          ? 'border-teal-500/25'
          : 'border-blue-500/25'

  return (
    <div className={cn('rounded-xl border bg-white/[0.02] px-3 py-2.5', border)}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  )
}
