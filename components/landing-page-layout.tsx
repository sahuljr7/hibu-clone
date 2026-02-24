import type { Metadata } from 'next'
import { Navbar } from './navbar'

interface LandingPageLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
}

/**
 * Base layout wrapper for landing pages with semantic HTML structure and SEO metadata support.
 * 
 * Features:
 * - Semantic HTML5 structure (header, main, section)
 * - Proper heading hierarchy support
 * - SEO metadata configuration (title, description, Open Graph)
 * - Consistent layout structure across all landing pages
 * 
 * @example
 * ```tsx
 * <LandingPageLayout
 *   title="Digital Marketing Services | Hibu"
 *   description="Comprehensive digital marketing services for local businesses"
 *   keywords={['digital marketing', 'SEO', 'PPC']}
 *   ogImage="/images/og-services.jpg"
 * >
 *   <HeroSection />
 *   <ContentSection />
 * </LandingPageLayout>
 * ```
 */
export function LandingPageLayout({
  children,
  title,
  description,
}: LandingPageLayoutProps) {
  return (
    <>
      {/* Semantic header element for navigation */}
      <header>
        <Navbar />
      </header>

      {/* Main content area with semantic structure */}
      <main className="min-h-screen">
        {children}
      </main>
    </>
  )
}

/**
 * Helper function to generate metadata for landing pages.
 * Use this in your page.tsx files to configure SEO metadata.
 * 
 * @example
 * ```tsx
 * export const metadata = generateLandingPageMetadata({
 *   title: 'Digital Marketing Services | Hibu',
 *   description: 'Comprehensive digital marketing services',
 *   keywords: ['digital marketing', 'SEO'],
 *   ogImage: '/images/og-services.jpg',
 * })
 * ```
 */
export function generateLandingPageMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
}: {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: ogType as 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
