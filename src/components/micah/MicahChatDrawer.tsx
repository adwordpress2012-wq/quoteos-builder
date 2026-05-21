import type { ReactNode } from 'react'
import { MessageSquare, ShieldCheck, Sparkles, X } from 'lucide-react'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { MicahActionId, QuoteFormState } from '../../lib/quoteos/types'
import {
  buildMicahAssistantSnapshot,
  runMicahQuickAction,
} from '../../lib/micah/micahQuoteLogic'
import { micahPersonality, withReviewNotice } from '../../lib/micah/micahPersonality'
import { getMicahStateConfig } from '../../lib/micah/micahStates'
import { cn } from '../../lib/utils'
import { MicahStateBadge } from './MicahStateBadge'

type MicahDrawerAction =
  | MicahActionId
  | 'prepare-sms'
  | 'create-invoice'
  | 'check-margin'
  | 'explain-quote'

const QUICK_ACTIONS: { id: MicahDrawerAction; label: string }[] = [
  { id: 'improve-cta', label: 'Improve CTA' },
  { id: 'make-casual-au', label: 'Make Casual' },
  { id: 'make-professional', label: 'Make Professional' },
  { id: 'prepare-sms', label: 'Prepare SMS' },
  { id: 'create-invoice', label: 'Create Invoice' },
  { id: 'check-margin', label: 'Check Margin' },
  { id: 'explain-quote', label: 'Explain Quote' },
]

type MicahChatDrawerProps = {
  open: boolean
  onClose: () => void
  quote: QuoteFormState
  emailDraft: string
  setup?: SqbaSetupConfig | null
  isThinking?: boolean
  onEmailDraftChange: (text: string) => void
}

export function MicahChatDrawer({
  open,
  onClose,
  quote,
  emailDraft,
  setup,
  isThinking = false,
  onEmailDraftChange,
}: MicahChatDrawerProps) {
  const snapshot = buildMicahAssistantSnapshot(quote, setup, isThinking)
  const stateConfig = getMicahStateConfig(snapshot.state)

  const handleAction = (action: MicahDrawerAction) => {
    if (action === 'prepare-sms') {
      onEmailDraftChange(snapshot.smsDraft)
      return
    }

    if (action === 'create-invoice') {
      onEmailDraftChange(snapshot.invoiceSuggestion)
      return
    }

    if (action === 'check-margin') {
      onEmailDraftChange(withReviewNotice(snapshot.marginNote))
      return
    }

    if (action === 'explain-quote') {
      onEmailDraftChange(withReviewNotice(snapshot.quoteExplanation))
      return
    }

    onEmailDraftChange(runMicahQuickAction(action, quote, emailDraft))
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 print:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          'absolute inset-0 bg-black/60 transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        aria-label="Close Micah"
        onClick={onClose}
      />

      <aside
        className={cn(
          'absolute bottom-0 right-0 flex h-[92svh] w-full max-w-[440px] flex-col overflow-hidden rounded-t-2xl border border-blue-400/25 bg-[rgba(5,8,20,0.96)] shadow-[0_0_52px_rgba(59,130,246,0.35)] backdrop-blur-2xl transition-transform duration-300 sm:bottom-4 sm:right-4 sm:h-[min(760px,calc(100svh-2rem))] sm:rounded-2xl',
          open ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-[110%] sm:translate-y-0',
        )}
        aria-labelledby="micah-drawer-title"
      >
        <header className="shrink-0 border-b border-blue-400/15 bg-white/[0.02] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/30 bg-blue-500/15 text-cyan-100">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Micah
                </p>
                <h2
                  id="micah-drawer-title"
                  className="truncate text-lg font-semibold text-slate-50"
                >
                  AI Quoting Assistant
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close Micah drawer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <MicahStateBadge
              state={snapshot.state}
              reminderCount={snapshot.reminders.length}
            />
            <span className={cn('text-xs', stateConfig.toneClass)}>
              {stateConfig.label}
            </span>
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
          <ChatBubble role="assistant">{micahPersonality.greeting}</ChatBubble>

          {snapshot.userPrompt.trim() ? (
            <ChatBubble role="user">{snapshot.userPrompt.trim()}</ChatBubble>
          ) : null}

          <ChatBubble role="assistant">
            {snapshot.packagingSuggestion}
          </ChatBubble>

          <InsightCard title="Deal strategy" icon={<ShieldCheck />}>
            {snapshot.dealStrategy}
          </InsightCard>

          <InsightCard title="Margin note" icon={<Sparkles />}>
            {snapshot.marginNote}
          </InsightCard>

          <InsightCard title="Follow-up suggestion" icon={<MessageSquare />}>
            {snapshot.followUpSuggestion}
          </InsightCard>

          {snapshot.nudges.length > 0 ? (
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Smart nudges
              </p>
              {snapshot.nudges.slice(0, 4).map((nudge) => (
                <div
                  key={nudge.id}
                  className="rounded-xl border border-purple-400/20 bg-purple-500/8 px-3 py-2"
                >
                  <p className="text-sm font-semibold text-slate-100">
                    {nudge.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {nudge.detail}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <p className="rounded-xl border border-emerald-400/20 bg-emerald-500/8 px-3 py-2 text-xs leading-relaxed text-emerald-100/90">
            {micahPersonality.reviewNotice}
          </p>
        </div>

        <footer className="shrink-0 border-t border-blue-400/15 p-3">
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => handleAction(action.id)}
                className="min-h-[42px] rounded-xl border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-left text-xs font-semibold text-cyan-100 transition-colors hover:border-purple-300/40 hover:bg-purple-500/15"
              >
                {action.label}
              </button>
            ))}
          </div>
        </footer>
      </aside>
    </div>
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
          ? 'ml-auto border border-blue-400/25 bg-blue-600/20 text-slate-100'
          : 'mr-auto border border-purple-400/20 bg-purple-500/10 text-slate-300',
      )}
    >
      {children}
    </div>
  )
}

function InsightCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-blue-400/20 bg-white/[0.025] px-3 py-2.5">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        <span className="text-cyan-300 [&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{children}</p>
    </div>
  )
}
