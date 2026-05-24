import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, Minimize2, Settings2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type {
  PipEngineResult,
  PipOperationalContext,
  PipQuickActionItem,
  PipSurfaceVariant,
} from '../../types/pip'
import { pipDebugLog } from '../../lib/pip/pipDebug'
import { usePipPreferences } from '../../lib/pip/usePipPreferences'
import PipGreeting from './PipGreeting'
import PipMood from './PipMood'
import PipNotification from './PipNotification'

type PipCardProps = {
  context: PipOperationalContext
  engine: PipEngineResult
  quickActions?: PipQuickActionItem[]
  variant?: PipSurfaceVariant
  settingsHref?: string
  className?: string
}

export default function PipCard({
  context,
  engine,
  quickActions = [],
  variant = 'doshub',
  settingsHref = '/app/settings',
  className = '',
}: PipCardProps) {
  const { prefs, hydrated, isEnabled, isFull, setMinimized } = usePipPreferences()
  const [dismissed, setDismissed] = useState<Set<string>>(() => new Set())
  const [expanded, setExpanded] = useState(true)

  const visibleNotifications = useMemo(
    () => engine.notifications.filter((n) => !dismissed.has(n.id)),
    [engine.notifications, dismissed],
  )

  useEffect(() => {
    pipDebugLog('PipCard render path', {
      variant,
      hydrated,
      displayMode: prefs.displayMode,
      minimized: prefs.minimized,
      isEnabled,
      isFull,
      mood: engine.mood,
    })
  }, [variant, hydrated, prefs.displayMode, prefs.minimized, isEnabled, isFull, engine.mood])

  if (!isEnabled) return null

  if (prefs.minimized) {
    return (
      <motion.button
        type="button"
        onClick={() => setMinimized(false)}
        className={`inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.15)] ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Expand Pip"
      >
        <PipMood mood={engine.mood} size="sm" />
        Pip
      </motion.button>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[10px] font-semibold text-slate-400 transition hover:text-cyan-200"
          aria-label="Minimize Pip"
        >
          <Minimize2 className="h-3 w-3" />
          Minimize
        </button>
        <Link
          to={settingsHref}
          className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[10px] font-semibold text-slate-400 transition hover:text-cyan-200"
        >
          <Settings2 className="h-3 w-3" />
          Pip settings
        </Link>
        {!isFull ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[10px] font-semibold text-slate-400 transition hover:text-cyan-200"
          >
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {expanded ? 'Less' : 'More'}
          </button>
        ) : null}
      </div>

      <AnimatePresence mode="wait">
        {isFull ? (
          <PipGreeting
            key="full"
            context={context}
            engine={engine}
            quickActions={quickActions}
            variant={variant}
          />
        ) : expanded ? (
          <motion.div
            key="minimal"
            className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0B1020]/80 px-4 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PipMood mood={engine.mood} size="md" />
            <p className="text-sm text-slate-200">{engine.message}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isFull && visibleNotifications.length > 0 ? (
        <div className="space-y-2">
          {visibleNotifications.map((notification) => (
            <PipNotification
              key={notification.id}
              notification={notification}
              mood={engine.mood}
              variant={variant}
              onDismiss={(id) =>
                setDismissed((current) => {
                  const next = new Set(current)
                  next.add(id)
                  return next
                })
              }
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
