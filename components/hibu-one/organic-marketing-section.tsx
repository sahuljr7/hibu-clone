'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useInView } from '@/hooks/use-in-view'

export interface OrganicMarketingSectionProps {
  heading: string
  description: string
  features: string[]
}

/**
 * Organic Marketing Section component.
 * Highlights organic marketing capabilities on light blue background.
 * 
 * Styling:
 * - Background: light blue panel (bg-blue-50)
 * - Soft rounded corners
 * - Ample padding and whitespace
 * 
 * Animations:
 * - Section: fade-in on scroll
 * - Features: staggered slide-in from left
 * 
 * Respects prefers-reduced-motion accessibility preference.
 * 
 * Requirements: 2.6, 9.4
 */
export function OrganicMarketingSection({
  heading,
  description,
  features,
}: OrganicMarketingSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.2, once: true })

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      ref={ref}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 transition-colors duration-[600ms] ease-in-out"
      aria-labelledby="organic-marketing-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Light blue panel with rounded corners */}
        <motion.div
          className="bg-blue-50 rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg transition-colors duration-[600ms] ease-in-out"
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
            ease: easing,
          }}
        >
          {/* Content - centered layout */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Heading and description */}
            <div className="text-center space-y-4">
              <motion.h2
                id="organic-marketing-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
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
                  delay: prefersReducedMotion ? 0 : 0.1,
                  ease: easing,
                }}
              >
                {heading}
              </motion.h2>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
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
            </div>

            {/* Features list with staggered slide-in from left */}
            <ul className="space-y-4 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-base sm:text-lg text-foreground"
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                  }
                  transition={{
                    duration: animationDuration,
                    delay: prefersReducedMotion ? 0 : 0.3 + index * 0.15, // Staggered: 300ms, 450ms, 600ms...
                    ease: easing,
                  }}
                >
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
