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

const TRADIE_PRESETS: PricingPreset[] = [
  {
    id: 'plumbing',
    label: 'Plumbing',
    lineItems: [
      { label: 'Callout / inspection', amount: 120, billingType: 'one-off' },
      { label: 'Labour', amount: 320, billingType: 'one-off' },
      { label: 'Parts & materials', amount: 185, billingType: 'one-off' },
    ],
    inclusions: ['Licensed plumber', 'Workmanship guarantee'],
    suggestedSummary: 'Plumbing works as scoped — callout, labour and materials.',
    suggestedPaymentTerms: '50% deposit to book. Balance due on completion.',
  },
  {
    id: 'electrical',
    label: 'Electrical',
    lineItems: [
      { label: 'Inspection', amount: 95, billingType: 'one-off' },
      { label: 'Labour', amount: 380, billingType: 'one-off' },
      { label: 'Materials', amount: 120, billingType: 'one-off' },
    ],
    inclusions: ['Licensed electrician', 'Compliance certificate where required'],
    suggestedSummary: 'Electrical works — inspection, labour and materials as listed.',
    suggestedPaymentTerms: '50% deposit to schedule. Balance due on completion.',
  },
  {
    id: 'building',
    label: 'Building',
    lineItems: [
      { label: 'Site visit', amount: 150, billingType: 'one-off' },
      { label: 'Labour', amount: 1200, billingType: 'one-off' },
      { label: 'Materials', amount: 650, billingType: 'one-off' },
    ],
    inclusions: ['Work to Australian standards', 'Site clean-up included'],
    suggestedSummary: 'Building works — site visit, labour and materials as scoped.',
    suggestedPaymentTerms: '50% deposit to commence. Balance due on completion.',
  },
  {
    id: 'painting',
    label: 'Painting',
    lineItems: [
      { label: 'Surface prep', amount: 350, billingType: 'one-off' },
      { label: 'Painting labour', amount: 890, billingType: 'one-off' },
      { label: 'Materials', amount: 280, billingType: 'one-off' },
    ],
    inclusions: ['Quality paint specified', 'Clean-up included'],
    suggestedSummary: 'Painting scope — prep, materials and labour.',
    suggestedPaymentTerms: '50% deposit to commence. Balance due on completion.',
  },
  {
    id: 'general_trade',
    label: 'General trade',
    lineItems: [
      { label: 'Callout / site visit', amount: 90, billingType: 'one-off' },
      { label: 'Labour', amount: 480, billingType: 'one-off' },
      { label: 'Materials', amount: 200, billingType: 'one-off' },
    ],
    inclusions: ['Work as per quote scope'],
    suggestedSummary: 'Trade works — site visit, labour and materials as listed.',
    suggestedPaymentTerms: '50% deposit to commence. Balance due on completion.',
  },
  {
    id: 'custom',
    label: 'Custom',
    lineItems: [{ label: 'Line item', amount: 0, billingType: 'one-off' }],
    inclusions: [],
    suggestedSummary: 'Custom quote — add line items and pricing manually.',
    suggestedPaymentTerms: 'Set deposit and balance before sending.',
  },
]

export const PRICING_PRESETS: PricingPreset[] = TRADIE_PRESETS

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
    label: preset.label,
    setupPrice: setupPrice > 0 ? setupPrice : null,
    monthlyPrice: monthlyPrice > 0 ? monthlyPrice : null,
    yearlyPrice: yearlyPrice > 0 ? yearlyPrice : null,
    inclusions: preset.inclusions,
    suggestedSummary: preset.suggestedSummary ?? '',
    suggestedPaymentTerms: preset.suggestedPaymentTerms,
    hasPrice: packageId === 'custom' ? true : hasPrice,
    missingMessage: hasPrice ? undefined : 'Add line items and unit prices',
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

export type QuotePricingValidation = {
  canSend: boolean
  statusLabel: 'Ready to send' | 'Price missing'
  warnings: string[]
}

export function validateQuotePricing(
  quote: QuoteFormState,
): QuotePricingValidation {
  const warnings: string[] = []

  if (!quote.quoteTypeId) {
    warnings.push('Quote category missing')
  }

  const hasPricedLine = quote.lineItems.some(
    (item) =>
      item.label.trim() &&
      Number.isFinite(item.amount) &&
      item.amount > 0 &&
      (item.quantity ?? 1) > 0,
  )
  if (!hasPricedLine) {
    warnings.push('Add at least one line item with qty and unit price')
  }

  const hasInvalidLine = quote.lineItems.some(
    (item) => item.label.trim() && (!Number.isFinite(item.amount) || item.amount < 0),
  )
  if (hasInvalidLine) {
    warnings.push('Invalid unit price on a line item')
  }

  return {
    canSend: warnings.length === 0,
    statusLabel: warnings.length === 0 ? 'Ready to send' : 'Price missing',
    warnings,
  }
}
