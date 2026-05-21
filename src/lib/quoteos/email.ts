import { formatAud, getQuoteDisplayTitle } from './calculations'
import type { WritingToneId } from './setup-wizard'
import type { QuoteFormState, QuoteTotals } from './types'

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
    'Please review the attached quote for full scope and pricing.'

  const lines: string[] = [
    `Hi ${name},`,
    '',
    `Thanks for the opportunity to work with ${business}.`,
    '',
    `Please find your quote attached as a PDF for **${project}**.`,
    '',
    summary,
    '',
    '**Quote summary**',
    `- One-off total: ${formatAud(totals.oneOffTotal)}`,
  ]

  if (totals.monthlyRecurringTotal > 0) {
    lines.push(
      `- Monthly recurring: ${formatAud(totals.monthlyRecurringTotal)}/month`,
    )
  }
  if (totals.yearlyRecurringTotal > 0) {
    lines.push(
      `- Yearly recurring: ${formatAud(totals.yearlyRecurringTotal)}/year`,
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

  const nextStep =
    writingTone === 'simple'
      ? 'Reply to accept or ask a question.'
      : writingTone === 'casual-au'
        ? 'Reply if you are happy to go ahead, or shout if you have any questions.'
        : writingTone === 'premium'
          ? 'Please reply to confirm approval or request any clarifications at your convenience.'
          : 'Reply to this email to accept the quote or ask any questions — we’re happy to adjust scope if needed.'

  const signOff =
    writingTone === 'casual-au'
      ? ['Cheers,']
      : writingTone === 'premium'
        ? ['Kind regards,', 'Your service team']
        : ['Kind regards,', 'The DOS Team']

  lines.push('', '**Next step**', nextStep, '', ...signOff)

  if (writingTone !== 'casual-au' && writingTone !== 'simple') {
    lines.push(
      'QuoteOS — Smart Quote Builder',
      'Powered by Directive Operating Systems (DOS)',
      'https://directiveos.com.au',
    )
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
    `${project} — ${state.clientBusinessName || 'Client'}`,
    `One-off: ${formatAud(totals.oneOffTotal)}`,
  ]
  if (totals.monthlyRecurringTotal > 0) {
    parts.push(`Monthly: ${formatAud(totals.monthlyRecurringTotal)}`)
  }
  if (totals.yearlyRecurringTotal > 0) {
    parts.push(`Yearly: ${formatAud(totals.yearlyRecurringTotal)}`)
  }
  if (state.depositEnabled) {
    parts.push(
      `Deposit: ${formatAud(totals.depositAmount)} | Balance: ${formatAud(totals.remainingBalance)}`,
    )
  }
  return parts.join(' · ')
}
