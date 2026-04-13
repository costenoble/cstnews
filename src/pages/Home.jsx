import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { clientTestimonials, companyInfo, projects, serviceShowcase } from '../content/siteContent.js'

const slides = [
  {
    label: 'Développement Web',
    title: 'Des sites qui\nperforment.',
    desc: 'Nous créons des expériences web performantes, accessibles et belles.',
    image: 'photo-1460925895917-afdab827c52f',
  },
  {
    label: 'Design UX/UI',
    title: 'Des interfaces\nqui séduisent.',
    desc: 'Du wireframe au produit final, nous concevons des interfaces intuitives.',
    image: 'photo-1561070791-2526d30994b5',
  },
  {
    label: 'Stratégie Digitale',
    title: 'Une présence\nqui rayonne.',
    desc: 'Audit, stratégie et exécution pour une visibilité digitale solide.',
    image: 'photo-1553877522-43269d4ea984',
  },
]

const serviceCards = [
  {
    title: serviceShowcase[0].label,
    desc: serviceShowcase[0].description,
    image: 'photo-1498050108023-c5249f4df085',
  },
  {
    title: serviceShowcase[1].label,
    desc: serviceShowcase[1].description,
    image: 'photo-1559136555-9303baea8ebd',
  },
  {
    title: serviceShowcase[2].label,
    desc: serviceShowcase[2].description,
    image: 'photo-1504384308090-c894fdcc538d',
  },
  {
    title: serviceShowcase[3].label,
    desc: serviceShowcase[3].description,
    image: 'photo-1451187580459-43490279c0fa',
  },
]

