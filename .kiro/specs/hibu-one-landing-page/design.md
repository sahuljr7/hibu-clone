# Design Document: Hibu One Landing Page

## Overview

The Hibu One landing page is a high-performance, fully responsive marketing page built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The page leverages existing animation infrastructure (Framer Motion, Intersection Observer hooks) while introducing new components specifically designed for the Hibu One product showcase.

The design follows a component-based architecture with reusable patterns for animations, parallax effects, and responsive layouts. Performance is prioritized through lazy loading, hardware acceleration, and minimal JavaScript overhead.

## Architecture

### Technology Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animation**: Framer Motion (already in dependencies)
- **State Management**: React hooks (useState, useEffect, useRef)
- **Performance**: Native Intersection Observer API, hardware-accelerated CSS transforms

### File Structure

```
app/
  hibu-one/
    page.tsx                    # Main landing page route
    layout.tsx (optional)       # Page-specific layout if needed
    
components/
  hibu-one/
    hibu-one-hero.tsx          # Hero section with dual CTAs
    marketing-benefits.tsx      # Two-card benefits section
    hibu-one-feature-panel.tsx # Green panel with dashboard
    ad-campaigns-section.tsx    # White bg with purple media
    organic-marketing-section.tsx # Light blue panel
    dashboard-showcase.tsx      # Purple dashboard media card
    hibu-one-final-cta.tsx     # Dark navy CTA section
    
  shared/
    page-transition.tsx         # Reusable page transition wrapper
    section-divider.tsx         # Animated section separators
    
hooks/
  use-in-view.ts               # Existing - Intersection Observer
  use-parallax.ts              # Existing - Parallax effects
  use-reduced-motion.ts        # New - Detect motion preferences
```

### Routing Strategy

The page will use Next.js App Router with a dedicated route at `/hibu-one`. Navigation from the main page's "Learn About Hibu One" button will use Next.js `<Link>` component for client-side navigation with page transitions.

## Components and Interfaces

### 1. Page Component (`app/hibu-one/page.tsx`)

**Purpose**: Main entry point for the /hibu-one route, orchestrates all sections.

**Interface**:
```typescript
export default function HibuOnePage(): JSX.Element
```

**Responsibilities**:
- Render all sections in correct order
- Apply page-level metadata for SEO
- Wrap content in page transition animation
- Include shared layout elements (Navbar, Footer)

**Implementation Notes**:
- Use Next.js metadata API for SEO
- Leverage existing `<Navbar>` and `<Footer>` components
- Apply smooth scroll behavior via CSS

---

### 2. Page Transition Wrapper (`components/shared/page-transition.tsx`)

**Purpose**: Provides consistent page entry/exit animations.

**Interface**:
```typescript
interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps): JSX.Element
```

**Animation Spec**:
- Fade in: opacity 0 → 1
- Slide up: translateY(20px) → translateY(0)
- Duration: 0.6s
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Implementation**:
- Use Framer Motion's `<motion.div>` with `initial`, `animate`, `exit` props
- Wrap with `AnimatePresence` for exit animations
- Respect `prefers-reduced-motion`

---

### 3. Hero Section (`components/hibu-one/hibu-one-hero.tsx`)

**Purpose**: Primary above-the-fold section with heading, description, CTAs, and media.

**Interface**:
```typescript
interface HibuOneHeroProps {
  heading: string
  description: string
  primaryCTA: { text: string; href: string }
  secondaryCTA: { text: string; href: string }
  mediaUrl: string
}

export function HibuOneHero(props: HibuOneHeroProps): JSX.Element
```

**Layout**:
- Two-column grid on desktop (text left, media right)
- Single column on mobile (media top, text bottom)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

**Animations**:
- Heading: fade-in + slide-up, delay 0ms
- Description: fade-in, delay 200ms
- CTAs: fade-in + slide-up, delay 400ms
- Media card: fade-in + slide-left, delay 600ms
- Background: subtle parallax (slow type, offset 30px)

