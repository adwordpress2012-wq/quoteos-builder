import { useCallback, useMemo, useState } from 'react'
import { calculateTotals } from '../lib/quoteos/calculations'
import { generateEmailDraft } from '../lib/quoteos/email'
import {
  applyPresetToLineItems,
  getPresetByQuoteType,
} from '../lib/quoteos/pricing'
import {
  createLineItem,
  defaultQuoteState,
  type LineItem,
  type QuoteFormState,
  type QuoteTypeId,
} from '../lib/quoteos/types'

export function useQuoteState() {
  const [quote, setQuote] = useState<QuoteFormState>(defaultQuoteState)
  const [micahDraft, setMicahDraft] = useState('')
  const [emailDraftOverride, setEmailDraftOverride] = useState<string | null>(
    null,
  )

  const totals = useMemo(
    () => calculateTotals(quote.lineItems, quote.depositEnabled),
    [quote.lineItems, quote.depositEnabled],
  )

  const emailDraft = useMemo(
    () => emailDraftOverride ?? generateEmailDraft(quote, totals),
    [emailDraftOverride, quote, totals],
  )

  const updateField = useCallback(
    <K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) => {
      setQuote((prev) => ({ ...prev, [key]: value }))
      if (key !== 'internalNotes') setEmailDraftOverride(null)
    },
    [],
  )

  const applyQuoteType = useCallback((quoteTypeId: QuoteTypeId) => {
    const preset = getPresetByQuoteType(quoteTypeId)
    setQuote((prev) => {
      const next: QuoteFormState = { ...prev, quoteTypeId }
      if (preset) {
        next.lineItems = applyPresetToLineItems(preset)
        next.inclusions = [...preset.inclusions]
        if (preset.suggestedSummary) next.projectSummary = preset.suggestedSummary
        if (preset.suggestedPaymentTerms)
          next.paymentTerms = preset.suggestedPaymentTerms
      }
      return next
    })
    setEmailDraftOverride(null)
  }, [])

  const applyPreset = useCallback((presetId: QuoteTypeId) => {
    applyQuoteType(presetId)
  }, [applyQuoteType])

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
      lineItems: [...prev.lineItems, createLineItem()],
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

  return {
    quote,
    totals,
    emailDraft,
    micahDraft,
    setMicahDraft,
    setEmailDraft,
    updateField,
    applyQuoteType,
    applyPreset,
    updateLineItem,
    addLineItem,
    removeLineItem,
    resetQuote,
  }
}
