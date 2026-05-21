import { FileText } from 'lucide-react'
import { BuilderToolbar } from './BuilderToolbar'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'

type InvoicePreviewPlaceholderProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  emailDraft: string
  onReset: () => void
}

export function InvoicePreviewPlaceholder({
  quote,
  totals,
  emailDraft,
  onReset,
}: InvoicePreviewPlaceholderProps) {
  return (
    <div className="space-y-4">
      <BuilderToolbar
        quote={quote}
        totals={totals}
        emailDraft={emailDraft}
        onReset={onReset}
      />

      <div className="glass-card-inner rounded-xl border border-dashed border-purple-500/30 p-5">
        <div className="flex items-start gap-3">
          <FileText className="h-6 w-6 shrink-0 text-purple-300" aria-hidden="true" />
          <div>
            <p className="text-base font-semibold text-slate-200">
              Invoice Preview
            </p>
            <p className="mt-1 text-sm text-slate-500">Coming soon</p>
            <p className="mt-2 text-sm text-slate-400">
              Generate PDF Invoice from accepted quote
            </p>
            <p className="mt-3 font-mono text-sm text-cyan-300">INV-0001</p>
            <p className="mt-2 text-xs text-slate-500">
              Accounting sync and numbering — not wired in this MVP.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
