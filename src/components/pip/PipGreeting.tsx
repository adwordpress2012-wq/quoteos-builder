import { motion } from 'framer-motion'
import { Flame, Clock, CheckSquare } from 'lucide-react'
import type {
  PipEngineResult,
  PipOperationalContext,
  PipQuickActionItem,
  PipSurfaceVariant,
} from '../../types/pip'
import { buildPipMorningBriefing } from './pip-engine'
import PipMood from './PipMood'
import PipQuickAction from './PipQuickAction'

type PipGreetingProps = {
  context: PipOperationalContext
  engine: PipEngineResult
  quickActions?: PipQuickActionItem[]
  variant?: PipSurfaceVariant
  showStats?: boolean
}

export default function PipGreeting({
  context,
  engine,
  quickActions = [],
  variant = 'doshub',
  showStats = true,
}: PipGreetingProps) {
  const briefing = buildPipMorningBriefing(context)
  const isAgentOs = variant === 'agent-os'

  const shellClass = isAgentOs
    ? 'rounded-2xl border border-cyan-500/20 bg-[var(--aos-card)]/80 p-4 shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur-sm sm:rounded-[1.25rem] sm:p-5'
    : 'rounded-2xl border border-white/[0.08] p-4 sm:p-5'

  const shellStyle = isAgentOs
    ? undefined
    : {
        backgroundColor: 'rgba(11,16,32,0.72)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.03) inset, 0 18px 60px rgba(0,0,0,0.35)',
      }

  return (
    <motion.section
      className={shellClass}
      style={shellStyle}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      aria-label="Pip morning briefing"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
          <PipMood mood={engine.mood} size="lg" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-white">{briefing.greeting}</h2>
              <span className="rounded-md border border-cyan-400/25 bg-cyan-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-cyan-200">
                Pip
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">{briefing.weatherLine}</p>
            {briefing.priorityLines.length > 0 ? (
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-cyan-300/70">
                  You&apos;ve got:
                </p>
                <ul className="space-y-1">
                  {briefing.priorityLines.map((line) => (
                    <li key={line} className="flex items-center gap-2 text-sm text-slate-300">
                      <PriorityIcon line={line} />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-slate-400">{engine.message}</p>
            )}
            <p className="text-sm font-medium text-cyan-200/80">{briefing.closingLine}</p>
          </div>
        </div>

        {quickActions.length > 0 ? (
          <div className="shrink-0 lg:max-w-[200px]">
            <PipQuickAction actions={quickActions} variant={variant} />
          </div>
        ) : null}
      </div>

      {showStats ? (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatChip label="Hot leads" value={context.hotLeads} accent={undefined} />
          <StatChip label="Due today" value={context.tasksDueToday} accent={undefined} />
          <StatChip
            label="Overdue"
            value={context.overdueFollowUps}
            accent={context.overdueFollowUps > 0 ? 'warn' : undefined}
          />
          <StatChip
            label="New today"
            value={context.newLeadsToday}
            accent={context.newLeadsToday > 0 ? 'up' : undefined}
          />
        </div>
      ) : null}
    </motion.section>
  )
}

function PriorityIcon({ line }: { line: string }) {
  const lower = line.toLowerCase()
  if (lower.includes('hot')) {
    return <Flame className="h-3.5 w-3.5 text-orange-400" aria-hidden />
  }
  if (lower.includes('booking') || lower.includes('call')) {
    return <Clock className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
  }
  return <CheckSquare className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
}

function StatChip({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent?: 'warn' | 'up'
}) {
  const valueClass =
    accent === 'warn'
      ? 'text-amber-300'
      : accent === 'up'
        ? 'text-emerald-300'
        : 'text-white'

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2">
      <p className="text-[10px] text-slate-500">{label}</p>
      <p className={`text-lg font-bold tabular-nums ${valueClass}`}>{value}</p>
    </div>
  )
}
