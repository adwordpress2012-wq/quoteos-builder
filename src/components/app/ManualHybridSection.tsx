import { Plus } from 'lucide-react'
import { useState } from 'react'
import { getPricingCatalogGroups } from '../../lib/quoteos/pricing'
import type { QuoteTypeId } from '../../lib/quoteos/types'
import { builderSelectClass } from './builder-styles'

type ManualHybridSectionProps = {
  onAddPreset: (presetId: QuoteTypeId) => void
}

const CATALOG = getPricingCatalogGroups()

export function ManualHybridSection({ onAddPreset }: ManualHybridSectionProps) {
  const [websiteId, setWebsiteId] = useState('')
  const [addonId, setAddonId] = useState('')
  const [supportId, setSupportId] = useState('')

  const handleAdd = () => {
    const id = (websiteId || addonId || supportId) as QuoteTypeId
    if (!id) return
    onAddPreset(id)
    setWebsiteId('')
    setAddonId('')
    setSupportId('')
  }

  const hasSelection = Boolean(websiteId || addonId || supportId)

  return (
    <section className="glass-card rounded-2xl p-5 sm:p-6">
      <div className="relative flex items-center justify-center py-2">
        <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500/20" aria-hidden="true" />
        <span className="relative bg-[var(--qos-panel)] px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Or
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-300">
        Start manually or pick a package
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <PresetSelect
          label="DOS Website Packages"
          value={websiteId}
          options={CATALOG.find((g) => g.id === 'website')?.options ?? []}
          onChange={(v) => {
            setWebsiteId(v)
            setAddonId('')
            setSupportId('')
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
          }}
        />
      </div>

      <button
        type="button"
        disabled={!hasSelection}
        onClick={handleAdd}
        className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-blue-400/35 bg-blue-500/10 px-4 text-sm font-semibold text-cyan-200 transition-colors hover:border-cyan-400/45 disabled:opacity-40 sm:w-auto sm:min-w-[160px]"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add Item
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
      <label className="mb-2 block text-xs font-medium text-slate-500" htmlFor={selectId}>
        {label}
      </label>
      <select
        id={selectId}
        className={builderSelectClass}
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
