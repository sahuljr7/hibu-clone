/**
 * Example usage of LandingHeroSection component
 * 
 * This file demonstrates how to use the reusable LandingHeroSection
 * component across different landing pages.
 */

import { LandingHeroSection } from './landing-hero-section'

// Example 1: Digital Marketing Services page
export function DigitalMarketingServicesHero() {
  return (
    <LandingHeroSection
      subtitle="Digital Marketing Services"
      title="Comprehensive Digital Marketing Solutions"
      description="Grow your business with our integrated digital marketing platform. From search ads to SEO, we've got you covered."
      backgroundGradient="from-blue-50/50 via-background to-purple-50/50"
    />
  )
}

// Example 2: Industries page
export function IndustriesHero() {
  return (
    <LandingHeroSection
      subtitle="Industries We Serve"
      title="Tailored Solutions for Every Industry"
      description="Discover how our digital marketing services are customized to meet the unique needs of your industry."
    />
  )
}

// Example 3: Resources page (without subtitle)
export function ResourcesHero() {
  return (
    <LandingHeroSection
      title="Resources & Tools"
      description="Access free marketing tools, educational content, and case studies to help your business succeed online."
      backgroundGradient="from-green-50/50 via-background to-teal-50/50"
    />
  )
}

// Example 4: Company page with custom gradient
export function CompanyHero() {
  return (
    <LandingHeroSection
      subtitle="About Hibu"
      title="Your Partner in Digital Marketing Success"
      description="Learn about our mission, values, and the team dedicated to helping local businesses thrive online."
      backgroundGradient="from-orange-50/50 via-background to-red-50/50"
    />
  )
}
