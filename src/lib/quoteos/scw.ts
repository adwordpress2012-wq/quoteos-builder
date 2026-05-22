import { calculateTotals, formatAud } from './calculations'
import type { QuoteFormState } from './types'

export const PLUMBING_JOB_TYPES = [
  'hot water system',
  'blocked drain',
  'leaking tap',
  'burst pipe',
  'bathroom plumbing',
  'emergency callout',
  'general maintenance',
  'other',
] as const

export type PlumbingJobType = (typeof PLUMBING_JOB_TYPES)[number]

export type ScwLeadDraft = {
  source: 'quoteos_scw'
  businessType: 'plumber'
  customerName: string
  phone: string
  email: string
  emailSkipped: boolean
  suburb: string
  jobType: PlumbingJobType | ''
  urgency: string
  jobDescription: string
  preferredTime: string
  permissionToContact: boolean | null
  quoteDraftStatus: 'drafting' | 'ready'
  notificationStatus: 'pending'
  channel: 'website_chat'
}

export type SqbaPreparedLead = {
  lead: ScwLeadDraft
  sqbaActions: string[]
  notificationDrafts: {
    internalNotification: string
    resendEmailToTradie: string
    twilioSmsOrWhatsAppToTradie: string
  }
  booking: {
    prompt: string
    placeholderUrl: string
    status: 'request_only'
  }
  reviewRequired: true
}

export type TradieNotificationDraft = {
  subject: string
  body: string
  reviewRequired: true
}

export type OptionalResendEnv = {
  RESEND_API_KEY?: string
  NOTIFICATION_EMAIL?: string
  EMAIL_FROM?: string
}

export type OptionalResendResult = {
  status: 'draft_only' | 'sent' | 'failed'
  draft: TradieNotificationDraft
  reason?: string
}

export type QuotePreparationDraft = {
  suggestedPackageTitle: string
  suggestedLineItems: string[]
  suggestedNotes: string[]
  suggestedFollowUpTiming: string
  suggestedQuoteStatus: 'Draft'
  customerFriendlySummary: string
  reviewRequired: true
}

export type FollowUpDraft = {
  scenario:
    | 'quote_sent_no_reply'
    | 'booking_request_pending'
    | 'invoice_unpaid'
    | 'urgent_lead_not_reviewed'
    | 'lead_review'
  recommendation: string
  emailDraft: string
  smsOrCallNote: string
  reviewRequired: true
}

export type InvoicePaymentDetails = {
  payId?: string
  bankName?: string
  accountName?: string
  bsb?: string
  accountNumber?: string
}

export type InvoiceDraft = {
  invoiceNumber: string
  amount: string
  paymentInstructions: string
  pdfInvoiceWording: string
  dueDate: string
  reviewBeforeSending: true
  missingPaymentDetails: boolean
}

export type OperationalSuggestion = {
  type:
    | 'missing_phone'
    | 'invalid_email'
    | 'urgent_job'
    | 'quote_not_reviewed'
    | 'follow_up_overdue'
    | 'unpaid_invoice'
    | 'recurring_revenue'
    | 'missing_payment_details'
  message: string
}

export type IntakeField =
  | 'jobDescription'
  | 'jobType'
  | 'suburb'
  | 'urgency'
  | 'customerName'
  | 'phone'
  | 'email'
  | 'preferredTime'
  | 'permissionToContact'

export const emptyScwLeadDraft: ScwLeadDraft = {
  source: 'quoteos_scw',
  businessType: 'plumber',
  customerName: '',
  phone: '',
  email: '',
  emailSkipped: false,
  suburb: '',
  jobType: '',
  urgency: '',
  jobDescription: '',
  preferredTime: '',
  permissionToContact: null,
  quoteDraftStatus: 'drafting',
  notificationStatus: 'pending',
  channel: 'website_chat',
}

const FIELD_ORDER: IntakeField[] = [
  'jobDescription',
  'jobType',
  'suburb',
  'urgency',
  'customerName',
  'phone',
  'email',
  'preferredTime',
  'permissionToContact',
]

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
const PHONE_PATTERN = /(?:\+?61|0)?(?:\s?\d){8,10}/
const EMAIL_SKIP_PATTERN = /^(skip|sms only|call me|no email|phone only|call only)$/i

