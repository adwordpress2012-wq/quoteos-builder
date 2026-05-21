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
import { EmailDraftPanel } from './EmailDraftPanel'
import { InvoicePreviewPlaceholder } from './InvoicePreviewPlaceholder'
import { ProposalPreview } from './ProposalPreview'
import { QuoteMemoryCard } from './QuoteMemoryCard'
import { SmartPackageMode } from './SmartPackageMode'
import { StatusChips } from './StatusChips'
import type { QuoteTotals } from '../../lib/quoteos/types'

type QuoteWorkspaceProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  emailDraft: string
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
  onEmailDraftChange: (text: string) => void
  onReset: () => void
}

export function QuoteWorkspace({
  quote,
  totals,
  emailDraft,
  onFieldChange,
  onBusinessTypeChange,
  onQuoteOptionChange,
  onPackageTier,
  onStatusChange,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
  onEmailDraftChange,
  onReset,
}: QuoteWorkspaceProps) {
  const quoteOptions = QUOTE_TYPES_BY_BUSINESS[quote.businessTypeId] ?? []
  const expanded = quote.quoteGenerated

  return (
    <div className="space-y-4">
      <QuoteMemoryCard quote={quote} totals={totals} />

      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <p className="text-sm font-semibold text-slate-300">Quote status</p>
        <div className="mt-3">
          <StatusChips value={quote.quoteStatus} onChange={onStatusChange} />
        </div>
      </div>

      <BuilderAccordion
        title="Client Details"
        subtitle="Who is this quote for?"
        defaultOpen
      >
        <div className="grid gap-4">
          <div>
            <label className={builderLabelClass} htmlFor="clientBusinessName">
              Client business name
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
        </div>
      </BuilderAccordion>

      <BuilderAccordion
        title="Package / Job Details"
        subtitle="Business type and quote template"
        defaultOpen={expanded}
        badge={expanded ? 'Ready' : undefined}
      >
        <div className="grid gap-4">
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
              rows={4}
              className={builderTextareaClass}
              value={quote.projectSummary}
              onChange={(e) => onFieldChange('projectSummary', e.target.value)}
            />
          </div>
          <SmartPackageMode
            selectedTier={quote.packageTier}
            onSelectTier={onPackageTier}
            disabled={!expanded}
          />
        </div>
      </BuilderAccordion>

      <BuilderAccordion
        title="Pricing & Line Items"
        subtitle="Edit amounts — Micah packaged tiers above"
        defaultOpen={expanded}
      >
        <div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-slate-300">Line items</p>
            <button
              type="button"
              onClick={onAddLineItem}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-4 py-2 text-sm font-medium text-cyan-200"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add line
            </button>
          </div>
          <ul className="space-y-3">
            {quote.lineItems.map((item) => (
              <li key={item.id} className="glass-card-inner rounded-xl p-4">
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
                        className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-red-500/25 text-red-300 transition-colors hover:bg-red-500/10"
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
          <label className="mt-4 flex min-h-[44px] cursor-pointer items-center gap-3 text-base text-slate-300">
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
      </BuilderAccordion>

      <BuilderAccordion
        title="Terms & Payment"
        defaultOpen={expanded}
      >
        <div className="grid gap-4">
          <div>
            <label className={builderLabelClass} htmlFor="quoteExpiryDate">
              Quote expiry date
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

      <BuilderAccordion
        title="Email Draft"
        subtitle="Composer with Micah rewrite tools"
        defaultOpen={expanded}
      >
        <EmailDraftPanel
          emailDraft={emailDraft}
          quote={quote}
          onEmailDraftChange={onEmailDraftChange}
        />
      </BuilderAccordion>

      <BuilderAccordion
        title="PDF Preview"
        subtitle="Print or save proposal PDF"
        defaultOpen={expanded}
      >
        <InvoicePreviewPlaceholder
          quote={quote}
          totals={totals}
          emailDraft={emailDraft}
          onReset={onReset}
        />
        <div className="mt-4 xl:hidden">
          <ProposalPreview quote={quote} totals={totals} />
        </div>
      </BuilderAccordion>
    </div>
  )
}
