'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function ClientSupportLoginDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute right-0 top-full mt-0 min-w-max bg-white dark:bg-slate-900 border-b border-border shadow-lg z-50 max-w-full overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 w-full">
          {/* Left Column - Contact Client Support */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Contact Client Support
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              Our support team is ready to assist by phone, chat, or message
            </p>
          </div>

          {/* Right Column - Visit Your Dashboard */}
          <Link href="/login" className="block">
            <div className="space-y-3 cursor-pointer hover:opacity-80 transition-opacity">
              <h3 className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors">
                Visit Your Dashboard
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
                Log into your Hibu Dashboard to see your results and more
              </p>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
