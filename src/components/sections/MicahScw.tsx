import { SectionHeading } from '../marketing/SectionHeading'

const chatMessages = [
  {
    role: 'assistant' as const,
    text: "Hi, I'm Micah. Tell me what plumbing job you need help with and I'll help prepare the details for a quote.",
  },
  {
    role: 'customer' as const,
    text: 'I have a leaking tap in my kitchen.',
  },
  {
    role: 'assistant' as const,
    text: 'No problem. I can help prepare this for Luke. What suburb are you in, and is it urgent today?',
  },
  {
    role: 'customer' as const,
    text: "Penrith. Not urgent, but we'd like it looked at this week.",
  },
  {
    role: 'assistant' as const,
    text: "Thanks, I've got the details. Luke can review this and send you a quote or booking confirmation shortly.",
  },
]

export function MicahScw() {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <SectionHeading
          align="left"
          eyebrow="Micah SCW"
          title="Your website chat that actually captures good job info"
          description="Micah sits on your website and collects customer enquiries, asks the right job questions, and prepares everything for SQBA so the tradie can review before sending anything."
        />

        <div
          className="overflow-hidden rounded-2xl border border-[#cbd5e1] bg-white shadow-lg"
          aria-label="Example website chat widget"
        >
          <div className="flex items-center justify-between border-b border-[#e2e8f0] bg-[#1d4ed8] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Luke&apos;s Plumbing</p>
              <p className="text-xs text-[#bfdbfe]">Usually replies in a few minutes</p>
            </div>
            <span className="rounded-full bg-[#22c55e] px-2 py-0.5 text-[10px] font-medium text-white">
              Online
            </span>
          </div>

          <div className="max-h-[320px] space-y-3 overflow-y-auto bg-[#f8fafc] p-4">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === 'customer'
                    ? 'ml-8 flex justify-end'
                    : 'mr-8 flex justify-start'
                }
              >
                <p
                  className={
                    msg.role === 'customer'
                      ? 'max-w-[85%] rounded-2xl rounded-br-md bg-[#1d4ed8] px-3 py-2 text-sm text-white'
                      : 'max-w-[85%] rounded-2xl rounded-bl-md border border-[#e2e8f0] bg-white px-3 py-2 text-sm text-[#334155] shadow-sm'
                  }
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 border-t border-[#e2e8f0] bg-white p-3">
            <div className="flex-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-sm text-[#94a3b8]">
              Type your message...
            </div>
            <span className="inline-flex h-10 items-center rounded-lg bg-[#1d4ed8] px-4 text-sm font-medium text-white">
              Send
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
