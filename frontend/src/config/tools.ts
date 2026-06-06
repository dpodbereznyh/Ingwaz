export type PortfolioTool = {
  id: string
  name: string
  description: string
  /** Канонический URL продукта без query-параметров. */
  baseUrl: string
  /** utm_content по умолчанию для списков secondary/maintenance. */
  utmContent: string
  primary?: boolean
}

const UTM_SOURCE = 'ingwaz'
const UTM_MEDIUM = 'portal'
const UTM_CAMPAIGN = 'root'

/** Собирает исходящую ссылку с UTM (см. YANDEX-SEO-GROWTH-PLAN, аналитика apex). */
export function outboundUrl(baseUrl: string, utmContent: string): string {
  const url = new URL(baseUrl)
  url.searchParams.set('utm_source', UTM_SOURCE)
  url.searchParams.set('utm_medium', UTM_MEDIUM)
  url.searchParams.set('utm_campaign', UTM_CAMPAIGN)
  url.searchParams.set('utm_content', utmContent)
  return url.toString()
}

export function toolUrl(tool: PortfolioTool, utmContent?: string): string {
  return outboundUrl(tool.baseUrl, utmContent ?? tool.utmContent)
}

export const PORTFOLIO_TOOLS: PortfolioTool[] = [
  {
    id: 'commentsignal',
    name: 'CommentSignal',
    description: 'Инсайты из комментариев и обратной связи: темы, вопросы аудитории, идеи для следующих выпусков.',
    baseUrl: 'https://commentsignal.ingwaz.space',
    utmContent: 'secondary_commentsignal',
    primary: true,
  },
  {
    id: 'seobrief',
    name: 'SEO Brief Generator',
    description: 'Структурированный SEO-бриф для экспертных статей: заголовки, намерение запроса, семантика и чеклист без агентского перегруза.',
    baseUrl: 'https://seobrief.ingwaz.space',
    utmContent: 'secondary_seobrief',
  },
  {
    id: 'compsnap',
    name: 'Competitor Snapshot',
    description: 'Обзор конкурентов на одной странице: позиционирование, офферы и отличия без ручного ресёрча.',
    baseUrl: 'https://compsnap.ingwaz.space',
    utmContent: 'secondary_compsnap',
  },
  {
    id: 'metadatapack',
    name: 'Metadata Pack',
    description: 'YouTube metadata pack из транскрипта: заголовки, описание, главы и закреп.',
    baseUrl: 'https://metadatapack.ingwaz.space',
    utmContent: 'secondary_metadatapack',
  },
  {
    id: 'service-aeo',
    name: 'AEO Audit',
    description: 'AEO-аудит: видимость сайта в ChatGPT, Perplexity и нейропоиске.',
    baseUrl: 'https://service-aeo-audit.ingwaz.space',
    utmContent: 'secondary_aeo',
  },
  {
    id: 'offerstack',
    name: 'OfferStack Audit',
    description: 'Аудит продуктовой линейки: 2–5 URL → лестница офферов, пробелы, CTA.',
    baseUrl: 'https://offer-stack.ingwaz.space',
    utmContent: 'secondary_offerstack',
  },
]

export const MAINTENANCE_TOOLS: PortfolioTool[] = [
  {
    id: 'landingcritic',
    name: 'Landing Critic AI',
    description: 'Разбор лендинга и рекомендации по улучшению.',
    baseUrl: 'https://landingcriticai.ingwaz.space',
    utmContent: 'maintenance_landingcritic',
  },
  {
    id: 'invoice',
    name: 'Invoice & Proposal Builder',
    description: 'Счета и коммерческие предложения.',
    baseUrl: 'https://invoicekit.ingwaz.space',
    utmContent: 'maintenance_invoice',
  },
  {
    id: 'quiz',
    name: 'Quiz',
    description: 'Онлайн-квизы с прогрессией (B2C).',
    baseUrl: 'https://quiz.ingwaz.space',
    utmContent: 'maintenance_quiz',
  },
]

export const PRIMARY_TOOL = PORTFOLIO_TOOLS.find((t) => t.primary)!

/** utm_content для главного CTA и блока доказательства. */
export const UTM_CONTENT = {
  HERO_PRIMARY: 'hero_primary',
  SCREENSHOT_CTA: 'screenshot_cta',
  SCREENSHOT_IMAGE: 'screenshot_image',
} as const
