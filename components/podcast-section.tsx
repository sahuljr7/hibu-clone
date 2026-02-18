'use client'

import { SocialIcon } from './social-icon'

export function PodcastSection() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Podcast */}
      <div className="flex flex-col gap-3">
        <div className="w-full sm:w-40 bg-yellow-400 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
          <div className="text-center px-4 py-8">
            <div className="text-2xl font-bold text-gray-900 mb-2">BUSINESS</div>
            <div className="text-xs font-semibold text-gray-900">SMALL TALK</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-foreground">
            Small Business Small Talk
          </h4>
          <button className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary text-xs sm:text-sm font-medium rounded hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 w-fit touch-manipulation">
            Listen & subscribe now
          </button>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-foreground">
          Connect With Us
        </p>
        <div className="flex gap-2 sm:gap-3">
          <SocialIcon platform="facebook" href="#" label="Facebook" />
          <SocialIcon platform="twitter" href="#" label="X (Twitter)" />
          <SocialIcon platform="linkedin" href="#" label="LinkedIn" />
          <SocialIcon platform="instagram" href="#" label="Instagram" />
          <SocialIcon platform="vimeo" href="#" label="Vimeo" />
        </div>
      </div>
    </div>
  )
}
