# PageTransition Component

## Overview

The `PageTransition` component provides consistent page entry and exit animations for route transitions. It wraps page content and applies smooth fade-in and slide-up animations using Framer Motion.

## Features

- **Fade-in animation**: Opacity transitions from 0 to 1
- **Slide-up animation**: Vertical translation from 20px to 0
- **Accessibility**: Respects user's `prefers-reduced-motion` setting
- **Smooth easing**: Uses cubic-bezier(0.4, 0, 0.2, 1) for natural motion
- **Configurable duration**: 0.6s for normal motion, 0.1s for reduced motion

## Usage

### Basic Usage

```tsx
import { PageTransition } from '@/components/shared/page-transition'

export default function MyPage() {
  return (
    <PageTransition>
      <div className="container">
        <h1>Page Content</h1>
        <p>This content will animate on page load</p>
      </div>
    </PageTransition>
  )
}
```

### With Next.js App Router

```tsx
// app/my-page/page.tsx
import { PageTransition } from '@/components/shared/page-transition'

export default function Page() {
  return (
    <PageTransition>
      <main className="min-h-screen">
        {/* Your page content */}
      </main>
    </PageTransition>
  )
}
```

### With Multiple Sections

```tsx
import { PageTransition } from '@/components/shared/page-transition'

export default function LandingPage() {
  return (
    <PageTransition>
      <>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </>
    </PageTransition>
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Content to be animated |

## Animation Specifications

### Normal Motion

- **Initial state**: `opacity: 0, translateY: 20px`
- **Animated state**: `opacity: 1, translateY: 0`
- **Exit state**: `opacity: 0, translateY: -20px`
- **Duration**: 0.6 seconds
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)

### Reduced Motion

When user has `prefers-reduced-motion: reduce` enabled:

- **Initial state**: `opacity: 1, translateY: 0` (no animation)
- **Animated state**: `opacity: 1, translateY: 0`
- **Exit state**: `opacity: 1, translateY: 0`
- **Duration**: 0.1 seconds (minimal)

## Accessibility

The component automatically detects and respects the user's motion preferences:

- Uses the `useReducedMotion` hook to check `prefers-reduced-motion` media query
- Disables animations when user prefers reduced motion
- Maintains functionality while respecting accessibility needs

## Requirements Validation

This component validates the following requirements:

- **Requirement 1.3**: Page transition with fade and upward motion
- **Requirement 3.4**: Animation timing between 0.6 and 0.9 seconds
- **Requirement 3.5**: Cubic-bezier easing functions
- **Requirement 3.7**: Respect prefers-reduced-motion setting

## Technical Details

### Dependencies

- `framer-motion`: Animation library
- `@/hooks/use-reduced-motion`: Custom hook for motion preference detection

### Client Component

This is a client component (uses `'use client'` directive) because it:
- Uses React hooks (`useReducedMotion`)
- Integrates with Framer Motion animations
- Responds to browser media queries

## Testing

Unit tests are available in `page-transition.test.tsx`:

```bash
npm test page-transition.test.tsx
```

Tests cover:
- Component rendering
- Children rendering
- Reduced motion preference handling
- Motion wrapper application

## Performance

The component uses hardware-accelerated CSS transforms:
- `opacity` changes (GPU-accelerated)
- `translateY` transforms (GPU-accelerated)
- No layout-triggering properties

This ensures smooth 60fps animations without blocking the main thread.
