import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { AddEntityButton } from '../../components/command/AddEntityButton'
import { LeadFormDrawer } from '../../components/command/forms/CommandForms'
import { ActionBtn, PageActions } from '../../components/command/PageActions'
import { StatusBadge } from '../../components/command/StatusBadge'
import { useDemoStore } from '../../hooks/useDemoStore'
import type { LeadStatus } from '../../lib/demo/types'

export function LeadsPage() {
  const { leads, addLead, updateLead } = useDemoStore()
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

  const markReviewed = (id: string) => {
    updateLead(id, { status: 'reviewed' as LeadStatus })
  }

  return (
    <CommandCentreLayout
      title="Leads"
      subtitle="Website chat enquiries from Micah SCW"
      actions={<AddEntityButton label="Add lead" onClick={() => setAddOpen(true)} />}
    >
      <ul className="space-y-4">
        {leads.map((lead) => (
          <li key={lead.id} className="glass-card rounded-xl p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-50">{lead.name}</h3>
                <p className="text-sm text-slate-500">
                  {lead.suburb} · {lead.jobType}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={lead.urgency} />
                <StatusBadge status={lead.status} />
              </div>
            </div>

            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Phone</dt>
                <dd className="text-slate-200">{lead.phone}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="text-slate-200">{lead.email}</dd>
              </div>
              {lead.address ? (
                <div className="sm:col-span-2">
                  <dt className="text-slate-500">Address</dt>
                  <dd className="text-slate-200">{lead.address}</dd>
                </div>
              ) : null}
              <div className="sm:col-span-2">
                <dt className="text-slate-500">Notes</dt>
                <dd className="text-slate-300">{lead.notes}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Source</dt>
                <dd className="text-slate-400">{lead.source}</dd>
              </div>
            </dl>

            <PageActions className="mt-4">
              <ActionBtn to="/app/builder" variant="primary">
                Create Quote
              </ActionBtn>
              <ActionBtn to="/app/builder">Draft Email</ActionBtn>
              <ActionBtn
                variant="ghost"
                onClick={() => markReviewed(lead.id)}
              >
                Mark Reviewed
              </ActionBtn>
            </PageActions>
          </li>
        ))}
      </ul>

      <LeadFormDrawer
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(values) => addLead(values)}
      />
    </CommandCentreLayout>
  )
}
