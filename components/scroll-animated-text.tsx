'use client'

import { useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type AnimationType = 'horizontal' | 'scale' | 'zoom-in' | 'zoom-out' | 'reverse'

interface ScrollAnimatedTextProps {
  children: ReactNode
  type: AnimationType
  className?: string
  intensity?: number
}

export function ScrollAnimatedText({
  children,
  type,
  className = '',
  intensity = 1,
}: ScrollAnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let animationFrameId: number

    const handleScroll = () => {
      if (!ref.current) return

      animationFrameId = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect()
        const elementTop = window.scrollY + rect.top
        const elementBottom = window.scrollY + rect.bottom
        const windowHeight = window.innerHeight
        const scrollCenter = window.scrollY + windowHeight / 2

        // Calculate progress: -1 (above viewport) to 1 (below viewport)
        const elementCenter = (elementTop + elementBottom) / 2
        const distance = scrollCenter - elementCenter
        const viewportSpan = windowHeight / 2
        const normalizedProgress = Math.max(-1, Math.min(1, distance / viewportSpan))

        setProgress(normalizedProgress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // Apply transformations based on animation type
  const getTransform = () => {
    const clampedProgress = Math.max(-1, Math.min(1, progress))

    switch (type) {
      case 'horizontal':
        // Move left/right with vertical scroll
        const horizontalMove = clampedProgress * 50 * intensity
        return `translateX(${horizontalMove}px) translateZ(0)`

      case 'scale':
        // Scale up/down based on scroll position
        const scale = 1 + clampedProgress * 0.15 * intensity
        return `scale(${scale}) translateZ(0)`

      case 'zoom-in':
        // Start small, scale up as scrolling down
        const zoomInScale = 0.9 + (clampedProgress + 1) * 0.05 * intensity
        return `scale(${zoomInScale}) translateZ(0)`

      case 'zoom-out':
        // Start large, scale down as scrolling down
        const zoomOutScale = 1.1 - (clampedProgress + 1) * 0.05 * intensity
        return `scale(${Math.max(0.85, zoomOutScale)}) translateZ(0)`

      case 'reverse':
        // Move up while scrolling down
        const reverseMove = -clampedProgress * 40 * intensity
        return `translateY(${reverseMove}px) translateZ(0)`

      default:
        return 'translateZ(0)'
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: getTransform(),
        transitionDuration: '0ms',
      }}
    >
      {children}
    </div>
  )
}
