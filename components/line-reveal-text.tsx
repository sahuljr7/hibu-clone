'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface LineRevealTextProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
}

export function LineRevealText({
  children,
  className = '',
  delay = 0,
  staggerDelay = 180,
}: LineRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Split text into lines
  const lines = children.split('\n')

  return (
    <div ref={ref} className={className}>
      {lines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: 40, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + lineIndex * (staggerDelay / 1000),
              ease: 'easeOut',
            }}
          >
            {line}
            {lineIndex < lines.length - 1 && '\u00A0'}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}
