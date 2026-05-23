import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  clearStoredCookieConsent,
  readStoredCookieConsent,
  writeStoredCookieConsent,
  type AnalyticsConsent,
} from './cookieConsent'

type ConsentContextValue = {
  analyticsConsent: AnalyticsConsent
  acceptAnalytics: () => void
  rejectAnalytics: () => void
  resetConsent: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

function readInitialAnalyticsConsent(): AnalyticsConsent {
  const stored = readStoredCookieConsent()
  if (!stored) {
    return 'unknown'
  }
  return stored.analytics
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [analyticsConsent, setAnalyticsConsent] = useState<AnalyticsConsent>(() => readInitialAnalyticsConsent())

  const acceptAnalytics = useCallback(() => {
    writeStoredCookieConsent('granted')
    setAnalyticsConsent('granted')
  }, [])

  const rejectAnalytics = useCallback(() => {
    writeStoredCookieConsent('denied')
    setAnalyticsConsent('denied')
  }, [])

  const resetConsent = useCallback(() => {
    clearStoredCookieConsent()
    setAnalyticsConsent('unknown')
  }, [])

  const value = useMemo(
    () => ({ analyticsConsent, acceptAnalytics, rejectAnalytics, resetConsent }),
    [analyticsConsent, acceptAnalytics, rejectAnalytics, resetConsent],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return ctx
}
