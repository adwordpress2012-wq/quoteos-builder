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
    <div className="space-y-2">
      <article className="rounded-lg border border-amber-500/20 bg-amber-500/6 px-3 py-2.5">
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200">
              Follow-up due
            </p>
            <p className="mt-0.5 text-xs text-slate-400">Luke Plumbing — quote sent 5 days ago</p>
            <button
              type="button"
              onClick={onSendFollowUp}
              className="mt-2 min-h-[34px] rounded-md border border-amber-500/25 bg-amber-500/12 px-2.5 py-1 text-[11px] font-semibold text-amber-100"
            >
              Send follow-up
            </button>
          </div>
        </div>
      </article>

      <article className="rounded-lg border border-blue-500/20 bg-blue-500/6 px-3 py-2.5">
        <div className="flex items-start gap-2">
          <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-200">
              Quote expiring soon
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              In &amp; Out Electrical — expires in 2 days
            </p>
            <button
              type="button"
              onClick={onViewQuote}
              className="mt-2 min-h-[34px] rounded-md border border-blue-500/25 bg-blue-500/12 px-2.5 py-1 text-[11px] font-semibold text-cyan-100"
            >
              View Quote
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
