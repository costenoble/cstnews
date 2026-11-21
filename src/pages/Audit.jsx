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

const goals = [
  'Générer plus de leads',
  'Vendre en ligne',
  "Clarifier l'offre",
  'Automatiser une tâche',
  'Lancer un nouveau produit',
]

const features = [
  'Site vitrine',
  'E-commerce',
  'Espace client',
  'Paiement en ligne',
  'Blog / contenu SEO',
  'Connexion CRM',
  'Dashboard',
  'Interface admin',
]

const initialForm = {
  entreprise: '',
  nom: '',
  email: '',
  telephone: '',
  localisation: '',
  typeProjet: '',
  budget: '',
  delai: '',
  rdv: 'visio',
  siteActuel: '',
  contenuPret: '',
  brandingPret: '',
  objectifs: [],
  fonctionnalites: [],
  details: '',
}

const contactEndpoint =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? 'https://formsubmit.co/ajax/contact@cstlab.dev'

const options = {
  typeProjet: [
    { value: 'site-marketing', label: 'Site marketing' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'plateforme-web', label: 'Plateforme web' },
    { value: 'outil-interne', label: 'Outil interne' },
    { value: 'refonte', label: 'Refonte' },
    { value: 'autre', label: 'Autre' },
  ],
  rdv: [
    { value: 'visio', label: 'Visio' },
    { value: 'telephone', label: 'Téléphone' },
    { value: 'sur-place-rennes', label: 'Sur place (Rennes et alentours)' },
  ],
  pret: [
    { value: 'oui', label: 'Oui' },
    { value: 'partiellement', label: 'Partiellement' },
    { value: 'non', label: 'Non' },
  ],
  budget: [
    { value: 'moins-5k', label: 'Moins de 5 000 €' },
    { value: '5k-15k', label: '5 000 à 15 000 €' },
    { value: '15k-30k', label: '15 000 à 30 000 €' },
    { value: '30k-60k', label: '30 000 à 60 000 €' },
    { value: 'plus-60k', label: 'Plus de 60 000 €' },
  ],
  delai: [
    { value: 'asap', label: 'Dès que possible' },
    { value: '1-2-mois', label: '1 à 2 mois' },
    { value: '3-4-mois', label: '3 à 4 mois' },
    { value: '5-6-mois', label: '5 à 6 mois' },
    { value: 'plus-6-mois', label: 'Plus de 6 mois' },
  ],
}

const requiredSelects = [
  { name: 'typeProjet', label: 'Type de projet' },
  { name: 'budget', label: 'Budget estimé' },
  { name: 'delai', label: 'Délai visé' },
]

