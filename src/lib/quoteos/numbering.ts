export type DocumentNumberPrefix = 'QOS' | 'INV'

const STORAGE_KEY = 'quoteos-document-number-sequences'

type SequenceStore = Partial<Record<DocumentNumberPrefix, Record<string, number>>>

export function formatDocumentNumber(
  prefix: DocumentNumberPrefix,
  year: number,
  sequence: number,
): string {
  return `${prefix}-${year}-${String(sequence).padStart(4, '0')}`
}

export function generateNextDocumentNumber(
  prefix: DocumentNumberPrefix,
  date = new Date(),
): string {
  const year = String(date.getFullYear())
  const nextSequence = getNextSequence(prefix, year)
  return formatDocumentNumber(prefix, Number(year), nextSequence)
}

export function generateNextQuoteNumber(): string {
  return generateNextDocumentNumber('QOS')
}

export function generateNextInvoiceNumber(): string {
  return generateNextDocumentNumber('INV')
}

function getNextSequence(prefix: DocumentNumberPrefix, year: string): number {
  if (typeof window === 'undefined') return 1

  const store = readSequenceStore()
  const prefixStore = store[prefix] ?? {}
  const nextSequence = (prefixStore[year] ?? 0) + 1

  store[prefix] = {
    ...prefixStore,
    [year]: nextSequence,
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  return nextSequence
}

function readSequenceStore(): SequenceStore {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as SequenceStore
  } catch {
    return {}
  }
}
