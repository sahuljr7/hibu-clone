'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const services = [
  'Search Engine Marketing',
  'Social Media Advertising',
  'Display Advertising',
  'SEO Services',
  'Social Media Management',
  'Web Design & Development',
]

export function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(services[0])

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -8,
      pointerEvents: 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto',
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
        delay: i * 0.05,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <div className="mt-4 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 rounded-lg flex items-center justify-between transition-all duration-200 text-white text-sm font-medium group"
      >
        <span className="text-left">{selectedService}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/20 rounded-lg shadow-xl z-50 min-w-full"
          >
            <div className="py-2 max-h-64 overflow-y-auto">
              {services.map((service, index) => (
                <motion.button
                  key={service}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => {
                    setSelectedService(service)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 whitespace-nowrap ${
                    selectedService === service
                      ? 'bg-white/20 text-white font-medium'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {service}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
