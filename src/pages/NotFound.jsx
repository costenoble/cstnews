import { Link } from 'react-router-dom'
import PageMeta from '../components/PageMeta.jsx'

export default function NotFound() {
  return (
    <>
      <PageMeta title="404" path="/404" description="La page demandée est introuvable." noIndex />
      <section className="not-found">
        <span className="badge bad">Erreur 404</span>
        <h1>Cette page n'existe pas.</h1>
        <p className="lead">Le lien que vous avez suivi est invalide ou a été déplacé.</p>
        <div className="row">
          <Link to="/" className="btn btn-dark">Retour à l'accueil</Link>
          <Link to="/projets" className="btn">Voir les projets →</Link>
        </div>
      </section>
    </>
  )
}
