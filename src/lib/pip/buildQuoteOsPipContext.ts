import type { DemoLead } from '../demo/types'
import type { PipOperationalContext } from '../../types/pip'
import { DASHBOARD_STATS, DEMO_BUSINESS, MORNING_BRIEFING } from '../demo/demo-data'
import { displayFirstName } from './format'

function isToday(iso: string): boolean {
  const created = new Date(iso)
  const now = new Date()
  return created.toDateString() === now.toDateString()
}

/** QuoteOS Command Centre context from demo store snapshot (no AI, no extra fetches). */
export function buildQuoteOsPipContext(options: {
  leads: DemoLead[]
  userName?: string | null
}): PipOperationalContext {
  const urgentLeads = options.leads.filter((lead) => lead.urgency === 'urgent').length
  const newLeadsToday = Math.max(
    options.leads.filter((lead) => isToday(lead.createdAt)).length,
    DASHBOARD_STATS.newEnquiries,
  )

  return {
    userName: displayFirstName(options.userName ?? DEMO_BUSINESS.name, 'mate'),
    overdueFollowUps: DASHBOARD_STATS.followUpsDue,
    tasksDueToday: MORNING_BRIEFING.jobsToday,
    followUpsDueToday: DASHBOARD_STATS.followUpsDue,
    hotLeads: urgentLeads || MORNING_BRIEFING.urgentLeads,
    newLeadsToday,
    discoveryCallsToday: MORNING_BRIEFING.upcomingBookings,
    locationLabel: DEMO_BUSINESS.suburb ?? 'QuoteOS',
    weatherLine:
      'QuoteOS Command Centre — quotes, jobs, and follow-ups ready ☀️',
  }
}
