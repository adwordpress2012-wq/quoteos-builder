import { Clock, MessageSquare, Repeat, Target, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Faster quoting',
    description:
      'Turn site visits into polished proposals in minutes, not evenings at the desk.',
    iconVariant: 'blue' as const,
  },
  {
    icon: MessageSquare,
    title: 'Better communication',
    description:
      'AI-drafted emails and consistent follow-ups keep every lead warm and professional.',
    iconVariant: 'purple' as const,
  },
  {
    icon: Repeat,
    title: 'Recurring revenue',
    description:
      'Structured follow-ups and deposits help you win repeat work and predictable cash flow.',
    iconVariant: 'purple' as const,
  },
  {
    icon: Target,
    title: 'Win more jobs',
    description:
      'Respond first with clear, confident quotes that reflect how you actually operate.',
    iconVariant: 'blue' as const,
  },
  {
    icon: Clock,
    title: 'Operational efficiency',
    description:
      'One system for quotes, PDFs, emails and reminders — less double-handling across tools.',
    iconVariant: 'blue' as const,
  },
]

export function Benefits() {
  return (
    <section
      id="benefits"
      className="scroll-mt-24 border-y border-blue-500/15 bg-[var(--qos-panel)]/40 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
            Why QuoteOS
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Built for businesses that{' '}
            <span className="text-gradient-quoteos-cyan">live on the tools</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Stop losing jobs to slow quotes and scattered follow-ups. QuoteOS
            keeps your pipeline moving from first enquiry to signed work.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {benefits.map((item) => (
            <li
              key={item.title}
              className="group glass-feature-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/35 hover:shadow-[var(--qos-glow-blue)]"
            >
              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-sky-200 transition-all duration-300 group-hover:scale-105 ${
                  item.iconVariant === 'purple'
                    ? 'icon-block-purple'
                    : 'icon-block-blue'
                }`}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
