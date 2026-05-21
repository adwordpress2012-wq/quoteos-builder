import { Sparkles } from 'lucide-react'
import { generateMicahSuggestion } from '../../lib/quoteos/micah'
import { MICAH_ACTIONS, type MicahActionId } from '../../lib/quoteos/types'

type MicahPanelProps = {
  draft: string
  onDraftChange: (text: string) => void
  contactName: string
  projectTitle: string
  businessName: string
  projectSummary: string
}

export function MicahPanel({
  draft,
  onDraftChange,
  contactName,
  projectTitle,
  businessName,
  projectSummary,
}: MicahPanelProps) {
  const sourceText = draft || projectSummary

  const runAction = (action: MicahActionId) => {
    const result = generateMicahSuggestion(action, {
      text: sourceText,
      contactName,
      projectTitle,
      businessName,
    })
    onDraftChange(result.text)
  }

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className="icon-block-purple flex h-9 w-9 items-center justify-center rounded-lg">
          <Sparkles className="h-4 w-4 text-purple-200" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            Micah Writing Assistant
          </h2>
          <p className="text-[11px] text-slate-500">Local MVP · API coming soon</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {MICAH_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => runAction(action.id)}
            className="rounded-md border border-blue-500/25 bg-blue-500/10 px-2 py-1 text-[10px] text-sky-200 transition-all hover:border-purple-400/35 hover:bg-purple-500/15 hover:text-cyan-100 sm:text-[11px]"
          >
            {action.label}
          </button>
        ))}
      </div>

      <textarea
        className="mt-4 min-h-[140px] w-full resize-y rounded-lg border border-purple-500/20 bg-purple-500/[0.06] p-3 text-sm leading-relaxed text-slate-200 focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/25"
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        placeholder="Micah suggestions appear here. Use quick actions or type your own copy."
        aria-label="Micah writing assistant draft"
      />
    </div>
  )
}
