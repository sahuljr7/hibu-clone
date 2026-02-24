/**
 * Example usage of ContentSection component
 * 
 * This file demonstrates how to use the ContentSection component
 * with different variants and content types.
 */

import { ContentSection } from './content-section'

export function ContentSectionExamples() {
  return (
    <>
      {/* Default variant */}
      <ContentSection
        title="Our Services"
        badge="What We Offer"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="text-xl font-semibold mb-2">Service 1</h3>
            <p className="text-muted-foreground">Description of service 1</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="text-xl font-semibold mb-2">Service 2</h3>
            <p className="text-muted-foreground">Description of service 2</p>
          </div>
          <div className="p-6 rounded-lg border border-border bg-card">
            <h3 className="text-xl font-semibold mb-2">Service 3</h3>
            <p className="text-muted-foreground">Description of service 3</p>
          </div>
        </div>
      </ContentSection>

      {/* Featured variant */}
      <ContentSection
        title="Featured Content"
        badge="Highlighted"
        variant="featured"
      >
        <div className="max-w-3xl">
          <p className="text-lg text-muted-foreground leading-relaxed">
            This is a featured section with a subtle accent background.
            It draws attention to important content while maintaining
            visual hierarchy.
          </p>
        </div>
      </ContentSection>

      {/* Dark variant */}
      <ContentSection
        title="Success Stories"
        badge="Client Reviews"
        variant="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-card">
            <p className="text-muted-foreground italic mb-4">
              "Excellent service and results!"
            </p>
            <p className="font-semibold">- Happy Client</p>
          </div>
          <div className="p-6 rounded-lg bg-card">
            <p className="text-muted-foreground italic mb-4">
              "Highly recommend for digital marketing."
            </p>
            <p className="font-semibold">- Satisfied Customer</p>
          </div>
        </div>
      </ContentSection>

      {/* Without badge */}
      <ContentSection title="Simple Section">
        <p className="text-muted-foreground">
          Content sections can also be used without badges for a cleaner look.
        </p>
      </ContentSection>
    </>
  )
}