**Parallax Elements**:
- Background gradient overlay
- Heading text (optional, subtle)

---

### 4. Marketing Benefits Section (`components/hibu-one/marketing-benefits.tsx`)

**Purpose**: Display two feature cards highlighting "One Platform" and "One Provider".

**Interface**:
```typescript
interface BenefitCard {
  title: string
  description: string
  icon?: React.ReactNode
}

interface MarketingBenefitsProps {
  cards: [BenefitCard, BenefitCard]
}

export function MarketingBenefits(props: MarketingBenefitsProps): JSX.Element
```

**Layout**:
- Two-column grid on desktop
- Single column on mobile
- Equal-width cards with consistent spacing

**Animations**:
- Staggered card reveals: 0ms, 200ms delays
- Each card: fade-in + slide-up
- Trigger: when section enters viewport (threshold 0.2)

---

### 5. Hibu One Feature Panel (`components/hibu-one/hibu-one-feature-panel.tsx`)

**Purpose**: Green-themed panel showcasing dashboard mockups.

**Interface**:
```typescript
interface HibuOneFeaturePanelProps {
  heading: string
  description: string
  dashboardImages: string[]
}

export function HibuOneFeaturePanel(props: HibuOneFeaturePanelProps): JSX.Element
```

**Styling**:
- Background: soft green gradient (e.g., `bg-green-50` to `bg-green-100`)
- Rounded corners: `rounded-3xl`
- Padding: responsive (p-8 md:p-12 lg:p-16)

**Layout**:
- Alternating image/text layout
- Dashboard mockups displayed in grid or carousel

**Animations**:
- Panel: fade-in when entering viewport
- Dashboard images: staggered fade-in (100ms intervals)

---

### 6. Ad Campaigns Section (`components/hibu-one/ad-campaigns-section.tsx`)

**Purpose**: Showcase ad campaign features with purple media card.

**Interface**:
```typescript
interface AdCampaignsSectionProps {
  heading: string
  description: string
  features: string[]
  mediaUrl: string
}

export function AdCampaignsSection(props: AdCampaignsSectionProps): JSX.Element
```

**Styling**:
- Background: white (`bg-white`)
- Media card: purple gradient (`bg-gradient-to-br from-purple-500 to-purple-700`)
- Card: rounded-2xl with shadow

**Layout**:
- Alternating layout: text left, media right (or vice versa)
- Responsive stacking on mobile

**Animations**:
- Heading: parallax text (slow type)
- Features list: staggered fade-in
- Media card: fade-in + scale (0.95 → 1)

---

### 7. Organic Marketing Section (`components/hibu-one/organic-marketing-section.tsx`)

**Purpose**: Highlight organic marketing capabilities on light blue background.

**Interface**:
```typescript
interface OrganicMarketingSectionProps {
  heading: string
  description: string
  features: string[]
  mediaUrl?: string
}

export function OrganicMarketingSection(props: OrganicMarketingSectionProps): JSX.Element
```

**Styling**:
- Background: light blue panel (`bg-blue-50`)
- Soft rounded corners
- Ample padding and whitespace

**Animations**:
- Section: fade-in on scroll
- Features: staggered slide-in from left

---

### 8. Dashboard Showcase Section (`components/hibu-one/dashboard-showcase.tsx`)

**Purpose**: Display all-in-one dashboard with purple media card.

**Interface**:
```typescript
interface DashboardShowcaseProps {
  heading: string
  description: string
  dashboardUrl: string
}

export function DashboardShowcase(props: DashboardShowcaseProps): JSX.Element
```

**Styling**:
- Media card: large purple gradient card
- Rounded corners: `rounded-3xl`
- Shadow: `shadow-2xl`

**Animations**:
- Card: fade-in + slide-up
- Optional: subtle hover effect (scale 1.02)

---

### 9. Final CTA Section (`components/hibu-one/hibu-one-final-cta.tsx`)

