import { OTHER_QUOTE_OPTION_ID } from './sqba-config'
import type { BusinessTypeId } from './types'

export const SETUP_STORAGE_KEY = 'quoteos-sqba-setup'

export type WizardBusinessTypeId =
  | 'plumber'
  | 'electrician'
  | 'painter'
  | 'fencing'
  | 'landscaping'
  | 'agency'
  | 'dos-client'
  | 'other'

export type PricingStyleId =
  | 'fixed-package'
  | 'hourly-labour'
  | 'materials-labour'
  | 'callout-total'

export type DepositPreferenceId = 'none' | '25' | '50' | 'custom'

export type QuoteDeliveryId = 'email' | 'sms' | 'both'

export type FollowUpPreferenceId = '2-days' | '3-days' | '7-days' | 'manual'

export type WritingToneId = 'simple' | 'casual-au' | 'professional' | 'premium'

export type SqbaSetupConfig = {
  completed: boolean
  businessType: WizardBusinessTypeId
  jobTypes: string[]
  pricingStyle: PricingStyleId
  depositPreference: DepositPreferenceId
  customDepositPercent?: number
  delivery: QuoteDeliveryId
  followUp: FollowUpPreferenceId
  writingTone: WritingToneId
  completedAt?: string
}

export type WizardJobOption = {
  id: string
  label: string
  quoteOptionId: string
  lineItemLabels?: string[]
}

export const WIZARD_BUSINESS_OPTIONS: {
  id: WizardBusinessTypeId
  label: string
}[] = [
  { id: 'plumber', label: 'Plumber' },
  { id: 'electrician', label: 'Electrician' },
  { id: 'painter', label: 'Painter' },
  { id: 'fencing', label: 'Fencing' },
  { id: 'landscaping', label: 'Landscaping' },
  { id: 'agency', label: 'Agency' },
  { id: 'dos-client', label: 'DOS Client' },
  { id: 'other', label: 'Other' },
]

export const PRICING_STYLE_OPTIONS: { id: PricingStyleId; label: string }[] = [
  { id: 'fixed-package', label: 'Fixed package' },
  { id: 'hourly-labour', label: 'Hourly labour' },
  { id: 'materials-labour', label: 'Materials + labour' },
  { id: 'callout-total', label: 'Callout + job total' },
]

export const DEPOSIT_OPTIONS: { id: DepositPreferenceId; label: string }[] = [
  { id: 'none', label: 'No deposit' },
  { id: '25', label: '25%' },
  { id: '50', label: '50%' },
  { id: 'custom', label: 'Custom' },
]

export const DELIVERY_OPTIONS: { id: QuoteDeliveryId; label: string }[] = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS ready' },
  { id: 'both', label: 'Both' },
]

export const FOLLOW_UP_OPTIONS: { id: FollowUpPreferenceId; label: string }[] = [
  { id: '2-days', label: '2 days' },
  { id: '3-days', label: '3 days' },
  { id: '7-days', label: '7 days' },
  { id: 'manual', label: 'Manual only' },
]

export const TONE_OPTIONS: { id: WritingToneId; label: string }[] = [
  { id: 'simple', label: 'Simple' },
  { id: 'casual-au', label: 'Casual Australian' },
  { id: 'professional', label: 'Professional' },
  { id: 'premium', label: 'Premium' },
]

