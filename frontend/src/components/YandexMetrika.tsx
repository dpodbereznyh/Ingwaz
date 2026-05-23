import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { METRIKA_GOALS, reachMetrikaGoal } from '../analytics/metricaGoals'
import { initYandexMetrika, isYandexMetrikaEnabled, yandexMetrikaHit } from '../analytics/yandexMetrika'
import { useConsent } from '../consent/ConsentContext'

/**
 * SPA page views for Yandex Metrika.
 * Loads when the counter is configured — not gated on cookie consent (product choice).
 */
export function YandexMetrika() {
  const location = useLocation()
  const { analyticsConsent } = useConsent()
  const skipNextHit = useRef(true)
  const prevConsent = useRef<typeof analyticsConsent | null>(null)
  const didMountInit = useRef(false)

  useEffect(() => {
    if (!isYandexMetrikaEnabled || didMountInit.current) {
      return
    }
    didMountInit.current = true
    initYandexMetrika()
    queueMicrotask(() => {
      yandexMetrikaHit()
    })
    skipNextHit.current = true
  }, [])

  useEffect(() => {
    if (!isYandexMetrikaEnabled) {
      return
    }
    if (skipNextHit.current) {
      skipNextHit.current = false
      return
    }
    yandexMetrikaHit()
  }, [location.pathname, location.search])

  useEffect(() => {
    const prev = prevConsent.current
    prevConsent.current = analyticsConsent
    if (!isYandexMetrikaEnabled || analyticsConsent !== 'granted') {
      return
    }
    if (prev !== 'unknown') {
      return
    }
    queueMicrotask(() => {
      reachMetrikaGoal(METRIKA_GOALS.CONSENT_ANALYTICS_ACCEPT)
    })
  }, [analyticsConsent])

  return null
}
