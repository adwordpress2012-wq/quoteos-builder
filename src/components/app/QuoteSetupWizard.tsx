import { ChevronLeft, ChevronRight, Settings2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  DEPOSIT_OPTIONS,
  DELIVERY_OPTIONS,
  FOLLOW_UP_OPTIONS,
  JOB_TYPES_BY_BUSINESS,
  PRICING_STYLE_OPTIONS,
  TONE_OPTIONS,
  WIZARD_BUSINESS_OPTIONS,
  defaultSetupConfig,
  type SqbaSetupConfig,
  type WizardBusinessTypeId,
} from '../../lib/quoteos/setup-wizard'
import { builderPrimaryBtnClass } from './builder-styles'
import { cn } from '../../lib/utils'

const STEP_COUNT = 7

type QuoteSetupWizardProps = {
  open: boolean
  initialConfig: SqbaSetupConfig
  onClose: () => void
  onComplete: (config: SqbaSetupConfig) => void
}

export function QuoteSetupWizard({
  open,
  initialConfig,
  onClose,
  onComplete,
}: QuoteSetupWizardProps) {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<SqbaSetupConfig>(initialConfig)

  useEffect(() => {
    if (open) {
      setDraft(initialConfig.completed ? initialConfig : defaultSetupConfig())
      setStep(0)
    }
  }, [open, initialConfig])

  if (!open) return null

  const jobOptions = JOB_TYPES_BY_BUSINESS[draft.businessType] ?? []

  const toggleJob = (id: string) => {
    setDraft((prev) => {
      const has = prev.jobTypes.includes(id)
      return {
        ...prev,
        jobTypes: has
          ? prev.jobTypes.filter((j) => j !== id)
          : [...prev.jobTypes, id],
      }
    })
  }

  const canNext = () => {
    if (step === 1) return draft.jobTypes.length > 0
    if (step === 3 && draft.depositPreference === 'custom') {
      const pct = draft.customDepositPercent ?? 0
      return pct > 0 && pct <= 100
    }
    return true
  }

  const goNext = () => {
    if (step < STEP_COUNT - 1) setStep((s) => s + 1)
    else onComplete(draft)
  }

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-[var(--qos-bg)] print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="setup-wizard-title"
    >
      <header className="shrink-0 border-b border-blue-500/20 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-lg items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="icon-block-purple flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
              <Settings2 className="h-5 w-5 text-purple-200" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Step {step + 1} of {STEP_COUNT}
              </p>
              <h2
                id="setup-wizard-title"
                className="text-xl font-semibold text-slate-50"
              >
                Quote Setup Wizard
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Micah will help set up your quoting style in a few simple
                questions.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/25 text-slate-400 hover:text-slate-200"
            aria-label="Close setup wizard"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div
          className="mx-auto mt-4 flex max-w-lg gap-1"
          aria-hidden="true"
        >
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                i <= step ? 'bg-cyan-500/70' : 'bg-slate-700',
              )}
            />
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-lg">
          {step === 0 && (
            <WizardStep title="What type of business are you?">
              <OptionGrid>
                {WIZARD_BUSINESS_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    selected={draft.businessType === opt.id}
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        businessType: opt.id as WizardBusinessTypeId,
                        jobTypes: [],
                      }))
                    }
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </OptionGrid>
            </WizardStep>
          )}

          {step === 1 && (
            <WizardStep title="What jobs do you quote most often?">
              <p className="mb-4 text-sm text-slate-500">
                Pick all that apply — Micah will suggest line items from your
                choices.
              </p>
              <OptionGrid>
                {jobOptions.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    selected={draft.jobTypes.includes(opt.id)}
                    onClick={() => toggleJob(opt.id)}
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </OptionGrid>
            </WizardStep>
          )}

          {step === 2 && (
            <WizardStep title="How do you usually price jobs?">
              <OptionGrid>
                {PRICING_STYLE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    selected={draft.pricingStyle === opt.id}
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, pricingStyle: opt.id }))
                    }
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </OptionGrid>
            </WizardStep>
          )}

          {step === 3 && (
            <WizardStep title="Deposit preference">
              <OptionGrid>
                {DEPOSIT_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    selected={draft.depositPreference === opt.id}
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        depositPreference: opt.id,
                      }))
                    }
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </OptionGrid>
              {draft.depositPreference === 'custom' && (
                <label className="mt-4 block">
                  <span className="mb-2 block text-sm font-semibold text-slate-300">
                    Custom deposit %
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className="w-full min-h-[52px] rounded-xl border border-blue-500/25 bg-[rgba(10,15,30,0.75)] px-4 py-3 text-base text-slate-100"
                    value={draft.customDepositPercent ?? ''}
                    onChange={(e) =>
                      setDraft((prev) => ({
                        ...prev,
                        customDepositPercent: Number(e.target.value) || undefined,
                      }))
                    }
                    placeholder="e.g. 30"
                  />
                </label>
              )}
            </WizardStep>
          )}

          {step === 4 && (
            <WizardStep title="How will you send quotes?">
              <OptionGrid>
                {DELIVERY_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    selected={draft.delivery === opt.id}
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, delivery: opt.id }))
                    }
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </OptionGrid>
            </WizardStep>
          )}

          {step === 5 && (
            <WizardStep title="Follow-up timing">
              <OptionGrid>
                {FOLLOW_UP_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    selected={draft.followUp === opt.id}
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, followUp: opt.id }))
                    }
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </OptionGrid>
            </WizardStep>
          )}

          {step === 6 && (
            <WizardStep title="Writing tone for emails">
              <OptionGrid>
                {TONE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.id}
                    selected={draft.writingTone === opt.id}
                    onClick={() =>
                      setDraft((prev) => ({ ...prev, writingTone: opt.id }))
                    }
                  >
                    {opt.label}
                  </OptionButton>
                ))}
              </OptionGrid>
            </WizardStep>
          )}
        </div>
      </div>

      <footer className="shrink-0 border-t border-blue-500/20 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-lg gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex min-h-[52px] flex-1 items-center justify-center gap-1 rounded-xl border border-blue-500/30 bg-blue-500/10 text-base font-medium text-slate-200"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="min-h-[52px] flex-1 rounded-xl border border-blue-500/30 px-4 text-base text-slate-400"
            >
              Later
            </button>
          )}
          <button
            type="button"
            disabled={!canNext()}
            onClick={goNext}
            className={cn(
              builderPrimaryBtnClass,
              'flex-1',
              !canNext() && 'pointer-events-none opacity-50',
            )}
          >
            {step === STEP_COUNT - 1 ? 'Finish setup' : 'Next'}
            {step < STEP_COUNT - 1 && (
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </footer>
    </div>
  )
}

function WizardStep({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function OptionGrid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'min-h-[56px] w-full rounded-xl border px-4 py-4 text-left text-base font-medium transition-all',
        selected
          ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-100 shadow-[var(--qos-glow-blue)]'
          : 'border-blue-500/25 bg-blue-500/8 text-slate-200 hover:border-purple-400/35',
      )}
    >
      {children}
    </button>
  )
}
