import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const distDir = resolve(rootDir, 'dist')
const ssrDir = resolve(rootDir, '.prerender')
const templatePath = resolve(distDir, 'index.html')
const serverEntryPath = resolve(ssrDir, 'entry-server.js')

const routes = [
  '/',
  '/services',
  '/projets',
  '/a-propos',
  '/audit',
  '/contact',
  '/mentions-legales',
  '/confidentialite',
  '/cgv',
]

const template = await readFile(templatePath, 'utf8')
const { render } = await import(pathToFileURL(serverEntryPath).href)

for (const route of routes) {
  const { appHtml, headTags } = await render(route)
  const html = template
    .replace('<!--app-head-->', headTags)
    .replace('<!--app-html-->', appHtml)

  const outputPath =
    route === '/'
      ? resolve(distDir, 'index.html')
      : resolve(distDir, route.slice(1), 'index.html')

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html)
}

const notFound = await render('/404')
const notFoundHtml = template
  .replace('<!--app-head-->', notFound.headTags)
  .replace('<!--app-html-->', notFound.appHtml)

await writeFile(resolve(distDir, '404.html'), notFoundHtml)
await rm(ssrDir, { recursive: true, force: true })
