import { ExternalLink } from 'lucide-react'

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Industries', href: '#industries' },
  { label: 'Launch App', href: 'https://app.quoteos.com.au' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--qos-border)] bg-[var(--qos-bg)]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/35 bg-gradient-to-br from-blue-600/25 to-purple-500/15 text-sm font-bold text-cyan-200 shadow-[var(--qos-glow-blue)]">
              Q
            </span>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-50">
                QuoteOS <span className="font-normal text-slate-400">by DOS</span>
              </p>
            </div>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
            aria-label="Footer navigation"
          >
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="text-slate-400 transition-colors duration-200 hover:text-cyan-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="https://directiveos.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--qos-border)] bg-white/[0.03] px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:border-blue-400/45 hover:text-cyan-100 hover:shadow-[var(--qos-glow-blue)]"
          >
            Visit Directive OS
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 border-t border-blue-500/10 pt-8 text-center text-xs leading-relaxed text-slate-500 sm:text-left">
          <p>
            © {year} QuoteOS — Powered by DOS. All rights reserved. Directive
            Operating Systems Pty Ltd
          </p>
        </div>
      </div>
    </footer>
  )
}
