import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import { PageMetaContext } from './lib/pageMetaContext.js'
import { buildPageMeta, renderHeadTags } from './lib/seo.js'

export function render(url) {
  const metaCollector = { current: null }
  const appHtml = renderToString(
    <PageMetaContext.Provider value={metaCollector}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </PageMetaContext.Provider>,
  )

  const pageMeta = metaCollector.current ?? buildPageMeta({ path: url })

  return {
    appHtml,
    headTags: renderHeadTags(pageMeta),
  }
}
