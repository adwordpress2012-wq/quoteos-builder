import { useCallback, useEffect, useState } from 'react'
import {
  clearSetupStorage,
  defaultSetupConfig,
  loadSetupFromStorage,
  saveSetupToStorage,
  type SqbaSetupConfig,
} from '../lib/quoteos/setup-wizard'

export function useSetupWizard() {
  const [setup, setSetup] = useState<SqbaSetupConfig>(() => {
    return loadSetupFromStorage() ?? defaultSetupConfig()
  })
  const [wizardOpen, setWizardOpen] = useState(false)
  const [setupSuccess, setSetupSuccess] = useState(false)

  useEffect(() => {
    if (setup.completed) {
      saveSetupToStorage(setup)
    }
  }, [setup])

  const updateSetup = useCallback((patch: Partial<SqbaSetupConfig>) => {
    setSetup((prev) => ({ ...prev, ...patch }))
  }, [])

  const completeSetup = useCallback((config: SqbaSetupConfig) => {
    const completed: SqbaSetupConfig = {
      ...config,
      completed: true,
      completedAt: new Date().toISOString(),
    }
    setSetup(completed)
    saveSetupToStorage(completed)
    setSetupSuccess(true)
    setWizardOpen(false)
    window.setTimeout(() => setSetupSuccess(false), 6000)
  }, [])

  const resetSetup = useCallback(() => {
    clearSetupStorage()
    setSetup(defaultSetupConfig())
    setSetupSuccess(false)
    setWizardOpen(true)
  }, [])

  const openWizard = useCallback(() => setWizardOpen(true), [])
  const closeWizard = useCallback(() => setWizardOpen(false), [])

  return {
    setup,
    wizardOpen,
    setupSuccess,
    updateSetup,
    completeSetup,
    resetSetup,
    openWizard,
    closeWizard,
    setWizardOpen,
  }
}
