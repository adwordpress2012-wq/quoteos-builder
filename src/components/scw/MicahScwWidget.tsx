import { useMemo, useRef, useState, type FormEvent } from 'react'
import { CalendarDays, MessageCircle, Send, X } from 'lucide-react'
import {
  PLUMBING_JOB_TYPES,
  emptyScwLeadDraft,
  getNextMissingScwField,
  getQuoteIntakeSummary,
  getScwQuestionForField,
  looksEmergency,
  prepareSqbaLeadFromScwConversation,
  updateScwLeadFromMessage,
  type ScwLeadDraft,
} from '../../lib/quoteos/scw'
import { cn } from '../../lib/utils'

type ChatMessage = {
  id: number
  role: 'assistant' | 'customer'
  text: string
}

const GREETING =
  "Hi, I'm Micah. Tell me what plumbing job you need help with and I'll help prepare the details for a quote."

function nextMessageForLead(lead: ScwLeadDraft, lastMessage: string): string {
  if (looksEmergency(lastMessage)) {
    const nextField = getNextMissingScwField(lead)
    const nextQuestion = nextField ? ` ${getScwQuestionForField(nextField, lead)}` : ''
    return `If this is urgent or causing damage, please call the plumber directly.${nextQuestion}`
  }

  const nextField = getNextMissingScwField(lead)
  if (nextField) return getScwQuestionForField(nextField, lead)

  return "Thanks, I've got the details. Luke can review this and send you a quote or booking confirmation shortly."
}

export function MicahScwWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [lead, setLead] = useState<ScwLeadDraft>(emptyScwLeadDraft)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'assistant', text: GREETING },
  ])
  const [draft, setDraft] = useState('')
  const nextId = useRef(2)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const nextField = getNextMissingScwField(lead)
  const preparedLead = useMemo(
    () => (lead.quoteDraftStatus === 'ready' ? prepareSqbaLeadFromScwConversation(lead) : null),
    [lead],
  )

  function appendMessage(role: ChatMessage['role'], text: string): ChatMessage {
    const message = { id: nextId.current, role, text }
    nextId.current += 1
    return message
  }

  function handleCustomerMessage(text: string) {
    const value = text.trim()
    if (!value) return

    const activeField = getNextMissingScwField(lead) ?? 'jobDescription'
    const updatedLead = updateScwLeadFromMessage(lead, activeField, value)
    const assistantReply = nextMessageForLead(updatedLead, value)

    setLead(updatedLead)
    setMessages((current) => [
      ...current,
      appendMessage('customer', value),
      appendMessage('assistant', assistantReply),
    ])
    setDraft('')

    window.requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    handleCustomerMessage(draft)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[80] print:hidden sm:bottom-5 sm:right-5">
      {isOpen ? (
        <div className="mb-3 flex h-[min(620px,calc(100svh-6.5rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between bg-[#1d4ed8] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Micah for Luke&apos;s Plumbing</p>
              <p className="text-xs text-blue-100">Quote intake assistant. Review required.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Micah chat"
              className="rounded-full p-1 text-blue-100 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.role === 'customer' ? 'justify-end pl-10' : 'justify-start pr-10',
                )}
              >
                <p
                  className={cn(
                    'max-w-full whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-relaxed',
                    message.role === 'customer'
                      ? 'rounded-br-md bg-[#1d4ed8] text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 shadow-sm',
                  )}
                >
                  {message.text}
                </p>
              </div>
            ))}

            {preparedLead ? (
              <div className="rounded-xl border border-blue-100 bg-white p-3 text-xs text-slate-700 shadow-sm">
                <p className="mb-2 font-semibold text-slate-900">SQBA-ready lead</p>
                <p className="whitespace-pre-line leading-relaxed">{getQuoteIntakeSummary(preparedLead.lead)}</p>
                <div className="mt-3 rounded-lg bg-slate-50 p-2">
                  <p className="font-medium text-slate-800">Notification placeholders</p>
                  <p className="mt-1 text-slate-600">{preparedLead.notificationDrafts.resendEmailToTradie}</p>
                  <p className="mt-1 text-slate-500">No email, SMS, WhatsApp, invoice, or quote is sent automatically.</p>
                </div>
                <details className="mt-3">
                  <summary className="cursor-pointer font-medium text-blue-700">
                    View local data object
                  </summary>
                  <pre className="mt-2 max-h-44 overflow-auto rounded-lg bg-slate-950 p-2 text-[11px] text-slate-100">
                    {JSON.stringify(preparedLead.lead, null, 2)}
                  </pre>
                </details>
              </div>
            ) : null}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            {nextField === 'jobType' ? (
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                {PLUMBING_JOB_TYPES.map((jobType) => (
                  <button
                    key={jobType}
                    type="button"
                    onClick={() => handleCustomerMessage(jobType)}
                    className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    {jobType}
                  </button>
                ))}
              </div>
            ) : null}

            {nextField === 'urgency' ? (
              <div className="mb-2 flex gap-1.5">
                {['Urgent today', 'Soon', 'Flexible'].map((urgency) => (
                  <button
                    key={urgency}
                    type="button"
                    onClick={() => handleCustomerMessage(urgency)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    {urgency}
                  </button>
                ))}
              </div>
            ) : null}

            {nextField === 'permissionToContact' ? (
              <div className="mb-2 flex gap-1.5">
                {['Yes, please contact me', 'No thanks'].map((answer) => (
                  <button
                    key={answer}
                    type="button"
                    onClick={() => handleCustomerMessage(answer)}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                  >
                    {answer}
                  </button>
                ))}
              </div>
            ) : null}

            {preparedLead ? (
              <a
                href={preparedLead.booking.placeholderUrl}
                target="_blank"
                rel="noreferrer"
                className="mb-2 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-800 transition hover:bg-blue-100"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Google Calendar / Calendly placeholder. Request only, not booked.
              </a>
            ) : null}

            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label className="sr-only" htmlFor="micah-scw-message">
                Message Micah
              </label>
              <textarea
                id="micah-scw-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={1}
                placeholder={nextField ? 'Type your reply...' : 'Add another note for Luke...'}
                className="min-h-10 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1d4ed8] text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <p className="mt-2 text-[11px] leading-snug text-slate-500">
              Photos can be added later in SQBA. Micah prepares details only and never confirms price or booking.
            </p>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open Micah chat"
        className="ml-auto flex h-14 items-center gap-2 rounded-full bg-[#1d4ed8] px-4 text-sm font-semibold text-white shadow-xl shadow-blue-900/20 transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="hidden sm:inline">Ask Micah</span>
      </button>
    </div>
  )
}
