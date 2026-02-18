'use client'

import { motion } from 'framer-motion'
import { VideoPreviewCard } from './video-preview-card'
import { CTAButtons } from './cta-buttons'
import { useParallax } from '@/hooks/use-parallax'

export function HeroSection() {
  const { ref, parallaxValue } = useParallax({ offset: 30 })

  return (
    <section
      ref={ref}
      className="relative w-full py-8 sm:py-12 md:py-20 lg:py-28 overflow-hidden"
    >
      {/* Animated background gradient with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5"
        style={{ y: parallaxValue }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            className="flex flex-col justify-center space-y-4 sm:space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {/* Main Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-balance leading-tight sm:leading-snug text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              A simpler, smarter, more effective way to market your business
            </motion.h1>

            {/* Subheading */}
            <motion.div
              className="space-y-1 sm:space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                You run your business.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
                Let Hibu run your digital marketing.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              With our Hibu One platform, all your digital marketing is built, integrated, synchronized and optimized on{' '}
              <span className="font-bold text-foreground">One Platform</span> from{' '}
              <span className="font-bold text-foreground">One Provider</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="pt-2 sm:pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <CTAButtons />
            </motion.div>
          </motion.div>

          {/* Right content - Video Card */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-2 min-h-96 sm:min-h-auto"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <VideoPreviewCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
