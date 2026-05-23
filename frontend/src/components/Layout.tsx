import { Outlet } from 'react-router-dom'
import { CookieConsentBanner } from './CookieConsentBanner'
import { DocumentMeta } from './DocumentMeta'
import { SiteFooter } from './SiteFooter'
import { YandexMetrika } from './YandexMetrika'

export function Layout() {
  return (
    <div className="layout">
      <DocumentMeta />
      <YandexMetrika />
      <main className="layout-main">
        <Outlet />
      </main>
      <SiteFooter />
      <CookieConsentBanner />
    </div>
  )
}
