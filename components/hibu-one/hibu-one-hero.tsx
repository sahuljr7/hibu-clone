'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
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
  description,
  primaryCTA,
  secondaryCTA,
  mediaCard,
}: HibuOneHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#e5f8e6] via-[#f0faef] to-white py-12 py-14 sm:py-16 md:py-20 lg:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-green-25 to-white opacity-30" />
      <div className="container mx-auto flex w-full max-w-7xl flex-col items-center space-y-8 space-y-10 px-4 text-center sm:px-6 md:space-y-10 md:space-y-12 lg:space-y-12">
        {/* Single-column centered layout */}
        <div className="w-full max-w-4xl space-y-6 lg:space-y-8">

            {/* Main heading - h1 for proper hierarchy */}
            <motion.h1
              id="hero-heading"
              className="text-4xl text-5xl font-display font-bold leading-tight tracking-tight text-[#241236] text-balance sm:text-5xl sm:text-6xl md:text-6xl lg:text-7xl"
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
              className="mx-auto max-w-3xl text-lg leading-relaxed text-[#32254a] sm:text-xl md:text-2xl md:text-xl"
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
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationDuration,
                delay: prefersReducedMotion ? 0 : 0.4,
                ease: easing,
              }}
            >
              <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-[#6022ad] bg-white px-7 text-[#6022ad] hover:bg-[#f2ebfc]">
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
              <Button asChild size="lg" variant="default" className="rounded-full bg-[#6022ad] px-7 hover:bg-[#4e1b8f]">
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
              className="mx-auto mt-6 mt-8 w-full max-w-4xl max-w-5xl md:mt-10 md:mt-12"
            />
          )}
        </div>
    </section>
  )
}
