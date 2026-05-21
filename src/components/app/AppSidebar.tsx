import { Link } from 'react-router-dom'
import {
  Bell,
  BookOpen,
  FileText,
  LayoutTemplate,
  Plus,
  Settings,
  Users,
} from 'lucide-react'
import { cn } from '../../lib/utils'

const NAV_ITEMS = [
  { icon: FileText, label: 'Quotes', href: '/app/builder', disabled: false },
  { icon: Users, label: 'Clients', href: '/app/builder', disabled: true },
  {
    icon: Bell,
    label: 'Follow Ups',
    href: '/app/builder',
    badge: 3,
    disabled: true,
  },
  { icon: LayoutTemplate, label: 'Templates', href: '/app/builder', disabled: true },
  { icon: BookOpen, label: 'Pricing Guide', href: '/app/builder', disabled: true },
  { icon: Settings, label: 'Settings', href: '/app/builder', disabled: true },
] as const

type AppSidebarProps = {
  onNewQuote: () => void
  className?: string
}

export function AppSidebar({ onNewQuote, className }: AppSidebarProps) {
  return (
    <aside
      className={cn(
        'hidden w-[220px] shrink-0 flex-col border-r border-[var(--qos-border)] bg-[rgba(5,5,16,0.6)] backdrop-blur-xl lg:flex print:hidden',
        className,
      )}
    >
      <div className="flex flex-1 flex-col px-3 py-5">
        <button
          type="button"
          onClick={onNewQuote}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-purple-400/40 bg-gradient-to-r from-purple-600/40 to-blue-600/35 px-4 text-sm font-semibold text-white shadow-[var(--qos-glow-purple)] transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Quote
        </button>

        <nav className="mt-6 space-y-1" aria-label="Builder navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              badge={'badge' in item ? item.badge : undefined}
              disabled={item.disabled}
            />
          ))}
        </nav>
      </div>

      <div className="border-t border-blue-500/15 px-4 py-4">
        <a
          href="https://directiveos.com.au"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-[11px] font-medium uppercase tracking-wider text-slate-500 transition-colors hover:text-cyan-300"
        >
          Powered by DOS
        </a>
      </div>
    </aside>
  )
}

function NavLink({
  icon: Icon,
  label,
  href,
  badge,
  disabled,
}: {
  icon: typeof FileText
  label: string
  href: string
  badge?: number
  disabled?: boolean
}) {
  const content = (
    <>
      <Icon className="h-4 w-4 shrink-0 text-cyan-400/80" aria-hidden="true" />
      <span className="flex-1 text-left">{label}</span>
      {badge != null ? (
        <span className="rounded-full bg-purple-500/25 px-2 py-0.5 text-[10px] font-bold text-purple-200">
          {badge}
        </span>
      ) : null}
    </>
  )

  const className = cn(
    'flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
    disabled
      ? 'cursor-default text-slate-500 opacity-70'
      : 'text-slate-300 hover:bg-white/[0.04] hover:text-cyan-100',
  )

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {content}
      </span>
    )
  }

  return (
    <Link to={href} className={className}>
      {content}
    </Link>
  )
}
