import {
  Bell,
  CreditCard,
  FileText,
  Mail,
  PenLine,
  Wand2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
}

const features: Feature[] = [
  {
    icon: Wand2,
    title: 'Smart Quote Builder',
    description:
      'Build structured, accurate quotes with line items, margins and scope — ready to send while you are still on site.',
  },
  {
    icon: PenLine,
    title: 'Micah Writing Assistant',
    description:
      'AI copy tuned for tradies and consultants. Professional tone without sounding like a generic template.',
  },
  {
    icon: FileText,
    title: 'Professional PDF Quotes',
    description:
      'Branded PDF proposals that look premium on mobile and desktop — the kind clients forward to decision-makers.',
  },
  {
    icon: Mail,
    title: 'AI Email Drafts',
    description:
      'Context-aware outreach and revisions so every message is clear, timely and on-brand for your business.',
  },
  {
    icon: Bell,
    title: 'Follow-Up Reminders',
    description:
      'Never let a warm lead go cold. Automated nudges keep opportunities moving toward a yes.',
  },
  {
    icon: CreditCard,
    title: 'Stripe Deposits',
    description:
      'Secure deposit collection built into your quote flow — lock in commitment before you mobilise.',
    badge: 'Coming soon',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-violet-400">
            Platform
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Everything you need from quote to close
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            One operating system for proposals, communication and follow-through
            — designed for how service businesses actually work.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/25 hover:shadow-[0_12px_48px_rgba(124,58,237,0.12)]"
            >
              {feature.badge ? (
                <span className="absolute right-5 top-5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-200/90">
                  {feature.badge}
                </span>
              ) : null}
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-violet-600/10 text-violet-300 shadow-[0_0_24px_rgba(124,58,237,0.15)] transition-all duration-300 group-hover:shadow-[0_0_32px_rgba(124,58,237,0.25)]">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="pr-20 text-lg font-semibold text-slate-50">
                {feature.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
