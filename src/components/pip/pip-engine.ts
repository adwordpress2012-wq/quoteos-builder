import { sydneyGreetingPeriod } from '../../lib/pip/format'
import type {
  PipEngineResult,
  PipMood,
  PipNotification,
  PipOperationalContext,
} from '../../types/pip'

const SYDNEY_TZ = 'Australia/Sydney'

export function isSydneyNightMode(): boolean {
  const hour = Number(
    new Intl.DateTimeFormat('en-AU', {
      timeZone: SYDNEY_TZ,
      hour: 'numeric',
      hour12: false,
    }).format(new Date()),
  )
  return hour >= 21 || hour < 6
}

function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return count === 1 ? `1 ${singular}` : `${count} ${pluralForm}`
}

function buildNotifications(ctx: PipOperationalContext, mood: PipMood): PipNotification[] {
  const items: PipNotification[] = []

  if (ctx.overdueFollowUps > 0) {
    items.push({
      id: 'overdue-follow-ups',
      kind: 'nudge',
      message:
        ctx.overdueFollowUps > 3
          ? `Pip noticed 👀 ${ctx.overdueFollowUps} overdue follow-ups. Shall I help you follow up now?`
          : `Pip noticed ${plural(ctx.overdueFollowUps, 'overdue follow-up')}.`,
      actionLabel: ctx.overdueFollowUps > 0 ? 'Show me' : undefined,
    })
  }

  if (ctx.newLeadsToday >= 4) {
    items.push({
      id: 'celebration-leads',
      kind: 'celebration',
      message: `Boom 💥 ${ctx.newLeadsToday} new enquiries captured today.`,
    })
  } else if (ctx.newLeadsToday > 0) {
    items.push({
      id: 'new-leads',
      kind: 'celebration',
      message: `Nice work! 🎉 ${plural(ctx.newLeadsToday, 'new enquiry', 'new enquiries')} today.`,
    })
  }

  if (ctx.tasksDueToday === 0 && ctx.overdueFollowUps === 0 && mood === 'relaxed') {
    items.push({
      id: 'all-clear',
      kind: 'empty',
      message: "All clear ✨ Enjoy the moment — you've earned it.",
      actionLabel: 'View calendar',
    })
  }

  if (items.length === 0 && mood === 'curious') {
    items.push({
      id: 'ready',
      kind: 'info',
      message: 'Pip is here when you need a nudge.',
    })
  }

  return items.slice(0, 3)
}

export function computePipState(ctx: PipOperationalContext): PipEngineResult {
  const night = isSydneyNightMode()

  if (ctx.newLeadsToday >= 4) {
    return {
      mood: 'celebration',
      message: 'Cracker day for enquiries — keep the momentum going.',
      notifications: buildNotifications(ctx, 'celebration'),
      motivationalLine: "Let's smash it today 🚀",
    }
  }

  if (ctx.overdueFollowUps > 3) {
    return {
      mood: 'focused',
      message: "You've got overdue follow-ups waiting 👀",
      notifications: buildNotifications(ctx, 'focused'),
      motivationalLine: "One block at a time — you've got this.",
    }
  }

  if (ctx.discoveryCallsToday > 0) {
    return {
      mood: 'operational',
      message: 'Big day today mate — jobs and bookings lined up.',
      notifications: buildNotifications(ctx, 'operational'),
      motivationalLine: "Let's smash it today 🚀",
    }
  }

  if (ctx.newLeadsToday > 0) {
    return {
      mood: 'happy',
      message: 'Nice work — new enquiries came in today.',
      notifications: buildNotifications(ctx, 'happy'),
      motivationalLine: 'Stay on the front foot.',
    }
  }

  if (ctx.overdueFollowUps > 0) {
    return {
      mood: 'focused',
      message: `Pip noticed ${plural(ctx.overdueFollowUps, 'overdue follow-up')}.`,
      notifications: buildNotifications(ctx, 'focused'),
    }
  }

  if (ctx.tasksDueToday === 0 && ctx.overdueFollowUps === 0) {
    return {
      mood: night ? 'sleepy' : 'relaxed',
      message: night ? 'Quiet shift tonight — all clear 👋' : 'All clear 👋 Enjoy the moment.',
      notifications: buildNotifications(ctx, 'relaxed'),
    }
  }

  if (ctx.hotLeads > 0) {
    return {
      mood: 'operational',
      message: `${plural(ctx.hotLeads, 'hot lead')} on the board today.`,
      notifications: buildNotifications(ctx, 'operational'),
      motivationalLine: "Let's smash it today 🚀",
    }
  }

  return {
    mood: night ? 'sleepy' : 'curious',
    message: 'Ready when you are.',
    notifications: buildNotifications(ctx, 'curious'),
  }
}

export function buildPipMorningBriefing(ctx: PipOperationalContext): {
  greeting: string
  weatherLine: string
  priorityLines: string[]
  closingLine: string
} {
  const period = sydneyGreetingPeriod()
  const greeting = `${period} ${ctx.userName} 👋`
  const weatherLine =
    ctx.weatherLine ??
    `Looking good in ${ctx.locationLabel ?? 'your patch'} today ☀️`

  const priorityLines: string[] = []
  if (ctx.hotLeads > 0) {
    priorityLines.push(`${plural(ctx.hotLeads, 'hot lead')}`)
  }
  if (ctx.discoveryCallsToday > 0) {
    priorityLines.push(`${plural(ctx.discoveryCallsToday, 'upcoming booking', 'upcoming bookings')}`)
  }
  if (ctx.followUpsDueToday > 0) {
    priorityLines.push(`${plural(ctx.followUpsDueToday, 'follow-up')} due`)
  } else if (ctx.tasksDueToday > 0) {
    priorityLines.push(`${plural(ctx.tasksDueToday, 'job')} today`)
  }

  const closingLine =
    priorityLines.length > 0 ? "Let's smash it today 🚀" : 'Enjoy the calm while it lasts ✨'

  return { greeting, weatherLine, priorityLines, closingLine }
}
