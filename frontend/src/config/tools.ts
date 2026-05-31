export type PortfolioTool = {
  id: string
  name: string
  description: string
  href: string
  primary?: boolean
}

const UTM = 'utm_source=ingwaz&utm_medium=portal&utm_campaign=root'

function withUtm(baseUrl: string): string {
  const sep = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${sep}${UTM}`
}

export const PORTFOLIO_TOOLS: PortfolioTool[] = [
  {
    id: 'commentsignal',
    name: 'CommentSignal',
    description: 'Инсайты из комментариев и обратной связи: темы, вопросы аудитории, идеи для следующих выпусков.',
    href: withUtm('https://commentsignal.ingwaz.space'),
    primary: true,
  },
  {
    id: 'seobrief',
    name: 'SEO Brief Generator',
    description: 'Структурированный SEO-бриф для экспертных статей: заголовки, намерение запроса, семантика и чеклист без агентского перегруза.',
    href: withUtm('https://seobrief.ingwaz.space'),
  },
  {
    id: 'compsnap',
    name: 'Competitor Snapshot',
    description: 'Обзор конкурентов на одной странице: позиционирование, офферы и отличия без ручного ресёрча.',
    href: withUtm('https://compsnap.ingwaz.space'),
  },
  {
    id: 'metadatapack',
    name: 'Metadata Pack',
    description: 'YouTube metadata pack из транскрипта: заголовки, описание, главы и закреп.',
    href: withUtm('https://metadatapack.ingwaz.space'),
  },
  {
    id: 'service-aeo',
    name: 'AEO Audit',
    description: 'AEO-аудит: видимость сайта в ChatGPT, Perplexity и нейропоиске.',
    href: withUtm('https://service-aeo-audit.ingwaz.space'),
  },
  {
    id: 'offerstack',
    name: 'OfferStack Audit',
    description: 'Аудит продуктовой линейки: 2–5 URL → лестница офферов, пробелы, CTA.',
    href: withUtm('https://offer-stack.ingwaz.space'),
  },
]

export const MAINTENANCE_TOOLS: PortfolioTool[] = [
  {
    id: 'landingcritic',
    name: 'Landing Critic AI',
    description: 'Разбор лендинга и рекомендации по улучшению.',
    href: withUtm('https://landingcriticai.ingwaz.space'),
  },
  {
    id: 'invoice',
    name: 'Invoice & Proposal Builder',
    description: 'Счета и коммерческие предложения.',
    href: withUtm('https://invoicekit.ingwaz.space'),
  },
  {
    id: 'quiz',
    name: 'Quiz',
    description: 'Онлайн-квизы с прогрессией (B2C).',
    href: withUtm('https://quiz.ingwaz.space'),
  },
]

export const PRIMARY_TOOL = PORTFOLIO_TOOLS.find((t) => t.primary)!
