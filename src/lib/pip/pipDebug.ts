/** Temporary dev logging for Pip render-path debugging. */
export function pipDebugLog(label: string, data: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    console.debug(`[Pip] ${label}`, data)
  }
}
