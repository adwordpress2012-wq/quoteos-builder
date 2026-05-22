import { useEffect, useState } from 'react'
import { builderPrimaryBtnClass } from '../../app/builder-styles'
import { CommandFormDrawer } from '../CommandFormDrawer'
import { FormField, SelectInput, TextArea, TextInput } from './FormFields'
import type {
  CalendarEventKind,
  DemoBooking,
  DemoCalendarEvent,
  DemoCustomer,
  DemoExpense,
  DemoLead,
} from '../../../lib/demo/types'
import { combineDateAndTime, toDateInputValue, toTimeInputValue } from '../../../lib/command/calendar-utils'

// —— Lead ——

export type LeadFormValues = {
  name: string
  phone: string
  email: string
  address: string
  jobType: string
  notes: string
  urgency: DemoLead['urgency']
  source: string
  suburb: string
}

const emptyLead = (): LeadFormValues => ({
  name: '',
  phone: '',
  email: '',
  address: '',
  suburb: '',
  jobType: '',
  notes: '',
  urgency: 'normal',
  source: 'Manual entry',
})

type LeadFormDrawerProps = {
  open: boolean
  onClose: () => void
  onSave: (values: LeadFormValues) => void
}

export function LeadFormDrawer({ open, onClose, onSave }: LeadFormDrawerProps) {
  const [form, setForm] = useState(emptyLead)

  useEffect(() => {
    if (open) setForm(emptyLead())
  }, [open])

  const set = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <CommandFormDrawer
      open={open}
      onClose={onClose}
      title="Add lead"
      submitLabel="Add lead"
      onSubmit={() => {
        if (!form.name.trim()) return
        onSave(form)
        onClose()
      }}
    >
      <FormField label="Name">
        <TextInput value={form.name} onChange={(v) => set('name', v)} required />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone">
          <TextInput value={form.phone} onChange={(v) => set('phone', v)} />
        </FormField>
        <FormField label="Email">
          <TextInput type="email" value={form.email} onChange={(v) => set('email', v)} />
        </FormField>
      </div>
      <FormField label="Address">
        <TextInput value={form.address} onChange={(v) => set('address', v)} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Suburb">
          <TextInput value={form.suburb} onChange={(v) => set('suburb', v)} />
        </FormField>
        <FormField label="Job type">
          <TextInput value={form.jobType} onChange={(v) => set('jobType', v)} />
        </FormField>
      </div>
      <FormField label="Urgency">
        <SelectInput
          value={form.urgency}
          onChange={(v) => set('urgency', v as LeadFormValues['urgency'])}
          options={[
            { value: 'urgent', label: 'Urgent' },
            { value: 'normal', label: 'Normal' },
            { value: 'flexible', label: 'Flexible' },
          ]}
        />
      </FormField>
      <FormField label="Source">
        <TextInput value={form.source} onChange={(v) => set('source', v)} />
      </FormField>
      <FormField label="Notes">
        <TextArea value={form.notes} onChange={(v) => set('notes', v)} />
      </FormField>
    </CommandFormDrawer>
  )
}

// —— Customer ——

export type CustomerFormValues = {
  name: string
  mobile: string
  email: string
  address: string
  suburb: string
  preferredContact: DemoCustomer['preferredContact']
  notes: string
}

const emptyCustomer = (): CustomerFormValues => ({
  name: '',
  mobile: '',
  email: '',
  address: '',
  suburb: '',
  preferredContact: 'phone',
  notes: '',
})

type CustomerFormDrawerProps = {
  open: boolean
  onClose: () => void
  onSave: (values: CustomerFormValues) => void
}

