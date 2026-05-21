import { useCallback, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { generateQuickQuoteFromPrompt } from '../lib/quoteos/micah'
import {
  getDefaultQuoteOptionId,
  type BusinessTypeId,
} from '../lib/quoteos/sqba-config'
import type { SqbaSetupConfig } from '../lib/quoteos/setup-wizard'
import { AppShell } from '../components/app/AppShell'
import { BuilderOverlay } from '../components/app/BuilderOverlay'
import { CompactEmailCard } from '../components/app/CompactEmailCard'
import { CompactProposalCard } from '../components/app/CompactProposalCard'
import { EmailDraftPanel } from '../components/app/EmailDraftPanel'
import { GeneratedQuoteCard } from '../components/app/GeneratedQuoteCard'
import { MicahChatPanel } from '../components/app/MicahChatPanel'
import { MicahFloatingButton } from '../components/app/MicahFloatingButton'
import { MobileBottomBar } from '../components/app/MobileBottomBar'
import { ProposalPreview } from '../components/app/ProposalPreview'
import { QuoteAdvancedEditor } from '../components/app/QuoteAdvancedEditor'
import { QuotePromptCard } from '../components/app/QuotePromptCard'
import { QuoteSetupWizard } from '../components/app/QuoteSetupWizard'
import { SetupSummaryCard } from '../components/app/SetupSummaryCard'
import { SimpleClientCard } from '../components/app/SimpleClientCard'
import { useQuoteState } from '../hooks/useQuoteState'
import { useSetupWizard } from '../hooks/useSetupWizard'
import { cn } from '../lib/utils'

async function copyEmailDraft(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    window.alert('Email copied to clipboard.')
  } catch {
    window.prompt('Copy email:', text)
  }
}

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
    setQuoteStatus,
    updateLineItem,
    addLineItem,
    removeLineItem,
    setEmailDraft,
  } = useQuoteState(setup.completed ? setup : null)

  const [micahDrawerOpen, setMicahDrawerOpen] = useState(false)
  const [proposalOpen, setProposalOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [micahResponseReady, setMicahResponseReady] = useState(false)

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

  const micahNote = quote.quoteGenerated
    ? (() => {
        const q = generateQuickQuoteFromPrompt(
          quote.micahPrompt || quote.projectSummary,
          quote.businessTypeId,
          setup.completed ? setup : null,
        )
        return q.marginNote.length > 120
          ? 'Simple package offer. Good for a budget-conscious client while keeping recurring support.'
          : q.marginNote
      })()
    : undefined

  return (
    <AppShell>
      <main className="builder-main mx-auto max-w-[1400px] px-4 py-5 pb-28 sm:px-6 sm:py-6 xl:pb-8">
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

        <div className="grid gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] xl:items-start">
          <div className="min-w-0 space-y-4">
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

            <GeneratedQuoteCard
              quote={quote}
              totals={totals}
              setup={setup.completed ? setup : null}
              micahNote={micahNote}
              onReview={() => setProposalOpen(true)}
              onCopyEmail={() => copyEmailDraft(emailDraft)}
              onPrint={handlePrint}
            />

            {quote.quoteGenerated ? (
              <>
                <SimpleClientCard quote={quote} onFieldChange={updateField} />
                <CompactProposalCard
                  ready={quote.quoteGenerated}
                  onView={() => setProposalOpen(true)}
                  onPrint={handlePrint}
                />
                <CompactEmailCard
                  quote={quote}
                  emailDraft={emailDraft}
                  ready={quote.quoteGenerated}
                  onOpenComposer={() => setEmailOpen(true)}
                />
                <QuoteAdvancedEditor
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
              </>
            ) : null}
          </div>

          <div className="hidden lg:block lg:sticky lg:top-20 lg:self-start">
            <MicahChatPanel
              quote={quote}
              emailDraft={emailDraft}
              setup={setup.completed ? setup : null}
              onEmailDraftChange={setEmailDraft}
              showGenerateResponse={micahResponseReady}
            />
          </div>
        </div>
      </main>

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
          quote.quoteGenerated
            ? setProposalOpen(true)
            : handleGenerate()
        }
        onOpenMicah={() => setMicahDrawerOpen(true)}
      />

      <MicahFloatingButton onClick={() => setMicahDrawerOpen(true)} />

      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden print:hidden',
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
            'absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col transition-transform duration-300',
            micahDrawerOpen ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          <div className="mx-auto mb-2 h-1 w-12 rounded-full bg-slate-600" />
          <div className="overflow-hidden rounded-t-2xl border-t border-blue-500/30 bg-[var(--qos-bg)] px-2 pb-4 pt-2">
            <MicahChatPanel
              quote={quote}
              emailDraft={emailDraft}
              setup={setup.completed ? setup : null}
              onEmailDraftChange={setEmailDraft}
              showGenerateResponse={micahResponseReady}
              className="max-h-[80vh] border-0 shadow-none"
            />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