**Purpose**: Conversion-focused section with centered CTA on dark background.

**Interface**:
```typescript
interface HibuOneFinalCTAProps {
  heading: string
  description: string
  ctaText: string
  ctaHref: string
}

export function HibuOneFinalCTA(props: HibuOneFinalCTAProps): JSX.Element
```

**Styling**:
- Background: dark navy (`bg-slate-900` or custom navy)
- Text: white (`text-white`)
- CTA button: primary brand color with hover effects

**Animations**:
- Heading: fade-in + slide-up
- CTA button: fade-in + scale, delay 300ms
- Optional: subtle pulse animation on CTA

---

### 10. Section Divider (`components/shared/section-divider.tsx`)

**Purpose**: Animated visual separator between major sections.

**Interface**:
```typescript
interface SectionDividerProps {
  variant?: 'line' | 'gradient' | 'wave'
}

export function SectionDivider({ variant = 'line' }: SectionDividerProps): JSX.Element
```

**Animations**:
- Line: width 0 → 100% on scroll
- Gradient: fade-in
- Wave: SVG path animation

---

### 11. Custom Hooks

#### `use-reduced-motion.ts` (New)

**Purpose**: Detect user's motion preference for accessibility.

**Interface**:
```typescript
export function useReducedMotion(): boolean
```

**Implementation**:
- Use `window.matchMedia('(prefers-reduced-motion: reduce)')`
- Return boolean indicating preference
- Update on preference change

**Usage**:
- Pass to animation components to disable/reduce motion
- Integrate with Framer Motion's `MotionConfig`

---

## Data Models

### Content Data Structure

All content for the Hibu One page will be defined in a centralized data file for easy updates:

**File**: `app/hibu-one/content.ts`

```typescript
export interface CTAButton {
  text: string
  href: string
  variant: 'primary' | 'secondary' | 'outline'
}

export interface FeatureCard {
  title: string
  description: string
  icon?: string
}

export interface MediaCard {
  url: string
  alt: string
  type: 'image' | 'video'
}

export interface SectionContent {
  heading: string
  subheading?: string
  description: string
  features?: string[]
  ctas?: CTAButton[]
  media?: MediaCard
}

export interface HibuOnePageContent {
  hero: SectionContent & { primaryCTA: CTAButton; secondaryCTA: CTAButton; media: MediaCard }
  marketingBenefits: { cards: [FeatureCard, FeatureCard] }
  featurePanel: SectionContent & { dashboardImages: string[] }
  adCampaigns: SectionContent & { media: MediaCard }
  organicMarketing: SectionContent
  dashboardShowcase: SectionContent & { media: MediaCard }
  finalCTA: SectionContent & { cta: CTAButton }
}

export const hibuOneContent: HibuOnePageContent = {
  // Content definitions...
}
```

**Benefits**:
- Single source of truth for content
- Type-safe content structure
- Easy to update without touching components
- Supports future CMS integration

---

## Performance Optimization Strategy

### 1. Image Optimization

**Approach**:
- Use Next.js `<Image>` component for automatic optimization
- Implement lazy loading for below-fold images
- Use appropriate image formats (WebP with fallbacks)
- Define explicit width/height to prevent layout shift

**Implementation**:
```typescript
import Image from 'next/image'

<Image
  src="/hibu-one/hero-media.jpg"
  alt="Hibu One Dashboard"
  width={800}
  height={600}
  loading="lazy" // for below-fold images
  placeholder="blur"
  blurDataURL="data:image/..." // low-quality placeholder
/>
```

### 2. Animation Performance

**Hardware Acceleration**:
- Use CSS transforms (`translate3d`, `scale`, `rotate`) instead of `top`/`left`
- Apply `will-change` property sparingly for animated elements
- Remove `will-change` after animation completes