function cleanValue(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}

export function isEmailSkipRequest(value: string): boolean {
  return EMAIL_SKIP_PATTERN.test(cleanValue(value))
}

export function extractValidEmail(value: string): string {
  return cleanValue(value).match(EMAIL_PATTERN)?.[0] ?? ''
}

export function extractValidPhone(value: string): string {
  const phone = cleanValue(value).match(PHONE_PATTERN)?.[0] ?? ''
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 8 && digits.length <= 12 ? phone : ''
}

export function detectPlumbingJobType(text: string): PlumbingJobType | '' {
  const lower = text.toLowerCase()

  if (/hot water|water heater|hws/.test(lower)) return 'hot water system'
  if (/blocked|blockage|drain|toilet blocked|sink blocked/.test(lower)) {
    return 'blocked drain'
  }
  if (/leaking tap|dripping tap|tap leak|mixer/.test(lower)) return 'leaking tap'
  if (/burst pipe|pipe burst|major leak|flood/.test(lower)) return 'burst pipe'
  if (/bathroom|shower|toilet|vanity|basin/.test(lower)) return 'bathroom plumbing'
  if (/emergency|urgent|callout|right now|asap/.test(lower)) return 'emergency callout'
  if (/maintenance|service|repair|general/.test(lower)) return 'general maintenance'

  return ''
}

export function detectUrgency(text: string): string {
  const lower = text.toLowerCase()

  if (/not urgent|no rush|when you can|flexible/.test(lower)) return 'Not urgent'
  if (/today|urgent|asap|now|right away|emergency|burst|damage|flood/.test(lower)) {
    return 'Urgent today'
  }
  if (/tomorrow|this week|soon/.test(lower)) return 'Soon'

  return ''
}

export function looksEmergency(text: string): boolean {
  return /burst|flood|flooding|damage|sewage|gas leak|no hot water|emergency|urgent/i.test(
    text,
  )
}

export function updateScwLeadFromMessage(
  lead: ScwLeadDraft,
  field: IntakeField,
  message: string,
): ScwLeadDraft {
  const text = cleanValue(message)
  const email = extractValidEmail(text)
  const phone = extractValidPhone(text)
  const inferredJobType = detectPlumbingJobType(text)
  const inferredUrgency = detectUrgency(text)
  const updated: ScwLeadDraft = {
    ...lead,
    email: lead.email || email,
    phone: lead.phone || phone,
    jobType: lead.jobType || inferredJobType,
    urgency: lead.urgency || inferredUrgency,
  }

  switch (field) {
    case 'jobDescription':
      updated.jobDescription = updated.jobDescription || text
      break
    case 'jobType':
      updated.jobType = inferredJobType || normaliseJobType(text)
      break
    case 'suburb':
      updated.suburb = text
      break
    case 'urgency':
      updated.urgency = inferredUrgency || text
      break
    case 'customerName':
      updated.customerName = text
      break
    case 'phone':
      updated.phone = phone || text
      break
    case 'email':
      if (isEmailSkipRequest(text)) {
        updated.email = ''
        updated.emailSkipped = true
      } else if (email) {
        updated.email = email
        updated.emailSkipped = false
      }
      break
    case 'preferredTime':
      updated.preferredTime = text
      break
    case 'permissionToContact':
      updated.permissionToContact = /^(y|yes|yeah|yep|ok|sure|please)/i.test(text)
      break
  }

  const nextMissing = getNextMissingScwField(updated)
  return {
    ...updated,
    quoteDraftStatus: nextMissing ? 'drafting' : 'ready',
  }
}

export function normaliseJobType(value: string): PlumbingJobType {
  const lower = value.toLowerCase()
  const match = PLUMBING_JOB_TYPES.find((jobType) => lower.includes(jobType))
  return match ?? 'other'
}

export function getNextMissingScwField(lead: ScwLeadDraft): IntakeField | null {
  return (
    FIELD_ORDER.find((field) => {
      if (field === 'permissionToContact') return lead.permissionToContact === null
      if (field === 'email') return !lead.email && !lead.emailSkipped
      return !lead[field]
    }) ?? null
  )
}