export function CustomerFormDrawer({
  open,
  onClose,
  onSave,
}: CustomerFormDrawerProps) {
  const [form, setForm] = useState(emptyCustomer)

  useEffect(() => {
    if (open) setForm(emptyCustomer())
  }, [open])

  const set = <K extends keyof CustomerFormValues>(
    key: K,
    value: CustomerFormValues[K],
  ) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <CommandFormDrawer
      open={open}
      onClose={onClose}
      title="Add customer"
      submitLabel="Add customer"
      onSubmit={() => {
        if (!form.name.trim()) return
        onSave(form)
        onClose()
      }}
    >
      <FormField label="Name">
        <TextInput value={form.name} onChange={(v) => set('name', v)} required />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone">
          <TextInput value={form.mobile} onChange={(v) => set('mobile', v)} />
        </FormField>
        <FormField label="Email">
          <TextInput type="email" value={form.email} onChange={(v) => set('email', v)} />
        </FormField>
      </div>
      <FormField label="Address">
        <TextInput value={form.address} onChange={(v) => set('address', v)} />
      </FormField>
      <FormField label="Suburb">
        <TextInput value={form.suburb} onChange={(v) => set('suburb', v)} />
      </FormField>
      <FormField label="Preferred contact">
        <SelectInput
          value={form.preferredContact}
          onChange={(v) =>
            set('preferredContact', v as CustomerFormValues['preferredContact'])
          }
          options={[
            { value: 'phone', label: 'Phone' },
            { value: 'email', label: 'Email' },
            { value: 'sms', label: 'SMS' },
          ]}
        />
      </FormField>
      <FormField label="Notes">
        <TextArea value={form.notes} onChange={(v) => set('notes', v)} />
      </FormField>
    </CommandFormDrawer>
  )
}

// —— Booking ——

export type BookingFormValues = {
  customer: string
  address: string
  date: string
  time: string
  jobType: string
  suburb: string
  notes: string
  linkedQuoteNumber: string
}

const emptyBooking = (): BookingFormValues => {
  const now = new Date()
  return {
    customer: '',
    address: '',
    date: toDateInputValue(now),
    time: '09:00',
    jobType: '',
    suburb: '',
    notes: '',
    linkedQuoteNumber: '',
  }
}

type BookingFormDrawerProps = {
  open: boolean
  onClose: () => void
  onSave: (values: BookingFormValues) => void
  initial?: Partial<BookingFormValues>
  title?: string
}

export function BookingFormDrawer({
  open,
  onClose,
  onSave,
  initial,
  title = 'Add booking',
}: BookingFormDrawerProps) {
  const [form, setForm] = useState(emptyBooking)

  useEffect(() => {
    if (open) setForm({ ...emptyBooking(), ...initial })
  }, [open, initial])

  const set = <K extends keyof BookingFormValues>(
    key: K,
    value: BookingFormValues[K],
  ) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <CommandFormDrawer
      open={open}
      onClose={onClose}
      title={title}
      submitLabel="Save booking"
      onSubmit={() => {
        if (!form.customer.trim()) return
        onSave(form)
        onClose()
      }}
    >
      <FormField label="Customer">
        <TextInput value={form.customer} onChange={(v) => set('customer', v)} required />
      </FormField>
      <FormField label="Address">
        <TextInput value={form.address} onChange={(v) => set('address', v)} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Date">
          <TextInput type="date" value={form.date} onChange={(v) => set('date', v)} />
        </FormField>
        <FormField label="Time">
          <TextInput type="time" value={form.time} onChange={(v) => set('time', v)} />
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Job type">
          <TextInput value={form.jobType} onChange={(v) => set('jobType', v)} />
        </FormField>
        <FormField label="Suburb">
          <TextInput value={form.suburb} onChange={(v) => set('suburb', v)} />
        </FormField>
      </div>
      <FormField label="Linked quote number">
        <TextInput
          value={form.linkedQuoteNumber}
          onChange={(v) => set('linkedQuoteNumber', v)}
          placeholder="e.g. LP-2026-014"
        />
      </FormField>
      <FormField label="Notes">
        <TextArea value={form.notes} onChange={(v) => set('notes', v)} />
      </FormField>
    </CommandFormDrawer>
  )
}

export function bookingFormToDemo(
  values: BookingFormValues,
): Omit<DemoBooking, 'id' | 'status'> {
  const requestedAt = combineDateAndTime(values.date, values.time)
  return {
    requestedAt,
    customer: values.customer,
    address: values.address,
    jobType: values.jobType,
    suburb: values.suburb,
    notes: values.notes,
    linkedQuoteNumber: values.linkedQuoteNumber,
  }
}

// —— Expense ——

export type ExpenseFormValues = {
  date: string
  supplier: string
  category: string
  description: string
  amount: string
}

const emptyExpense = (): ExpenseFormValues => ({
  date: toDateInputValue(new Date()),
  supplier: '',
  category: 'Materials',
  description: '',
  amount: '',
})

type ExpenseFormDrawerProps = {
  open: boolean
  onClose: () => void
  onSave: (values: ExpenseFormValues) => void
}

