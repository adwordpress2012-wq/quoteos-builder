import { ArrowRight, FileText } from 'lucide-react'
import { Button } from '../ui/Button'

const quoteLineItems = [
  { label: 'Hot water system install', price: '$2,450' },
  { label: 'Labour & materials', price: '$890' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-32 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-quoteos-grid opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-quoteos-noise opacity-40 mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[-5%] h-[520px] w-[min(110%,920px)] -translate-x-1/2 rounded-full bg-blue-500/35 blur-[120px]" />
        <div className="absolute left-1/2 top-[8%] h-[360px] w-[min(80%,640px)] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[100px]" />
        <div className="absolute left-[-12%] top-[18%] h-[420px] w-[420px] rounded-full bg-purple-600/22 blur-[110px]" />
        <div className="absolute right-[-12%] top-[18%] h-[420px] w-[420px] rounded-full bg-purple-600/22 blur-[110px]" />
        <div className="absolute bottom-[12%] left-1/2 h-64 w-[min(70%,560px)] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[90px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-[var(--qos-panel)] px-4 py-1.5 text-xs font-medium text-slate-200 shadow-[var(--qos-glow-blue)] backdrop-blur-md sm:text-sm">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
              aria-hidden="true"
            />
            AI Sales &amp; Quoting Operating System
          </div>

          <h1 className="animate-fade-in animation-delay-100 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
            QuoteOS — AI Quoting Software{' '}
            <span className="text-gradient-quoteos">For Service</span>{' '}
            <span className="text-gradient-quoteos-cyan">Businesses</span>
          </h1>

          <p className="animate-fade-in animation-delay-200 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Create professional quotes, write better emails, attach polished PDFs,
            and follow up faster with{' '}
            <span className="font-medium text-cyan-300">Micah AI</span>.
          </p>

          <div className="animate-fade-in animation-delay-300 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              href="https://app.quoteos.com.au"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto"
            >
              Start Building Quotes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href="https://directiveos.com.au"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book a Demo
            </Button>
          </div>

          <p className="animate-fade-in animation-delay-400 mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
            Powered by DOS — Directive Operating Systems
          </p>
        </div>

        <div className="animate-fade-in animation-delay-500 relative mx-auto mt-14 max-w-5xl sm:mt-16">
          <div
            className="pointer-events-none absolute -inset-1 rounded-[1.15rem] bg-gradient-to-b from-blue-400/60 via-cyan-400/25 to-purple-500/20 opacity-80 blur-md"
            aria-hidden="true"
          />
          <div className="glass-card glow-dashboard relative overflow-hidden rounded-2xl p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-blue-500/15 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/90 shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              </div>
              <span className="text-xs text-slate-400">Hi, Sarah</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
              <div className="glass-card-inner rounded-xl p-4 lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Smart Quote Builder
                </p>
                <ul className="mt-3 space-y-2">
                  {quoteLineItems.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-2 text-sm text-slate-300"
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="shrink-0 font-medium text-slate-200">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-blue-500/15 pt-3 text-right text-sm font-semibold text-cyan-300">
                  Total{' '}
                  <span className="text-lg text-cyan-200">$3,340</span>
                </p>
              </div>

              <div className="glass-card-inner rounded-xl p-4 lg:col-span-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Quote Status
                </p>
                <div className="mt-4 flex flex-col items-center gap-3">
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-cyan-400/40 bg-blue-500/10 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
                    aria-hidden="true"
                  >
                    <span className="text-xs font-medium text-cyan-200">Sent</span>
                  </div>
                  <ul className="w-full space-y-1.5 text-xs text-slate-400">
                    {[
                      { label: 'Draft', color: 'bg-slate-500' },
                      { label: 'Sent', color: 'bg-cyan-400' },
                      { label: 'Accepted', color: 'bg-emerald-400' },
                    ].map((s) => (
                      <li key={s.label} className="flex items-center gap-2">
                        <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} />
                        {s.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="glass-card-inner rounded-xl p-4 sm:col-span-2 lg:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Micah Writing Assistant
                </p>
                <p className="mt-3 rounded-lg border border-purple-500/15 bg-purple-500/[0.06] p-3 text-xs leading-relaxed text-slate-300">
                  Hi Sarah — thanks for the opportunity. Please find your quote
                  attached. Happy to answer any questions…
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['Professional', 'Warm', 'Improve CTA'].map((tone) => (
                    <span
                      key={tone}
                      className="rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-1 text-[10px] text-sky-200"
                    >
                      {tone}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card-inner flex items-center gap-3 rounded-xl p-4 sm:col-span-2 lg:col-span-12 lg:max-w-xs lg:justify-self-end">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                  <FileText
                    className="h-6 w-6 text-cyan-300"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    PDF Preview
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-slate-200">
                    QuoteOS_1234.pdf
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
