import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] hover:from-violet-500 hover:to-violet-400 hover:shadow-[0_0_32px_rgba(124,58,237,0.5)] border border-violet-400/30',
  secondary:
    'bg-white/[0.04] text-slate-200 border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20',
  ghost: 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm rounded-lg',
  md: 'h-11 px-5 text-sm rounded-xl',
  lg: 'h-12 px-7 text-base rounded-xl',
}

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400',
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
