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
      id: 'plumber-website-scw',
      label: 'Website + SCW Package',
      presetId: 'dos-website-growth',
      summaryHint: 'One-page plumbing website with Smart Chat Widget (SCW).',
    },
    {
      id: 'plumber-hot-water',
      label: 'Hot Water System',
      presetId: 'plumber-job',
      summaryHint: 'Hot water system replacement — supply, install and commissioning.',
    },
    {
      id: 'plumber-pipe-repair',
      label: 'Pipe Repair',
      presetId: 'plumber-job',
      summaryHint: 'Pipe repair job — diagnosis, repair and materials.',
    },
    {
      id: 'plumber-bathroom',
      label: 'Bathroom Plumbing',
      presetId: 'plumber-job',
      summaryHint: 'Bathroom plumbing — fixtures, rough-in and fit-off as scoped.',
    },
    {
      id: 'plumber-emergency',
      label: 'Emergency Callout',
      presetId: 'plumber-job',
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
      presetId: 'electrician-job',
      summaryHint: 'Switchboard inspection and upgrade as scoped.',
    },
    {
      id: 'electrician-power-points',
      label: 'Power Points',
      presetId: 'electrician-job',
      summaryHint: 'Power point installation as scoped.',
    },
    {
      id: 'electrician-lighting',
      label: 'Lighting',
      presetId: 'electrician-job',
      summaryHint: 'Lighting installation and testing.',
    },
    {
      id: 'electrician-safety-check',
      label: 'Safety Check',
      presetId: 'electrician-job',
      summaryHint: 'Electrical safety inspection and report.',
    },
    {
      id: 'electrician-emergency',
      label: 'Emergency Callout',
      presetId: 'electrician-job',
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
      presetId: 'painter-job',
    },
    {
      id: 'painter-exterior',
      label: 'Exterior Painting',
      presetId: 'painter-job',
    },
    {
      id: 'painter-prep',
      label: 'Prep & Repair',
      presetId: 'painter-job',
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
      presetId: 'fencing-job',
    },
    {
      id: 'fencing-gate',
      label: 'Gate Install',
      presetId: 'fencing-job',
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
      presetId: 'landscaping-job',
    },
    {
      id: 'landscaping-cleanup',
      label: 'Clean-up & Mulch',
      presetId: 'landscaping-job',
    },
    {
      id: 'landscaping-custom',
      label: 'Custom Landscaping Job',
      presetId: 'custom',
    },
  ],
  agency: [
    {
      id: 'agency-website',
      label: 'Website Build',
      presetId: 'dos-website-growth',
    },
    {
      id: 'agency-custom',
      label: 'Custom Agency Quote',
      presetId: 'custom',
    },
  ],
  'dos-client': [
    { id: 'dos-website-starter', label: 'Website Starter', presetId: 'dos-website-starter' },
    { id: 'dos-website-growth', label: 'Website Growth', presetId: 'dos-website-growth' },
    { id: 'dos-website-premium', label: 'Website Premium', presetId: 'dos-website-premium' },
    { id: 'dos-website-custom', label: 'Custom Website', presetId: 'dos-website-custom' },
    { id: 'dos-rebuild', label: 'Website Rebuild', presetId: 'dos-website-rebuild' },
    { id: 'dos-new-site', label: 'New Website Build', presetId: 'new-website-build' },
    { id: 'dos-micah-sba', label: 'Micah SBA', presetId: 'micah-sba' },
    { id: 'dos-scw', label: 'Smart Chat Widget', presetId: 'smart-chat-widget' },
    {
      id: 'dos-google',
      label: 'Google Business Setup',
      presetId: 'google-business-setup',
    },
    { id: 'dos-hosting', label: 'Hosting & Support', presetId: 'hosting-support' },
    { id: 'dos-agentmate', label: 'AgentMate Setup', presetId: 'agentmate-setup' },
    { id: 'dos-custom', label: 'Custom DOS Quote', presetId: 'custom' },
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
    label: 'One-page plumbing website + SCW',
    prompt: 'One-page plumbing website with Smart Chat Widget for Luke Plumbing',
    businessTypeId: 'plumber',
    quoteOptionId: 'plumber-website-scw',
  },
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