export const JOB_TYPES_BY_BUSINESS: Record<WizardBusinessTypeId, WizardJobOption[]> = {
  plumber: [
    {
      id: 'hot-water',
      label: 'Hot water system',
      quoteOptionId: 'plumber-hot-water',
      lineItemLabels: ['Hot water system supply & install'],
    },
    {
      id: 'pipe-repair',
      label: 'Pipe repair',
      quoteOptionId: 'plumber-pipe-repair',
      lineItemLabels: ['Pipe repair labour', 'Materials & fittings'],
    },
    {
      id: 'bathroom',
      label: 'Bathroom plumbing',
      quoteOptionId: 'plumber-bathroom',
      lineItemLabels: ['Bathroom plumbing labour', 'Fixtures & materials'],
    },
    {
      id: 'emergency',
      label: 'Emergency callout',
      quoteOptionId: 'plumber-emergency',
      lineItemLabels: ['Emergency callout fee', 'Repair labour'],
    },
  ],
  electrician: [
    {
      id: 'switchboard',
      label: 'Switchboard',
      quoteOptionId: 'electrician-switchboard',
      lineItemLabels: ['Switchboard inspection / upgrade'],
    },
    {
      id: 'power-points',
      label: 'Power points',
      quoteOptionId: 'electrician-power-points',
      lineItemLabels: ['Power point installation'],
    },
    {
      id: 'lighting',
      label: 'Lighting',
      quoteOptionId: 'electrician-lighting',
      lineItemLabels: ['Lighting installation'],
    },
    {
      id: 'safety-check',
      label: 'Safety check',
      quoteOptionId: 'electrician-safety-check',
      lineItemLabels: ['Electrical safety check'],
    },
    {
      id: 'emergency',
      label: 'Emergency callout',
      quoteOptionId: 'electrician-emergency',
      lineItemLabels: ['Emergency callout fee', 'Repair labour'],
    },
  ],
  painter: [
    {
      id: 'interior',
      label: 'Interior painting',
      quoteOptionId: 'painter-interior',
      lineItemLabels: ['Interior painting labour', 'Paint & materials'],
    },
    {
      id: 'exterior',
      label: 'Exterior painting',
      quoteOptionId: 'painter-exterior',
      lineItemLabels: ['Exterior painting labour', 'Paint & materials'],
    },
    {
      id: 'prep-repair',
      label: 'Prep & repair',
      quoteOptionId: 'painter-prep',
      lineItemLabels: ['Surface prep', 'Minor repairs'],
    },
  ],
  fencing: [
    {
      id: 'install',
      label: 'Fencing installation',
      quoteOptionId: 'fencing-install',
      lineItemLabels: ['Fencing materials', 'Installation labour'],
    },
    {
      id: 'gate',
      label: 'Gate install',
      quoteOptionId: 'fencing-gate',
      lineItemLabels: ['Gate supply & install'],
    },
  ],
  landscaping: [
    {
      id: 'garden',
      label: 'Garden / turf',
      quoteOptionId: 'landscaping-garden',
      lineItemLabels: ['Garden / turf works'],
    },
    {
      id: 'cleanup',
      label: 'Clean-up & mulch',
      quoteOptionId: 'landscaping-cleanup',
      lineItemLabels: ['Clean-up', 'Mulch & materials'],
    },
  ],
  agency: [
    {
      id: 'build',
      label: 'Building / renovation',
      quoteOptionId: 'agency-build',
      lineItemLabels: ['Building labour', 'Materials'],
    },
    {
      id: 'custom',
      label: 'Custom job',
      quoteOptionId: 'agency-custom',
      lineItemLabels: ['Service / labour', 'Materials'],
    },
  ],
  'dos-client': [
    {
      id: 'general',
      label: 'General trade job',
      quoteOptionId: 'dos-general',
      lineItemLabels: ['Service / labour', 'Materials'],
    },
    {
      id: 'custom',
      label: 'Custom quote',
      quoteOptionId: 'dos-custom',
      lineItemLabels: ['Line item'],
    },
  ],
  other: [
    {
      id: 'general',
      label: 'General job quote',
      quoteOptionId: OTHER_QUOTE_OPTION_ID,
      lineItemLabels: ['Service / labour', 'Materials'],
    },
  ],
}

export function defaultSetupConfig(): SqbaSetupConfig {
  return {
    completed: false,
    businessType: 'plumber',
    jobTypes: [],
    pricingStyle: 'materials-labour',
    depositPreference: '50',
    delivery: 'email',
    followUp: '3-days',
    writingTone: 'casual-au',
  }
}

export function wizardBusinessToSqbaId(
  id: WizardBusinessTypeId,
): BusinessTypeId {
  if (id === 'other') return 'agency'
  return id
}

export function getWizardBusinessLabel(id: WizardBusinessTypeId): string {
  return WIZARD_BUSINESS_OPTIONS.find((b) => b.id === id)?.label ?? id
}

export function getPricingStyleLabel(id: PricingStyleId): string {
  return PRICING_STYLE_OPTIONS.find((p) => p.id === id)?.label ?? id
}

export function getDepositLabel(config: SqbaSetupConfig): string {
  if (config.depositPreference === 'none') return 'No deposit'
  if (config.depositPreference === 'custom') {
    const pct = config.customDepositPercent ?? 30
    return `${pct}% (custom)`
  }
  return `${config.depositPreference}%`
}

