import { Mail } from 'lucide-react'

type EmailDraftPanelProps = {
  emailDraft: string
  onEmailDraftChange: (text: string) => void
}

export function EmailDraftPanel({
  emailDraft,
  onEmailDraftChange,
}: EmailDraftPanelProps) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className="icon-block-blue flex h-9 w-9 items-center justify-center rounded-lg">
          <Mail className="h-4 w-4 text-sky-200" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-50">Email draft</h2>
          <p className="text-[11px] text-slate-500">
            Auto-updates from quote · editable
          </p>
        </div>
      </div>
      <textarea
        className="mt-4 min-h-[200px] w-full resize-y rounded-lg border border-blue-500/25 bg-[rgba(10,15,30,0.75)] p-3 font-mono text-xs leading-relaxed text-slate-200 focus:border-cyan-400/40 focus:outline-none focus:ring-1 focus:ring-cyan-400/25 sm:text-sm"
        value={emailDraft}
        onChange={(e) => onEmailDraftChange(e.target.value)}
        aria-label="Email draft"
      />
    </div>
  )
}
