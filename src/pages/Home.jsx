import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import { CtaBlock, Faq, FeaturedProject, ProjectCard, SectionHead, TitleWords, tone } from '../components/ui.jsx'
import { clientTestimonials, companyInfo, projects, serviceShowcase, siteUrl } from '../content/siteContent.js'

const packagedOffers = [
  {
    name: 'Site vitrine',
    range: '1 200 – 2 500 €',
    desc: 'Pour présenter votre activité et générer des demandes qualifiées.',
    items: ['5 à 10 pages', 'Design sur mesure', 'SEO technique de base', 'Formation prise en main'],
  },
  {
    name: 'Refonte complète',
    range: '1 000 – 2 000 €',
    desc: 'Pour moderniser votre image et améliorer clairement les conversions.',
    items: ['Audit UX + technique', 'Nouvelle architecture', 'Nouveau design', 'Migration progressive'],
  },
  {
    name: 'Maintenance évolutive',
    range: '45 – 150 €',
    per: '/ mois',
    desc: 'Pour garder un site rapide, sécurisé et qui évolue chaque mois.',
    items: ['Mises à jour', 'Corrections rapides', 'Monitoring', 'Petites évolutions continues'],
  },
]

const faqItems = [
  {
    q: 'Combien ça coûte ?',
    a: "Le budget dépend surtout du périmètre, des contenus disponibles et du niveau de personnalisation attendu. Les fourchettes affichées plus haut donnent un premier repère, mais un audit permet de distinguer ce qui est indispensable, ce qui peut venir plus tard, et d'arriver à un chiffrage plus juste.",
  },
  {
    q: 'Combien de temps ?',
    a: 'Pour un site vitrine, on est souvent sur 3 à 6 semaines. Une refonte plus complète ou un outil avec logique métier peut demander davantage. Le vrai point clé reste la disponibilité des contenus, des validations et des accès: plus ces éléments sont prêts, plus le projet avance vite et proprement.',
  },
  {
    q: 'Qui fait les textes ?',
    a: "Je peux partir de vos contenus existants, vous aider à les restructurer ou proposer une trame de rédaction plus claire. L'objectif n'est pas seulement d'avoir du texte, mais un message lisible, crédible et adapté à vos clients. Si besoin, je peux aussi cadrer cela avec un partenaire contenu.",
  },
  {
    q: 'Et après livraison ?',
    a: "La mise en ligne n'est pas la fin du travail. Je peux proposer un suivi de maintenance à partir de 45 EUR HT par mois pour les petites corrections, mises à jour, vérifications de base et ajustements ponctuels. Si le site doit évoluer davantage, on peut aussi fonctionner avec une maintenance plus active ou des évolutions au fil de l'eau.",
  },
]

const marqueeItems = ['Sites vitrines', 'E-commerce', 'SaaS', 'Outils métier', 'Stripe', 'Supabase', 'SEO technique', 'Facture électronique']

const homeStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyInfo.brandName,
    url: siteUrl,
    inLanguage: 'fr-FR',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: companyInfo.brandName,
    url: siteUrl,
    email: companyInfo.email,
    description: companyInfo.positioning,
    areaServed: ['Rennes', 'Grand Ouest', 'France'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rennes',
      addressCountry: 'FR',
    },
    founder: {
      '@type': 'Person',
      name: companyInfo.founderName,
    },
    sameAs: companyInfo.socialLinks.map((item) => item.href),
    serviceType: ['Développement web', 'Site vitrine', 'E-commerce', 'Outil métier', 'Intégration Stripe'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: companyInfo.founderName,
    jobTitle: companyInfo.founderRole,
    url: siteUrl,
    worksFor: {
      '@type': 'Organization',
      name: companyInfo.brandName,
    },
    sameAs: companyInfo.socialLinks.map((item) => item.href),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  },
]

