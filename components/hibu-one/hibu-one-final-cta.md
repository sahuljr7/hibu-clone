# HibuOneFinalCTA Component

## Overview

The `HibuOneFinalCTA` component is a conversion-focused section designed for the bottom of the Hibu One landing page. It features a dark navy background with white text and a prominent call-to-action button, creating high contrast to drive user engagement.

## Features

- **Dark Navy Background**: Uses `bg-slate-900` for strong visual contrast
- **Centered Layout**: All content is centered for maximum impact
- **White Text**: High contrast text for readability on dark background
- **Animated Entrance**: Fade-in and scale animations for heading, description, and CTA
- **Accessibility**: Respects `prefers-reduced-motion` preference
- **Keyboard Navigation**: Fully accessible with visible focus indicators
- **Responsive Design**: Adapts to all screen sizes with responsive typography and spacing

## Props

```typescript
interface HibuOneFinalCTAProps {
  heading: string        // Main heading text
  description: string    // Supporting description text
  ctaText: string       // Text for the CTA button
  ctaHref: string       // Link destination for the CTA
}
```

## Usage

```tsx
import { HibuOneFinalCTA } from '@/components/hibu-one/hibu-one-final-cta'

export default function Page() {
  return (
    <HibuOneFinalCTA
      heading="Ready to Simplify Your Marketing?"
      description="Join thousands of businesses that trust Hibu One to manage their digital marketing."
      ctaText="Start Your Free Trial"
      ctaHref="/signup"
    />
  )
}
```

## Styling

### Background
- Dark navy: `bg-slate-900`
- Creates high contrast with white text

### Typography
- Heading: White text with responsive sizing (3xl → 6xl)
- Description: Light slate (`text-slate-300`) for softer contrast
- Font: Uses `font-display` for heading

### CTA Button
- Primary brand color background
- White text
- Rounded corners (`rounded-lg`)
- Hover effect: Slightly darker background
- Focus ring: Primary color with offset for dark background

### Spacing
- Responsive padding: `py-16 sm:py-20 md:py-24 lg:py-32`
- Content spacing: `space-y-8`
- Max width: `max-w-4xl` for optimal readability

## Animations

### Timing
- Duration: 0.6s (or 0.1s with reduced motion)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Sequence
1. **Heading** (0ms delay): Fade-in + slide-up
2. **Description** (200ms delay): Fade-in
3. **CTA Button** (300ms delay): Fade-in + scale (0.95 → 1)

### Reduced Motion
When `prefers-reduced-motion` is enabled:
- Animations are reduced to 0.1s duration
- All delays are removed
- Scale and slide effects are disabled

## Accessibility

### Semantic HTML
- Uses `<section>` element with proper ARIA labeling
- `aria-labelledby` connects to heading ID
- Proper heading hierarchy with `<h2>`

### Keyboard Navigation
- CTA button is fully keyboard accessible
- Visible focus indicators with ring and offset
- Logical tab order

### Color Contrast
- White text on dark navy: Exceeds WCAG AA standards
- Light slate description: Meets WCAG AA for large text
- Focus ring: High contrast against dark background

## Requirements

Validates the following requirements:
- **2.8**: Final CTA section displays content on dark navy background with centered CTA
- **9.6**: Dark navy cards with white text for contrast sections

## Design Properties

Supports the following design properties:
- **Property 1**: Section Animation Consistency (fade-in + slide-up with correct timing)
- **Property 3**: Motion Preference Respect (respects prefers-reduced-motion)
- **Property 13**: Keyboard Navigation Accessibility (fully keyboard accessible)
- **Property 19**: Contrast Section Styling (dark navy with white text)

## Browser Support

Works in all modern browsers that support:
- CSS Grid
- Flexbox
- CSS Custom Properties
- Intersection Observer API
- matchMedia API (for reduced motion detection)

## Performance

- Lightweight component with minimal JavaScript
- Uses hardware-accelerated CSS transforms
- Lazy loads animations only when section enters viewport
- No external dependencies beyond Framer Motion (already in project)
