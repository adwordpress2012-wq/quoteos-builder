import type { BusinessTypeId, PackageTierId, QuoteTypeId } from './types'

export type { BusinessTypeId }

export type SqbaQuoteOption = {
  id: string
  label: string
  presetId: QuoteTypeId
  summaryHint?: string
}

export const BUSINESS_TYPE_OPTIONS: { id: BusinessTypeId; label: string }[] = [
  { id: 'plumber', label: 'Plumber' },
  { id: 'electrician', label: 'Electrician' },
  { id: 'painter', label: 'Painter' },
  { id: 'fencing', label: 'Fencing' },
  { id: 'landscaping', label: 'Landscaping' },
  { id: 'agency', label: 'Agency' },
  { id: 'dos-client', label: 'DOS Client' },
]

export const QUOTE_TYPES_BY_BUSINESS: Record<BusinessTypeId, SqbaQuoteOption[]> = {
  plumber: [
    {
      id: 'plumber-hot-water',
      label: 'Hot Water System',
      presetId: 'plumbing',
      summaryHint: 'Hot water system replacement — supply, install and commissioning.',
    },
    {
      id: 'plumber-pipe-repair',
      label: 'Pipe Repair',
      presetId: 'plumbing',
      summaryHint: 'Pipe repair job — diagnosis, repair and materials.',
    },
    {
      id: 'plumber-bathroom',
      label: 'Bathroom Plumbing',
      presetId: 'plumbing',
      summaryHint: 'Bathroom plumbing — fixtures, rough-in and fit-off as scoped.',
    },
    {
      id: 'plumber-emergency',
      label: 'Emergency Callout',
      presetId: 'plumbing',
      summaryHint: 'Emergency plumbing callout — priority attendance and repair.',
    },
    {
      id: 'plumber-custom',
      label: 'Custom Plumbing Job',
      presetId: 'custom',
    },
  ],
  electrician: [
    {
      id: 'electrician-switchboard',
      label: 'Switchboard Job',
      presetId: 'electrical',
      summaryHint: 'Switchboard inspection and upgrade as scoped.',
    },
    {
      id: 'electrician-power-points',
      label: 'Power Points',
      presetId: 'electrical',
      summaryHint: 'Power point installation as scoped.',
    },
    {
      id: 'electrician-lighting',
      label: 'Lighting',
      presetId: 'electrical',
      summaryHint: 'Lighting installation and testing.',
    },
    {
      id: 'electrician-safety-check',
      label: 'Safety Check',
      presetId: 'electrical',
      summaryHint: 'Electrical safety inspection and report.',
    },
    {
      id: 'electrician-emergency',
      label: 'Emergency Callout',
      presetId: 'electrical',
      summaryHint: 'Emergency electrical callout — priority attendance.',
    },
    {
      id: 'electrician-custom',
      label: 'Custom Electrical Job',
      presetId: 'custom',
    },
  ],
  painter: [
    {
      id: 'painter-interior',
      label: 'Interior Painting',
      presetId: 'painting',
    },
    {
      id: 'painter-exterior',
      label: 'Exterior Painting',
      presetId: 'painting',
    },
    {
      id: 'painter-prep',
      label: 'Prep & Repair',
      presetId: 'painting',
    },
    {
      id: 'painter-custom',
      label: 'Custom Painting Job',
      presetId: 'custom',
    },
  ],
  fencing: [
    {
      id: 'fencing-install',
      label: 'Fencing Installation',
      presetId: 'general_trade',
    },
    {
      id: 'fencing-gate',
      label: 'Gate Install',
      presetId: 'general_trade',
    },
    {
      id: 'fencing-custom',
      label: 'Custom Fencing Job',
      presetId: 'custom',
    },
  ],
  landscaping: [
    {
      id: 'landscaping-garden',
      label: 'Garden / Turf Job',
      presetId: 'general_trade',
    },
    {
      id: 'landscaping-cleanup',
      label: 'Clean-up & Mulch',
      presetId: 'general_trade',
    },
    {
      id: 'landscaping-custom',
      label: 'Custom Landscaping Job',
      presetId: 'custom',
    },
  ],
  agency: [
    {
      id: 'agency-build',
      label: 'Building / renovation',
      presetId: 'building',
    },
    {
      id: 'agency-custom',
      label: 'Custom Agency Quote',
      presetId: 'custom',
    },
  ],
  'dos-client': [
    {
      id: 'dos-general',
      label: 'General trade job',
      presetId: 'general_trade',
    },
    {
      id: 'dos-custom',
      label: 'Custom quote',
      presetId: 'custom',
    },
  ],
}

/** Wizard "Other" maps to agency custom quote option */
export const OTHER_QUOTE_OPTION_ID = 'agency-custom'

export const QUICK_START_EXAMPLES: {
  label: string
  prompt: string
  businessTypeId: BusinessTypeId
  quoteOptionId: string
}[] = [
  {
    label: 'Hot water system replacement',
    prompt: 'Hot water system replacement for residential property',
    businessTypeId: 'plumber',
    quoteOptionId: 'plumber-hot-water',
  },
  {
    label: 'Pipe repair job',
    prompt: 'Pipe repair under kitchen sink — leak fix and materials',
    businessTypeId: 'plumber',
    quoteOptionId: 'plumber-pipe-repair',
  },
  {
    label: 'Electrician switchboard job',
    prompt: 'Switchboard inspection and upgrade for small commercial unit',
    businessTypeId: 'electrician',
    quoteOptionId: 'electrician-switchboard',
  },
  {
    label: 'Painting quote',
    prompt: 'Interior painting — 3 bedrooms, prep and two coats',
    businessTypeId: 'painter',
    quoteOptionId: 'painter-interior',
  },
  {
    label: 'Fencing job',
    prompt: 'Colorbond fencing — 18m rear boundary with gate',
    businessTypeId: 'fencing',
    quoteOptionId: 'fencing-install',
  },
]

export const PACKAGE_TIERS: {
  id: PackageTierId
  label: string
  multiplier: number
  tagline: string
}[] = [
  {
    id: 'starter',
    label: 'Starter',
    multiplier: 0.88,
    tagline: 'Essential scope — easier yes for budget-conscious clients',
  },
  {
    id: 'growth',
    label: 'Growth',
    multiplier: 1,
    tagline: 'Balanced package — recommended for most jobs',
  },
  {
    id: 'premium',
    label: 'Premium',
    multiplier: 1.18,
    tagline: 'Full scope with extras — protects margin on upsells',
  },
]

export function getBusinessLabel(id: BusinessTypeId): string {
  return BUSINESS_TYPE_OPTIONS.find((b) => b.id === id)?.label ?? id
}

export function getQuoteOption(
  businessTypeId: BusinessTypeId,
  quoteOptionId: string,
): SqbaQuoteOption | undefined {
  return QUOTE_TYPES_BY_BUSINESS[businessTypeId]?.find((q) => q.id === quoteOptionId)
}

export function getDefaultQuoteOptionId(businessTypeId: BusinessTypeId): string {
  return QUOTE_TYPES_BY_BUSINESS[businessTypeId][0]?.id ?? 'custom'
}
