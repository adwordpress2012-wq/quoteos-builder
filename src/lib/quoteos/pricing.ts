import { createLineItem, type QuoteTypeId } from './types'
import type { LineItem } from './types'

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

export function getPresetByQuoteType(
  quoteTypeId: QuoteTypeId,
): PricingPreset | undefined {
  return PRICING_PRESETS.find((p) => p.id === quoteTypeId)
}

export function applyPresetToLineItems(preset: PricingPreset) {
  return preset.lineItems.map((item) => createLineItem(item))
}

export function getPresetOptionsForSidebar() {
  return PRICING_PRESETS.map((p) => ({ id: p.id, label: p.label }))
}
