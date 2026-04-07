import { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { companyInfo } from '../content/siteContent.js'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/projets', label: 'Projets' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/audit', label: 'Audit' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = companyInfo.socialLinks.map(({ href, label }) => ({ href, label }))

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const mobileMenuId = useId()

  useEffect(() => {
    if (!menuOpen) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow || ''
    }

    return () => {
      document.body.style.overflow = previousOverflow || ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
            CST<span>.</span>
          </Link>

          <button
            className={`hamburger header-menu-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

          <div className="header-right">
            <Link to="/audit" className="btn btn-orange header-cta">
              Demander un devis
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <nav className="menu-nav" id={mobileMenuId}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.href}
                    className={`menu-link${pathname === link.href ? ' active-menu' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="menu-link-mask">
                      <motion.span
                        className="menu-link-reveal"
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '110%' }}
                        transition={{
                          delay: 0.08 + i * 0.07,
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="menu-link-slide">
                          <span className="menu-link-slide-text" data-text={link.label}>
                            {link.label}
                          </span>
                        </span>
                      </motion.span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="menu-footer-row">
              <a href="mailto:contact@cstlab.dev" className="menu-footer-email">
                contact@cstlab.dev
              </a>
              <div className="menu-footer-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="menu-social-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
