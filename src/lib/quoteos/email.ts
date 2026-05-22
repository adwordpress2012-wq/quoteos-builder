import { formatAud, getQuoteDisplayTitle } from './calculations'
import type { WritingToneId } from './setup-wizard'
import type { QuoteFormState, QuoteTotals } from './types'

export function generateEmailSubject(state: QuoteFormState): string {
  const quoteNumber = state.quoteNumber.trim()
  const title = getQuoteDisplayTitle(state)
  return quoteNumber ? `Quote ${quoteNumber}: ${title}` : `Quote: ${title}`
}

export function generateEmailDraft(
  state: QuoteFormState,
  totals: QuoteTotals,
  writingTone: WritingToneId = 'professional',
): string {
  const name = state.contactName.trim() || 'there'
  const business = state.clientBusinessName.trim() || 'your business'
  const project = getQuoteDisplayTitle(state)
  const summary =
    state.projectSummary.trim() ||
    'Please review the quote for full scope and pricing.'

  const lines: string[] = [
    `Hi ${name},`,
    '',
    `Thanks for the opportunity to work with ${business}.`,
    '',
    `Please find your quote for ${project}.`,
    state.quoteNumber.trim() ? `Quote number: ${state.quoteNumber.trim()}` : '',
    '',
    summary,
    '',
    'Quote summary',
    `- Total: ${formatAud(totals.subtotal)}`,
  ]

  if (totals.monthlyRecurringTotal > 0) {
    lines.push(
      `- Ongoing support: ${formatAud(totals.monthlyRecurringTotal)}/month`,
    )
  }
  if (totals.yearlyRecurringTotal > 0) {
    lines.push(
      `- Ongoing support: ${formatAud(totals.yearlyRecurringTotal)}/year`,
    )
  }
  if (state.depositEnabled && totals.depositAmount > 0) {
    lines.push(
      `- Deposit (50%): ${formatAud(totals.depositAmount)}`,
      `- Balance: ${formatAud(totals.remainingBalance)}`,
    )
  }

  if (state.quoteExpiryDate) {
    lines.push('', `This quote is valid until ${state.quoteExpiryDate}.`)
  }

  if (state.paymentInstructions.trim()) {
    lines.push('', state.paymentInstructions.trim())
  }

  const nextStep =
    writingTone === 'simple'
      ? 'Reply to accept or ask a question.'
      : writingTone === 'casual-au'
        ? 'Reply if you are happy to go ahead, or shout if you have any questions.'
        : writingTone === 'premium'
          ? 'Please reply to confirm approval or request any clarifications at your convenience.'
          : 'Reply to this email to accept the quote or ask any questions. We are happy to adjust scope if needed.'

  const signOff =
    writingTone === 'casual-au'
      ? ['Cheers,']
      : writingTone === 'premium'
        ? ['Kind regards,', 'Your service team']
        : ['Kind regards,', 'The QuoteOS Team']

  lines.push('', 'Next step', nextStep, '', ...signOff)

  if (writingTone !== 'casual-au' && writingTone !== 'simple') {
    lines.push('QuoteOS')
  }

  if (writingTone === 'simple') {
    return lines
      .filter((line) => !line.startsWith('**'))
      .map((line) => line.replace(/\*\*/g, ''))
      .join('\n')
  }

  return lines.join('\n')
}

export function generateQuoteSummary(
  state: QuoteFormState,
  totals: QuoteTotals,
): string {
  const project = getQuoteDisplayTitle(state)
  const parts = [
    `${state.quoteNumber || 'Quote'} - ${project} - ${state.clientBusinessName || 'Client'}`,
    `Today / setup: ${formatAud(totals.oneOffTotal)}`,
  ]
  if (totals.monthlyRecurringTotal > 0) {
    parts.push(`Ongoing: ${formatAud(totals.monthlyRecurringTotal)}/month`)
  }
  if (totals.yearlyRecurringTotal > 0) {
    parts.push(`Ongoing: ${formatAud(totals.yearlyRecurringTotal)}/year`)
  }
  if (state.depositEnabled) {
    parts.push(
      `Deposit: ${formatAud(totals.depositAmount)} | Balance: ${formatAud(totals.remainingBalance)}`,
    )
  }
  return parts.join(' | ')
}
