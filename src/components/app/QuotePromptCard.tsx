import { builderPrimaryBtnClass, builderTextareaClass } from './builder-styles'

type QuotePromptCardProps = {
  prompt: string
  onPromptChange: (value: string) => void
  onGenerate: () => void
  isGenerating?: boolean
}

export function QuotePromptCard({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
}: QuotePromptCardProps) {
  return (
    <section className="glass-card rounded-2xl p-5 sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
        What are we quoting today?
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Tell Micah in plain English — he will build the quote for you.
      </p>

      <label className="mt-5 block" htmlFor="micah-prompt">
        <span className="sr-only">Quote prompt for Micah</span>
        <textarea
          id="micah-prompt"
          rows={4}
          className={builderTextareaClass}
          placeholder="One-page plumbing website with Google setup and email setup"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
        />
      </label>

      <button
        type="button"
        className={`${builderPrimaryBtnClass} mt-4`}
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
      >
        <span aria-hidden="true">✨</span>
        {isGenerating ? 'Micah is building…' : 'Ask Micah to Build Quote'}
      </button>
    </section>
  )
}
