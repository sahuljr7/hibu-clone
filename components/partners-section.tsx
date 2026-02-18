'use client'

import { PartnerBadge } from './partner-badge'

export function PartnersSection() {
  const partners = [
    { name: 'Google Partner', icon: 'G' },
    { name: 'Meta Business Partner', icon: '🔷' },
    { name: 'Microsoft Advertising', icon: '◻' },
    { name: 'Meta Business Partner', icon: '🔷' },
    { name: 'Amazon Ads Verified', icon: '📦' },
    { name: 'Gold Partner', icon: '⭐' },
    { name: 'Google Partner', icon: 'G' },
  ]

  // Double the partners array for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners]

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-center text-foreground mb-8 sm:mb-12 text-balance animate-fade-in">
          Put our powerful partnerships to work for your business
        </h2>

        {/* Infinite Scrolling Carousel */}
        <div className="w-full relative overflow-hidden">
          {/* Gradient masks on left and right for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-secondary/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 lg:w-20 bg-gradient-to-l from-secondary/50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex gap-3 sm:gap-4 lg:gap-6 animate-infinite-scroll hover:animation-play-state-paused w-fit">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0"
              >
                <PartnerBadge
                  name={partner.name}
                  icon={partner.icon}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Visual indicator text */}
        <p className="text-xs sm:text-sm text-muted-foreground text-center mt-6 sm:mt-8 animate-fade-in">
          Trusted by thousands of local businesses worldwide
        </p>
      </div>
    </section>
  )
}
