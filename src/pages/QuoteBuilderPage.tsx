import { useCallback, useState } from 'react'
import { formatAud } from '../lib/quoteos/calculations'
import {
  getDefaultQuoteOptionId,
  type BusinessTypeId,
} from '../lib/quoteos/sqba-config'
import { AppShell } from '../components/app/AppShell'
import { MicahAssistantPanel } from '../components/app/MicahAssistantPanel'
import { MobileBottomBar } from '../components/app/MobileBottomBar'
import { ProposalPreview } from '../components/app/ProposalPreview'
import { QuickQuoteStart } from '../components/app/QuickQuoteStart'
import { QuoteWorkspace } from '../components/app/QuoteWorkspace'
import { useQuoteState } from '../hooks/useQuoteState'
import { cn } from '../lib/utils'

export function QuoteBuilderPage() {
  const {
    quote,
    totals,
    emailDraft,
    updateField,
    applySqbaSelection,
    generateSmartQuote,
    applyPackageTier,
    setQuoteStatus,
    updateLineItem,
    addLineItem,
    removeLineItem,
    setEmailDraft,
    resetQuote,
  } = useQuoteState()

  const [micahDrawerOpen, setMicahDrawerOpen] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleGenerate = useCallback(() => {
    setGenerating(true)
    generateSmartQuote()
    window.setTimeout(() => setGenerating(false), 400)
  }, [generateSmartQuote])

  const handleBusinessTypeChange = (id: BusinessTypeId) => {
    const optionId = getDefaultQuoteOptionId(id)
    applySqbaSelection(id, optionId)
  }

  const scrollToPreview = () => {
    document
      .getElementById('live-preview')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AppShell>
      <main className="builder-main mx-auto max-w-[1600px] px-4 py-6 pb-28 sm:px-6 sm:py-8 xl:pb-8">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            QuoteOS · SQBA
          </p>
          <h1 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
            Smart Quote Builder
          </h1>
          <p className="mt-1 text-base text-slate-500">
            Micah helps you quote faster on mobile — local MVP, no API yet.
          </p>
        </header>

        <div className="mb-5 grid grid-cols-2 gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-4 text-center sm:grid-cols-4">
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

        <div className="grid gap-6 xl:grid-cols-12 xl:items-start">
          <div className="space-y-5 xl:col-span-5">
            <QuickQuoteStart
              prompt={quote.micahPrompt}
              onPromptChange={(v) => updateField('micahPrompt', v)}
              onGenerate={handleGenerate}
              isGenerating={generating}
            />
            <QuoteWorkspace
              quote={quote}
              totals={totals}
              emailDraft={emailDraft}
              onFieldChange={updateField}
              onBusinessTypeChange={handleBusinessTypeChange}
              onQuoteOptionChange={(optionId) =>
                applySqbaSelection(quote.businessTypeId, optionId)
              }
              onPackageTier={applyPackageTier}
              onStatusChange={setQuoteStatus}
              onLineItemChange={updateLineItem}
              onAddLineItem={addLineItem}
              onRemoveLineItem={removeLineItem}
              onEmailDraftChange={setEmailDraft}
              onReset={resetQuote}
            />
          </div>

          <div
            id="live-preview"
            className="space-y-4 xl:col-span-4 xl:sticky xl:top-20"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 print:hidden">
              Live preview
            </p>
            <ProposalPreview
              id="proposal-print-section"
              quote={quote}
              totals={totals}
            />
          </div>

          <div className="hidden xl:col-span-3 xl:block xl:sticky xl:top-20">
            <MicahAssistantPanel
              quote={quote}
              totals={totals}
              emailDraft={emailDraft}
              onEmailDraftChange={setEmailDraft}
            />
          </div>
        </div>
      </main>

      <MobileBottomBar
        onGenerate={handleGenerate}
        onPreview={scrollToPreview}
        onOpenMicah={() => setMicahDrawerOpen(true)}
      />

      <div
        className={cn(
          'fixed inset-0 z-50 xl:hidden print:hidden',
          micahDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!micahDrawerOpen}
      >
        <button
          type="button"
          className={cn(
            'absolute inset-0 bg-black/60 transition-opacity',
            micahDrawerOpen ? 'opacity-100' : 'opacity-0',
          )}
          aria-label="Close Micah"
          onClick={() => setMicahDrawerOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-blue-500/30 bg-[var(--qos-bg)] p-4 shadow-2xl transition-transform duration-300',
            micahDrawerOpen ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-600" />
          <MicahAssistantPanel
            quote={quote}
            totals={totals}
            emailDraft={emailDraft}
            onEmailDraftChange={setEmailDraft}
          />
        </div>
      </div>
    </AppShell>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-base font-semibold text-cyan-300 sm:text-lg">{value}</p>
    </div>
  )
}
