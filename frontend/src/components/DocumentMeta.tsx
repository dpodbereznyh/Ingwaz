import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildHomeFaqPageJsonLd, HOME_FAQ_JSON_LD_SCRIPT_ID } from '../seo/homeFaq'
import { buildOrganizationJsonLd, ogImageUrl, resolvePageSeo, siteBaseUrl } from '../seo/metaConfig'

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string): void {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeCanonical(): void {
  document.head.querySelector('link[rel="canonical"]')?.remove()
}

function upsertJsonLdScript(id: string, data: object | null): void {
  const existing = document.getElementById(id)
  if (data === null) {
    existing?.remove()
    return
  }
  const el = (existing ?? document.createElement('script')) as HTMLScriptElement
  el.id = id
  el.type = 'application/ld+json'
  el.textContent = JSON.stringify(data)
  if (!existing) {
    document.head.appendChild(el)
  }
}

const ORG_JSON_LD_ID = 'ingwaz-jsonld-organization'

export function DocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = resolvePageSeo(pathname)
    const base = siteBaseUrl()
    const path = pathname === '/' ? '' : pathname
    const canonical = base ? `${base}${path}` : ''
    const image = ogImageUrl()

    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    if (seo.keywords.trim() !== '') {
      upsertMeta('name', 'keywords', seo.keywords)
    } else {
      document.head.querySelector('meta[name="keywords"]')?.remove()
    }
    upsertMeta('name', 'robots', seo.robots ?? 'index, follow')

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:locale', 'ru_RU')
    if (canonical) {
      upsertMeta('property', 'og:url', canonical)
      upsertCanonical(canonical)
    } else {
      removeCanonical()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }
    if (image) {
      upsertMeta('property', 'og:image', image)
    } else {
      document.head.querySelector('meta[property="og:image"]')?.remove()
    }

    if (base) {
      upsertJsonLdScript(ORG_JSON_LD_ID, buildOrganizationJsonLd(base))
    } else {
      upsertJsonLdScript(ORG_JSON_LD_ID, null)
    }

    if (pathname === '/' && base) {
      upsertJsonLdScript(HOME_FAQ_JSON_LD_SCRIPT_ID, buildHomeFaqPageJsonLd())
    } else {
      upsertJsonLdScript(HOME_FAQ_JSON_LD_SCRIPT_ID, null)
    }
  }, [pathname])

  return null
}
