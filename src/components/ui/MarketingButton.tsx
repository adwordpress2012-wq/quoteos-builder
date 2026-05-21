import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/utils'

type MarketingButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type MarketingButtonSize = 'sm' | 'md' | 'lg'

const variantStyles: Record<MarketingButtonVariant, string> = {
  primary:
    'bg-[#1d4ed8] text-white border border-[#1e40af] shadow-sm hover:bg-[#1e40af] active:bg-[#1e3a8a]',
  secondary:
    'bg-[#facc15] text-[#0f2744] border border-[#eab308] font-semibold hover:bg-[#fde047] active:bg-[#facc15]',
  outline:
    'bg-white text-[#1d4ed8] border-2 border-[#1d4ed8] hover:bg-[#eff6ff] active:bg-[#dbeafe]',
  ghost: 'text-[#334155] hover:text-[#1d4ed8] hover:bg-[#f1f5f9]',
}

const sizeStyles: Record<MarketingButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-lg',
  md: 'h-11 px-5 text-sm rounded-xl',
  lg: 'h-12 px-7 text-base rounded-xl',
}

type MarketingButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: MarketingButtonVariant
  size?: MarketingButtonSize
}

export function MarketingButton({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: MarketingButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
