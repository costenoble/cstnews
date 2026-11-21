import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { companyInfo } from '../content/siteContent.js'

const menuGroups = [
  {
    label: 'Découvrir',
    links: [
      { href: '/', title: 'Accueil', desc: 'Le studio en un coup d’œil' },
      { href: '/projets', title: 'Projets', desc: 'Kompta, DentalCAO, Vigie SEO…' },
      { href: '/services', title: 'Services', desc: 'Sites, e-commerce, outils métier' },
    ],
  },
  {
    label: 'Travailler ensemble',
    links: [
      { href: '/audit', title: 'Audit', desc: 'Un questionnaire pour un devis clair' },
      { href: '/contact', title: 'Contact', desc: 'Réponse sous 24 h ouvrées' },
      { href: '/a-propos', title: 'À propos', desc: 'Qui pilote les projets' },
    ],
  },
]

const CLOSE_MS = 420

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Header() {
  // closed → opening → open → closing → closed
  const [state, setState] = useState('closed')
  const { pathname } = useLocation()
  const burgerRef = useRef(null)
  const menuRef = useRef(null)
  const timer = useRef(0)

  const isOpen = state === 'opening' || state === 'open'

  const open = useCallback(() => {
    window.clearTimeout(timer.current)
    setState('opening')
    requestAnimationFrame(() => requestAnimationFrame(() => setState('open')))
  }, [])

  const close = useCallback(() => {
    setState((current) => (current === 'closed' ? current : 'closing'))
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('closed'), prefersReducedMotion() ? 0 : CLOSE_MS)
  }, [])

  // Fermer le menu quand on change de page
  useEffect(() => {
    close()
  }, [pathname, close])

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', isOpen)
    if (state !== 'open') return undefined

    const firstLink = menuRef.current?.querySelector('a')
    const focusTimer = window.setTimeout(() => firstLink?.focus(), prefersReducedMotion() ? 0 : 350)

    function onKey(event) {
      if (event.key === 'Escape') {
        close()
        burgerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return
      // le focus reste dans le menu ouvert
      const items = [burgerRef.current, ...menuRef.current.querySelectorAll('a, button')]
      const index = items.indexOf(document.activeElement)
      const next = event.shiftKey
        ? index <= 0 ? items.length - 1 : index - 1
        : index === items.length - 1 ? 0 : index + 1
      event.preventDefault()
      items[next].focus()
    }

    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
    }
  }, [state, isOpen, close])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  let i = 0
  const menuClass = `menu${state === 'open' ? ' open' : ''}${state === 'closing' ? ' closing' : ''}`

  return (
    <>
      <a className="skip" href="#main">Aller au contenu</a>
      <header className={`top${isOpen ? ' menu-open' : ''}`}>
        <Link className="brand" to="/" aria-label="CSTLAB, accueil">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>CST<span className="accent">LAB</span></span>
        </Link>

        <div className="top-actions">
          <Link to="/audit" className="btn btn-dark btn-small top-cta">
            Demander un devis
          </Link>
        </div>

        <button
          ref={burgerRef}
          className="burger"
          type="button"
          onClick={() => (isOpen ? close() : open())}
          aria-controls="menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className="burger-lines" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="burger-text">{isOpen ? 'Fermer' : 'Menu'}</span>
        </button>
      </header>

      <div
        ref={menuRef}
        className={menuClass}
        id="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        hidden={state === 'closed'}
      >
        <div className="menu-inner">
          <div className="menu-groups">
            {menuGroups.map((group) => (
              <section key={group.label} className="menu-group">
                <p className="menu-label" style={{ '--i': i++ }}>{group.label}</p>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href} style={{ '--i': i++ }}>
                      <Link
                        className="menu-item"
                        to={link.href}
                        aria-current={pathname === link.href ? 'page' : undefined}
                        onClick={close}
                      >
                        <span className="menu-title">
                          {link.title} <span className="menu-arrow" aria-hidden="true">→</span>
                        </span>
                        <span className="menu-desc">{link.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <div className="menu-foot" style={{ '--i': i++ }}>
            <Link className="btn btn-green btn-pop" to="/audit" onClick={close}>
              ✦ Lancer mon audit
            </Link>
            <a className="btn btn-ghost" href={`mailto:${companyInfo.email}`}>
              {companyInfo.email}
            </a>
            {companyInfo.socialLinks.map((social) => (
              <a key={social.label} className="btn btn-ghost" href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
