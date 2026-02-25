'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useParallax } from '@/hooks/use-parallax'

export interface HibuOneHeroProps {
  heading: string
  subheading?: string
  description: string
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
}

/**
 * Hero section component for Hibu One landing page.
 * Features responsive two-column layout with staggered animations.
 * 
 * Layout:
 * - Desktop: Two-column grid (text left, media right)
 * - Mobile: Single column (text top, media bottom)
 * 
 * Animations:
 * - Heading: fade-in + slide-up, delay 0ms
 * - Description: fade-in, delay 200ms
 * - CTAs: fade-in + slide-up, delay 400ms
 * - Media card: fade-in + slide-left, delay 600ms
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
}: HibuOneHeroProps) {
  const prefersReducedMotion = useReducedMotion()

  // Check if viewport is mobile (disable parallax on mobile)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Parallax for background - disabled on mobile and when reduced motion is preferred
  const { ref: parallaxRef, parallaxValues } = useParallax({
    offset: 30,
    type: 'slow',
    easing: 'easeOut',
    disabled: prefersReducedMotion || isMobile,
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
      {/* Background gradient with subtle parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 transition-colors duration-[600ms] ease-in-out"
        style={{
          transform: `translate3d(0, ${parallaxValues.y || 0}px, 0)`,
          willChange: prefersReducedMotion || isMobile ? 'auto' : 'transform',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Two-column grid on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content - left column on desktop */}
          <div className="space-y-6 lg:space-y-8">
            {/* Subheading */}
            {subheading && (
              <motion.p
                className="text-sm sm:text-base font-semibold text-primary uppercase tracking-wide"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: animationDuration, delay: 0 }}
              >
                {subheading}
              </motion.p>
            )}

            {/* Main heading - h1 for proper hierarchy */}
            <motion.h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-balance leading-tight text-foreground"
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

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: animationDuration,
                delay: prefersReducedMotion ? 0 : 0.2,
              }}
            >
              {description}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationDuration,
                delay: prefersReducedMotion ? 0 : 0.4,
                ease: easing,
              }}
            >
              <Button asChild size="lg" variant="default">
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            </motion.div>
          </div>

          {/* Media card - right column on desktop */}
          <motion.div
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            initial={
              prefersReducedMotion ? {} : { opacity: 0, x: 20 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: animationDuration,
              delay: prefersReducedMotion ? 0 : 0.6,
              ease: easing,
            }}
          >
            <Image
              src={mediaUrl}
              alt={mediaAlt}
              fill
              className="object-cover"
              priority // Above the fold - eager loading
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
