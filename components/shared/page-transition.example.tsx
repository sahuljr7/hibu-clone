import { PageTransition } from './page-transition'

/**
 * Example usage of the PageTransition component
 * 
 * This component should wrap the main content of a page to provide
 * smooth entry animations when navigating between routes.
 */

// Example 1: Basic usage in a page component
export function ExamplePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Page</h1>
        <p className="text-lg">
          This content will fade in and slide up when the page loads.
        </p>
      </div>
    </PageTransition>
  )
}

// Example 2: Usage with multiple sections
export function ExamplePageWithSections() {
  return (
    <PageTransition>
      <main>
        <section className="py-16">
          <h1>Hero Section</h1>
        </section>
        <section className="py-16">
          <h2>Features Section</h2>
        </section>
        <section className="py-16">
          <h2>CTA Section</h2>
        </section>
      </main>
    </PageTransition>
  )
}

// Example 3: Usage in Next.js App Router page
export function NextJSPageExample() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <h1>Next.js Page with Transition</h1>
        <p>Content here will animate on page load</p>
      </div>
    </PageTransition>
  )
}
