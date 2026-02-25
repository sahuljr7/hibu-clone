import { HibuOneFinalCTA } from './hibu-one-final-cta'

/**
 * Example usage of HibuOneFinalCTA component
 */
export function HibuOneFinalCTAExample() {
  return (
    <HibuOneFinalCTA
      heading="Ready to Simplify Your Marketing?"
      description="Join thousands of businesses that trust Hibu One to manage their digital marketing. Get started today and see the difference."
      ctaText="Start Your Free Trial"
      ctaHref="/signup"
    />
  )
}

/**
 * Example with custom content
 */
export function HibuOneFinalCTACustomExample() {
  return (
    <HibuOneFinalCTA
      heading="Transform Your Business Today"
      description="Experience the power of unified marketing management with Hibu One's all-in-one platform."
      ctaText="Get Started Now"
      ctaHref="/contact"
    />
  )
}
