export const COOKIE_CONSENT_STORAGE_KEY = 'ingwaz:cookie-consent:v1'
export const COOKIE_CONSENT_POLICY_VERSION = 1 as const

export type AnalyticsConsent = 'unknown' | 'granted' | 'denied'

export type StoredCookieConsentV1 = {
  v: 1
  policyVersion: typeof COOKIE_CONSENT_POLICY_VERSION
  analytics: Exclude<AnalyticsConsent, 'unknown'>
  updatedAt: string
}

export function readStoredCookieConsent(): StoredCookieConsentV1 | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    const v = (parsed as { v?: unknown }).v
    const policyVersion = (parsed as { policyVersion?: unknown }).policyVersion
    const analytics = (parsed as { analytics?: unknown }).analytics
    const updatedAt = (parsed as { updatedAt?: unknown }).updatedAt

    if (v !== 1) {
      return null
    }
    if (policyVersion !== COOKIE_CONSENT_POLICY_VERSION) {
      return null
    }
    if (analytics !== 'granted' && analytics !== 'denied') {
      return null
    }
    if (typeof updatedAt !== 'string' || updatedAt.length === 0) {
      return null
    }

    return { v: 1, policyVersion, analytics, updatedAt }
  } catch {
    return null
  }
}

export function writeStoredCookieConsent(analytics: Exclude<AnalyticsConsent, 'unknown'>): StoredCookieConsentV1 {
  const value: StoredCookieConsentV1 = {
    v: 1,
    policyVersion: COOKIE_CONSENT_POLICY_VERSION,
    analytics,
    updatedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(value))
  return value
}

export function clearStoredCookieConsent(): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY)
}
