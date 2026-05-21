import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { QuoteFormState } from '../../lib/quoteos/types'
import { buildMicahAssistantSnapshot } from '../../lib/micah/micahQuoteLogic'
import { cn } from '../../lib/utils'
import { MicahBodyMascot } from './MicahBodyMascot'
import { MicahSpeechBubble } from './MicahSpeechBubble'

type FloatingMicahProps = {
  quote: QuoteFormState
  setup?: SqbaSetupConfig | null
  isThinking?: boolean
  onClick: () => void
  /** MVP demo count so the welcome bubble is visible on first load */
  welcomeFollowUpCount?: number
  operatorName?: string
  className?: string
}

export function FloatingMicah({
  quote,
  setup,
  isThinking = false,
  onClick,
  welcomeFollowUpCount = 0,
  operatorName = 'Luke',
  className,
}: FloatingMicahProps) {
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const snapshot = useMemo(
    () => buildMicahAssistantSnapshot(quote, setup, isThinking),
    [isThinking, quote, setup],
  )
  const logicCount = snapshot.reminders.length
  const displayCount = Math.max(welcomeFollowUpCount, logicCount)
  const showBubble = displayCount > 0 && !bubbleDismissed

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-[5.5rem] right-3 z-[70] flex flex-col items-end gap-3 print:hidden sm:bottom-6 sm:right-5 xl:bottom-8 xl:right-8',
        className,
      )}
    >
      {showBubble ? (
        <div className="pointer-events-auto">
          <MicahSpeechBubble
            operatorName={operatorName}
            followUpCount={displayCount}
            onShow={onClick}
            onDismiss={() => setBubbleDismissed(true)}
          />
        </div>
      ) : null}

      <div className="pointer-events-auto flex items-end gap-3">
        <button
          type="button"
          onClick={onClick}
          aria-label="Open Micah assistant"
          className={cn(
            'micah-float-shell group relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/90 text-white shadow-[0_0_28px_rgba(59,130,246,0.45)] backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 xl:hidden',
          )}
        >
          <span className="micah-aura absolute inset-[-8px] rounded-full" />
          <span className="micah-face absolute inset-2 flex items-center justify-center rounded-full border border-slate-300/20 bg-[radial-gradient(circle_at_45%_25%,rgba(96,165,250,0.36),rgba(2,6,23,0.96)_58%)]">
            <span className="micah-eye left-[30%]" />
            <span className="micah-eye right-[30%]" />
          </span>
          {displayCount > 0 ? (
            <span className="absolute -right-1 -top-1 z-10 flex h-6 min-w-6 items-center justify-center rounded-full border border-white/20 bg-purple-600 px-1.5 text-[10px] font-bold text-white shadow-lg">
              {displayCount}
            </span>
          ) : null}
        </button>

        <button
          type="button"
          onClick={onClick}
          aria-label="Open Micah assistant"
          className="micah-body-bob group relative hidden outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 xl:block"
          style={{ filter: 'drop-shadow(0 0 22px rgba(59,130,246,0.55))' }}
        >
          {displayCount > 0 ? (
            <span className="absolute -right-1 -top-1 z-10 flex h-6 min-w-6 items-center justify-center rounded-full border border-white/20 bg-purple-600 px-1.5 text-[10px] font-bold text-white shadow-lg">
              {displayCount}
            </span>
          ) : null}
          {snapshot.state === 'success' ? (
            <span className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          ) : null}
          <MicahBodyMascot isThinking={isThinking} size="lg" />
        </button>
      </div>
    </div>
  )
}
