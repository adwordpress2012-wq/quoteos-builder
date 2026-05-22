import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  FileText,
  Mail,
  Receipt,
  Settings,
  Sparkles,
  UserPlus,
  Wand2,
} from 'lucide-react'

export type SqbaTool = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  badge?: string
}

/** AgentMate Commercial–style tool tiles for SQBA */
export const SQBA_TOOLS: SqbaTool[] = [
  {
    id: 'quote-builder',
    title: 'Quote builder',
    description:
      'Build quotes with line items, Micah prompts, PDF preview, and email drafts.',
    icon: Wand2,
    href: '/app/builder',
    badge: 'Core',
  },
  {
    id: 'email-composer',
    title: 'Email composer',
    description:
      'AgentMate-style rewrite tools — professional tone, follow-ups, and payment reminders.',
    icon: Mail,
    href: '/app/builder',
  },
  {
    id: 'leads-inbox',
    title: 'Leads inbox',
    description: 'Review website chat enquiries prepared for SQBA.',
    icon: UserPlus,
    href: '/app/leads',
  },
  {
    id: 'quotes-list',
    title: 'Quotes list',
    description: 'Track sent, draft, and follow-up quotes in one place.',
    icon: FileText,
    href: '/app/quotes',
  },
  {
    id: 'invoices',
    title: 'Invoices',
    description: 'Create and chase PDF invoices with PayID details.',
    icon: Receipt,
    href: '/app/invoices',
  },
  {
    id: 'dos-calendar',
    title: 'DOS Calendar',
    description: 'Internal schedule for jobs, site visits, and admin blocks.',
    icon: CalendarDays,
    href: '/app/calendar',
  },
  {
    id: 'micah-tips',
    title: 'Micah quick tips',
    description:
      'Operational suggestions live in the quote builder — open a quote to use them.',
    icon: Sparkles,
    href: '/app/builder',
  },
  {
    id: 'business-settings',
    title: 'Business settings',
    description: 'Logo, PayID, theme, and your Calendly or Google Calendar link.',
    icon: Settings,
    href: '/app/settings',
  },
]
