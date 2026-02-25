'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useInView } from '@/hooks/use-in-view'

export interface HibuOneFeaturePanelProps {
  heading: string
  description: string
  features?: string[]
  dashboardImages: string[]
}

/**
 * Hibu One Feature Panel component.
 * Green-themed panel showcasing dashboard mockups with features.
 * 
 * Styling:
 * - Background: soft green gradient
 * - Rounded corners: rounded-3xl
 * - Responsive padding
 * 
 * Layout:
 * - Dashboard mockups displayed in responsive grid
 * - Text content with feature list
 * 
 * Animations:
 * - Panel: fade-in when entering viewport
 * - Dashboard images: staggered fade-in (100ms intervals)
 * 
 * Respects prefers-reduced-motion accessibility preference.
 * 
 * Requirements: 2.4, 9.2, 9.4
 */
export function HibuOneFeaturePanel({
  heading,
  description,
  features,
  dashboardImages,
}: HibuOneFeaturePanelProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.2, once: true })

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      ref={ref}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 transition-colors duration-[600ms] ease-in-out"
      aria-labelledby="feature-panel-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Green panel with rounded corners */}
        <motion.div
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg transition-colors duration-[600ms] ease-in-out"
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
          {/* Content grid - text and images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text content */}
            <div className="space-y-6">
              <h2
                id="feature-panel-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
              >
                {heading}
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>

              {/* Feature list if provided */}
              {features && features.length > 0 && (
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
                        delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1,
                        ease: easing,
                      }}
                    >
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dashboard mockups grid */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {dashboardImages.map((imageUrl, index) => (
                <motion.div
                  key={index}
                  className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl"
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
                    delay: prefersReducedMotion ? 0 : index * 0.1, // Staggered: 0ms, 100ms, 200ms
                    ease: easing,
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Dashboard mockup ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy" // Below the fold - lazy loading
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
