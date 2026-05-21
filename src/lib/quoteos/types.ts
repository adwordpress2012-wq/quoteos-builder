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

export type QuoteTypeId =
  | 'dos-website-starter'
  | 'dos-website-growth'
  | 'dos-website-premium'
  | 'dos-website-custom'
  | 'dos-website-rebuild'
  | 'new-website-build'
  | 'micah-sba'
  | 'smart-chat-widget'
  | 'agentmate-setup'
  | 'google-business-setup'
  | 'email-setup'
  | 'hosting-support'
  | 'dos-ai-automation'
  | 'plumber-job'
  | 'electrician-job'
  | 'painter-job'
  | 'fencing-job'
  | 'landscaping-job'
  | 'custom'

export type QuoteTypeOption = {
  id: QuoteTypeId
  label: string
}

export const QUOTE_TYPE_OPTIONS: QuoteTypeOption[] = [
  { id: 'dos-website-starter', label: 'Website Starter Package' },
  { id: 'dos-website-growth', label: 'Website Growth Package' },
  { id: 'dos-website-premium', label: 'Website Premium Package' },
  { id: 'dos-website-custom', label: 'Custom Website Package' },
  { id: 'dos-website-rebuild', label: 'DOS Website Rebuild' },
  { id: 'new-website-build', label: 'New Website Build' },
  { id: 'micah-sba', label: 'Micah SBA' },
  { id: 'smart-chat-widget', label: 'Smart Chat Widget' },
  { id: 'agentmate-setup', label: 'AgentMate Setup' },
  { id: 'google-business-setup', label: 'Google Business Setup' },
  { id: 'email-setup', label: 'Email Setup' },
  { id: 'hosting-support', label: 'Hosting & Support' },
  { id: 'dos-ai-automation', label: 'DOS AI Automation Package' },
  { id: 'plumber-job', label: 'Plumber Job Quote' },
  { id: 'electrician-job', label: 'Electrician Job Quote' },
  { id: 'painter-job', label: 'Painter Job Quote' },
  { id: 'fencing-job', label: 'Fencing Job Quote' },
  { id: 'landscaping-job', label: 'Landscaping Job Quote' },
  { id: 'custom', label: 'Custom Quote' },
]

export type LineItem = {
  id: string
  label: string
  amount: number
  billingType: BillingType
}

export type QuoteFormState = {
  clientBusinessName: string
  contactName: string
  email: string
  phone: string
  businessType: string
  businessTypeId: BusinessTypeId
  sqbaQuoteOptionId: string
  projectTitle: string
  quoteTypeId: QuoteTypeId
  projectSummary: string
  internalNotes: string
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
    amount: partial?.amount ?? 0,
    billingType: partial?.billingType ?? 'one-off',
  }
}

export function defaultQuoteState(): QuoteFormState {
  return {
    clientBusinessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    businessTypeId: 'plumber',
    sqbaQuoteOptionId: 'plumber-custom',
    projectTitle: '',
    quoteTypeId: 'custom',
    projectSummary: '',
    internalNotes: '',
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
