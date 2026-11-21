import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'
import Select from '../components/Select.jsx'
import { PageHero } from '../components/ui.jsx'
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
  { label: 'Basé', value: companyInfo.locationLabel, href: null },
  { label: 'Zone', value: `${companyInfo.localTravelLabel} · ${companyInfo.serviceAreaLabel}`, href: null },
  { label: 'Réponse', value: companyInfo.responseTimeLabel, href: null },
]

const subjectOptions = [
  { value: 'site-marketing', label: 'Site marketing' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'outil-metier', label: 'Outil métier' },
  { value: 'integration', label: 'Intégration et automatisation' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'autre', label: 'Autre' },
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

    if (!form.sujet) {
      setSubmitError('Choisissez un sujet pour que je puisse orienter la réponse.')
      return
    }

    const message = normalizeLongText(form.message)

    if (message.length < 20) {
      setSubmitError('Donnez un peu plus de contexte pour que je puisse répondre utilement.')
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
    <>
      <PageMeta
        title="Contact pour un projet web ou outil métier"
        path="/contact"
        description="Échangeons sur votre projet web, e-commerce ou outil métier avec CSTLAB à Rennes."
      />

      <PageHero eyebrow="Contact" title="On peut cadrer un besoin, même s'il n'est pas encore formulé." highlight="besoin,">
        Que vous arriviez avec un brief, un audit ou juste une intuition, le but reste le même :
        clarifier le besoin et voir si CSTLAB est le bon format pour y répondre.
      </PageHero>

      <section className="contact-layout">
        <aside className="stack">
          <div className="card blue rv">
            <h2 style={{ fontSize: '1.4rem' }}>Contact principal</h2>
            <p className="muted">
              {companyInfo.founderName}, {companyInfo.founderRole}. Premier retour en général sous 24 h ouvrées.
            </p>
            <dl className="info-list">
              {contactItems.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.href ? <a href={item.href}>{item.value}</a> : item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card sun rv" style={{ '--d': '80ms' }}>
            <h3>Devis sous 48 h quand le besoin est clair</h3>
            <p className="muted">
              Si vous avez déjà les contenus, les accès et un périmètre un minimum posé, le cadrage peut aller très vite.
            </p>
          </div>
        </aside>

        {submitted ? (
          <div className="card outlined mint success pop-in">
            <span className="star-badge" aria-hidden="true">✓</span>
            <h2>Message envoyé 🎉</h2>
            <p className="muted">Merci. Je reviens vers vous rapidement pour voir comment avancer.</p>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                setStatus('idle')
                setForm(initialForm)
                setShield(getFormBootPayload())
              }}
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form className="card outlined form-card" onSubmit={handleSubmit} noValidate={false}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="prenom">Prénom</label>
                <input id="prenom" name="prenom" type="text" placeholder="Jean" value={form.prenom} onChange={handleChange} autoComplete="given-name" maxLength={60} required />
              </div>
              <div className="field">
                <label htmlFor="nom">Nom</label>
                <input id="nom" name="nom" type="text" placeholder="Dupont" value={form.nom} onChange={handleChange} autoComplete="family-name" maxLength={80} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="jean@exemple.fr" value={form.email} onChange={handleChange} autoComplete="email" maxLength={120} required />
              </div>
              <div className="field">
                <label htmlFor="telephone">Téléphone</label>
                <input id="telephone" name="telephone" type="tel" placeholder="+33 6 00 00 00 00" value={form.telephone} onChange={handleChange} autoComplete="tel" inputMode="tel" maxLength={30} />
              </div>
              <div className="field full">
                <label htmlFor="sujet">Sujet</label>
                <Select id="sujet" name="sujet" value={form.sujet} onChange={handleChange} options={subjectOptions} placeholder="Choisissez un sujet" required />
              </div>
              <div className="field full">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Décrivez le contexte, les enjeux, les contraintes ou l'urgence du projet."
                  value={form.message}
                  onChange={handleChange}
                  maxLength={2400}
                  required
                />
              </div>
            </div>

            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Site web</label>
              <input id="website" name="website" type="text" value={shield.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </div>

            <label className="check form-consent">
              <input type="checkbox" name="consent" checked={shield.consent} onChange={handleChange} />
              <span>
                J'accepte que ces informations soient utilisées pour traiter ma demande, conformément à la{' '}
                <Link to="/confidentialite">politique de confidentialité</Link>.
              </span>
            </label>

            {submitError ? (
              <p className="error-box shake" role="alert" key={submitError}>
                {submitError}
              </p>
            ) : null}

            <button type="submit" className={`btn btn-dark btn-block${isSending ? ' loading' : ''}`} disabled={isSending}>
              {isSending ? 'Envoi en cours…' : 'Envoyer le message →'}
            </button>
          </form>
        )}
      </section>
    </>
  )
}
