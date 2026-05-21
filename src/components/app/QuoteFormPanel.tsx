import { Plus, Trash2 } from 'lucide-react'
import { getPresetOptionsForSidebar } from '../../lib/quoteos/pricing'
import {
  QUOTE_TYPE_OPTIONS,
  type BillingType,
  type QuoteFormState,
  type QuoteTypeId,
} from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'

type QuoteFormPanelProps = {
  quote: QuoteFormState
  onFieldChange: <K extends keyof QuoteFormState>(
    key: K,
    value: QuoteFormState[K],
  ) => void
  onQuoteTypeChange: (id: QuoteTypeId) => void
  onPresetApply: (id: QuoteTypeId) => void
  onLineItemChange: (
    id: string,
    patch: Partial<import('../../lib/quoteos/types').LineItem>,
  ) => void
  onAddLineItem: () => void
  onRemoveLineItem: (id: string) => void
}

const inputClass =
  'w-full rounded-lg border border-blue-500/25 bg-[rgba(10,15,30,0.75)] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30'

const labelClass = 'mb-1 block text-xs font-medium text-slate-400'

export function QuoteFormPanel({
  quote,
  onFieldChange,
  onQuoteTypeChange,
  onPresetApply,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
}: QuoteFormPanelProps) {
  const presets = getPresetOptionsForSidebar()

  return (
    <div className="glass-card flex flex-col gap-6 rounded-2xl p-4 sm:p-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-50">Quote details</h2>
        <p className="mt-1 text-xs text-slate-500">
          SQB — Smart Quote Builder · Micah-ready
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="clientBusinessName">
            Client business name
          </label>
          <input
            id="clientBusinessName"
            className={inputClass}
            value={quote.clientBusinessName}
            onChange={(e) => onFieldChange('clientBusinessName', e.target.value)}
            placeholder="Acme Plumbing Pty Ltd"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="contactName">
            Contact name
          </label>
          <input
            id="contactName"
            className={inputClass}
            value={quote.contactName}
            onChange={(e) => onFieldChange('contactName', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={quote.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            className={inputClass}
            value={quote.phone}
            onChange={(e) => onFieldChange('phone', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="businessType">
            Business type
          </label>
          <input
            id="businessType"
            className={inputClass}
            value={quote.businessType}
            onChange={(e) => onFieldChange('businessType', e.target.value)}
            placeholder="Plumber, Agency, etc."
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="projectTitle">
            Project title
          </label>
          <input
            id="projectTitle"
            className={inputClass}
            value={quote.projectTitle}
            onChange={(e) => onFieldChange('projectTitle', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="quoteType">
            Quote type
          </label>
          <select
            id="quoteType"
            className={cn(inputClass, 'cursor-pointer')}
            value={quote.quoteTypeId}
            onChange={(e) => onQuoteTypeChange(e.target.value as QuoteTypeId)}
          >
            {QUOTE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="projectSummary">
            Project summary
          </label>
          <textarea
            id="projectSummary"
            rows={3}
            className={cn(inputClass, 'resize-y')}
            value={quote.projectSummary}
            onChange={(e) => onFieldChange('projectSummary', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="internalNotes">
            Internal notes
          </label>
          <textarea
            id="internalNotes"
            rows={2}
            className={cn(inputClass, 'resize-y')}
            value={quote.internalNotes}
            onChange={(e) => onFieldChange('internalNotes', e.target.value)}
            placeholder="Not shown on client PDF"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="quoteExpiryDate">
            Quote expiry date
          </label>
          <input
            id="quoteExpiryDate"
            type="date"
            className={inputClass}
            value={quote.quoteExpiryDate}
            onChange={(e) => onFieldChange('quoteExpiryDate', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="paymentTerms">
            Payment terms
          </label>
          <input
            id="paymentTerms"
            className={inputClass}
            value={quote.paymentTerms}
            onChange={(e) => onFieldChange('paymentTerms', e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className={labelClass}>Package presets</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onPresetApply(preset.id)}
              className="rounded-lg border border-blue-500/25 bg-blue-500/10 px-2.5 py-1.5 text-[11px] text-sky-200 transition-all hover:border-purple-400/40 hover:bg-purple-500/15 hover:text-cyan-100"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-200">Line items</h3>
          <button
            type="button"
            onClick={onAddLineItem}
            className="inline-flex items-center gap-1 rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-2.5 py-1.5 text-xs font-medium text-cyan-200 transition-all hover:border-blue-400/50 hover:shadow-[var(--qos-glow-blue)]"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            Add line
          </button>
        </div>
        <ul className="space-y-3">
          {quote.lineItems.map((item) => (
            <li
              key={item.id}
              className="glass-card-inner rounded-xl p-3"
            >
              <div className="grid gap-2 sm:grid-cols-12">
                <div className="sm:col-span-5">
                  <input
                    className={inputClass}
                    value={item.label}
                    onChange={(e) =>
                      onLineItemChange(item.id, { label: e.target.value })
                    }
                    placeholder="Description"
                    aria-label="Line item description"
                  />
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    className={inputClass}
                    value={item.amount || ''}
                    onChange={(e) =>
                      onLineItemChange(item.id, {
                        amount: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                    aria-label="Line item amount"
                  />
                </div>
                <div className="flex gap-2 sm:col-span-4">
                  <select
                    className={cn(inputClass, 'flex-1')}
                    value={item.billingType}
                    onChange={(e) =>
                      onLineItemChange(item.id, {
                        billingType: e.target.value as BillingType,
                      })
                    }
                    aria-label="Billing type"
                  >
                    <option value="one-off">One-off</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => onRemoveLineItem(item.id)}
                    className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg border border-red-500/25 text-red-300/80 transition-colors hover:bg-red-500/10 hover:text-red-200"
                    aria-label="Remove line item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-slate-400">
          <input
            type="checkbox"
            checked={quote.depositEnabled}
            onChange={(e) => onFieldChange('depositEnabled', e.target.checked)}
            className="rounded border-blue-500/40 bg-transparent text-blue-500 focus:ring-cyan-400/40"
          />
          Include 50% deposit / balance split
        </label>
      </div>
    </div>
  )
}
