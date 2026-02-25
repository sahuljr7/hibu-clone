'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useInView } from '@/hooks/use-in-view'

export interface HibuOneFinalCTAProps {
  heading: string
  description: string
  ctaText: string
  ctaHref: string
}

/**
 * Final CTA Section component.
 * Conversion-focused section with centered CTA on dark navy background.
 * 
 * Styling:
 * - Background: dark navy (bg-slate-900)
 * - Text: white (text-white)
 * - CTA button: primary brand color with hover effects
 * 
 * Animations:
 * - Heading: fade-in + slide-up
 * - Description: fade-in, delay 200ms
 * - CTA button: fade-in + scale, delay 300ms
 * 
 * Respects prefers-reduced-motion accessibility preference.
 * 
 * Requirements: 2.8, 9.6
 */
export function HibuOneFinalCTA({
  heading,
  description,
  ctaText,
  ctaHref,
}: HibuOneFinalCTAProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.2, once: true })

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      ref={ref}
      className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-slate-900 transition-colors duration-[600ms] ease-in-out"
      aria-labelledby="final-cta-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Centered content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Heading with fade-in + slide-up */}
          <motion.h2
            id="final-cta-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
            }
            transition={{
              duration: animationDuration,
              ease: easing,
            }}
          >
            {heading}
          </motion.h2>

          {/* Description with fade-in, delay 200ms */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={
              isInView
                ? { opacity: 1 }
                : prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0 }
            }
            transition={{
              duration: animationDuration,
              delay: prefersReducedMotion ? 0 : 0.2,
              ease: easing,
            }}
          >
            {description}
          </motion.p>

          {/* CTA button with fade-in + scale, delay 300ms */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
            }
            transition={{
              duration: animationDuration,
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: easing,
            }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center px-8 py-4 text-base sm:text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
