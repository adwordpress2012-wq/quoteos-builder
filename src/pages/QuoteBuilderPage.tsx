import { useCallback, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import {
  getDefaultQuoteOptionId,
  type BusinessTypeId,
} from '../lib/quoteos/sqba-config'
import type { SqbaSetupConfig } from '../lib/quoteos/setup-wizard'
import { AppShell } from '../components/app/AppShell'
import { AppSidebar } from '../components/app/AppSidebar'
import { BuilderOverlay } from '../components/app/BuilderOverlay'
import { BuilderReminderCards } from '../components/app/BuilderReminderCards'
import { CompactEmailCard } from '../components/app/CompactEmailCard'
import { CompactProposalCard } from '../components/app/CompactProposalCard'
import { EmailDraftPanel } from '../components/app/EmailDraftPanel'
import { GeneratedQuoteCard } from '../components/app/GeneratedQuoteCard'
import { ManualHybridSection } from '../components/app/ManualHybridSection'
import { MicahChatPanel } from '../components/app/MicahChatPanel'
import { MobileBottomBar } from '../components/app/MobileBottomBar'
import { ProposalPreview } from '../components/app/ProposalPreview'
import { QuoteAdvancedEditor } from '../components/app/QuoteAdvancedEditor'
import { QuotePromptCard } from '../components/app/QuotePromptCard'
import { QuoteSetupWizard } from '../components/app/QuoteSetupWizard'
import { SetupSummaryCard } from '../components/app/SetupSummaryCard'
import { SimpleClientCard } from '../components/app/SimpleClientCard'
import { FloatingMicah } from '../components/micah/FloatingMicah'
import { MicahBodyMascot } from '../components/micah/MicahBodyMascot'
import { MicahChatDrawer } from '../components/micah/MicahChatDrawer'
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
    applySqbaSelection,
    generateSmartQuote,
    applyPackageTier,
    applySetupWizard,
    applyPreset,
    setQuoteStatus,
    updateLineItem,
    addLineItem,
    removeLineItem,
    setEmailDraft,
    resetQuote,
  } = useQuoteState(setup.completed ? setup : null)

  const [micahDrawerOpen, setMicahDrawerOpen] = useState(false)
  const [proposalOpen, setProposalOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [micahResponseReady, setMicahResponseReady] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const advancedRef = useRef<HTMLDivElement>(null)

  const handleGenerate = useCallback(() => {
    setGenerating(true)
    generateSmartQuote()
    setMicahResponseReady(true)
    window.setTimeout(() => setGenerating(false), 400)
  }, [generateSmartQuote])

  const handleBusinessTypeChange = (id: BusinessTypeId) => {
    const optionId = getDefaultQuoteOptionId(id)
    applySqbaSelection(id, optionId)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleWizardComplete = useCallback(
    (config: SqbaSetupConfig) => {
      completeSetup(config)
      applySetupWizard(config)
    },
    [completeSetup, applySetupWizard],
  )

  const scrollToAdvanced = () => {
    setAdvancedOpen(true)
    window.setTimeout(() => {
      advancedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleCopyLink = async () => {
    const summary = `${quote.projectTitle || 'Quote'} — ${window.location.href}`
    try {
      await navigator.clipboard.writeText(summary)
      window.alert('Quote link copied to clipboard.')
    } catch {
      window.prompt('Copy link:', summary)
    }
  }

  return (
    <AppShell>
      <div className="flex min-h-[calc(100svh-3.5rem)] sm:min-h-[calc(100svh-4rem)]">
        <AppSidebar onNewQuote={resetQuote} />

        <div className="flex min-w-0 flex-1 flex-col">
          <main className="builder-main mx-auto w-full max-w-[1200px] flex-1 overflow-x-clip px-4 py-4 pb-28 sm:px-6 sm:py-5 xl:max-w-none xl:pb-12 xl:pr-4">
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
                  Your SQBA setup is ready. You can now generate quotes faster.
                </p>
              </div>
            )}

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(260px,288px)] xl:items-start xl:gap-5">
              <div className="min-w-0 space-y-3">
                {!setup.completed ? (
                  <SetupSummaryCard
                    setup={setup}
                    onEditSetup={openWizard}
                    onResetSetup={resetSetup}
                  />
                ) : null}

                <QuotePromptCard
                  prompt={quote.micahPrompt}
                  onPromptChange={(v) => updateField('micahPrompt', v)}
                  onGenerate={handleGenerate}
                  isGenerating={generating}
                />

                <ManualHybridSection onSelectPreset={applyPreset} />

                <GeneratedQuoteCard
                  quote={quote}
                  totals={totals}
                  setup={setup.completed ? setup : null}
                  onReview={() => setProposalOpen(true)}
                  onEditItems={scrollToAdvanced}
                  onCopyLink={handleCopyLink}
                  onSendQuote={() => setEmailOpen(true)}
                  onStatusChange={setQuoteStatus}
                />

                {quote.quoteGenerated ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <SimpleClientCard quote={quote} onFieldChange={updateField} />
                      <CompactProposalCard
                        ready={quote.quoteGenerated}
                        onView={() => setProposalOpen(true)}
                      />
                    </div>
                    <CompactEmailCard
                      quote={quote}
                      emailDraft={emailDraft}
                      ready={quote.quoteGenerated}
                      onOpenComposer={() => setEmailOpen(true)}
                    />
                    <div ref={advancedRef}>
                      <QuoteAdvancedEditor
                        key={advancedOpen ? 'advanced-open' : 'advanced-closed'}
                        quote={quote}
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
                        defaultOpen={advancedOpen}
                      />
                    </div>
                    {setup.completed ? (
                      <button
                        type="button"
                        onClick={openWizard}
                        className="min-h-[44px] w-full text-sm text-slate-500 underline-offset-2 hover:text-cyan-300 hover:underline"
                      >
                        Edit SQBA setup
                      </button>
                    ) : null}
                  </>
                ) : null}
              </div>

              <div className="hidden min-w-0 xl:flex xl:flex-col xl:gap-3 xl:sticky xl:top-20 xl:self-start xl:pb-36">
                <MicahChatPanel
                  quote={quote}
                  emailDraft={emailDraft}
                  setup={setup.completed ? setup : null}
                  onEmailDraftChange={setEmailDraft}
                  showGenerateResponse={micahResponseReady}
                />
                <BuilderReminderCards
                  onSendFollowUp={() => setEmailOpen(true)}
                  onViewQuote={() => setProposalOpen(true)}
                />
                <div
                  className="flex justify-end pt-1"
                  aria-hidden="true"
                >
                  <div
                    className="micah-body-bob opacity-90"
                    style={{ filter: 'drop-shadow(0 0 18px rgba(59,130,246,0.4))' }}
                  >
                    <MicahBodyMascot isThinking={generating} size="md" />
                  </div>
                </div>
              </div>
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
            Print / Save PDF
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
        onReview={() =>
          quote.quoteGenerated ? setProposalOpen(true) : handleGenerate()
        }
        onOpenMicah={() => setMicahDrawerOpen(true)}
      />

      <FloatingMicah
        quote={quote}
        setup={setup.completed ? setup : null}
        isThinking={generating}
        welcomeFollowUpCount={3}
        operatorName="Luke"
        onClick={() => setMicahDrawerOpen(true)}
      />

      <MicahChatDrawer
        open={micahDrawerOpen}
        onClose={() => setMicahDrawerOpen(false)}
        quote={quote}
        emailDraft={emailDraft}
        setup={setup.completed ? setup : null}
        isThinking={generating}
        onEmailDraftChange={setEmailDraft}
      />
    </AppShell>
  )
}
