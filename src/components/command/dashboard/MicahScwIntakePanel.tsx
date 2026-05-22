import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Send, Sparkles, X } from 'lucide-react'
import { ActionBtn, PageActions } from '../PageActions'
import { useDemoStore } from '../../../hooks/useDemoStore'
import { cn } from '../../../lib/utils'

const SCW_LEAD = {
  name: 'Ava Brooks',
  phone: '0400 777 221',
  email: 'ava.brooks@email.com',
  address: '18 Florence St, Teneriffe QLD 4005',
  suburb: 'Teneriffe',
  jobType: 'Bathroom vanity leak',
  notes:
    'Water pooling under vanity, shut-off valve is stiff, prefers tomorrow morning if possible.',
}

const CHAT_MESSAGES = [
  {
    id: 'm1',
    role: 'assistant',
    text: "Hi, I'm Micah. What job do you need help with?",
  },
  {
    id: 'm2',
    role: 'customer',
    text: 'The bathroom vanity is leaking underneath and the valve is hard to turn off.',
  },
  {
    id: 'm3',
    role: 'assistant',
    text: 'Got it. What name, phone, email, address, and preferred timing should Luke use?',
  },
  {
    id: 'm4',
    role: 'customer',
    text: 'Ava Brooks, 0400 777 221, ava.brooks@email.com, 18 Florence St Teneriffe. Tomorrow morning would be great.',
  },
] as const

export function MicahScwIntakePanel() {
  const navigate = useNavigate()
  const { addLead, addBooking, addQuote } = useDemoStore()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [status, setStatus] = useState('')

  const createLead = () => {
    const lead = addLead({
      ...SCW_LEAD,
      urgency: 'normal',
      source: 'Micah SCW Intake',
    })
    setStatus(`Lead created for ${lead.name}`)
  }

  const createBooking = () => {
    const tomorrowMorning = new Date()
    tomorrowMorning.setDate(tomorrowMorning.getDate() + 1)
    tomorrowMorning.setHours(9, 0, 0, 0)
    addBooking({
      customer: SCW_LEAD.name,
      address: SCW_LEAD.address,
      jobType: SCW_LEAD.jobType,
      suburb: SCW_LEAD.suburb,
      notes: SCW_LEAD.notes,
      requestedAt: tomorrowMorning.toISOString().slice(0, 16),
      status: 'requested',
    })
    setStatus('Booking request created and added to DOS Calendar')
  }

  const createQuote = () => {
    addQuote({
      customer: SCW_LEAD.name,
      jobType: SCW_LEAD.jobType,
      amount: 0,
      suburb: SCW_LEAD.suburb,
    })
    navigate('/app/quotes')
  }

  return (
    <>
      <section
        className="glass-card rounded-2xl p-4 sm:p-5"
        aria-labelledby="micah-scw-intake-heading"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400/90">
              Twin Micah
            </p>
            <h2
              id="micah-scw-intake-heading"
              className="mt-1 text-lg font-semibold text-slate-50"
            >
              Micah SCW Intake
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Website-style enquiry capture on the left, operational actions on
              the right.
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
            <Sparkles className="h-5 w-5 text-cyan-200" aria-hidden="true" />
          </span>
        </div>
        <PageActions>
          <ActionBtn variant="primary" onClick={() => setDrawerOpen(true)}>
            Open Micah SCW Drawer
          </ActionBtn>
        </PageActions>
        {status ? <p className="mt-3 text-sm text-teal-200">{status}</p> : null}
      </section>

      <div
        className={cn(
          'fixed inset-0 z-[90] print:hidden',
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!drawerOpen}
      >
        <button
          type="button"
          className={cn(
            'absolute inset-0 bg-black/60 transition-opacity',
            drawerOpen ? 'opacity-100' : 'opacity-0',
          )}
          aria-label="Close Micah SCW drawer"
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={cn(
            'absolute right-0 top-0 flex h-full w-full max-w-5xl flex-col border-l border-cyan-400/25 bg-[rgba(5,8,20,0.98)] shadow-[0_0_60px_rgba(59,130,246,0.35)] transition-transform duration-200 sm:w-[88vw]',
            drawerOpen ? 'translate-x-0' : 'translate-x-full',
          )}
          aria-labelledby="micah-scw-drawer-title"
        >
          <header className="flex items-center justify-between gap-3 border-b border-blue-400/15 px-4 py-4 sm:px-6">
            <div>
              <h2 id="micah-scw-drawer-title" className="text-xl font-semibold text-slate-50">
                Micah SCW Intake Drawer
              </h2>
              <p className="text-sm text-slate-500">
                Demo/mock chat data only. No Resend, Twilio, Stripe, or Square.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <section className="flex min-h-[520px] flex-col overflow-hidden rounded-2xl border border-blue-500/25 bg-white/[0.04]">
              <div className="flex items-center justify-between border-b border-blue-500/15 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/35">
                    <MessageCircle className="h-5 w-5 text-cyan-100" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-50">Micah UI</p>
                    <p className="text-xs text-slate-500">Customer enquiry capture</p>
                  </div>
                </div>
                <span className="rounded-full border border-teal-400/25 bg-teal-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-200">
                  Mock chat
                </span>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {CHAT_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex',
                      message.role === 'customer' ? 'justify-end pl-12' : 'justify-start pr-12',
                    )}
                  >
                    <p
                      className={cn(
                        'max-w-full whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed',
                        message.role === 'customer'
                          ? 'rounded-br-md bg-blue-600 text-white'
                          : 'rounded-bl-md border border-blue-400/20 bg-slate-950/80 text-slate-200',
                      )}
                    >
                      {message.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-blue-500/15 p-3">
                <div className="flex gap-2">
                  <input
                    readOnly
                    value="Demo drawer - live typing comes later"
                    className="min-h-11 flex-1 rounded-xl border border-blue-500/20 bg-slate-950/70 px-3 text-sm text-slate-500"
                  />
                  <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/70 text-white"
                    aria-label="Send mock message"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-purple-400/25 bg-purple-500/10 p-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-200">
                Micah UX
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-50">
                Operational intake summary
              </h3>
              <dl className="mt-4 grid gap-3 text-sm">
                {Object.entries({
                  Name: SCW_LEAD.name,
                  Phone: SCW_LEAD.phone,
                  Email: SCW_LEAD.email,
                  Address: SCW_LEAD.address,
                  Job: SCW_LEAD.jobType,
                  Requirement: SCW_LEAD.notes,
                }).map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-blue-500/15 bg-slate-950/50 p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-slate-200">{value}</dd>
                  </div>
                ))}
              </dl>
              <PageActions className="mt-4">
                <ActionBtn variant="primary" onClick={createLead}>
                  Create Lead
                </ActionBtn>
                <ActionBtn onClick={createQuote}>Create Quote</ActionBtn>
                <ActionBtn onClick={createBooking}>Create Booking</ActionBtn>
              </PageActions>
              {status ? <p className="mt-3 text-sm text-teal-200">{status}</p> : null}
            </section>
          </div>
        </aside>
      </div>
    </>
  )
}
