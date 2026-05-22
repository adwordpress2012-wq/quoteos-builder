import { cn } from '../../lib/utils'

type QuoteOsLogoProps = {
  /** @deprecated Logo artwork includes tagline; kept for API compatibility */
  showTagline?: boolean
  /** Icon-only mark (sidebar / tight spaces) */
  compact?: boolean
  className?: string
  /** Navbar / footer sizing preset */
  size?: 'sm' | 'md' | 'lg' | 'nav'
}

const sizeClasses = {
  sm: 'h-9 w-auto sm:h-10',
  md: 'h-10 w-auto sm:h-11 md:h-12',
  lg: 'h-11 w-auto sm:h-12 md:h-14 lg:h-[3.75rem]',
  /** Marketing navbar — mobile 52px → desktop 96px */
  nav: 'h-[3.25rem] w-auto sm:h-14 md:h-[4.75rem] lg:h-20 xl:h-24 max-w-none',
} as const

const iconSizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9 sm:h-10 sm:w-10',
  lg: 'h-10 w-10 sm:h-11 sm:w-11',
} as const

export function QuoteOsLogo({
  compact = false,
  className,
  size = 'lg',
}: QuoteOsLogoProps) {
  if (compact) {
    return (
      <img
        src="/qos-logo-icon.png"
        alt="QOS Hub"
        width={44}
        height={44}
        decoding="async"
        className={cn(
          'shrink-0 object-contain object-center',
          iconSizeClasses[size === 'nav' ? 'lg' : size],
          className,
        )}
      />
    )
  }

  return (
    <img
      src="/qos-logo-full.png"
      alt="QOS Hub — Quote, Book, Grow"
      width={560}
      height={373}
      decoding="async"
      className={cn(
        'shrink-0 object-contain object-left',
        size === 'nav'
          ? sizeClasses.nav
          : cn('max-w-[min(100%,17.5rem)]', sizeClasses[size]),
        className,
      )}
    />
  )
}
