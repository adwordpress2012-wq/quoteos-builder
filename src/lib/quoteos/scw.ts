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

function cleanValue(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
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
  const email = text.match(EMAIL_PATTERN)?.[0] ?? ''
  const phone = text.match(PHONE_PATTERN)?.[0] ?? ''
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
      updated.email = email || text
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
      return 'What email should the team use for the quote or booking confirmation?'
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
    `Contact: ${lead.phone || 'No phone'} / ${lead.email || 'No email'}`,
    `Job type: ${lead.jobType || 'Other'}`,
    `Suburb: ${lead.suburb || 'Not provided'}`,
    `Urgency: ${lead.urgency || 'Not provided'}`,
    `Job notes: ${lead.jobDescription || 'Not provided'}`,
    `Suggested next step: Luke will review and prepare a quote or booking confirmation.`,
    `Booking preference: ${lead.preferredTime || 'Not requested'}`,
    `SQBA status: quote draft ${lead.quoteDraftStatus}`,
  ].join('\n')
}

export function prepareSqbaLeadFromScwConversation(
  lead: ScwLeadDraft,
): SqbaPreparedLead {
  const readyLead: ScwLeadDraft = {
    ...lead,
    quoteDraftStatus: 'ready',
    notificationStatus: 'pending',
  }
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
