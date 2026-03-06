# Design Document: Hibu One Hero Redesign

## Overview

This design document specifies the technical approach for redesigning the Hibu One landing page hero section. The redesign transforms the current two-column layout into a centered, single-column design with a soft green gradient background and a distinctive layered media card component.

### Design Goals

1. **Visual Transformation**: Implement a centered layout that matches the provided screenshot design while maintaining all existing functionality
2. **Component Preservation**: Retain all existing props, hooks, and accessibility features without breaking changes
3. **Performance Maintenance**: Ensure the redesign maintains or improves current performance metrics
4. **Accessibility Compliance**: Preserve WCAG AA compliance and all accessibility features

### Key Changes

- **Layout**: Two-column grid → Single-column centered layout
- **Background**: Subtle gradient → Prominent soft green gradient (light green to white)
- **Typography**: Heading with subheading → Simplified "Hibu One" heading with rich text description
- **Media Component**: Simple glassmorphism card → Layered media card with purple gradient and green shadow
- **Content Structure**: Enhanced content.ts to support rich text formatting and layered media card content

### Non-Goals

- Changing the component's public API (HibuOneHeroProps interface)
- Modifying animation timing or easing functions
- Altering the existing hook implementations (useReducedMotion, useParallax)
- Changing the Next.js Image optimization strategy

## Architecture

### Component Structure

```
HibuOneHero (components/hibu-one/hibu-one-hero.tsx)
├── Section Container (with parallax ref)
│   ├── Background Gradient Layer (absolute positioned)
│   └── Content Container (relative z-index)
│       ├── Heading (h1)
│       ├── Description (with rich text support)
│       ├── CTA Button Group
│       │   ├── Primary Button (solid purple)
│       │   └── Secondary Button (outline)
│       └── LayeredMediaCard
│           ├── Shadow Layer (green, offset)
│           └── Primary Layer (purple gradient)
│               ├── Logo
│               ├── Tagline
│               ├── Watch CTA
│               └── Floating UI Mockups
```

### Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI Library**: React 19.2.3
- **Animation**: Framer Motion 11.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Image Optimization**: Next.js Image component
- **Type Safety**: TypeScript 5.7.3

### Design Patterns

1. **Composition Pattern**: LayeredMediaCard as a separate composable component
2. **Render Props**: Framer Motion's motion components for declarative animations
3. **Custom Hooks**: useReducedMotion and useParallax for accessibility and effects
4. **Content-Driven Rendering**: All content sourced from content.ts data structure

## Components and Interfaces

### HibuOneHeroProps Interface

```typescript
export interface HibuOneHeroProps {
  heading: string
  subheading?: string // Will be unused in new design but preserved for compatibility
  description: string | React.ReactNode // Enhanced to support rich text
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA: {
    text: string
    href: string
  }
  mediaUrl: string // Will be repurposed for layered card
  mediaAlt: string
  // New optional props for layered media card
  mediaCard?: {
    logo?: string
    logoAlt?: string
    tagline?: string
    watchCTA?: {
      text: string
      href?: string
    }
    mockups?: Array<{
      url: string
      alt: string
      position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
    }>
  }
}
```

### LayeredMediaCard Component

```typescript
interface LayeredMediaCardProps {
  logo?: string
  logoAlt?: string
  tagline?: string
  watchCTA?: {
    text: string
    href?: string
  }
  mockups?: Array<{
    url: string
    alt: string
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  }>
  className?: string
}

export function LayeredMediaCard({
  logo,
  logoAlt,
  tagline,
  watchCTA,
  mockups,
  className
}: LayeredMediaCardProps): JSX.Element
```

### Content Data Structure Updates

```typescript
// Enhanced hero content structure in app/hibu-one/content.ts
export interface HeroContent extends SectionContent {
  heading: string
  description: string | React.ReactNode // Support JSX for bold emphasis
  primaryCTA: CTAButton
  secondaryCTA: CTAButton
  media: MediaCard
  mediaCard?: {
    logo?: string
    logoAlt?: string
    tagline?: string
    watchCTA?: {
      text: string
      href?: string
    }
    mockups?: Array<{
      url: string
      alt: string
      position: string
    }>
  }
}
```

## Data Models

### Updated hibuOneContent.hero Object

