import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import { StatusBadge } from '../../components/command/StatusBadge'
import { formatDemoMoney } from '../../lib/demo/demo-data'
import { useDemoStore } from '../../hooks/useDemoStore'

const STAGES = ['draft', 'sent', 'follow-up', 'accepted', 'lost'] as const

export function QuotesListPage() {
  const { quotes } = useDemoStore()

  return (
    <CommandCentreLayout
      title="Quotes"
      subtitle="Track quote stages — open builder to review or send"
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {STAGES.map((stage) => {
          const count = quotes.filter((q) => q.status === stage).length
          return (
            <span
              key={stage}
              className="glass-card-inner rounded-lg px-3 py-2 text-xs text-slate-400"
            >
              <StatusBadge status={stage} />{' '}
              <span className="ml-1 tabular-nums text-slate-300">{count}</span>
            </span>
          )
        })}
      </div>

      <ul className="space-y-4">
        {quotes.map((quote) => (
          <li key={quote.id} className="glass-card rounded-xl p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-50">
                  {quote.customer}
                </h3>
                <p className="text-sm text-slate-500">{quote.jobType}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-cyan-200">
                  {formatDemoMoney(quote.amount)}
                </p>
                <StatusBadge status={quote.status} className="mt-1" />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              <span className="text-slate-400">Last:</span> {quote.lastAction}
            </p>
            <p className="mt-1 text-sm text-cyan-400/80">
              <span className="text-slate-500">Next:</span> {quote.nextStep}
            </p>

            <PageActions className="mt-4">
              <ActionBtn to="/app/builder" variant="primary">
                Review Quote
              </ActionBtn>
              <ActionBtn to={`/app/builder?quoteId=${quote.id}`}>Open Proposal</ActionBtn>
              <ActionBtn to="/app/follow-ups">Draft Follow-Up</ActionBtn>
              <ActionBtn to={`/app/invoices?action=create&quoteId=${quote.id}`} variant="ghost">
                Create Invoice
              </ActionBtn>
            </PageActions>
          </li>
        ))}
      </ul>
    </CommandCentreLayout>
  )
}
