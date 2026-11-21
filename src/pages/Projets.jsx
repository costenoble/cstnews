import { useState } from 'react'
import PageMeta from '../components/PageMeta.jsx'
import { FeaturedProject, PageHero, ProjectCard } from '../components/ui.jsx'
import { projects } from '../content/siteContent.js'

const filters = [
  { id: 'tous', label: 'Tous', test: () => true },
  { id: 'pro', label: 'Projets pro', test: (project) => project.kind === 'pro' },
  { id: 'perso', label: 'Projets perso', test: (project) => project.kind === 'perso' },
  ...[...new Set(projects.map((project) => project.category))].map((category) => ({
    id: category,
    label: category,
    test: (project) => project.category === category,
  })),
]

export default function Projets() {
  const [activeId, setActiveId] = useState('tous')
  const active = filters.find((filter) => filter.id === activeId) ?? filters[0]
  const featured = projects.find((project) => project.featured)
  const list = projects.filter((project) => project !== featured && active.test(project))
  const showFeatured = featured && active.test(featured)

  return (
    <>
      <PageMeta
        title="Projets"
        path="/projets"
        description="Les projets signés CSTLAB : SaaS, plateformes, e-commerce et sites de marque, projets clients et projets personnels."
      />

      <PageHero eyebrow="Projets" title="Des projets pro et perso, tous en ligne." highlight="ligne.">
        Projets pro pour des clients, projets perso pour tester des idées et des outils. Chaque carte
        l’indique et ouvre le site en ligne.
      </PageHero>

      <div className="pills" role="group" aria-label="Filtrer les projets">
        {filters.map((filter) => {
          const count = projects.filter(filter.test).length
          return (
            <button
              key={filter.id}
              className="pill"
              type="button"
              aria-pressed={filter.id === activeId}
              onClick={() => setActiveId(filter.id)}
            >
              {filter.label} <span className="n">{count}</span>
            </button>
          )
        })}
      </div>

      {showFeatured ? <FeaturedProject project={featured} /> : null}

      <section className="section">
        <div className="grid-3" key={activeId}>
          {list.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} delay={(index % 3) * 80} />
          ))}
        </div>
      </section>
    </>
  )
}
