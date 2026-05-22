import type {
  AttentionItem,
  DashboardStats,
  DemoBooking,
  DemoCustomer,
  DemoFollowUp,
  DemoInvoice,
  DemoLead,
  DemoQuoteRecord,
} from './types'

export const DEMO_BUSINESS = {
  name: 'Luke Plumbing',
  phone: '0412 345 678',
  email: 'luke@lukeplumbing.com.au',
  website: 'https://lukeplumbing.com.au',
  suburb: 'Brisbane',
}

export const DEMO_LEADS: DemoLead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Mitchell',
    phone: '0401 222 333',
    email: 'sarah.m@email.com',
    suburb: 'Paddington',
    jobType: 'Blocked drain',
    urgency: 'urgent',
    notes:
      'Kitchen sink backing up. Smell from laundry drain. Needs someone today if possible.',
    source: 'Website chat',
    status: 'new',
    createdAt: '2026-05-22T08:15:00',
  },
  {
    id: 'lead-2',
    name: 'James Chen',
    phone: '0423 888 901',
    email: 'j.chen@email.com',
    suburb: 'New Farm',
    jobType: 'Hot water system',
    urgency: 'normal',
    notes: 'Rinnai instant hot water — no hot water since yesterday.',
    source: 'Website chat',
    status: 'reviewed',
    createdAt: '2026-05-21T14:30:00',
  },
  {
    id: 'lead-3',
    name: 'Emma Walsh',
    phone: '0435 111 222',
    email: 'emma.w@email.com',
    suburb: 'Bulimba',
    jobType: 'Tap replacement',
    urgency: 'flexible',
    notes: 'Outdoor tap leaking. Happy to book next week.',
    source: 'Website chat',
    status: 'quote-drafted',
    createdAt: '2026-05-20T10:00:00',
  },
]

export const DEMO_QUOTES: DemoQuoteRecord[] = [
  {
    id: 'quote-1',
    customer: 'James Chen',
    jobType: 'Hot water system replacement',
    amount: 2850,
    status: 'sent',
    lastAction: 'Quote emailed 2 days ago',
    nextStep: 'Soft follow-up if no reply',
    suburb: 'New Farm',
  },
  {
    id: 'quote-2',
    customer: 'Emma Walsh',
    jobType: 'Outdoor tap replacement',
    amount: 420,
    status: 'draft',
    lastAction: 'Draft saved yesterday',
    nextStep: 'Review and send quote',
    suburb: 'Bulimba',
  },
  {
    id: 'quote-3',
    customer: 'Mark Thompson',
    jobType: 'Bathroom renovation rough-in',
    amount: 8400,
    status: 'follow-up',
    lastAction: 'Follow-up sent 5 days ago',
    nextStep: 'Call or email again',
    suburb: 'Ascot',
  },
  {
    id: 'quote-4',
    customer: 'Lisa Park',
    jobType: 'Gas bayonet install',
    amount: 680,
    status: 'accepted',
    lastAction: 'Customer accepted quote',
    nextStep: 'Create invoice & book job',
    suburb: 'Windsor',
  },
  {
    id: 'quote-5',
    customer: 'Dave Morrison',
    jobType: 'Stormwater drain clean',
    amount: 550,
    status: 'lost',
    lastAction: 'Went with another tradie',
    nextStep: 'Archive — no action',
    suburb: 'Coorparoo',
  },
]

export const DEMO_BOOKINGS: DemoBooking[] = [
  {
    id: 'booking-1',
    requestedAt: '2026-05-22T10:00:00',
    customer: 'Lisa Park',
    jobType: 'Gas bayonet install',
    suburb: 'Windsor',
    status: 'requested',
  },
  {
    id: 'booking-2',
    requestedAt: '2026-05-22T14:00:00',
    customer: 'James Chen',
    jobType: 'Hot water install',
    suburb: 'New Farm',
    status: 'confirmed',
  },
  {
    id: 'booking-3',
    requestedAt: '2026-05-18T09:00:00',
    customer: 'Tom Reid',
    jobType: 'Toilet repair',
    suburb: 'Hamilton',
    status: 'completed',
  },
]

export const DEMO_INVOICES: DemoInvoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'LP-2026-014',
    customer: 'Mark Thompson',
    linkedQuoteId: 'quote-3',
    amount: 4200,
    status: 'overdue',
    paymentMethod: 'PayID / bank transfer',
    dueDate: '2026-05-15',
  },
  {
    id: 'inv-2',
    invoiceNumber: 'LP-2026-015',
    customer: 'Lisa Park',
    linkedQuoteId: 'quote-4',
    amount: 680,
    status: 'sent',
    paymentMethod: 'PayID / bank transfer',
    dueDate: '2026-05-28',
  },
  {
    id: 'inv-3',
    invoiceNumber: 'LP-2026-013',
    customer: 'Tom Reid',
    linkedQuoteId: 'quote-old',
    amount: 385,
    status: 'paid',
    paymentMethod: 'Direct deposit',
    dueDate: '2026-05-10',
  },
]

