import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import 'locomotive-scroll/dist/locomotive-scroll.css'

export default function SmoothScrollProvider({ children }) {
  const containerRef = useRef(null)
  const scrollRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    let mounted = true
    let instance = null

    async function initSmoothScroll() {
      const LocomotiveScroll = (await import('locomotive-scroll')).default

      if (!mounted || !containerRef.current) {
        return
      }

      instance = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        lerp: 0.085,
        multiplier: 0.95,
        class: 'is-inview',
        reloadOnContextChange: true,
        getDirection: true,
        smartphone: { smooth: true },
        tablet: { smooth: true, breakpoint: 1024 },
      })

      scrollRef.current = instance
    }

    initSmoothScroll()

    return () => {
      mounted = false
      if (instance) {
        instance.destroy()
      }
      scrollRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!scrollRef.current) {
      return
    }

    scrollRef.current.scrollTo(0, { duration: 0, disableLerp: true })

    const timeoutFast = setTimeout(() => {
      scrollRef.current?.update()
    }, 80)

    const timeoutAfterTransition = setTimeout(() => {
      scrollRef.current?.update()
    }, 500)

    return () => {
      clearTimeout(timeoutFast)
      clearTimeout(timeoutAfterTransition)
    }
  }, [location.pathname])

  useEffect(() => {
    function onResize() {
      scrollRef.current?.update()
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div ref={containerRef} data-scroll-container className="smooth-scroll-container">
      {children}
    </div>
  )
}
