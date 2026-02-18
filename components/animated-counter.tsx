'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  value,
  duration = 2.5,
  decimals = 0,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true)
          hasAnimated.current = true
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Easing function for smooth natural counting (easeOut)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (value - startValue) * eased

      setDisplayValue(Math.floor(current))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  // Format number with comma separators
  const formattedValue = displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground font-display">
        {prefix}
        {formattedValue}
        {suffix}
      </h3>
    </motion.div>
  )
}
