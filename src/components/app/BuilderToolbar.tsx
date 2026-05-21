import {
  Copy,
  FileText,
  Printer,
  RotateCcw,
} from 'lucide-react'
import { generateQuoteSummary } from '../../lib/quoteos/email'
import type { QuoteFormState, QuoteTotals } from '../../lib/quoteos/types'

type BuilderToolbarProps = {
  quote: QuoteFormState
  totals: QuoteTotals
  emailDraft: string
  onReset: () => void
}

async function copyText(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    window.alert(`${label} copied to clipboard.`)
  } catch {
    window.prompt(`Copy ${label}:`, text)
  }
}

export function BuilderToolbar({
  quote,
  totals,
  emailDraft,
  onReset,
}: BuilderToolbarProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleReset = () => {
    if (
      window.confirm(
        'Reset this quote? All fields and line items will be cleared.',
      )
    ) {
      onReset()
    }
  }

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <ToolbarButton
        icon={Copy}
        label="Copy Email Draft"
        onClick={() => copyText(emailDraft, 'Email draft')}
      />
      <ToolbarButton
        icon={Copy}
        label="Copy Summary"
        onClick={() =>
          copyText(generateQuoteSummary(quote, totals), 'Summary')
        }
      />
      <ToolbarButton
        icon={Printer}
        label="Print / Save PDF"
        onClick={handlePrint}
        primary
      />
      <ToolbarButton
        icon={RotateCcw}
        label="Reset Quote"
        onClick={handleReset}
        variant="danger"
      />
      <span className="hidden w-full text-[10px] text-slate-500 sm:inline sm:w-auto sm:ml-auto sm:self-center">
        <FileText className="mr-1 inline h-3 w-3" aria-hidden="true" />
        Print opens browser PDF save
      </span>
    </div>
  )
}

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  primary,
  variant,
}: {
  icon: typeof Copy
  label: string
  onClick: () => void
  primary?: boolean
  variant?: 'danger'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        variant === 'danger'
          ? 'inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 transition-all hover:bg-red-500/20 sm:text-sm'
          : primary
            ? 'inline-flex items-center gap-1.5 rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600/30 to-purple-600/25 px-3 py-2 text-xs font-medium text-white shadow-[var(--qos-glow-blue)] transition-all hover:-translate-y-0.5 sm:text-sm'
            : 'inline-flex items-center gap-1.5 rounded-xl border border-[var(--qos-border)] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-200 transition-all hover:border-blue-400/40 hover:shadow-[var(--qos-glow-blue)] sm:text-sm'
      }
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </button>
  )
}
