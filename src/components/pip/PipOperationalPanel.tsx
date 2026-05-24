import { useEffect, useMemo } from 'react'
import type {
  PipOperationalContext,
  PipQuickActionItem,
  PipSurfaceVariant,
} from '../../types/pip'
import { computePipState } from './pip-engine'
import PipCard from './PipCard'
import { pipDebugLog } from '../../lib/pip/pipDebug'

type PipOperationalPanelProps = {
  context: PipOperationalContext
  quickActions?: PipQuickActionItem[]
  variant?: PipSurfaceVariant
  settingsHref?: string
  className?: string
}

export default function PipOperationalPanel({
  context,
  quickActions = [],
  variant = 'doshub',
  settingsHref,
  className,
}: PipOperationalPanelProps) {
  const engine = useMemo(() => computePipState(context), [context])

  useEffect(() => {
    pipDebugLog('PipOperationalPanel mounted', {
      variant,
      locationLabel: context.locationLabel,
      mood: engine.mood,
    })
  }, [variant, context.locationLabel, engine.mood])

  return (
    <PipCard
      context={context}
      engine={engine}
      quickActions={quickActions}
      variant={variant}
      settingsHref={settingsHref}
      className={className}
    />
  )
}
