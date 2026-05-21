import { createLineItem, type QuoteTypeId } from './types'
import type { LineItem, QuoteFormState } from './types'

export type PricingPreset = {
  id: QuoteTypeId
  label: string
  lineItems: Omit<LineItem, 'id'>[]
  inclusions: string[]
  suggestedSummary?: string
  suggestedPaymentTerms?: string
}

const dosPresets: PricingPreset[] = [
  {
    id: 'dos-website-starter',
    label: 'Website Starter Package',
    lineItems: [
      { label: 'Website Starter Package', amount: 990, billingType: 'one-off' },
      { label: 'Ongoing support', amount: 29, billingType: 'monthly' },
    ],
    inclusions: [
      'One-page mobile-friendly website',
      'Contact form',
      'Basic Google setup',
      'Launch support',
    ],
    suggestedSummary:
      'Simple one-page website package for a tradie who needs a clean online presence and easy enquiries.',
    suggestedPaymentTerms:
      '50% deposit to start. Balance due before launch. Ongoing support billed monthly.',
  },
  {
    id: 'dos-website-growth',
    label: 'Website Growth Package',
    lineItems: [
      { label: 'Website Growth Package', amount: 1990, billingType: 'one-off' },
      { label: 'Ongoing support', amount: 49, billingType: 'monthly' },
    ],
    inclusions: [
      'One-page mobile-friendly website',
      'Google Business setup',
      'Professional email setup',
      'Lead capture form',
      'Basic SEO setup',
      'Launch support',
    ],
    suggestedSummary:
      'Packaged one-page website with Google setup, email setup, lead capture and monthly support.',
    suggestedPaymentTerms:
      '50% deposit to start. Balance due before launch. Ongoing support billed monthly.',
  },
  {
    id: 'dos-website-premium',
    label: 'Website Premium Package',
    lineItems: [
      { label: 'Website Premium Package', amount: 3490, billingType: 'one-off' },
      { label: 'Ongoing support', amount: 99, billingType: 'monthly' },
    ],
    inclusions: [
      'Multi-section website',
      'Google Business setup',
      'Professional email setup',
      'Lead capture form',
      'Smart booking or enquiry flow',
      'SEO foundation',
      'Priority launch support',
    ],
    suggestedSummary:
      'Premium website package with stronger lead capture, setup support and ongoing monthly care.',
    suggestedPaymentTerms:
      '50% deposit to start. Balance due before launch. Ongoing support billed monthly.',
  },
  {
    id: 'dos-website-custom',
    label: 'Custom Website Package',
    lineItems: [],
    inclusions: [
      'Custom scope to be confirmed',
      'Website package pricing to be set manually',
    ],
    suggestedSummary:
      'Custom website package. Confirm the scope and set the price before sending.',
    suggestedPaymentTerms:
      'Set deposit, balance and ongoing support once pricing is confirmed.',
  },
  {
    id: 'dos-website-rebuild',
    label: 'Website Rebuild',
    lineItems: [
      { label: 'Website rebuild (one-off)', amount: 2490, billingType: 'one-off' },
      { label: 'Hosting & support (yearly)', amount: 390, billingType: 'yearly' },
    ],
    inclusions: [
      'SEO foundation included',
      'Mobile responsive included',
      'Google Analytics & Search Console included',
    ],
    suggestedSummary:
      'Full website rebuild with modern design, SEO foundation, and ongoing hosting support.',
    suggestedPaymentTerms:
      '50% deposit to commence build. Balance due before launch.',
  },
  {
    id: 'new-website-build',
    label: 'New Website Build',
    lineItems: [
      { label: 'New website build (one-off)', amount: 3490, billingType: 'one-off' },
      { label: 'Hosting & support (yearly)', amount: 390, billingType: 'yearly' },
    ],
    inclusions: ['Launch support included', 'Mobile responsive design'],
    suggestedSummary:
      'Brand-new website build from scratch with launch support and yearly hosting.',
    suggestedPaymentTerms:
      '50% deposit to commence. Balance due on launch approval.',
  },
  {
    id: 'micah-sba',
    label: 'Micah SBA',
    lineItems: [
      { label: 'Micah SBA setup fee', amount: 497, billingType: 'one-off' },
      { label: 'Micah SBA monthly service', amount: 149, billingType: 'monthly' },
    ],
    inclusions: [
      'AI assistant setup',
      'Enquiry capture',
      'Booking support',
      'Admin notifications',
      'Client profile setup',
    ],
    suggestedSummary:
      'Micah Smart Business Assistant — AI-powered enquiries, bookings, and client comms.',
  },
  {
    id: 'smart-chat-widget',
    label: 'Smart Chat Widget (SCW)',
    lineItems: [
      { label: 'SCW setup fee', amount: 297, billingType: 'one-off' },
      { label: 'SCW monthly service', amount: 79, billingType: 'monthly' },
    ],
    inclusions: [
      'Website chat widget',
      'Lead capture',
      'Enquiry routing',
      'Basic FAQ support',
    ],
    suggestedSummary:
      'Smart Chat Widget for your website — capture leads and route enquiries automatically.',
  },
  {
    id: 'agentmate-setup',
    label: 'AgentMate Setup',
    lineItems: [
      { label: 'AgentMate setup fee', amount: 197, billingType: 'one-off' },
      { label: 'AgentMate monthly subscription', amount: 79, billingType: 'monthly' },
    ],
    inclusions: [
      'AgentMate onboarding',
      'Trial activation',
      'Dashboard access',
      'Basic training',
    ],
    suggestedSummary:
      'AgentMate setup and onboarding with dashboard access and monthly subscription.',
  },
  {
    id: 'google-business-setup',
    label: 'Google Business Setup',
    lineItems: [
      { label: 'Google Business Profile setup', amount: 350, billingType: 'one-off' },
    ],
    inclusions: [
      'Google Business Profile optimisation',
      'Search Console setup',
      'Analytics setup',
      'Indexing support',
    ],
    suggestedSummary:
      'Google Business Profile optimisation plus Search Console and Analytics setup.',
  },
  {
    id: 'email-setup',
    label: 'Email Setup',
    lineItems: [
      { label: 'Professional email setup', amount: 195, billingType: 'one-off' },
    ],
    inclusions: [
      'Professional email setup',
      'DNS configuration',
      'SPF/DKIM guidance',
      'Forwarding setup',
    ],
    suggestedSummary:
      'Professional business email setup with DNS, SPF/DKIM, and forwarding.',
  },
  {
    id: 'hosting-support',
    label: 'Hosting & Support',
    lineItems: [
      { label: 'Hosting & support (yearly)', amount: 390, billingType: 'yearly' },
    ],
    inclusions: [
      'Vercel hosting support',
      'Domain & DNS support',
      'Light website updates',
    ],
    suggestedSummary: 'Annual hosting and support package for your QuoteOS-powered site.',
  },
  {
    id: 'dos-ai-automation',
    label: 'DOS AI Automation Package',
    lineItems: [
      { label: 'AI automation setup', amount: 890, billingType: 'one-off' },
      { label: 'AI automation monthly support', amount: 129, billingType: 'monthly' },
    ],
    inclusions: [
      'AI workflow setup',
      'Resend notification integration',
      'Automation logic',
      'Ongoing support',
    ],
    suggestedSummary:
      'DOS AI automation package — workflows, notifications, and ongoing support.',
  },
]

