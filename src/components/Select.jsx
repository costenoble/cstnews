import { useEffect, useId, useRef, useState } from 'react'

/*
  Liste déroulante de la charte : pilule, pastille noire avec chevron vert qui tourne,
  liste crème bordée de noir, option active en pastel, option choisie en noir avec coche verte.
  Utilisable au clavier : flèches, Entrée, Échap, lettres.
  onChange reçoit un événement minimal { target: { name, value } } comme un <select>.
*/
export default function Select({ id, name, value, onChange, options, placeholder = 'Choisir…', required }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [up, setUp] = useState(false)
  const wrapRef = useRef(null)
  const btnRef = useRef(null)
  const listId = useId()

  const selectedIndex = options.findIndex((option) => option.value === value)
  const selected = options[selectedIndex]

  useEffect(() => {
    if (!open) return undefined
    function outside(event) {
      if (!wrapRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [open])

  function show() {
    const rect = btnRef.current.getBoundingClientRect()
    setUp(window.innerHeight - rect.bottom < 300 && rect.top > 300)
    setActive(selectedIndex >= 0 ? selectedIndex : 0)
    setOpen(true)
  }

  function choose(index) {
    onChange({ target: { name, value: options[index].value } })
    setOpen(false)
    btnRef.current?.focus()
  }

  function onKeyDown(event) {
    const last = options.length - 1
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!open) return show()
      setActive((current) => {
        if (event.key === 'ArrowDown') return current >= last ? 0 : current + 1
        return current <= 0 ? last : current - 1
      })
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) choose(active)
      else show()
    } else if (event.key === 'Escape' && open) {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Tab') {
      setOpen(false)
    } else if (event.key.length === 1 && /\S/.test(event.key)) {
      const index = options.findIndex((option) => option.label.toLowerCase().startsWith(event.key.toLowerCase()))
      if (index >= 0) {
        if (open) setActive(index)
        else onChange({ target: { name, value: options[index].value } })
      }
    }
    return undefined
  }

  return (
    <div ref={wrapRef} className={`sel${open ? ' open' : ''}${up ? ' up' : ''}`}>
      <button
        ref={btnRef}
        id={id}
        type="button"
        className="sel-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-required={required || undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
      >
        <span className={`sel-label${selected ? '' : ' sel-placeholder'}`}>{selected ? selected.label : placeholder}</span>
        <span className="sel-arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>
      {open ? (
        <ul className="sel-list" id={listId} role="listbox" aria-labelledby={id}>
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`sel-opt${index === active ? ' active' : ''}`}
              style={{ '--i': index }}
              onMouseDown={(event) => event.preventDefault()}
              onMouseMove={() => active !== index && setActive(index)}
              onClick={() => choose(index)}
            >
              {option.label}
              {option.value === value ? <span className="sel-check" aria-hidden="true">✓</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
