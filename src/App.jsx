import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Projets from './pages/Projets.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Audit from './pages/Audit.jsx'
import MentionsLegales from './pages/MentionsLegales.jsx'
import Confidentialite from './pages/Confidentialite.jsx'
import Cgv from './pages/Cgv.jsx'
import NotFound from './pages/NotFound.jsx'

function countUp(node) {
  const raw = node.textContent
  const target = parseFloat(raw.replace(/\s/g, '').replace(',', '.'))
  if (Number.isNaN(target)) return
  const decimals = (raw.split(',')[1] || '').replace(/\D/g, '').length
  const suffix = raw.replace(/^[\d\s.,]+/, '')
  const start = performance.now()
  const duration = 1100
  function frame(now) {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    node.textContent = (target * eased).toLocaleString('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix
    if (t < 1) requestAnimationFrame(frame)
    else node.textContent = raw
  }
  requestAnimationFrame(frame)
}

/* Apparition des blocs .rv au défilement, et chiffres clés qui comptent */
function useReveal(pathname) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = document.querySelectorAll('.rv:not(.in)')
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('in')
          entry.target.querySelectorAll('[data-count]').forEach(countUp)
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    nodes.forEach((node) => io.observe(node))

    // blocs ajoutés plus tard (filtres, formulaire envoyé…)
    const mo = new MutationObserver(() => {
      document.querySelectorAll('.rv:not(.in):not([data-rv])').forEach((node) => {
        node.dataset.rv = '1'
        io.observe(node)
      })
    })
    nodes.forEach((node) => { node.dataset.rv = '1' })
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useReveal(pathname)

  return (
    <>
      <Header />
      <main id="main" className="enter" tabIndex={-1} key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cgv" element={<Cgv />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