export function getDeliveryLabel(id: QuoteDeliveryId): string {
  return DELIVERY_OPTIONS.find((d) => d.id === id)?.label ?? id
}

export function getFollowUpLabel(id: FollowUpPreferenceId): string {
  return FOLLOW_UP_OPTIONS.find((f) => f.id === id)?.label ?? id
}

export function getToneLabel(id: WritingToneId): string {
  return TONE_OPTIONS.find((t) => t.id === id)?.label ?? id
}

export function getDepositPercent(config: SqbaSetupConfig): number {
  switch (config.depositPreference) {
    case 'none':
      return 0
    case '25':
      return 25
    case '50':
      return 50
    case 'custom':
      return Math.min(100, Math.max(0, config.customDepositPercent ?? 30))
    default:
      return 50
  }
}

export function buildPaymentTerms(config: SqbaSetupConfig): string {
  const pct = getDepositPercent(config)
  const pricingNote =
    config.pricingStyle === 'fixed-package'
      ? 'Fixed package price as quoted.'
      : config.pricingStyle === 'hourly-labour'
        ? 'Labour charged at agreed hourly rate; materials additional where noted.'
        : config.pricingStyle === 'callout-total'
          ? 'Callout fee applies; job total confirmed after inspection.'
          : 'Materials and labour as itemised unless stated as a package.'

  if (pct === 0) {
    return `Payment due on completion. ${pricingNote}`
  }
  const balance = 100 - pct
  return `${pct}% deposit to commence / book the job. ${balance}% balance due on completion. ${pricingNote}`
}

export function buildQuoteExpiryDate(daysValid = 14): string {
  const d = new Date()
  d.setDate(d.getDate() + daysValid)
  return d.toISOString().slice(0, 10)
}

export function getFollowUpDays(config: SqbaSetupConfig): number | null {
  switch (config.followUp) {
    case '2-days':
      return 2
    case '3-days':
      return 3
    case '7-days':
      return 7
    default:
      return null
  }
}

export function getPrimaryQuoteOptionId(config: SqbaSetupConfig): string {
  const jobs = JOB_TYPES_BY_BUSINESS[config.businessType] ?? []
  const firstJobId = config.jobTypes[0]
  const match = jobs.find((j) => j.id === firstJobId)
  if (match) return match.quoteOptionId
  if (config.businessType === 'other') return OTHER_QUOTE_OPTION_ID
  return jobs[0]?.quoteOptionId ?? OTHER_QUOTE_OPTION_ID
}

export function getSuggestedLineItemLabels(config: SqbaSetupConfig): string[] {
  const jobs = JOB_TYPES_BY_BUSINESS[config.businessType] ?? []
  const labels: string[] = []
  for (const jobId of config.jobTypes) {
    const job = jobs.find((j) => j.id === jobId)
    if (job?.lineItemLabels) {
      for (const label of job.lineItemLabels) {
        if (!labels.includes(label)) labels.push(label)
      }
    }
  }
  if (labels.length === 0 && jobs[0]?.lineItemLabels) {
    return [...jobs[0].lineItemLabels]
  }
  return labels
}

export function buildMicahSetupNote(config: SqbaSetupConfig): string {
  const followDays = getFollowUpDays(config)
  const delivery =
    config.delivery === 'both'
      ? 'Email and SMS'
      : config.delivery === 'sms'
        ? 'SMS-ready'
        : 'Email'
  const follow =
    followDays === null
      ? 'Follow-up: manual only.'
      : `Follow-up: soft check-in after ${followDays} business days.`
  return `SQBA setup: ${getWizardBusinessLabel(config.businessType)} · ${getPricingStyleLabel(config.pricingStyle)} · ${getDepositLabel(config)} · ${delivery} · ${getToneLabel(config.writingTone)} tone. ${follow}`
}

export function loadSetupFromStorage(): SqbaSetupConfig | null {
  try {
    const raw = localStorage.getItem(SETUP_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SqbaSetupConfig
    if (!parsed || typeof parsed !== 'object') return null
    return { ...defaultSetupConfig(), ...parsed }
  } catch {
    return null
  }
}

export function saveSetupToStorage(config: SqbaSetupConfig): void {
  try {
    localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(config))
  } catch {
    /* ignore quota / private mode */
  }
}

export function clearSetupStorage(): void {
  try {
    localStorage.removeItem(SETUP_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
