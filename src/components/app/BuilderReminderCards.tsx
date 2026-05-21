import { Clock } from 'lucide-react'

type BuilderReminderCardsProps = {
  onSendFollowUp?: () => void
  onViewQuote?: () => void
}

export function BuilderReminderCards({
  onSendFollowUp,
  onViewQuote,
}: BuilderReminderCardsProps) {
  return (
    <div className="mt-4 space-y-3">
      <article className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-200">
              Follow-up due
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Luke Plumbing — quote sent 5 days ago
            </p>
            <button
              type="button"
              onClick={onSendFollowUp}
              className="mt-3 min-h-[40px] rounded-lg border border-amber-500/30 bg-amber-500/15 px-3 py-2 text-xs font-semibold text-amber-100"
            >
              Send follow-up
            </button>
          </div>
        </div>
      </article>

      <article className="rounded-xl border border-blue-500/25 bg-blue-500/8 p-4">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Quote expiring soon
            </p>
            <p className="mt-1 text-sm text-slate-400">
              In &amp; Out Electrical — expires in 2 days
            </p>
            <button
              type="button"
              onClick={onViewQuote}
              className="mt-3 min-h-[40px] rounded-lg border border-blue-500/30 bg-blue-500/15 px-3 py-2 text-xs font-semibold text-cyan-100"
            >
              View Quote
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
