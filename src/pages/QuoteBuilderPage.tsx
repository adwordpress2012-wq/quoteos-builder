import { formatAud } from '../lib/quoteos/calculations'
import { AppShell } from '../components/app/AppShell'
import { BuilderToolbar } from '../components/app/BuilderToolbar'
import { EmailDraftPanel } from '../components/app/EmailDraftPanel'
import { MicahPanel } from '../components/app/MicahPanel'
import { ProposalPreview } from '../components/app/ProposalPreview'
import { QuoteFormPanel } from '../components/app/QuoteFormPanel'
import { useQuoteState } from '../hooks/useQuoteState'

export function QuoteBuilderPage() {
  const {
    quote,
    totals,
    emailDraft,
    micahDraft,
    setMicahDraft,
    setEmailDraft,
    updateField,
    applyQuoteType,
    applyPreset,
    updateLineItem,
    addLineItem,
    removeLineItem,
    resetQuote,
  } = useQuoteState()

  return (
    <AppShell>
      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
              Official SQB
            </p>
            <h1 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              QuoteOS SQB Builder
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Live preview · Micah · Email · PDF-ready proposal
            </p>
          </div>
          <BuilderToolbar
            quote={quote}
            totals={totals}
            emailDraft={emailDraft}
            onReset={resetQuote}
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-3 text-center text-xs sm:grid-cols-4 sm:text-sm">
          <Stat label="Subtotal" value={formatAud(totals.subtotal)} />
          <Stat label="One-off" value={formatAud(totals.oneOffTotal)} />
          <Stat
            label="Monthly"
            value={
              totals.monthlyRecurringTotal > 0
                ? `${formatAud(totals.monthlyRecurringTotal)}/mo`
                : '—'
            }
          />
          <Stat
            label="Yearly"
            value={
              totals.yearlyRecurringTotal > 0
                ? `${formatAud(totals.yearlyRecurringTotal)}/yr`
                : '—'
            }
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-5">
            <QuoteFormPanel
              quote={quote}
              onFieldChange={updateField}
              onQuoteTypeChange={applyQuoteType}
              onPresetApply={applyPreset}
              onLineItemChange={updateLineItem}
              onAddLineItem={addLineItem}
              onRemoveLineItem={removeLineItem}
            />
            <MicahPanel
              draft={micahDraft}
              onDraftChange={setMicahDraft}
              contactName={quote.contactName}
              projectTitle={quote.projectTitle}
              businessName={quote.clientBusinessName}
              projectSummary={quote.projectSummary}
            />
            <EmailDraftPanel
              emailDraft={emailDraft}
              onEmailDraftChange={setEmailDraft}
            />
          </div>

          <div className="space-y-4 xl:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 print:hidden">
              Live quote / proposal preview
            </p>
            <ProposalPreview
              id="proposal-print-section"
              quote={quote}
              totals={totals}
            />
          </div>
        </div>
      </main>
    </AppShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-500">{label}</p>
      <p className="font-semibold text-cyan-300">{value}</p>
    </div>
  )
}
