import { defaultMeta, siteUrl } from '../content/siteContent.js'

function normalizeStructuredData(structuredData) {
  return (Array.isArray(structuredData) ? structuredData : [structuredData]).filter(Boolean)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function serializeJsonLd(item) {
  return JSON.stringify(item).replace(/</g, '\\u003c')
}

export function buildPageMeta({
  title,
  description = defaultMeta.description,
  path = '/',
  image = defaultMeta.image,
  imageAlt = defaultMeta.imageAlt,
  type = 'website',
  noIndex = false,
  structuredData = null,
}) {
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

  return {
    canonicalUrl,
    description,
    imageAlt,
    imageUrl,
    pageTitle,
    robots,
    structuredDataItems: [
      ...(breadcrumbSchema ? [breadcrumbSchema] : []),
      ...normalizeStructuredData(structuredData),
    ],
    type,
  }
}

export function renderHeadTags(meta) {
  const metaTags = [
    { name: 'description', content: meta.description },
    { name: 'robots', content: meta.robots },
    { name: 'author', content: defaultMeta.title },
    { property: 'og:type', content: meta.type },
    { property: 'og:site_name', content: defaultMeta.title },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:title', content: meta.pageTitle },
    { property: 'og:description', content: meta.description },
    { property: 'og:url', content: meta.canonicalUrl },
    { property: 'og:image', content: meta.imageUrl },
    { property: 'og:image:alt', content: meta.imageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.pageTitle },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.imageUrl },
  ]

  const linkTags = [
    { rel: 'canonical', href: meta.canonicalUrl },
    { rel: 'alternate', hrefLang: 'fr-FR', href: meta.canonicalUrl },
    { rel: 'alternate', hrefLang: 'x-default', href: meta.canonicalUrl },
  ]

  const structuredDataTags = meta.structuredDataItems.map(
    (item) => `<script type="application/ld+json">${serializeJsonLd(item)}</script>`,
  )

  return [
    `<title>${escapeHtml(meta.pageTitle)}</title>`,
    ...metaTags.map((tag) => {
      const key = tag.name ? 'name' : 'property'
      return `<meta ${key}="${escapeHtml(tag[key])}" content="${escapeHtml(tag.content)}" />`
    }),
    ...linkTags.map(
      (tag) =>
        `<link rel="${escapeHtml(tag.rel)}" href="${escapeHtml(tag.href)}"${
          tag.hrefLang ? ` hreflang="${escapeHtml(tag.hrefLang)}"` : ''
        } />`,
    ),
    ...structuredDataTags,
  ].join('\n    ')
}
