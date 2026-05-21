import { ChevronDown, Eye } from 'lucide-react'
import { useState } from 'react'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'
import { ProposalPreview } from './ProposalPreview'
import { cn } from '../../lib/utils'

type MobileProposalSectionProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  onPrint: () => void
}

export function MobileProposalSection({
  quote,
  totals,
  onPrint,
}: MobileProposalSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <section className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-2xl border border-blue-500/25 bg-blue-500/10 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
          <Eye className="h-4 w-4" aria-hidden="true" />
          View Proposal
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-slate-400 transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="mt-3 space-y-3">
          <ProposalPreview quote={quote} totals={totals} hero />
          <button
            type="button"
            onClick={onPrint}
            className="min-h-[48px] w-full rounded-xl border border-blue-500/30 text-sm font-semibold text-cyan-200"
          >
            Print / Save PDF
          </button>
        </div>
      ) : null}
    </section>
  )
}
