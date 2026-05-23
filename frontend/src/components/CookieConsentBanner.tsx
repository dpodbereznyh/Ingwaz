import { Link } from 'react-router-dom'
import { isYandexMetrikaEnabled } from '../analytics/yandexMetrika'
import { useConsent } from '../consent/ConsentContext'

export function CookieConsentBanner() {
  const { analyticsConsent, acceptAnalytics, rejectAnalytics } = useConsent()

  if (analyticsConsent !== 'unknown') {
    return null
  }

  const analyticsAvailable = isYandexMetrikaEnabled

  return (
    <div className="cookie-consent" role="dialog" aria-modal="false" aria-label="Уведомление о куки">
      <div className="cookie-consent-inner">
        <div className="cookie-consent-text">
          <p className="cookie-consent-title">Мы используем куки</p>
          <p className="cookie-consent-body">
            Нужные куки нужны для работы сайта.
            {analyticsAvailable ? (
              <>
                {' '}
                Для статистики посещений используется Яндекс.Метрика. Ниже можно зафиксировать отношение к аналитике в
                соответствии с политикой.
              </>
            ) : (
              <> Сторонняя аналитика на сайте сейчас отключена.</>
            )}{' '}
            Подробности — в{' '}
            <Link to="/privacy" className="cookie-consent-link">
              политике конфиденциальности
            </Link>{' '}
            и{' '}
            <Link to="/cookies" className="cookie-consent-link">
              описании куки
            </Link>
            .
          </p>
        </div>
        <div className="cookie-consent-actions">
          {analyticsAvailable ? (
            <>
              <button type="button" className="cookie-consent-button cookie-consent-button--ghost" onClick={rejectAnalytics}>
                Только необходимые
              </button>
              <button type="button" className="cookie-consent-button cookie-consent-button--primary" onClick={acceptAnalytics}>
                Принять аналитику
              </button>
            </>
          ) : (
            <button type="button" className="cookie-consent-button cookie-consent-button--primary" onClick={rejectAnalytics}>
              Понятно
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
