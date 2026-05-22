import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { DEMO_CUSTOMERS } from '../../lib/demo/demo-data'

export function CustomersPage() {
  return (
    <CommandCentreLayout
      title="Customers"
      subtitle="Simple customer memory — not a heavy CRM"
    >
      <ul className="space-y-4">
        {DEMO_CUSTOMERS.map((customer) => (
          <li key={customer.id} className="glass-card rounded-xl p-4 sm:p-5">
            <h3 className="text-lg font-semibold text-slate-50">{customer.name}</h3>
            <p className="text-sm text-slate-500">{customer.suburb}</p>

            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Mobile</dt>
                <dd className="text-slate-200">{customer.mobile}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="text-slate-200">{customer.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Preferred contact</dt>
                <dd className="capitalize text-slate-300">
                  {customer.preferredContact}
                </dd>
              </div>
            </dl>

            <HistoryBlock title="Job history" items={customer.jobHistory} />
            <HistoryBlock title="Quote history" items={customer.quoteHistory} />
            <HistoryBlock title="Invoice history" items={customer.invoiceHistory} />
          </li>
        ))}
      </ul>
    </CommandCentreLayout>
  )
}

function HistoryBlock({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null
  return (
    <div className="mt-4">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item} className="text-sm text-slate-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
