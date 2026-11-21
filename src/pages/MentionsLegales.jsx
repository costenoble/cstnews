import LegalPage from '../components/LegalPage.jsx'
import { legalSections } from '../content/siteContent.js'

export default function MentionsLegales() {
  return (
    <LegalPage
      meta={{
        title: 'Mentions légales et éditeur du site web',
        path: '/mentions-legales',
        description:
          'Mentions légales de CSTLAB : éditeur du site, hébergement et informations éditoriales. Consultez-les avant de poursuivre votre visite.',
      }}
      eyebrow="Cadre légal"
      title="Mentions légales"
      intro="Cette page rassemble les informations éditoriales essentielles du site."
      sections={legalSections.mentions}
    />
  )
}
