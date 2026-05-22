import { useCallback, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { SqbaSetupConfig } from '../lib/quoteos/setup-wizard'
import { generateEmailSubject } from '../lib/quoteos/email'
import { AppShell } from '../components/app/AppShell'
import { CommandCentreSidebar } from '../components/command/CommandCentreSidebar'
import { BuilderOverlay } from '../components/app/BuilderOverlay'
import { CompactEmailCard } from '../components/app/CompactEmailCard'
import { EmailDraftPanel } from '../components/app/EmailDraftPanel'
import { GeneratedQuoteCard } from '../components/app/GeneratedQuoteCard'
import { LiveProposalPanel } from '../components/app/LiveProposalPanel'
import { MobileBottomBar } from '../components/app/MobileBottomBar'
import { MobileProposalSection } from '../components/app/MobileProposalSection'
import { ProposalPreview } from '../components/app/ProposalPreview'
import { QuoteAdvancedEditor } from '../components/app/QuoteAdvancedEditor'
import { QuotePromptCard } from '../components/app/QuotePromptCard'
import { QuoteSetupWizard } from '../components/app/QuoteSetupWizard'
import { SetupSummaryCard } from '../components/app/SetupSummaryCard'
import { useQuoteState } from '../hooks/useQuoteState'
import { useSetupWizard } from '../hooks/useSetupWizard'

export function QuoteBuilderPage() {
  const {
    setup,
    wizardOpen,
    setupSuccess,
    completeSetup,
    resetSetup,
    openWizard,
    closeWizard,
  } = useSetupWizard()

  const {
    quote,
    totals,
    emailDraft,
    updateField,
    ensureQuoteNumber,
    generateSmartQuote,
    applySetupWizard,
    setQuoteStatus,
    updateLineItem,
    addLineItem,
    removeLineItem,
    setEmailDraft,
    resetQuote,
  } = useQuoteState(setup.completed ? setup : null)

  const [proposalOpen, setProposalOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [generating, setGenerating] = useState(false)

  const handleGenerate = useCallback(() => {
    setGenerating(true)
    generateSmartQuote()
    window.setTimeout(() => setGenerating(false), 400)
    document.getElementById('quote-suggestion-prompt')?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [generateSmartQuote])

  const handlePrint = () => {
    const quoteNumber = ensureQuoteNumber()
    const originalTitle = document.title
    document.title = quoteNumber ? `QuoteOS-${quoteNumber}` : 'QuoteOS-quote'
    const restoreTitle = () => {
      document.title = originalTitle
      window.removeEventListener('afterprint', restoreTitle)
    }
    window.addEventListener('afterprint', restoreTitle)
    window.setTimeout(() => {
      window.print()
      window.setTimeout(restoreTitle, 1000)
    }, 0)
  }

  const handleSendQuote = () => {
    ensureQuoteNumber()
    setEmailOpen(true)
  }

  const handleWizardComplete = useCallback(
    (config: SqbaSetupConfig) => {
      completeSetup(config)
      applySetupWizard(config)
    },
    [completeSetup, applySetupWizard],
  )

  const scrollToManualForm = () => {
    document.getElementById('quote-manual-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleCopyEmail = async () => {
    const quoteNumber = ensureQuoteNumber()
    const subject = generateEmailSubject({ ...quote, quoteNumber })
    const text = `Subject: ${subject}\n\n${emailDraft}`
    try {
      await navigator.clipboard.writeText(text)
      window.alert('Email copied — review before sending.')
    } catch {
      window.prompt('Copy email:', text)
    }
  }

  const emailReady =
    totals.subtotal > 0 ||
    quote.clientBusinessName.trim().length > 0 ||
    quote.projectSummary.trim().length > 0

  return (
    <AppShell>
      <div className="flex min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)]">
        <CommandCentreSidebar onNewQuote={resetQuote} className="hidden lg:flex" />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="builder-main mx-auto w-full flex-1 overflow-x-clip px-4 py-4 pb-28 sm:px-6 sm:py-5 xl:max-w-none xl:pb-12 xl:pr-6">
            {setupSuccess && (
              <div
                className="mb-4 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3"
                role="status"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                  aria-hidden="true"
                />
                <p className="text-sm text-emerald-100">
                  Your SQBA setup is ready. Build quotes manually below.
                </p>
              </div>
            )}

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] xl:items-start xl:gap-6">
              <div className="min-w-0 space-y-3">
                {!setup.completed ? (
                  <SetupSummaryCard
                    setup={setup}
                    onEditSetup={openWizard}
                    onResetSetup={resetSetup}
                  />
                ) : null}

                <QuoteAdvancedEditor
                  quote={quote}
                  onFieldChange={updateField}
                  onEnsureQuoteNumber={ensureQuoteNumber}
                  onStatusChange={setQuoteStatus}
                  onLineItemChange={updateLineItem}
                  onAddLineItem={addLineItem}
                  onRemoveLineItem={removeLineItem}
                />

                <GeneratedQuoteCard
                  quote={quote}
                  totals={totals}
                  setup={setup.completed ? setup : null}
                  onEditItems={scrollToManualForm}
                  onExportPdf={handlePrint}
                  onCopyEmail={handleCopyEmail}
                  onSendQuote={handleSendQuote}
                  onStatusChange={setQuoteStatus}
                />

                <QuotePromptCard
                  prompt={quote.micahPrompt}
                  onPromptChange={(v) => updateField('micahPrompt', v)}
                  onGenerate={handleGenerate}
                  isGenerating={generating}
                />

                <MobileProposalSection
                  quote={quote}
                  totals={totals}
                  onPrint={handlePrint}
                />

                <CompactEmailCard
                  quote={quote}
                  emailDraft={emailDraft}
                  ready={emailReady}
                  onOpenComposer={() => setEmailOpen(true)}
                />

                {setup.completed ? (
                  <button
                    type="button"
                    onClick={openWizard}
                    className="min-h-[44px] w-full text-sm text-slate-500 underline-offset-2 hover:text-cyan-300 hover:underline"
                  >
                    Edit SQBA setup
                  </button>
                ) : null}
              </div>

              <LiveProposalPanel
                className="hidden xl:flex xl:sticky xl:top-20 xl:max-h-[calc(100svh-6rem)] xl:overflow-y-auto xl:pb-28"
                quote={quote}
                totals={totals}
                onPrint={handlePrint}
              />
            </div>
          </main>
        </div>
      </div>

      <div className="hidden print:block">
        <ProposalPreview
          id="proposal-print-section"
          quote={quote}
          totals={totals}
        />
      </div>

      <BuilderOverlay
        open={proposalOpen}
        onClose={() => setProposalOpen(false)}
        title="Proposal preview"
        className="max-w-3xl"
      >
        <ProposalPreview quote={quote} totals={totals} />
        <div className="mt-4 flex gap-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[44px] rounded-xl border border-blue-500/30 px-4 text-sm font-medium text-cyan-200"
          >
            Export PDF
          </button>
        </div>
      </BuilderOverlay>

      <BuilderOverlay
        open={emailOpen}
        onClose={() => setEmailOpen(false)}
        title="Email composer"
      >
        <EmailDraftPanel
          emailDraft={emailDraft}
          quote={quote}
          onEmailDraftChange={setEmailDraft}
          onExportPdf={handlePrint}
        />
      </BuilderOverlay>

      {wizardOpen && (
        <QuoteSetupWizard
          key={setup.completed ? 'edit' : 'new'}
          open
          initialConfig={setup}
          onClose={closeWizard}
          onComplete={handleWizardComplete}
        />
      )}

      <MobileBottomBar
        onGenerate={handleGenerate}
        onReview={() => setProposalOpen(true)}
      />
    </AppShell>
  )
}
