'use client'

import { motion } from 'framer-motion'

export function DisclaimerSection() {
  return (
    <section className="w-full bg-background py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.p
          className="text-xs sm:text-xs text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          *Based on unique visitor data for Hibu websites with solutions. The comparisons and other information on this page should be considered directional only. Actual results will differ and will depend on a number of factors including business vertical, business geography, level of spend and length of campaign for Online Display, level of spend and length of campaign for Search Engine Marketing and other digital solutions employed. Source: Hibu first-party data.
        </motion.p>
      </div>
    </section>
  )
}
