import {
  generateDealStrategy,
  generateFollowUpSuggestion,
  generateInvoiceSuggestion,
  generateMicahSuggestion,
  generateQuickQuoteFromPrompt,
  generateQuoteHealth,
  generateSmsDraft,
} from '../quoteos/micah'
import { calculateTotals, formatAud } from '../quoteos/calculations'
import { validateQuotePricing } from '../quoteos/pricing'
import { getPackageDisplayName } from '../quoteos/quote-display'
import type { SqbaSetupConfig } from '../quoteos/setup-wizard'
import type { MicahActionId, QuoteFormState } from '../quoteos/types'
import { getMicahReminders } from './micahReminders'
import type { MicahReminder } from './micahReminders'
import type { MicahState } from './micahStates'
import { withReviewNotice } from './micahPersonality'

export type MicahSmartNudge = {
  id: string
  title: string
  detail: string
  actionLabel: string
  priority: 'low' | 'medium' | 'high'
}

export type MicahAssistantSnapshot = {
  packageName: string
  userPrompt: string
  packagingSuggestion: string
  dealStrategy: string
  marginNote: string
  followUpSuggestion: string
  smsDraft: string
  invoiceSuggestion: string
  quoteExplanation: string
  reminders: MicahReminder[]
  nudges: MicahSmartNudge[]
  state: MicahState
}

function quoteHasRecurring(quote: QuoteFormState): boolean {
  return quote.lineItems.some((item) => item.billingType !== 'one-off')
}

function quoteHasDeposit(quote: QuoteFormState): boolean {
  return quote.depositEnabled || /deposit/i.test(quote.paymentTerms)
}

function isRoughPrompt(prompt: string): boolean {
  const trimmed = prompt.trim()
  if (!trimmed) return false
  const wordCount = trimmed.split(/\s+/).length
  return wordCount < 8 || /,| and | plus | maybe | rough|quick/i.test(trimmed)
}

export function getMicahSmartNudges(quote: QuoteFormState): MicahSmartNudge[] {
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  const text = `${quote.micahPrompt} ${quote.projectSummary} ${quote.projectTitle}`
  const nudges: MicahSmartNudge[] = []

  if (quote.quoteStatus === 'draft') {
    nudges.push({
      id: 'review-send',
      title: 'Review and send quote',
      detail: 'Draft status is active. Check scope, price and terms before sending.',
      actionLabel: 'Review quote',
      priority: 'medium',
    })
  }

  if (quote.quoteGenerated && quote.quoteStatus !== 'accepted') {
    nudges.push({
      id: 'mock-two-day-follow-up',
      title: 'Follow-up due',
      detail: 'Mock MVP age is 2+ days once generated, so prepare a soft follow-up.',
      actionLabel: 'Prepare follow-up',
      priority: 'high',
    })
  }

  if (!quoteHasRecurring(quote)) {
    nudges.push({
      id: 'support-hosting',
      title: 'Add support or hosting option',
      detail: 'No recurring fee is included. Consider aftercare, support or hosting.',
      actionLabel: 'Suggest add-on',
      priority: 'low',
    })
  }

  if (!quoteHasDeposit(quote)) {
    nudges.push({
      id: 'deposit-terms',
      title: 'Add deposit terms',
      detail: 'Deposit terms protect cash flow before work starts.',
      actionLabel: 'Add terms',
      priority: 'high',
    })
  }

  if (totals.oneOffTotal >= 3000) {
    nudges.push({
      id: 'high-value-scope',
      title: 'Clarify scope and milestones',
      detail: 'High-value quote. Add clear scope boundaries and payment milestones.',
      actionLabel: 'Check scope',
      priority: 'medium',
    })
  }

  if (isRoughPrompt(text)) {
    nudges.push({
      id: 'package-rough-prompt',
      title: 'Package the offer',
      detail: 'The prompt looks rough. Present a clean package instead of messy line items.',
      actionLabel: 'Package offer',
      priority: 'medium',
    })
  }

  return nudges
}

export function getMicahState(
  quote: QuoteFormState,
  isThinking: boolean,
): MicahState {
  if (isThinking) return 'thinking'

  const health = generateQuoteHealth(quote)
  if (health.warnings.length > 0 && quote.quoteGenerated) return 'warning'

  const reminders = getMicahReminders(quote)
  if (reminders.length > 0) return 'reminder'

  if (quote.quoteGenerated) return 'success'

  return 'idle'
}

export function buildMicahAssistantSnapshot(
  quote: QuoteFormState,
  setup?: SqbaSetupConfig | null,
  isThinking = false,
): MicahAssistantSnapshot {
  const userPrompt =
    quote.micahPrompt || quote.projectSummary || quote.projectTitle || ''
  const quickQuote = generateQuickQuoteFromPrompt(
    userPrompt,
    quote.businessTypeId,
    setup,
  )
  const packageName = getPackageDisplayName(quote, setup)
  const dealStrategy = generateDealStrategy(quote)
  const quoteHealth = generateQuoteHealth(quote)
  const followUp = generateFollowUpSuggestion(quote, setup)
  const smsDraft = generateSmsDraft(quote)
  const invoiceSuggestion = generateInvoiceSuggestion(quote)
  const totals = calculateTotals(quote.lineItems, quote.depositEnabled)
  const validation = validateQuotePricing(quote)

  return {
    packageName,
    userPrompt,
    packagingSuggestion: `I would package this as ${packageName || quickQuote.packageName}. ${quickQuote.dealNote}`,
    dealStrategy: dealStrategy.packageRecommendation,
    marginNote: `${validation.statusLabel}. ${quoteHealth.marginNote}`,
    followUpSuggestion: followUp.recommendation,
    smsDraft: withReviewNotice(smsDraft.text),
    invoiceSuggestion: withReviewNotice(invoiceSuggestion.suggestion),
    quoteExplanation: `${validation.statusLabel}. This quote is currently ${quote.quoteStatus}. One-off total is ${formatAud(
      totals.oneOffTotal,
    )}, with ${formatAud(totals.monthlyRecurringTotal)} monthly recurring. ${dealStrategy.ctaRecommendation}`,
    reminders: getMicahReminders(quote),
    nudges: getMicahSmartNudges(quote),
    state: getMicahState(quote, isThinking),
  }
}

export function runMicahQuickAction(
  action: MicahActionId,
  quote: QuoteFormState,
  emailDraft: string,
): string {
  const result = generateMicahSuggestion(action, {
    text: emailDraft,
    contactName: quote.contactName,
    projectTitle: quote.projectTitle,
    businessName: quote.clientBusinessName,
  })

  return withReviewNotice(result.text)
}
