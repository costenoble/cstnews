import { motion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { legalSections } from '../content/siteContent.js'

export default function MentionsLegales() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageMeta
        title="Mentions légales"
        path="/mentions-legales"
        description="Informations légales et éditoriales du site CSTLAB."
      />

      <div className="page-hero container">
        <span className="page-hero-label">Cadre légal</span>
        <h1 className="page-hero-title">Mentions légales</h1>
        <p className="page-hero-desc">
          Cette page rassemble les informations éditoriales essentielles du site ainsi que
          les mentions à valider avant une mise en ligne définitive.
        </p>
      </div>

      <section className="section">
        <div className="container legal-stack">
          {legalSections.mentions.map((section) => (
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
