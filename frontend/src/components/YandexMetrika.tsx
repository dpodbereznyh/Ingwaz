import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { METRIKA_GOALS, reachMetrikaGoal } from '../analytics/metricaGoals'
import { initYandexMetrika, isYandexMetrikaEnabled, yandexMetrikaHit } from '../analytics/yandexMetrika'
import { useConsent } from '../consent/ConsentContext'

export function YandexMetrika() {
  const location = useLocation()
  const { analyticsConsent } = useConsent()
  const skipNextHit = useRef(true)
  const prevConsent = useRef<typeof analyticsConsent | null>(null)

  useEffect(() => {
    if (!isYandexMetrikaEnabled || analyticsConsent !== 'granted') {
      return
    }

    initYandexMetrika()
    queueMicrotask(() => {
      yandexMetrikaHit()
    })
    skipNextHit.current = true
  }, [analyticsConsent])

  useEffect(() => {
    if (!isYandexMetrikaEnabled || analyticsConsent !== 'granted') {
      return
    }
    if (skipNextHit.current) {
      skipNextHit.current = false
      return
    }
    yandexMetrikaHit()
  }, [analyticsConsent, location.pathname, location.search])

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