function toggleArrayItem(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function joinList(list) {
  return list.length > 0 ? list.join(', ') : 'Non précisé'
}

async function sendAuditRequest(form, shield) {
  const payload = {
    entreprise: normalizeShortText(form.entreprise),
    nom: normalizeShortText(form.nom),
    email: normalizeShortText(form.email),
    telephone: normalizeShortText(form.telephone) || 'Non renseigné',
    localisation: normalizeShortText(form.localisation) || 'Non renseignée',
    type_projet: form.typeProjet,
    objectifs: joinList(form.objectifs),
    fonctionnalites: joinList(form.fonctionnalites),
    site_actuel: normalizeShortText(form.siteActuel) || 'Non précisé',
    contenu_pret: form.contenuPret || 'Non précisé',
    branding_pret: form.brandingPret || 'Non précisé',
    budget: form.budget,
    delai: form.delai,
    preference_rdv: form.rdv,
    details: normalizeLongText(form.details),
    consentement: shield.consent ? 'Oui' : 'Non',
    provenance: 'Page audit',
    _subject: `[CSTLAB] Nouvelle demande d'audit - ${form.entreprise || form.nom}`,
    _template: 'table',
    _honey: shield.website,
  }

  await postFormPayload(contactEndpoint, payload)
}

export default function Audit() {
  const [form, setForm] = useState(initialForm)
  const [shield, setShield] = useState(getFormBootPayload)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isSending = status === 'sending'
  const submitted = status === 'success'

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

  function handleToggle(name, value) {
    setForm((prev) => ({ ...prev, [name]: toggleArrayItem(prev[name], value) }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    const missing = requiredSelects.find((item) => !form[item.name])
    if (missing) {
      setErrorMessage(`Choisissez une option pour « ${missing.label} ».`)
      return
    }

    if (form.objectifs.length === 0) {
      setErrorMessage('Sélectionnez au moins un objectif pour rendre le cadrage utile.')
      return
    }

    if (normalizeLongText(form.details).length < 30) {
      setErrorMessage('Ajoutez un peu plus de contexte pour obtenir un chiffrage vraiment exploitable.')
      return
    }

    const shieldError = validateFormShield({
      formName: 'audit',
      startedAt: shield.startedAt,
      website: shield.website,
      consent: shield.consent,
    })

    if (shieldError) {
      setErrorMessage(shieldError)
      return
    }

    setStatus('sending')

    try {
      await sendAuditRequest(form, shield)
      markFormSubmitted('audit')
      setStatus('success')
      setForm(initialForm)
      setShield(getFormBootPayload())
    } catch (error) {
      setStatus('idle')
      setErrorMessage(error.message || 'Une erreur est survenue.')
    }
  }

  const city = companyInfo.locationLabel.split(',')[0]

  function pills(name, list) {
    return (
      <div className="pills" role="group">
        {list.map((item) => (
          <button
            key={item}
            type="button"
            className="pill"
            aria-pressed={form[name].includes(item)}
            onClick={() => handleToggle(name, item)}
          >
            {form[name].includes(item) ? '✓ ' : ''}{item}
          </button>
        ))}
      </div>
    )
  }

  function select(name, label, list, placeholder) {
    return (
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <Select id={name} name={name} value={form[name]} onChange={handleChange} options={list} placeholder={placeholder} />
      </div>
    )
  }

  return (
    <>
      <PageMeta
        title="Audit de projet web pour un devis clair"
        path="/audit"
        description="Questionnaire d'audit CSTLAB pour cadrer un projet web, e-commerce ou outil métier."
      />

      <PageHero eyebrow="Audit projet" title="On part de votre idée, on la clarifie, puis on la lance bien." highlight="clarifie,">
        Le but n'est pas de sortir un prix à la volée. Ce questionnaire m'aide à comprendre votre
        contexte, vos priorités et la meilleure manière d'avancer ensemble, simplement.
      </PageHero>

      <section className="contact-layout">
        <aside className="stack">
          <div className="card pink rv">
            <span className="icon-round" aria-hidden="true">✦</span>
            <h2 style={{ fontSize: '1.4rem' }}>À quoi ça sert, concrètement</h2>
            <p className="muted">
              Vos réponses me permettent de comprendre ce qui compte vraiment et de répondre avec
              quelque chose de clair, pas avec un devis approximatif.
            </p>
            <p className="muted">
              Si vous êtes à {city} ou autour, une rencontre sur site peut être organisée pour les phases clés.
            </p>
          </div>
          <div className="card rv" style={{ '--d': '80ms' }}>
            <h3>Plutôt pressé ?</h3>
            <p className="muted">Pour une prise de contact plus rapide, passez par la page contact.</p>
            <Link to="/contact" className="btn btn-small" style={{ justifySelf: 'start' }}>Écrire un message →</Link>
          </div>
        </aside>

        {submitted ? (
          <div className="card outlined mint success pop-in">
            <span className="star-badge" aria-hidden="true">✓</span>
            <h2>Demande envoyée 🎉</h2>
            <p className="muted">
              Merci. Je reviens vers vous avec une première direction claire, des priorités simples
              et une façon concrète d'avancer ensemble.
            </p>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                setStatus('idle')
                setForm(initialForm)
                setShield(getFormBootPayload())
              }}
            >
              Envoyer une autre demande
            </button>
          </div>
        ) : (
          <form className="card outlined form-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="entreprise">Entreprise</label>
                <input id="entreprise" name="entreprise" type="text" value={form.entreprise} onChange={handleChange} placeholder="Nom de l'entreprise" autoComplete="organization" maxLength={120} required />
              </div>
              <div className="field">
                <label htmlFor="nom">Nom</label>
                <input id="nom" name="nom" type="text" value={form.nom} onChange={handleChange} placeholder="Votre nom" autoComplete="name" maxLength={80} required />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@entreprise.fr" autoComplete="email" maxLength={120} required />
              </div>
              <div className="field">
                <label htmlFor="telephone">Téléphone</label>
                <input id="telephone" name="telephone" type="tel" value={form.telephone} onChange={handleChange} placeholder="+33 6 00 00 00 00" autoComplete="tel" inputMode="tel" maxLength={30} />
              </div>
              <div className="field">
                <label htmlFor="localisation">Localisation</label>
                <input id="localisation" name="localisation" type="text" value={form.localisation} onChange={handleChange} placeholder="Ville / région" maxLength={120} />
              </div>
              {select('typeProjet', 'Type de projet', options.typeProjet, 'Choisissez une option')}

              <div className="field full">
                <span className="field-label">Objectifs principaux</span>
                {pills('objectifs', goals)}
              </div>
              <div className="field full">
                <span className="field-label">Fonctionnalités souhaitées</span>
                {pills('fonctionnalites', features)}
              </div>

              <div className="field">
                <label htmlFor="siteActuel">Site actuel</label>
                <input id="siteActuel" name="siteActuel" type="text" value={form.siteActuel} onChange={handleChange} placeholder="https://..." maxLength={240} />
              </div>
              {select('rdv', 'Préférence de rendez-vous', options.rdv)}
              {select('contenuPret', 'Contenus prêts ?', options.pret, 'Choisissez une option')}
              {select('brandingPret', 'Branding prêt ?', options.pret, 'Choisissez une option')}
              {select('budget', 'Budget estimé', options.budget, 'Choisissez une fourchette')}
              {select('delai', 'Délai visé', options.delai, 'Choisissez un délai')}

              <div className="field full">
                <label htmlFor="details">Contexte et attentes</label>
                <textarea
                  id="details"
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  placeholder="Priorités, contraintes, stack actuelle, équipe, dépendances, objectifs."
                  maxLength={3000}
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
                J'accepte que ces informations soient utilisées pour traiter ma demande et préparer un
                cadrage, conformément à la <Link to="/confidentialite">politique de confidentialité</Link>.
              </span>
            </label>

            {errorMessage ? (
              <p className="error-box shake" role="alert" key={errorMessage}>
                {errorMessage}
              </p>
            ) : null}

            <button type="submit" className={`btn btn-green btn-pop btn-block${isSending ? ' loading' : ''}`} disabled={isSending}>
              {isSending ? 'Envoi en cours…' : '✦ Recevoir mon cadrage'}
            </button>
          </form>
        )}
      </section>
    </>
  )
}
