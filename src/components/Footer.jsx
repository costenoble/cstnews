import { Link } from 'react-router-dom'
import { companyInfo, serviceShowcase } from '../content/siteContent.js'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/projets', label: 'Projets' },
  { to: '/audit', label: 'Audit' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-brand-logo">
              CST<span>.</span>
            </Link>
            <p className="footer-brand-desc">{companyInfo.strapline}</p>
            <div className="footer-social">
              {companyInfo.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="footer-social-btn"
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.short}
                </a>
              ))}
            </div>
            <div className="footer-local-card">
              <div className="footer-local-title">Basé à Rennes</div>
              <p className="footer-local-text">{companyInfo.collaborationModel}</p>
            </div>
          </div>

          <div>
            <p className="footer-col-title">Navigation</p>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link footer-link-slide" aria-label={link.label}>
                    <span className="footer-link-slide-text" data-text={link.label}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              {serviceShowcase.map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="footer-link">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Contact</p>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Email</span>
              <a href={`mailto:${companyInfo.email}`} className="footer-contact-value footer-link">
                {companyInfo.email}
              </a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Basé</span>
              <span className="footer-contact-value">{companyInfo.locationLabel}</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Zone</span>
              <span className="footer-contact-value">
                {companyInfo.localTravelLabel} - {companyInfo.serviceAreaLabel}
              </span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-label">Réponse</span>
              <span className="footer-contact-value">{companyInfo.responseTimeLabel}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">(c) {new Date().getFullYear()} CSTLAB. Tous droits réservés.</p>
          <div className="footer-legal">
            <Link to="/mentions-legales" className="footer-legal-link">Mentions légales</Link>
            <Link to="/confidentialite" className="footer-legal-link">Politique de confidentialité</Link>
            <Link to="/cgv" className="footer-legal-link">CGV</Link>
          </div>
        </div>
      </div>

      <div className="footer-wordmark">
        <div className="footer-wordmark-text">CSTLAB</div>
      </div>
    </footer>
  )
}
