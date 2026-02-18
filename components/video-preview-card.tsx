'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

export function VideoPreviewCard() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative perspective w-full max-w-2xl px-2 sm:px-0">
      {/* Green accent layer - Hidden on mobile, visible on larger screens */}
      <div className={`hidden sm:block absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-full h-full bg-accent rounded-xl sm:rounded-2xl opacity-20 transform transition-all duration-500 ${
        isHovered ? 'translate-x-2 sm:translate-x-3 translate-y-2 sm:translate-y-3 opacity-40' : 'translate-x-0 translate-y-0'
      }`} />

      {/* Main card */}
      <div
        className="relative bg-primary rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden cursor-pointer group touch-manipulation"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60 opacity-90" />

        {/* Content */}
        <div className="relative p-6 sm:p-8 md:p-12 h-full flex flex-col justify-between min-h-80 sm:min-h-96">
          {/* Top section */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-1 sm:mb-2">
              hibu
              <span className="text-accent ml-1 sm:ml-2 inline">ONE</span>
            </h2>
            <p className="text-base sm:text-lg text-white/90 font-medium">
              Enterprise-level marketing built for local businesses
            </p>
          </div>

          {/* Center - Play button */}
          <div className="flex justify-center py-4 sm:py-6">
            <button
              className={`relative flex items-center justify-center transition-all duration-300 active:scale-95 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            >
              <div className="absolute w-16 sm:w-20 h-16 sm:h-20 bg-accent/30 rounded-full animate-pulse" />
              <div className="relative w-12 sm:w-16 h-12 sm:h-16 bg-accent rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors shadow-lg">
                <Play
                  size={24}
                  className="fill-primary text-primary ml-0.5 sm:ml-1 flex-shrink-0"
                />
              </div>
            </button>
          </div>

          {/* Bottom section */}
          <div>
            <p className="text-accent font-bold text-sm sm:text-lg mb-2">WATCH NOW</p>
            <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
              {/* Mock review cards */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 border border-white/20">
                <p className="text-white/80 text-xs sm:text-sm line-clamp-2">
                  ⭐⭐⭐⭐⭐ "Best platform for our business" - Sarah J.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 border border-white/20">
                <p className="text-white/80 text-xs sm:text-sm line-clamp-2">
                  ⭐⭐⭐⭐⭐ "Increased sales by 300%" - Michael T.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
