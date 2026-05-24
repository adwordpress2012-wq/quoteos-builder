/** Pip — DOS operational companion (internal dashboard layer, not Micah). */

export type PipMood =
  | 'happy'
  | 'focused'
  | 'curious'
  | 'sleepy'
  | 'celebration'
  | 'operational'
  | 'relaxed'

export type PipDisplayMode = 'full' | 'minimal' | 'off'

export type PipPreferences = {
  displayMode: PipDisplayMode
  minimized: boolean
}

export type PipNotificationKind =
  | 'nudge'
  | 'celebration'
  | 'empty'
  | 'onboarding'
  | 'info'

export type PipNotification = {
  id: string
  kind: PipNotificationKind
  message: string
  actionLabel?: string
}

export type PipQuickActionItem = {
  id: string
  label: string
  href?: string
  onClick?: () => void
  icon?: 'plus' | 'calendar' | 'list' | 'sparkles'
}

export type PipOperationalContext = {
  userName: string
  overdueFollowUps: number
  tasksDueToday: number
  followUpsDueToday: number
  hotLeads: number
  newLeadsToday: number
  discoveryCallsToday: number
  weatherLine?: string
  locationLabel?: string
}

export type PipEngineResult = {
  mood: PipMood
  message: string
  notifications: PipNotification[]
  motivationalLine?: string
}

export type PipSurfaceVariant = 'agent-os' | 'doshub'
