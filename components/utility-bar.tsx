import Link from 'next/link'
import { Phone, Star } from 'lucide-react'

/**
 * Utility Bar Component
 * 
 * Displays rating information and contact details at the top of the page
 * - Left side: Star rating with review count
 * - Right side: Phone number and CTA button
 */
export function UtilityBar() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-4 sm:gap-6">
          {/* Left: Rating */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-900">4.3</span>
            <div className="flex items-center gap-0.5" aria-label="4.3 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-gray-600">
              (2404 Ratings & Reviews)
            </span>
          </div>

          {/* Right: Contact & CTA */}
          <div className="flex items-center gap-4">
            <a
              href="tel:877.237.6120"
              className="flex items-center gap-2 text-gray-900 hover:text-purple-700 transition-colors"
              aria-label="Call 877.237.6120"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">877.237.6120</span>
            </a>
            
            <Link
              href="/get-started-2026"
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
