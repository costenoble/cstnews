import { useContext, useEffect } from 'react'
import { PageMetaContext } from '../lib/pageMetaContext.js'
import { buildPageMeta } from '../lib/seo.js'

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function syncStructuredData(items) {
  document.head
    .querySelectorAll('script[data-page-meta-jsonld="true"]')
    .forEach((node) => node.remove())

  items.forEach((item) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-page-meta-jsonld', 'true')
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  })
}

export default function PageMeta({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  type = 'website',
  noIndex = false,
  structuredData = null,
}) {
  const pageMeta = buildPageMeta({
    title,
    description,
    path,
    image,
    imageAlt,
    type,
    noIndex,
    structuredData,
  })
  const metaContext = useContext(PageMetaContext)
  const structuredDataKey = JSON.stringify(pageMeta.structuredDataItems)

  if (metaContext) {
    metaContext.current = pageMeta
  }

  useEffect(() => {
    document.title = pageMeta.pageTitle

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: pageMeta.description,
    })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: pageMeta.robots })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: pageMeta.type })
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: 'CSTLAB',
    })
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: 'fr_FR',
    })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageMeta.pageTitle })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: pageMeta.description,
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: pageMeta.canonicalUrl })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: pageMeta.imageUrl })
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: pageMeta.imageAlt,
    })
    upsertMeta('meta[name="author"]', {
      name: 'author',
      content: 'CSTLAB',
    })
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageMeta.pageTitle })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: pageMeta.description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: pageMeta.imageUrl,
    })
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: pageMeta.canonicalUrl })
    upsertLink('link[rel="alternate"][hreflang="fr-FR"]', {
      rel: 'alternate',
      hrefLang: 'fr-FR',
      href: pageMeta.canonicalUrl,
    })
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: pageMeta.canonicalUrl,
    })
    syncStructuredData(pageMeta.structuredDataItems)
  }, [
    pageMeta.canonicalUrl,
    pageMeta.description,
    pageMeta.imageAlt,
    pageMeta.imageUrl,
    pageMeta.pageTitle,
    pageMeta.robots,
    pageMeta.type,
    structuredDataKey,
  ])

  return null
}
