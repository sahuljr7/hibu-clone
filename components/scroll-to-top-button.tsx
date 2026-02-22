'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

interface ScrollToTopButtonProps {
  threshold?: number
  showDelay?: number
}

export function ScrollToTopButton({ threshold = 400, showDelay = 200 }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      // Show button after scrolling past threshold
      if (scrollTop > threshold && !isVisible) {
        timeoutId = setTimeout(() => {
          setIsVisible(true)
        }, showDelay)
      } else if (scrollTop <= threshold && isVisible) {
        // Hide button when near top
        setIsVisible(false)
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isVisible, threshold, showDelay])

  const scrollToTop = () => {
    // Use smooth scroll if available
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Icon */}
          <ChevronUp
            size={24}
            className="relative z-10 transition-transform duration-300 group-hover:translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
