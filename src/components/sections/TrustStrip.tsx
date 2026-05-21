import {
  Bell,
  Calendar,
  Clock,
  FileText,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type TrustCard = {
  icon: LucideIcon
  title: string
  description: string
}

const cards: TrustCard[] = [
  {
    icon: Clock,
    title: 'Faster Quotes',
    description: 'Turn enquiries into clear quotes while the job is still fresh.',
  },
  {
    icon: Target,
    title: 'Never Miss a Lead',
    description: 'Every website chat and form lands in one place — nothing slips through.',
  },
  {
    icon: Bell,
    title: 'Follow-Up Reminders',
    description: 'Gentle nudges so you do not lose jobs waiting on a reply.',
  },
  {
    icon: Calendar,
    title: 'Booking Ready',
    description: 'Confirm dates and send booking links without the back-and-forth.',
  },
  {
    icon: FileText,
    title: 'PDF Quotes & Invoices',
    description: 'Professional PDFs your customers can open on their phone.',
  },
]

export function TrustStrip() {
  return (
    <section
      id="features"
      className="scroll-mt-24 border-y border-[#e2e8f0] bg-white px-5 py-14 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {cards.map((card) => (
            <li
              key={card.title}
              className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1d4ed8] text-white">
                <card.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[#0f2744]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                {card.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
