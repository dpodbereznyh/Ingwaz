/**
 * SEO: заголовки и описания по маршрутам (см. docs/SEO.md).
 * Индексируемые URL — в INDEXABLE_PATHS и public/sitemap.xml.
 */

export type PageSeo = {
  title: string
  description: string
  keywords: string
  robots?: string
}

const SITE_NAME = 'Сигнал аудитории'

const home: PageSeo = {
  title: 'Сигнал аудитории — инструменты для экспертных авторов | ingwaz.space',
  description:
    'CommentSignal и смежные утилиты: инсайты из комментариев и feedback, идеи для контента. Для YouTube и экспертных каналов.',
  keywords:
    'сигнал аудитории, инсайты из комментариев, идеи для контента, youtube комментарии, audience intelligence, CommentSignal',
  robots: 'index, follow',
}

const privacy: PageSeo = {
  title: `Политика конфиденциальности (черновик) — ${SITE_NAME}`,
  description: `Черновик политики конфиденциальности ${SITE_NAME}. Не является финальным юридическим текстом.`,
  keywords: 'конфиденциальность, персональные данные',
  robots: 'index, follow',
}

const cookies: PageSeo = {
  title: `Cookies и localStorage (черновик) — ${SITE_NAME}`,
  description: `Черновик описания cookies и localStorage для ${SITE_NAME}. Не является финальным юридическим текстом.`,
  keywords: 'cookies, localStorage',
  robots: 'index, follow',
}

const defaultSeo: PageSeo = {
  title: SITE_NAME,
  description: home.description,
  keywords: home.keywords,
  robots: 'index, follow',
}

export function siteBaseUrl(): string {
  const raw = import.meta.env.VITE_SITE_URL
  if (typeof raw !== 'string' || raw.trim() === '') {
    return ''
  }
  return raw.replace(/\/+$/, '')
}

export function ogImageUrl(): string {
  const raw = import.meta.env.VITE_OG_IMAGE_URL
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.trim()
  }
  return ''
}

export function resolvePageSeo(pathname: string): PageSeo {
  if (pathname === '/') {
    return home
  }
  if (pathname === '/privacy') {
    return privacy
  }
  if (pathname === '/cookies') {
    return cookies
  }
  return defaultSeo
}

/** Индексируемые пути — синхронизируйте с public/sitemap.xml и prerender-seo.mjs */
export const INDEXABLE_PATHS = ['/', '/privacy', '/cookies'] as const

export function buildOrganizationJsonLd(baseUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: baseUrl,
  }
}

export { SITE_NAME }
