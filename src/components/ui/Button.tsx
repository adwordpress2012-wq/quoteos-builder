import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--qos-blue)] via-blue-500 to-[var(--qos-purple)] text-white border border-blue-400/40 shadow-[var(--qos-glow-blue),0_8px_32px_rgba(139,92,246,0.25)] hover:-translate-y-0.5 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 hover:shadow-[0_0_36px_rgba(59,130,246,0.6),0_0_48px_rgba(139,92,246,0.35),0_12px_40px_rgba(0,0,0,0.35)] active:translate-y-0',
  secondary:
    'bg-transparent text-slate-100 border border-[var(--qos-border)] backdrop-blur-md hover:-translate-y-0.5 hover:bg-white/[0.04] hover:border-blue-400/45 hover:shadow-[var(--qos-glow-blue)] active:translate-y-0',
  ghost:
    'text-slate-400 hover:text-cyan-200 hover:bg-blue-500/[0.06]',
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
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400',
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
