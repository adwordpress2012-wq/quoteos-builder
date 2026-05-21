import { calculateTotals, formatAud } from './calculations'
import { buildMemorySummary, parseMicahPrompt } from './generateQuote'
import { getPackagePriceById, validateQuotePricing } from './pricing'
import type { SqbaSetupConfig } from './setup-wizard'
import { getFollowUpDays } from './setup-wizard'
import { getBusinessLabel } from './sqba-config'
import type {
  BillingType,
  BusinessTypeId,
  MicahActionId,
  QuoteFormState,
} from './types'

export type MicahSuggestionInput = {
  text: string
  contactName?: string
  projectTitle?: string
  businessName?: string
}

export type MicahSuggestionResult = {
  text: string
  note: string
}

export type MicahLineItemSuggestion = {
  label: string
  amount?: number
  billingType: BillingType
  note?: string
}

export type MicahQuickQuoteResult = {
  mode: 'quick-quote'
  packageName: string
  projectSummary: string
  lineItems: MicahLineItemSuggestion[]
  inclusions: string[]
  pricingGuidance: string
  emailDraft: string
  followUpSuggestion: string
  dealNote: string
  ctaRecommendation: string
  marginNote: string
  reviewRequired: true
}

export type MicahDealStrategyResult = {
  mode: 'deal-strategy'
  packageRecommendation: string
  smartTips: string[]
  ctaRecommendation: string
  trustWording: string
  marginNote: string
  discountGuidance: string
  reviewRequired: true
}

export type MicahQuoteHealthResult = {
  mode: 'quote-health'
  score: number
  warnings: string[]
  smartTips: string[]
  marginNote: string
  reviewRequired: true
}

export type MicahFollowUpSuggestionResult = {
  mode: 'follow-up'
  recommendation: string
  emailDraft: string
  smsDraft: string
  nextStep: string
  reviewRequired: true
}

export type MicahEmailRewriteResult = {
  mode: 'email-rewrite'
  tone: string
  subject: string
  body: string
  reviewRequired: true
}

export type MicahSmsDraftResult = {
  mode: 'sms-draft'
  text: string
  reviewRequired: true
}

export type MicahInvoiceSuggestionResult = {
  mode: 'invoice-placeholder'
  canSuggestInvoice: boolean
  suggestion: string
  reviewRequired: true
}

const REVIEW_REQUIRED = true as const

const packageWords: Record<BusinessTypeId, string> = {
  plumber: 'Plumbing',
  electrician: 'Electrical',
  painter: 'Painting',
  fencing: 'Fencing',
  landscaping: 'Landscaping',
  agency: 'Website Growth',
  'dos-client': 'Digital Growth',
}

