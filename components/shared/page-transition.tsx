'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * Page transition wrapper component that provides consistent page entry animations.
 * 
 * Applies fade-in and slide-up animations with cubic-bezier easing.
 * Respects user's prefers-reduced-motion accessibility preference.
 * 
 * Animation spec:
 * - Fade in: opacity 0 → 1
 * - Slide up: translateY(20px) → translateY(0)
 * - Duration: 0.6s
 * - Easing: cubic-bezier(0.4, 0, 0.2, 1)
 * 
 * @param children - Content to be animated
 */
export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()

  // If user prefers reduced motion, use minimal animation
  const variants = {
    initial: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : -20,
    },
  }

  const transition = {
    duration: prefersReducedMotion ? 0.1 : 0.6,
    ease: [0.4, 0, 0.2, 1], // cubic-bezier(0.4, 0, 0.2, 1)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}
