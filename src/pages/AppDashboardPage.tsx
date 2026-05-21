import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Sparkles, Wand2 } from 'lucide-react'
import { AppShell } from '../components/app/AppShell'

export function AppDashboardPage() {
  return (
    <AppShell showBuilderNav={false}>
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="glass-card rounded-2xl p-6 sm:p-10">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
            QuoteOS App
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-50 sm:text-3xl">
            SQB —{' '}
            <span className="text-gradient-quoteos">Smart Quote Builder</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Build professional quotes, preview PDF-ready proposals, draft emails
            with Micah, and print — all in one workspace. Local MVP demo; no
            backend required yet.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Wand2,
                title: 'Smart Quote Builder',
                desc: 'Presets, line items, totals',
              },
              {
                icon: Sparkles,
                title: 'Micah Assistant',
                desc: 'Tone & email quick actions',
              },
              {
                icon: FileText,
                title: 'PDF Preview',
                desc: 'Print / save via browser',
              },
            ].map((item) => (
              <li
                key={item.title}
                className="glass-card-inner rounded-xl p-4"
              >
                <item.icon
                  className="h-5 w-5 text-cyan-300"
                  aria-hidden="true"
                />
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
              </li>
            ))}
          </ul>

          <Link
            to="/app/builder"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/40 bg-gradient-to-r from-[var(--qos-blue)] via-blue-500 to-[var(--qos-purple)] px-6 py-3 text-sm font-medium text-white shadow-[var(--qos-glow-blue)] transition-all hover:-translate-y-0.5 sm:w-auto sm:text-base"
          >
            Open SQB Builder
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </main>
    </AppShell>
  )
}
