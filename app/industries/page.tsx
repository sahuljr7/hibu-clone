import { LandingPageLayout, generateLandingPageMetadata } from '@/components/landing-page-layout'
import { LandingHeroSection } from '@/components/landing-hero-section'
import { IndustriesGrid } from '@/components/industries-grid'

export const metadata = generateLandingPageMetadata({
  title: 'Industries We Serve | Hibu',
  description: 'Hibu provides tailored digital marketing solutions for businesses across diverse industries including automotive, pet services, professional services, medical, home services, and more.',
  keywords: ['industries', 'automotive marketing', 'pet services marketing', 'professional services', 'medical marketing', 'home services marketing'],
  ogImage: '/images/og-industries.jpg',
})

export default function IndustriesPage() {
  return (
    <LandingPageLayout
      title={metadata.title as string}
      description={metadata.description as string}
    >
      <LandingHeroSection
        title="Industries We Serve"
        subtitle="Tailored Solutions"
        description="Hibu provides specialized digital marketing solutions designed for the unique needs of businesses across diverse industries. From automotive to home services, we understand your market and help you grow."
        backgroundGradient="from-blue-50 via-background to-purple-50"
      />

      <IndustriesGrid />
    </LandingPageLayout>
  )
}
