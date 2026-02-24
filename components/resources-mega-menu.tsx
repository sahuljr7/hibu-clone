'use client'

import { motion } from 'framer-motion'

interface Resource {
  title: string
  description: string
  href?: string
}

interface ResourceColumn {
  badge: string
  resources: Resource[]
}

export function ResourcesMegaMenu() {
  const leftColumns: ResourceColumn[] = [
    {
      badge: 'FREE TOOLS',
      resources: [
        {
          title: 'Marketing Quiz',
          description: "See what's working and what's not with your current marketing.",
        },
        {
          title: 'Business Listings Scan',
          description: 'Check how your online business info appears across the web.',
        },
        {
          title: 'Digital Marketing Score',
          description: 'Test your website to see how you can convert more customers.',
        },
        {
          title: 'Social Advertising Calculator',
          description: 'How many potential customers could you reach with social advertising?',
        },
      ],
    },
    {
      badge: 'LEARN',
      resources: [
        {
          title: 'Hibu Blog',
          description: 'Check out industry-specific resources, tips, videos, podcasts, and more.',
        },
        {
          title: 'Why Local Businesses Need an All-in-One Marketing Platform',
          description: '',
          href: '#',
        },
        {
          title: 'How Hibu One Integrates with Your QuickBooks Online Account',
          description: '',
          href: '#',
        },
        {
          title: '5 Ways Hibu One Saves Your Local Business Time',
          description: '',
          href: '#',
        },
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute left-0 top-full mt-0 w-screen bg-gray-50 dark:bg-slate-800 border-b border-border shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-12 p-8">
          {/* Left Columns - Resources */}
          {leftColumns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-6">
              {/* Badge */}
              <div className="inline-block">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-3 py-1.5 rounded-full">
                  {column.badge}
                </span>
              </div>

              {/* Resources */}
              <div className="space-y-6">
                {column.resources.map((resource, resIndex) => (
                  <div key={resIndex} className="space-y-1">
                    {resource.href ? (
                      <a
                        href={resource.href}
                        className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                      >
                        {resource.title}
                      </a>
                    ) : (
                      <h3 className="text-sm font-semibold text-foreground">
                        {resource.title}
                      </h3>
                    )}
                    {resource.description && (
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        {resource.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Right Side - Insights Promo Panel */}
          <div className="col-span-1 bg-gradient-to-br from-blue-900 to-slate-900 dark:from-blue-800 dark:to-slate-800 rounded-lg p-6 text-white flex flex-col">
            {/* Badge */}
            <div className="inline-block mb-4">
              <span className="text-xs font-bold bg-white/20 text-white px-3 py-1.5 rounded-full">
                INSIGHTS
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold mb-3">Case Studies</h3>

            {/* Description */}
            <p className="text-sm text-white/80 mb-6 leading-relaxed flex-grow">
              Gain valuable insights into proven strategies, challenges, and successes from businesses just like yours.
            </p>

            {/* Image Placeholder */}
            <div className="relative mb-6 h-32 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center border border-white/20">
              <div className="flex flex-col items-center justify-center h-full w-full">
                <svg
                  className="w-12 h-12 text-white/40 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-xs text-white/40">Case Study Image</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="border-2 border-white text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/10 transition-colors text-sm">
              GO TO CASE STUDY
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
