import LegalPage from '../components/LegalPage.jsx'
import { legalSections } from '../content/siteContent.js'

export default function Cgv() {
  return (
    <LegalPage
      meta={{
        title: 'Conditions générales de vente des prestations',
        path: '/cgv',
        description:
          'Conditions générales de vente de CSTLAB : cadre des missions, périmètre, livrables et modalités financières. Le devis prévaut en cas de doute.',
      }}
      eyebrow="Conditions commerciales"
      title="Conditions générales de vente"
      intro="Ces conditions donnent le cadre général des missions. Le devis reste toujours le document contractuel prioritaire pour fixer le périmètre, les livrables et les modalités financières."
      sections={legalSections.cgv}
    />
  )
}
