import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { projects } from '../content/siteContent.js'

const categories = ['Tous', ...new Set(projects.map((project) => project.category))]

function unsplash(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`
}

export default function Projets() {
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filteredProjects =
    activeFilter === 'Tous'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageMeta
        title="Projets"
        path="/projets"
        description="Une sélection de projets signés CSTLAB: produit web, e-commerce et landing page éditoriale."
      />

      <div className="page-hero container">
        <span className="page-hero-label">Projets</span>
        <h1 className="page-hero-title">Quelques missions récentes, choisies pour ce qu'elles racontent.</h1>
        <p className="page-hero-desc">
          Des projets variés, mais un fil conducteur commun: clarifier l'usage, tenir la
          technique et livrer quelque chose que le client peut vraiment exploiter.
        </p>
      </div>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="projects-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn${activeFilter === category ? ' active' : ''}`}
                onClick={() => setActiveFilter(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.a
                  key={project.slug}
                  className="project-grid-card"
                  href={project.siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Voir le site ${project.name}`}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <img
                      src={unsplash(project.image)}
                      alt={project.name}
                      className="project-grid-image"
                      loading="lazy"
                    />
                  </div>
                  <span className="project-grid-visit">Voir le site</span>
                  <div className="project-grid-body">
                    <span className="project-grid-tag">{project.category}</span>
                    <h3 className="project-grid-title">{project.name}</h3>
                    <p className="project-grid-client">
                      {project.client} - {project.year}
                    </p>
                    <p className="project-grid-summary">{project.summary}</p>
                    <div className="project-grid-outcomes">
                      {project.outcomes.map((item) => (
                        <span key={item} className="project-grid-outcome">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
