import { generateLandingPageMetadata } from '@/components/landing-page-layout'
import { LandingPageLayout } from '@/components/landing-page-layout'
import { LandingHeroSection } from '@/components/landing-hero-section'
import { ContentSection } from '@/components/content-section'
import Link from 'next/link'

// Generate metadata for SEO
export const metadata = generateLandingPageMetadata({
  title: 'Company | Hibu',
  description: 'Learn about Hibu, our leadership team, career opportunities, and success stories. Discover how we help local businesses thrive with digital marketing solutions.',
  keywords: ['about hibu', 'company information', 'careers', 'leadership', 'contact us', 'success stories'],
  ogImage: '/images/og-company.jpg',
  ogType: 'website',
})

export default function CompanyPage() {
  return (
    <LandingPageLayout
      title="Company | Hibu"
      description="Learn about Hibu and how we help local businesses succeed"
      keywords={['about hibu', 'company information', 'careers', 'leadership', 'contact us']}
      ogImage="/images/og-company.jpg"
    >
      {/* Hero Section */}
      <LandingHeroSection
        subtitle="Company"
        title="Empowering Local Businesses to Thrive"
        description="At Hibu, we're dedicated to helping local businesses succeed in the digital world. With decades of experience and innovative solutions, we're your trusted partner for growth."
        backgroundGradient="from-primary/10 via-background to-accent/10"
      />

      {/* Who We Are Section */}
      <ContentSection
        title="Who We Are"
        badge="About Hibu"
        variant="featured"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Link
            href="/about-us"
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                About Us
              </h3>
              <p className="text-muted-foreground">
                Discover our mission, values, and commitment to helping local businesses succeed in the digital age.
              </p>
            </div>
          </Link>

          <Link
            href="/leadership"
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Leadership
              </h3>
              <p className="text-muted-foreground">
                Meet the experienced team leading Hibu's mission to empower local businesses worldwide.
              </p>
            </div>
          </Link>
        </div>
      </ContentSection>

      {/* Careers & Newsroom Section */}
      <ContentSection
        title="Careers & Newsroom"
        badge="Join Us"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Link
            href="/careers"
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Careers
              </h3>
              <p className="text-muted-foreground">
                Explore exciting career opportunities and join a team that's making a difference for local businesses.
              </p>
            </div>
          </Link>

          <Link
            href="/newsroom"
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Newsroom
              </h3>
              <p className="text-muted-foreground">
                Stay updated with the latest news, announcements, and insights from Hibu.
              </p>
            </div>
          </Link>
        </div>
      </ContentSection>

      {/* Contact Us Section */}
      <ContentSection
        title="Contact Us"
        badge="Get in Touch"
        variant="featured"
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/contact"
            className="group p-8 rounded-lg border border-border bg-card hover:shadow-xl hover:border-primary/50 transition-all duration-300 block"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground">
                  Have questions or want to learn more about how Hibu can help your business? Our team is here to help you succeed.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center text-primary group-hover:translate-x-2 transition-transform">
                  Contact Us
                  <svg
                    className="w-5 h-5 ml-2"
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
            </div>
          </Link>
        </div>
      </ContentSection>

      {/* Success Stories Section */}
      <ContentSection
        title="Success Stories"
        badge="Testimonials"
        variant="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link
            href="/client-reviews"
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Client Reviews
              </h3>
              <p className="text-muted-foreground">
                Read what our clients say about their experience working with Hibu and the results they've achieved.
              </p>
            </div>
          </Link>

          <Link
            href="/video-testimonials"
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Video Testimonials
              </h3>
              <p className="text-muted-foreground">
                Watch real business owners share their success stories and how Hibu helped them grow.
              </p>
            </div>
          </Link>

          <Link
            href="/employee-reviews"
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                Employee Reviews
              </h3>
              <p className="text-muted-foreground">
                Discover what it's like to work at Hibu from the people who know us best - our team members.
              </p>
            </div>
          </Link>
        </div>
      </ContentSection>
    </LandingPageLayout>
  )
}
