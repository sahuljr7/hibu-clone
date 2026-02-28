'use client'

import { Quote, Star } from 'lucide-react'

/**
 * Client Review Card Component
 * Displays dental practice client review with yellow icon
 * Validates: Requirements 8.1, 8.2, 8.3
 */
export function ClientReviewCard() {
  return (
    <div className="p-6 rounded-xl bg-card border-2 border-card-border shadow-sm hover:shadow-md transition-all duration-200">
      {/* Label */}
      <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">
        Dental Practice Client Review
      </p>

      <div className="flex gap-4">
        {/* Yellow square icon with quote + star graphic */}
        <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 dark:bg-yellow-500 rounded-lg flex items-center justify-center relative transition-colors duration-300">
          {/* Quote icon */}
          <Quote className="w-8 h-8 text-yellow-900 dark:text-yellow-950 absolute" strokeWidth={2.5} />
          {/* Star icon - positioned at top right corner of quote */}
          <Star
            className="w-4 h-4 text-yellow-900 dark:text-yellow-950 absolute top-2 right-2"
            fill="currentColor"
            strokeWidth={2}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Review text */}
          <p className="text-sm sm:text-base text-foreground mb-2 leading-relaxed break-words">
            "Working with Hibu has transformed our online presence. We've seen a significant
            increase in new patient inquiries and our practice has never been busier. The team
            is responsive and truly understands our needs."
          </p>

          {/* Attribution */}
          <p className="text-sm text-muted-foreground font-medium">
            Samantha N. | Smile Envy
          </p>
        </div>
      </div>
    </div>
  )
}
