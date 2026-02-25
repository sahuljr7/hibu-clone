# SectionDivider Component

## Overview

The `SectionDivider` component provides animated visual separators between major sections of a page. It supports three distinct visual variants and automatically triggers animations when scrolling into view.

## Features

- **Three Variants**: Line, gradient, and wave styles
- **Scroll-triggered Animation**: Uses Intersection Observer to animate on scroll
- **Accessibility**: Respects `prefers-reduced-motion` user preference
- **Performance**: Hardware-accelerated animations with Framer Motion
- **Responsive**: Works across all screen sizes

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'line' \| 'gradient' \| 'wave'` | `'line'` | Visual style of the divider |

## Variants

### Line
A simple horizontal line that expands from the center. Uses a subtle gradient from transparent to gray.

```tsx
<SectionDivider variant="line" />
```

**Animation**: Width expands from 0 to 100% (max 600px)

### Gradient
A colorful gradient bar that fades in and scales. Uses purple and pink brand colors.

```tsx
<SectionDivider variant="gradient" />
```

**Animation**: Fades in and scales horizontally from center

### Wave
An SVG wave pattern that draws itself on scroll.

```tsx
<SectionDivider variant="wave" />
```

**Animation**: Path draws from 0% to 100% length

## Usage Examples

### Basic Usage
```tsx
import { SectionDivider } from '@/components/shared/section-divider'

export default function MyPage() {
  return (
    <>
      <section>First Section</section>
      <SectionDivider />
      <section>Second Section</section>
    </>
  )
}
```

### With Different Variants
```tsx
<section>Hero Section</section>
<SectionDivider variant="gradient" />

<section>Features Section</section>
<SectionDivider variant="wave" />

<section>CTA Section</section>
<SectionDivider variant="line" />
```

### In Hibu One Landing Page
```tsx
import { SectionDivider } from '@/components/shared/section-divider'

export default function HibuOnePage() {
  return (
    <main>
      <HeroSection />
      <SectionDivider variant="gradient" />
      
      <MarketingBenefits />
      <SectionDivider variant="line" />
      
      <FeaturePanel />
      <SectionDivider variant="wave" />
      
      <FinalCTA />
    </main>
  )
}
```

## Animation Behavior

### Default Animation
- **Duration**: 0.8 seconds
- **Easing**: easeOut (line/gradient), easeInOut (wave)
- **Trigger**: When 50% of the divider enters viewport
- **Repeat**: Once (does not re-animate on scroll up)

### Reduced Motion
When user has `prefers-reduced-motion` enabled:
- **Duration**: 0.1 seconds (nearly instant)
- **Animation**: Still present but minimal
- **Purpose**: Maintains visual feedback while respecting accessibility needs

## Styling

The component uses Tailwind CSS classes and can be customized by:

1. **Modifying the component**: Edit colors, sizes, or gradients directly
2. **Wrapper styling**: Add padding/margin via parent container
3. **Theme integration**: Colors automatically adapt to theme

### Current Styles

**Line Variant**:
- Height: 1px
- Max width: 600px
- Gradient: transparent → gray-300 → transparent

**Gradient Variant**:
- Height: 4px (h-1)
- Max width: 768px (max-w-3xl)
- Gradient: purple-500 → pink-500 → purple-500
- Border radius: Full (rounded-full)

**Wave Variant**:
- Height: 40px (h-10)
- Width: 100%
- Stroke: gray-300
- Stroke width: 2px

## Accessibility

- ✅ Respects `prefers-reduced-motion`
- ✅ Purely decorative (no semantic meaning)
- ✅ Does not interfere with screen readers
- ✅ No interactive elements requiring keyboard access

## Performance

- Uses hardware-accelerated CSS transforms
- Intersection Observer for efficient scroll detection
- Animation only triggers once per page load
- Minimal JavaScript overhead

## Browser Support

Works in all modern browsers that support:
- Intersection Observer API
- CSS transforms
- SVG (for wave variant)

## Related Components

- `PageTransition`: Page-level entry/exit animations
- `AnimatedContainer`: Generic scroll-triggered animations
- `ParallaxText`: Text with parallax effects

## Requirements Validation

This component validates the following requirements:
- **Requirement 5.2**: Display subtle divider animations between major sections
- **Requirement 3.6**: Use Intersection Observer API for scroll-based animations
- **Requirement 3.7**: Respect prefers-reduced-motion accessibility preference
- **Requirement 6.3**: Use hardware-accelerated transforms

## Design Properties

Validates **Property 8: Divider Animation Presence**
- For any major section separator, the system displays subtle divider animations when entering viewport
