import { useEffect, useRef, useState } from 'react'
import {
  ChevronDown,
  Copy,
  ExternalLink,
  FileDown,
  Mail,
  Sparkles,
} from 'lucide-react'
import { generateEmailSubject } from '../../lib/quoteos/email'
import { generateMicahSuggestion } from '../../lib/quoteos/micah'
import type { MicahActionId, QuoteFormState } from '../../lib/quoteos/types'
import { MICAH_ACTIONS } from '../../lib/quoteos/types'
import { builderTextareaClass } from './builder-styles'
import { cn } from '../../lib/utils'

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
  onExportPdf: () => void
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
  onExportPdf,
}: EmailDraftPanelProps) {
  const [subject, setSubject] = useState(
    () => generateEmailSubject(quote),
  )
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const mailto = `mailto:${encodeURIComponent(quote.email || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailDraft)}`

  useEffect(() => {
    setSubject(generateEmailSubject(quote))
  }, [quote])

  const runAction = (action: MicahActionId) => {
    const result = generateMicahSuggestion(action, {
      text: emailDraft,
      contactName: quote.contactName,
      projectTitle: quote.projectTitle,
      businessName: quote.clientBusinessName,
    })
    onEmailDraftChange(result.text)
    setSuggestionsOpen(false)
  }

  useEffect(() => {
    if (!suggestionsOpen) return
    const onDocClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSuggestionsOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [suggestionsOpen])

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

      <div className="mt-4 rounded-xl border border-blue-500/25 bg-blue-500/10 p-3 text-sm text-slate-300">
        <p className="font-semibold text-cyan-100">Manual Send Quote workflow</p>
        <p className="mt-1">
          Export the quote PDF first, then open your email app and attach the PDF
          before sending. No payment links are added.
        </p>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-slate-300">
          Subject
        </span>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full min-h-[48px] rounded-xl border border-blue-500/25 bg-[rgba(10,15,30,0.75)] px-4 py-3 text-base text-slate-100"
          aria-label="Email subject"
        />
      </label>

      <div className="relative mt-4" ref={dropdownRef}>
        <textarea
          className={builderTextareaClass}
          style={{ minHeight: '220px' }}
          value={emailDraft}
          onChange={(e) => onEmailDraftChange(e.target.value)}
          aria-label="Email draft"
        />

        <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
          <button
            type="button"
            title="Micah suggestions"
            aria-expanded={suggestionsOpen}
            aria-haspopup="listbox"
            className={cn(
              'flex h-11 min-w-[44px] items-center justify-center gap-1 rounded-xl border px-2 transition-all',
              suggestionsOpen
                ? 'border-cyan-400/50 bg-cyan-500/25 text-cyan-100 shadow-[var(--qos-glow-blue)]'
                : 'border-purple-500/35 bg-purple-500/25 text-purple-100 hover:border-cyan-400/40',
            )}
            onClick={() => setSuggestionsOpen((o) => !o)}
          >
            <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform',
                suggestionsOpen && 'rotate-180',
              )}
              aria-hidden="true"
            />
            <span className="sr-only">Micah suggestions</span>
          </button>

          {suggestionsOpen ? (
            <div
              role="listbox"
              aria-label="Micah email suggestions"
              className="z-20 w-[min(280px,calc(100vw-3rem))] overflow-hidden rounded-xl border border-cyan-400/35 bg-[#0a0f1e] shadow-[0_8px_32px_rgba(0,0,0,0.5),var(--qos-glow-blue)]"
            >
              <p className="border-b border-blue-500/20 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                Micah suggestions
              </p>
              <ul className="max-h-[280px] overflow-y-auto py-1">
                {MICAH_ACTIONS.filter((a) => COMPOSER_ACTIONS.includes(a.id)).map(
                  (action) => (
                    <li key={action.id}>
                      <button
                        type="button"
                        role="option"
                        className="flex min-h-[44px] w-full items-center px-4 text-left text-sm text-slate-200 transition-colors hover:bg-cyan-500/15 hover:text-cyan-100"
                        onClick={() => runAction(action.id)}
                      >
                        {action.label}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : null}
        </div>
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
          onClick={onExportPdf}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 text-sm font-semibold text-cyan-100"
        >
          <FileDown className="h-4 w-4" aria-hidden="true" />
          Export PDF
        </button>
        <button
          type="button"
          onClick={() => copyText(`Subject: ${subject}\n\n${emailDraft}`)}
          className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--qos-border)] bg-white/[0.04] px-4 text-sm font-medium text-slate-200"
        >
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy email
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
