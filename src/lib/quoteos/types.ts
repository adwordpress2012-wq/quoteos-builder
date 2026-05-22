import { generateNextQuoteNumber } from './numbering'

export type BillingType = 'one-off' | 'monthly' | 'yearly'

export type BusinessTypeId =
  | 'plumber'
  | 'electrician'
  | 'painter'
  | 'fencing'
  | 'landscaping'
  | 'agency'
  | 'dos-client'

export type QuoteStatus =
  | 'draft'
  | 'sent'
  | 'follow-up'
  | 'accepted'
  | 'lost'

export type PackageTierId = 'starter' | 'growth' | 'premium'

/** Tradie quote category — manual line items carry the real pricing. */
export type QuoteTypeId =
  | 'plumbing'
  | 'electrical'
  | 'building'
  | 'painting'
  | 'general_trade'
  | 'custom'

export type QuoteTypeOption = {
  id: QuoteTypeId
  label: string
}

export const QUOTE_TYPE_OPTIONS: QuoteTypeOption[] = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'building', label: 'Building' },
  { id: 'painting', label: 'Painting' },
  { id: 'general_trade', label: 'General trade' },
  { id: 'custom', label: 'Custom' },
]

export type LineItem = {
  id: string
  label: string
  quantity?: number
  amount: number
  billingType: BillingType
}

export type QuoteFormState = {
  clientBusinessName: string
  contactName: string
  email: string
  phone: string
  jobAddress: string
  quoteNumber: string
  paymentPayId: string
  paymentAccountName: string
  paymentBsb: string
  paymentAccountNumber: string
  businessType: string
  businessTypeId: BusinessTypeId
  sqbaQuoteOptionId: string
  projectTitle: string
  quoteTypeId: QuoteTypeId
  projectSummary: string
  internalNotes: string
  paymentInstructions: string
  quoteExpiryDate: string
  paymentTerms: string
  lineItems: LineItem[]
  inclusions: string[]
  depositEnabled: boolean
  quoteStatus: QuoteStatus
  packageTier: PackageTierId | null
  micahPrompt: string
  quoteGenerated: boolean
}

export type QuoteTotals = {
  subtotal: number
  oneOffTotal: number
  monthlyRecurringTotal: number
  yearlyRecurringTotal: number
  depositAmount: number
  remainingBalance: number
}

export type MicahActionId =
  | 'fix-grammar'
  | 'make-professional'
  | 'make-casual-au'
  | 'improve-cta'
  | 'create-quote-email'
  | 'create-follow-up'
  | 'create-payment-reminder'
  | 'create-shorter'

export const MICAH_ACTIONS: { id: MicahActionId; label: string }[] = [
  { id: 'fix-grammar', label: 'Fix spelling & grammar' },
  { id: 'make-professional', label: 'Make professional' },
  { id: 'make-casual-au', label: 'Make casual Australian' },
  { id: 'improve-cta', label: 'Improve CTA' },
  { id: 'create-quote-email', label: 'Create quote email' },
  { id: 'create-follow-up', label: 'Create soft follow-up email' },
  { id: 'create-payment-reminder', label: 'Create payment reminder' },
  { id: 'create-shorter', label: 'Create shorter version' },
]

export function createLineItem(
  partial?: Partial<Omit<LineItem, 'id'>>,
): LineItem {
  return {
    id: crypto.randomUUID(),
    label: partial?.label ?? '',
    quantity: partial?.quantity ?? 1,
    amount: partial?.amount ?? 0,
    billingType: 'one-off',
  }
}

export function defaultQuoteState(): QuoteFormState {
  return {
    clientBusinessName: '',
    contactName: '',
    email: '',
    phone: '',
    jobAddress: '',
    quoteNumber: generateNextQuoteNumber(),
    paymentPayId: '',
    paymentAccountName: '',
    paymentBsb: '',
    paymentAccountNumber: '',
    businessType: '',
    businessTypeId: 'plumber',
    sqbaQuoteOptionId: 'plumber-custom',
    projectTitle: '',
    quoteTypeId: 'plumbing',
    projectSummary: '',
    internalNotes: '',
    paymentInstructions: 'Please use the quote number as the payment reference.',
    quoteExpiryDate: '',
    paymentTerms: '50% deposit to commence. Balance due on completion.',
    lineItems: [createLineItem({ label: 'Service', amount: 0 })],
    inclusions: [],
    depositEnabled: true,
    quoteStatus: 'draft',
    packageTier: null,
    micahPrompt: '',
    quoteGenerated: false,
  }
}
