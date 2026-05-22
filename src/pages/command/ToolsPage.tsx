import { Link } from 'react-router-dom'
import { LayoutGrid } from 'lucide-react'
import { CommandCentreLayout } from '../../components/command/CommandCentreLayout'
import { SQBA_TOOLS } from '../../lib/demo/tools-config'
import { cn } from '../../lib/utils'

export function ToolsPage() {
  return (
    <CommandCentreLayout
      title="Tools"
      subtitle="Quick links to QuoteOS workflows — inspired by AgentMate Commercial"
    >
      <div className="glass-card mb-6 flex items-start gap-4 rounded-xl p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/35 bg-purple-500/15">
          <LayoutGrid className="h-6 w-6 text-purple-200" aria-hidden="true" />
        </span>
        <p className="text-sm text-slate-400">
          Same idea as AgentMate&apos;s tools section: one place to jump into the
          jobs you do every day. Nothing auto-sends — you review quotes, emails,
          and invoices before they go out.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SQBA_TOOLS.map((tool) => (
          <li key={tool.id}>
            <Link
              to={tool.href}
              className={cn(
                'glass-card group flex h-full min-h-[160px] flex-col rounded-xl p-5 transition-colors',
                'hover:border-cyan-400/35 hover:bg-white/[0.03]',
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10">
                  <tool.icon
                    className="h-5 w-5 text-cyan-300"
                    aria-hidden="true"
                  />
                </span>
                {tool.badge ? (
                  <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-200">
                    {tool.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-50 group-hover:text-cyan-100">
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {tool.description}
              </p>
              <span className="mt-4 text-xs font-medium text-cyan-400">
                Open tool →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </CommandCentreLayout>
  )
}
