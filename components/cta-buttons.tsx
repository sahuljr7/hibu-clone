'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function CTAButtons() {
  const [learnHovered, setLearnHovered] = useState(false)
  const [demoHovered, setDemoHovered] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
      <button
        onMouseEnter={() => setLearnHovered(true)}
        onMouseLeave={() => setLearnHovered(false)}
        className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-primary text-primary font-bold text-sm sm:text-base rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden group touch-manipulation"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <span className="hidden sm:inline">Learn about Hibu One</span>
          <span className="sm:hidden">Learn More</span>
          <ArrowRight
            size={16}
            className={`transition-all duration-300 flex-shrink-0 ${
              learnHovered ? 'translate-x-2' : 'translate-x-0'
            }`}
          />
        </span>
        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary transition-all duration-300" />
      </button>

      <button
        onMouseEnter={() => setDemoHovered(true)}
        onMouseLeave={() => setDemoHovered(false)}
        className="px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-primary-foreground font-bold text-sm sm:text-base rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl relative overflow-hidden group touch-manipulation"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Request a demo
          <ArrowRight
            size={16}
            className={`transition-all duration-300 flex-shrink-0 ${
              demoHovered ? 'translate-x-2' : 'translate-x-0'
            }`}
          />
        </span>
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300" />
      </button>
    </div>
  )
}
