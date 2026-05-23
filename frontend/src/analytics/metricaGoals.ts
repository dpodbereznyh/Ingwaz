/** Идентификаторы целей — настройте в UI Яндекс.Метрики при подключении счётчика. */
export const METRIKA_GOALS = {
  CONSENT_ANALYTICS_ACCEPT: 'consent_analytics_accept',
  CTA_COMMENT_SIGNAL: 'cta_comment_signal',
  CTA_OTHER_TOOL: 'cta_other_tool',
} as const

export { reachMetrikaGoal } from './yandexMetrika'
