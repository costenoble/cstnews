import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'
import { companyInfo } from '../content/siteContent.js'
import {
  getFormBootPayload,
  markFormSubmitted,
  normalizeLongText,
  normalizeShortText,
  postFormPayload,
  validateFormShield,
} from '../lib/forms.js'

const contactItems = [
  { label: 'Email', value: companyInfo.email, href: `mailto:${companyInfo.email}` },
  { label: 'Base', value: companyInfo.locationLabel, href: null },
  { label: 'Zone', value: `${companyInfo.localTravelLabel} - ${companyInfo.serviceAreaLabel}`, href: null },
  { label: 'Réponse', value: companyInfo.responseTimeLabel, href: null },
]

const initialForm = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  sujet: '',
  message: '',
}

const contactEndpoint =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? 'https://formsubmit.co/ajax/contact@cstlab.dev'

async function sendContactEmail(form, shield) {
  const payload = {
    prenom: normalizeShortText(form.prenom),
    nom: normalizeShortText(form.nom),
    email: normalizeShortText(form.email),
    telephone: normalizeShortText(form.telephone) || 'Non renseigné',
    sujet: form.sujet,
    message: normalizeLongText(form.message),
    consentement: shield.consent ? 'Oui' : 'Non',
    provenance: 'Page contact',
    _subject: `[CSTLAB] Nouveau message - ${form.sujet}`,
    _template: 'table',
    _honey: shield.website,
  }

  await postFormPayload(contactEndpoint, payload)
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [shield, setShield] = useState(getFormBootPayload)
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  const submitted = status === 'success'
  const isSending = status === 'sending'

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    if (name === 'website' || name === 'consent') {
      setShield((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    const message = normalizeLongText(form.message)

    if (message.length < 20) {
      setSubmitError('Merci de donner un peu plus de contexte pour que je puisse répondre utilement.')
      return
    }

    const shieldError = validateFormShield({
      formName: 'contact',
      startedAt: shield.startedAt,
      website: shield.website,
      consent: shield.consent,
    })

    if (shieldError) {
      setSubmitError(shieldError)
      return
    }

    setStatus('sending')

    try {
      await sendContactEmail(form, shield)
      markFormSubmitted('contact')
      setStatus('success')
      setForm(initialForm)
      setShield(getFormBootPayload())
    } catch (error) {
      setStatus('idle')
      setSubmitError(error.message || 'Une erreur est survenue.')
    }
  }

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageMeta
        title="Contact"
        path="/contact"
        description="Échangeons sur votre projet web, e-commerce ou outil métier avec CSTLAB à Rennes."
      />

      <div className="page-hero container">
        <span className="page-hero-label">Contact</span>
        <h1 className="page-hero-title">On peut cadrer un besoin, même s'il n'est pas encore complètement formulé.</h1>
        <p className="page-hero-desc">
          Que tu arrives avec un brief, un audit ou juste une intuition, le but reste le
          même: clarifier le besoin et voir si CSTLAB est le bon format pour l'adresser.
        </p>
      </div>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <div>
                <h2 className="contact-info-title">Contact principal</h2>
                <p className="contact-info-subtitle">
                  {companyInfo.founderName}, {companyInfo.founderRole}. Premier retour en
                  général sous 24h ouvrées.
                </p>
              </div>

              <div className="contact-info-items">
                {contactItems.map((item) => (
                  <div key={item.label} className="contact-info-item">
                    <span className="contact-info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="contact-info-value">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-info-value">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="contact-note-card">
                <div className="contact-note-title">Devis sous 48h quand le besoin est clair</div>
                <p className="contact-note-text">
                  Si tu as déjà les contenus, les accès et un périmètre un minimum posé,
                  le cadrage peut aller très vite.
                </p>
              </div>
            </div>

            <div className="contact-form">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="form-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="form-success-icon">OK</div>
                    <h3 className="form-success-title">Message envoyé</h3>
                    <p className="form-success-desc">
                      Merci. Je reviens vers toi rapidement pour voir comment avancer.
                    </p>
                    <button
                      type="button"
                      className="btn btn-orange"
                      onClick={() => {
                        setStatus('idle')
                        setForm(initialForm)
                        setShield(getFormBootPayload())
                      }}
                      style={{ marginTop: '8px' }}
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="prenom">Prénom</label>
                        <input
                          id="prenom"
                          name="prenom"
                          type="text"
                          className="form-input"
                          placeholder="Jean"
                          value={form.prenom}
                          onChange={handleChange}
                          autoComplete="given-name"
                          maxLength={60}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="nom">Nom</label>
                        <input
                          id="nom"
                          name="nom"
                          type="text"
                          className="form-input"
                          placeholder="Dupont"
                          value={form.nom}
                          onChange={handleChange}
                          autoComplete="family-name"
                          maxLength={80}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-input"
                          placeholder="jean@exemple.fr"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                          maxLength={120}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="telephone">Téléphone</label>
                        <input
                          id="telephone"
                          name="telephone"
                          type="tel"
                          className="form-input"
                          placeholder="+33 6 00 00 00 00"
                          value={form.telephone}
                          onChange={handleChange}
                          autoComplete="tel"
                          inputMode="tel"
                          maxLength={30}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="sujet">Sujet</label>
                      <select
                        id="sujet"
                        name="sujet"
                        className="form-select"
                        value={form.sujet}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Sélectionnez un sujet</option>
                        <option value="site-marketing">Site marketing</option>
                        <option value="e-commerce">E-commerce</option>
                        <option value="outil-metier">Outil métier</option>
                        <option value="integration">Intégration et automatisation</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        placeholder="Décris le contexte, les enjeux, les contraintes ou l'urgence du projet."
                        value={form.message}
                        onChange={handleChange}
                        maxLength={2400}
                        required
                      />
                    </div>

                    <div className="form-group form-honeypot" aria-hidden="true">
                      <label className="form-label" htmlFor="website">Site web</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        className="form-input"
                        value={shield.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <label className="form-consent">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={shield.consent}
                        onChange={handleChange}
                      />
                      <span>
                        J'accepte que ces informations soient utilisées pour traiter ma
                        demande, conformément à la{' '}
                        <Link to="/confidentialite" className="form-inline-link">
                          politique de confidentialité
                        </Link>
                        .
                      </span>
                    </label>

                    {submitError && (
                      <p className="form-error" role="alert">
                        {submitError}
                      </p>
                    )}

                    <button type="submit" className="form-submit" disabled={isSending}>
                      {isSending ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
