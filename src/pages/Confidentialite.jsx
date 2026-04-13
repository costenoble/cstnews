import { motion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { legalSections } from '../content/siteContent.js'

export default function Confidentialite() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageMeta
        title="Confidentialité"
        path="/confidentialite"
        description="Politique de confidentialité et traitement des données sur le site CSTLAB."
      />

      <div className="page-hero container">
        <span className="page-hero-label">Données personnelles</span>
        <h1 className="page-hero-title">Politique de confidentialité</h1>
        <p className="page-hero-desc">
          Les formulaires ne servent qu'à traiter une prise de contact ou une demande
          d'audit. Cette page explique quelles données sont collectées et pourquoi.
        </p>
      </div>

      <section className="section">
        <div className="container legal-stack">
          {legalSections.privacy.map((section) => (
            <article key={section.title} className="legal-card">
              <h2 className="legal-title">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="legal-text">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
