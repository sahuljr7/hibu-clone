'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/animated-counter'

const stats = [
  {
    value: 898396215,
    label: 'Visits to Websites*',
  },
  {
    value: 719610315,
    label: 'Ad Clicks from Search, Social, and Display Ads*',
  },
  {
    value: 27154421,
    label: 'Calls from Search Campaigns*',
  },
]

export function StatsSection() {
  return (
    <section className="w-full py-16 sm:py-20 md:py-28 bg-gradient-to-r from-green-100 via-green-50 to-emerald-100 dark:from-emerald-900/30 dark:via-green-900/20 dark:to-green-900/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          className="mb-16 sm:mb-20 md:mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground text-balance leading-tight max-w-3xl">
            Using today's advanced technology to deliver calls, clicks, and customers for our clients.
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 md:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Large Number with Counter Animation */}
              <div className="mb-3 sm:mb-4">
                <AnimatedCounter value={stat.value} duration={2.5} />
              </div>

              {/* Label */}
              <p className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground tracking-wider uppercase max-w-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
