import { Sparkles, Wand2 } from 'lucide-react'
import { QUICK_START_EXAMPLES } from '../../lib/quoteos/sqba-config'
import { builderPrimaryBtnClass, builderTextareaClass } from './builder-styles'

type QuickQuoteStartProps = {
  prompt: string
  onPromptChange: (value: string) => void
  onGenerate: () => void
  isGenerating?: boolean
}

export function QuickQuoteStart({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
}: QuickQuoteStartProps) {
  return (
    <section className="glass-card rounded-2xl p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <span className="icon-block-purple flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <Sparkles className="h-6 w-6 text-purple-200" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            SQBA · Micah
          </p>
          <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
            Quick Quote Start
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tell Micah what you need — no long form required.
          </p>
        </div>
      </div>

      <label className="mt-5 block" htmlFor="micah-prompt">
        <span className="sr-only">Tell Micah what you need to quote</span>
        <textarea
          id="micah-prompt"
          rows={4}
          className={builderTextareaClass}
          placeholder="Tell Micah what you need to quote…"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
        />
      </label>

      <p className="mt-3 text-sm font-medium text-slate-400">Try an example</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {QUICK_START_EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => onPromptChange(ex.prompt)}
            className="min-h-[44px] rounded-xl border border-blue-500/25 bg-blue-500/8 px-3 py-2 text-left text-sm text-sky-200 transition-all hover:border-purple-400/35 hover:bg-purple-500/12 hover:text-cyan-100"
          >
            {ex.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={`${builderPrimaryBtnClass} mt-5`}
        onClick={onGenerate}
        disabled={isGenerating}
      >
        <Wand2 className="h-5 w-5" aria-hidden="true" />
        {isGenerating ? 'Micah is building…' : 'Generate Smart Quote'}
      </button>
    </section>
  )
}
