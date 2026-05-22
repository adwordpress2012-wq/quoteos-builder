import type { QuoteStatus } from '../quoteos/types'

export type LeadStatus = 'new' | 'reviewed' | 'quote-drafted'

export type DemoLead = {
  id: string
  name: string
  phone: string
  email: string
  suburb: string
  jobType: string
  urgency: 'urgent' | 'normal' | 'flexible'
  notes: string
  source: string
  status: LeadStatus
  createdAt: string
}

export type DemoQuoteRecord = {
  id: string
  customer: string
  jobType: string
  amount: number
  status: QuoteStatus
  lastAction: string
  nextStep: string
  suburb?: string
}

export type BookingStatus = 'requested' | 'confirmed' | 'completed'

export type DemoBooking = {
  id: string
  requestedAt: string
  customer: string
  jobType: string
  suburb: string
  status: BookingStatus
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue'

export type DemoInvoice = {
  id: string
  invoiceNumber: string
  customer: string
  linkedQuoteId: string
  amount: number
  status: InvoiceStatus
  paymentMethod: string
  dueDate: string
}

export type FollowUpKind = 'quote' | 'invoice' | 'booking' | 'customer'

export type DemoFollowUp = {
  id: string
  kind: FollowUpKind
  title: string
  customer: string
  dueLabel: string
  priority: 'high' | 'medium'
}

export type DemoCustomer = {
  id: string
  name: string
  mobile: string
  email: string
  suburb: string
  preferredContact: 'phone' | 'email' | 'sms'
  jobHistory: string[]
  quoteHistory: string[]
  invoiceHistory: string[]
}

export type AttentionItem = {
  id: string
  type: 'lead' | 'quote' | 'invoice' | 'follow-up'
  title: string
  subtitle: string
  href: string
  urgent?: boolean
}

export type DashboardStats = {
  newEnquiries: number
  quotesWaiting: number
  followUpsDue: number
  bookingsToday: number
  unpaidInvoices: number
  revenueWeek: number
  revenueMonth: number
  revenueYear: number
}