**Framer Motion Optimization**:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  style={{ willChange: 'transform, opacity' }} // only during animation
/>
```

**Intersection Observer**:
- Use existing `useInView` hook with appropriate thresholds
- Set `once: true` for animations that should only trigger once
- Adjust `rootMargin` to trigger animations slightly before element enters viewport

### 3. Code Splitting

**Approach**:
- Leverage Next.js automatic code splitting
- Use dynamic imports for heavy components if needed
- Keep initial bundle size minimal

**Example** (if needed):
```typescript
import dynamic from 'next/dynamic'

const DashboardShowcase = dynamic(() => import('@/components/hibu-one/dashboard-showcase'), {
  loading: () => <div>Loading...</div>,
  ssr: true, // or false depending on needs
})
```

### 4. Lazy Loading Strategy

**Images**:
- Hero section: eager loading (above fold)
- All other sections: lazy loading

**Components**:
- All sections below fold: render immediately but lazy load media
- Use Intersection Observer to trigger animations only when visible

### 5. CSS Optimization

**Approach**:
- Use Tailwind's JIT mode (already configured)
- Minimize custom CSS
- Use CSS containment for isolated sections

**Example**:
```css
.section-container {
  contain: layout style paint;
}
```

### 6. JavaScript Optimization

**Constraints**:
- No heavy third-party libraries beyond existing dependencies
- Use native APIs (Intersection Observer, matchMedia)
- Minimize event listeners, use passive listeners where possible
- Debounce/throttle scroll handlers if needed (though Intersection Observer preferred)

### 7. Lighthouse Score Targets

**Performance**: 90+
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

**Strategies**:
- Optimize images (WebP, lazy loading)
- Minimize JavaScript execution
- Use font-display: swap for web fonts
- Preload critical resources
- Implement proper caching headers

---

## Responsive Design Strategy

### Breakpoints

Using Tailwind's default breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1023px (sm to lg)
- **Desktop**: ≥ 1024px (lg)

### Layout Patterns

#### Hero Section
- **Desktop**: Two-column grid (50/50 split)
- **Tablet**: Two-column grid (40/60 split)
- **Mobile**: Single column, media above text

#### Feature Cards
- **Desktop**: Two or three columns
- **Tablet**: Two columns
- **Mobile**: Single column, stacked

#### Alternating Sections
- **Desktop**: Image/text side-by-side, alternating
- **Tablet**: Image/text side-by-side, smaller images
- **Mobile**: Image above text, consistent order

### Parallax Behavior

**Desktop**: Full parallax effects enabled
**Tablet**: Reduced parallax (50% offset)
**Mobile**: Parallax disabled

**Implementation**:
```typescript
const isMobile = useMediaQuery('(max-width: 768px)')
const parallaxOffset = isMobile ? 0 : 30
```

### Typography Scaling

Use Tailwind's responsive text classes:
```typescript
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Heading
</h1>
```

### Spacing Adjustments

Reduce padding/margins on smaller screens:
```typescript
<section className="py-8 sm:py-12 md:py-16 lg:py-24">
  {/* Content */}
</section>
```

---

## Accessibility Implementation

### 1. Motion Preferences

**Detection**:
```typescript
// use-reduced-motion.ts
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return prefersReducedMotion
}
```

**Application**:
- Disable parallax effects
- Reduce animation duration to 0.1s or instant
- Disable decorative animations
- Keep functional animations (e.g., page transitions) but make them faster

**Framer Motion Integration**:
```typescript
import { MotionConfig } from 'framer-motion'

<MotionConfig reducedMotion={prefersReducedMotion ? 'always' : 'never'}>
  {/* Animated components */}
</MotionConfig>
```

### 2. Semantic HTML

**Structure**:
```html
<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">...</h1>
  </section>
  
  <section aria-labelledby="benefits-heading">
    <h2 id="benefits-heading">...</h2>
  </section>
  
  <!-- More sections -->
