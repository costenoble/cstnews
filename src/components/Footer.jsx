import { Link } from 'react-router-dom'
import { companyInfo, serviceShowcase } from '../content/siteContent.js'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/services', label: 'Services' },
  { to: '/audit', label: 'Audit' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <div className="foot-wrap">
      <footer className="bigfoot">
        <div className="stack" style={{ maxWidth: 680, justifyItems: 'start' }}>
          <Link className="brand" to="/" aria-label="CSTLAB, accueil">
            <span className="brand-mark" aria-hidden="true">C</span>
            <span>CST<span className="accent">LAB</span></span>
          </Link>
          <h2>Un projet en tête ? Parlons-en simplement.</h2>
          <p>{companyInfo.strapline} {companyInfo.responseTimeLabel}.</p>
          <div className="row">
            <Link className="btn btn-green btn-pop" to="/audit">
              ✦ Lancer mon audit
            </Link>
            <a className="btn btn-ghost" href={`mailto:${companyInfo.email}`}>
              {companyInfo.email}
            </a>
          </div>
        </div>

        <div className="bigfoot-cols">
          <div className="fcol">
            <p className="fcol-title">Navigation</p>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <p className="fcol-title">Services</p>
            <ul>
              {serviceShowcase.map((service) => (
                <li key={service.id}>
                  <Link to="/services">{service.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="fcol">
            <p className="fcol-title">Studio</p>
            <ul>
              <li><span>{companyInfo.locationLabel}</span></li>
              <li><span>{companyInfo.localTravelLabel}</span></li>
              <li><span>{companyInfo.serviceAreaLabel}</span></li>
            </ul>
          </div>
          <div className="fcol">
            <p className="fcol-title">Ailleurs</p>
            <ul>
              {companyInfo.socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} CSTLAB · {companyInfo.founderName}</span>
          <nav aria-label="Informations légales">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/confidentialite">Confidentialité</Link>
            <Link to="/cgv">CGV</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
