import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-12 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-32 lg:pt-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-[420px] w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute right-0 top-32 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-900/30 blur-[72px]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md sm:text-sm">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
            Powered by DOS — Directive Operating Systems
          </div>

          <h1 className="animate-fade-in animation-delay-100 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
            The AI operating system for{' '}
            <span className="bg-gradient-to-r from-violet-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
              quotes that win jobs
            </span>
          </h1>

          <p className="animate-fade-in animation-delay-200 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            QuoteOS helps service businesses quote faster, communicate better,
            and follow up without the admin drag — so you close more work and
            build recurring revenue with operational efficiency.
          </p>

          <div className="animate-fade-in animation-delay-300 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              href="https://app.quoteos.com.au"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full sm:w-auto"
            >
              Launch App
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
              Powered by DOS
            </Button>
          </div>

          <ul className="animate-fade-in animation-delay-400 mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 sm:text-sm">
            <li>Faster quoting</li>
            <li className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <li>Better communication</li>
            <li className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <li>Win more jobs</li>
          </ul>
        </div>

        <div className="animate-fade-in animation-delay-500 relative mx-auto mt-14 max-w-4xl sm:mt-16">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500/40 via-white/5 to-transparent opacity-80 blur-sm" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Quote sent', value: '12 min avg' },
                { label: 'Follow-ups', value: 'Automated' },
                { label: 'Jobs won', value: '+ operational clarity' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.06] bg-[#0a0b10]/80 px-4 py-4 text-center sm:py-5"
                >
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-200 sm:text-base">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
