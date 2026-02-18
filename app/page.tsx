import { RatingBar } from '@/components/rating-bar'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { GrowthSection } from '@/components/growth-section'
import { MarketingFeaturesSection } from '@/components/marketing-features-section'
import { ReviewsSection } from '@/components/reviews-section'
import { StatsSection } from '@/components/stats-section'
import { PartnersSection } from '@/components/partners-section'
import { VideoFeatureSection } from '@/components/video-feature-section'
import { FinalCTASection } from '@/components/final-cta-section'
import { DisclaimerSection } from '@/components/disclaimer-section'

export default function Page() {
  return (
    <main className="w-full bg-background">
      <RatingBar />
      <Navbar />
      <HeroSection />
      <GrowthSection />
      <MarketingFeaturesSection />
      <ReviewsSection />
      <StatsSection />
      <PartnersSection />
      <VideoFeatureSection />
      <FinalCTASection />
      <DisclaimerSection />
    </main>
  )
}
