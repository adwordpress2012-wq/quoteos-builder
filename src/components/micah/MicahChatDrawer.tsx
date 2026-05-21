import { useState, type ReactNode } from 'react'
import { Send, Sparkles, X } from 'lucide-react'
import { answerMicahQuestion } from '../../lib/quoteos/micah'
import type { MicahActionId, QuoteFormState } from '../../lib/quoteos/types'
import { generateSmsDraft, generateInvoiceSuggestion } from '../../lib/quoteos/micah'
import { runMicahQuickAction } from '../../lib/micah/micahQuoteLogic'
import { micahPersonality, withReviewNotice } from '../../lib/micah/micahPersonality'
import { cn } from '../../lib/utils'

type MicahDrawerAction =
  | MicahActionId
  | 'prepare-sms'
  | 'create-invoice'

const QUICK_ACTIONS: { id: MicahDrawerAction; label: string }[] = [
  { id: 'improve-cta', label: 'Improve CTA' },
  { id: 'make-casual-au', label: 'Make Casual' },
  { id: 'make-professional', label: 'Make Professional' },
  { id: 'prepare-sms', label: 'Prepare SMS' },
  { id: 'create-invoice', label: 'Create Invoice' },
]

type MicahChatDrawerProps = {
  open: boolean
  onClose: () => void
  quote: QuoteFormState
  emailDraft: string
  isThinking?: boolean
  onEmailDraftChange: (text: string) => void
}

export function MicahChatDrawer({
  open,
  onClose,
  quote,
  emailDraft,
  isThinking = false,
  onEmailDraftChange,
}: MicahChatDrawerProps) {
  const [chatInput, setChatInput] = useState('')
  const [chatResponse, setChatResponse] = useState('')

  const handleAction = (action: MicahDrawerAction) => {
    if (action === 'prepare-sms') {
      onEmailDraftChange(withReviewNotice(generateSmsDraft(quote).text))
      return
    }
    if (action === 'create-invoice') {
      onEmailDraftChange(
        withReviewNotice(generateInvoiceSuggestion(quote).suggestion),
      )
      return
    }
    onEmailDraftChange(runMicahQuickAction(action, quote, emailDraft))
  }

  const handleSend = () => {
    const trimmed = chatInput.trim()
    if (!trimmed) return
    setChatResponse(answerMicahQuestion(trimmed, quote))
    setChatInput('')
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[80] print:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity xl:bg-transparent',
          open ? 'opacity-100' : 'opacity-0',
        )}
        aria-label="Close Micah"
        onClick={onClose}
      />

      <aside
        className={cn(
          'absolute flex w-[min(100%,22rem)] flex-col overflow-hidden rounded-2xl border border-cyan-400/25 bg-[rgba(5,8,20,0.97)] shadow-[0_0_40px_rgba(59,130,246,0.35)] backdrop-blur-2xl transition-all duration-200',
          'bottom-[5.5rem] right-3 max-h-[min(420px,70svh)] sm:bottom-24 sm:right-5',
          open
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0',
        )}
        aria-labelledby="micah-drawer-title"
      >
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-blue-400/15 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-300/30 bg-blue-500/15">
              <Sparkles className="h-4 w-4 text-cyan-200" aria-hidden="true" />
            </span>
            <div>
              <h2
                id="micah-drawer-title"
                className="text-sm font-semibold text-slate-50"
              >
                Micah
              </h2>
              <p className="text-[10px] text-slate-500">Review before sending</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-2.5">
          <ChatBubble>
            {isThinking
              ? 'Building your quote…'
              : quote.quoteGenerated
                ? micahPersonality.greeting
                : 'Ask me about price, scope, or what to send — I use this quote.'}
          </ChatBubble>
          {chatResponse ? <ChatBubble>{chatResponse}</ChatBubble> : null}
        </div>

        <footer className="shrink-0 space-y-2 border-t border-blue-400/15 p-2.5">
          <div className="flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleAction(action.id)}
                disabled={!quote.quoteGenerated && action.id !== 'improve-cta'}
                className="min-h-[34px] rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 text-[11px] font-semibold text-cyan-100 hover:border-purple-300/35 disabled:opacity-40"
              >
                {action.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <label className="sr-only" htmlFor="micah-drawer-input">
              Ask Micah anything
            </label>
            <input
              id="micah-drawer-input"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend()
              }}
              placeholder="Ask Micah anything…"
              className="min-h-[40px] flex-1 rounded-lg border border-blue-500/20 bg-[rgba(10,15,30,0.8)] px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/40 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label="Send"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-400/35 bg-gradient-to-br from-blue-600/35 to-purple-600/30 text-cyan-100"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-500">
            {micahPersonality.reviewNotice}
          </p>
        </footer>
      </aside>
    </div>
  )
}

function ChatBubble({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-purple-400/20 bg-purple-500/10 px-3 py-2 text-sm leading-relaxed text-slate-300">
      {children}
    </div>
  )
}
