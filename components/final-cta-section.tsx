'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function FinalCTASection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered content */}
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo - hibu ONE */}
          <motion.div
            className="flex items-center justify-center gap-2 sm:gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
              hibu
            </h2>
            <motion.div
              className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-blue-900">
                ONE
              </span>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.h3
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white text-balance leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            See how it can all work together for you
          </motion.h3>

          {/* Supporting Description */}
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-white/80 text-balance leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Save time, save effort and see real marketing results. It all starts with one demo to find out how Hibu One can do more for your marketing.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="pt-4 sm:pt-6 lg:pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="px-8 sm:px-10 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl touch-manipulation relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Request a demo
                <ArrowRight
                  size={20}
                  className={`transition-all duration-300 flex-shrink-0 ${
                    isHovered ? 'translate-x-2' : 'translate-x-0'
                  }`}
                />
              </span>
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
