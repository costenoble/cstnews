import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { processSteps, projects, serviceShowcase } from '../content/siteContent.js'

const fitItems = [
  {
    title: 'Ce format est bien adapté si...',
    text:
      "Tu veux un site, un outil ou une intégration avec un interlocuteur unique, un besoin concret et un périmètre qu'on peut cadrer puis livrer proprement.",
  },
  {
    title: 'Ce format est moins adapté si...',
    text:
      "Tu as besoin dès le départ d'une grosse équipe, d'un appel d'offres très lourd ou d'une production très volumineuse avec plusieurs pôles en parallèle.",
  },
]

export default function Services() {
  return (
    <motion.div
      className="page services-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageMeta
        title="Services"
        path="/services"
        description="Sites marketing, e-commerce, plateformes web et intégrations métier pilotés par CSTLAB à Rennes."
      />

      <div className="page-hero container services-page-hero">
        <span className="page-hero-label">Services</span>
        <h1 className="page-hero-title">Une offre simple, lisible, et orientée exécution.</h1>
        <p className="page-hero-desc">
          Le but n'est pas de tout promettre. CSTLAB intervient surtout quand il faut
          clarifier un produit, remettre de l'ordre dans un parcours, ou livrer un outil
          web qui tient techniquement dans la durée.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Ce que je prends en charge</span>
            <h2 className="h2">Quatre blocs de services, sans surcouche.</h2>
          </div>

          <div className="services-simple-grid">
            {serviceShowcase.map((service, index) => (
              <motion.article
                key={service.id}
                className="services-simple-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="services-simple-header">
                  <span className="services-simple-number">{service.number}</span>
                  <span className="services-simple-label">{service.label}</span>
                </div>

                <h3 className="services-simple-title">{service.title}</h3>
                <p className="services-simple-text">{service.description}</p>

                <ul className="services-simple-list">
                  {service.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Méthode</span>
            <h2 className="h2">Un cadre de travail simple du cadrage à la mise en ligne.</h2>
          </div>

          <div className="services-process-grid">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.number}
                className="services-process-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="services-process-number">{step.number}</span>
                <h3 className="services-process-title">{step.title}</h3>
                <p className="services-process-text">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Références</span>
            <h2 className="h2">Quelques projets qui montrent le type de sujet traité.</h2>
          </div>

          <div className="services-proof-grid">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                className="services-proof-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.06, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="services-proof-tag">{project.category}</span>
                <h3 className="services-proof-title">{project.name}</h3>
                <p className="services-proof-text">{project.summary}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Cadre d'intervention</span>
            <h2 className="h2">Pour qui ce format est pensé.</h2>
          </div>

          <div className="services-fit-grid">
            {fitItems.map((item) => (
              <article key={item.title} className="services-fit-card">
                <h3 className="services-fit-title">{item.title}</h3>
                <p className="services-fit-text">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="services-maintenance-card">
            <span className="services-maintenance-label">Maintenance</span>
            <h3 className="services-maintenance-title">
              Un suivi est possible à partir de 45 EUR HT / mois.
            </h3>
            <p className="services-maintenance-text">
              C'est utile pour garder un site propre dans le temps: petites corrections,
              mises à jour, surveillance légère et ajustements ponctuels.
            </p>
          </div>
        </div>
      </section>

      <div className="cta-section">
        <div className="cta-content">
          <span className="cta-label">Parlons du besoin</span>
          <h2 className="cta-title">Si le sujet est déjà là, on peut maintenant le cadrer proprement.</h2>
        </div>
        <div className="cta-actions">
          <Link to="/audit" className="btn btn-orange">
            Demander un audit
          </Link>
          <Link to="/contact" className="btn btn-white">
            Ouvrir la discussion
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
