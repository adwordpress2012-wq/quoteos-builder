import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'dark' | 'light'

export type TradieSettings = {
  businessName: string
  logoUrl: string
  websiteUrl: string
  businessEmail: string
  phone: string
  payId: string
  bankDetails: string
  brandColour: string
  theme: ThemeMode
  defaultQuoteTerms: string
  defaultInvoiceNotes: string
  calendlyUrl: string
  googleCalendarUrl: string
}

const STORAGE_KEY = 'quoteos-tradie-settings'

export const DEFAULT_TRADIE_SETTINGS: TradieSettings = {
  businessName: 'Luke Plumbing',
  logoUrl: '',
  websiteUrl: 'https://lukeplumbing.com.au',
  businessEmail: 'luke@lukeplumbing.com.au',
  phone: '0412 345 678',
  payId: '0412 345 678',
  bankDetails: 'BSB 000-000 · Acc 12345678 · Luke Plumbing',
  brandColour: '#3b82f6',
  theme: 'dark',
  defaultQuoteTerms:
    '50% deposit to book. Balance due on completion. Quote valid 14 days.',
  defaultInvoiceNotes: 'Thank you for your business. PayID preferred.',
  calendlyUrl: 'https://calendly.com/',
  googleCalendarUrl: 'https://calendar.google.com',
}

function loadSettings(): TradieSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_TRADIE_SETTINGS
    return { ...DEFAULT_TRADIE_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_TRADIE_SETTINGS
  }
}

export function useTradieSettings() {
  const [settings, setSettings] = useState<TradieSettings>(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    document.documentElement.dataset.quoteosTheme = settings.theme
    document.documentElement.style.setProperty(
      '--qos-brand',
      settings.brandColour,
    )
  }, [settings])

  const updateSetting = useCallback(
    <K extends keyof TradieSettings>(key: K, value: TradieSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_TRADIE_SETTINGS)
  }, [])

  return { settings, updateSetting, resetSettings }
}
