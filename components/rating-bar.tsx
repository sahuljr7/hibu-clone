'use client'

import Link from 'next/link'
import { Star, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export function RatingBar() {
  return (
    <div className="w-full bg-background border-b border-border sticky top-0 z-40">
      <div className="container mx-auto px-4 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Rating Section */}
          <div className="flex items-center gap-2 order-2 sm:order-1">
            <span className="text-lg sm:text-base font-bold text-orange-500">
              4.3
            </span>
            <div className="flex items-center gap-0.5 sm:gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-orange-500 text-orange-500 sm:w-4 sm:h-4"
                />
              ))}
            </div>
            <a
              href="#"
              className="text-xs sm:text-sm text-blue-500 hover:text-blue-600 transition-colors"
            >
              (2404 Ratings & Reviews)
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-6 w-full sm:w-auto order-1 sm:order-2 justify-end">
            <div className="hidden sm:flex items-center gap-2">
              <Phone size={16} className="text-foreground flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">
                877.237.6120
              </span>
            </div>
            <Link href="/get-started-2026">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap flex-shrink-0 touch-manipulation"
              >
                Request a demo
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Mobile phone number */}
        <div className="flex items-center gap-1 sm:hidden pt-2">
          <Phone size={14} className="text-foreground flex-shrink-0" />
          <span className="text-xs font-medium text-foreground">
            877.237.6120
          </span>
        </div>
      </div>
    </div>
  )
}