export const DEMO_FOLLOW_UPS: DemoFollowUp[] = [
  {
    id: 'fu-1',
    kind: 'quote',
    title: 'Hot water quote — no reply',
    customer: 'James Chen',
    dueLabel: 'Due today',
    priority: 'high',
  },
  {
    id: 'fu-2',
    kind: 'invoice',
    title: 'Overdue invoice LP-2026-014',
    customer: 'Mark Thompson',
    dueLabel: '7 days overdue',
    priority: 'high',
  },
  {
    id: 'fu-3',
    kind: 'booking',
    title: 'Booking request — gas bayonet',
    customer: 'Lisa Park',
    dueLabel: 'Awaiting confirmation',
    priority: 'medium',
  },
  {
    id: 'fu-4',
    kind: 'customer',
    title: 'Reply to Emma — tap quote',
    customer: 'Emma Walsh',
    dueLabel: 'Due tomorrow',
    priority: 'medium',
  },
]

export const DEMO_CUSTOMERS: DemoCustomer[] = [
  {
    id: 'cust-1',
    name: 'Sarah Mitchell',
    mobile: '0401 222 333',
    email: 'sarah.m@email.com',
    suburb: 'Paddington',
    preferredContact: 'phone',
    jobHistory: ['Enquiry: blocked drain (new)'],
    quoteHistory: [],
    invoiceHistory: [],
  },
  {
    id: 'cust-2',
    name: 'James Chen',
    mobile: '0423 888 901',
    email: 'j.chen@email.com',
    suburb: 'New Farm',
    preferredContact: 'email',
    jobHistory: ['Hot water — no hot water'],
    quoteHistory: ['Hot water system — $2,850 (sent)'],
    invoiceHistory: [],
  },
  {
    id: 'cust-3',
    name: 'Mark Thompson',
    mobile: '0418 555 666',
    email: 'mark.t@email.com',
    suburb: 'Ascot',
    preferredContact: 'phone',
    jobHistory: ['Bathroom reno rough-in'],
    quoteHistory: ['Bathroom reno — $8,400 (follow-up)'],
    invoiceHistory: ['LP-2026-014 — $4,200 (overdue)'],
  },
]

export const DASHBOARD_STATS: DashboardStats = {
  newEnquiries: 1,
  quotesWaiting: 2,
  followUpsDue: 4,
  bookingsToday: 2,
  unpaidInvoices: 2,
  revenueWeek: 4820,
  revenueMonth: 18450,
  revenueYear: 128400,
}

export const TODAYS_ATTENTION: AttentionItem[] = [
  {
    id: 'att-1',
    type: 'lead',
    title: 'Urgent — blocked drain',
    subtitle: 'Sarah Mitchell · Paddington · website chat',
    href: '/app/leads',
    urgent: true,
  },
  {
    id: 'att-2',
    type: 'quote',
    title: 'Hot water quote awaiting review',
    subtitle: 'James Chen · $2,850 · sent 2 days ago',
    href: '/app/quotes',
  },
  {
    id: 'att-3',
    type: 'invoice',
    title: 'Unpaid invoice LP-2026-014',
    subtitle: 'Mark Thompson · $4,200 · 7 days overdue',
    href: '/app/invoices',
    urgent: true,
  },
  {
    id: 'att-4',
    type: 'follow-up',
    title: 'Follow-up due — bathroom reno',
    subtitle: 'Mark Thompson · no reply in 5 days',
    href: '/app/follow-ups',
  },
]

export const MICAH_SUGGESTIONS = {
  nextActions: [
    'Call Sarah about the blocked drain — she needs someone today.',
    'Send a soft follow-up to James on the hot water quote.',
    'Chase Mark’s overdue invoice before starting more work.',
    'Confirm Lisa’s gas bayonet booking for this arvo.',
  ],
  quoteTips: [
    'Include call-out fee and after-hours rate if it’s urgent.',
    'List what’s included (parts, labour, warranty) in plain English.',
    'Offer two options — fix now vs full replacement — when it helps close.',
  ],
  followUpSuggestions: [
    '“G’day James — just checking you got the hot water quote. Happy to tweak anything.”',
    '“Hi Mark — friendly reminder on invoice LP-2026-014. PayID details below.”',
  ],
  revenueSuggestions: [
    'You’re up on last week — two accepted quotes could close the gap on the overdue invoice.',
    'Paddington urgent jobs often convert fast — quote while you’re on the phone.',
  ],
}

export function formatDemoMoney(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(amount)
}