```typescript
hero: {
  heading: 'Hibu One',
  description: (
    <>
      We help you <strong>establish your business online</strong>,{' '}
      <strong>promote it everywhere</strong>, and{' '}
      <strong>get the results and support</strong> you need to succeed.
    </>
  ),
  primaryCTA: {
    text: 'Request a demo',
    href: '/contact',
    variant: 'primary',
  },
  secondaryCTA: {
    text: 'Tour the Platform',
    href: '/demo',
    variant: 'outline',
  },
  media: {
    url: '/images/hibu-one/hero-dashboard.jpg', // Fallback
    alt: 'Hibu One platform overview',
    type: 'image',
  },
  mediaCard: {
    logo: '/images/hibu-one/hibu-one-logo.svg',
    logoAlt: 'hibu ONE logo',
    tagline: 'Enterprise-level marketing built for local businesses',
    watchCTA: {
      text: 'WATCH NOW ▶',
      href: '/demo-video',
    },
    mockups: [
      {
        url: '/images/hibu-one/mockup-website.png',
        alt: 'Website preview mockup',
        position: 'top-left',
      },
      {
        url: '/images/hibu-one/mockup-reviews.png',
        alt: 'Review card mockup',
        position: 'top-right',
      },
      {
        url: '/images/hibu-one/mockup-listings.png',
        alt: 'Local listings mockup',
        position: 'bottom-right',
      },
    ],
  },
}
```

### Layout Specifications

#### Desktop Layout (≥1024px)

```
┌─────────────────────────────────────────────────────────────┐
│                    Soft Green Gradient Background            │
│                                                              │
│                         Hibu One                             │
│                      (Large Heading)                         │
│                                                              │
│              We help you establish your business...          │
│                    (Description with bold)                   │
│                                                              │
│          [Request a demo]  [Tour the Platform]              │
│                                                              │
│                    ┌─────────────────┐                      │
│                    │  Layered Media  │                      │
│                    │      Card       │                      │
│                    └─────────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Tablet Layout (768px - 1023px)

- Reduced spacing between elements
- Slightly smaller font sizes
- Media card scales proportionally
- Buttons remain horizontal

#### Mobile Layout (<768px)

- All elements stack vertically
- Buttons stack vertically
- Media card maintains aspect ratio
- Increased vertical spacing for touch targets

### Tailwind CSS Classes

#### Section Container

```typescript
className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
```

#### Background Gradient

```typescript
className="absolute inset-0 bg-gradient-to-b from-green-50 via-green-25 to-white"
// Custom colors in tailwind.config.ts:
// green-25: 'hsl(142, 76%, 97%)'
// green-50: 'hsl(142, 76%, 94%)'
```

#### Content Container

```typescript
className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-10 lg:space-y-12"
```

#### Heading

```typescript
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground"
```

#### Description

```typescript
className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-3xl leading-relaxed"
```

#### CTA Button Group

```typescript
className="flex flex-col sm:flex-row gap-4 justify-center items-center"
```

#### Layered Media Card Container

```typescript
className="relative w-full max-w-4xl mt-8 md:mt-12"
```

## Layered Media Card Implementation

### Component Structure

The LayeredMediaCard consists of two main layers:

1. **Shadow Layer**: Green-tinted card offset to the right and bottom
2. **Primary Layer**: Purple gradient card with content

### Shadow Layer Specifications

```typescript
// Position: Absolute, offset 20px right and 20px down
className="absolute top-5 left-5 right-[-20px] bottom-[-20px] bg-gradient-to-br from-green-100 to-green-200 rounded-3xl -z-10"
```

### Primary Layer Specifications

```typescript
// Purple gradient with rounded corners
className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
```

### Internal Layout

```
┌────────────────────────────────────────────────┐
│ [Logo]                                         │ ← Top-left
│                                                │
│  Enterprise-level marketing built for          │ ← Centered tagline
│  local businesses                              │
│                                                │
│              [WATCH NOW ▶]                     │ ← Centered CTA
│                                                │
│    [Mockup]      [Mockup]      [Mockup]       │ ← Floating mockups
│                                                │
└────────────────────────────────────────────────┘
```

### Mockup Positioning

Mockups use absolute positioning with predefined positions:

```typescript
const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}
```

### Animation Specifications

All animations use Framer Motion with the following configuration:

```typescript
const animationDuration = prefersReducedMotion ? 0.1 : 0.6
const easing = [0.4, 0, 0.2, 1] // cubic-bezier

// Heading animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: animationDuration, delay: 0, ease: easing }}

// Description animation
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: animationDuration, delay: 0.2 }}

// CTA buttons animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: animationDuration, delay: 0.4, ease: easing }}

// Layered media card animation
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: animationDuration, delay: 0.6, ease: easing }}
```

### Parallax Configuration

The parallax effect will be disabled for the centered layout to avoid visual confusion:

```typescript
const { ref: parallaxRef, parallaxValues } = useParallax({
  offset: 0, // Disabled
  type: 'slow',
  easing: 'easeOut',
  disabled: true, // Always disabled for new design
})
```

