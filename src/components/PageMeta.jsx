import { useEffect } from 'react'
import { defaultMeta, siteUrl } from '../content/siteContent.js'

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
  description = defaultMeta.description,
  path = '/',
  image = defaultMeta.image,
  imageAlt = defaultMeta.imageAlt,
  type = 'website',
  noIndex = false,
  structuredData = null,
}) {
  useEffect(() => {
    const canonicalUrl = new URL(path, siteUrl).toString()
    const imageUrl = new URL(image, siteUrl).toString()
    const pageTitle = title ? `${title} | ${defaultMeta.title}` : defaultMeta.title
    const robots = noIndex ? 'noindex,nofollow' : 'index,follow'
    const breadcrumbSchema =
      !noIndex && title && path !== '/'
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: defaultMeta.title,
                item: siteUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: title,
                item: canonicalUrl,
              },
            ],
          }
        : null
    const structuredDataItems = [
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
      ...(Array.isArray(structuredData) ? structuredData : [structuredData]).filter(Boolean),
    ]

    document.title = pageTitle

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: defaultMeta.title,
    })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: pageTitle })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
    upsertMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: imageAlt,
    })
    upsertMeta('meta[name="author"]', {
      name: 'author',
      content: defaultMeta.title,
    })
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: pageTitle })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    })
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl })
    upsertLink('link[rel="alternate"][hreflang="fr-FR"]', {
      rel: 'alternate',
      hrefLang: 'fr-FR',
      href: canonicalUrl,
    })
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: canonicalUrl,
    })
    syncStructuredData(structuredDataItems)
  }, [description, image, imageAlt, noIndex, path, structuredData, title, type])

  return null
}
