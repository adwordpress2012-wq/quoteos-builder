import { formatAud, getQuoteDisplayTitle } from './calculations'
import type { QuoteFormState, QuoteTotals } from './types'

export function generateEmailDraft(
  state: QuoteFormState,
  totals: QuoteTotals,
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

  lines.push(
    '',
    '**Next step**',
    'Reply to this email to accept the quote or ask any questions — we’re happy to adjust scope if needed.',
    '',
    'Kind regards,',
    'The DOS Team',
    'QuoteOS — Smart Quote Builder',
    'Powered by Directive Operating Systems (DOS)',
    'https://directiveos.com.au',
  )

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
