import { Eye, FileCheck } from 'lucide-react'

type CompactProposalCardProps = {
  ready: boolean
  onView: () => void
}

export function CompactProposalCard({ ready, onView }: CompactProposalCardProps) {
  if (!ready) return null

  return (
    <section className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="icon-block-blue flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <FileCheck className="h-5 w-5 text-cyan-200" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-slate-50">Proposal is ready</p>
        <p className="mt-0.5 text-sm text-slate-500">Last updated just now</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onView}
        className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600/30 to-purple-600/25 px-4 text-sm font-semibold text-white"
      >
        <Eye className="h-4 w-4" aria-hidden="true" />
        View Proposal
      </button>
    </section>
  )
}
