import { useMemo, useState } from 'react'
import type { SqbaSetupConfig } from '../../lib/quoteos/setup-wizard'
import type { QuoteFormState } from '../../lib/quoteos/types'
import {
  buildMicahAssistantSnapshot,
  getMicahContextualTip,
} from '../../lib/micah/micahQuoteLogic'
import { cn } from '../../lib/utils'
import { MicahBodyMascot } from './MicahBodyMascot'
import { MicahContextBubble } from './MicahContextBubble'

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
  const contextualTip = useMemo(
    () => getMicahContextualTip(quote, setup),
    [quote, setup],
  )
  const showBubble = !bubbleDismissed && !isThinking

  return (
    <div
      className={cn(
        'pointer-events-none fixed bottom-[5.5rem] right-3 z-[70] flex flex-col items-end gap-2 print:hidden sm:bottom-6 sm:right-5 xl:bottom-8 xl:right-6',
        className,
      )}
    >
      {showBubble ? (
        <div className="pointer-events-auto max-w-[min(17rem,calc(100vw-2rem))]">
          <MicahContextBubble
            message={contextualTip}
            onOpen={onClick}
            onDismiss={() => setBubbleDismissed(true)}
          />
        </div>
      ) : null}

      <button
        type="button"
        onClick={onClick}
        aria-label="Open Micah assistant"
        className="micah-body-bob pointer-events-auto group relative outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
        style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.5))' }}
      >
        {snapshot.reminders.length > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 z-10 flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 bg-purple-600 px-1 text-[9px] font-bold text-white">
            {snapshot.reminders.length}
          </span>
        ) : null}
        <MicahBodyMascot isThinking={isThinking} size="sm" />
      </button>
    </div>
  )
}
