import type { LineItem, QuoteFormState, QuoteTotals } from './types'
import { QUOTE_TYPE_OPTIONS } from './types'

export function calculateTotals(
  lineItems: LineItem[],
  depositEnabled: boolean,
): QuoteTotals {
  const oneOffTotal = lineItems
    .filter((i) => i.billingType === 'one-off')
    .reduce((sum, i) => {
      const quantity =
        typeof i.quantity === 'number' && Number.isFinite(i.quantity)
          ? i.quantity
          : 1
      const unitPrice = Number.isFinite(i.amount) ? i.amount : 0
      return sum + quantity * unitPrice
    }, 0)

  const monthlyRecurringTotal = lineItems
    .filter((i) => i.billingType === 'monthly')
    .reduce((sum, i) => sum + (Number.isFinite(i.amount) ? i.amount : 0), 0)

  const yearlyRecurringTotal = lineItems
    .filter((i) => i.billingType === 'yearly')
    .reduce((sum, i) => sum + (Number.isFinite(i.amount) ? i.amount : 0), 0)

  const subtotal = oneOffTotal + monthlyRecurringTotal + yearlyRecurringTotal

  const depositBase = oneOffTotal > 0 ? oneOffTotal : subtotal
  const depositAmount = depositEnabled ? depositBase * 0.5 : 0
  const remainingBalance = depositEnabled
    ? Math.max(depositBase - depositAmount, 0)
    : depositBase

  return {
    subtotal,
    oneOffTotal,
    monthlyRecurringTotal,
    yearlyRecurringTotal,
    depositAmount,
    remainingBalance,
  }
}

export function formatAud(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function getQuoteDisplayTitle(state: QuoteFormState): string {
  if (state.projectTitle.trim()) return state.projectTitle.trim()
  if (state.projectSummary.trim()) return state.projectSummary.trim()
  const option = QUOTE_TYPE_OPTIONS.find((item) => item.id === state.quoteTypeId)
  if (option) return option.label
  const type = state.quoteTypeId
  if (type === 'custom') return 'Custom quote'
  if (type === 'general_trade') return 'General trade quote'
  return type.charAt(0).toUpperCase() + type.slice(1) + ' quote'
}