const tradiePresets: PricingPreset[] = [
  {
    id: 'plumber-job',
    label: 'Plumber Job Quote',
    lineItems: [
      { label: 'Callout / inspection', amount: 120, billingType: 'one-off' },
      { label: 'Hot water system repair', amount: 450, billingType: 'one-off' },
      { label: 'Pipe repair', amount: 280, billingType: 'one-off' },
      { label: 'Parts & materials', amount: 185, billingType: 'one-off' },
      { label: 'Labour', amount: 320, billingType: 'one-off' },
    ],
    inclusions: ['Licensed plumber', 'Workmanship guarantee'],
    suggestedSummary: 'Plumbing works as scoped — callout, repairs, materials and labour.',
    suggestedPaymentTerms: '50% deposit to book. Balance due on completion.',
  },
  {
    id: 'electrician-job',
    label: 'Electrician Job Quote',
    lineItems: [
      { label: 'Inspection', amount: 95, billingType: 'one-off' },
      { label: 'Switchboard check', amount: 180, billingType: 'one-off' },
      { label: 'Power point install', amount: 145, billingType: 'one-off' },
      { label: 'Lighting install', amount: 220, billingType: 'one-off' },
      { label: 'Labour', amount: 380, billingType: 'one-off' },
    ],
    inclusions: ['Licensed electrician', 'Compliance certificate where required'],
    suggestedSummary: 'Electrical works — inspection, installs and labour as listed.',
    suggestedPaymentTerms: '50% deposit to schedule. Balance due on completion.',
  },
  {
    id: 'painter-job',
    label: 'Painter Job Quote',
    lineItems: [
      { label: 'Surface prep', amount: 350, billingType: 'one-off' },
      { label: 'Internal painting', amount: 1200, billingType: 'one-off' },
      { label: 'Materials', amount: 280, billingType: 'one-off' },
      { label: 'Labour', amount: 890, billingType: 'one-off' },
    ],
    inclusions: ['Quality paint specified', 'Clean-up included'],
    suggestedSummary: 'Painting scope — prep, materials, internal painting and labour.',
    suggestedPaymentTerms: '50% deposit to commence. Balance due on completion.',
  },
  {
    id: 'fencing-job',
    label: 'Fencing Job Quote',
    lineItems: [
      { label: 'Site measure', amount: 80, billingType: 'one-off' },
      { label: 'Timber / Colorbond fencing', amount: 2400, billingType: 'one-off' },
      { label: 'Posts & materials', amount: 650, billingType: 'one-off' },
      { label: 'Labour', amount: 1100, billingType: 'one-off' },
    ],
    inclusions: ['Site clean-up', 'Standard gate hardware where quoted'],
    suggestedSummary: 'Fencing installation — measure, materials, install and labour.',
    suggestedPaymentTerms: '50% deposit to order materials. Balance on completion.',
  },
  {
    id: 'landscaping-job',
    label: 'Landscaping Job Quote',
    lineItems: [
      { label: 'Site visit', amount: 90, billingType: 'one-off' },
      { label: 'Turf / garden prep', amount: 480, billingType: 'one-off' },
      { label: 'Materials', amount: 520, billingType: 'one-off' },
      { label: 'Labour', amount: 760, billingType: 'one-off' },
    ],
    inclusions: ['Green waste removal', 'Basic irrigation check where applicable'],
    suggestedSummary: 'Landscaping works — site visit, prep, materials and labour.',
    suggestedPaymentTerms: '50% deposit to commence. Balance due on completion.',
  },
]

