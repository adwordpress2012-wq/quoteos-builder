import { Link } from 'react-router-dom'
import { Bot, Mail, Sparkles, TrendingUp } from 'lucide-react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { MICAH_SUGGESTIONS } from '../../lib/demo/demo-data'

export function MicahPage() {
  return (
    <CommandCentreLayout
      title="Micah"
      subtitle="Operational helper — not a giant chatbot"
    >
      <div className="glass-card mb-6 flex items-center gap-4 rounded-xl p-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/35 bg-purple-500/15">
          <Bot className="h-6 w-6 text-purple-200" aria-hidden="true" />
        </span>
        <p className="text-sm text-slate-400">
          Micah suggests what to do next. Use the quote builder for full quote
          help, or draft emails from any lead or quote card.
        </p>
      </div>

      <SuggestionSection
        icon={Sparkles}
        title="Suggested next actions"
        items={MICAH_SUGGESTIONS.nextActions}
      />
      <SuggestionSection
        icon={Sparkles}
        title="Quote tips"
        items={MICAH_SUGGESTIONS.quoteTips}
      />
      <SuggestionSection
        icon={Mail}
        title="Follow-up suggestions"
        items={MICAH_SUGGESTIONS.followUpSuggestions}
      />
      <SuggestionSection
        icon={TrendingUp}
        title="Revenue suggestions"
        items={MICAH_SUGGESTIONS.revenueSuggestions}
      />

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400/90">
          Email writing tools
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Open the email composer from a quote or lead to use Micah rewrite
          suggestions.
        </p>
        <Link
          to="/app/builder"
          className="mt-4 inline-flex min-h-[52px] items-center justify-center rounded-xl border border-blue-400/40 bg-gradient-to-r from-blue-600/35 to-purple-600/25 px-6 text-sm font-semibold text-white"
        >
          Open quote builder
        </Link>
      </div>
    </CommandCentreLayout>
  )
}

function SuggestionSection({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Sparkles
  title: string
  items: string[]
}) {
  return (
    <section className="mb-6">
      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-200">
        <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="glass-card-inner rounded-lg px-4 py-3 text-sm text-slate-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
