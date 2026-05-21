const industries = [
  'Plumbers',
  'Electricians',
  'Painters',
  'Fencing',
  'Landscapers',
  'Agencies',
  'Consultants',
]

export function Industries() {
  return (
    <section
      id="industries"
      className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-violet-400">
              Built for service businesses
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              From the van to the boardroom
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Whether you are on the tools or running a client services team,
              QuoteOS adapts to how you quote, communicate and follow up.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {industries.map((name) => (
              <li key={name}>
                <span className="inline-block rounded-full border border-white/10 bg-[#07080d]/80 px-4 py-2 text-sm text-slate-300 transition-colors duration-200 hover:border-violet-500/30 hover:text-slate-100">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
