import { QuoteOsLogo } from './brand/QuoteOsLogo'
import { BOOK_DEMO_MAILTO, BUILDER_URL, DOS_URL, navLinks } from '../lib/marketing/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-[#e2e8f0] bg-[#f8fafc]"
    >
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <QuoteOsLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#64748b]">
              AI quoting and booking assistant for plumbers and tradies across
              Australia.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
            aria-label="Footer navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-medium text-[#475569] transition-colors hover:text-[#1d4ed8]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={BUILDER_URL}
              className="font-medium text-[#475569] transition-colors hover:text-[#1d4ed8]"
            >
              Start Free Trial
            </a>
            <a
              href={BOOK_DEMO_MAILTO}
              className="font-medium text-[#475569] transition-colors hover:text-[#1d4ed8]"
            >
              Book Demo
            </a>
          </nav>
        </div>

        <div className="mt-10 border-t border-[#e2e8f0] pt-8 text-center text-sm text-[#64748b] sm:text-left">
          <p className="font-medium text-[#334155]">
            QuoteOS —{' '}
            <a
              href={DOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1d4ed8] hover:underline"
            >
              Powered by DOS
            </a>
          </p>
          <p className="mt-1">Directive Operating Systems Pty Ltd</p>
          <p className="mt-3 text-xs">© {year} QuoteOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