function normalise(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

function hasAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

function getQuoteName(quote: QuoteFormState): string {
  return (
    normalise(quote.projectTitle) ||
    normalise(quote.projectSummary) ||
    'this quote'
  )
}

function getCustomerName(quote: QuoteFormState): string {
  return (
    normalise(quote.contactName) ||
    normalise(quote.clientBusinessName) ||
    'there'
  )
}

function getSelectedPackageName(quote: QuoteFormState): string {
  const price = getPackagePriceById(quote.quoteTypeId)
  if (price?.label) return price.label
  if (quote.projectTitle.trim()) return normalise(quote.projectTitle)
  return inferPackageName(
    quote.projectSummary || quote.micahPrompt,
    quote.businessTypeId,
  )
}

function formatCurrentPrice(quote: QuoteFormState): string {
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  const parts: string[] = []

  if (totals.oneOffTotal > 0) {
    parts.push(`${formatAud(totals.oneOffTotal)} setup`)
  }
  if (totals.monthlyRecurringTotal > 0) {
    parts.push(`${formatAud(totals.monthlyRecurringTotal)}/month support`)
  }
  if (totals.yearlyRecurringTotal > 0) {
    parts.push(`${formatAud(totals.yearlyRecurringTotal)}/year support`)
  }

  return parts.join(' plus ') || 'Pricing missing — please set price'
}

function getQuoteInclusionText(quote: QuoteFormState): string {
  const inclusions = quote.inclusions.length
    ? quote.inclusions
    : quote.lineItems.map((item) => item.label).filter(Boolean)

  return inclusions.slice(0, 4).join(', ') || 'the selected scope'
}

function getSimplePackageName(quote: QuoteFormState): string {
  const text = `${quote.projectTitle} ${quote.projectSummary} ${quote.micahPrompt}`.toLowerCase()
  if (/booking|calendar|schedule/.test(text)) return 'Smart Booking Package'
  if (/lead|form|google|capture/.test(text)) return 'Lead Capture Package'
  if (/support|hosting|maintenance/.test(text)) return 'Support Package'
  if (/website|one-page|site/.test(text)) return 'Website Growth Package'
  if (quote.businessTypeId === 'plumber') return 'Plumbing Starter Growth Package'
  return `${getBusinessLabel(quote.businessTypeId)} Starter Growth Package`
}

export function answerMicahQuestion(
  question: string,
  quote: QuoteFormState,
): string {
  const lower = question.toLowerCase()
  const packageName = getSelectedPackageName(quote)
  const customer = getCustomerName(quote)
  const price = formatCurrentPrice(quote)
  const validation = validateQuotePricing(quote)
  const inclusions = getQuoteInclusionText(quote)
  const status = quote.quoteStatus.replace('-', ' ')
  const packageLabel = getSimplePackageName(quote)

  if (/how much|price|cost|charge|one-page|one page|google|email/.test(lower)) {
    if (quote.quoteTypeId === 'dos-website-growth') {
      return 'This quote is $1,990 setup plus $49/month ongoing support.'
    }
    return `This quote is ${price}. It includes ${inclusions}. Packaged as a ${packageLabel} so it is easier for ${customer} to approve.`
  }

  if (/cheaper|discount|reduce|budget|profitable|margin/.test(lower)) {
    return `Keep the one-page website and Google setup, but move optional extras into add-ons. That keeps the core package simple without removing margin. Current offer: ${price}.`
  }

  if (/what should i charge|charge .*|send .*|send to|luke/.test(lower)) {
    return `Send the packaged offer instead of itemising every small task. Present ${packageName} at ${price} to ${customer} — easier to approve. Review before sending.`
  }

  if (/support|ongoing|maintenance|hosting|add support/.test(lower)) {
    return quote.lineItems.some((item) => item.billingType !== 'one-off')
      ? `Support is already included: ${price}. Keep it labelled as Ongoing support so the customer understands it is aftercare, not admin fluff.`
      : `Yes. Add a simple Ongoing support line, usually monthly or yearly. For this quote, keep the main ${packageLabel} clean and show support as an optional add-on.`
  }

  if (/follow.?up|chase|remind|prepare follow/.test(lower)) {
    return `Here is a soft follow-up for ${customer} (review before sending): "Hi ${customer}, just checking in on ${packageName}. Happy to answer questions or tweak scope if needed." Quote status: ${status}.`
  }

  if (/invoice/.test(lower)) {
    return quote.quoteStatus === 'accepted'
      ? `This quote is accepted, so you can create an invoice from ${packageName} for ${price}. Include deposit and balance if the customer has not already paid.`
      : `Create the invoice after the quote is accepted. Right now it is ${status}; send or follow up on ${packageName} first, then invoice from the approved price.`
  }

  if (/casual|friendly|less formal/.test(lower)) {
    return `Casual version: "Hey ${customer}, I have put together ${packageName}. It comes to ${price} and keeps the offer simple: ${inclusions}. If it looks good, reply approved and we will lock in the next step."`
  }

  if (!validation.canSend) {
    return `Price missing — please set price before sending. Once pricing is set, package this as ${packageLabel} so the customer sees one clear offer.`
  }

  return `${packageName} is ${price}. It is packaged as a ${packageLabel} with ${inclusions}. This is easier for the customer to approve than a long list of small tasks.`
}

function inferPackageName(prompt: string, businessType: BusinessTypeId): string {
  const lower = prompt.toLowerCase()
  const base = packageWords[businessType] ?? getBusinessLabel(businessType)

  if (hasAny(lower, [/website|one-page|site|scw|smart chat|google/])) {
    return `${base} Starter Growth Package`
  }
  if (hasAny(lower, [/hot water|urgent|fast|same-day|same day/])) {
    return `${base} Priority Service Package`
  }
  if (hasAny(lower, [/support|maintenance|hosting|monthly/])) {
    return `${base} Support Package`
  }
  return `${base} Service Package`
}

function quickQuoteLineItems(
  prompt: string,
  businessType: BusinessTypeId,
): MicahLineItemSuggestion[] {
  const lower = prompt.toLowerCase()

  if (hasAny(lower, [/website|one-page|site|scw|smart chat|google/])) {
    return [
      {
        label: 'Package setup and project delivery',
        amount: 2490,
        billingType: 'one-off',
        note: 'Bundle the website, setup and launch work instead of over-itemising.',
      },
      {
        label: 'Smart Chat Widget setup',
        amount: 297,
        billingType: 'one-off',
      },
      {
        label: 'Hosting, support and light updates',
        amount: 79,
        billingType: 'monthly',
        note: 'Keeps recurring support visible from the start.',
      },
    ]
  }

  if (businessType === 'plumber' && hasAny(lower, [/hot water/])) {
    return [
      { label: 'Inspection / callout', amount: 120, billingType: 'one-off' },
      {
        label: 'Supply and install hot water system',
        billingType: 'one-off',
        note: 'Confirm model and site conditions before final price.',
      },
      { label: 'Materials and fittings', billingType: 'one-off' },
      { label: 'Removal and disposal of old unit', billingType: 'one-off' },
      { label: 'Labour and commissioning', billingType: 'one-off' },
    ]
  }

  return [
    { label: 'Site inspection / callout', billingType: 'one-off' },
    { label: 'Materials and parts', billingType: 'one-off' },
    { label: 'Labour and completion', billingType: 'one-off' },
  ]
}

function quickQuoteInclusions(
  prompt: string,
  businessType: BusinessTypeId,
): string[] {
  const lower = prompt.toLowerCase()

  if (hasAny(lower, [/website|one-page|site|scw|smart chat|google/])) {
    return [
      'Mobile-friendly one-page website',
      'Smart Chat Widget for enquiries',
      'Google Business setup guidance',
      'Booking or contact form',
      'Optional hosting and support',
    ]
  }

  if (businessType === 'plumber' && hasAny(lower, [/hot water/])) {
    return [
      'Inspection and site confirmation',
      'Supply and installation as approved',
      'Old unit disposal where accessible',
      'Materials and standard fittings',
      'Labour, testing and warranty wording',
    ]
  }

  return [
    'Clear scope of work',
    'Materials listed separately where needed',
    'Labour included for approved scope',
    'Warranty or workmanship wording',
  ]
}

function quoteHasRecurring(quote: QuoteFormState): boolean {
  return quote.lineItems.some((item) => item.billingType !== 'one-off')
}

function quoteHasDeposit(quote: QuoteFormState): boolean {
  return quote.depositEnabled || /deposit/i.test(quote.paymentTerms)
}

function quoteHasScopeBoundaries(quote: QuoteFormState): boolean {
  const text = `${quote.projectSummary} ${quote.internalNotes} ${quote.inclusions.join(
    ' ',
  )}`
  return /scope|exclude|variation|additional|allowance|subject to/i.test(text)
}

export function generateQuickQuoteFromPrompt(
  prompt: string,
  businessType: BusinessTypeId = 'plumber',
  setup?: SqbaSetupConfig | null,
): MicahQuickQuoteResult {
  const parsed = parseMicahPrompt(prompt)
  const businessTypeId = businessType || parsed.businessTypeId
  const packageName = inferPackageName(prompt, businessTypeId)
  const summary =
    normalise(prompt) ||
    parsed.projectSummary ||
    `${getBusinessLabel(businessTypeId)} quote prepared from rough notes.`

  return {
    mode: 'quick-quote',
    packageName,
    projectSummary: summary,
    lineItems: quickQuoteLineItems(prompt, businessTypeId),
    inclusions: quickQuoteInclusions(prompt, businessTypeId),
    pricingGuidance:
      'Use a package price for the client-facing quote, then keep internal costing underneath so margin is protected.',
    emailDraft: `Hi there,\n\nThanks for the details. I have put together a simple package for ${summary}.\n\nPlease review the inclusions and let me know if you would like to go ahead. Once confirmed, we can lock in the next step.\n\nCheers`,
    followUpSuggestion:
      setup && getFollowUpDays(setup) !== null
        ? `If the quote is not accepted within ${getFollowUpDays(setup)} business days, send a soft follow-up offering to answer questions or adjust scope.`
        : setup?.followUp === 'manual'
          ? 'Follow up manually when it feels right — no automatic reminder in this MVP.'
          : 'If the quote is not accepted within 2 business days, send a soft follow-up offering to answer questions or adjust scope.',
    dealNote:
      'I recommend packaging this rather than listing every small task separately. It keeps the offer easier to understand and easier to approve.',
    ctaRecommendation:
      'Ask the customer to reply with approval so you can confirm timing and deposit details.',
    marginNote:
      'Keep extras, urgent attendance and revisions outside the base scope unless they are clearly priced.',
    reviewRequired: REVIEW_REQUIRED,
  }
}

export function generateDealStrategy(
  quote: QuoteFormState,
): MicahDealStrategyResult {
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  const lineCount = quote.lineItems.length
  const hasRecurring = quoteHasRecurring(quote)
  const isPriceSensitive =
    /budget|cheap|price|cost|tight/i.test(
      `${quote.projectSummary} ${quote.internalNotes}`,
    ) || totals.oneOffTotal < 800

  return {
    mode: 'deal-strategy',
    packageRecommendation:
      lineCount > 4
        ? 'Package this into one clear offer with a short inclusion list, then keep the detailed costing internal.'
        : 'Keep the quote simple and outcome-focused so the customer can approve it quickly.',
    smartTips: [
      isPriceSensitive
        ? 'Use simple wording and avoid adding optional extras unless they solve a clear problem.'
        : 'Lead with the outcome and timing, then show the included support so the price feels justified.',
      hasRecurring
        ? 'Keep the recurring support visible as ongoing protection, not an afterthought.'
        : 'If there is aftercare, hosting, maintenance or support, add it as an optional recurring line.',
      'Use trust wording around licensed work, warranty, clean-up, support or response time where relevant.',
    ],
    ctaRecommendation:
      'Use a direct CTA: "Reply approved and we will confirm the booking and deposit details."',
    trustWording:
      'All work is scoped clearly, completed professionally, and reviewed with you before any extra costs are added.',
    marginNote:
      'Avoid discounting first. If the customer pushes back, reduce scope before reducing price.',
    discountGuidance:
      'Offer a smaller package or optional stage two instead of cutting the full-scope price.',
    reviewRequired: REVIEW_REQUIRED,
  }
}

export function generateQuoteHealth(quote: QuoteFormState): MicahQuoteHealthResult {
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  const pricingValidation = validateQuotePricing(quote)
  const warnings: string[] = []
  const smartTips: string[] = []

  if (!pricingValidation.canSend) {
    warnings.push('Price missing')
  }

  if (totals.oneOffTotal > 0 && totals.oneOffTotal < 500) {
    warnings.push('Quote may be too low for callout, admin time and margin.')
  }

  if (quote.inclusions.length > 5 && totals.oneOffTotal < 1500) {
    warnings.push('There may be too many inclusions for the price.')
  }

  if (!quoteHasRecurring(quote) && /website|hosting|support|maintenance|scw|chat/i.test(`${quote.projectSummary} ${quote.projectTitle}`)) {
    warnings.push('Missing recurring fee for support, hosting or ongoing service.')
  }

  if (!quoteHasDeposit(quote)) {
    warnings.push('Missing deposit requirement.')
  }

  if (!quote.quoteExpiryDate) {
    warnings.push('Missing quote expiry date.')
  }

  if (!quoteHasScopeBoundaries(quote)) {
    warnings.push('Missing scope boundaries or variation wording.')
  }

  if (quote.lineItems.length > 5) {
    smartTips.push('Consider a package line with a short inclusion list to reduce decision friction.')
  }

  smartTips.push('Keep the next step clear so the customer knows how to accept.')

  return {
    mode: 'quote-health',
    score: Math.max(20, 100 - warnings.length * 12),
    warnings,
    smartTips,
    marginNote:
      warnings.length > 0
        ? 'Review the warnings before sending so the job does not quietly lose margin.'
        : 'Margin basics look covered. Still review costs before sending.',
    reviewRequired: REVIEW_REQUIRED,
  }
}

export function generateFollowUpSuggestion(
  quote: QuoteFormState,
  setup?: SqbaSetupConfig | null,
): MicahFollowUpSuggestionResult {
  const followDays = setup ? getFollowUpDays(setup) : null
  const name = getCustomerName(quote)
  const project = getQuoteName(quote)

  if (quote.quoteStatus === 'accepted') {
    return {
      mode: 'follow-up',
      recommendation: 'Send an accepted quote next-step message.',
      emailDraft: `Hi ${name},\n\nThanks for approving ${project}. The next step is to confirm timing and deposit details so we can get everything booked in.\n\nPlease review and confirm the details before we proceed.\n\nCheers`,
      smsDraft: `Hi ${name}, thanks for approving ${project}. Please review the next-step details and confirm when ready.`,
      nextStep: 'Confirm booking, deposit and start date. Do not auto-send.',
      reviewRequired: REVIEW_REQUIRED,
    }
  }

  if (quote.quoteStatus === 'sent' || quote.quoteStatus === 'follow-up') {
    const timing =
      followDays !== null
        ? ` (your setup: follow up after ${followDays} business days)`
        : ''
    return {
      mode: 'follow-up',
      recommendation: `Send a soft follow-up${timing}.`,
      emailDraft: `Hi ${name},\n\nJust checking in on the quote for ${project}. No pressure at all. Happy to answer any questions or adjust the scope if needed.\n\nCheers`,
      smsDraft: `Hi ${name}, just checking in on the quote for ${project}. Happy to answer any questions. Please review before sending.`,
      nextStep:
        followDays !== null
          ? `Schedule a soft follow-up in ${followDays} business days. Do not discount first.`
          : 'Offer help, then let the customer decide. Do not discount first.',
      reviewRequired: REVIEW_REQUIRED,
    }
  }

  const prepTiming =
    followDays === null
      ? 'manual follow-up only'
      : `soft follow-up in ${followDays} business days after sending`

  return {
    mode: 'follow-up',
    recommendation: `Prepare the quote email first, then ${prepTiming}.`,
    emailDraft: `Hi ${name},\n\nThanks again for the opportunity to quote ${project}. Please review the details and let me know if you would like to go ahead.\n\nCheers`,
    smsDraft: `Hi ${name}, your quote for ${project} is ready to review. Reply with any questions.`,
    nextStep: 'Send only after the operator reviews and confirms.',
    reviewRequired: REVIEW_REQUIRED,
  }
}

export function generateEmailRewrite(
  emailText: string,
  tone: string = 'practical',
): MicahEmailRewriteResult {
  const base = normalise(emailText) || 'Your quote is ready for review.'
  const isCasual = /casual|friendly|australian|au/i.test(tone)

  return {
    mode: 'email-rewrite',
    tone,
    subject: 'Quote ready for review',
    body: isCasual
      ? `Hi there,\n\nThanks for reaching out. ${base}\n\nIf everything looks good, reply approved and we will confirm the next step.\n\nCheers`
      : `Hi there,\n\nThank you for the opportunity to quote. ${base}\n\nPlease review the details and reply with approval if you would like to proceed.\n\nKind regards`,
    reviewRequired: REVIEW_REQUIRED,
  }
}

export function generateSmsDraft(quote: QuoteFormState): MicahSmsDraftResult {
  const name = getCustomerName(quote)
  const project = getQuoteName(quote)

  return {
    mode: 'sms-draft',
    text: `Hi ${name}, your quote for ${project} is ready to review. Reply with any questions, or confirm when you are happy to go ahead.`,
    reviewRequired: REVIEW_REQUIRED,
  }
}

export function generateInvoiceSuggestion(
  quote: QuoteFormState,
): MicahInvoiceSuggestionResult {
  return {
    mode: 'invoice-placeholder',
    canSuggestInvoice: quote.quoteStatus === 'accepted',
    suggestion:
      quote.quoteStatus === 'accepted'
        ? 'Generate PDF invoice from quote.'
        : 'Invoice suggestion appears once the quote is marked Accepted.',
    reviewRequired: REVIEW_REQUIRED,
  }
}

export function generateCustomerMemoryPlaceholder(
  quote: QuoteFormState,
): string {
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  return buildMemorySummary(quote, totals.oneOffTotal)
}

/**
 * Placeholder Micah Writing Assistant - swap for OpenAI/API later.
 */
export function generateMicahSuggestion(
  action: MicahActionId,
  input: MicahSuggestionInput,
): MicahSuggestionResult {
  const base = input.text.trim() || 'Your quote is ready for review.'
  const name = input.contactName?.trim() || 'there'
  const project = input.projectTitle?.trim() || 'your project'
  const business = input.businessName?.trim() || 'our team'

  switch (action) {
    case 'fix-grammar':
      return {
        text: base
          .replace(/\bi\b/g, 'I')
          .replace(/\s+/g, ' ')
          .replace(/\.{2,}/g, '.')
          .trim(),
        note: 'MVP: basic grammar cleanup applied locally.',
      }
    case 'make-professional':
      return {
        text: `Thank you for the opportunity to quote on ${project}. ${base} Please review the details and confirm before we proceed.`,
        note: 'MVP: professional tone template.',
      }
    case 'make-casual-au':
      return {
        text: `G'day ${name} - thanks for reaching out about ${project}. ${base} Give us a shout if you have any questions. Cheers, ${business}`,
        note: 'MVP: casual Australian tone template.',
      }
    case 'improve-cta':
      return {
        text: `${base}\n\nTo accept this quote, reply approved and we will confirm timing and deposit details. Please review everything before confirming.`,
        note: 'MVP: CTA enhancement appended.',
      }
    case 'create-quote-email':
      return {
        text: `Hi ${name},\n\nThanks for your enquiry about ${project}. Please find your quote ready for review.\n\n${base}\n\nIf you are happy to proceed, reply approved and we will confirm the next step and deposit details.\n\nKind regards,\n${business}\nQuoteOS - Powered by DOS`,
        note: 'MVP: full quote email draft generated locally.',
      }
    case 'create-follow-up':
      return {
        text: `Hi ${name},\n\nJust checking in on the quote we sent through for ${project}. No pressure at all - happy to answer any questions or adjust scope if needed.\n\nCheers,\n${business}`,
        note: 'MVP: soft follow-up template.',
      }
    case 'create-payment-reminder':
      return {
        text: `Hi ${name},\n\nFriendly reminder regarding the deposit for ${project}. Once received, we can lock in the next step.\n\nLet us know if you need the payment details resent.\n\nThanks,\n${business}`,
        note: 'MVP: payment reminder template.',
      }
    case 'create-shorter':
      return {
        text: base.length > 120 ? `${base.slice(0, 117).trim()}...` : base,
        note: 'MVP: shortened to about 120 characters.',
      }
    default:
      return { text: base, note: 'MVP: no transformation applied.' }
  }
}

export function formatMicahQuickQuote(result: MicahQuickQuoteResult): string {
  const lines = result.lineItems.map((item) => {
    const amount = item.amount ? ` - ${formatAud(item.amount)}` : ''
    const recurring =
      item.billingType === 'monthly'
        ? ' / month'
        : item.billingType === 'yearly'
          ? ' / year'
          : ''
    return `- ${item.label}${amount}${recurring}`
  })

  return [
    `Suggested package: ${result.packageName}`,
    '',
    result.dealNote,
    '',
    'Line items:',
    ...lines,
    '',
    `Margin note: ${result.marginNote}`,
    `CTA: ${result.ctaRecommendation}`,
    '',
    'Review before sending. Micah will not auto-send.',
  ].join('\n')
}
