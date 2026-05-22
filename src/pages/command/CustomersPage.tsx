import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { AddEntityButton } from '../../components/command/AddEntityButton'
import { CustomerFormDrawer } from '../../components/command/forms/CommandForms'
import { useDemoStore } from '../../hooks/useDemoStore'

export function CustomersPage() {
  const { customers, addCustomer } = useDemoStore()
  const [addOpen, setAddOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const state = location.state as { openAdd?: boolean } | null
    const shouldOpen = state?.openAdd || new URLSearchParams(location.search).get('action') === 'add'
    if (shouldOpen) {
      setAddOpen(true)
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  return (
    <CommandCentreLayout
      title="Customers"
      subtitle="Simple customer memory — not a heavy CRM"
      actions={
        <AddEntityButton label="Add customer" onClick={() => setAddOpen(true)} />
      }
    >
      <ul className="space-y-4">
        {customers.map((customer) => (
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
              {customer.address ? (
                <div className="sm:col-span-2">
                  <dt className="text-slate-500">Address</dt>
                  <dd className="text-slate-200">{customer.address}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-slate-500">Preferred contact</dt>
                <dd className="capitalize text-slate-300">
                  {customer.preferredContact}
                </dd>
              </div>
              {customer.notes ? (
                <div className="sm:col-span-2">
                  <dt className="text-slate-500">Notes</dt>
                  <dd className="text-slate-300">{customer.notes}</dd>
                </div>
              ) : null}
            </dl>

            <HistoryBlock title="Job history" items={customer.jobHistory} />
            <HistoryBlock title="Quote history" items={customer.quoteHistory} />
            <HistoryBlock title="Invoice history" items={customer.invoiceHistory} />
          </li>
        ))}
      </ul>

      <CustomerFormDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(values) =>
          addCustomer({
            name: values.name,
            mobile: values.mobile,
            email: values.email,
            address: values.address,
            suburb: values.suburb,
            preferredContact: values.preferredContact,
            notes: values.notes,
          })
        }
      />
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
