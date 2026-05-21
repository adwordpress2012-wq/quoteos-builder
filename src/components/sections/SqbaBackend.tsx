import { Bell, FileText, Mail, User } from 'lucide-react'
import { SectionHeading } from '../marketing/SectionHeading'

const panels = [
  {
    icon: User,
    title: 'Lead details',
    lines: ['Sarah M. — Penrith', 'Hot water replacement', 'Enquiry via Micah SCW'],
  },
  {
    icon: FileText,
    title: 'Quote draft',
    lines: ['Call-out & diagnosis — $120', 'Electric HWS supply & install — $2,450', 'Total — $2,570 inc. GST'],
  },
  {
    icon: Mail,
    title: 'Email / SMS draft',
    lines: ['Hi Sarah, thanks for your enquiry…', 'Quote attached — reply to approve'],
  },
  {
    icon: FileText,
    title: 'PDF quote preview',
    lines: ['Luke\'s Plumbing — Quote #1042', 'Valid 14 days · deposit on booking'],
  },
  {
    icon: Bell,
    title: 'Follow-up reminder',
    lines: ['Quote sent 2 days ago', 'Reminder: call or SMS customer tomorrow'],
  },
]

export function SqbaBackend() {
  return (
    <section className="bg-[#eff6ff] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="SQBA backend"
          title="Behind the scenes, SQBA turns enquiries into quote-ready jobs"
          description="While you're on the tools, SQBA organises the admin — lead info, quote drafts, messages, PDFs, and reminders in one workspace."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {panels.map((panel) => (
            <li
              key={panel.title}
              className="rounded-2xl border border-[#bfdbfe] bg-white p-5 shadow-sm"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#dbeafe] text-[#1d4ed8]">
                <panel.icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-[#0f2744]">{panel.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {panel.lines.map((line) => (
                  <li key={line} className="text-sm text-[#64748b]">
                    {line}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-[#64748b]">
          Open the{' '}
          <a href="/app/builder" className="font-semibold text-[#1d4ed8] hover:underline">
            SQBA quote workspace
          </a>{' '}
          to try the builder — same system, tradie-ready.
        </p>
      </div>
    </section>
  )
}
