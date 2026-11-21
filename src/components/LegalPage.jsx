import PageMeta from './PageMeta.jsx'
import { PageHero } from './ui.jsx'

export default function LegalPage({ meta, eyebrow, title, intro, sections }) {
  return (
    <>
      <PageMeta {...meta} />
      <PageHero eyebrow={eyebrow} title={title}>
        {intro}
      </PageHero>
      <section className="legal">
        {sections.map((section) => (
          <article key={section.title} className="card">
            <h2 style={{ fontSize: '1.25rem' }}>{section.title}</h2>
            <div>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="muted">{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