export function ExpenseFormDrawer({
  open,
  onClose,
  onSave,
}: ExpenseFormDrawerProps) {
  const [form, setForm] = useState(emptyExpense)

  useEffect(() => {
    if (open) setForm(emptyExpense())
  }, [open])

  const set = <K extends keyof ExpenseFormValues>(
    key: K,
    value: ExpenseFormValues[K],
  ) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <CommandFormDrawer
      open={open}
      onClose={onClose}
      title="Add expense"
      submitLabel="Add expense"
      onSubmit={() => {
        const amount = parseFloat(form.amount)
        if (!form.description.trim() || Number.isNaN(amount)) return
        onSave(form)
        onClose()
      }}
    >
      <FormField label="Date">
        <TextInput type="date" value={form.date} onChange={(v) => set('date', v)} />
      </FormField>
      <FormField label="Supplier">
        <TextInput value={form.supplier} onChange={(v) => set('supplier', v)} />
      </FormField>
      <FormField label="Category">
        <SelectInput
          value={form.category}
          onChange={(v) => set('category', v)}
          options={[
            { value: 'Materials', label: 'Materials' },
            { value: 'Fuel', label: 'Fuel' },
            { value: 'Tools', label: 'Tools' },
            { value: 'Subcontractor', label: 'Subcontractor' },
            { value: 'Other', label: 'Other' },
          ]}
        />
      </FormField>
      <FormField label="Description">
        <TextInput value={form.description} onChange={(v) => set('description', v)} required />
      </FormField>
      <FormField label="Amount (AUD)">
        <TextInput
          type="number"
          value={form.amount}
          onChange={(v) => set('amount', v)}
          placeholder="0.00"
        />
      </FormField>
    </CommandFormDrawer>
  )
}

export function expenseFormToDemo(
  values: ExpenseFormValues,
): Omit<DemoExpense, 'id'> {
  return {
    date: values.date,
    supplier: values.supplier,
    category: values.category,
    description: values.description,
    amount: parseFloat(values.amount) || 0,
  }
}

// —— Invoice ——

export type InvoiceFormValues = {
  customer: string
  linkedQuoteId: string
  amount: string
  dueDate: string
  paymentMethod: string
}

const emptyInvoice = (): InvoiceFormValues => ({
  customer: '',
  linkedQuoteId: '',
  amount: '',
  dueDate: toDateInputValue(new Date(Date.now() + 14 * 86400000)),
  paymentMethod: 'PayID / bank transfer',
})

type InvoiceFormDrawerProps = {
  open: boolean
  onClose: () => void
  onSave: (values: InvoiceFormValues) => void
  initial?: Partial<InvoiceFormValues>
}

export function InvoiceFormDrawer({
  open,
  onClose,
  onSave,
  initial,
}: InvoiceFormDrawerProps) {
  const [form, setForm] = useState(emptyInvoice)

  useEffect(() => {
    if (open) setForm({ ...emptyInvoice(), ...initial })
  }, [open, initial])

  const set = <K extends keyof InvoiceFormValues>(
    key: K,
    value: InvoiceFormValues[K],
  ) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <CommandFormDrawer
      open={open}
      onClose={onClose}
      title="Create invoice"
      submitLabel="Create draft invoice"
      onSubmit={() => {
        const amount = parseFloat(form.amount)
        if (!form.customer.trim() || Number.isNaN(amount)) return
        onSave(form)
        onClose()
      }}
    >
      <FormField label="Customer">
        <TextInput value={form.customer} onChange={(v) => set('customer', v)} required />
      </FormField>
      <FormField label="Linked quote ID">
        <TextInput
          value={form.linkedQuoteId}
          onChange={(v) => set('linkedQuoteId', v)}
          placeholder="quote-1"
        />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Amount (AUD)">
          <TextInput type="number" value={form.amount} onChange={(v) => set('amount', v)} />
        </FormField>
        <FormField label="Due date">
          <TextInput type="date" value={form.dueDate} onChange={(v) => set('dueDate', v)} />
        </FormField>
      </div>
      <FormField label="Payment method">
        <TextInput value={form.paymentMethod} onChange={(v) => set('paymentMethod', v)} />
      </FormField>
    </CommandFormDrawer>
  )
}

// —— Calendar event ——

export type CalendarEventFormValues = {
  title: string
  customer: string
  suburb: string
  kind: CalendarEventKind
  date: string
  startTime: string
  endTime: string
  notes: string
}

