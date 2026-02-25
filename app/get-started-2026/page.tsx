import { Metadata } from 'next'
import { DemoFormSection } from '@/components/get-started/demo-form-section'
import { TestimonialsSection } from '@/components/get-started/testimonials-section'

/**
 * Get Started 2026 Page
 * Conversion-focused landing page for demo requests
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4
 */

export const metadata: Metadata = {
  title: 'Request a Demo | Hibu - Digital Marketing Services',
  description: 'Get a personalized demo of Hibu One and see how your website, ads, reviews and leads work together in one platform.',
}

export default function GetStarted2026Page() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden will-change-auto">
      <DemoFormSection />
      <TestimonialsSection />
    </main>
  )
}
