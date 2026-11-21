import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { CtaBlock, PageHero, SectionHead, tone } from '../components/ui.jsx'
import { processSteps, serviceShowcase } from '../content/siteContent.js'

const fitItems = [
  {
    title: 'Ce format est bien adapté si…',
    text:
      "Vous voulez un site, un outil ou une intégration avec un interlocuteur unique, un besoin concret et un périmètre qu'on peut cadrer puis livrer proprement.",
    className: 'card mint',
    mark: '✓',
  },
  {
    title: 'Ce format est moins adapté si…',
    text:
      "Vous avez besoin dès le départ d'une grosse équipe, d'un appel d'offres très lourd ou d'une production très volumineuse avec plusieurs pôles en parallèle.",
    className: 'card sun',
    mark: '!',
  },
]

export default function Services() {
  return (
    <>
      <PageMeta
        title="Services web : sites, e-commerce et outils métier"
        path="/services"
        description="Sites marketing, e-commerce, plateformes web et intégrations métier pilotés par CSTLAB à Rennes."
      />

      <PageHero
        eyebrow="Services"
        title="Une offre simple, lisible, et orientée exécution."
        highlight="exécution."
        actions={
          <>
            <Link to="/audit" className="btn btn-dark">Demander un audit</Link>
            <Link to="/projets" className="btn">Voir les projets →</Link>
          </>
        }
      >
        Le but n'est pas de tout promettre. CSTLAB intervient surtout quand il faut clarifier un
        produit, remettre de l'ordre dans un parcours, ou livrer un outil web qui tient
        techniquement dans la durée.
      </PageHero>

      <section className="section">
        <SectionHead eyebrow="Ce que je prends en charge" title="Quatre blocs de services, sans surcouche." />
        <div className="grid-2">
          {serviceShowcase.map((service, index) => (
            <article key={service.id} className={`card hoverable rv ${tone(index)}`.trim()} style={{ '--d': `${(index % 2) * 80}ms` }}>
              <div className="row">
                <span className="icon-round" aria-hidden="true">{service.number}</span>
                <span className="tag">{service.label}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem' }}>{service.title}</h3>
              <p className="muted">{service.description}</p>
              <ul className="checks">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="card-foot">
                {service.stack.map((item) => (
                  <span key={item} className="chip small">{item}</span>
                ))}
              </div>
              <p className="note"><b>{service.proofTitle} :</b> {service.proofText}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Méthode" title="Un cadre simple, du cadrage à la mise en ligne." />
        <ol className="steps" style={{ marginBottom: 20 }}>
          {processSteps.map((step) => (
            <li key={step.number}>
              <span className="num">{Number(step.number)}</span>
              {step.title}
            </li>
          ))}
        </ol>
        <div className="grid-4">
          {processSteps.map((step, index) => (
            <article key={step.number} className={`card rv ${tone(index)}`.trim()} style={{ '--d': `${index * 80}ms` }}>
              <span className="num-badge">{step.number}</span>
              <h3>{step.title}</h3>
              <p className="muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Cadre d’intervention" title="Pour qui ce format est pensé." />
        <div className="grid-2">
          {fitItems.map((item, index) => (
            <article key={item.title} className={`${item.className} rv`} style={{ '--d': `${index * 80}ms` }}>
              <span className="icon-round" aria-hidden="true">{item.mark}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <article className="card outlined blue maint rv">
          <div className="stack" style={{ gap: 10 }}>
            <p className="eyebrow" style={{ margin: 0 }}>Maintenance</p>
            <h2>Un suivi à partir de 45 € HT / mois.</h2>
            <p>
              Utile pour garder un site propre dans le temps : petites corrections, mises à jour,
              surveillance légère et ajustements ponctuels.
            </p>
          </div>
          <Link to="/contact" className="btn btn-dark">Parler maintenance →</Link>
        </article>
      </section>

      <CtaBlock
        eyebrow="Parlons du besoin"
        title="Si le sujet est déjà là, on peut le cadrer proprement."
        primary={{ to: '/audit', label: '✦ Demander un audit' }}
        secondary={{ to: '/contact', label: 'Ouvrir la discussion' }}
      />
    </>
  )
}
