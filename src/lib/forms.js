const MIN_FILL_DURATION_MS = 3500
const SUBMIT_COOLDOWN_MS = 45000

export function normalizeShortText(value) {
  return value.trim().replace(/\s+/g, ' ')
}

export function normalizeLongText(value) {
  return value
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n')
}

export function getFormBootPayload() {
  return {
    startedAt: Date.now(),
    website: '',
    consent: false,
  }
}

export function getSubmitCooldownKey(formName) {
  return `cstlab:${formName}:last-submit`
}

export function getRemainingCooldownMs(formName) {
  if (typeof window === 'undefined') {
    return 0
  }

  const lastSubmitAt = Number(window.sessionStorage.getItem(getSubmitCooldownKey(formName)))

  if (!lastSubmitAt) {
    return 0
  }

  const remaining = SUBMIT_COOLDOWN_MS - (Date.now() - lastSubmitAt)
  return remaining > 0 ? remaining : 0
}

export function markFormSubmitted(formName) {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(getSubmitCooldownKey(formName), String(Date.now()))
}

export function validateFormShield({ formName, startedAt, website, consent }) {
  if (website.trim() !== '') {
    return 'Envoi refuse.'
  }

  if (!consent) {
    return 'Merci de confirmer que tu acceptes le traitement de ta demande.'
  }

  if (Date.now() - startedAt < MIN_FILL_DURATION_MS) {
    return "Prends quelques secondes pour relire le formulaire avant de l'envoyer."
  }

  const remainingCooldown = getRemainingCooldownMs(formName)

  if (remainingCooldown > 0) {
    const seconds = Math.ceil(remainingCooldown / 1000)
    return `Merci de patienter ${seconds}s avant un nouvel envoi.`
  }

  return ''
}

export async function postFormPayload(endpoint, payload) {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: controller.signal,
    })

    let data = null

    try {
      data = await response.json()
    } catch {
      data = null
    }

    const success =
      response.ok &&
      (data === null || data.success === true || data.success === 'true' || data.message === 'success')

    if (!success) {
      throw new Error(data?.message || 'Envoi impossible pour le moment.')
    }
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('Le service a mis trop de temps a repondre. Merci de reessayer.')
    }

    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}
