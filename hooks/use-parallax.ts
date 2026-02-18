'use client'

import { useRef, useEffect, useState } from 'react'

interface UseParallaxOptions {
  offset?: number
  disabled?: boolean
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { offset = 50, disabled = false } = options

  const ref = useRef<HTMLDivElement>(null)
  const [parallaxValue, setParallaxValue] = useState(0)

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const elementTop = window.scrollY + rect.top
      const elementCenter = elementTop + rect.height / 2
      const scrollCenter = window.scrollY + window.innerHeight / 2

      const distance = scrollCenter - elementCenter
      const parallax = (distance / window.innerHeight) * offset

      setParallaxValue(parallax)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset, disabled])

  return { ref, parallaxValue }
}
