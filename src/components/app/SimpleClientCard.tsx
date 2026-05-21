import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { cn } from '../../lib/utils'
import type { QuoteFormState } from '../../lib/quoteos/types'
import {
  builderInputClass,
  builderLabelClass,
} from './builder-styles'

type SimpleClientCardProps = {
  quote: QuoteFormState
  onFieldChange: <K extends keyof QuoteFormState>(
    key: K,
    value: QuoteFormState[K],
  ) => void
}

export function SimpleClientCard({ quote, onFieldChange }: SimpleClientCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const panelId = useId()

  const contactLine = [quote.contactName, quote.phone, quote.email]
    .filter(Boolean)
    .join(' · ')

  return (
    <section className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Client
          </p>
          <p className="mt-1 truncate text-base font-semibold text-slate-100">
            {quote.clientBusinessName.trim() || 'Business name'}
          </p>
          {contactLine ? (
            <p className="mt-1 text-sm text-slate-400">{contactLine}</p>
          ) : (
            <p className="mt-1 text-sm text-slate-500">Add contact details</p>
          )}
        </div>
        <button
          type="button"
          className="shrink-0 rounded-xl border border-blue-500/25 px-3 py-2 text-sm font-medium text-cyan-200"
          aria-expanded={editOpen}
          aria-controls={panelId}
          onClick={() => setEditOpen((v) => !v)}
        >
          Edit details
        </button>
      </div>

      <div
        id={panelId}
        hidden={!editOpen}
        className={cn(
          'mt-4 grid gap-4 border-t border-blue-500/15 pt-4',
          !editOpen && 'hidden',
        )}
      >
        <div>
          <label className={builderLabelClass} htmlFor="clientBusinessName">
            Business name
          </label>
          <input
            id="clientBusinessName"
            className={builderInputClass}
            value={quote.clientBusinessName}
            onChange={(e) =>
              onFieldChange('clientBusinessName', e.target.value)
            }
            placeholder="Luke Plumbing Pty Ltd"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={builderLabelClass} htmlFor="contactName">
              Contact name
            </label>
            <input
              id="contactName"
              className={builderInputClass}
              value={quote.contactName}
              onChange={(e) => onFieldChange('contactName', e.target.value)}
            />
          </div>
          <div>
            <label className={builderLabelClass} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              className={builderInputClass}
              value={quote.phone}
              onChange={(e) => onFieldChange('phone', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={builderLabelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={builderInputClass}
            value={quote.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
          />
        </div>
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm text-slate-500"
          onClick={() => setEditOpen(false)}
        >
          <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
          Done
        </button>
      </div>
    </section>
  )
}
