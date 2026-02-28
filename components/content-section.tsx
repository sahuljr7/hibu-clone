'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface ContentSectionProps {
  title: string
  badge?: string
  children: React.ReactNode
  variant?: 'default' | 'featured' | 'dark'
  className?: string
}

export function ContentSection({
  title,
  badge,
  children,
  variant = 'default',
  className,
}: ContentSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, margin: '-50px' })

  const variantStyles = {
    default: 'bg-background',
    featured: 'bg-accent/5',
    dark: 'bg-foreground/5',
  }

  return (
    <section
      ref={ref}
      className={cn(
        'w-full py-12 sm:py-16 md:py-20 lg:py-24',
        variantStyles[variant],
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Badge */}
          {badge && (
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h2>

          {/* Content */}
          <motion.div
            className="grid grid-cols-1 gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
