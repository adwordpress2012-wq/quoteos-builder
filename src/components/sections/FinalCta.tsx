import { ArrowRight } from 'lucide-react'
import { MarketingButton } from '../ui/MarketingButton'
import { BOOK_DEMO_URL } from '../../lib/marketing/constants'

export function FinalCta() {
  return (
    <section className="bg-[#1d4ed8] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to quote faster?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#bfdbfe] sm:text-lg">
          Book a quick demo and see how QuoteOS saves time, stops missed leads, and
          keeps your follow-ups on track.
        </p>
        <MarketingButton
          href={BOOK_DEMO_URL}
          variant="secondary"
          size="lg"
          className="mt-8"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a QuoteOS demo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </MarketingButton>
      </div>
    </section>
  )
}
