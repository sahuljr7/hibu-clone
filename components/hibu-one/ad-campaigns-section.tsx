'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useInView } from '@/hooks/use-in-view'
import { useParallax } from '@/hooks/use-parallax'

export interface AdCampaignsSectionProps {
  heading: string
  description: string
  features: string[]
  mediaUrl: string
}

/**
 * Ad Campaigns Section component.
 * Showcases ad campaign features with purple media card on white background.
 * 
 * Styling:
 * - Background: white
 * - Media card: purple gradient
 * - Rounded corners: rounded-2xl
 * 
 * Layout:
 * - Alternating image/text layout (text left, media right)
 * - Responsive stacking on mobile
 * 
 * Animations:
 * - Heading: parallax text (slow type)
 * - Features list: staggered fade-in
 * - Media card: fade-in + scale (0.95 → 1)
 * 
 * Respects prefers-reduced-motion accessibility preference.
 * 
 * Requirements: 2.5, 9.1, 9.3
 */
export function AdCampaignsSection({
  heading,
  description,
  features,
  mediaUrl,
}: AdCampaignsSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.2, once: true })
  
  // Parallax for heading - slow type with 20px offset
  const headingParallax = useParallax({
    type: 'slow',
    offset: 20,
    disabled: prefersReducedMotion,
  })

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      ref={ref}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-slate-900 transition-colors duration-[600ms] ease-in-out"
      aria-labelledby="ad-campaigns-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Alternating layout: text left, media right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content - left side */}
          <div className="space-y-6">
            <motion.h2
              id="ad-campaigns-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
              style={headingParallax}
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

            {/* Features list with staggered fade-in */}
            <ul className="space-y-3">
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
                  <span className="text-purple-600 dark:text-purple-400 font-bold mt-1">✓</span>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Purple gradient media card with glassmorphism - right side */}
          <motion.div
            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-900 backdrop-blur-sm border border-purple-400/20 dark:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50"
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
              delay: prefersReducedMotion ? 0 : 0.4,
              ease: easing,
            }}
          >
            <Image
              src={mediaUrl}
              alt="Ad campaign management interface showing multi-platform advertising tools"
              fill
              className="object-cover"
              loading="lazy" // Below the fold - lazy loading
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzljM2FmZiIvPjwvc3ZnPg=="
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
