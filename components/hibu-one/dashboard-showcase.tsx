'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useInView } from '@/hooks/use-in-view'

export interface DashboardShowcaseProps {
  heading: string
  description: string
  dashboardUrl: string
}

/**
 * Dashboard Showcase Section component.
 * Displays all-in-one dashboard with large purple media card.
 * 
 * Styling:
 * - Media card: large purple gradient card
 * - Rounded corners: rounded-3xl
 * - Shadow: shadow-2xl
 * 
 * Animations:
 * - Card: fade-in + slide-up
 * - Optional: subtle hover effect (scale 1.02)
 * 
 * Respects prefers-reduced-motion accessibility preference.
 * 
 * Requirements: 2.7, 9.2, 9.3
 */
export function DashboardShowcase({
  heading,
  description,
  dashboardUrl,
}: DashboardShowcaseProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.2, once: true })

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      ref={ref}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-slate-900 transition-colors duration-[600ms] ease-in-out"
      aria-labelledby="dashboard-showcase-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Content - centered layout */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Heading and description */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.h2
              id="dashboard-showcase-heading"
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

          {/* Large purple gradient media card with glassmorphism */}
          <motion.div
            className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-900 backdrop-blur-sm border border-purple-400/20 dark:border-purple-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50"
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
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: easing,
            }}
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }
            }
          >
            <Image
              src={dashboardUrl}
              alt="Hibu One all-in-one dashboard displaying comprehensive marketing analytics and campaign performance metrics"
              fill
              className="object-cover"
              loading="lazy" // Below the fold - lazy loading
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2NzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjc1IiBmaWxsPSIjOWMzYWZmIi8+PC9zdmc+"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
