'use client'

import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/use-parallax'
import type { ReactNode } from 'react'

type ParallaxType = 'slow' | 'fast' | 'reverse' | 'horizontal'

interface ParallaxTextProps {
  children: ReactNode
  type?: ParallaxType
  offset?: number
  className?: string
  delay?: number
}

export function ParallexText({
  children,
  type = 'slow',
  offset = 50,
  className = '',
  delay = 0,
}: ParallaxTextProps) {
  const { ref, parallaxValues } = useParallax({ type, offset })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        transform: type === 'horizontal'
          ? `translateX(${parallaxValues.x || 0}px) translateZ(0)`
          : `translateY(${parallaxValues.y || 0}px) translateZ(0)`,
      }}
    >
      {children}
    </motion.div>
  )
}
