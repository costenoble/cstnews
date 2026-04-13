import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { aboutValues, companyInfo, studioModel } from '../content/siteContent.js'

function unsplash(id, w = 800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
}

function ValueRevealCard({ value, index, progress }) {
  const prefersReducedMotion = useReducedMotion()

  const start = 0.05 + index * 0.14
  const end = start + 0.24
  const clipPath = useTransform(progress, [start, end], [
    'inset(0% 0% 100% 0% round 28px)',
    'inset(0% 0% 0% 0% round 28px)',
  ])
  const opacity = useTransform(progress, [start, end], [0.35, 1])
  const y = useTransform(progress, [start, end], [34, 0])

  return (
    <motion.article
      className="value-card value-card-reveal"
      style={prefersReducedMotion ? undefined : { clipPath, opacity }}
    >
      <motion.div className="value-card-inner" style={prefersReducedMotion ? undefined : { y }}>
        <h3 className="value-title">{value.title}</h3>
        <p className="value-desc">{value.description}</p>
      </motion.div>
    </motion.article>
  )
}

export default function About() {
  const valuesRef = useRef(null)
  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesRef,
    offset: ['start 82%', 'end 24%'],
  })

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageMeta
        title="À propos"
        path="/a-propos"
        description="CSTLAB est un studio indépendant piloté par Ryan Costenoble depuis Rennes pour les projets web, e-commerce et outils métier."
      />

      <div className="about-hero container">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="page-hero-label">À propos</span>
          <h1 className="about-hero-title">Un studio web indépendant, avec un interlocuteur technique clair.</h1>
          <p className="about-hero-desc">{companyInfo.positioning}</p>
          <p className="about-hero-desc">{companyInfo.collaborationModel}</p>
          <Link to="/contact" className="btn btn-orange" style={{ width: 'fit-content' }}>
            Parler de votre projet
          </Link>
        </motion.div>

        <motion.img
          src={unsplash('photo-1522071820081-009f0129c71c')}
          alt="Studio CSTLAB"
          className="about-image"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
      </div>

      <div className="about-mission container">
        <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Positionnement
        </span>
        <p className="about-mission-text" style={{ marginTop: '20px' }}>
          {companyInfo.strapline}
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Mode de collaboration</span>
            <h2 className="h2">Comment CSTLAB fonctionne</h2>
          </div>
          <div className="about-model-grid">
            {studioModel.map((item, index) => (
              <motion.article
                key={item.title}
                className="about-model-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="about-model-label">{item.label}</span>
                <h3 className="about-model-title">{item.title}</h3>
                <p className="about-model-text">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '0', background: 'var(--gray-light)' }}>
        <div style={{ paddingTop: '80px' }}>
          <div className="container">
            <div className="section-header text-center">
              <span className="section-label">Ce qui guide les projets</span>
              <h2 className="h2">Les principes de travail</h2>
            </div>
            <div
              ref={valuesRef}
              className="about-values"
            >
              {aboutValues.map((value, index) => (
                <ValueRevealCard
                  key={value.title}
                  value={value}
                  index={index}
                  progress={valuesProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <div className="cta-content">
          <span className="cta-label">Suite logique</span>
          <h2 className="cta-title">Si le besoin est déjà là, on peut le cadrer ensemble.</h2>
        </div>
        <div className="cta-actions">
          <Link to="/audit" className="btn btn-orange">
            Demander un audit
          </Link>
          <Link to="/projets" className="btn btn-white">
            Voir les projets
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
