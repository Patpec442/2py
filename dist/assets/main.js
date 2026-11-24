document.addEventListener('click', event => {
  const toggle = event.target.closest('[data-menu-toggle]')
  if (toggle) {
    const links = document.querySelector('.links')
    links?.classList.toggle('open')
    toggle.setAttribute('aria-expanded', String(links?.classList.contains('open')))
  }

  const next = event.target.closest('[data-carousel-next]')
  const prev = event.target.closest('[data-carousel-prev]')
  if (next || prev) {
    const carousel = event.target.closest('[data-logo-carousel]')
    const viewport = carousel?.querySelector('.logo-viewport')
    const slide = carousel?.querySelector('.logo-slide')
    if (viewport && slide) {
      trackScroll(viewport, slide.offsetWidth * (next ? 1 : -1))
    }
  }

  const shotNext = event.target.closest('[data-shot-next]')
  const shotPrev = event.target.closest('[data-shot-prev]')
  if (shotNext || shotPrev) {
    const carousel = event.target.closest('[data-shot-carousel]')
    const track = carousel?.querySelector('.shot-track')
    if (track) {
      track.scrollBy({ left: track.clientWidth * (shotNext ? 1 : -1), behavior: 'smooth' })
      updateShotCount(carousel)
    }
  }

  const filter = event.target.closest('[data-filter]')
  if (filter) {
    const value = filter.dataset.filter
    document.querySelectorAll('[data-filter]').forEach(button => button.classList.toggle('active', button === filter))
    document.querySelectorAll('[data-case-sector]').forEach(card => {
      card.style.display = value === 'Tous' || card.dataset.caseSector === value ? '' : 'none'
    })
  }

  const consent = event.target.closest('[data-consent]')
  if (consent) {
    localStorage.setItem('2py_consent', consent.dataset.consent)
    document.querySelector('.cookie')?.classList.remove('show')
  }
})

document.addEventListener('submit', event => {
  if (!event.target.matches('[data-contact-form]')) return
  event.preventDefault()
  submitContactForm(event.target)
})

if (!localStorage.getItem('2py_consent')) {
  document.querySelector('.cookie')?.classList.add('show')
}

function trackScroll(viewport, distance) {
  viewport.scrollBy({ left: distance, behavior: 'smooth' })
}

document.querySelectorAll('[data-logo-carousel]').forEach(carousel => {
  const viewport = carousel.querySelector('.logo-viewport')
  if (!viewport) return

  viewport.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const slide = carousel.querySelector('.logo-slide')
    trackScroll(viewport, (event.key === 'ArrowRight' ? 1 : -1) * (slide?.offsetWidth || 150))
  })
})

document.querySelectorAll('[data-shot-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.shot-track')
  const viewport = carousel.querySelector('.shot-viewport')
  if (!track) return

  track.addEventListener('scroll', () => updateShotCount(carousel), { passive: true })
  viewport?.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    track.scrollBy({ left: track.clientWidth * (event.key === 'ArrowRight' ? 1 : -1), behavior: 'smooth' })
  })
  updateShotCount(carousel)
})

function updateShotCount(carousel) {
  const track = carousel?.querySelector('.shot-track')
  const counter = carousel?.querySelector('[data-shot-count]')
  if (!track || !counter) return
  const total = track.querySelectorAll('.shot-slide').length
  const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1)) + 1
  counter.textContent = `${Math.min(Math.max(index, 1), total)} / ${total}`
}

async function submitContactForm(form) {
  const notice = form.querySelector('.notice')
  const button = form.querySelector('button[type="submit"]')
  const endpoint = form.getAttribute('action') || '/contact-handler.php'
  const formData = new FormData(form)

  if (notice) {
    notice.textContent = 'Envoi en cours...'
    notice.style.display = 'block'
  }
  if (button) button.disabled = true

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok || data.ok === false) {
      throw new Error(data.message || 'Le message n’a pas pu être envoyé.')
    }
    form.reset()
    if (notice) notice.textContent = data.message || 'Votre demande a bien été transmise.'
  } catch (error) {
    if (notice) notice.textContent = error.message || 'Envoi indisponible. Vous pouvez écrire à contact@2py.fr.'
  } finally {
    if (button) button.disabled = false
  }
}
