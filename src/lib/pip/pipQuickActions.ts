import type { PipQuickActionItem } from '../../types/pip'

/** QuoteOS Command Centre quick actions for Pip greeting panel. */
export function quoteOsPipQuickActions(): PipQuickActionItem[] {
  return [
    {
      id: 'new-quote',
      label: 'New quote',
      href: '/app/builder',
      icon: 'sparkles',
    },
    {
      id: 'leads',
      label: 'View leads',
      href: '/app/leads',
      icon: 'list',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      href: '/app/calendar',
      icon: 'calendar',
    },
  ]
}
