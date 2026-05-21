import { Copy, ExternalLink, Mail, Sparkles } from 'lucide-react'
import { getQuoteDisplayTitle } from '../../lib/quoteos/calculations'
import { generateMicahSuggestion } from '../../lib/quoteos/micah'
import type { MicahActionId, QuoteFormState } from '../../lib/quoteos/types'
import { MICAH_ACTIONS } from '../../lib/quoteos/types'
import { builderTextareaClass } from './builder-styles'

const COMPOSER_ACTIONS: MicahActionId[] = [
  'fix-grammar',
  'make-professional',
  'make-casual-au',
  'improve-cta',
  'create-shorter',
]

type EmailDraftPanelProps = {
  emailDraft: string
  quote: QuoteFormState
  onEmailDraftChange: (text: string) => void
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    window.alert('Email copied to clipboard.')
  } catch {
    window.prompt('Copy email:', text)
  }
}

export function EmailDraftPanel({
  emailDraft,
  quote,
  onEmailDraftChange,
}: EmailDraftPanelProps) {
  const subject = `Quote: ${getQuoteDisplayTitle(quote)}`
  const mailto = `mailto:${encodeURIComponent(quote.email || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailDraft)}`

  const runAction = (action: MicahActionId) => {
    const result = generateMicahSuggestion(action, {
      text: emailDraft,
      contactName: quote.contactName,
      projectTitle: quote.projectTitle,
      businessName: quote.clientBusinessName,
    })
    onEmailDraftChange(result.text)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="icon-block-blue flex h-10 w-10 items-center justify-center rounded-lg">
          <Mail className="h-5 w-5 text-sky-200" aria-hidden="true" />
        </span>
        <p className="text-sm text-slate-500">
          AgentMate-style composer · edits stay local
        </p>
      </div>

      <div className="relative mt-4">
        <textarea
          className={builderTextareaClass}
          style={{ minHeight: '220px' }}
          value={emailDraft}
          onChange={(e) => onEmailDraftChange(e.target.value)}
          aria-label="Email draft"
        />
        <button
          type="button"
          title="Micah rewrite"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/35 bg-purple-500/20 text-purple-200 transition-all hover:border-cyan-400/40"
          onClick={() => runAction('improve-cta')}
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Micah improve CTA</span>
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {MICAH_ACTIONS.filter((a) => COMPOSER_ACTIONS.includes(a.id)).map(
          (action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => runAction(action.id)}
              className="min-h-[44px] rounded-xl border border-blue-500/25 bg-blue-500/10 px-3 py-2 text-sm text-sky-200 hover:border-purple-400/35 hover:text-cyan-100"
            >
              {action.label}
            </button>
          ),
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => copyText(emailDraft)}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--qos-border)] bg-white/[0.04] px-4 text-sm font-medium text-slate-200"
        >
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy Email
        </button>
        <a
          href={mailto}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-blue-400/35 bg-gradient-to-r from-blue-600/25 to-purple-600/20 px-4 text-sm font-semibold text-cyan-100"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Open email app
        </a>
      </div>
    </div>
  )
}
