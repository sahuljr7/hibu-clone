'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  index?: number
}

export function FeatureCard({ icon, title, description, index = 0 }: FeatureCardProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div
      className="group relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Glassmorphism Glow background */}
      <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-br from-blue-200/20 via-blue-100/10 to-blue-200/20 dark:from-blue-500/20 dark:via-blue-400/10 dark:to-blue-500/20 rounded-2xl opacity-0 sm:opacity-30 group-hover:opacity-100 dark:group-hover:opacity-80 transition-all duration-500 blur-xl backdrop-blur-md" />
      
      {/* Animated gradient border */}
      <style>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .gradient-border {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(90deg, rgba(180, 80, 255, 0.8), rgba(0, 217, 163, 0.6), rgba(96, 165, 250, 0.6), rgba(180, 80, 255, 0.8));
          background-size: 200% 200%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          pointer-events: none;
          animation: gradient-shift 8s ease-in-out infinite;
          z-index: 1;
        }
        
        .group:hover .gradient-border {
          opacity: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .gradient-border {
            animation: none !important;
            opacity: 0.3 !important;
          }
        }
      `}</style>
      <div className="gradient-border" />
      
      {/* Card content with glassmorphism on hover */}
      <motion.div
        className="relative bg-white/80 dark:bg-card/80 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 group-hover:bg-white/90 dark:group-hover:bg-card/90 group-hover:border-white/40 dark:group-hover:border-white/20 group-hover:shadow-xl dark:group-hover:shadow-blue-500/20 z-10"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Icon container with glow */}
        <motion.div
          className="mb-4 flex justify-center"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/60 shadow-lg"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-300/40 to-blue-200/30 blur-sm" />
            <motion.div
              className="relative text-blue-600 dark:text-blue-400"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              {icon}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-lg sm:text-xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-sm sm:text-base text-muted-foreground leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
