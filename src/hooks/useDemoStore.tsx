import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  DASHBOARD_KPIS,
  DEMO_BOOKINGS,
  DEMO_CALENDAR_EVENTS,
  DEMO_CUSTOMERS,
  DEMO_EXPENSES,
  DEMO_INVOICES,
  DEMO_LEADS,
  DEMO_QUOTES,
} from '../lib/demo/demo-data'
import type {
  BookingStatus,
  DashboardKpiStats,
  DemoBooking,
  DemoCalendarEvent,
  DemoCustomer,
  DemoExpense,
  DemoInvoice,
  DemoLead,
  DemoQuoteRecord,
} from '../lib/demo/types'
import { generateNextInvoiceNumber } from '../lib/quoteos/numbering'

const STORAGE_KEY = 'quoteos-command-centre-local-state-v1'

type LeadInput = {
  name: string
  phone: string
  email: string
  address: string
  suburb: string
  jobType: string
  urgency: DemoLead['urgency']
  notes: string
  source?: string
}

type CustomerInput = {
  name: string
  mobile: string
  email: string
  address: string
  suburb: string
  preferredContact: DemoCustomer['preferredContact']
  notes: string
}

type BookingInput = {
  requestedAt: string
  endsAt?: string
  customer: string
  address: string
  jobType: string
  suburb: string
  notes: string
  linkedQuoteNumber?: string
  status?: BookingStatus
}

type CalendarEventInput = Omit<DemoCalendarEvent, 'id'>

type ExpenseInput = Omit<DemoExpense, 'id'>

type InvoiceInput = {
  customer: string
  linkedQuoteId: string
  amount: number
  dueDate: string
  status?: DemoInvoice['status']
}

type DemoStoreSnapshot = {
  leads: DemoLead[]
  customers: DemoCustomer[]
  bookings: DemoBooking[]
  calendarEvents: DemoCalendarEvent[]
  expenses: DemoExpense[]
  invoices: DemoInvoice[]
  quotes: DemoQuoteRecord[]
}

type DemoStore = DemoStoreSnapshot & {
  dashboardKpis: DashboardKpiStats
  addLead: (input: LeadInput) => DemoLead
  addCustomer: (input: CustomerInput) => DemoCustomer
  addBooking: (input: BookingInput) => DemoBooking
  addCalendarEvent: (input: CalendarEventInput) => DemoCalendarEvent
  updateCalendarEvent: (id: string, input: CalendarEventInput) => void
  deleteCalendarEvent: (id: string) => void
  addExpense: (input: ExpenseInput) => DemoExpense
  createInvoice: (input: InvoiceInput) => DemoInvoice
  addQuote: (input: Omit<DemoQuoteRecord, 'id' | 'status' | 'lastAction' | 'nextStep'>) => DemoQuoteRecord
  updateLead: (id: string, patch: Partial<DemoLead>) => void
  updateBooking: (id: string, patch: Partial<DemoBooking>) => void
}

const DemoStoreContext = createContext<DemoStore | null>(null)

