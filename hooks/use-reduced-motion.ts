'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect user's motion preference for accessibility.
 * Returns true if user prefers reduced motion, false otherwise.
 * 
 * Respects the prefers-reduced-motion media query and updates
 * dynamically when the preference changes.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Handle changes to the preference
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)

    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  return prefersReducedMotion
}