export const PRICING_PRESETS: PricingPreset[] = [...dosPresets, ...tradiePresets]

export type PackagePrice = {
  id: QuoteTypeId
  label: string
  setupPrice: number | null
  monthlyPrice: number | null
  yearlyPrice: number | null
  inclusions: string[]
  suggestedSummary: string
  suggestedPaymentTerms?: string
  hasPrice: boolean
  missingMessage?: string
}

function safeAmount(amount: number): number {
  return Number.isFinite(amount) && amount >= 0 ? amount : 0
}

export function getPresetByQuoteType(
  quoteTypeId: QuoteTypeId,
): PricingPreset | undefined {
  return PRICING_PRESETS.find((p) => p.id === quoteTypeId)
}

export function getPackagePriceById(
  packageId: QuoteTypeId,
): PackagePrice | undefined {
  const preset = getPresetByQuoteType(packageId)
  if (!preset) return undefined

  const setupPrice = preset.lineItems
    .filter((item) => item.billingType === 'one-off')
    .reduce((sum, item) => sum + safeAmount(item.amount), 0)
  const monthlyPrice = preset.lineItems
    .filter((item) => item.billingType === 'monthly')
    .reduce((sum, item) => sum + safeAmount(item.amount), 0)
  const yearlyPrice = preset.lineItems
    .filter((item) => item.billingType === 'yearly')
    .reduce((sum, item) => sum + safeAmount(item.amount), 0)
  const hasPrice = setupPrice > 0 || monthlyPrice > 0 || yearlyPrice > 0

  return {
    id: preset.id,
    label: preset.label || 'Custom Package',
    setupPrice: setupPrice > 0 ? setupPrice : null,
    monthlyPrice: monthlyPrice > 0 ? monthlyPrice : null,
    yearlyPrice: yearlyPrice > 0 ? yearlyPrice : null,
    inclusions: preset.inclusions,
    suggestedSummary: preset.suggestedSummary ?? '',
    suggestedPaymentTerms: preset.suggestedPaymentTerms,
    hasPrice,
    missingMessage: hasPrice ? undefined : 'Pricing missing — please set price',
  }
}

