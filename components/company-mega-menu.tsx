'use client'

import { motion } from 'framer-motion'

export function CompanyMegaMenu() {
  const companyLinks = [
    {
      title: 'About Us',
      description: 'Hibu helps local businesses grow with smart, easy-to-use digital marketing solutions',
    },
    {
      title: 'Leadership',
      description:
        'Meet the team guiding Hibu\'s vision and innovation – experienced leaders driving digital marketing success for local businesses',
    },
  ]

  const careerLinks = [
    {
      title: 'Careers',
      description:
        'We\'d love to get to know you. Search open positions, learn about Hibu culture & find a career you love',
    },
    {
      title: 'Newsroom',
      description: 'Read the latest news and updates from Hibu and find our press contact information',
    },
  ]

  const contactLinks = [
    {
      title: 'Contact Us',
      description: 'Have a question? Connect with a Hibu representative',
    },
  ]

  const successStories = [
    {
      title: 'Client Reviews',
      description: 'Read what our clients say about the results they get with Hibu',
    },
    {
      title: 'Video Testimonials',
      description: 'Watch short videos of real clients sharing real success with Hibu',
    },
    {
      title: 'Employee Reviews',
      description: 'Discover what it\'s like to work at Hibu.',
    },
  ]

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
          {/* Left Section - 3 Columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Column 1 - Company Info */}
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full uppercase tracking-wide">
                    Who We Are
                  </span>
                </div>

                {companyLinks.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-base font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Column 2 - Careers */}
              <div className="space-y-6">
                {careerLinks.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-base font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Column 3 - Contact */}
              <div className="space-y-6">
                {contactLinks.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-base font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Success Stories Panel */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-800 rounded-lg p-6 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full uppercase tracking-wide">
                  Success Stories
                </span>
              </div>

              {successStories.map((story, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-base font-bold text-white hover:text-blue-200 transition-colors cursor-pointer">
                    {story.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {story.description}
                  </p>

                  {/* Video thumbnail placeholder for Video Testimonials */}
                  {story.title === 'Video Testimonials' && (
                    <div className="mt-3 bg-white/10 rounded-lg h-32 flex items-center justify-center border border-white/20">
                      <svg
                        className="w-8 h-8 text-white/50"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
