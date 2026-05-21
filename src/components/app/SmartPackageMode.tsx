import { Sparkles } from 'lucide-react'
import { PACKAGE_TIERS } from '../../lib/quoteos/sqba-config'
import type { PackageTierId } from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

type SmartPackageModeProps = {
  selectedTier: PackageTierId | null
  onSelectTier: (tier: PackageTierId) => void
  disabled?: boolean
}

export function SmartPackageMode({
  selectedTier,
  onSelectTier,
  disabled,
}: SmartPackageModeProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="icon-block-purple flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
          <Sparkles className="h-5 w-5 text-purple-200" aria-hidden="true" />
        </span>
        <p className="text-sm leading-relaxed text-slate-400">
          Micah can package the offer to make it easier for the customer to say yes
          while protecting your margin. Pick a tier — prices stay editable below.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {PACKAGE_TIERS.map((tier) => (
          <button
            key={tier.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectTier(tier.id)}
            className={cn(
              'rounded-xl border p-4 text-left transition-all',
              selectedTier === tier.id
                ? 'border-purple-400/50 bg-purple-500/15 shadow-[var(--qos-glow-purple)]'
                : 'border-blue-500/25 bg-blue-500/5 hover:border-blue-400/40',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            aria-pressed={selectedTier === tier.id}
          >
            <p className="text-base font-semibold text-slate-50">{tier.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              {tier.tagline}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
