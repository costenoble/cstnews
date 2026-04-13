import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageMeta from '../components/PageMeta.jsx'

export default function NotFound() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageMeta
        title="404"
        path="/404"
        description="La page demandée est introuvable."
        noIndex
      />

      <section className="section">
        <div className="container">
          <div className="not-found">
            <span className="section-label">Erreur 404</span>
            <h1 className="h1">Cette page n'existe pas.</h1>
            <p className="page-hero-desc">
              Le lien que vous avez suivi est invalide ou a été déplacé.
            </p>
            <Link to="/" className="btn btn-orange">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
