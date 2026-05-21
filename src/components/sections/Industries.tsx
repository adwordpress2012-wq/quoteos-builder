import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

const industries = [
  'Plumbers',
  'Electricians',
  'Painters',
  'Fencing',
  'Landscapers',
  'Agencies',
  'Consultants',
]

const exampleQuotes = [
  'Emergency plumbing quote',
  'Bathroom renovation scope',
  'Hot water replacement',
  'Blocked drain call-out',
]

export function Industries() {
  return (
    <section
      id="industries"
      className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
            Industries
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Built first for{' '}
            <span className="text-gradient-quoteos-cyan">service businesses</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Whether you are on the tools or running a client services team,
            QuoteOS adapts to how you quote, communicate and follow up.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {industries.map((name) => {
            const isActive = name === 'Plumbers'
            return (
              <li key={name}>
                <span
                  className={
                    isActive
                      ? 'chip-industry-active inline-block rounded-full px-4 py-2 text-sm font-medium text-cyan-100'
                      : 'chip-industry inline-block rounded-full px-4 py-2 text-sm text-slate-300 transition-all duration-200 hover:border-blue-400/40 hover:text-sky-100 hover:shadow-[0_0_16px_rgba(59,130,246,0.15)]'
                  }
                >
                  {name}
                </span>
              </li>
            )
          })}
        </ul>

        <div className="glass-card relative mt-10 overflow-hidden rounded-2xl border border-blue-500/25 px-6 py-8 shadow-[var(--qos-glow-blue),0_0_60px_rgba(139,92,246,0.12)] sm:px-10 sm:py-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(20,184,166,0.08),transparent_55%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(139,92,246,0.12),transparent_50%)]"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                Quoting software for{' '}
                <span className="text-gradient-quoteos-cyan">plumbers</span> who
                want to{' '}
                <span className="text-gradient-quoteos">move faster</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Send polished quotes from site, follow up automatically, and
                win more emergency and renovation work without late-night admin.
              </p>
              <Button
                href="https://app.quoteos.com.au"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="mt-6"
              >
                Start Quoting
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="glass-card-inner rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Example quotes
              </p>
              <ul className="mt-4 space-y-3">
                {exampleQuotes.map((quote) => (
                  <li
                    key={quote}
                    className="flex items-center justify-between gap-3 rounded-lg border border-blue-500/10 bg-white/[0.02] px-3 py-2.5 text-sm text-slate-300 transition-colors hover:border-blue-400/25 hover:bg-blue-500/[0.06]"
                  >
                    <span>{quote}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-cyan-400/80"
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
