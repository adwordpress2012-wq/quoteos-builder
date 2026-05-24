import { useCallback, useEffect, useState } from 'react'
import { PIP_DEFAULT_PREFERENCES, PIP_STORAGE_KEY } from './constants'
import { pipDebugLog } from './pipDebug'
import {
  readPipPreferences,
  updatePipPreferences,
  writePipPreferences,
} from './pipPreferences'
import type { PipDisplayMode, PipPreferences } from '../../types/pip'

export function usePipPreferences() {
  const [prefs, setPrefs] = useState<PipPreferences>(PIP_DEFAULT_PREFERENCES)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readPipPreferences()
    setPrefs(stored)
    setHydrated(true)
    pipDebugLog('preferences hydrated', { storageKey: PIP_STORAGE_KEY, stored })

    function onStorage(e: StorageEvent) {
      if (e.key === PIP_STORAGE_KEY) {
        setPrefs(readPipPreferences())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const isEnabled = prefs.displayMode !== 'off'
  const isFull = prefs.displayMode === 'full'
  const isMinimal = prefs.displayMode === 'minimal'

  const setDisplayMode = useCallback((displayMode: PipDisplayMode) => {
    setPrefs(updatePipPreferences({ displayMode }))
  }, [])

  const setMinimized = useCallback((minimized: boolean) => {
    setPrefs(updatePipPreferences({ minimized }))
  }, [])

  const resetPreferences = useCallback(() => {
    writePipPreferences(PIP_DEFAULT_PREFERENCES)
    setPrefs({ ...PIP_DEFAULT_PREFERENCES })
  }, [])

  return {
    prefs,
    hydrated,
    isEnabled,
    isFull,
    isMinimal,
    setDisplayMode,
    setMinimized,
    resetPreferences,
  }
}
