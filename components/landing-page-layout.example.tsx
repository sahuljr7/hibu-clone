/**
 * Example usage of LandingPageLayout component
 * 
 * This file demonstrates how to use the LandingPageLayout component
 * in a Next.js page with proper metadata configuration.
 */

import { LandingPageLayout, generateLandingPageMetadata } from './landing-page-layout'
import { LandingHeroSection } from './landing-hero-section'
import { ContentSection } from './content-section'

// Generate metadata for the page (use in page.tsx)
export const metadata = generateLandingPageMetadata({
  title: 'Digital Marketing Services | Hibu',
  description: 'Comprehensive digital marketing services powered by Hibu One platform. Search ads, display ads, social media marketing, and SEO services for local businesses.',
  keywords: ['digital marketing', 'SEO', 'PPC', 'social media marketing'],
  ogImage: '/images/og-services.jpg',
  ogType: 'website',
})

// Example page component
export default function ExampleLandingPage() {
  return (
    <LandingPageLayout
      title="Digital Marketing Services | Hibu"
      description="Comprehensive digital marketing services for local businesses"
      keywords={['digital marketing', 'SEO', 'PPC']}
      ogImage="/images/og-services.jpg"
    >
      {/* Hero section - h1 heading */}
      <LandingHeroSection
        title="Digital Marketing Services"
        subtitle="Grow Your Business Online"
        description="Comprehensive digital marketing services powered by Hibu One platform."
        backgroundGradient="from-primary/10 via-accent/5 to-background"
      />

      {/* Content sections - h2 headings */}
      <ContentSection
        title="Hibu One Marketing Platform"
        badge="Featured"
        variant="featured"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Content items */}
          <div className="p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
            <h3 className="text-xl font-semibold mb-2">All-in-One Platform</h3>
            <p className="text-muted-foreground">
              Manage all your digital marketing from one centralized dashboard.
            </p>
          </div>
          {/* More content items... */}
        </div>
      </ContentSection>

      <ContentSection
        title="Ad Campaigns"
        badge="Popular"
      >
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Reach your target audience with powerful advertising campaigns.
          </p>
          {/* More content... */}
        </div>
      </ContentSection>

      {/* Additional sections following proper heading hierarchy */}
    </LandingPageLayout>
  )
}

/**
 * Semantic HTML Structure Example:
 * 
 * <header>
 *   <Navbar />
 * </header>
 * 
 * <main>
 *   <section> <!-- Hero Section with h1 -->
 *     <h1>Digital Marketing Services</h1>
 *   </section>
 *   
 *   <section> <!-- Content Section with h2 -->
 *     <h2>Hibu One Marketing Platform</h2>
 *     <div>
 *       <h3>All-in-One Platform</h3> <!-- Subsection with h3 -->
 *     </div>
 *   </section>
 *   
 *   <section> <!-- Another Content Section with h2 -->
 *     <h2>Ad Campaigns</h2>
 *   </section>
 * </main>
 * 
 * This structure ensures:
 * - Proper semantic HTML (header, main, section)
 * - Correct heading hierarchy (h1 → h2 → h3)
 * - SEO-friendly structure
 * - Accessibility compliance
 */
