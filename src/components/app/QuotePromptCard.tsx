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
    <section className="glass-card rounded-xl p-4 sm:p-5">
      <h2 className="text-base font-semibold tracking-tight text-slate-50">
        Get suggestions
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Optional: describe the job and we will suggest a simple line-item structure.
        You set every price manually.
      </p>

      <label className="mt-4 block" htmlFor="quote-suggestion-prompt">
        <span className="sr-only">Job description for suggestions</span>
        <textarea
          id="quote-suggestion-prompt"
          rows={3}
          className={builderTextareaClass}
          placeholder="Hot water replacement at 12 Smith Street. Include call-out, labour, materials and optional emergency surcharge."
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
        <span aria-hidden="true">+</span>
        {isGenerating ? 'Getting suggestions...' : 'Get Suggestions'}
      </button>
    </section>
  )
}
