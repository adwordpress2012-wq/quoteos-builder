import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

export function CtaBanner() {
  return (
    <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/80 via-[#0f1118] to-[#07080d] px-6 py-12 text-center sm:px-12 sm:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.25),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Ready to quote smarter and win more work?
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
