'use client'

import { motion } from 'framer-motion'
import { DemoRequestForm } from './demo-request-form'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Demo Form Section Component
 * Two-column responsive layout with benefits list and form
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.5, 4.6
 */
export function DemoFormSection() {
  const prefersReducedMotion = useReducedMotion()

  const benefits = [
    'See how your website, ads, reviews and leads work together in one platform',
    'Get personalized recommendations for your business',
    'Learn how Hibu can help you grow your digital presence',
  ]

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.5
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 transition-colors duration-300 will-change-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration, ease: easing }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center"
          style={{ willChange: prefersReducedMotion ? 'auto' : 'opacity, transform' }}
        >
          {/* Left Column: Heading and Benefits */}
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight break-words">
              Ready to get started? Request your digital marketing demo
            </h1>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: animationDuration,
                    delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1,
                    ease: easing,
                  }}
                  className="flex items-start gap-4"
                >
                  {/* Numbered circle badge with green outline */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-green-600 dark:border-green-400 flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
                    <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-foreground pt-1.5 break-words">
                    {benefit}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Column: Demo Request Form */}
          <div className="flex justify-center lg:justify-end">
            <DemoRequestForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
