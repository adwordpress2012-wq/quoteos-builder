import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { QuoteOsLogo } from './brand/QuoteOsLogo'
import { MarketingButton } from './ui/MarketingButton'
import { BOOK_DEMO_URL, navLinks } from '../lib/marketing/constants'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a
          href="#top"
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]"
          onClick={() => setOpen(false)}
        >
          <QuoteOsLogo />
        </a>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#475569] transition-colors hover:text-[#1d4ed8]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
          <MarketingButton
            href={BOOK_DEMO_URL}
            variant="outline"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Demo
          </MarketingButton>
          <MarketingButton
            href={BOOK_DEMO_URL}
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Free Demo
          </MarketingButton>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#0f2744] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[#e2e8f0] bg-white px-5 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#334155] hover:bg-[#f1f5f9] hover:text-[#1d4ed8]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <MarketingButton
              href={BOOK_DEMO_URL}
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Book Free Demo
            </MarketingButton>
            <MarketingButton
              href={BOOK_DEMO_URL}
              variant="outline"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Book Demo
            </MarketingButton>
          </div>
        </div>
      ) : null}
    </header>
  )
}
