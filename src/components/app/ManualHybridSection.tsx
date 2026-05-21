import { Plus } from 'lucide-react'
import { useState } from 'react'
import { getPricingCatalogGroups } from '../../lib/quoteos/pricing'
import type { QuoteTypeId } from '../../lib/quoteos/types'
import { builderSelectClass } from './builder-styles'

type ManualHybridSectionProps = {
  onSelectPreset: (presetId: QuoteTypeId) => void
}

const CATALOG = getPricingCatalogGroups()

export function ManualHybridSection({ onSelectPreset }: ManualHybridSectionProps) {
  const [websiteId, setWebsiteId] = useState('')
  const [addonId, setAddonId] = useState('')
  const [supportId, setSupportId] = useState('')

  const handleAdd = () => {
    const id = (websiteId || addonId || supportId) as QuoteTypeId
    if (!id) return
    onSelectPreset(id)
  }

  const hasSelection = Boolean(websiteId || addonId || supportId)

  return (
    <section className="glass-card rounded-xl border-blue-500/10 px-4 py-3 sm:px-4 sm:py-3.5">
      <div className="relative flex items-center justify-center py-1">
        <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500/15" aria-hidden="true" />
        <span className="relative bg-[var(--qos-panel)] px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Or
        </span>
      </div>

      <p className="mt-2 text-xs font-medium text-slate-400">
        Start manually or pick a package
      </p>

      <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
        <PresetSelect
          label="DOS Website Packages"
          value={websiteId}
          options={CATALOG.find((g) => g.id === 'website')?.options ?? []}
          onChange={(v) => {
            setWebsiteId(v)
            setAddonId('')
            setSupportId('')
            if (v) onSelectPreset(v as QuoteTypeId)
          }}
        />
        <PresetSelect
          label="Add-on Services"
          value={addonId}
          options={CATALOG.find((g) => g.id === 'addon')?.options ?? []}
          onChange={(v) => {
            setAddonId(v)
            setWebsiteId('')
            setSupportId('')
            if (v) onSelectPreset(v as QuoteTypeId)
          }}
        />
        <PresetSelect
          label="Support & Hosting"
          value={supportId}
          options={CATALOG.find((g) => g.id === 'support')?.options ?? []}
          onChange={(v) => {
            setSupportId(v)
            setWebsiteId('')
            setAddonId('')
            if (v) onSelectPreset(v as QuoteTypeId)
          }}
        />
      </div>

      <button
        type="button"
        disabled={!hasSelection}
        onClick={handleAdd}
        className="mt-2.5 inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-lg border border-blue-400/30 bg-blue-500/8 px-3 text-xs font-semibold text-cyan-200 transition-colors hover:border-cyan-400/40 disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        Build quote
      </button>
    </section>
  )
}

function PresetSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { id: QuoteTypeId; label: string }[]
  onChange: (id: string) => void
}) {
  const selectId = label.replace(/\s+/g, '-').toLowerCase()

  return (
    <div>
      <label className="mb-1 block text-[10px] font-medium text-slate-500" htmlFor={selectId}>
        {label}
      </label>
      <select
        id={selectId}
        className={`${builderSelectClass} min-h-[40px] py-2 text-sm`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
