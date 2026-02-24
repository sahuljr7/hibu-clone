import { generateLandingPageMetadata } from '@/components/landing-page-layout'
import { LandingPageLayout } from '@/components/landing-page-layout'
import { LandingHeroSection } from '@/components/landing-hero-section'
import { ContentSection } from '@/components/content-section'
import Link from 'next/link'

// Generate metadata for SEO
export const metadata = generateLandingPageMetadata({
  title: 'Resources | Hibu',
  description: 'Explore free marketing tools, educational content, and case studies to help your business succeed online. Access our marketing quiz, business listings scan, and more.',
  keywords: ['marketing tools', 'business resources', 'case studies', 'marketing blog', 'digital marketing resources'],
  ogImage: '/images/og-resources.jpg',
  ogType: 'website',
})

export default function ResourcesPage() {
  return (
    <LandingPageLayout
      title="Resources | Hibu"
      description="Free marketing tools and educational content for local businesses"
      keywords={['marketing tools', 'business resources', 'case studies', 'marketing blog']}
      ogImage="/images/og-resources.jpg"
    >
      {/* Hero Section */}
      <LandingHeroSection
        subtitle="Resources"
        title="Tools and Insights to Grow Your Business"
        description="Access free marketing tools, educational content, and real-world case studies to help you make informed decisions and achieve your business goals."
        backgroundGradient="from-accent/10 via-background to-primary/10"
      />

      {/* Free Tools Section */}
      <ContentSection
        title="Free Tools"
        badge="Popular"
        variant="featured"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link
            href="/tools/marketing-quiz"
            className="group p-6 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Marketing Quiz
              </h3>
              <p className="text-muted-foreground">
                Discover your marketing strengths and areas for improvement with our comprehensive assessment.
              </p>
            </div>
          </Link>

          <Link
            href="/tools/business-listings-scan"
            className="group p-6 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
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
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Business Listings Scan
              </h3>
              <p className="text-muted-foreground">
                Check how your business appears across major directories and identify listing inconsistencies.
              </p>
            </div>
          </Link>

          <Link
            href="/tools/digital-marketing-score"
            className="group p-6 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Digital Marketing Score
              </h3>
              <p className="text-muted-foreground">
                Get a comprehensive analysis of your digital marketing performance and actionable recommendations.
              </p>
            </div>
          </Link>

          <Link
            href="/tools/social-advertising-calculator"
            className="group p-6 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Social Advertising Calculator
              </h3>
              <p className="text-muted-foreground">
                Estimate your social media advertising costs and potential ROI across different platforms.
              </p>
            </div>
          </Link>
        </div>
      </ContentSection>

      {/* Learn Section */}
      <ContentSection
        title="Learn"
        badge="Educational Content"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            Stay informed with expert insights, industry trends, and practical tips to help you navigate the digital marketing landscape.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/blog"
              className="group p-8 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Hibu Blog
                </h3>
                <p className="text-muted-foreground">
                  Explore articles on digital marketing strategies, local business growth, SEO tips, and industry best practices from our team of experts.
                </p>
                <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  Read Articles
                  <svg
                    className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>

            <Link
              href="/resources/guides"
              className="group p-8 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Marketing Guides
                </h3>
                <p className="text-muted-foreground">
                  Download comprehensive guides and whitepapers covering everything from getting started with digital marketing to advanced optimization techniques.
                </p>
                <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  Browse Guides
                  <svg
                    className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </ContentSection>

      {/* Case Studies Section */}
      <ContentSection
        title="Case Studies"
        badge="Success Stories"
        variant="featured"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            See how businesses like yours have achieved remarkable results with Hibu's digital marketing solutions.
          </p>

          {/* Featured Case Study */}
          <div className="p-8 rounded-lg bg-card border border-border shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  Featured Case Study
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-foreground">
                How a Local HVAC Company Increased Leads by 250%
              </h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover how we helped a family-owned HVAC business transform their digital presence and generate more qualified leads through targeted search advertising and local SEO optimization.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-border">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">250%</div>
                  <div className="text-sm text-muted-foreground">Increase in Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">180%</div>
                  <div className="text-sm text-muted-foreground">ROI Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">3x</div>
                  <div className="text-sm text-muted-foreground">Website Traffic</div>
                </div>
              </div>

              <Link
                href="/case-studies/hvac-lead-generation"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-300"
              >
                Read Full Case Study
              </Link>
            </div>
          </div>

          {/* CTA for More Case Studies */}
          <div className="text-center pt-8">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all text-lg"
            >
              View All Case Studies
              <svg
                className="w-5 h-5 ml-1 hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </ContentSection>
    </LandingPageLayout>
  )
}
