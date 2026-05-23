/** Default 0 — задайте отдельный счётчик в VITE_YANDEX_METRIKA_ID перед продом. */
const rawId = import.meta.env.VITE_YANDEX_METRIKA_ID ?? '0'
const COUNTER_ID = rawId ? Number.parseInt(String(rawId).replace(/\s/g, ''), 10) : Number.NaN

export const isYandexMetrikaEnabled = Number.isFinite(COUNTER_ID) && COUNTER_ID > 0

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

let injected = false

export function initYandexMetrika(): void {
  if (!isYandexMetrikaEnabled || injected || typeof window === 'undefined') {
    return
  }
  injected = true

  const id = COUNTER_ID
  const src = `https://mc.yandex.ru/metrika/tag.js?id=${id}`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- external script contract
  ;(function (m: any, e: Document, t: string, r: string, i: string, k?: HTMLScriptElement, a?: HTMLElement) {
    m[i] =
      m[i] ||
      function (...args: unknown[]) {
        ;(m[i].a = m[i].a || []).push(args)
      }
    m[i].l = Date.now()
    for (let j = 0; j < e.scripts.length; j++) {
      if (e.scripts[j].src === r) {
        return
      }
    }
    k = e.createElement(t) as HTMLScriptElement
    a = e.getElementsByTagName(t)[0] as HTMLElement
    k.async = true
    k.src = r
    a.parentNode!.insertBefore(k, a)
  })(window, document, 'script', src, 'ym')

  window.dataLayer = window.dataLayer ?? []

  window.ym?.(id, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
}

export function yandexMetrikaHit(url?: string): void {
  if (!isYandexMetrikaEnabled || typeof window === 'undefined') {
    return
  }
  const u = url ?? window.location.href
  window.ym?.(COUNTER_ID, 'hit', u)
}

export function reachMetrikaGoal(targetName: string, params?: Record<string, unknown>): void {
  if (!isYandexMetrikaEnabled || typeof window === 'undefined') {
    return
  }
  if (params !== undefined && Object.keys(params).length > 0) {
    window.ym?.(COUNTER_ID, 'reachGoal', targetName, params)
  } else {
    window.ym?.(COUNTER_ID, 'reachGoal', targetName)
  }
}