</main>
```

**Benefits**:
- Screen readers can navigate by landmarks
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for sections without visible headings

### 3. Keyboard Navigation

**Requirements**:
- All CTAs must be keyboard accessible
- Focus indicators visible and high-contrast
- Logical tab order
- Skip links for long pages (optional)

**Implementation**:
```typescript
<button
  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
  onClick={handleClick}
>
  {text}
</button>
```

### 4. Color Contrast

**Standards**: WCAG AA (4.5:1 for normal text, 3:1 for large text)

**Verification**:
- Dark navy background + white text: ✓ High contrast
- Purple gradient + white text: ✓ Verify in design
- Light blue background + dark text: ✓ Verify in design
- Green panel + dark text: ✓ Verify in design

**Tools**: Use browser DevTools or online contrast checkers

### 5. Alternative Text

**Images**:
- Decorative images: `alt=""`
- Informative images: Descriptive alt text
- Dashboard mockups: Describe key features visible

**Example**:
```typescript
<Image
  src="/dashboard.jpg"
  alt="Hibu One dashboard showing campaign performance metrics and analytics"
  width={800}
  height={600}
/>
```

---

## Animation Timing and Choreography

### Timing Guidelines

**Duration**:
- Fast: 0.3s (micro-interactions, hover effects)
- Medium: 0.6s (section reveals, card animations)
- Slow: 0.9s (page transitions, large elements)

**Easing**:
- Ease-out: Elements entering (cubic-bezier(0, 0, 0.2, 1))
- Ease-in: Elements exiting (cubic-bezier(0.4, 0, 1, 1))
- Ease-in-out: Continuous motion (cubic-bezier(0.4, 0, 0.2, 1))

### Stagger Patterns

**Card Grids**:
```typescript
{cards.map((card, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    <Card {...card} />
  </motion.div>
))}
```

**Feature Lists**:
```typescript
{features.map((feature, index) => (
  <motion.li
    key={index}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    viewport={{ once: true }}
  >
    {feature}
  </motion.li>
))}
```

### Parallax Configuration

**Hero Background**:
- Type: slow
- Offset: 30px
- Easing: easeOut

**Section Headings**:
- Type: slow
- Offset: 20px
- Easing: easeOut

**Large Banners**:
- Type: reverse
- Offset: 40px
- Easing: linear

**Disable on**:
- Mobile devices (< 768px)
- prefers-reduced-motion enabled

---

## Error Handling

### Image Loading Errors

**Strategy**: Provide fallback UI for failed image loads.

**Implementation**:
```typescript
<Image
  src={imageUrl}
  alt={altText}
  onError={(e) => {
    e.currentTarget.src = '/fallback-image.jpg'
  }}
/>
```

### Animation Errors

**Strategy**: Gracefully degrade if Framer Motion fails.

**Implementation**:
- Wrap animated components in error boundaries
- Provide static fallback if animation library fails
- Log errors for monitoring

```typescript
<ErrorBoundary fallback={<StaticComponent />}>
  <AnimatedComponent />
