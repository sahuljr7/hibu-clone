'use client'

import Image from 'next/image'

/**
 * Video Testimonial Card Component
 * Displays video testimonial with overlays and quote
 * Validates: Requirements 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */
export function VideoTestimonialCard() {
  return (
    <div className="space-y-4">
      {/* Label */}
      <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
        Appliance Services Video Testimonial
      </p>

      {/* Video Card */}
      <div className="relative rounded-xl overflow-hidden bg-card border border-border shadow-lg transition-colors duration-300">
        {/* Video thumbnail/embed area */}
        <div className="aspect-video relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {/* Placeholder for video - in production this would be an actual video embed or thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-purple-600 dark:text-purple-400 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Brand logo overlay - top left */}
          <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-md transition-colors duration-300">
            <p className="text-sm font-bold text-foreground">Peerless Appliance</p>
          </div>

          {/* "A Client Success Story" text overlay - top center/right */}
          <div className="absolute top-4 right-4 bg-purple-600 dark:bg-purple-500 px-4 py-2 rounded-lg shadow-md transition-colors duration-300">
            <p className="text-xs font-semibold text-white tracking-wide">
              A Client Success Story
            </p>
          </div>

          {/* Person image and name tag - bottom left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            {/* Person image placeholder */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">SR</span>
            </div>

            {/* Name tag */}
            <div className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-md transition-colors duration-300">
              <p className="text-sm font-semibold text-foreground">Scott Reilly, Owner</p>
            </div>
          </div>

          {/* Hibu logo - bottom right corner */}
          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-md transition-colors duration-300">
            <p className="text-sm font-bold text-purple-600 dark:text-purple-400">hibu</p>
          </div>
        </div>
      </div>

      {/* Quote text below card */}
      <blockquote className="text-base sm:text-lg text-foreground italic leading-relaxed break-words">
        "Hibu maximizes my results. I've got little effort put into it [digital marketing] and
        I've got huge results."
      </blockquote>
    </div>
  )
}
