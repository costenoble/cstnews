import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { projectKinds } from '../content/siteContent.js'

/* Fonds de cartes alternés : bleu → rose → blanc */
export const tones = ['blue', 'pink', '']
export const tone = (index) => tones[index % tones.length]

/* Titre héros : les mots montent un par un, un mot surligné en vert */
export function TitleWords({ text, highlight, as: Tag = 'h1', className = '' }) {
  const words = text.split(' ')
  return (
    <Tag className={`title-words ${className}`.trim()}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className={`w${word === highlight ? ' hl' : ''}`} style={{ '--w': i }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export function PageHero({ eyebrow, title, highlight, children, actions }) {
  return (
    <section className="hero">
      <p className="eyebrow">{eyebrow}</p>
      <TitleWords text={title} highlight={highlight} />
      {children ? <p>{children}</p> : null}
      {actions ? <div className="actions">{actions}</div> : null}
    </section>
  )
}

export function SectionHead({ eyebrow, title, children, action }) {
  return (
    <header className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children ? <p className="muted">{children}</p> : null}
      </div>
      {action}
    </header>
  )
}

export function KindBadge({ kind }) {
  const info = projectKinds[kind] ?? projectKinds.pro
  return <span className={info.className}>{info.label}</span>
}

export function ProjectCard({ project, index = 0, delay = 0 }) {
  return (
    <a
      className={`card proj rv ${tone(index)}`.trim()}
      href={project.siteUrl}
      target="_blank"
      rel="noreferrer"
      style={{ '--d': `${delay}ms` }}
    >
      <figure className="proj-shot">
        <img
          src={project.localImage}
          alt={`Page d’accueil du site ${project.name}`}
          width="1100"
          height="687"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="proj-meta">
        <KindBadge kind={project.kind} />
        <span className="badge">{project.category}</span>
        <span className="badge">{project.year}</span>
      </div>
      <h3>
        {project.name} <span className="go" aria-hidden="true">↗</span>
      </h3>
      <p className="proj-client">{project.client}</p>
      <p>{project.summary}</p>
      <div className="card-foot">
        {project.stack.map((item) => (
          <span key={item} className="chip small">{item}</span>
        ))}
      </div>
    </a>
  )
}

/* Mise en avant unique : Kompta, sur une carte magique */
export function FeaturedProject({ project }) {
  return (
    <section className="section">
      <div className="card-magic feature rv">
        <span className="spark" style={{ top: '10%', right: '6%', fontSize: '2.2rem' }} aria-hidden="true">✦</span>
        <span className="spark" style={{ bottom: '12%', left: '44%', fontSize: '1rem', color: '#0b0b0b', opacity: 0.25, animationDelay: '-2s' }} aria-hidden="true">✦</span>
        <div className="stack">
          <div className="row" style={{ gap: 12 }}>
            <span className="star-badge" aria-hidden="true">✦</span>
            <div className="proj-meta">
              <KindBadge kind={project.kind} />
              <span className="badge">{project.category}</span>
            </div>
          </div>
          <h2>{project.name}, mon SaaS de facturation électronique.</h2>
          <p>{project.summary}</p>
          <ul className="checks">
            {project.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="row">
            <a className="btn btn-dark" href={project.siteUrl} target="_blank" rel="noreferrer">
              Découvrir {project.name} →
            </a>
            <Link className="btn" to="/projets" style={{ borderColor: '#0b0b0b', color: '#0b0b0b' }}>
              Voir tous les projets
            </Link>
          </div>
        </div>
        <figure className="proj-shot">
          <img src={project.localImage} alt={`Page d’accueil de ${project.name}`} width="1100" height="687" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  )
}

/* FAQ : bouton rond qui tourne, réponse qui se déplie */
export function Faq({ items }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()
  return (
    <div className="faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item.q} className="faq-item rv" style={{ '--d': `${index * 60}ms` }}>
            <button
              className="faq-q"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${baseId}-${index}`}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              {item.q}
              <span className="faq-plus" aria-hidden="true" />
            </button>
            <div id={`${baseId}-${index}`} className={`faq-a${isOpen ? ' open' : ''}`}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function CtaBlock({ eyebrow, title, text, primary, secondary }) {
  return (
    <section className="section">
      <div className="card outlined mint cta-block rv">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {text ? <p className="muted" style={{ maxWidth: '60ch' }}>{text}</p> : null}
        <div className="row">
          <Link className="btn btn-dark" to={primary.to}>{primary.label}</Link>
          {secondary ? <Link className="btn" to={secondary.to}>{secondary.label}</Link> : null}
        </div>
      </div>
    </section>
  )
}
