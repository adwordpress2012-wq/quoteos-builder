import { Plus, Trash2 } from 'lucide-react'
import { formatAud } from '../../lib/quoteos/calculations'
import type { QuoteFormState } from '../../lib/quoteos/types'
import { QUOTE_TYPE_OPTIONS } from '../../lib/quoteos/types'
import {
  builderInputClass,
  builderLabelClass,
  builderSelectClass,
  builderTextareaClass,
} from './builder-styles'
import { StatusChips } from './StatusChips'

type QuoteAdvancedEditorProps = {
  quote: QuoteFormState
  onFieldChange: <K extends keyof QuoteFormState>(
    key: K,
    value: QuoteFormState[K],
  ) => void
  onEnsureQuoteNumber: () => void
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
  onEnsureQuoteNumber,
  onStatusChange,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
}: QuoteAdvancedEditorProps) {
  return (
    <div id="quote-manual-form" className="glass-card rounded-xl p-4 sm:p-5">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Build your quote
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Enter customer and job details, then add line items with qty and unit price.
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-300">Customer details</p>
          <div className="grid gap-4">
            <div>
              <label className={builderLabelClass} htmlFor="clientBusinessName">
                Customer / business name
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
            <div>
              <label className={builderLabelClass} htmlFor="jobAddress">
                Job address
              </label>
              <input
                id="jobAddress"
                className={builderInputClass}
                value={quote.jobAddress}
                onChange={(e) => onFieldChange('jobAddress', e.target.value)}
                placeholder="12 Smith Street, Penrith NSW"
              />
            </div>
          </div>
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="quoteTypeId">
            Quote category
          </label>
          <select
            id="quoteTypeId"
            className={builderSelectClass}
            value={quote.quoteTypeId}
            onChange={(e) =>
              onFieldChange(
                'quoteTypeId',
                e.target.value as QuoteFormState['quoteTypeId'],
              )
            }
          >
            {QUOTE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="projectSummary">
            Job description
          </label>
          <textarea
            id="projectSummary"
            rows={4}
            className={builderTextareaClass}
            value={quote.projectSummary}
            onChange={(e) => onFieldChange('projectSummary', e.target.value)}
            placeholder="Describe the job, site conditions, exclusions or assumptions."
          />
        </div>

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
            {quote.lineItems.map((item) => {
              const lineTotal = (item.quantity || 0) * (item.amount || 0)
              return (
                <li
                  key={item.id}
                  className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-3"
                >
                  <div className="grid gap-3">
                    <input
                      className={builderInputClass}
                      value={item.label}
                      onChange={(e) =>
                        onLineItemChange(item.id, { label: e.target.value })
                      }
                      placeholder="Call-out, labour, materials..."
                      aria-label="Line item description"
                    />
                    <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
                      <div>
                        <label className="sr-only" htmlFor={`qty-${item.id}`}>
                          Quantity
                        </label>
                        <input
                          id={`qty-${item.id}`}
                          type="number"
                          min={0}
                          step={0.01}
                          className={builderInputClass}
                          value={item.quantity || ''}
                          onChange={(e) =>
                            onLineItemChange(item.id, {
                              quantity: parseFloat(e.target.value) || 0,
                            })
                          }
                          placeholder="Qty"
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor={`price-${item.id}`}>
                          Unit price
                        </label>
                        <input
                          id={`price-${item.id}`}
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
                          placeholder="Unit price"
                        />
                      </div>
                      <div className="flex flex-col justify-center rounded-xl border border-blue-500/15 bg-slate-950/40 px-3 py-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Total
                        </span>
                        <span className="text-sm font-semibold text-cyan-200">
                          {formatAud(lineTotal)}
                        </span>
                      </div>
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
                </li>
              )
            })}
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
            Include 50% deposit and balance split
          </label>
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="internalNotes">
            Notes
          </label>
          <textarea
            id="internalNotes"
            rows={3}
            className={builderTextareaClass}
            value={quote.internalNotes}
            onChange={(e) => onFieldChange('internalNotes', e.target.value)}
            placeholder="Shown as quote notes for the customer."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={builderLabelClass} htmlFor="quoteNumber">
              Quote number
            </label>
            <input
                id="quoteNumber"
                className={builderInputClass}
                value={quote.quoteNumber}
                onChange={(e) => onFieldChange('quoteNumber', e.target.value)}
                onBlur={onEnsureQuoteNumber}
                placeholder="QOS-2026-0001"
              />
          </div>
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
          <p className="mb-2 text-sm font-semibold text-slate-300">Status</p>
          <StatusChips value={quote.quoteStatus} onChange={onStatusChange} />
        </div>

        <div>
          <label className={builderLabelClass} htmlFor="paymentInstructions">
            Payment instructions
          </label>
          <textarea
            id="paymentInstructions"
            rows={3}
            className={builderTextareaClass}
            value={quote.paymentInstructions}
            onChange={(e) =>
              onFieldChange('paymentInstructions', e.target.value)
            }
            placeholder="Please use the quote number as the payment reference."
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-300">
            Manual payment details
          </p>
          <div className="grid gap-4">
            <div>
              <label className={builderLabelClass} htmlFor="paymentPayId">
                PayID
              </label>
              <input
                id="paymentPayId"
                className={builderInputClass}
                value={quote.paymentPayId}
                onChange={(e) => onFieldChange('paymentPayId', e.target.value)}
                placeholder="payments@example.com.au"
              />
            </div>
            <div>
              <label className={builderLabelClass} htmlFor="paymentAccountName">
                Account name
              </label>
              <input
                id="paymentAccountName"
                className={builderInputClass}
                value={quote.paymentAccountName}
                onChange={(e) =>
                  onFieldChange('paymentAccountName', e.target.value)
                }
                placeholder="Business account name"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={builderLabelClass} htmlFor="paymentBsb">
                  BSB
                </label>
                <input
                  id="paymentBsb"
                  className={builderInputClass}
                  value={quote.paymentBsb}
                  onChange={(e) => onFieldChange('paymentBsb', e.target.value)}
                  placeholder="000-000"
                />
              </div>
              <div>
                <label className={builderLabelClass} htmlFor="paymentAccountNumber">
                  Account number
                </label>
                <input
                  id="paymentAccountNumber"
                  className={builderInputClass}
                  value={quote.paymentAccountNumber}
                  onChange={(e) =>
                    onFieldChange('paymentAccountNumber', e.target.value)
                  }
                  placeholder="123456789"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
