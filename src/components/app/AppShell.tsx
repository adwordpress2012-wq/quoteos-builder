import type { ReactNode } from 'react'
import { AppHeader } from './AppHeader'

type AppShellProps = {
  children: ReactNode
  showBuilderNav?: boolean
}

export function AppShell({ children, showBuilderNav }: AppShellProps) {
  return (
    <div className="min-h-svh bg-quoteos-page text-slate-300 antialiased">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-quoteos-noise opacity-30 mix-blend-overlay"
        aria-hidden="true"
      />
      <AppHeader showBuilderNav={showBuilderNav} />
      {children}
    </div>
  )
}
