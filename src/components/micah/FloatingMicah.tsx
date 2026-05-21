import { useMemo, useState } from 'react'
import { Bot, Check, Sparkles } from 'lucide-react'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { QuoteFormState } from '../../lib/quoteos/types'
import { buildMicahAssistantSnapshot } from '../../lib/micah/micahQuoteLogic'
import { getMicahStateConfig } from '../../lib/micah/micahStates'
import { cn } from '../../lib/utils'
import { MicahReminderNudge } from './MicahReminderNudge'
import { MicahStateBadge } from './MicahStateBadge'

type FloatingMicahProps = {
  quote: QuoteFormState
  setup?: SqbaSetupConfig | null
  isThinking?: boolean
  onClick: () => void
  className?: string
}

export function FloatingMicah({
  quote,
  setup,
  isThinking = false,
  onClick,
  className,
}: FloatingMicahProps) {
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const snapshot = useMemo(
    () => buildMicahAssistantSnapshot(quote, setup, isThinking),
    [isThinking, quote, setup],
  )
  const state = snapshot.state
  const config = getMicahStateConfig(state)
  const reminderCount = snapshot.reminders.length
  const showBubble = reminderCount > 0 && !bubbleDismissed

  return (
    <div
      className={cn(
        'fixed bottom-24 right-4 z-40 flex flex-col items-end gap-3 print:hidden sm:bottom-6 sm:right-6',
        className,
      )}
    >
      {showBubble ? (
        <MicahReminderNudge
          reminders={snapshot.reminders}
          onDismiss={() => setBubbleDismissed(true)}
          onOpen={onClick}
        />
      ) : null}

      <div className="flex items-end gap-3">
        <MicahStateBadge
          state={state}
          reminderCount={reminderCount}
          className="hidden sm:inline-flex"
        />
        <button
          type="button"
          onClick={onClick}
          aria-label="Open Micah assistant"
          className={cn(
            'micah-float-shell group relative h-20 w-20 rounded-full border border-cyan-300/35 bg-slate-950/85 text-white backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 sm:h-24 sm:w-24',
            config.glowClass,
          )}
        >
          <span className="micah-aura absolute inset-[-10px] rounded-full" />
          <span className="absolute inset-2 rounded-full border border-blue-300/30 bg-gradient-to-br from-blue-500/25 via-purple-500/20 to-cyan-400/15" />
          <span className="micah-face absolute inset-[18px] flex items-center justify-center rounded-full border border-slate-300/20 bg-[radial-gradient(circle_at_45%_25%,rgba(96,165,250,0.36),rgba(2,6,23,0.96)_58%)] sm:inset-[22px]">
            <span className="micah-eye left-[30%]" />
            <span className="micah-eye right-[30%]" />
            <span className="absolute bottom-[28%] h-2 w-5 rounded-b-full border-b-2 border-cyan-300/85" />
          </span>
          <span className="absolute -left-1 top-7 h-6 w-3 rounded-full bg-blue-400/70 shadow-[0_0_14px_rgba(96,165,250,0.9)] sm:top-9" />
          <span className="absolute -right-1 top-7 h-6 w-3 rounded-full bg-blue-400/70 shadow-[0_0_14px_rgba(96,165,250,0.9)] sm:top-9" />
          <span className="absolute bottom-1 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-200/50 bg-blue-600 text-[10px] font-bold text-white shadow-[0_0_16px_rgba(34,211,238,0.72)]">
            M
          </span>
          {state === 'success' ? (
            <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
          ) : null}
          {state === 'warning' ? (
            <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg">
              !
            </span>
          ) : null}
          {reminderCount > 0 ? (
            <span className="absolute -right-2 top-1 flex h-7 min-w-7 items-center justify-center rounded-full border border-white/20 bg-purple-600 px-2 text-xs font-bold text-white shadow-lg">
              {reminderCount}
            </span>
          ) : null}
          {state === 'thinking' ? (
            <Sparkles
              className="absolute left-2 top-2 h-4 w-4 animate-pulse text-cyan-200"
              aria-hidden="true"
            />
          ) : (
            <Bot
              className="absolute left-2 top-2 h-4 w-4 text-blue-200/80 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">{config.message}</span>
        </button>
      </div>
    </div>
  )
}
