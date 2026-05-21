import { Plus, Trash2 } from 'lucide-react'
import {
  BUSINESS_TYPE_OPTIONS,
  QUOTE_TYPES_BY_BUSINESS,
  type BusinessTypeId,
} from '../../lib/quoteos/sqba-config'
import type {
  BillingType,
  PackageTierId,
  QuoteFormState,
} from '../../lib/quoteos/types'
import { cn } from '../../lib/utils'
import { BuilderAccordion } from './BuilderAccordion'
import {
  builderInputClass,
  builderLabelClass,
  builderSelectClass,
  builderTextareaClass,
} from './builder-styles'
import { SmartPackageMode } from './SmartPackageMode'
import { StatusChips } from './StatusChips'

type QuoteAdvancedEditorProps = {
  quote: QuoteFormState
  onFieldChange: <K extends keyof QuoteFormState>(
    key: K,
    value: QuoteFormState[K],
  ) => void
  onBusinessTypeChange: (id: BusinessTypeId) => void
  onQuoteOptionChange: (optionId: string) => void
  onPackageTier: (tier: PackageTierId) => void
  onStatusChange: (status: QuoteFormState['quoteStatus']) => void
  onLineItemChange: (
    id: string,
    patch: Partial<import('../../lib/quoteos/types').LineItem>,
  ) => void
  onAddLineItem: () => void
  onRemoveLineItem: (id: string) => void
}

export function QuoteAdvancedEditor({
  quote,
  onFieldChange,
  onBusinessTypeChange,
  onQuoteOptionChange,
  onPackageTier,
  onStatusChange,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
}: QuoteAdvancedEditorProps) {
  const quoteOptions = QUOTE_TYPES_BY_BUSINESS[quote.businessTypeId] ?? []

  return (
    <BuilderAccordion
      title="Edit quote details"
      subtitle="Business type, line items, terms and notes"
    >
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-300">Status</p>
          <StatusChips value={quote.quoteStatus} onChange={onStatusChange} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={builderLabelClass} htmlFor="businessTypeId">
              Business type
            </label>
            <select
              id="businessTypeId"
              className={builderSelectClass}
              value={quote.businessTypeId}
              onChange={(e) =>
                onBusinessTypeChange(e.target.value as BusinessTypeId)
              }
            >
              {BUSINESS_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={builderLabelClass} htmlFor="sqbaQuoteOption">
              Quote type
            </label>
            <select
              id="sqbaQuoteOption"
              className={builderSelectClass}
              value={quote.sqbaQuoteOptionId}
              onChange={(e) => onQuoteOptionChange(e.target.value)}
            >
              {quoteOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="projectTitle">
            Project title
          </label>
          <input
            id="projectTitle"
            className={builderInputClass}
            value={quote.projectTitle}
            onChange={(e) => onFieldChange('projectTitle', e.target.value)}
          />
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="projectSummary">
            Project summary
          </label>
          <textarea
            id="projectSummary"
            rows={3}
            className={builderTextareaClass}
            value={quote.projectSummary}
            onChange={(e) => onFieldChange('projectSummary', e.target.value)}
          />
        </div>

        <SmartPackageMode
          selectedTier={quote.packageTier}
          onSelectTier={onPackageTier}
        />

        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-300">Line items</p>
            <button
              type="button"
              onClick={onAddLineItem}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-cyan-200"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add line
            </button>
          </div>
          <ul className="space-y-3">
            {quote.lineItems.map((item) => (
              <li key={item.id} className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-3">
                <div className="grid gap-3">
                  <input
                    className={builderInputClass}
                    value={item.label}
                    onChange={(e) =>
                      onLineItemChange(item.id, { label: e.target.value })
                    }
                    placeholder="Description"
                    aria-label="Line item description"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      className={builderInputClass}
                      value={item.amount || ''}
                      onChange={(e) =>
                        onLineItemChange(item.id, {
                          amount: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="Amount"
                      aria-label="Line item amount"
                    />
                    <div className="flex gap-2">
                      <select
                        className={cn(builderSelectClass, 'flex-1')}
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
                        className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-red-500/25 text-red-300"
                        aria-label="Remove line item"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={quote.depositEnabled}
              onChange={(e) =>
                onFieldChange('depositEnabled', e.target.checked)
              }
              className="h-5 w-5 rounded border-blue-500/40"
            />
            Include 50% deposit / balance split
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={builderLabelClass} htmlFor="quoteExpiryDate">
              Expiry date
            </label>
            <input
              id="quoteExpiryDate"
              type="date"
              className={builderInputClass}
              value={quote.quoteExpiryDate}
              onChange={(e) =>
                onFieldChange('quoteExpiryDate', e.target.value)
              }
            />
          </div>
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="paymentTerms">
            Payment terms
          </label>
          <textarea
            id="paymentTerms"
            rows={3}
            className={builderTextareaClass}
            value={quote.paymentTerms}
            onChange={(e) => onFieldChange('paymentTerms', e.target.value)}
          />
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="internalNotes">
            Internal notes
          </label>
          <textarea
            id="internalNotes"
            rows={2}
            className={builderTextareaClass}
            value={quote.internalNotes}
            onChange={(e) => onFieldChange('internalNotes', e.target.value)}
            placeholder="Not shown on client PDF"
          />
        </div>
      </div>
    </BuilderAccordion>
  )
}
