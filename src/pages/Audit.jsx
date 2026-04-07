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

const goals = [
  'Generer plus de leads',
  'Vendre en ligne',
  "Clarifier l'offre",
  'Automatiser une tache',
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

function toggleArrayItem(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

function joinList(list) {
  return list.length > 0 ? list.join(', ') : 'Non precise'
}

async function sendAuditRequest(form, shield) {
  const payload = {
    entreprise: normalizeShortText(form.entreprise),
    nom: normalizeShortText(form.nom),
    email: normalizeShortText(form.email),
    telephone: normalizeShortText(form.telephone) || 'Non renseigne',
    localisation: normalizeShortText(form.localisation) || 'Non renseignee',
    type_projet: form.typeProjet,
    objectifs: joinList(form.objectifs),
    fonctionnalites: joinList(form.fonctionnalites),
    site_actuel: normalizeShortText(form.siteActuel) || 'Non precise',
    contenu_pret: form.contenuPret || 'Non precise',
    branding_pret: form.brandingPret || 'Non precise',
    budget: form.budget,
    delai: form.delai,
    preference_rdv: form.rdv,
    details: normalizeLongText(form.details),
    consentement: shield.consent ? 'Oui' : 'Non',
    provenance: 'Page audit',
    _subject: `[CST Lab] Nouvelle demande d'audit - ${form.entreprise || form.nom}`,
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

    if (form.objectifs.length === 0) {
      setErrorMessage('Selectionne au moins un objectif pour rendre le cadrage utile.')
      return
    }

    if (normalizeLongText(form.details).length < 30) {
      setErrorMessage('Ajoute un peu plus de contexte pour obtenir un chiffrage vraiment exploitable.')
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

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <PageMeta
        title="Audit"
        path="/audit"
        description="Questionnaire d'audit CST Lab pour cadrer un projet web, e-commerce ou outil metier."
      />

      <div className="page-hero container">
        <span className="page-hero-label">Audit projet</span>
        <h1 className="page-hero-title">Un audit pour transformer un besoin flou en perimetre exploitable.</h1>
        <p className="page-hero-desc">
          L'objectif n'est pas juste de donner un prix. Le questionnaire sert a clarifier le
          besoin, les priorites, les integrations critiques et le niveau d'urgence reel.
        </p>
      </div>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container audit-layout">
          <aside className="audit-intro-card">
            <h2 className="audit-intro-title">Comment j'utilise ces reponses</h2>
            <p className="audit-intro-text">
              Le cadrage sert a estimer le perimetre, identifier les dependances critiques
              et proposer une trajectoire realiste plutot qu'un devis au doigt mouille.
            </p>
            <p className="audit-intro-text">
              Si tu es base a {companyInfo.locationLabel.split(',')[0]} ou autour, une
              rencontre sur site peut etre organisee pour les phases clees.
            </p>
            <p className="audit-intro-text">
              Besoin d'une prise de contact plus rapide ? Tu peux aussi passer par la page{' '}
              <Link to="/contact" className="audit-inline-link">
                Contact
              </Link>
              .
            </p>
          </aside>

          <div className="contact-form">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="audit-success"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="form-success-icon">OK</div>
                  <h3 className="form-success-title">Demande envoyee</h3>
                  <p className="form-success-desc">
                    Merci. Je reviens vers toi avec un cadrage, des priorites et une
                    premiere estimation exploitable.
                  </p>
                  <button
                    type="button"
                    className="btn btn-orange"
                    onClick={() => {
                      setStatus('idle')
                      setForm(initialForm)
                      setShield(getFormBootPayload())
                    }}
                  >
                    Envoyer une autre demande
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="audit-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="entreprise">Entreprise</label>
                      <input
                        id="entreprise"
                        name="entreprise"
                        type="text"
                        className="form-input"
                        value={form.entreprise}
                        onChange={handleChange}
                        placeholder="Nom de l'entreprise"
                        autoComplete="organization"
                        maxLength={120}
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
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="Ton nom"
                        autoComplete="name"
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
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@entreprise.fr"
                        autoComplete="email"
                        maxLength={120}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="telephone">Telephone</label>
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        className="form-input"
                        value={form.telephone}
                        onChange={handleChange}
                        placeholder="+33 6 00 00 00 00"
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={30}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="localisation">Localisation</label>
                      <input
                        id="localisation"
                        name="localisation"
                        type="text"
                        className="form-input"
                        value={form.localisation}
                        onChange={handleChange}
                        placeholder="Ville / region"
                        maxLength={120}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="typeProjet">Type de projet</label>
                      <select
                        id="typeProjet"
                        name="typeProjet"
                        className="form-select"
                        value={form.typeProjet}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Selectionne une option</option>
                        <option value="site-marketing">Site marketing</option>
                        <option value="e-commerce">E-commerce</option>
                        <option value="plateforme-web">Plateforme web</option>
                        <option value="outil-interne">Outil interne</option>
                        <option value="refonte">Refonte</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="form-label">Objectifs principaux</span>
                    <div className="audit-check-grid">
                      {goals.map((goal) => (
                        <label key={goal} className="audit-check-item">
                          <input
                            type="checkbox"
                            checked={form.objectifs.includes(goal)}
                            onChange={() => handleToggle('objectifs', goal)}
                          />
                          <span>{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <span className="form-label">Fonctionnalites souhaitees</span>
                    <div className="audit-check-grid">
                      {features.map((feature) => (
                        <label key={feature} className="audit-check-item">
                          <input
                            type="checkbox"
                            checked={form.fonctionnalites.includes(feature)}
                            onChange={() => handleToggle('fonctionnalites', feature)}
                          />
                          <span>{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="siteActuel">Site actuel</label>
                      <input
                        id="siteActuel"
                        name="siteActuel"
                        type="text"
                        className="form-input"
                        value={form.siteActuel}
                        onChange={handleChange}
                        placeholder="https://..."
                        maxLength={240}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="rdv">Preference de rendez-vous</label>
                      <select
                        id="rdv"
                        name="rdv"
                        className="form-select"
                        value={form.rdv}
                        onChange={handleChange}
                      >
                        <option value="visio">Visio</option>
                        <option value="telephone">Telephone</option>
                        <option value="sur-place-rennes">Sur place (Rennes et alentours)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="contenuPret">Contenus prets ?</label>
                      <select
                        id="contenuPret"
                        name="contenuPret"
                        className="form-select"
                        value={form.contenuPret}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Selectionne une option</option>
                        <option value="oui">Oui</option>
                        <option value="partiellement">Partiellement</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="brandingPret">Branding pret ?</label>
                      <select
                        id="brandingPret"
                        name="brandingPret"
                        className="form-select"
                        value={form.brandingPret}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Selectionne une option</option>
                        <option value="oui">Oui</option>
                        <option value="partiellement">Partiellement</option>
                        <option value="non">Non</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="budget">Budget estime</label>
                      <select
                        id="budget"
                        name="budget"
                        className="form-select"
                        value={form.budget}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Selectionne une fourchette</option>
                        <option value="moins-5k">Moins de 5 000 EUR</option>
                        <option value="5k-15k">5 000 a 15 000 EUR</option>
                        <option value="15k-30k">15 000 a 30 000 EUR</option>
                        <option value="30k-60k">30 000 a 60 000 EUR</option>
                        <option value="plus-60k">Plus de 60 000 EUR</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="delai">Delai vise</label>
                      <select
                        id="delai"
                        name="delai"
                        className="form-select"
                        value={form.delai}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Selectionne un delai</option>
                        <option value="asap">ASAP</option>
                        <option value="1-2-mois">1 a 2 mois</option>
                        <option value="3-4-mois">3 a 4 mois</option>
                        <option value="5-6-mois">5 a 6 mois</option>
                        <option value="plus-6-mois">Plus de 6 mois</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="details">Contexte et attentes</label>
                    <textarea
                      id="details"
                      name="details"
                      className="form-textarea"
                      value={form.details}
                      onChange={handleChange}
                      placeholder="Priorites, contraintes, stack actuelle, equipe, dependances, objectifs."
                      maxLength={3000}
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
                      J'accepte que ces informations soient utilisees pour traiter ma
                      demande et preparer un cadrage, conformement a la{' '}
                      <Link to="/confidentialite" className="form-inline-link">
                        politique de confidentialite
                      </Link>
                      .
                    </span>
                  </label>

                  {errorMessage && (
                    <p className="form-error" role="alert">
                      {errorMessage}
                    </p>
                  )}

                  <button type="submit" className="form-submit" disabled={isSending}>
                    {isSending ? 'Envoi en cours...' : 'Recevoir mon cadrage'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
