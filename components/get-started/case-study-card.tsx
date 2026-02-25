'use client'

import Link from 'next/link'
import { Download, Search } from 'lucide-react'

/**
 * Case Study Card Component
 * Displays auto body case study with yellow icon and download link
 * Validates: Requirements 8.4, 8.5, 8.6, 8.7
 */
export function CaseStudyCard() {
  return (
    <div className="p-6 rounded-xl bg-card border border-border shadow-md transition-colors duration-300">
      {/* Label */}
      <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-4">
        Auto Body Case Study
      </p>

      <div className="flex gap-4">
        {/* Yellow square icon with magnifying glass graphic */}
        <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 dark:bg-yellow-500 rounded-lg flex items-center justify-center transition-colors duration-300">
          <Search className="w-8 h-8 text-yellow-900 dark:text-yellow-950" strokeWidth={2.5} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Description text */}
          <p className="text-sm sm:text-base text-foreground mb-3 leading-relaxed break-words">
            Discover how a local auto body shop increased their online visibility by 250% and
            doubled their monthly leads with Hibu's comprehensive digital marketing solution.
          </p>

          {/* Download link with icon */}
          <Link
            href="/resources/case-studies/auto-body"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-all duration-300 hover:translate-x-1 touch-manipulation min-h-[44px] py-2"
          >
            <Download size={16} />
            Download the case study
          </Link>
        </div>
      </div>
    </div>
  )
}