function makeId(prefix: string): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1000)}`
}

function normalizeContact(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '')
}

function readStoredSnapshot(): DemoStoreSnapshot {
  if (typeof window === 'undefined') return defaultSnapshot()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultSnapshot()
    return { ...defaultSnapshot(), ...JSON.parse(raw) } as DemoStoreSnapshot
  } catch {
    return defaultSnapshot()
  }
}

function defaultSnapshot(): DemoStoreSnapshot {
  return {
    leads: DEMO_LEADS,
    customers: DEMO_CUSTOMERS,
    bookings: DEMO_BOOKINGS,
    calendarEvents: DEMO_CALENDAR_EVENTS,
    expenses: DEMO_EXPENSES,
    invoices: DEMO_INVOICES,
    quotes: DEMO_QUOTES,
  }
}

function eventFromBooking(booking: DemoBooking): DemoCalendarEvent {
  const start = new Date(booking.requestedAt)
  const fallbackEnd = new Date(start.getTime() + 90 * 60 * 1000)
  return {
    id: `cal-${booking.id}`,
    startsAt: booking.requestedAt,
    endsAt: booking.endsAt ?? fallbackEnd.toISOString().slice(0, 16),
    title: booking.jobType,
    customer: booking.customer,
    suburb: booking.suburb,
    kind: 'job_booking',
    notes: booking.notes,
  }
}

export function DemoStoreProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<DemoStoreSnapshot>(readStoredSnapshot)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  }, [snapshot])

  const value = useMemo<DemoStore>(() => {
    const addCustomer = (input: CustomerInput) => {
      const customer: DemoCustomer = {
        id: makeId('cust'),
        ...input,
        jobHistory: [],
        quoteHistory: [],
        invoiceHistory: [],
      }
      setSnapshot((current) => ({
        ...current,
        customers: [customer, ...current.customers],
      }))
      return customer
    }

    const addLead = (input: LeadInput) => {
      let linkedCustomer = snapshot.customers.find((customer) => {
        const phoneMatch =
          input.phone && normalizeContact(customer.mobile) === normalizeContact(input.phone)
        const emailMatch =
          input.email && normalizeContact(customer.email) === normalizeContact(input.email)
        return phoneMatch || emailMatch
      })

      if (!linkedCustomer) {
        linkedCustomer = {
          id: makeId('cust'),
          name: input.name,
          mobile: input.phone,
          email: input.email,
          address: input.address,
          suburb: input.suburb,
          preferredContact: input.phone ? 'phone' : 'email',
          notes: `Created from ${input.source ?? 'local lead form'}`,
          jobHistory: [`Enquiry: ${input.jobType}`],
          quoteHistory: [],
          invoiceHistory: [],
        }
      }

      const lead: DemoLead = {
        id: makeId('lead'),
        customerId: linkedCustomer.id,
        name: input.name,
        phone: input.phone,
        email: input.email,
        address: input.address,
        suburb: input.suburb,
        jobType: input.jobType,
        urgency: input.urgency,
        notes: input.notes,
        source: input.source ?? 'Local app form',
        status: 'new',
        createdAt: new Date().toISOString(),
      }

      setSnapshot((current) => {
        const hasCustomer = current.customers.some((customer) => customer.id === linkedCustomer.id)
        return {
          ...current,
          leads: [lead, ...current.leads],
          customers: hasCustomer
            ? current.customers.map((customer) =>
                customer.id === linkedCustomer.id
                  ? {
                      ...customer,
                      jobHistory: [`Enquiry: ${input.jobType}`, ...customer.jobHistory],
                    }
                  : customer,
              )
            : [linkedCustomer, ...current.customers],
        }
      })
      return lead
    }

    const addBooking = (input: BookingInput) => {
      const booking: DemoBooking = {
        id: makeId('booking'),
        requestedAt: input.requestedAt,
        endsAt: input.endsAt,
        customer: input.customer,
        address: input.address,
        jobType: input.jobType,
        suburb: input.suburb,
        notes: input.notes,
        linkedQuoteNumber: input.linkedQuoteNumber ?? '',
        status: input.status ?? 'requested',
      }
      const calendarEvent = eventFromBooking(booking)
      setSnapshot((current) => ({
        ...current,
        bookings: [booking, ...current.bookings],
        calendarEvents: [calendarEvent, ...current.calendarEvents],
      }))
      return booking
    }

    const addCalendarEvent = (input: CalendarEventInput) => {
      const event: DemoCalendarEvent = { id: makeId('cal'), ...input }
      setSnapshot((current) => ({
        ...current,
        calendarEvents: [event, ...current.calendarEvents],
      }))
      return event
    }

    const updateCalendarEvent = (id: string, input: CalendarEventInput) => {
      setSnapshot((current) => ({
        ...current,
        calendarEvents: current.calendarEvents.map((event) =>
          event.id === id ? { id, ...input } : event,
        ),
      }))
    }

    const deleteCalendarEvent = (id: string) => {
      setSnapshot((current) => ({
        ...current,
        calendarEvents: current.calendarEvents.filter((event) => event.id !== id),
      }))
    }

    const addExpense = (input: ExpenseInput) => {
      const expense: DemoExpense = { id: makeId('exp'), ...input }
      setSnapshot((current) => ({
        ...current,
        expenses: [expense, ...current.expenses],
      }))
      return expense
    }

    const createInvoice = (input: InvoiceInput) => {
      const invoice: DemoInvoice = {
        id: makeId('inv'),
        invoiceNumber: generateNextInvoiceNumber(),
        customer: input.customer,
        linkedQuoteId: input.linkedQuoteId,
        amount: input.amount,
        status: input.status ?? 'draft',
        paymentMethod: 'PayID / bank transfer',
        dueDate: input.dueDate,
      }
      setSnapshot((current) => ({
        ...current,
        invoices: [invoice, ...current.invoices],
      }))
      return invoice
    }

    const updateLead = (id: string, patch: Partial<DemoLead>) => {
      setSnapshot((current) => ({
        ...current,
        leads: current.leads.map((lead) =>
          lead.id === id ? { ...lead, ...patch } : lead,
        ),
      }))
    }

    const updateBooking = (id: string, patch: Partial<DemoBooking>) => {
      setSnapshot((current) => {
        const bookings = current.bookings.map((booking) =>
          booking.id === id ? { ...booking, ...patch } : booking,
        )
        const updated = bookings.find((b) => b.id === id)
        const calendarEvents =
          updated && patch.requestedAt
            ? current.calendarEvents.map((event) =>
                event.id === `cal-${id}` ? eventFromBooking(updated) : event,
              )
            : current.calendarEvents
        return { ...current, bookings, calendarEvents }
      })
    }

    const addQuote: DemoStore['addQuote'] = (input) => {
      const quote: DemoQuoteRecord = {
        id: makeId('quote'),
        ...input,
        status: 'draft',
        lastAction: 'Draft created from Micah SCW intake',
        nextStep: 'Review scope and send proposal',
      }
      setSnapshot((current) => ({
        ...current,
        quotes: [quote, ...current.quotes],
      }))
      return quote
    }

    const totalExpenses = snapshot.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const dashboardKpis: DashboardKpiStats = {
      ...DASHBOARD_KPIS,
      monthlyRevenue: Math.max(0, DASHBOARD_KPIS.monthlyRevenue - Math.round(totalExpenses)),
      outstandingPayments: snapshot.invoices
        .filter((invoice) => invoice.status === 'sent' || invoice.status === 'overdue')
        .reduce((sum, invoice) => sum + invoice.amount, 0),
    }

    return {
      ...snapshot,
      dashboardKpis,
      addLead,
      addCustomer,
      addBooking,
      addCalendarEvent,
      updateCalendarEvent,
      deleteCalendarEvent,
      addExpense,
      createInvoice,
      addQuote,
      updateLead,
      updateBooking,
    }
  }, [snapshot])

  return <DemoStoreContext.Provider value={value}>{children}</DemoStoreContext.Provider>
}

export function useDemoStore() {
  const store = useContext(DemoStoreContext)
  if (!store) throw new Error('useDemoStore must be used inside DemoStoreProvider')
  return store
}
