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
  iconVariant?: 'purple' | 'blue'
}

const features: Feature[] = [
  {
    icon: Wand2,
    title: 'Smart Quote Builder',
    description:
      'Build structured, accurate quotes with line items, margins and scope — ready to send while you are still on site.',
    iconVariant: 'purple',
  },
  {
    icon: PenLine,
    title: 'Micah Writing Assistant',
    description:
      'AI copy tuned for tradies and consultants. Professional tone without sounding like a generic template.',
    iconVariant: 'blue',
  },
  {
    icon: FileText,
    title: 'Professional PDF Quotes',
    description:
      'Branded PDF proposals that look premium on mobile and desktop — the kind clients forward to decision-makers.',
    iconVariant: 'purple',
  },
  {
    icon: Mail,
    title: 'AI Email Drafts',
    description:
      'Context-aware outreach and revisions so every message is clear, timely and on-brand for your business.',
    iconVariant: 'blue',
  },
  {
    icon: Bell,
    title: 'Follow-Up Reminders',
    description:
      'Never let a warm lead go cold. Automated nudges keep opportunities moving toward a yes.',
    iconVariant: 'purple',
  },
  {
    icon: CreditCard,
    title: 'Stripe Deposits',
    description:
      'Secure deposit collection built into your quote flow — lock in commitment before you mobilise.',
    badge: 'Coming soon',
    iconVariant: 'blue',
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
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
            Platform
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Everything you need to{' '}
            <span className="text-gradient-quoteos-purple-cyan">
              quote, send and win.
            </span>
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
              className="group glass-feature-card relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:shadow-[var(--qos-glow-blue),0_12px_48px_rgba(0,0,0,0.35)] sm:p-7"
            >
              {feature.badge ? (
                <span className="absolute right-5 top-5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-amber-200/90">
                  {feature.badge}
                </span>
              ) : null}
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-sky-200 transition-all duration-300 group-hover:scale-105 ${
                  feature.iconVariant === 'purple'
                    ? 'icon-block-purple'
                    : 'icon-block-blue'
                }`}
              >
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
