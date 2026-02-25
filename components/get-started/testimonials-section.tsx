'use client'

import { motion } from 'framer-motion'
import { VideoTestimonialCard } from './video-testimonial-card'
import { ClientReviewCard } from './client-review-card'
import { CaseStudyCard } from './case-study-card'
import { useInView } from '@/hooks/use-in-view'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Testimonials Section Component
 * Displays client success stories with video testimonial and review cards
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.6, 10.6
 */
export function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.5
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section 
      ref={ref}
      className="w-full py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 will-change-auto"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section heading */}
        <motion.h2
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: animationDuration, ease: easing }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-12 sm:mb-16 text-foreground"
          style={{ willChange: prefersReducedMotion ? 'auto' : 'opacity, transform' }}
        >
          Real clients. Real results.
        </motion.h2>

        {/* Two-column responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Left column: Video testimonial */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ 
              duration: animationDuration, 
              delay: prefersReducedMotion ? 0 : 0.2,
              ease: easing 
            }}
            style={{ willChange: prefersReducedMotion ? 'auto' : 'opacity, transform' }}
          >
            <VideoTestimonialCard />
          </motion.div>

          {/* Right column: Client review and case study */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ 
              duration: animationDuration, 
              delay: prefersReducedMotion ? 0 : 0.3,
              ease: easing 
            }}
            className="space-y-6"
            style={{ willChange: prefersReducedMotion ? 'auto' : 'opacity, transform' }}
          >
            <ClientReviewCard />
            <CaseStudyCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
