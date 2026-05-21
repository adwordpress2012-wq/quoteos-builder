import { Check } from 'lucide-react'
import { SectionHeading } from '../marketing/SectionHeading'
import { MarketingButton } from '../ui/MarketingButton'
import { BOOK_DEMO_MAILTO, BOOK_DEMO_URL } from '../../lib/marketing/constants'

function pricingCtaHref(cta: string): string {
  return cta === 'Talk to Us' ? BOOK_DEMO_MAILTO : BOOK_DEMO_URL
}

type PricingTier = {
  name: string
  setup: string
  monthly: string
  annual: string
  features: string[]
  highlighted?: boolean
  cta: string
}

const tiers: PricingTier[] = [
  {
    name: 'Starter Tradie',
    setup: '$297 setup',
    monthly: '$97/month',
    annual: '$390/year hosting & support',
    features: [
      'One-page tradie landing page (included)',
      'Micah SCW',
      'Basic SQBA quote workspace',
      'Email notifications',
      'PDF quote/invoice',
      'Booking link setup',
    ],
    cta: 'Book Demo',
  },
  {
    name: 'Growth Tradie',
    setup: '$997 setup',
    monthly: '$297/month',
    annual: '$490/year hosting & support',
    features: [
      'One-page tradie landing page (included)',
      'Custom branded tradie website',
      'Micah SCW',
      'SQBA quote assistant',
      'Quote templates',
      'Email + SMS notifications',
      'Booking integration',
      'Follow-up reminders',
      'PDF quotes/invoices',
      'Onboarding/support',
    ],
    highlighted: true,
    cta: 'Book Demo',
  },
  {
    name: 'Scale Tradie',
    setup: 'Custom setup',
    monthly: '$497+/month',
    annual: 'Custom hosting/support',
    features: [
      'Advanced automation',
      'Higher enquiry volume',
      'WhatsApp/SMS workflows',
      'Multiple quote templates',
      'Multiple users/numbers',
      'Custom integrations',
      'Priority support',
    ],
    cta: 'Talk to Us',
  },
]

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that fit how tradies actually work"
          description="Straightforward setup and monthly fees — no surprise enterprise jargon."
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <li
              key={tier.name}
              className={
                tier.highlighted
                  ? 'relative flex flex-col rounded-2xl border-2 border-[#1d4ed8] bg-white p-6 shadow-lg ring-4 ring-[#dbeafe]'
                  : 'flex flex-col rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 shadow-sm'
              }
            >
              {tier.highlighted ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#facc15] px-3 py-0.5 text-xs font-bold text-[#0f2744]">
                  Most popular
                </span>
              ) : null}
              <h3 className="text-xl font-bold text-[#0f2744]">{tier.name}</h3>
              <div className="mt-4 space-y-1">
                <p className="text-2xl font-bold text-[#1d4ed8]">{tier.setup}</p>
                <p className="text-lg font-semibold text-[#334155]">{tier.monthly}</p>
                <p className="text-sm text-[#64748b]">{tier.annual}</p>
              </div>
              <p className="mt-4 text-sm font-medium text-[#64748b]">Includes:</p>
              <ul className="mt-3 flex-1 space-y-2">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[#475569]"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#1d4ed8]"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <MarketingButton
                href={pricingCtaHref(tier.cta)}
                variant={tier.highlighted ? 'primary' : 'outline'}
                className="mt-6 w-full"
                {...(tier.cta !== 'Talk to Us'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {tier.cta}
              </MarketingButton>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-[#64748b]">
          Pricing can be customised based on business needs, enquiry volume,
          SMS/WhatsApp usage, and setup requirements.
        </p>
      </div>
    </section>
  )
}
