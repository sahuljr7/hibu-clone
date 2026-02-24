# LandingHeroSection Component

A reusable hero section component for landing pages with Framer Motion animations.

## Features

- ✅ Reusable with customizable props
- ✅ Gradient background support
- ✅ Framer Motion fade-in animation on mount
- ✅ Responsive typography and spacing
- ✅ TypeScript support with full type safety
- ✅ Accessible and semantic HTML

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Main heading text |
| `subtitle` | `string` | No | - | Optional subtitle displayed above title |
| `description` | `string` | Yes | - | Description text below title |
| `backgroundGradient` | `string` | No | `'from-accent/5 via-background to-primary/5'` | Tailwind gradient classes |

## Usage

```tsx
import { LandingHeroSection } from '@/components/landing-hero-section'

export default function MyLandingPage() {
  return (
    <LandingHeroSection
      subtitle="Welcome"
      title="Your Amazing Product"
      description="Discover how our solution can transform your business."
      backgroundGradient="from-blue-50/50 via-background to-purple-50/50"
    />
  )
}
```

## Responsive Behavior

- **Mobile (< 640px)**: Single column, smaller text sizes
- **Tablet (640px - 1024px)**: Medium text sizes, increased spacing
- **Desktop (> 1024px)**: Large text sizes, maximum spacing

## Animation Details

The component uses Framer Motion with staggered animations:
1. Subtitle fades in (delay: 0.1s)
2. Title fades in (delay: 0.2s)
3. Description fades in (delay: 0.3s)

All animations use a 0.6s duration with easeOut easing.

## Accessibility

- Uses semantic HTML (`<section>`, `<h1>`, `<p>`)
- Proper heading hierarchy (h1 for title)
- Text contrast meets WCAG AA standards
- Responsive text sizing for readability

## Validates Requirements

- **6.1**: Hero section at top with clear page title and description
- **7.1**: Smooth fade-in animation on page load
