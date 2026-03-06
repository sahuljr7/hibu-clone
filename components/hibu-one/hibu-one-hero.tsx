'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useParallax } from '@/hooks/use-parallax'
import { LayeredMediaCard } from './layered-media-card'

export interface HibuOneHeroProps {
  heading: string
  subheading?: string
  description: string | React.ReactNode
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
  mediaUrl: string
  mediaAlt: string
  mediaCard?: {
    logo?: string
    logoAlt?: string
    tagline?: string
    watchCTA?: {
      text: string
      href?: string
    }
    mockups?: Array<{
      url: string
      alt: string
      position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
    }>
  }
}

/**
 * Hero section component for Hibu One landing page.
 * Features responsive single-column centered layout with staggered animations.
 * 
 * Layout:
 * - All viewports: Single-column centered layout (heading, description, CTAs, media)
 * - Content is horizontally centered with text-center alignment
 * 
 * Animations:
 * - Heading: fade-in + slide-up, delay 0ms
 * - Description: fade-in, delay 200ms
 * - CTAs: fade-in + slide-up, delay 400ms
 * - Media card: fade-in + slide-up, delay 600ms
 * 
 * Respects prefers-reduced-motion accessibility preference.
 */
export function HibuOneHero({
  heading,
  subheading,
  description,
  primaryCTA,
  secondaryCTA,
  mediaUrl,
  mediaAlt,
  mediaCard,
}: HibuOneHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  // Parallax for background - disabled for centered design (maintained for compatibility)
  const { ref: parallaxRef, parallaxValues } = useParallax({
    offset: 0,
    type: 'slow',
    easing: 'easeOut',
    disabled: true,
  })

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      ref={parallaxRef}
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden transition-colors duration-[600ms] ease-in-out"
      aria-labelledby="hero-heading"
    >
      {/* Soft green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-green-25 to-white" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-10 lg:space-y-12">
        {/* Single-column centered layout */}
        <div className="w-full max-w-4xl space-y-6 lg:space-y-8">
            {/* Subheading - kept for compatibility but not displayed */}

            {/* Main heading - h1 for proper hierarchy */}
            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-balance leading-tight text-foreground"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationDuration,
                delay: 0,
                ease: easing,
              }}
            >
              {heading}
            </motion.h1>

            {/* Description - supports rich text (React.ReactNode) */}
            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: animationDuration,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: easing,
              }}
            >
              {description}
            </motion.div>

            {/* Dual CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationDuration,
                delay: prefersReducedMotion ? 0 : 0.4,
                ease: easing,
              }}
            >
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
              <Button asChild size="lg" variant="default">
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Layered media card - centered below CTAs */}
          {mediaCard && (
            <LayeredMediaCard
              logo={mediaCard.logo}
              logoAlt={mediaCard.logoAlt}
              tagline={mediaCard.tagline}
              watchCTA={mediaCard.watchCTA}
              mockups={mediaCard.mockups}
              className="max-w-4xl mx-auto mt-8 md:mt-12"
            />
          )}
        </div>
    </section>
  )
}