</ErrorBoundary>
```

### Navigation Errors

**Strategy**: Handle failed route transitions.

**Implementation**:
- Use Next.js error boundaries
- Provide user-friendly error messages
- Log navigation errors

---

## Testing Strategy

The testing strategy will employ both unit tests and property-based tests to ensure comprehensive coverage of functionality, performance, and accessibility requirements.

### Unit Testing Approach

**Focus Areas**:
- Component rendering with various props
- User interactions (button clicks, navigation)
- Responsive behavior at different breakpoints
- Error handling (image load failures, etc.)
- Accessibility features (ARIA labels, keyboard navigation)

**Testing Library**: React Testing Library + Jest

**Example Tests**:
- Hero section renders with correct content
- CTA buttons navigate to correct routes
- Sections render in correct order
- Images have proper alt text
- Buttons are keyboard accessible

### Property-Based Testing Approach

**Focus Areas**:
- Animation timing consistency across all components
- Responsive layout integrity across viewport sizes
- Accessibility compliance across all interactive elements
- Performance metrics remain within thresholds

**Testing Library**: fast-check (TypeScript property-based testing)

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Tests reference design document properties



---

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: Section Animation Consistency

*For any* section component on the landing page, when that section enters the viewport, the system should trigger both fade-in and slide-up animations with timing between 0.6 and 0.9 seconds using ease-in-out or cubic-bezier easing functions.

**Validates: Requirements 3.1, 3.2, 3.4, 3.5**

### Property 2: Staggered Card Animations

*For any* group of multiple cards displayed together, each card should have a reveal animation with incrementally increasing delay values (staggered timing).

**Validates: Requirements 3.3**

### Property 3: Motion Preference Respect

*For any* animated element or parallax effect, when the user's prefers-reduced-motion setting is enabled, the system should disable or minimize that animation/effect.

**Validates: Requirements 3.7, 4.10, 8.1**

### Property 4: Parallax Application to Text Elements

*For any* section heading, subheading, or large banner separator, the system should apply parallax effects with appropriate offset values.

**Validates: Requirements 4.2, 4.3, 4.4**

### Property 5: Parallax Exclusion from Interactive Content

*For any* dense content area, form element, interactive element, or small UI component, the system should not apply parallax effects.

**Validates: Requirements 4.5, 4.6, 4.7**

### Property 6: Responsive Parallax Behavior

*For any* parallax effect, when the viewport width is below the tablet breakpoint (768px), the system should disable or significantly reduce the parallax offset.

**Validates: Requirements 4.9, 7.4**

### Property 7: Section Transition Smoothness

*For any* adjacent sections with different background colors, the system should apply soft fade transitions between them.

**Validates: Requirements 5.1**

### Property 8: Divider Animation Presence

*For any* major section separator, the system should display subtle divider animations when the divider enters the viewport.

**Validates: Requirements 5.2**

### Property 9: Lazy Loading for Below-Fold Content

*For any* image or media component positioned below the fold, the system should apply lazy loading attributes to defer loading until needed.

**Validates: Requirements 6.1, 6.2**

### Property 10: Hardware-Accelerated Transforms

*For any* CSS transform animation, the system should use hardware-accelerated properties (translate3d, scale, rotate) rather than layout-triggering properties (top, left, width, height).

**Validates: Requirements 6.3**

### Property 11: WCAG AA Contrast Compliance

*For any* text element on the landing page, the contrast ratio between text and background should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 8.2**

### Property 12: Semantic HTML Structure

*For any* major content section, the system should use semantic HTML elements (section, article, nav, header, footer, main) with proper heading hierarchy (h1 → h2 → h3).

**Validates: Requirements 8.3**

### Property 13: Keyboard Navigation Accessibility

*For any* interactive element (button, link, form input), the system should provide keyboard accessibility with visible focus indicators and logical tab order.

**Validates: Requirements 8.4**

### Property 14: Alternating Layout Pattern

*For any* sequence of feature sections, the system should alternate the image/text layout (left/right, right/left pattern).

**Validates: Requirements 9.1**

### Property 15: Consistent Card Styling

*For any* large card component, the system should apply rounded corners with consistent border-radius values.

**Validates: Requirements 9.2**

### Property 16: Media Card Gradient Styling

*For any* Media_Card component, the system should apply a purple gradient background.

**Validates: Requirements 9.3**

### Property 17: Section Background Color Pattern

*For any* alternating content section, the system should use green or blue soft background panels in an alternating pattern.

**Validates: Requirements 9.4**

### Property 18: Secondary Button Styling

*For any* secondary action button, the system should use outline button styling rather than filled backgrounds.

**Validates: Requirements 9.5**

### Property 19: Contrast Section Styling

*For any* high-contrast section (like Final CTA), the system should use dark navy background with white text.

**Validates: Requirements 9.6**

### Property 20: Brand Color Consistency

*For any* accent color usage throughout the page, the system should use purple or green from the defined brand palette.

**Validates: Requirements 9.7**

