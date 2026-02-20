'use client'

import { useRef, useEffect, useState } from 'react'

type ParallaxType = 'slow' | 'fast' | 'reverse' | 'horizontal'

interface UseParallaxOptions {
  offset?: number
  disabled?: boolean
  type?: ParallaxType
  easing?: 'linear' | 'easeOut' | 'easeInOut'
}

interface ParallaxValues {
  y?: number
  x?: number
  opacity?: number
  scale?: number
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { offset = 50, disabled = false, type = 'slow', easing = 'easeOut' } = options

  const ref = useRef<HTMLDivElement>(null)
  const [parallaxValues, setParallaxValues] = useState<ParallaxValues>({ y: 0, x: 0 })

  // Easing functions for smoother motion
  const applyEasing = (value: number, easingType: string): number => {
    switch (easingType) {
      case 'easeOut':
        return value * (2 - value)
      case 'easeInOut':
        return value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value
      default:
        return value
    }
  }

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (disabled || typeof window === 'undefined' || prefersReducedMotion) {
      return
    }

    let animationFrameId: number

    const handleScroll = () => {
      if (!ref.current) return

      animationFrameId = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect()
        const elementTop = window.scrollY + rect.top
        const elementCenter = elementTop + rect.height / 2
        const scrollCenter = window.scrollY + window.innerHeight / 2

        const distance = scrollCenter - elementCenter
        const normalizedDistance = Math.max(-1, Math.min(1, distance / window.innerHeight))
        const easedDistance = applyEasing(Math.abs(normalizedDistance), easing) * Math.sign(normalizedDistance)

        let values: ParallaxValues = {}

        switch (type) {
          case 'slow':
            // Text moves slower than scroll (0.4-0.6x speed)
            values.y = easedDistance * offset * 0.5
            break
          case 'fast':
            // Text moves faster than scroll (1.2-1.5x speed)
            values.y = easedDistance * offset * 1.3
            break
          case 'reverse':
            // Text moves opposite to scroll direction
            values.y = -easedDistance * offset * 0.8
            break
          case 'horizontal':
            // Text moves left/right with vertical scroll
            values.x = easedDistance * offset * 1.2
            values.y = 0
            break
          default:
            values.y = easedDistance * offset * 0.5
        }

        setParallaxValues(values)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [offset, disabled, type, easing])

  return { ref, parallaxValues }
}
