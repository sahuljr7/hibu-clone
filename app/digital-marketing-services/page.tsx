import { generateLandingPageMetadata } from '@/components/landing-page-layout'
import { LandingPageLayout } from '@/components/landing-page-layout'
import { LandingHeroSection } from '@/components/landing-hero-section'
import { ContentSection } from '@/components/content-section'

// Generate metadata for SEO
export const metadata = generateLandingPageMetadata({
  title: 'Digital Marketing Services | Hibu',
  description: 'Comprehensive digital marketing services powered by Hibu One platform. Search ads, display ads, social media marketing, and SEO services for local businesses.',
  keywords: ['digital marketing', 'SEO', 'PPC', 'social media marketing', 'local business marketing'],
  ogImage: '/images/og-services.jpg',
  ogType: 'website',
})

export default function DigitalMarketingServicesPage() {
  return (
    <LandingPageLayout
      title="Digital Marketing Services | Hibu"
      description="Comprehensive digital marketing services for local businesses"
      keywords={['digital marketing', 'SEO', 'PPC', 'social media marketing']}
      ogImage="/images/og-services.jpg"
    >
      {/* Hero Section */}
      <LandingHeroSection
        subtitle="Digital Marketing Services"
        title="Comprehensive Digital Marketing Solutions"
        description="Grow your business with our all-in-one digital marketing platform. From search ads to SEO, we provide the tools and expertise to help local businesses succeed online."
        backgroundGradient="from-primary/10 via-accent/5 to-background"
      />

      {/* Hibu One Platform Section */}
      <ContentSection
        title="Hibu One Marketing Platform"
        badge="Featured"
        variant="featured"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Manage all your digital marketing from one centralized dashboard. Hibu One brings together advertising, analytics, and optimization tools to help you reach more customers and grow your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Unified Dashboard</h3>
              <p className="text-muted-foreground">
                Track all your campaigns, performance metrics, and customer insights in one place.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Smart Automation</h3>
              <p className="text-muted-foreground">
                Let AI-powered tools optimize your campaigns automatically for better results.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Expert Support</h3>
              <p className="text-muted-foreground">
                Get guidance from dedicated marketing specialists who understand your business.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Ad Campaigns Section */}
      <ContentSection
        title="Ad Campaigns"
        badge="Popular"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Reach your target audience with powerful advertising campaigns across search engines, display networks, and social media platforms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">Search Advertising</h3>
              <p className="text-muted-foreground">
                Get found by customers actively searching for your services on Google and Bing. Our search ads put your business at the top of search results.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">Display Advertising</h3>
              <p className="text-muted-foreground">
                Build brand awareness with eye-catching display ads across millions of websites. Target specific audiences based on interests and behavior.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">Social Media Ads</h3>
              <p className="text-muted-foreground">
                Connect with customers on Facebook, Instagram, and LinkedIn. Create engaging social campaigns that drive traffic and conversions.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">Retargeting Campaigns</h3>
              <p className="text-muted-foreground">
                Re-engage visitors who didn't convert the first time. Show targeted ads to bring customers back to your website.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Organic Marketing Section */}
      <ContentSection
        title="Organic Marketing"
        badge="SEO Services"
        variant="featured"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Improve your search engine rankings and attract more organic traffic with our comprehensive SEO services. Build a strong online presence that drives long-term growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Local SEO</h3>
              <p className="text-muted-foreground">
                Optimize your business for local search results. Get found by customers in your area when they search for your services.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Content Marketing</h3>
              <p className="text-muted-foreground">
                Create valuable content that attracts and engages your target audience. Build authority and trust in your industry.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Technical SEO</h3>
              <p className="text-muted-foreground">
                Ensure your website is optimized for search engines with proper site structure, speed, and mobile responsiveness.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Link Building</h3>
              <p className="text-muted-foreground">
                Build high-quality backlinks to improve your domain authority and search rankings.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Platform Pricing Section */}
      <ContentSection
        title="Platform Pricing"
        badge="Get Started"
      >
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Flexible pricing plans designed for businesses of all sizes. Get the marketing tools you need to grow, with transparent pricing and no hidden fees.
          </p>
          <div className="mt-8 p-8 rounded-lg bg-primary/5 border border-primary/20">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Custom Solutions</h3>
            <p className="text-muted-foreground mb-6">
              Every business is unique. We'll create a customized marketing plan that fits your budget and goals.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
      </ContentSection>
    </LandingPageLayout>
  )
}
