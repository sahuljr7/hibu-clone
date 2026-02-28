'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useInView } from '@/hooks/use-in-view'

export interface BenefitCard {
  title: string
  description: string
  icon?: string
}

export interface MarketingBenefitsProps {
  cards: [BenefitCard, BenefitCard]
}

/**
 * Marketing Benefits section component for Hibu One landing page.
 * Displays two feature cards highlighting "One Platform" and "One Provider".
 * 
 * Layout:
 * - Desktop: Two-column grid
 * - Mobile: Single column, stacked
 * 
 * Animations:
 * - Staggered card reveals with 200ms delay between cards
 * - Each card: fade-in + slide-up
 * - Triggered when section enters viewport (threshold 0.2)
 * 
 * Respects prefers-reduced-motion accessibility preference.
 * 
 * Requirements: 2.3, 7.1, 7.2, 7.3, 8.3
 */
export function MarketingBenefits({ cards }: MarketingBenefitsProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, isInView } = useInView({ threshold: 0.2, once: true })

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      ref={ref}
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 transition-colors duration-[600ms] ease-in-out"
      aria-labelledby="marketing-benefits-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Screen reader heading for accessibility */}
        <h2 id="marketing-benefits-heading" className="sr-only">
          Marketing Benefits
        </h2>

        {/* Two-column grid on desktop, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
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
                delay: prefersReducedMotion ? 0 : index * 0.2, // Staggered: 0ms, 200ms
                ease: easing,
              }}
            >
              <Card className="h-full backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-2 border-card-border/60 dark:border-slate-700/50 shadow-sm hover:shadow-lg dark:hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl text-foreground">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