export function getScwQuestionForField(field: IntakeField, lead: ScwLeadDraft): string {
  switch (field) {
    case 'jobDescription':
      return "What plumbing job do you need help with?"
    case 'jobType':
      return 'What type of plumbing job is it? You can pick one below or type your own.'
    case 'suburb':
      return lead.jobType === 'leaking tap'
        ? 'No problem. I can help prepare this for Luke. What suburb are you in, and is it urgent today?'
        : 'What suburb is the job in?'
    case 'urgency':
      return 'Is it urgent today, soon, or flexible?'
    case 'customerName':
      return 'Thanks. What is your name?'
    case 'phone':
      return 'What phone number should Luke use if he needs to confirm details?'
    case 'email':
      return 'What email should the team use for the quote? You can type skip if you prefer SMS/call only.'
    case 'preferredTime':
      return 'Would you like to request a time for Luke to attend? You can type a preferred day or time.'
    case 'permissionToContact':
      return 'Do you give Luke or the team permission to contact you about this enquiry?'
  }
}

export function getQuoteIntakeSummary(lead: ScwLeadDraft): string {
  return [
    'Quote intake summary',
    `Customer: ${lead.customerName || 'Not provided'}`,
    `Contact: ${lead.phone || 'No phone'} / ${
      lead.email || (lead.emailSkipped ? 'Email skipped' : 'No email')
    }`,
    `Job type: ${lead.jobType || 'Other'}`,
    `Suburb: ${lead.suburb || 'Not provided'}`,
    `Urgency: ${lead.urgency || 'Not provided'}`,
    `Job notes: ${lead.jobDescription || 'Not provided'}`,
    `Suggested next step: Luke will review and prepare the quote or booking request response.`,
    `Booking preference: ${lead.preferredTime || 'Not requested'}`,
    `SQBA status: quote draft ${lead.quoteDraftStatus}`,
  ].join('\n')
}

export function prepareSqbaLeadFromScwConversation(lead: ScwLeadDraft): ScwLeadDraft {
  return {
    ...lead,
    source: 'quoteos_scw',
    businessType: 'plumber',
    quoteDraftStatus: 'ready',
    notificationStatus: 'pending',
    channel: 'website_chat',
  }
}

export function prepareSqbaWorkflowFromScwConversation(
  lead: ScwLeadDraft,
): SqbaPreparedLead {
  const readyLead = prepareSqbaLeadFromScwConversation(lead)
  const jobType = readyLead.jobType || 'plumbing job'
  const suburb = readyLead.suburb || 'unknown suburb'
  const name = readyLead.customerName || 'Customer'
  const phone = readyLead.phone || 'No phone provided'
  const notificationCopy = `New QuoteOS enquiry: ${jobType} in ${suburb}. Customer: ${name}, Phone: ${phone}. Open SQBA to review.`

  return {
    lead: readyLead,
    sqbaActions: [
      'Create new lead',
      'Create draft quote',
      'Create follow-up reminder',
      'Prepare email/SMS draft',
      'Prepare PDF quote after tradie review',
    ],
    notificationDrafts: {
      internalNotification: notificationCopy,
      resendEmailToTradie: notificationCopy,
      twilioSmsOrWhatsAppToTradie: notificationCopy,
    },
    booking: {
      prompt: 'Would you like to request a time for Luke to attend?',
      placeholderUrl: 'https://calendar.google.com/',
      status: 'request_only',
    },
    reviewRequired: true,
  }
}

export function buildTradieNotificationDraft(
  lead: ScwLeadDraft,
): TradieNotificationDraft {
  const jobType = lead.jobType || 'plumbing job'
  const suburb = lead.suburb || 'unknown suburb'
  const email = lead.email || (lead.emailSkipped ? 'Email skipped' : 'Not provided')

  return {
    subject: `New QuoteOS enquiry — ${jobType} in ${suburb}`,
    body: [
      `Customer: ${lead.customerName || 'Not provided'}`,
      `Phone: ${lead.phone || 'Not provided'}`,
      `Email: ${email}`,
      `Job type: ${jobType}`,
      `Suburb: ${suburb}`,
      `Urgency: ${lead.urgency || 'Not provided'}`,
      `Preferred time: ${lead.preferredTime || 'Not requested'}`,
      `Notes: ${lead.jobDescription || 'No notes provided'}`,
      '',
      'Open SQBA to review this lead, prepare the quote, and confirm the next step.',
      'Review required before sending any email, quote, SMS, invoice, or booking confirmation.',
    ].join('\n'),
    reviewRequired: true,
  }
}

