# LandingPageLayout Component

## Overview

The `LandingPageLayout` component provides a base layout wrapper for all landing pages with consistent semantic HTML structure and SEO metadata support. It ensures proper heading hierarchy, semantic HTML5 elements, and comprehensive metadata configuration.

## Features

- ✅ Semantic HTML5 structure (header, main, section tags)
- ✅ Proper heading hierarchy support (h1 → h2 → h3)
- ✅ SEO metadata configuration (title, description, keywords)
- ✅ Open Graph meta tags for social media sharing
- ✅ Twitter Card meta tags
- ✅ Consistent layout structure across all landing pages
- ✅ TypeScript type safety

## Requirements Validated

- **12.1**: Semantic HTML structure with header, main, and section tags
- **12.2**: Meta title tags with descriptive page titles
- **12.3**: Meta description tags with concise page descriptions
- **12.4**: Open Graph meta tags for social media sharing
- **12.5**: Proper heading hierarchy (h1, h2, h3) for content structure

## Usage

### Basic Usage

```tsx
import { LandingPageLayout } from '@/components/landing-page-layout'

export default function MyLandingPage() {
  return (
    <LandingPageLayout
      title="Digital Marketing Services | Hibu"
      description="Comprehensive digital marketing services for local businesses"
      keywords={['digital marketing', 'SEO', 'PPC']}
      ogImage="/images/og-services.jpg"
    >
      {/* Your page content */}
    </LandingPageLayout>
  )
}
```

### With Metadata Generation

```tsx
import { 
  LandingPageLayout, 
  generateLandingPageMetadata 
} from '@/components/landing-page-layout'

// Generate metadata for Next.js
export const metadata = generateLandingPageMetadata({
  title: 'Digital Marketing Services | Hibu',
  description: 'Comprehensive digital marketing services',
  keywords: ['digital marketing', 'SEO', 'PPC'],
  ogImage: '/images/og-services.jpg',
  ogType: 'website',
})

export default function MyLandingPage() {
  return (
    <LandingPageLayout
      title="Digital Marketing Services | Hibu"
      description="Comprehensive digital marketing services"
    >
      {/* Your page content */}
    </LandingPageLayout>
  )
}
```

### Complete Example with Proper Heading Hierarchy

```tsx
import { LandingPageLayout } from '@/components/landing-page-layout'
import { LandingHeroSection } from '@/components/landing-hero-section'
import { ContentSection } from '@/components/content-section'

export default function ServicesPage() {
  return (
    <LandingPageLayout
      title="Digital Marketing Services | Hibu"
      description="Comprehensive digital marketing services"
      keywords={['digital marketing', 'SEO']}
    >
      {/* Hero Section - Contains h1 */}
      <LandingHeroSection
        title="Digital Marketing Services"
        subtitle="Grow Your Business Online"
        description="Comprehensive services for local businesses."
      />

      {/* Content Section - Contains h2 */}
      <ContentSection title="Our Services" badge="Featured">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3>SEO Services</h3> {/* h3 for subsections */}
            <p>Improve your search rankings</p>
          </div>
          <div>
            <h3>PPC Advertising</h3>
            <p>Drive targeted traffic</p>
          </div>
          <div>
            <h3>Social Media</h3>
            <p>Engage your audience</p>
          </div>
        </div>
      </ContentSection>

      {/* Another Content Section - Contains h2 */}
      <ContentSection title="Why Choose Us">
        <p>We provide comprehensive solutions...</p>
      </ContentSection>
    </LandingPageLayout>
  )
}
```

## Props

### LandingPageLayout

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Page content to render within the layout |
| `title` | `string` | Yes | Page title for SEO and metadata |
| `description` | `string` | Yes | Page description for SEO and metadata |
| `keywords` | `string[]` | No | Array of keywords for SEO |
| `ogImage` | `string` | No | Open Graph image URL (default: '/images/og-default.jpg') |
| `ogType` | `string` | No | Open Graph type (default: 'website') |

### generateLandingPageMetadata

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | `string` | Yes | Page title |
| `description` | `string` | Yes | Page description |
| `keywords` | `string[]` | No | Array of keywords |
| `ogImage` | `string` | No | Open Graph image URL |
| `ogType` | `string` | No | Open Graph type |

**Returns**: `Metadata` object for Next.js

## Semantic HTML Structure

The component generates the following semantic structure:

```html
<header>
  <Navbar />
</header>

<main class="min-h-screen">
  <!-- Your page content -->
  <section>
    <h1>Page Title</h1> <!-- One h1 per page -->
  </section>
  
  <section>
    <h2>Section Title</h2> <!-- h2 for main sections -->
    <div>
      <h3>Subsection</h3> <!-- h3 for subsections -->
    </div>
  </section>
</main>
```

## Heading Hierarchy Guidelines

To maintain proper heading hierarchy:

1. **One h1 per page**: Use in the hero section for the main page title
2. **h2 for main sections**: Use in ContentSection components for major sections
3. **h3 for subsections**: Use within content sections for sub-topics
4. **Never skip levels**: Don't jump from h1 to h3 without an h2

### ✅ Correct Hierarchy

```tsx
<h1>Digital Marketing Services</h1>
  <h2>Our Services</h2>
    <h3>SEO Services</h3>
    <h3>PPC Advertising</h3>
  <h2>Why Choose Us</h2>
    <h3>Experience</h3>
```

### ❌ Incorrect Hierarchy

```tsx
<h1>Digital Marketing Services</h1>
  <h3>Our Services</h3> {/* Skipped h2 */}
  <h2>Why Choose Us</h2>
```

## SEO Metadata

The component supports comprehensive SEO metadata:

### Title Tag
```html
<title>Digital Marketing Services | Hibu</title>
```

### Meta Description
```html
<meta name="description" content="Comprehensive digital marketing services..." />
```

### Keywords
```html
<meta name="keywords" content="digital marketing, SEO, PPC" />
```

### Open Graph Tags
```html
<meta property="og:title" content="Digital Marketing Services | Hibu" />
<meta property="og:description" content="Comprehensive digital marketing..." />
<meta property="og:type" content="website" />
<meta property="og:image" content="/images/og-services.jpg" />
```

### Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Digital Marketing Services | Hibu" />
<meta name="twitter:description" content="Comprehensive digital marketing..." />
<meta name="twitter:image" content="/images/og-services.jpg" />
```

## Best Practices

1. **Always use generateLandingPageMetadata**: Export metadata in your page.tsx files
2. **Maintain heading hierarchy**: Ensure proper h1 → h2 → h3 order
3. **Use semantic HTML**: Wrap content in appropriate section elements
4. **Provide descriptive titles**: Include brand name and clear page purpose
5. **Write compelling descriptions**: Keep under 160 characters for SEO
6. **Use relevant keywords**: Include 3-5 targeted keywords
7. **Optimize OG images**: Use 1200x630px images for social sharing

## Accessibility

The component ensures accessibility through:

- Semantic HTML5 elements (header, main, section)
- Proper heading hierarchy for screen readers
- Descriptive page titles and meta descriptions
- Logical document structure

## Related Components

- `LandingHeroSection`: Hero section with h1 heading
- `ContentSection`: Content section with h2 heading
- `Navbar`: Navigation component included in header

## Examples

See `landing-page-layout.example.tsx` for complete usage examples.