export function calendarEventToForm(event: DemoCalendarEvent): CalendarEventFormValues {
  return {
    title: event.title,
    customer: event.customer ?? '',
    suburb: event.suburb ?? '',
    kind: event.kind,
    date: toDateInputValue(new Date(event.startsAt)),
    startTime: toTimeInputValue(event.startsAt),
    endTime: toTimeInputValue(event.endsAt),
    notes: event.notes ?? '',
  }
}

export function formToCalendarEvent(
  id: string | undefined,
  values: CalendarEventFormValues,
): DemoCalendarEvent {
  const startsAt = combineDateAndTime(values.date, values.startTime)
  const endsAt = combineDateAndTime(values.date, values.endTime)
  return {
    id: id ?? `cal-${Date.now()}`,
    title: values.title,
    customer: values.customer || undefined,
    suburb: values.suburb || undefined,
    kind: values.kind,
    startsAt,
    endsAt,
    notes: values.notes || undefined,
  }
}

const emptyEvent = (): CalendarEventFormValues => {
  const now = new Date()
  return {
    title: '',
    customer: '',
    suburb: '',
    kind: 'job_booking',
    date: toDateInputValue(now),
    startTime: '09:00',
    endTime: '11:00',
    notes: '',
  }
}

type CalendarEventFormDrawerProps = {
  open: boolean
  onClose: () => void
  onSave: (event: DemoCalendarEvent) => void
  onDelete?: () => void
  initial?: DemoCalendarEvent | null
}

export function CalendarEventFormDrawer({
  open,
  onClose,
  onSave,
  onDelete,
  initial,
}: CalendarEventFormDrawerProps) {
  const [form, setForm] = useState(emptyEvent)

  useEffect(() => {
    if (open) {
      setForm(
        initial && (initial.id || initial.startsAt)
          ? calendarEventToForm(initial)
          : emptyEvent(),
      )
    }
  }, [open, initial])

  const set = <K extends keyof CalendarEventFormValues>(
    key: K,
    value: CalendarEventFormValues[K],
  ) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <CommandFormDrawer
      open={open}
      onClose={onClose}
      title={initial ? 'Edit event' : 'Add event'}
      submitLabel="Save event"
      onSubmit={() => {
        if (!form.title.trim()) return
        onSave(formToCalendarEvent(initial?.id, form))
        onClose()
      }}
      footer={
        <div className="flex flex-col gap-2 border-t border-blue-500/15 pt-4">
          <button type="submit" className={builderPrimaryBtnClass}>
            Save event
          </button>
          {initial && onDelete ? (
            <button
              type="button"
              onClick={() => {
                onDelete()
                onClose()
              }}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-red-500/35 text-sm font-semibold text-red-300 hover:bg-red-500/10"
            >
              Delete event
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-[var(--qos-border)] text-sm font-semibold text-slate-300"
          >
            Cancel
          </button>
        </div>
      }
    >
      <FormField label="Title">
        <TextInput value={form.title} onChange={(v) => set('title', v)} required />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Customer">
          <TextInput value={form.customer} onChange={(v) => set('customer', v)} />
        </FormField>
        <FormField label="Suburb">
          <TextInput value={form.suburb} onChange={(v) => set('suburb', v)} />
        </FormField>
      </div>
      <FormField label="Type">
        <SelectInput
          value={form.kind}
          onChange={(v) => set('kind', v as CalendarEventKind)}
          options={[
            { value: 'job_booking', label: 'Job booking' },
            { value: 'quote_visit', label: 'Quote visit' },
            { value: 'invoice_reminder', label: 'Invoice reminder' },
            { value: 'expense_reminder', label: 'Expense reminder' },
            { value: 'admin', label: 'Admin' },
          ]}
        />
      </FormField>
      <FormField label="Date">
        <TextInput type="date" value={form.date} onChange={(v) => set('date', v)} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Start">
          <TextInput type="time" value={form.startTime} onChange={(v) => set('startTime', v)} />
        </FormField>
        <FormField label="End">
          <TextInput type="time" value={form.endTime} onChange={(v) => set('endTime', v)} />
        </FormField>
      </div>
      <FormField label="Notes">
        <TextArea value={form.notes} onChange={(v) => set('notes', v)} />
      </FormField>
    </CommandFormDrawer>
  )
}
