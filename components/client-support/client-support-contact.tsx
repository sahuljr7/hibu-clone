'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, ExternalLink } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Client Support Contact Information Component
 * Displays contact methods, phone number, hours, and dashboard link
 * 
 * Features:
 * - Section label "CLIENT SUPPORT"
 * - Main heading "Already a Hibu client? Contact us."
 * - Supporting text about support availability
 * - Clickable phone number (tel: link)
 * - Availability hours (Mon-Fri, Sat)
 * - Dashboard link with feature list
 * - Fade-in animations with staggered timing
 * - Respects prefers-reduced-motion accessibility preference
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7
 */
export function ClientSupportContact() {
  const prefersReducedMotion = useReducedMotion()

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.4
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  // Helper function to create staggered animation props
  const getStaggeredAnimation = (index: number) => {
    if (prefersReducedMotion) {
      return {}
    }
    return {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: animationDuration,
        delay: index * 0.1, // Stagger by 100ms
        ease: easing,
      },
    }
  }

  return (
    <div className="space-y-8">
      {/* Section Label */}
      <motion.div {...getStaggeredAnimation(0)}>
        <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400">
          Client Support
        </p>
      </motion.div>

      {/* Main Heading */}
      <motion.div {...getStaggeredAnimation(1)}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Already a Hibu client? Contact us.
        </h1>
      </motion.div>

      {/* Supporting Text */}
      <motion.div {...getStaggeredAnimation(2)}>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Our service and support teams are ready to assist by phone, live chat or message.
        </p>
      </motion.div>

      {/* Phone Number Section */}
      <motion.div {...getStaggeredAnimation(3)} className="space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
          <a
            href="tel:877-237-6120"
            className="text-2xl font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
            aria-label="Call client support at 877-237-6120"
          >
            877-237-6120
          </a>
        </div>
      </motion.div>

      {/* Availability Hours */}
      <motion.div {...getStaggeredAnimation(4)} className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Digital Marketing Client Support available
        </p>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>Mon – Fri: 8am – 8pm ET</p>
          <p>Sat: 9am – 2pm ET</p>
        </div>
      </motion.div>

      {/* Dashboard Link Section */}
      <motion.div {...getStaggeredAnimation(5)} className="pt-4 space-y-4">
        <div className="flex items-start gap-2">
          <ExternalLink className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div className="space-y-3">
            <Link
              href="https://dashboard.hibu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded"
            >
              Log into your Hibu Performance Dashboard
            </Link>
            
            {/* Dashboard Features List */}
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 ml-0">
              <li className="flex items-start">
                <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
                <span>View results</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
                <span>Update email & text preferences</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
                <span>Preview ads</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-purple-600 dark:text-purple-400">•</span>
                <span>Manage website</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
