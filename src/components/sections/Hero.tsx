import {
  ArrowRight,
  Bell,
  CalendarCheck,
  CheckCircle2,
  MessageSquare,
  FileText,
} from 'lucide-react'
import { MarketingButton } from '../ui/MarketingButton'
import { BUILDER_URL } from '../../lib/marketing/constants'

const flowSteps = [
  {
    label: 'Customer enquiry',
    detail: 'Blocked drain — need someone today',
    icon: MessageSquare,
    tone: 'bg-[#eff6ff] text-[#1d4ed8]',
  },
  {
    label: 'Micah chat',
    detail: 'Collects job details on your site',
    icon: MessageSquare,
    tone: 'bg-[#dbeafe] text-[#1e40af]',
  },
  {
    label: 'Quote prepared',
    detail: '$485 inc. call-out & labour',
    icon: FileText,
    tone: 'bg-[#fef9c3] text-[#a16207]',
  },
  {
    label: 'Booking added',
    detail: 'Thu 9:00 am — confirmed',
    icon: CalendarCheck,
    tone: 'bg-[#eff6ff] text-[#1d4ed8]',
  },
  {
    label: 'Notification sent',
    detail: 'SMS + email to customer',
    icon: Bell,
    tone: 'bg-[#f0fdf4] text-[#15803d]',
  },
]

export function Hero() {
  return (
    <section
      id="top"
      className="scroll-mt-24 bg-gradient-to-b from-[#eff6ff] to-white px-5 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#bfdbfe] bg-white px-4 py-1.5 text-xs font-semibold text-[#1d4ed8] shadow-sm sm:text-sm">
            <span
              className="h-2 w-2 rounded-full bg-[#facc15]"
              aria-hidden="true"
            />
            Built for plumbers &amp; tradies
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#0f2744] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Never spend 5 hours quoting again.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
            QuoteOS helps plumbers and tradies capture enquiries, prepare quotes,
            send follow-ups, book jobs, and create PDF invoices with{' '}
            <span className="font-semibold text-[#1d4ed8]">Micah AI</span>.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <MarketingButton href={BUILDER_URL} size="lg" className="w-full sm:w-auto">
              Start Free Trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MarketingButton>
            <MarketingButton
              href="#how-it-works"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              See How It Works
            </MarketingButton>
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl sm:mt-14">
          <div className="overflow-hidden rounded-2xl border border-[#cbd5e1] bg-white shadow-[0_20px_50px_-12px_rgba(15,39,68,0.15)]">
            <div className="flex items-center justify-between gap-3 border-b border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#facc15]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#4ade80]" />
              </div>
              <p className="text-xs font-medium text-[#64748b]">
                Luke&apos;s Plumbing — QuoteOS workflow
              </p>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-5 lg:gap-4">
              {flowSteps.map((step, index) => (
                <div
                  key={step.label}
                  className="relative rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4"
                >
                  {index < flowSteps.length - 1 ? (
                    <span
                      className="absolute -right-2 top-1/2 hidden h-0.5 w-4 -translate-y-1/2 bg-[#93c5fd] lg:block"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${step.tone}`}
                  >
                    <step.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#0f2744]">
                    {step.detail}
                  </p>
                  {step.label === 'Quote prepared' ? (
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#15803d]">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Ready to send
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="border-t border-[#e2e8f0] bg-[#eff6ff] px-4 py-3 sm:px-5">
              <p className="text-center text-xs text-[#475569] sm:text-sm">
                From website chat to booked job — less admin, more time on the tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