export async function sendTradieNotificationWithResend(
  lead: ScwLeadDraft,
  env: OptionalResendEnv = {},
): Promise<OptionalResendResult> {
  const draft = buildTradieNotificationDraft(lead)
  const hasConfig = env.RESEND_API_KEY && env.NOTIFICATION_EMAIL && env.EMAIL_FROM

  if (!hasConfig) {
    return {
      status: 'draft_only',
      draft,
      reason:
        'Missing RESEND_API_KEY, NOTIFICATION_EMAIL, or EMAIL_FROM. Local draft returned only.',
    }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: env.NOTIFICATION_EMAIL,
        subject: draft.subject,
        text: draft.body,
      }),
    })

    if (!response.ok) {
      return {
        status: 'failed',
        draft,
        reason: `Resend returned ${response.status}. Draft was not confirmed sent.`,
      }
    }

    return { status: 'sent', draft }
  } catch (error) {
    return {
      status: 'failed',
      draft,
      reason: error instanceof Error ? error.message : 'Unknown Resend error',
    }
  }
}

export function prepareQuoteDraftFromLead(lead: ScwLeadDraft): QuotePreparationDraft {
  const jobType = lead.jobType || 'plumbing job'
  const urgent = looksEmergency(`${lead.urgency} ${lead.jobDescription}`)
  const calloutLine = urgent ? 'Priority callout / make-safe assessment' : 'Site inspection / callout'

  return {
    suggestedPackageTitle: `${jobType.charAt(0).toUpperCase()}${jobType.slice(1)} quote`,
    suggestedLineItems: [
      calloutLine,
      'Labour for approved plumbing scope',
      'Materials and fittings as required',
      'Clean-up and testing after completion',
    ],
    suggestedNotes: [
      'Final price depends on site access, parts, and approved scope.',
      urgent
        ? 'This lead is urgent. Call first before quoting.'
        : 'Confirm details before sending the quote.',
      lead.emailSkipped ? 'Email was skipped. Use phone follow-up.' : 'Email quote can be drafted after review.',
      lead.preferredTime
        ? "Preferred time noted only. The team must confirm availability."
        : 'Ask for a preferred booking time before scheduling.',
    ],
    suggestedFollowUpTiming: urgent
      ? 'Call as soon as practical, then send a reviewed quote or next-step message.'
      : 'Follow up within 1 business day if the customer has not replied.',
    suggestedQuoteStatus: 'Draft',
    customerFriendlySummary: `Thanks ${lead.customerName || 'there'}, we have noted your ${jobType} enquiry in ${lead.suburb || 'your area'}. The team will review the details and confirm the next step before any quote or booking is final.`,
    reviewRequired: true,
  }
}

export function generateFollowUpDraft(
  quoteOrLead: QuoteFormState | ScwLeadDraft,
): FollowUpDraft {
  if ('quoteStatus' in quoteOrLead) {
    const name = quoteOrLead.contactName || quoteOrLead.clientBusinessName || 'there'
    const project = quoteOrLead.projectTitle || quoteOrLead.projectSummary || 'your quote'

    if (quoteOrLead.quoteStatus === 'sent' || quoteOrLead.quoteStatus === 'follow-up') {
      return {
        scenario: 'quote_sent_no_reply',
        recommendation: 'Quote sent but no reply. Send a soft follow-up after review.',
        emailDraft: `Hi ${name},\n\nJust checking in on ${project}. No pressure at all - happy to answer questions or adjust the scope if needed.\n\nCheers`,
        smsOrCallNote: 'Use a short phone follow-up if email is not the best channel.',
        reviewRequired: true,
      }
    }

    return {
      scenario: 'booking_request_pending',
      recommendation: 'Confirm quote approval, timing, and deposit details before booking.',
      emailDraft: `Hi ${name},\n\nThanks for reviewing ${project}. The next step is to confirm timing and payment details. We will confirm availability before locking anything in.\n\nCheers`,
      smsOrCallNote: 'Do not confirm booking until the tradie approves the timing.',
      reviewRequired: true,
    }
  }

  const lead = quoteOrLead
  const name = lead.customerName || 'there'
  const urgent = looksEmergency(`${lead.urgency} ${lead.jobDescription}`)

  return {
    scenario: urgent ? 'urgent_lead_not_reviewed' : 'lead_review',
    recommendation: urgent
      ? 'This lead is urgent. Call first before quoting.'
      : 'Quote is ready to review.',
    emailDraft: `Hi ${name},\n\nThanks for your plumbing enquiry. We have your details and the team will review them before confirming the quote or booking.\n\nCheers`,
    smsOrCallNote: lead.emailSkipped
      ? 'Email was skipped. Use phone follow-up.'
      : 'Use email or phone after the lead is reviewed.',
    reviewRequired: true,
  }
}

