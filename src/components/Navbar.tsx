import { Button } from './ui/Button'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why QuoteOS', href: '#benefits' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07080d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <a
          href="#"
          className="group flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/30 bg-gradient-to-br from-violet-600/20 to-cyan-500/10 text-sm font-bold tracking-tight text-violet-300 shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-shadow duration-300 group-hover:shadow-[0_0_28px_rgba(124,58,237,0.35)]">
            Q
          </span>
          <div className="text-left leading-tight">
            <span className="block text-base font-semibold tracking-tight text-slate-50">
              QuoteOS
            </span>
            <span className="hidden text-[11px] text-slate-500 sm:block">
              Powered by DOS
            </span>
          </div>
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors duration-200 hover:text-slate-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href="https://directiveos.com.au"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            className="hidden min-[400px]:inline-flex"
          >
            <span className="sm:hidden">DOS</span>
            <span className="hidden sm:inline">Powered by DOS</span>
          </Button>
          <Button
            href="https://app.quoteos.com.au"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
          >
            Launch App
          </Button>
        </div>
      </div>
    </header>
  )
}
