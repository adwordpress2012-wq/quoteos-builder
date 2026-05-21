import { CheckCircle2, RotateCcw, Settings2 } from 'lucide-react'
import {
  getDepositLabel,
  getDeliveryLabel,
  getFollowUpLabel,
  getPricingStyleLabel,
  getToneLabel,
  getWizardBusinessLabel,
  type SqbaSetupConfig,
} from '../../lib/quoteos/setup-wizard'
import { cn } from '../../lib/utils'

type SetupSummaryCardProps = {
  setup: SqbaSetupConfig
  onEditSetup: () => void
  onResetSetup: () => void
  className?: string
}

export function SetupSummaryCard({
  setup,
  onEditSetup,
  onResetSetup,
  className,
}: SetupSummaryCardProps) {
  if (!setup.completed) {
    return (
      <section
        className={cn(
          'glass-card rounded-2xl border border-cyan-500/25 p-4 sm:p-5',
          className,
        )}
      >
        <div className="flex items-start gap-3">
          <span className="icon-block-purple flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            <Settings2 className="h-6 w-6 text-purple-200" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-slate-50">
              Quote Setup Wizard
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Micah will help set up your quoting style in a few simple
              questions — under 2 minutes.
            </p>
            <button
              type="button"
              onClick={onEditSetup}
              className="mt-4 min-h-[52px] w-full rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 px-5 py-3 text-base font-semibold text-cyan-50"
            >
              Start setup
            </button>
          </div>
        </div>
      </section>
    )
  }

  const rows: { label: string; value: string }[] = [
    { label: 'Business type', value: getWizardBusinessLabel(setup.businessType) },
    { label: 'Pricing style', value: getPricingStyleLabel(setup.pricingStyle) },
    { label: 'Deposit', value: getDepositLabel(setup) },
    { label: 'Delivery', value: getDeliveryLabel(setup.delivery) },
    { label: 'Follow-up', value: getFollowUpLabel(setup.followUp) },
    { label: 'Tone', value: getToneLabel(setup.writingTone) },
  ]

  return (
    <section
      className={cn('glass-card rounded-2xl p-4 sm:p-5', className)}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
          SQBA setup
        </h2>
        <CheckCircle2
          className="h-5 w-5 shrink-0 text-emerald-400"
          aria-hidden="true"
        />
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex min-h-[44px] flex-col justify-center rounded-lg border border-blue-500/15 bg-blue-500/5 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <span className="text-sm text-slate-500">{row.label}</span>
            <span className="text-sm font-medium text-slate-200">
              {row.value}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onEditSetup}
          className="min-h-[48px] flex-1 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm font-medium text-cyan-200"
        >
          Edit setup
        </button>
        <button
          type="button"
          onClick={onResetSetup}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-slate-600/40 px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-200"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset setup
        </button>
      </div>
    </section>
  )
}
