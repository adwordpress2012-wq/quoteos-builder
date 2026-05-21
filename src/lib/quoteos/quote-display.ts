import { formatAud } from './calculations'
import {
  generateQuickQuoteFromPrompt,
} from './micah'
import { PACKAGE_TIERS, getBusinessLabel } from './sqba-config'
import type { SqbaSetupConfig } from './setup-wizard'
import type { QuoteFormState, QuoteTotals } from './types'

export function getPackageDisplayName(
  quote: QuoteFormState,
  setup?: SqbaSetupConfig | null,
): string {
  if (quote.projectTitle.trim()) return quote.projectTitle.trim()

  const tier = quote.packageTier
    ? PACKAGE_TIERS.find((t) => t.id === quote.packageTier)
    : null
  const business = quote.clientBusinessName.trim() || getBusinessLabel(quote.businessTypeId)

  if (tier) {
    return `${business} ${tier.label} Package`
  }

  const quick = generateQuickQuoteFromPrompt(
    quote.micahPrompt || quote.projectSummary,
    quote.businessTypeId,
    setup,
  )
  return quick.packageName
}

export function formatQuoteAmountLine(totals: QuoteTotals): string {
  const parts: string[] = []

  if (totals.oneOffTotal > 0) {
    parts.push(`${formatAud(totals.oneOffTotal)} setup`)
  }

  if (totals.yearlyRecurringTotal > 0) {
    parts.push(`${formatAud(totals.yearlyRecurringTotal)}/year support`)
  } else if (totals.monthlyRecurringTotal > 0) {
    parts.push(`${formatAud(totals.monthlyRecurringTotal)}/month`)
  }

  if (parts.length === 0 && totals.subtotal > 0) {
    return formatAud(totals.subtotal)
  }

  return parts.join(' + ') || '—'
}

export function getRecurringAmountLine(totals: QuoteTotals): string | null {
  if (totals.yearlyRecurringTotal > 0) {
    return `${formatAud(totals.yearlyRecurringTotal)}/year`
  }
  if (totals.monthlyRecurringTotal > 0) {
    return `${formatAud(totals.monthlyRecurringTotal)}/month`
  }
  return null
}
