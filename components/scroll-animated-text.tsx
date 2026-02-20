'use client'

import { useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type AnimationType = 'horizontal' | 'scale' | 'zoom-in' | 'zoom-out' | 'reverse' | 'split-depth'

interface ScrollAnimatedTextProps {
  children: ReactNode
  type: AnimationType
  className?: string
  intensity?: number
}

interface CharacterPosition {
  char: string
  index: number
}

export function ScrollAnimatedText({
  children,
  type,
  className = '',
  intensity = 1,
}: ScrollAnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [characters, setCharacters] = useState<CharacterPosition[]>([])

  // Parse text into characters for split-depth animation
  useEffect(() => {
    if (type === 'split-depth' && typeof children === 'string') {
      setCharacters(
        children.split('').map((char, index) => ({
          char,
          index,
        }))
      )
    }
  }, [children, type])

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

  // For split-depth animation, render individual characters
  if (type === 'split-depth') {
    const textContent = typeof children === 'string' ? children : ''
    return (
      <div
        ref={ref}
        className={`inline-block ${className}`}
        aria-label={textContent}
      >
        {textContent.split('').map((char, index) => {
          // Stagger the animation based on character position
          const charProgress = progress + (index * 0.05 - (textContent.length * 0.025))
          const clampedCharProgress = Math.max(-1, Math.min(1, charProgress))
          
          // Each character moves at slightly different speeds
          const depth = (index - textContent.length / 2) / textContent.length
          const charMove = clampedCharProgress * 30 * (1 + depth * 0.5) * intensity

          return (
            <span
              key={index}
              className="inline-block"
              style={{
                transform: `translateY(${charMove}px) translateZ(0)`,
                transitionDuration: '0ms',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          )
        })}
      </div>
    )
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
