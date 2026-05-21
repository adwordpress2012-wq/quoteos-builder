import { History } from 'lucide-react'
import { buildMemorySummary } from '../../lib/quoteos/generateQuote'
import type { QuoteFormState } from '../../lib/quoteos/types'
import type { QuoteTotals } from '../../lib/quoteos/types'

type QuoteMemoryCardProps = {
  quote: QuoteFormState
  totals: QuoteTotals
}

export function QuoteMemoryCard({ quote, totals }: QuoteMemoryCardProps) {
  const summary = buildMemorySummary(quote, totals.oneOffTotal)

  return (
    <div className="glass-card-inner flex gap-3 rounded-xl p-4">
      <span className="icon-block-blue flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
        <History className="h-5 w-5 text-sky-200" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Quote memory
        </p>
        <p className="mt-1 text-sm font-medium leading-snug text-slate-200 sm:text-base">
          {summary}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Local MVP — syncs when you connect your account
        </p>
      </div>
    </div>
  )
}
