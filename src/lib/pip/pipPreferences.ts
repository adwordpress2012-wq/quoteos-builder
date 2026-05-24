import { PIP_DEFAULT_PREFERENCES, PIP_STORAGE_KEY } from './constants'
import type { PipDisplayMode, PipPreferences } from '../../types/pip'

type StoredPipPreferences = Partial<PipPreferences> & {
  enabled?: boolean
}

function parsePreferences(raw: string | null): PipPreferences {
  if (!raw) return { ...PIP_DEFAULT_PREFERENCES }
  try {
    const parsed = JSON.parse(raw) as StoredPipPreferences
    const validModes: PipDisplayMode[] = ['full', 'minimal', 'off']

    let displayMode = parsed.displayMode
    if (!validModes.includes(displayMode as PipDisplayMode)) {
      displayMode = parsed.enabled === false ? 'off' : PIP_DEFAULT_PREFERENCES.displayMode
    }

    return {
      displayMode: displayMode as PipDisplayMode,
      minimized: Boolean(parsed.minimized),
    }
  } catch {
    return { ...PIP_DEFAULT_PREFERENCES }
  }
}

export function readPipPreferences(): PipPreferences {
  if (typeof window === 'undefined') return { ...PIP_DEFAULT_PREFERENCES }
  return parsePreferences(window.localStorage.getItem(PIP_STORAGE_KEY))
}

export function writePipPreferences(next: PipPreferences): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(PIP_STORAGE_KEY, JSON.stringify(next))
}

export function updatePipPreferences(patch: Partial<PipPreferences>): PipPreferences {
  const current = readPipPreferences()
  const next = { ...current, ...patch }
  writePipPreferences(next)
  return next
}