const packagedOffers = [
  {
    name: 'Site vitrine',
    range: '1 200 EUR - 2 500 EUR',
    desc: 'Pour présenter votre activité et générer des demandes qualifiées.',
    items: ['5 à 10 pages', 'Design sur mesure', 'SEO technique de base', 'Formation prise en main'],
  },
  {
    name: 'Refonte complète',
    range: '1 000 EUR - 2 000 EUR',
    desc: 'Pour moderniser votre image et améliorer clairement les conversions.',
    items: ['Audit UX + technique', 'Nouvelle architecture', 'Nouveau design', 'Migration progressive'],
  },
  {
    name: 'Maintenance évolutive',
    range: '45 EUR - 150 EUR / mois',
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

const stripItems = [
  'Développement Web', 'Design UX/UI', 'Stratégie Digitale', 'Cloud & DevOps',
  'Branding', 'SEO', 'Motion Design', 'E-commerce',
]

const categories = ['Tous les services', 'Web', 'Design', 'Stratégie', 'Cloud']

function unsplash(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`
}

function ServiceRevealCard({ card, index, progress }) {
  const prefersReducedMotion = useReducedMotion()
  const start = 0.05 + index * 0.12
  const end = start + 0.22
  const clipPath = useTransform(progress, [start, end], [
    'inset(0% 0% 100% 0% round 28px)',
    'inset(0% 0% 0% 0% round 28px)',
  ])
  const opacity = useTransform(progress, [start, end], [0.3, 1])
  const y = useTransform(progress, [start, end], [30, 0])

  return (
    <motion.article
      className="service-card service-card-reveal"
      style={prefersReducedMotion ? undefined : { clipPath, opacity }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="service-card-inner" style={prefersReducedMotion ? undefined : { y }}>
        <img
          src={unsplash(card.image)}
          alt={card.title}
          className="service-card-image"
          loading="lazy"
        />
        <div className="service-card-body">
          <h3 className="service-card-title">{card.title}</h3>
          <p className="service-card-desc">{card.desc}</p>
        </div>
      </motion.div>
    </motion.article>
  )
}

function TestimonialRevealCard({ item, index, progress }) {
  const prefersReducedMotion = useReducedMotion()
  const start = 0.05 + index * 0.12
  const end = start + 0.24
  const clipPath = useTransform(progress, [start, end], [
    'inset(0% 0% 100% 0% round 28px)',
    'inset(0% 0% 0% 0% round 28px)',
  ])
  const opacity = useTransform(progress, [start, end], [0.3, 1])
  const y = useTransform(progress, [start, end], [28, 0])

  return (
    <motion.article
      className="testimonial-card testimonial-card-reveal"
      style={prefersReducedMotion ? undefined : { clipPath, opacity }}
    >
      <motion.div className="testimonial-card-shell" style={prefersReducedMotion ? undefined : { y }}>
        <span className="testimonial-source">{item.source}</span>
        <p className="testimonial-quote">{item.quote}</p>
        <div className="testimonial-footer">
          <div>
            <div className="testimonial-author">{item.author}</div>
            <div className="testimonial-role">
              {item.role} · {item.company}
            </div>
          </div>
          <div className="testimonial-context">{item.context}</div>
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [activeCategory, setActiveCategory] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [isAuditCtaExpanded, setIsAuditCtaExpanded] = useState(false)
  const auditCtaRef = useRef(null)
  const expertiseRef = useRef(null)
  const testimonialsRef = useRef(null)
  const { scrollYProgress: expertiseProgress } = useScroll({
    target: expertiseRef,
    offset: ['start 88%', 'end 34%'],
  })
  const { scrollYProgress: testimonialsProgress } = useScroll({
    target: testimonialsRef,
    offset: ['start 86%', 'end 24%'],
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const node = auditCtaRef.current
    if (!node) {
      return undefined
    }

    let frame = 0

    function updateExpandedState() {
      const rect = node.getBoundingClientRect()
      const viewportH = window.innerHeight || 0
      const isVisibleZone = rect.top < viewportH * 0.88 && rect.bottom > viewportH * 0.12

      setIsAuditCtaExpanded((prev) => (prev === isVisibleZone ? prev : isVisibleZone))
      frame = window.requestAnimationFrame(updateExpandedState)
    }

    frame = window.requestAnimationFrame(updateExpandedState)

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const slide = slides[current]
  const maltLink = companyInfo.socialLinks.find((item) => item.label === 'Malt')?.href

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageMeta
        path="/"
        description="CSTLAB accompagne les projets web, e-commerce et outils métier avec une approche sobre, rapide et maintenable."
      />

      <section className="hero container">
        <div className="hero-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${current}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="hero-tag">
                <span className="hero-tag-dot" />
                {slide.label}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {slide.title.split('\n').map((line, idx) =>
                idx === 1
                  ? <span key={idx}><br /><span className="orange">{line}</span></span>
                  : <span key={idx}>{line}</span>
              )}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              className="hero-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              {slide.desc}
            </motion.p>
          </AnimatePresence>

          <div className="hero-actions">
            <Link to="/audit" className="btn btn-orange">
              Demander un devis
            </Link>
            <Link to="/projets" className="btn btn-outline">
              Voir nos projets
            </Link>
          </div>

          <div className="hero-categories">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`hero-cat-pill${activeCategory === i ? ' active' : ''}`}
                onClick={() => setActiveCategory(i)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <AnimatePresence mode="wait">
            <motion.img
              key={`img-${current}`}
              src={unsplash(slide.image)}
              alt={slide.label}
              className="hero-image-main"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
      </section>

      <div className="services-strip">
        <div className="services-strip-inner">
          {[...stripItems, ...stripItems].map((item, i) => (
            <span key={i} className="services-strip-item">
              {item}
              <span className="services-strip-dot" />
            </span>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Nos expertises</span>
            <h2 className="h2">Ce que nous faisons</h2>
          </div>
          <div className="services-grid" ref={expertiseRef}>
            {serviceCards.map((card, i) => (
              <ServiceRevealCard
                key={card.title}
                card={card}
                index={i}
                progress={expertiseProgress}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Offres packagées</span>
            <h2 className="h2">Repères de budget</h2>
          </div>
          <div className="pricing-grid">
            {packagedOffers.map((offer) => (
              <article key={offer.name} className="pricing-card">
                <div className="pricing-top">
                  <h3 className="pricing-title">{offer.name}</h3>
                  <p className="pricing-range">{offer.range}</p>
                </div>
                <p className="pricing-desc">{offer.desc}</p>
                <ul className="pricing-list">
                  {offer.items.map((item) => (
                    <li key={item} className="pricing-item">{item}</li>
                  ))}
                </ul>
                <Link to="/audit" className="btn btn-outline pricing-btn">
                  Demander un chiffrage
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ objections</span>
            <h2 className="h2">Questions fréquentes avant de lancer</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <article
                  key={item.q}
                  className={`faq-item${isOpen ? ' open' : ''}`}
                  onMouseEnter={() => setOpenFaqIndex(index)}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="faq-arrow" aria-hidden="true">+</span>
                  </button>
                  <motion.div
                    className="faq-answer"
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      height: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.28, ease: 'easeOut' },
                    }}
                  >
                    <motion.div
                      className="faq-answer-inner"
                      initial={false}
                      animate={{
                        y: isOpen ? 0 : -10,
                      }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  </motion.div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rennes-banner">
            <span className="section-label">Présence locale</span>
            <h3 className="h3">Base à Rennes, déplacements possibles en entreprise.</h3>
            <p className="rennes-text">
              {companyInfo.founderName} peut intervenir sur site à Rennes et autour pour
              cadrer un besoin, aligner les priorités et accélérer le projet.
            </p>
            <Link to="/audit" className="btn btn-orange">
              Organiser un audit
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <span className="section-label">Nos réalisations</span>
              <h2 className="h2">Projets phares</h2>
            </div>
            <Link to="/projets" className="btn btn-outline">
              Voir tous les projets
            </Link>
          </div>
          <div className="projects-featured">
            {projects.map((project, i) => (
              <motion.a
                key={project.slug}
                className="project-card"
                href={project.siteUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Voir le site ${project.name}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={unsplash(project.image)}
                  alt={project.name}
                  className="project-card-image"
                  loading="lazy"
                />
                <span className="project-card-visit">Voir le site</span>
                <div className="project-card-info">
                  <span className="project-card-tag">{project.category}</span>
                  <h3 className="project-card-title">{project.name}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              <span className="section-label">Avis clients</span>
              <h2 className="h2">Des retours qui parlent du travail, pas juste du rendu.</h2>
            </div>
            {maltLink ? (
              <a
                href={maltLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Voir le profil Malt
              </a>
            ) : null}
          </div>

          <div ref={testimonialsRef} className="testimonials-layout">
            <motion.aside
              className="testimonials-proof"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="testimonials-proof-label">{clientTestimonials.sourceLabel}</span>
              <div className="testimonials-proof-score">
                <span className="testimonials-proof-rating">{clientTestimonials.rating}</span>
                <span className="testimonials-proof-outof">/5</span>
              </div>
              <div className="testimonials-proof-meta">
                <span>Le plus pertinent</span>
                <span>{clientTestimonials.reviewCount}</span>
              </div>
              <p className="testimonials-proof-text">{clientTestimonials.intro}</p>
              <div className="testimonials-proof-bars" aria-hidden="true">
                <div className="testimonials-proof-bar">
                  <span>Qualité</span>
                  <strong>5,0</strong>
                </div>
                <div className="testimonials-proof-bar">
                  <span>Délai</span>
                  <strong>5,0</strong>
                </div>
                <div className="testimonials-proof-bar">
                  <span>Communication</span>
                  <strong>5,0</strong>
                </div>
              </div>
            </motion.aside>

            <div className="testimonials-grid">
              {clientTestimonials.items.map((item, index) => (
                <TestimonialRevealCard
                  key={`${item.author}-${item.company}`}
                  item={item}
                  index={index}
                  progress={testimonialsProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        ref={auditCtaRef}
        className={`cta-section cta-section-expand${isAuditCtaExpanded ? ' is-inview' : ''}`}
      >
        <div className="cta-expand-orb" aria-hidden="true">
          Audit
        </div>
        <div className="cta-content">
          <span className="cta-label">Prêt à cadrer votre projet ?</span>
          <h2 className="cta-title">Passez par l'audit pour un devis clair et actionnable.</h2>
        </div>
        <div className="cta-actions">
          <Link to="/audit" className="btn btn-orange">
            Lancer mon audit
          </Link>
          <Link to="/services" className="btn btn-white">
            Voir les services
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