export default function Home() {
  const featured = projects.find((project) => project.featured)
  const others = projects.filter((project) => !project.featured)
  const heroShots = projects.filter((project) => ['vigie-seo', 'dentalcao', 'kompta'].includes(project.slug))
  const maltLink = companyInfo.socialLinks.find((item) => item.label === 'Malt')?.href
  const marqueeRow = (
    <div className="marquee-row">
      {marqueeItems.map((item) => (
        <span key={item} className="row" style={{ gap: 26 }}>
          <span>{item}</span>
          <span className="dot" />
        </span>
      ))}
    </div>
  )

  return (
    <>
      <PageMeta
        title="Création de sites web et outils métier à Rennes"
        path="/"
        description="CSTLAB accompagne les projets web, e-commerce et outils métier avec une approche sobre, rapide et maintenable."
        structuredData={homeStructuredData}
      />

      <section className="home-hero">
        <div className="hero">
          <div className="hero-badges">
            <span className="badge ok"><span className="dot-live" /> Disponible pour de nouveaux projets</span>
          </div>
          <TitleWords text="Des sites et des outils web qui tiennent la route." highlight="route." />
          <p>
            Je suis {companyInfo.founderName}, développeur full-stack à Rennes. Je conçois des sites,
            des e-commerces et des SaaS, du cadrage à la mise en ligne.
          </p>
          <div className="actions">
            <Link to="/audit" className="btn btn-dark">Demander un devis</Link>
            <Link to="/projets" className="btn">Voir les projets →</Link>
          </div>
        </div>

        <div className="shots" aria-hidden="true">
          {heroShots.map((project) => (
            <figure key={project.slug} className="shot">
              <img src={project.localImage} alt="" width="1100" height="687" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="kpis">
          <div className="kpi blue rv"><span className="v" data-count>{projects.length}</span><span className="l">projets en ligne</span></div>
          <div className="kpi pink rv" style={{ '--d': '80ms' }}><span className="v" data-count>{clientTestimonials.rating}</span><span className="l">sur 5 sur Malt</span></div>
          <div className="kpi rv" style={{ '--d': '160ms' }}><span className="v" data-count>24 h</span><span className="l">pour une première réponse</span></div>
          <div className="kpi mint rv" style={{ '--d': '240ms' }}><span className="v" data-count>1</span><span className="l">interlocuteur, du devis à la mise en ligne</span></div>
        </div>
      </section>

      <div className="marquee-wrap fullbleed" aria-hidden="true">
        <div className="marquee">
          <div className="marquee-track">
            {marqueeRow}
            {marqueeRow}
          </div>
        </div>
      </div>

      {featured ? <FeaturedProject project={featured} /> : null}

      <section className="section">
        <SectionHead
          eyebrow="Réalisations"
          title="Projets récents"
          action={<Link to="/projets" className="btn">Voir les {projects.length} projets →</Link>}
        >
          Projets pro pour des clients, et projets perso pour tester des idées. Chaque carte le précise.
        </SectionHead>
        <div className="grid-3">
          {others.slice(0, 6).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} delay={(index % 3) * 80} />
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Expertises" title="Ce que je prends en charge" action={<Link to="/services" className="btn">Détail des services →</Link>} />
        <div className="grid-4">
          {serviceShowcase.map((service, index) => (
            <Link key={service.id} to="/services" className={`card rv ${tone(index)}`.trim()} style={{ '--d': `${index * 70}ms` }}>
              <span className="icon-round" aria-hidden="true">{service.number}</span>
              <h3>{service.label}</h3>
              <p className="muted">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Offres" title="Repères de budget">
          Des fourchettes indicatives, hors taxes. L’audit permet de chiffrer plus juste.
        </SectionHead>
        <div className="grid-3">
          {packagedOffers.map((offer, index) => (
            <article key={offer.name} className={`card hoverable offer rv ${index === 1 ? 'outlined mint' : tone(index + 2)}`.trim()} style={{ '--d': `${index * 80}ms` }}>
              <h3>{offer.name}</h3>
              <p className="price">
                {offer.range} {offer.per ? <small>{offer.per}</small> : null}
              </p>
              <p className="muted">{offer.desc}</p>
              <ul className="checks">
                {offer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to="/audit" className={`btn ${index === 1 ? 'btn-dark' : ''}`.trim()}>
                Demander un chiffrage
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead
          eyebrow="Avis clients"
          title="Ce qu’en disent les clients"
          action={maltLink ? <a href={maltLink} target="_blank" rel="noreferrer" className="btn">Voir le profil Malt ↗</a> : null}
        />
        <div className="reviews">
          <article className="card mint rv">
            <p className="eyebrow" style={{ margin: 0 }}>{clientTestimonials.sourceLabel}</p>
            <div className="score">
              <b data-count>{clientTestimonials.rating}</b>
              <span className="muted">/ 5 · {clientTestimonials.reviewCount}</span>
            </div>
            <p className="muted">{clientTestimonials.intro}</p>
          </article>
          {clientTestimonials.items.map((item, index) => (
            <article key={item.author} className={`card rv ${tone(index)}`.trim()} style={{ '--d': `${(index + 1) * 70}ms` }}>
              <p className="quote">{item.quote}</p>
              <div className="who">
                <span className="avatar" aria-hidden="true">{item.author.charAt(0)}</span>
                <div>
                  <b>{item.author}</b>
                  <p className="muted" style={{ fontSize: '.9rem' }}>{item.role}, {item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Questions fréquentes" title="Avant de se lancer" />
        <Faq items={faqItems} />
      </section>

      <CtaBlock
        eyebrow="Basé à Rennes"
        title="Un audit pour un devis clair et actionnable."
        text={`${companyInfo.founderName} peut intervenir sur site à Rennes et autour pour cadrer un besoin, aligner les priorités et accélérer le projet.`}
        primary={{ to: '/audit', label: '✦ Lancer mon audit' }}
        secondary={{ to: '/services', label: 'Voir les services' }}
      />
    </>
  )
}
