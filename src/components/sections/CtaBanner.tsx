import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

export function CtaBanner() {
  return (
    <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="glass-card relative overflow-hidden rounded-2xl border border-blue-500/35 px-6 py-12 text-center shadow-[var(--qos-glow-blue),0_0_80px_rgba(139,92,246,0.15)] sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.32),transparent_55%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.14),transparent_45%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 bg-[radial-gradient(circle,rgba(6,182,212,0.12),transparent_70%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Ready to quote smarter and{' '}
              <span className="text-gradient-quoteos-cyan">win more work?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
              Launch QuoteOS and put AI to work on your quotes, proposals and
              follow-ups — without adding complexity to how you run the business.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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
          </div>
        </div>
      </div>
    </section>
  )
}
