import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { PageTransition } from '@/components/shared/page-transition'
import { ClientSupportContact } from '@/components/client-support/client-support-contact'
import { ClientSupportForm } from '@/components/client-support/client-support-form'

/**
 * Metadata for SEO optimization
 * Validates: Requirements 1.1, 1.2
 */
export const metadata: Metadata = {
  title: 'Client Support | Hibu',
  description: 'Contact Hibu client support for assistance with your digital marketing services. Our service and support teams are ready to assist by phone, live chat or message.',
}

/**
 * Client Support Page
 * 
 * Main route component for /client-support
 * Provides existing Hibu clients with multiple ways to contact support
 * 
 * Layout:
 * - Two-column layout on desktop (lg:grid-cols-2)
 * - Single-column layout on mobile (stacked vertically)
 * - Contact information in left column
 * - Support form in right column
 * - Page transition animation on load
 * 
 * Validates: Requirements 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 7.1, 9.1
 */
export default function ClientSupportPage() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full">
        <Navbar />

        {/* Main Content Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Two-column responsive grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Contact Information */}
            <div className="w-full">
              <ClientSupportContact />
            </div>

            {/* Right Column: Support Form */}
            <div className="w-full flex justify-center lg:justify-end">
              <ClientSupportForm />
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
