import {
  getBusinessLabel,
  getDefaultQuoteOptionId,
  getQuoteOption,
  QUICK_START_EXAMPLES,
  type BusinessTypeId,
} from './sqba-config'
import type { QuoteFormState } from './types'

export type GenerateQuoteResult = {
  businessTypeId: BusinessTypeId
  quoteOptionId: string
  projectSummary: string
  projectTitle: string
}

function matchExample(prompt: string) {
  const lower = prompt.toLowerCase()
  return QUICK_START_EXAMPLES.find(
    (ex) =>
      lower.includes(ex.label.toLowerCase().slice(0, 12)) ||
      ex.prompt.toLowerCase().split(' ').slice(0, 4).every((w) => lower.includes(w)),
  )
}

function inferBusinessType(prompt: string): BusinessTypeId {
  const lower = prompt.toLowerCase()
  if (/plumb|pipe|hot water|tap|drain/i.test(lower)) return 'plumber'
  if (/electric|switchboard|power point|lighting/i.test(lower)) return 'electrician'
  if (/paint|coats|prep/i.test(lower)) return 'painter'
  if (/fenc|colorbond|gate/i.test(lower)) return 'fencing'
  if (/landscap|turf|garden/i.test(lower)) return 'landscaping'
  if (/build|renovation|extension|deck/i.test(lower)) return 'agency'
  return 'plumber'
}

function inferQuoteOptionId(
  businessTypeId: BusinessTypeId,
  prompt: string,
): string {
  const lower = prompt.toLowerCase()
  const options = QUICK_START_EXAMPLES.filter((e) => e.businessTypeId === businessTypeId)

  for (const ex of options) {
    if (lower.includes(ex.label.toLowerCase().slice(0, 8))) return ex.quoteOptionId
  }

  if (businessTypeId === 'plumber') {
    if (/hot water/i.test(lower)) return 'plumber-hot-water'
    if (/pipe|leak|repair/i.test(lower)) return 'plumber-pipe-repair'
    if (/emergency|callout|urgent/i.test(lower)) return 'plumber-emergency'
    return 'plumber-custom'
  }

  if (businessTypeId === 'electrician') {
    if (/switchboard/i.test(lower)) return 'electrician-switchboard'
    return 'electrician-custom'
  }

  return getDefaultQuoteOptionId(businessTypeId)
}

export function parseMicahPrompt(prompt: string): GenerateQuoteResult {
  const trimmed = prompt.trim()
  const example = matchExample(trimmed)

  const businessTypeId = example?.businessTypeId ?? inferBusinessType(trimmed)
  const quoteOptionId =
    example?.quoteOptionId ?? inferQuoteOptionId(businessTypeId, trimmed)

  const option = getQuoteOption(businessTypeId, quoteOptionId)
  const businessLabel = getBusinessLabel(businessTypeId)

  const projectSummary =
    trimmed ||
    option?.summaryHint ||
    `${businessLabel} quote — review line items and pricing before sending.`

  const projectTitle =
    option?.label ??
    `${businessLabel} quote`

  return {
    businessTypeId,
    quoteOptionId,
    projectSummary,
    projectTitle,
  }
}

export function buildMemorySummary(
  quote: QuoteFormState,
  totalOneOff: number,
): string {
  const customer =
    quote.clientBusinessName.trim() ||
    quote.contactName.trim() ||
    'New customer'
  const amount =
    totalOneOff > 0
      ? new Intl.NumberFormat('en-AU', {
          style: 'currency',
          currency: 'AUD',
          maximumFractionDigits: 0,
        }).format(totalOneOff)
      : '$0'
  const statusLabel =
    quote.quoteStatus.charAt(0).toUpperCase() + quote.quoteStatus.slice(1)
  const followUp =
    quote.quoteStatus === 'sent' || quote.quoteStatus === 'follow-up'
      ? 'Follow-up due in 3 days (demo)'
      : 'Follow-up not scheduled yet'

  return `${customer} — ${amount} — ${statusLabel} — ${followUp}`
}
