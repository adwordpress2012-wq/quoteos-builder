import { Eye, Printer } from 'lucide-react'

type CompactProposalCardProps = {
  ready: boolean
  onView: () => void
  onPrint: () => void
}

export function CompactProposalCard({
  ready,
  onView,
  onPrint,
}: CompactProposalCardProps) {
  if (!ready) return null

  return (
    <section className="glass-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4 sm:p-5">
      <div>
        <p className="text-base font-semibold text-slate-50">Proposal ready</p>
        <p className="mt-0.5 text-sm text-slate-500">
          View the full PDF-style preview when you need it.
        </p>
      </div>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={onView}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600/30 to-purple-600/25 px-4 text-sm font-semibold text-white"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          View Proposal
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-blue-500/25 bg-blue-500/8 px-4 text-sm font-medium text-cyan-200"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print / Save PDF
        </button>
      </div>
    </section>
  )
}
