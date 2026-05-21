import { SectionHeading } from '../marketing/SectionHeading'

const steps = [
  {
    number: '1',
    title: 'Customer chats with Micah',
    description:
      'Micah sits on your tradie website and asks the right job questions — location, urgency, photos, and scope.',
  },
  {
    number: '2',
    title: 'Micah prepares quote details',
    description:
      'Enquiry details flow into SQBA as a quote-ready job with line items, notes, and customer contact info.',
  },
  {
    number: '3',
    title: 'Tradie reviews and sends',
    description:
      'You check the numbers, tweak if needed, then send the quote by email or SMS — professional and fast.',
  },
  {
    number: '4',
    title: 'Job booked, invoice ready',
    description:
      'Confirm the booking, send reminders, and issue a PDF invoice when the work is done.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#f8fafc] px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How it works"
          title="Four simple steps from enquiry to paid job"
          description="No complicated software speak — just a clear path from website chat to money in the bank."
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#facc15] text-lg font-bold text-[#0f2744]">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-bold text-[#0f2744]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
