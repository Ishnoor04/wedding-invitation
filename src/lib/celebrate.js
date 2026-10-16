import confetti from 'canvas-confetti'

const PETAL_COLORS = ['#C17373', '#D4A3A3', '#E8B4B4', '#F2D6C9', '#C9A66B', '#FFFFFF']

/** Soft petal path — no emoji (avoids canvas flicker) */
const PETAL_PATH =
  'M12 2 C8 6 4 10 4 14 C4 18 8 22 12 22 C16 22 20 18 20 14 C20 10 16 6 12 2 Z'

function shower(opts) {
  const petal = confetti.shapeFromPath({ path: PETAL_PATH })

  confetti({
    shapes: [petal, 'circle'],
    gravity: 0.8,
    drift: 0.35,
    ticks: 260,
    colors: PETAL_COLORS,
    disableForReducedMotion: true,
    ...opts,
  })
}

/** Soft petal celebration — delayed until after the frame expand */
export function celebrateOpen() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  // Wait for small→full frame morph to settle, then petals
  window.setTimeout(() => {
    shower({
      particleCount: 22,
      origin: { x: 0.15, y: 0.7 },
      angle: 60,
      spread: 50,
      startVelocity: 30,
      scalar: 1.05,
    })
    shower({
      particleCount: 22,
      origin: { x: 0.85, y: 0.7 },
      angle: 120,
      spread: 50,
      startVelocity: 30,
      scalar: 1.05,
    })
  }, 480)

  window.setTimeout(() => {
    shower({
      particleCount: 40,
      origin: { x: 0.5, y: 0.45 },
      angle: 90,
      spread: 100,
      startVelocity: 22,
      scalar: 1.1,
    })
  }, 620)
}
