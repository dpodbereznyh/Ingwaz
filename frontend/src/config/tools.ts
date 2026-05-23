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
    description: 'SEO-бриф и ТЗ на статью: meta, H1/H2, LSI — для редакции и маркетинга.',
    href: withUtm('https://seobrief.ingwaz.space'),
  },
  {
    id: 'compsnap',
    name: 'Competitor Snapshot',
    description: 'Компактный снимок конкурентов по нише: таблица игроков и цитаты с сайтов.',
    href: withUtm('https://compsnap.ingwaz.space'),
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
    description: 'Счета и коммерческие предложения (EN).',
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
