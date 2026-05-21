import { useCallback, useMemo, useState } from 'react'
import { calculateTotals } from '../lib/quoteos/calculations'
import { generateEmailDraft } from '../lib/quoteos/email'
import { parseMicahPrompt } from '../lib/quoteos/generateQuote'
import {
  applyPresetToLineItems,
  getPresetByQuoteType,
} from '../lib/quoteos/pricing'
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
import {
  getBusinessLabel,
  getQuoteOption,
  PACKAGE_TIERS,
} from '../lib/quoteos/sqba-config'
import {
  createLineItem,
  defaultQuoteState,
  type BusinessTypeId,
  type LineItem,
  type PackageTierId,
  type QuoteFormState,
  type QuoteStatus,
  type QuoteTypeId,
} from '../lib/quoteos/types'

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

  const applyQuoteType = useCallback((quoteTypeId: QuoteTypeId) => {
    const preset = getPresetByQuoteType(quoteTypeId)
    setQuote((prev) => {
      const next: QuoteFormState = { ...prev, quoteTypeId }
      if (preset) {
        next.lineItems = applyPresetToLineItems(preset)
        next.inclusions = [...preset.inclusions]
        if (preset.suggestedSummary && !prev.projectSummary.trim()) {
          next.projectSummary = preset.suggestedSummary
        }
        if (preset.suggestedPaymentTerms) {
          next.paymentTerms = preset.suggestedPaymentTerms
        }
      }
      return next
    })
    setEmailDraftOverride(null)
  }, [])

  const applySqbaSelection = useCallback(
    (businessTypeId: BusinessTypeId, quoteOptionId: string) => {
      const option = getQuoteOption(businessTypeId, quoteOptionId)
      if (!option) return

      setQuote((prev) => {
        const next: QuoteFormState = {
          ...prev,
          businessTypeId,
          sqbaQuoteOptionId: quoteOptionId,
          businessType: getBusinessLabel(businessTypeId),
          quoteTypeId: option.presetId,
        }
        if (option.summaryHint && !prev.projectSummary.trim()) {
          next.projectSummary = option.summaryHint
        }
        const preset = getPresetByQuoteType(option.presetId)
        if (preset) {
          next.lineItems = applyPresetToLineItems(preset)
          next.inclusions = [...preset.inclusions]
          if (preset.suggestedSummary && !prev.projectSummary.trim()) {
            next.projectSummary = preset.suggestedSummary
          }
          if (preset.suggestedPaymentTerms) {
            next.paymentTerms = preset.suggestedPaymentTerms
          }
        }
        return next
      })
      setEmailDraftOverride(null)
    },
    [],
  )

  const applyPreset = useCallback((presetId: QuoteTypeId) => {
    applyQuoteType(presetId)
  }, [applyQuoteType])

  const appendPresetItems = useCallback((presetId: QuoteTypeId) => {
    const preset = getPresetByQuoteType(presetId)
    if (!preset) return

    setQuote((prev) => {
      const added = applyPresetToLineItems(preset)
      const inclusions = [
        ...new Set([...prev.inclusions, ...preset.inclusions]),
      ]
      return {
        ...prev,
        quoteTypeId: presetId,
        quoteGenerated: true,
        lineItems: [...prev.lineItems, ...added],
        inclusions,
        projectSummary:
          prev.projectSummary.trim() ||
          preset.suggestedSummary ||
          prev.projectSummary,
        paymentTerms: preset.suggestedPaymentTerms ?? prev.paymentTerms,
      }
    })
    setEmailDraftOverride(null)
  }, [])

  const generateSmartQuote = useCallback(() => {
    const parsed = parseMicahPrompt(quote.micahPrompt)
    const option = getQuoteOption(parsed.businessTypeId, parsed.quoteOptionId)

    setQuote((prev) => {
      const next: QuoteFormState = {
        ...prev,
        businessTypeId: parsed.businessTypeId,
        sqbaQuoteOptionId: parsed.quoteOptionId,
        businessType: getBusinessLabel(parsed.businessTypeId),
        projectTitle: prev.projectTitle.trim() || parsed.projectTitle,
        projectSummary: parsed.projectSummary,
        quoteGenerated: true,
        quoteTypeId: option?.presetId ?? 'custom',
      }

      if (option) {
        const preset = getPresetByQuoteType(option.presetId)
        if (preset) {
          next.lineItems = applyPresetToLineItems(preset)
          next.inclusions = [...preset.inclusions]
          if (preset.suggestedPaymentTerms) {
            next.paymentTerms = preset.suggestedPaymentTerms
          }
        }
      }

      if (!next.clientBusinessName.trim() && parsed.projectSummary) {
        const nameMatch = parsed.projectSummary.match(
          /for\s+([A-Za-z][A-Za-z\s]+?)(?:\s|$|—)/i,
        )
        if (nameMatch?.[1]) {
          next.clientBusinessName = nameMatch[1].trim()
        }
      }

      return next
    })
    setEmailDraftOverride(null)
  }, [quote.micahPrompt])

  const applyPackageTier = useCallback((tierId: PackageTierId) => {
    const tier = PACKAGE_TIERS.find((t) => t.id === tierId)
    if (!tier) return

    setQuote((prev) => {
      const oneOffItems = prev.lineItems.filter((i) => i.billingType === 'one-off')
      const recurring = prev.lineItems.filter((i) => i.billingType !== 'one-off')

      const packaged =
        oneOffItems.length > 0
          ? [
              createLineItem({
                label: `${tier.label} Package — ${getBusinessLabel(prev.businessTypeId)}`,
                amount: Math.round(
                  oneOffItems.reduce((s, i) => s + i.amount, 0) * tier.multiplier,
                ),
                billingType: 'one-off',
              }),
            ]
          : prev.lineItems

      return {
        ...prev,
        packageTier: tierId,
        lineItems: [...packaged, ...recurring],
        projectSummary:
          prev.projectSummary.trim() ||
          `Micah ${tier.label} package — scoped for clarity and margin protection.`,
      }
    })
    setEmailDraftOverride(null)
  }, [])

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

  const applySetupWizard = useCallback((config: SqbaSetupConfig) => {
    const businessTypeId = wizardBusinessToSqbaId(config.businessType)
    const quoteOptionId = getPrimaryQuoteOptionId(config)
    const option = getQuoteOption(businessTypeId, quoteOptionId)
    const depositPct = getDepositPercent(config)
    const suggestedLabels = getSuggestedLineItemLabels(config)
    const setupNote = buildMicahSetupNote(config)

    setQuote((prev) => {
      const next: QuoteFormState = {
        ...prev,
        businessTypeId,
        sqbaQuoteOptionId: quoteOptionId,
        businessType: getBusinessLabel(businessTypeId),
        quoteTypeId: option?.presetId ?? 'custom',
        paymentTerms: buildPaymentTerms(config),
        quoteExpiryDate: buildQuoteExpiryDate(14),
        depositEnabled: depositPct > 0,
        internalNotes: prev.internalNotes.trim()
          ? `${prev.internalNotes.trim()}\n\n${setupNote}`
          : setupNote,
        projectSummary:
          option?.summaryHint ??
          (prev.projectSummary.trim() ||
            `${getBusinessLabel(businessTypeId)} quote — scoped as discussed.`),
      }

      const preset = option ? getPresetByQuoteType(option.presetId) : undefined
      if (preset) {
        next.inclusions = [...preset.inclusions]
      }

      if (suggestedLabels.length > 0) {
        next.lineItems = suggestedLabels.map((label) =>
          createLineItem({ label, amount: 0 }),
        )
      } else if (preset) {
        next.lineItems = applyPresetToLineItems(preset)
      }

      if (config.pricingStyle === 'callout-total' && next.lineItems.length > 0) {
        next.lineItems = [
          createLineItem({ label: 'Callout fee', amount: 0 }),
          ...next.lineItems.filter((i) => !/callout/i.test(i.label)),
        ]
      }

      if (config.pricingStyle === 'hourly-labour') {
        const hasHourly = next.lineItems.some((i) => /hour|labour/i.test(i.label))
        if (!hasHourly) {
          next.lineItems = [
            ...next.lineItems,
            createLineItem({ label: 'Labour (hourly)', amount: 0 }),
          ]
        }
      }

      return next
    })
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
    applyQuoteType,
    applySqbaSelection,
    applyPreset,
    appendPresetItems,
    generateSmartQuote,
    applyPackageTier,
    setQuoteStatus,
    updateLineItem,
    addLineItem,
    removeLineItem,
    resetQuote,
    applySetupWizard,
  }
}
