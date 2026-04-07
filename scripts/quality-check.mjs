import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const rootDir = process.cwd()
const errors = []

function read(relPath) {
  return readFileSync(resolve(rootDir, relPath), 'utf8')
}

function assert(condition, message) {
  if (!condition) {
    errors.push(message)
  }
}

const app = read('src/App.jsx')
const header = read('src/components/Header.jsx')
const footer = read('src/components/Footer.jsx')
const contact = read('src/pages/Contact.jsx')
const audit = read('src/pages/Audit.jsx')
const about = read('src/pages/About.jsx')
const projects = read('src/pages/Projets.jsx')
const html = read('index.html')

assert(!header.includes('href="#"'), 'Header contient encore des liens href="#"')
assert(!footer.includes('href="#"'), 'Footer contient encore des liens href="#"')
assert(app.includes('path="*"'), 'Route fallback "*" absente dans App.jsx')
assert(app.includes('path="/audit"'), 'Route "/audit" absente dans App.jsx')
assert(contact.includes('formsubmit.co/ajax/contact@cstlab.dev'), 'Endpoint d envoi email absent du formulaire de contact')
assert(audit.includes('formsubmit.co/ajax/contact@cstlab.dev'), 'Endpoint d envoi email absent du formulaire d audit')
assert(!contact.includes("_captcha: 'false'"), 'Le formulaire de contact desactive encore explicitement le captcha')
assert(!audit.includes("_captcha: 'false'"), 'Le formulaire d audit desactive encore explicitement le captcha')
assert(contact.includes('form-consent'), 'Le formulaire de contact ne contient pas de consentement explicite')
assert(audit.includes('form-consent'), 'Le formulaire d audit ne contient pas de consentement explicite')
assert(!about.includes('Sophie Martin'), 'La page a propos contient encore des noms d equipe fictifs')
assert(!about.includes('Maxime Dubois'), 'La page a propos contient encore des noms d equipe fictifs')
assert(!projects.includes('MaisonVerte'), 'La page projets contient encore un client placeholder')
assert(!projects.includes('RetailPlus'), 'La page projets contient encore un client placeholder')
assert(html.includes('og-image.svg'), 'Les metadonnees Open Graph par defaut sont absentes du HTML')
assert(existsSync(resolve(rootDir, 'public/favicon.svg')), 'Favicon manquant: public/favicon.svg')
assert(existsSync(resolve(rootDir, 'public/robots.txt')), 'robots.txt manquant')
assert(existsSync(resolve(rootDir, 'public/sitemap.xml')), 'sitemap.xml manquant')

if (errors.length > 0) {
  console.error('Echec quality-check:')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log('Quality-check OK')
