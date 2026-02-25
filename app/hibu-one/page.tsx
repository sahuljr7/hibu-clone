import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { RatingBar } from '@/components/rating-bar'
import { PageTransition } from '@/components/shared/page-transition'
import { HibuOneHero } from '@/components/hibu-one/hibu-one-hero'
import { MarketingBenefits } from '@/components/hibu-one/marketing-benefits'
import { HibuOneFeaturePanel } from '@/components/hibu-one/hibu-one-feature-panel'
import { AdCampaignsSection } from '@/components/hibu-one/ad-campaigns-section'
import { OrganicMarketingSection } from '@/components/hibu-one/organic-marketing-section'
import { DashboardShowcase } from '@/components/hibu-one/dashboard-showcase'
import { HibuOneFinalCTA } from '@/components/hibu-one/hibu-one-final-cta'
import { hibuOneContent } from './content'

/**
 * Metadata for SEO optimization
 * Includes title, description, and Open Graph tags
 */
export const metadata: Metadata = {
  title: 'Hibu One - All-in-One Marketing Platform | Hibu',
  description:
    'Manage all your digital marketing campaigns from one powerful platform. Hibu One combines advertising, organic marketing, and analytics into a seamless experience.',
  openGraph: {
    title: 'Hibu One - All-in-One Marketing Platform',
    description:
      'Simplify your digital marketing with Hibu One. One platform, one provider, unlimited possibilities.',
    type: 'website',
    url: 'https://hibu.com/hibu-one',
    images: [
      {
        url: '/images/hibu-one/hero-dashboard.jpg',
        width: 1200,
        height: 630,
        alt: 'Hibu One dashboard showing unified marketing platform interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hibu One - All-in-One Marketing Platform',
    description:
      'Simplify your digital marketing with Hibu One. One platform, one provider, unlimited possibilities.',
    images: ['/images/hibu-one/hero-dashboard.jpg'],
  },
}

/**
 * Hibu One Landing Page
 * 
 * Main route component for /hibu-one
 * Renders all sections in the correct order with page transition animation
 * 
 * Section order:
 * 1. Hero
 * 2. Marketing Benefits Cards
 * 3. Hibu One Feature Card
 * 4. Ad Campaigns
 * 5. Organic Marketing
 * 6. All-in-one Dashboard
 * 7. Final CTA
 * 
 * Requirements: 1.1, 1.4, 2.1
 */
export default function HibuOnePage() {
  return (
    <PageTransition>
      <main className="w-full">
        <RatingBar />
        <Navbar />

        {/* Hero Section */}
        <HibuOneHero
          heading={hibuOneContent.hero.heading}
          subheading={hibuOneContent.hero.subheading}
          description={hibuOneContent.hero.description}
          primaryCTA={hibuOneContent.hero.primaryCTA}
          secondaryCTA={hibuOneContent.hero.secondaryCTA}
          mediaUrl={hibuOneContent.hero.media.url}
          mediaAlt={hibuOneContent.hero.media.alt}
        />

        {/* Marketing Benefits Cards */}
        <MarketingBenefits cards={hibuOneContent.marketingBenefits.cards} />

        {/* Hibu One Feature Panel */}
        <HibuOneFeaturePanel
          heading={hibuOneContent.featurePanel.heading}
          description={hibuOneContent.featurePanel.description}
          features={hibuOneContent.featurePanel.features}
          dashboardImages={hibuOneContent.featurePanel.dashboardImages}
        />

        {/* Ad Campaigns Section */}
        <AdCampaignsSection
          heading={hibuOneContent.adCampaigns.heading}
          description={hibuOneContent.adCampaigns.description}
          features={hibuOneContent.adCampaigns.features || []}
          mediaUrl={hibuOneContent.adCampaigns.media.url}
        />

        {/* Organic Marketing Section */}
        <OrganicMarketingSection
          heading={hibuOneContent.organicMarketing.heading}
          description={hibuOneContent.organicMarketing.description}
          features={hibuOneContent.organicMarketing.features || []}
        />

        {/* Dashboard Showcase */}
        <DashboardShowcase
          heading={hibuOneContent.dashboardShowcase.heading}
          description={hibuOneContent.dashboardShowcase.description}
          dashboardUrl={hibuOneContent.dashboardShowcase.media.url}
        />

        {/* Final CTA Section */}
        <HibuOneFinalCTA
          heading={hibuOneContent.finalCTA.heading}
          description={hibuOneContent.finalCTA.description}
          ctaText={hibuOneContent.finalCTA.cta.text}
          ctaHref={hibuOneContent.finalCTA.cta.href}
        />
      </main>
    </PageTransition>
  )
}
