import { motion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { legalSections } from '../content/siteContent.js'

export default function Cgv() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageMeta
        title="CGV"
        path="/cgv"
        description="Conditions generales de vente des prestations proposees par CST Lab."
      />

      <div className="page-hero container">
        <span className="page-hero-label">Conditions commerciales</span>
        <h1 className="page-hero-title">Conditions generales de vente</h1>
        <p className="page-hero-desc">
          Ces conditions donnent le cadre general des missions. Le devis reste toujours le
          document contractuel prioritaire pour fixer le perimetre, les livrables et les
          modalites financieres.
        </p>
      </div>

      <section className="section">
        <div className="container legal-stack">
          {legalSections.cgv.map((section) => (
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
