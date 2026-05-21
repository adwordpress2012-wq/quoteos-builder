import { cn } from '../../lib/utils'

type QuoteOsLogoProps = {
  showTagline?: boolean
  compact?: boolean
  className?: string
}

export function QuoteOsLogo({
  showTagline = true,
  compact = false,
  className,
}: QuoteOsLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <svg
        width={compact ? 36 : 40}
        height={compact ? 36 : 40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="40" height="40" rx="10" fill="#1d4ed8" />
        <path
          d="M10 14c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v5.5c0 .83-.67 1.5-1.5 1.5H25l-4.2 3.15a1 1 0 01-1.6-.8V21h-5c-2.21 0-4-1.79-4-4V14z"
          fill="#fff"
        />
        <path
          d="M17.5 17.75l2 2 4.25-4.5"
          stroke="#1d4ed8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="text-left leading-tight">
        <span
          className={cn(
            'block font-bold tracking-tight text-[#0f2744]',
            compact ? 'text-sm' : 'text-base sm:text-lg',
          )}
        >
          QuoteOS
        </span>
        {showTagline ? (
          <span className="block text-[10px] font-medium text-[#2563eb] sm:text-[11px]">
            AI Quoting Assistant
          </span>
        ) : null}
      </div>
    </div>
  )
}
