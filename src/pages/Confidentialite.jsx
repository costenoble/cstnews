import LegalPage from '../components/LegalPage.jsx'
import { legalSections } from '../content/siteContent.js'

export default function Confidentialite() {
  return (
    <LegalPage
      meta={{
        title: 'Confidentialité et traitement des données',
        path: '/confidentialite',
        description: 'Politique de confidentialité et traitement des données sur le site CSTLAB.',
      }}
      eyebrow="Données personnelles"
      title="Politique de confidentialité"
      intro="Les formulaires ne servent qu'à traiter une prise de contact ou une demande d'audit. Cette page explique quelles données sont collectées et pourquoi."
      sections={legalSections.privacy}
    />
  )
}
