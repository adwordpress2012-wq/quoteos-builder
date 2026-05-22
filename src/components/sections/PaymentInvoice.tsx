import { Banknote, ClipboardList, Smartphone } from 'lucide-react'
import { SectionHeading } from '../marketing/SectionHeading'

const methods = [
  {
    icon: Smartphone,
    title: 'PayID',
    description: 'Fast payment details on every invoice — easy for Aussie customers.',
  },
  {
    icon: Banknote,
    title: 'Bank transfer',
    description: 'BSB and account on the PDF so customers can pay straight away.',
  },
  {
    icon: ClipboardList,
    title: 'Payment reference',
    description: 'Clear payment instructions — no chasing for how to pay.',
  },
]

export function PaymentInvoice() {
  return (
    <section className="bg-[#f8fafc] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Getting paid"
          title="Invoices that work for tradies today"
          description="For MVP, invoices can include PayID, bank transfer, and direct deposit details for a manual-first tradie workflow."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {methods.map((method) => (
            <li
              key={method.title}
              className="rounded-2xl border border-[#e2e8f0] bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#fef9c3] text-[#a16207]">
                <method.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-[#0f2744]">{method.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                {method.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
