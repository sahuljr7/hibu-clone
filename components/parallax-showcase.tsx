'use client'

import { motion } from 'framer-motion'
import { ParallexText } from './parallax-text'

export function ParallaxShowcase() {
  return (
    <section className="relative w-full py-20 sm:py-28 md:py-36 overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 sm:mb-24 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-4 text-balance">
            Parallax Effects Showcase
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience smooth scroll-based parallax effects that create depth and motion across different elements
          </p>
        </motion.div>

        {/* Slow Scroll Parallax */}
        <div className="mb-24 sm:mb-32 md:mb-40">
          <div className="relative min-h-80 sm:min-h-96 md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card via-background to-card border border-border/50">
            {/* Background gradient decoration */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
              style={{
                opacity: 0.5,
              }}
            />

            <div className="relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-8 md:px-12">
              <div className="max-w-2xl">
                <motion.h3
                  className="text-sm sm:text-base font-semibold text-primary mb-4 tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  ✓ Slow Scroll Effect
                </motion.h3>

                <ParallexText
                  type="slow"
                  offset={40}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
                >
                  Text moves slower than scroll
                </ParallexText>

                <motion.p
                  className="text-base sm:text-lg text-muted-foreground mt-6 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  When you scroll down 100px, this text moves down ~40-60px, creating a distant, layered visual depth effect. Perfect for headings and subtle layering.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Fast Scroll Parallax */}
        <div className="mb-24 sm:mb-32 md:mb-40">
          <div className="relative min-h-80 sm:min-h-96 md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card via-background to-card border border-border/50">
            {/* Background gradient decoration */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10"
              style={{
                opacity: 0.5,
              }}
            />

            <div className="relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-8 md:px-12">
              <div className="max-w-2xl">
                <motion.h3
                  className="text-sm sm:text-base font-semibold text-accent mb-4 tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  ✓ Fast Scroll Effect
                </motion.h3>

                <ParallexText
                  type="fast"
                  offset={60}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
                >
                  Text moves faster than scroll
                </ParallexText>

                <motion.p
                  className="text-base sm:text-lg text-muted-foreground mt-6 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  When you scroll down 100px, this text moves down ~120-150px, creating a bold foreground emphasis. Great for headlines and call-to-action text.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Reverse Scroll Parallax */}
        <div className="mb-24 sm:mb-32 md:mb-40">
          <div className="relative min-h-80 sm:min-h-96 md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card via-background to-card border border-border/50">
            {/* Background gradient decoration */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
              style={{
                opacity: 0.5,
              }}
            />

            <div className="relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-8 md:px-12">
              <div className="max-w-2xl">
                <motion.h3
                  className="text-sm sm:text-base font-semibold text-primary mb-4 tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  ✓ Reverse Scroll Effect
                </motion.h3>

                <ParallexText
                  type="reverse"
                  offset={50}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
                >
                  Text moves upward as you scroll down
                </ParallexText>

                <motion.p
                  className="text-base sm:text-lg text-muted-foreground mt-6 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  When you scroll down 100px, this text moves up ~50-80px, creating dramatic contrast and layered interaction. Perfect for impactful statements.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Parallax */}
        <div className="mb-24 sm:mb-32 md:mb-40">
          <div className="relative min-h-80 sm:min-h-96 md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card via-background to-card border border-border/50">
            {/* Background gradient decoration */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10"
              style={{
                opacity: 0.5,
              }}
            />

            <div className="relative z-10 w-full h-full flex items-center justify-center px-6 sm:px-8 md:px-12">
              <div className="max-w-2xl">
                <motion.h3
                  className="text-sm sm:text-base font-semibold text-accent mb-4 tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  ✓ Horizontal Scroll Effect
                </motion.h3>

                <ParallexText
                  type="horizontal"
                  offset={50}
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground leading-tight"
                >
                  Text glides left and right
                </ParallexText>

                <motion.p
                  className="text-base sm:text-lg text-muted-foreground mt-6 leading-relaxed max-w-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  As you scroll vertically, this text translates horizontally (50-150px), adding dynamic directional movement and creative layout interactions.
                </motion.p>
              </div>
            </div>
          </div>
        </div>

        {/* Staggered Multi-Element Parallax */}
        <div className="relative min-h-96 sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-card via-background to-card border border-border/50">
          {/* Background gradient decoration */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
            style={{
              opacity: 0.5,
            }}
          />

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20 gap-8 sm:gap-12">
            <motion.h3
              className="text-sm sm:text-base font-semibold text-primary tracking-widest uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              ✓ Staggered Multi-Element Parallax
            </motion.h3>

            <div className="max-w-3xl space-y-6 sm:space-y-8">
              <ParallexText
                type="slow"
                offset={30}
                delay={0}
                className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground text-center"
              >
                Layer One
              </ParallexText>

              <ParallexText
                type="fast"
                offset={45}
                delay={0.1}
                className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-accent text-center"
              >
                Layer Two
              </ParallexText>

              <ParallexText
                type="reverse"
                offset={35}
                delay={0.2}
                className="text-lg sm:text-xl md:text-2xl font-display font-semibold text-primary text-center"
              >
                Layer Three
              </ParallexText>

              <motion.p
                className="text-base sm:text-lg text-muted-foreground text-center leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Multiple elements with different parallax speeds create a rich, layered depth effect. Each layer animates independently for a sophisticated visual experience.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
