/**
 * После `vite build` пишет dist/index.html с SEO для краулеров без JS.
 * Тексты — в одном духе с `src/seo/metaConfig.ts`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DIST_DIR = path.resolve(__dirname, '../dist')
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html')

function loadDotEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return
  const text = fs.readFileSync(filePath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    if (!key || key.includes(' ')) continue
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

loadDotEnvFile(path.join(__dirname, '../.env.production'))

const siteUrlRaw = typeof process.env.VITE_SITE_URL === 'string' ? process.env.VITE_SITE_URL.trim() : ''
const siteUrl = siteUrlRaw.replace(/\/+$/, '')
const ogImageUrl = typeof process.env.VITE_OG_IMAGE_URL === 'string' ? process.env.VITE_OG_IMAGE_URL.trim() : ''

if (siteUrl === '' && process.env.SKIP_VITE_SITE_URL_CHECK !== '1') {
  throw new Error(
    '[prerender-seo] VITE_SITE_URL is required for production SEO (canonical, og:url, JSON-LD).\n' +
      '  Copy frontend/.env.production.example → frontend/.env.production and set the canonical origin.\n' +
      '  Local-only build without SEO: SKIP_VITE_SITE_URL_CHECK=1 npm run build',
  )
}

const SITE_NAME = 'Сигнал аудитории'

const SEO_BY_PATH = {
  '/': {
    title: 'Сигнал аудитории — инструменты для экспертных авторов | ingwaz.space',
    description:
      'CommentSignal и смежные утилиты: инсайты из комментариев и feedback, идеи для контента. Для YouTube и экспертных каналов.',
    keywords:
      'сигнал аудитории, инсайты из комментариев, идеи для контента, youtube комментарии, audience intelligence, CommentSignal',
    robots: 'index, follow',
  },
  '/privacy': {
    title: 'Политика конфиденциальности (черновик) — Сигнал аудитории',
    description:
      'Черновик политики конфиденциальности Сигнал аудитории. Не является финальным юридическим текстом.',
    keywords: 'конфиденциальность, персональные данные',
    robots: 'noindex, follow',
  },
  '/cookies': {
    title: 'Cookies и localStorage (черновик) — Сигнал аудитории',
    description:
      'Черновик описания cookies и localStorage для Сигнал аудитории. Не является финальным юридическим текстом.',
    keywords: 'cookies, localStorage',
    robots: 'noindex, follow',
  },
}

const PRERENDER_PATHS = Object.keys(SEO_BY_PATH)
const ORG_JSONLD_ID = 'ingwaz-jsonld-organization'
const FAQ_JSONLD_ID = 'ingwaz-jsonld-faqpage'

const HOME_FAQ_JSON_PATH = path.join(__dirname, '../src/seo/homeFaq.content.json')
const homeFaqData = JSON.parse(fs.readFileSync(HOME_FAQ_JSON_PATH, 'utf8'))

function buildHomeFaqPageJsonLdFromData(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

if (!fs.existsSync(INDEX_HTML_PATH)) {
  throw new Error(`Cannot prerender SEO: missing file ${INDEX_HTML_PATH}`)
}

const baseTemplate = fs.readFileSync(INDEX_HTML_PATH, 'utf8')

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function upsertTitle(html, title) {
  const titleTag = `<title>${escapeHtml(title)}</title>`
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, titleTag)
  }
  return html.replace('</head>', `  ${titleTag}\n  </head>`)
}

function upsertMeta(html, attr, key, content) {
  const escapedContent = escapeHtml(content)
  const pattern = new RegExp(`<meta\\s+${attr}=["']${escapeRegExp(key)}["'][^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${escapedContent}" />`
  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }
  return html.replace('</head>', `  ${tag}\n  </head>`)
}

function removeMeta(html, attr, key) {
  const pattern = new RegExp(`\\s*<meta\\s+${attr}=["']${escapeRegExp(key)}["'][^>]*>\\s*`, 'ig')
  return html.replace(pattern, '\n')
}

function upsertCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    return html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, tag)
  }
  return html.replace('</head>', `  ${tag}\n  </head>`)
}

function removeCanonical(html) {
  return html.replace(/\s*<link\s+rel=["']canonical["'][^>]*>\s*/gi, '\n')
}

function upsertJsonLd(html, id, dataObject) {
  const payload = JSON.stringify(dataObject)
    .replaceAll('</script>', '<\\/script>')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029')
  const tag = `<script id="${id}" type="application/ld+json">${payload}</script>`
  const pattern = new RegExp(`<script\\s+id=["']${escapeRegExp(id)}["'][\\s\\S]*?<\\/script>`, 'i')
  if (pattern.test(html)) {
    return html.replace(pattern, tag)
  }
  return html.replace('</head>', `  ${tag}\n  </head>`)
}

function removeJsonLd(html, id) {
  const pattern = new RegExp(`\\s*<script\\s+id=["']${escapeRegExp(id)}["'][\\s\\S]*?<\\/script>\\s*`, 'ig')
  return html.replace(pattern, '\n')
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildRouteHtml(routePath) {
  const seo = SEO_BY_PATH[routePath]
  let html = baseTemplate

  html = upsertTitle(html, seo.title)
  html = upsertMeta(html, 'name', 'description', seo.description)
  html = upsertMeta(html, 'name', 'keywords', seo.keywords)
  html = upsertMeta(html, 'name', 'robots', seo.robots)
  html = upsertMeta(html, 'property', 'og:type', 'website')
  html = upsertMeta(html, 'property', 'og:locale', 'ru_RU')
  html = upsertMeta(html, 'property', 'og:title', seo.title)
  html = upsertMeta(html, 'property', 'og:description', seo.description)

  if (siteUrl !== '') {
    const canonical = routePath === '/' ? siteUrl : `${siteUrl}${routePath}`
    html = upsertCanonical(html, canonical)
    html = upsertMeta(html, 'property', 'og:url', canonical)
    html = upsertJsonLd(html, ORG_JSONLD_ID, {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
    })
    if (routePath === '/') {
      html = upsertJsonLd(html, FAQ_JSONLD_ID, buildHomeFaqPageJsonLdFromData(homeFaqData))
    }
  } else {
    html = removeCanonical(html)
    html = removeMeta(html, 'property', 'og:url')
    html = removeJsonLd(html, ORG_JSONLD_ID)
    html = removeJsonLd(html, FAQ_JSONLD_ID)
  }

  if (ogImageUrl !== '') {
    html = upsertMeta(html, 'property', 'og:image', ogImageUrl)
  } else {
    html = removeMeta(html, 'property', 'og:image')
  }

  return html
}

for (const routePath of PRERENDER_PATHS) {
  const html = buildRouteHtml(routePath)
  const outPath =
    routePath === '/'
      ? INDEX_HTML_PATH
      : path.join(DIST_DIR, ...routePath.split('/').filter(Boolean), 'index.html')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, 'utf8')
}

console.log(`[prerender-seo] generated static HTML for: ${PRERENDER_PATHS.join(', ')}`)
