import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function read(relPath) {
  return readFileSync(resolve(process.cwd(), relPath), 'utf8')
}

test('App expose les routes legales et la fallback 404', () => {
  const app = read('src/App.jsx')
  assert.match(app, /path="\/audit"/)
  assert.match(app, /path="\/mentions-legales"/)
  assert.match(app, /path="\/confidentialite"/)
  assert.match(app, /path="\/cgv"/)
  assert.match(app, /path="\*"/)
})

test('Header et Footer n utilisent plus href="#"', () => {
  const header = read('src/components/Header.jsx')
  const footer = read('src/components/Footer.jsx')
  assert.equal(header.includes('href="#"'), false)
  assert.equal(footer.includes('href="#"'), false)
})

test('Les formulaires gardent un endpoint email et n desactivent plus le captcha explicitement', () => {
  const contact = read('src/pages/Contact.jsx')
  const audit = read('src/pages/Audit.jsx')

  assert.match(contact, /VITE_CONTACT_ENDPOINT/)
  assert.match(contact, /formsubmit\.co\/ajax\/contact@cstlab\.dev/)
  assert.match(audit, /VITE_CONTACT_ENDPOINT/)
  assert.match(audit, /formsubmit\.co\/ajax\/contact@cstlab\.dev/)
  assert.equal(contact.includes("_captcha: 'false'"), false)
  assert.equal(audit.includes("_captcha: 'false'"), false)
})

test('Les placeholders principaux ont ete retires des pages publiques', () => {
  const about = read('src/pages/About.jsx')
  const contact = read('src/pages/Contact.jsx')
  const projects = read('src/pages/Projets.jsx')

  assert.equal(about.includes('Sophie Martin'), false)
  assert.equal(about.includes('Maxime Dubois'), false)
  assert.equal(contact.includes('+33 1 23 45 67 89'), false)
  assert.equal(projects.includes('MaisonVerte'), false)
  assert.equal(projects.includes('RetailPlus'), false)
})