export function applyPresetToLineItems(preset: PricingPreset) {
  return preset.lineItems.map((item) =>
    createLineItem({
      ...item,
      label: item.label.trim() || preset.label,
      amount: safeAmount(item.amount),
    }),
  )
}

export function getPresetOptionsForSidebar() {
  return PRICING_PRESETS.map((p) => ({ id: p.id, label: p.label }))
}

const WEBSITE_PACKAGE_IDS = new Set<QuoteTypeId>([
  'dos-website-starter',
  'dos-website-growth',
  'dos-website-premium',
  'dos-website-custom',
])

const ADDON_SERVICE_IDS = new Set<QuoteTypeId>([
  'micah-sba',
  'smart-chat-widget',
  'agentmate-setup',
  'google-business-setup',
  'email-setup',
  'dos-ai-automation',
])

const SUPPORT_HOSTING_IDS = new Set<QuoteTypeId>(['hosting-support'])

export type PricingCatalogGroup = {
  id: 'website' | 'addon' | 'support'
  label: string
  options: { id: QuoteTypeId; label: string }[]
}

const websiteDropdownLabels: Partial<Record<QuoteTypeId, string>> = {
  'dos-website-starter': 'Starter',
  'dos-website-growth': 'Growth',
  'dos-website-premium': 'Premium',
  'dos-website-custom': 'Custom',
}

export function getPricingCatalogGroups(): PricingCatalogGroup[] {
  const website = PRICING_PRESETS.filter((p) => WEBSITE_PACKAGE_IDS.has(p.id))
  const addons = PRICING_PRESETS.filter((p) => ADDON_SERVICE_IDS.has(p.id))
  const support = PRICING_PRESETS.filter((p) => SUPPORT_HOSTING_IDS.has(p.id))

  return [
    {
      id: 'website',
      label: 'DOS Website Packages',
      options: website.map((p) => ({
        id: p.id,
        label: websiteDropdownLabels[p.id] ?? p.label,
      })),
    },
    {
      id: 'addon',
      label: 'Add-on Services',
      options: addons.map((p) => ({ id: p.id, label: p.label })),
    },
    {
      id: 'support',
      label: 'Support & Hosting',
      options: support.map((p) => ({ id: p.id, label: p.label })),
    },
  ]
}

export type QuotePricingValidation = {
  canSend: boolean
  statusLabel: 'Ready to send' | 'Price missing'
  warnings: string[]
}

export function validateQuotePricing(
  quote: QuoteFormState,
): QuotePricingValidation {
  const warnings: string[] = []
  const selectedPackage = getPackagePriceById(quote.quoteTypeId)

  if (!quote.quoteTypeId) {
    warnings.push('Package missing')
  }

  if (!selectedPackage?.hasPrice) {
    warnings.push('Price missing')
  }

  if (!selectedPackage?.label?.trim()) {
    warnings.push('Package name missing')
  }

  const hasInvalidLine = quote.lineItems.some(
    (item) => !Number.isFinite(item.amount) || item.amount < 0,
  )
  if (hasInvalidLine) {
    warnings.push('Invalid price')
  }

  const hasBrokenRecurring = quote.lineItems.some(
    (item) =>
      item.billingType !== 'one-off' &&
      (!Number.isFinite(item.amount) || item.amount <= 0),
  )
  if (hasBrokenRecurring) {
    warnings.push('Recurring price missing')
  }

  return {
    canSend: warnings.length === 0,
    statusLabel: warnings.length === 0 ? 'Ready to send' : 'Price missing',
    warnings,
  }
}
