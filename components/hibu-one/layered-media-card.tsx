'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export interface LayeredMediaCardProps {
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
  className?: string
}

/**
 * LayeredMediaCard component.
 * Displays promotional content with a layered design effect featuring
 * a purple gradient primary layer and green shadow layer.
 * 
 * Styling:
 * - Primary layer: purple gradient (from-purple-600 via-purple-500 to-purple-700)
 * - Shadow layer: green gradient (from-green-100 to-green-200), offset 20px right and bottom
 * - Rounded corners: rounded-3xl
 * 
 * Layout:
 * - Logo: top-left corner
 * - Tagline: centered text
 * - Watch CTA: centered button/link
 * - Mockups: absolute positioned based on position prop
 * 
 * Animations:
 * - Fade-in + slide-up on mount
 * - Respects prefers-reduced-motion accessibility preference
 * 
 * Requirements: 5.1, 5.2, 6.1
 */
export function LayeredMediaCard({
  logo,
  logoAlt = 'Logo',
  tagline,
  watchCTA,
  mockups,
  className = '',
}: LayeredMediaCardProps) {
  const prefersReducedMotion = useReducedMotion()

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.6
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  return (
    <motion.div
      className={`relative w-full ${className}`}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: animationDuration,
        delay: prefersReducedMotion ? 0 : 0.6,
        ease: easing,
      }}
    >
      {/* Shadow Layer - green gradient offset to right and bottom */}
      <div className="absolute top-5 left-5 right-[-20px] bottom-[-20px] bg-gradient-to-br from-green-100 to-green-200 rounded-3xl -z-10" />

      {/* Primary Layer - purple gradient with content */}
      <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
        {/* Logo - top-left corner */}
        {logo && (
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <Image
              src={logo}
              alt={logoAlt}
              width={120}
              height={40}
              priority
              className="h-8 md:h-10 w-auto"
            />
          </div>
        )}

        {/* Centered content container */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 min-h-[300px] md:min-h-[400px]">
          {/* Tagline - centered text */}
          {tagline && (
            <p className="text-white text-xl md:text-2xl lg:text-3xl font-semibold max-w-2xl leading-relaxed px-4">
              {tagline}
            </p>
          )}

          {/* Watch CTA - centered button/link */}
          {watchCTA && (
            watchCTA.href ? (
              <Link
                href={watchCTA.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105"
              >
                {watchCTA.text}
              </Link>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105"
              >
                {watchCTA.text}
              </button>
            )
          )}
        </div>

        {/* Floating UI Mockups - absolutely positioned based on position prop */}
        {mockups && mockups.length > 0 && (
          <>
            {mockups.map((mockup, index) => {
              // Position mapping object for different mockup positions
              const positionClasses = {
                'top-left': 'top-4 left-4 md:top-6 md:left-6',
                'top-right': 'top-4 right-4 md:top-6 md:right-6',
                'bottom-left': 'bottom-4 left-4 md:bottom-6 md:left-6',
                'bottom-right': 'bottom-4 right-4 md:bottom-6 md:right-6',
                'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              }

              return (
                <motion.div
                  key={`mockup-${index}`}
                  className={`absolute ${positionClasses[mockup.position]} z-10`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: animationDuration,
                    delay: 0.8 + index * 0.1,
                    ease: easing,
                  }}
                >
                  <Image
                    src={mockup.url}
                    alt={mockup.alt}
                    width={200}
                    height={150}
                    priority={index === 0}
                    sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
                    className="w-24 h-auto sm:w-32 md:w-40 lg:w-48 rounded-lg shadow-xl"
                  />
                </motion.div>
              )
            })}
          </>
        )}
      </div>
    </motion.div>
  )
}
