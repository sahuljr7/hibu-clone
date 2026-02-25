'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface SectionDividerProps {
  variant?: 'line' | 'gradient' | 'wave'
}

/**
 * Animated visual separator between major sections.
 * 
 * Supports three variants:
 * - line: Simple horizontal line that expands from center
 * - gradient: Gradient bar that fades in
 * - wave: SVG wave pattern that animates
 * 
 * Triggers animation on scroll using Intersection Observer.
 * Respects user's prefers-reduced-motion accessibility preference.
 * 
 * @param variant - Visual style of the divider (default: 'line')
 */
export function SectionDivider({ variant = 'line' }: SectionDividerProps) {
  const { ref, isInView } = useInView({ threshold: 0.5, once: true })
  const prefersReducedMotion = useReducedMotion()

  // Animation duration based on motion preference
  const duration = prefersReducedMotion ? 0.1 : 0.8

  if (variant === 'line') {
    return (
      <div ref={ref} className="w-full flex justify-center py-8">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: isInView ? '100%' : 0 }}
          transition={{ duration, ease: 'easeOut' }}
          style={{ maxWidth: '600px' }}
        />
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div ref={ref} className="w-full flex justify-center py-8">
        <motion.div
          className="h-1 w-full max-w-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            scaleX: isInView ? 1 : 0
          }}
          transition={{ duration, ease: 'easeOut' }}
        />
      </div>
    )
  }

  // Wave variant
  return (
    <div ref={ref} className="w-full py-8">
      <motion.svg
        viewBox="0 0 1200 40"
        className="w-full h-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration }}
      >
        <motion.path
          d="M0,20 Q300,0 600,20 T1200,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-300"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: duration * 1.5, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>
  )
}
