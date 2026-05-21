import { Button } from './ui/Button'

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Industries', href: '#industries' },
  { label: 'Launch App', href: 'https://app.quoteos.com.au' },
  { label: 'DOS', href: 'https://directiveos.com.au' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-[#05060a]">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-600/10 text-sm font-bold text-violet-300">
                Q
              </span>
              <div>
                <p className="text-lg font-semibold text-slate-50">QuoteOS</p>
                <p className="text-xs text-slate-500">
                  Powered by DOS — Directive Operating Systems
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              AI quoting, proposal and follow-up operating system for service
              businesses. Win more jobs with faster quotes and sharper
              communication.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                href="https://app.quoteos.com.au"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                Launch App
              </Button>
              <Button
                href="https://directiveos.com.au"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
              >
                Powered by DOS
              </Button>
            </div>
          </div>

          <nav
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="text-slate-400 transition-colors duration-200 hover:text-slate-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} QuoteOS. All rights reserved.</p>
          <p>
            Built for Australian service businesses ·{' '}
            <a
              href="https://quoteos.com.au"
              className="text-slate-400 transition-colors hover:text-slate-300"
            >
              quoteos.com.au
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
