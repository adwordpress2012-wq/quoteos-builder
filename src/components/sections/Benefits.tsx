import { Clock, MessageSquare, Repeat, Target, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Zap,
    title: 'Faster quoting',
    description:
      'Turn site visits into polished proposals in minutes, not evenings at the desk.',
  },
  {
    icon: MessageSquare,
    title: 'Better communication',
    description:
      'AI-drafted emails and consistent follow-ups keep every lead warm and professional.',
  },
  {
    icon: Repeat,
    title: 'Recurring revenue',
    description:
      'Structured follow-ups and deposits help you win repeat work and predictable cash flow.',
  },
  {
    icon: Target,
    title: 'Win more jobs',
    description:
      'Respond first with clear, confident quotes that reflect how you actually operate.',
  },
  {
    icon: Clock,
    title: 'Operational efficiency',
    description:
      'One system for quotes, PDFs, emails and reminders — less double-handling across tools.',
  },
]

export function Benefits() {
  return (
    <section
      id="benefits"
      className="scroll-mt-24 border-y border-white/[0.06] bg-[#0a0b10]/50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-violet-400">
            Why QuoteOS
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Built for businesses that live on the tools
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
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_40px_rgba(124,58,237,0.08)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-600/10 text-violet-300 transition-colors duration-300 group-hover:border-violet-400/30 group-hover:bg-violet-600/15">
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
