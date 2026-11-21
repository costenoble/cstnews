import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { CtaBlock, PageHero, SectionHead, tone } from '../components/ui.jsx'
import { aboutValues, companyInfo, projects, studioModel } from '../content/siteContent.js'

export default function About() {
  const proCount = projects.filter((project) => project.kind === 'pro').length
  const persoCount = projects.length - proCount

  return (
    <>
      <PageMeta
        title="À propos du studio web indépendant à Rennes"
        path="/a-propos"
        description="CSTLAB est un studio indépendant piloté par Ryan Costenoble depuis Rennes pour les projets web, e-commerce et outils métier."
      />

      <PageHero
        eyebrow="À propos"
        title="Un studio web indépendant, avec un interlocuteur technique clair."
        highlight="clair."
        actions={<Link to="/contact" className="btn btn-dark">Parler de votre projet</Link>}
      >
        {companyInfo.positioning}
      </PageHero>

      <section className="section">
        <div className="grid-2">
          <div className="card ink rv">
            <p className="eyebrow" style={{ color: 'var(--green)', margin: 0 }}>Positionnement</p>
            <h2>{companyInfo.strapline}</h2>
            <p className="muted">{companyInfo.collaborationModel}</p>
          </div>
          <div className="kpis rv" style={{ '--d': '80ms' }}>
            <div className="kpi blue"><span className="v">{proCount}</span><span className="l">projets pro en ligne</span></div>
            <div className="kpi pink"><span className="v">{persoCount}</span><span className="l">projets perso, dont Kompta</span></div>
            <div className="kpi mint"><span className="v">5,0</span><span className="l">note moyenne sur Malt</span></div>
            <div className="kpi"><span className="v">24 h</span><span className="l">pour une première réponse</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Mode de collaboration" title="Comment CSTLAB fonctionne" />
        <div className="grid-3">
          {studioModel.map((item, index) => (
            <article key={item.title} className={`card rv ${tone(index)}`.trim()} style={{ '--d': `${index * 80}ms` }}>
              <span className="tag" style={{ justifySelf: 'start' }}>{item.label}</span>
              <h3>{item.title}</h3>
              <p className="muted">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Ce qui guide les projets" title="Les principes de travail" />
        <div className="grid-4">
          {aboutValues.map((value, index) => (
            <article key={value.title} className={`card hoverable rv ${tone(index + 1)}`.trim()} style={{ '--d': `${index * 70}ms` }}>
              <span className="icon-round" aria-hidden="true">{['✦', '◎', '↗', '♥'][index % 4]}</span>
              <h3>{value.title}</h3>
              <p className="muted">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBlock
        eyebrow="Suite logique"
        title="Si le besoin est déjà là, on peut le cadrer ensemble."
        primary={{ to: '/audit', label: '✦ Demander un audit' }}
        secondary={{ to: '/projets', label: 'Voir les projets' }}
      />
    </>
  )
}
