'use client'

import { motion } from 'framer-motion'
import { ServicesDropdown } from './services-dropdown'

export function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-full mt-0 bg-white dark:bg-slate-900 border-b border-border shadow-lg z-50 overflow-x-auto"
    >
      <div className="min-h-max">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          {/* Column 1: Hibu One Platform */}
          <div className="min-w-max lg:min-w-0">
            <div className="space-y-3">
              <div className="inline-block">
                <span className="text-sm font-semibold text-foreground/70">hibu</span>
                <span className="ml-2 text-xs font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-green-500 text-white px-2 py-1 rounded-full">
                  ONE
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground">
                Hibu One Marketing Platform
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Our proprietary platform powered by AI, machine learning, and local business data integrates all digital marketing services.
              </p>
            </div>
          </div>

          {/* Column 2: Ad Campaigns */}
          <div className="min-w-max lg:min-w-0">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-foreground">
                Ad Campaigns
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Reach more customers with search, display and social ads powered by Hibu One
              </p>
            </div>
          </div>

          {/* Column 3: Organic Marketing */}
          <div className="min-w-max lg:min-w-0">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-foreground">
                Organic Marketing
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                Dominate search results with fully-managed SEO services powered by Hibu One
              </p>
            </div>
          </div>

          {/* Column 4: Platform Pricing */}
          <div className="min-w-max lg:min-w-0">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-foreground">
                Platform Pricing
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                See how our custom pricing works to meet your unique needs
              </p>
            </div>
          </div>

          {/* Right Side: Promo Panel */}
          <div className="min-w-max lg:min-w-0 bg-gradient-to-br from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-800 rounded-lg p-6 text-white flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full">
                  PLATFORM TOUR
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">
                  One Platform. One Provider.
                </h3>
                <p className="text-sm text-white/80">
                  Hibu One makes marketing one less thing for you to worry about
                </p>
              </div>
            </div>

            {/* Services Dropdown */}
            <ServicesDropdown />

            {/* Dashboard mockup placeholder */}
            <div className="mt-4 bg-white/10 rounded-lg h-32 flex items-center justify-center border border-white/20">
              <span className="text-sm text-white/50">Dashboard Preview</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
