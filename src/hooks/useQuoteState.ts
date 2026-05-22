import { useCallback, useMemo, useState } from 'react'
import { calculateTotals } from '../lib/quoteos/calculations'
import { generateEmailDraft } from '../lib/quoteos/email'
import { parseMicahPrompt } from '../lib/quoteos/generateQuote'
import { generateNextQuoteNumber } from '../lib/quoteos/numbering'
import {
  buildMicahSetupNote,
  buildPaymentTerms,
  buildQuoteExpiryDate,
  getDepositPercent,
  getPrimaryQuoteOptionId,
  getSuggestedLineItemLabels,
  wizardBusinessToSqbaId,
  type SqbaSetupConfig,
} from '../lib/quoteos/setup-wizard'
import { getBusinessLabel, getQuoteOption } from '../lib/quoteos/sqba-config'
import {
  createLineItem,
  defaultQuoteState,
  type BusinessTypeId,
  type LineItem,
  type QuoteFormState,
  type QuoteStatus,
} from '../lib/quoteos/types'

const SUGGESTION_LINE_ITEMS = [
  { label: 'Call-out fee', quantity: 1, amount: 200 },
  { label: 'Labour', quantity: 1, amount: 90 },
  { label: 'Materials', quantity: 1, amount: 0 },
  { label: 'Emergency surcharge', quantity: 1, amount: 0 },
  { label: 'Custom item', quantity: 1, amount: 0 },
]

export function useQuoteState(setupConfig?: SqbaSetupConfig | null) {
  const [quote, setQuote] = useState<QuoteFormState>(defaultQuoteState)
  const [micahDraft, setMicahDraft] = useState('')
  const [emailDraftOverride, setEmailDraftOverride] = useState<string | null>(
    null,
  )
  const writingTone = setupConfig?.writingTone ?? 'professional'

  const totals = useMemo(
    () => calculateTotals(quote.lineItems, quote.depositEnabled),
    [quote.lineItems, quote.depositEnabled],
  )

  const emailDraft = useMemo(
    () =>
      emailDraftOverride ??
      generateEmailDraft(quote, totals, writingTone),
    [emailDraftOverride, quote, totals, writingTone],
  )

  const updateField = useCallback(
    <K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) => {
      setQuote((prev) => ({ ...prev, [key]: value }))
      if (key !== 'internalNotes' && key !== 'micahPrompt') {
        setEmailDraftOverride(null)
      }
    },
    [],
  )

  const ensureQuoteNumber = useCallback(() => {
    let ensuredQuoteNumber = ''
    setQuote((prev) => {
      const currentQuoteNumber = prev.quoteNumber.trim()
      if (currentQuoteNumber) {
        ensuredQuoteNumber = currentQuoteNumber
        return prev
      }

      ensuredQuoteNumber = generateNextQuoteNumber()
      return { ...prev, quoteNumber: ensuredQuoteNumber }
    })
    return ensuredQuoteNumber
  }, [])

  const applySqbaSelection = useCallback(
    (businessTypeId: BusinessTypeId, quoteOptionId: string) => {
      const option = getQuoteOption(businessTypeId, quoteOptionId)
      setQuote((prev) => ({
        ...prev,
        businessTypeId,
        sqbaQuoteOptionId: quoteOptionId,
        businessType: getBusinessLabel(businessTypeId),
        quoteTypeId: option?.presetId ?? prev.quoteTypeId,
        projectSummary:
          prev.projectSummary.trim() || option?.summaryHint || prev.projectSummary,
      }))
      setEmailDraftOverride(null)
    },
    [],
  )

  const generateSmartQuote = useCallback(() => {
    const parsed = parseMicahPrompt(quote.micahPrompt)

    setQuote((prev) => {
      const hasManualItems = prev.lineItems.some(
        (item) => item.label.trim() && item.amount > 0,
      )
      const next: QuoteFormState = {
        ...prev,
        quoteNumber: prev.quoteNumber.trim() || generateNextQuoteNumber(),
        businessTypeId: parsed.businessTypeId,
        sqbaQuoteOptionId: parsed.quoteOptionId,
        businessType: getBusinessLabel(parsed.businessTypeId),
        projectTitle: prev.projectTitle.trim() || parsed.projectTitle,
        projectSummary: prev.projectSummary.trim() || parsed.projectSummary,
        quoteGenerated: true,
      }

      if (!hasManualItems) {
        next.lineItems = SUGGESTION_LINE_ITEMS.map((item) =>
          createLineItem(item),
        )
      }

      next.internalNotes = [
        prev.internalNotes.trim(),
        'Suggestion only: review item names, quantities and unit prices before sending.',
      ]
        .filter(Boolean)
        .join('\n\n')

      return next
    })
    setMicahDraft(
      'Suggested structure added. Please edit quantities, unit prices, notes, deposit and payment instructions manually.',
    )
    setEmailDraftOverride(null)
  }, [quote.micahPrompt])

  const setQuoteStatus = useCallback((status: QuoteStatus) => {
    setQuote((prev) => ({ ...prev, quoteStatus: status }))
  }, [])

  const updateLineItem = useCallback(
    (id: string, patch: Partial<LineItem>) => {
      setQuote((prev) => ({
        ...prev,
        lineItems: prev.lineItems.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      }))
      setEmailDraftOverride(null)
    },
    [],
  )

  const addLineItem = useCallback(() => {
    setQuote((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, createLineItem({ label: 'Custom item' })],
    }))
    setEmailDraftOverride(null)
  }, [])

  const removeLineItem = useCallback((id: string) => {
    setQuote((prev) => ({
      ...prev,
      lineItems:
        prev.lineItems.length > 1
          ? prev.lineItems.filter((item) => item.id !== id)
          : prev.lineItems,
    }))
    setEmailDraftOverride(null)
  }, [])

  const resetQuote = useCallback(() => {
    setQuote(defaultQuoteState())
    setMicahDraft('')
    setEmailDraftOverride(null)
  }, [])

  const setEmailDraft = useCallback((text: string) => {
    setEmailDraftOverride(text)
  }, [])

  const applySetupWizard = useCallback((config: SqbaSetupConfig) => {
    const businessTypeId = wizardBusinessToSqbaId(config.businessType)
    const quoteOptionId = getPrimaryQuoteOptionId(config)
    const depositPct = getDepositPercent(config)
    const suggestedLabels = getSuggestedLineItemLabels(config)
    const setupNote = buildMicahSetupNote(config)

    setQuote((prev) => ({
      ...prev,
      businessTypeId,
      sqbaQuoteOptionId: quoteOptionId,
      businessType: getBusinessLabel(businessTypeId),
      quoteTypeId: 'custom',
      paymentTerms: buildPaymentTerms(config),
      quoteExpiryDate: buildQuoteExpiryDate(14),
      depositEnabled: depositPct > 0,
      internalNotes: prev.internalNotes.trim()
        ? `${prev.internalNotes.trim()}\n\n${setupNote}`
        : setupNote,
      lineItems:
        suggestedLabels.length > 0
          ? suggestedLabels.map((label) => createLineItem({ label, amount: 0 }))
          : prev.lineItems,
    }))
    setEmailDraftOverride(null)
  }, [])

  return {
    quote,
    totals,
    emailDraft,
    micahDraft,
    writingTone,
    setMicahDraft,
    setEmailDraft,
    updateField,
    ensureQuoteNumber,
    applySqbaSelection,
    generateSmartQuote,
    setQuoteStatus,
    updateLineItem,
    addLineItem,
    removeLineItem,
    resetQuote,
    applySetupWizard,
  }
}
