import type { QuoteFormState } from '../quoteos/types'
import { calculateTotals } from '../quoteos/calculations'

export type MicahReminderType =
  | 'follow-up-due'
  | 'quote-expiring'
  | 'unsent-quote'
  | 'missing-deposit'
  | 'recurring-revenue'

export type MicahReminder = {
  id: MicahReminderType
  title: string
  detail: string
  actionLabel: string
  priority: 'low' | 'medium' | 'high'
}

function hasRecurringFee(quote: QuoteFormState): boolean {
  return quote.lineItems.some((item) => item.billingType !== 'one-off')
}

function hasDepositTerms(quote: QuoteFormState): boolean {
  return quote.depositEnabled || /deposit/i.test(quote.paymentTerms)
}

function quoteLooksDigital(quote: QuoteFormState): boolean {
  return /website|hosting|support|maintenance|google|chat|automation|agentmate|micah|dos/i.test(
    `${quote.projectTitle} ${quote.projectSummary} ${quote.micahPrompt}`,
  )
}

export function getMicahReminders(quote: QuoteFormState): MicahReminder[] {
  const reminders: MicahReminder[] = []
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  const hasQuoteValue = totals.subtotal > 0 || quote.quoteGenerated

  if (quote.quoteStatus === 'sent' || quote.quoteStatus === 'follow-up') {
    reminders.push({
      id: 'follow-up-due',
      title: 'Follow-up due',
      detail: 'This quote is ready for a soft check-in.',
      actionLabel: 'Prepare follow-up',
      priority: 'high',
    })
  }

  if (quote.quoteExpiryDate && quote.quoteStatus !== 'accepted') {
    reminders.push({
      id: 'quote-expiring',
      title: 'Quote expiring soon',
      detail: 'Review the expiry date and confirm the next step.',
      actionLabel: 'Check expiry',
      priority: 'medium',
    })
  }

  if (quote.quoteStatus === 'draft' && hasQuoteValue) {
    reminders.push({
      id: 'unsent-quote',
      title: 'Unsent quote',
      detail: 'Draft is ready for operator review before sending.',
      actionLabel: 'Review quote',
      priority: 'medium',
    })
  }

  if (!hasDepositTerms(quote) && hasQuoteValue) {
    reminders.push({
      id: 'missing-deposit',
      title: 'Missing deposit',
      detail: 'Add deposit terms before the client approves.',
      actionLabel: 'Add terms',
      priority: 'high',
    })
  }

  if (!hasRecurringFee(quote) && (quoteLooksDigital(quote) || hasQuoteValue)) {
    reminders.push({
      id: 'recurring-revenue',
      title: 'Recurring revenue opportunity',
      detail: 'Support, hosting or aftercare could be offered as an add-on.',
      actionLabel: 'Suggest add-on',
      priority: 'low',
    })
  }

  return reminders
}