export function generateInvoiceDraftFromQuote(
  quote: QuoteFormState,
  paymentDetails: InvoicePaymentDetails = {},
): InvoiceDraft {
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  const amount = totals.oneOffTotal || totals.subtotal
  const amountText = formatAud(amount)
  const hasPayId = Boolean(paymentDetails.payId)
  const hasBankTransfer = Boolean(
    paymentDetails.accountName &&
      paymentDetails.bsb &&
      paymentDetails.accountNumber,
  )
  const instructions = [
    hasPayId ? `PayID: ${paymentDetails.payId}` : 'PayID: add PayID before sending',
    hasBankTransfer
      ? `Bank transfer: ${paymentDetails.accountName}, BSB ${paymentDetails.bsb}, Account ${paymentDetails.accountNumber}`
      : 'Bank transfer/direct deposit: add account name, BSB, and account number before sending',
  ]

  return {
    invoiceNumber: 'INV-XXXX',
    amount: amountText,
    paymentInstructions: instructions.join('\n'),
    pdfInvoiceWording: `Invoice for ${quote.projectTitle || quote.projectSummary || 'approved work'}: ${amountText}. Payment by PayID, bank transfer, or direct deposit. Please review all payment details before sending this PDF invoice.`,
    dueDate: 'Due on receipt unless otherwise agreed.',
    reviewBeforeSending: true,
    missingPaymentDetails: !hasPayId && !hasBankTransfer,
  }
}

export function getOperationalSuggestions(input: {
  lead?: ScwLeadDraft
  quote?: QuoteFormState
  invoice?: InvoiceDraft
  followUpOverdue?: boolean
}): OperationalSuggestion[] {
  const suggestions: OperationalSuggestion[] = []

  if (input.lead) {
    if (!input.lead.phone) {
      suggestions.push({ type: 'missing_phone', message: 'Missing phone. Ask for the best contact number.' })
    }
    if (input.lead.emailSkipped) {
      suggestions.push({ type: 'invalid_email', message: 'Email was skipped. Use phone follow-up.' })
    }
    if (looksEmergency(`${input.lead.urgency} ${input.lead.jobDescription}`)) {
      suggestions.push({ type: 'urgent_job', message: 'This lead is urgent. Call first before quoting.' })
    }
    if (input.lead.quoteDraftStatus !== 'ready') {
      suggestions.push({ type: 'quote_not_reviewed', message: 'Quote details are not ready for review yet.' })
    } else {
      suggestions.push({ type: 'quote_not_reviewed', message: 'Quote is ready to review.' })
    }
  }

  if (input.quote) {
    if (input.quote.quoteStatus !== 'accepted') {
      suggestions.push({ type: 'quote_not_reviewed', message: 'Quote needs tradie review before sending or invoicing.' })
    }
    if (!input.quote.lineItems.some((item) => item.billingType !== 'one-off')) {
      suggestions.push({ type: 'recurring_revenue', message: 'Check whether hosting, support, maintenance, or aftercare should be added.' })
    }
  }

  if (input.invoice?.missingPaymentDetails) {
    suggestions.push({ type: 'missing_payment_details', message: 'Payment details are missing from invoice.' })
  }

  if (input.followUpOverdue) {
    suggestions.push({ type: 'follow_up_overdue', message: 'Follow-up is overdue. Prepare a review-only reminder draft.' })
  }

  return suggestions
}
