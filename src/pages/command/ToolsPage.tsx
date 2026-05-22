import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import { useDemoStore } from '../../hooks/useDemoStore'
import { SQBA_TOOLS } from '../../lib/demo/tools-config'
import { formatDemoMoney } from '../../lib/demo/demo-data'
import { cn } from '../../lib/utils'

export function ToolsPage() {
  const { expenses, addExpense } = useDemoStore()
  const [searchParams] = useSearchParams()
  const [showExpenseForm, setShowExpenseForm] = useState(
    searchParams.get('action') === 'expense',
  )

  const handleExpenseSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    addExpense({
      date: String(form.get('date') ?? ''),
      supplier: String(form.get('supplier') ?? ''),
      category: String(form.get('category') ?? ''),
      description: String(form.get('description') ?? ''),
      amount: Number(form.get('amount') ?? 0),
    })
    event.currentTarget.reset()
    setShowExpenseForm(false)
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <CommandCentreLayout
      title="Tools"
      subtitle="Quick links to QuoteOS workflows - inspired by AgentMate Commercial"
      actions={
        <ActionBtn
          variant="primary"
          onClick={() => setShowExpenseForm((open) => !open)}
        >
          Add Expense
        </ActionBtn>
      }
    >
      {showExpenseForm ? (
        <form onSubmit={handleExpenseSubmit} className="glass-card mb-6 rounded-xl p-4 sm:p-5">
          <h2 className="text-base font-semibold text-slate-50">Add expense</h2>
          <p className="mt-1 text-sm text-slate-500">
            Local demo record only. Dashboard demo totals subtract this simple total.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field name="date" label="Date" type="date" required />
            <Field name="supplier" label="Supplier" required />
            <Field name="category" label="Category" required />
            <Field name="amount" label="Amount" type="number" required />
            <Field name="description" label="Notes" className="sm:col-span-2" />
          </div>
          <PageActions>
            <ActionBtn variant="primary" type="submit">
              Create Expense
            </ActionBtn>
            <ActionBtn variant="ghost" onClick={() => setShowExpenseForm(false)}>
              Cancel
            </ActionBtn>
          </PageActions>
        </form>
      ) : null}

      <section className="glass-card mb-6 rounded-xl p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90">
              Expenses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Total local demo expenses: {formatDemoMoney(totalExpenses)}
            </p>
          </div>
          <span className="text-xs text-slate-500">{expenses.length} records</span>
        </div>
      </section>

      <div className="glass-card mb-6 flex items-start gap-4 rounded-xl p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/35 bg-purple-500/15">
          <LayoutGrid className="h-6 w-6 text-purple-200" aria-hidden="true" />
        </span>
        <p className="text-sm text-slate-400">
          Same idea as AgentMate&apos;s tools section: one place to jump into the
          jobs you do every day. Nothing auto-sends - you review quotes, emails,
          and invoices before they go out.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SQBA_TOOLS.map((tool) => (
          <li key={tool.id}>
            <Link
              to={tool.href}
              className={cn(
                'glass-card group flex h-full min-h-[160px] flex-col rounded-xl p-5 transition-colors',
                'hover:border-cyan-400/35 hover:bg-white/[0.03]',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
                  <tool.icon
                    className="h-5 w-5 text-cyan-300"
                    aria-hidden="true"
                  />
                </span>
                {tool.badge ? (
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-200">
                    {tool.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-50 group-hover:text-cyan-100">
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {tool.description}
              </p>
              <span className="mt-4 text-xs font-medium text-cyan-400">
                Open tool
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CommandCentreLayout>
  )
}

function Field({
  name,
  label,
  type = 'text',
  required = false,
  className = '',
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="text-slate-400">{label}</span>
      <input
        name={name}
        type={type}
        step={type === 'number' ? '0.01' : undefined}
        required={required}
        className="mt-1 min-h-11 w-full rounded-lg border border-blue-500/20 bg-slate-950/70 px-3 text-slate-100 outline-none focus:border-cyan-400/40"
      />
    </label>
  )
}
