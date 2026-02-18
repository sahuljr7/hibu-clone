'use client'

import { useEffect, useMemo, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number | null>(null)

  const lastScrollTsRef = useRef<number>(0)
  const intensityRef = useRef<number>(0.55)
  const lastCssUpdateTsRef = useRef<number>(0)
  const reducedRef = useRef<boolean>(true)

  const seed = useMemo(() => Math.floor(Math.random() * 1_000_000), [])

  useEffect(() => {
    reducedRef.current = prefersReducedMotion()
    lastScrollTsRef.current = performance.now()

    const onScroll = () => {
      lastScrollTsRef.current = performance.now()
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (reducedRef.current) {
      // Keep visuals extremely subtle for reduced motion users.
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      return
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let destroyed = false
    let lastTs = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, window.innerWidth)
      const h = Math.max(1, window.innerHeight)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = w * h
      const isMobile = Math.min(w, h) < 640
      const targetCount = clamp(Math.round(area / (isMobile ? 45_000 : 32_000)), 24, 64)

      const current = particlesRef.current
      if (current.length === targetCount) return

      const next: Particle[] = []
      const existing = Math.min(current.length, targetCount)
      for (let i = 0; i < existing; i++) next.push(current[i]!)

      // Deterministic-ish initialization per mount (helps consistency).
      let s = seed
      const rand = () => {
        s = (s * 1664525 + 1013904223) % 4294967296
        return s / 4294967296
      }

      for (let i = existing; i < targetCount; i++) {
        const speed = 0.08 + rand() * 0.14
        const angle = rand() * Math.PI * 2
        next.push({
          x: rand() * w,
          y: rand() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 1 + rand() * 1.6,
        })
      }

      particlesRef.current = next
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    const tick = (ts: number) => {
      if (destroyed) return

      const w = Math.max(1, window.innerWidth)
      const h = Math.max(1, window.innerHeight)

      const dt = clamp(ts - lastTs, 8, 48)
      lastTs = ts

      const msSinceScroll = ts - lastScrollTsRef.current
      const targetIntensity = msSinceScroll > 160 ? 0.9 : 0.4
      intensityRef.current += (targetIntensity - intensityRef.current) * 0.06
      const intensity = intensityRef.current

      // Throttle CSS variable updates (affects light theme blobs).
      if (ts - lastCssUpdateTsRef.current > 80) {
        lastCssUpdateTsRef.current = ts
        const root = document.documentElement
        root.style.setProperty('--bg-intensity', intensity.toFixed(3))
      }

      // Only paint particles if dark theme is active (Tailwind sets `.dark` on html).
      const isDark = document.documentElement.classList.contains('dark')
      if (!isDark) {
        ctx.clearRect(0, 0, w, h)
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      if (particles.length === 0) {
        resize()
      }

      // Subtle, modern palette for dark.
      const dotAlpha = 0.16 + intensity * 0.12
      const lineAlpha = 0.03 + intensity * 0.05
      const speedMul = 0.75 + intensity * 0.55

      const maxLinkDist = 130 + intensity * 70
      const maxLinkDist2 = maxLinkDist * maxLinkDist

      // Update and draw dots.
      ctx.fillStyle = `rgba(240, 245, 255, ${dotAlpha.toFixed(3)})`

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!
        p.x += p.vx * (dt * speedMul)
        p.y += p.vy * (dt * speedMul)

        // Wrap edges.
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw links (O(n^2) but bounded by low particle count).
      ctx.strokeStyle = `rgba(180, 80, 255, ${lineAlpha.toFixed(3)})`
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]!
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]!
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > maxLinkDist2) continue
          const t = 1 - d2 / maxLinkDist2
          ctx.globalAlpha = clamp(t, 0, 1)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      destroyed = true
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [seed])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Light theme fluid background */}
      <div className="absolute inset-0 dark:hidden dynamic-fluid-bg" />

      {/* Dark theme particles background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 hidden dark:block"
      />

      {/* Subtle vignette + readability layer for both themes */}
      <div className="absolute inset-0 dynamic-bg-vignette" />
    </div>
  )
}

