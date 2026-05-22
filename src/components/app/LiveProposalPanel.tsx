import { FileDown } from 'lucide-react'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'
import { ProposalPreview } from './ProposalPreview'
import { cn } from '../../lib/utils'

type LiveProposalPanelProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  onPrint: () => void
  className?: string
}

export function LiveProposalPanel({
  quote,
  totals,
  onPrint,
  className,
}: LiveProposalPanelProps) {
  return (
    <aside
      className={cn(
        'flex min-w-0 flex-col gap-3',
        className,
      )}
      aria-label="Live proposal preview"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/90">
            Live preview
          </p>
          <h2 className="text-base font-semibold text-slate-50">Proposal</h2>
        </div>
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 text-xs font-semibold text-cyan-200 transition-colors hover:border-cyan-400/40"
        >
          <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
          Export PDF
        </button>
      </div>
      <ProposalPreview quote={quote} totals={totals} hero />
    </aside>
  )
}
