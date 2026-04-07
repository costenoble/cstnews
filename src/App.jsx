import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SmoothScrollProvider from './components/SmoothScrollProvider.jsx'
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

export default function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <SmoothScrollProvider>
        <main data-scroll-section>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
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
          </AnimatePresence>
        </main>
        <div data-scroll-section>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </>
  )
}
