import { Mail, Sparkles } from 'lucide-react'
import { generateEmailSubject } from '../../lib/quoteos/email'
import type { QuoteFormState } from '../../lib/quoteos/types'

type CompactEmailCardProps = {
  quote: QuoteFormState
  emailDraft: string
  ready: boolean
  onOpenComposer: () => void
}

export function CompactEmailCard({
  quote,
  emailDraft,
  ready,
  onOpenComposer,
}: CompactEmailCardProps) {
  if (!ready) return null

  const subject = generateEmailSubject(quote)
  const preview =
    emailDraft.split('\n').filter(Boolean).slice(0, 2).join(' ') ||
    'Email draft updates as you edit the quote.'

  return (
    <section className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="icon-block-purple flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Mail className="h-5 w-5 text-purple-200" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-slate-50">Email draft</p>
          <p className="mt-1 truncate text-sm text-cyan-300/90">{subject}</p>
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">{preview}</p>
        </div>
        <button
          type="button"
          title="Open email composer"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/35 bg-purple-500/15 text-purple-200"
          onClick={onOpenComposer}
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Email writing tools</span>
        </button>
      </div>
      <button
        type="button"
        onClick={onOpenComposer}
        className="mt-4 min-h-[48px] w-full rounded-xl border border-blue-500/25 bg-blue-500/8 text-sm font-semibold text-cyan-200"
      >
        ✨ Open Composer
      </button>
    </section>
  )
}
