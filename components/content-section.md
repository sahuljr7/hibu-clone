# ContentSection Component

A reusable content section component with scroll-triggered reveal animations, badge support, and multiple visual variants.

## Features

- **Scroll-triggered animations**: Content reveals smoothly as users scroll using Intersection Observer + Framer Motion
- **Badge support**: Optional badge label for section categorization
- **Multiple variants**: Default, featured, and dark styles
- **Responsive design**: Adapts to mobile, tablet, and desktop breakpoints
- **Flexible content**: Accepts any React children for maximum flexibility

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | The main heading for the section |
| `badge` | `string` | Optional | A small label displayed above the title |
| `children` | `React.ReactNode` | Required | The content to display in the section |
| `variant` | `'default' \| 'featured' \| 'dark'` | `'default'` | Visual style variant |
| `className` | `string` | Optional | Additional CSS classes to apply |

## Variants

### Default
- Standard background color
- Best for general content sections

### Featured
- Subtle accent background (`bg-accent/5`)
- Use for highlighted or important content

### Dark
- Darker background (`bg-foreground/5`)
- Ideal for testimonials, success stories, or contrast sections

## Animation Behavior

The component uses the `useInView` hook with:
- **Threshold**: 0.2 (triggers when 20% of section is visible)
- **Margin**: -50px (triggers slightly before entering viewport)
- **Once**: true (animation plays only once)

Animation sequence:
1. Badge fades in and scales up (delay: 0.1s)
2. Title fades in and slides up (delay: 0.2s)
3. Content fades in (delay: 0.3s)

## Usage Examples

### Basic Usage
```tsx
<ContentSection title="Our Services" badge="What We Offer">
  <p>Your content here</p>
</ContentSection>
```

### With Grid Layout
```tsx
<ContentSection title="Features" badge="Why Choose Us" variant="featured">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <FeatureCard title="Fast" />
    <FeatureCard title="Reliable" />
    <FeatureCard title="Secure" />
  </div>
</ContentSection>
```

### Dark Variant for Testimonials
```tsx
<ContentSection title="Success Stories" badge="Client Reviews" variant="dark">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ReviewCard />
    <ReviewCard />
  </div>
</ContentSection>
```

## Responsive Behavior

The component automatically adjusts spacing at different breakpoints:
- **Mobile** (< 640px): py-12, smaller text
- **Tablet** (640px - 1024px): py-16, medium text
- **Desktop** (> 1024px): py-24, larger text

## Accessibility

- Uses semantic HTML (`<section>` element)
- Proper heading hierarchy (h2 for title)
- Respects `prefers-reduced-motion` (handled by Framer Motion)

## Performance

- Uses Intersection Observer for efficient scroll detection
- Animations only trigger when section enters viewport
- Once-only animation prevents unnecessary re-renders

## Related Components

- `LandingHeroSection`: Hero section for landing pages
- `LandingPageLayout`: Base layout wrapper for landing pages

## Validates Requirements

- **6.5**: Organize content in clean grid or flex layouts
- **7.2**: Apply scroll-triggered reveal animations
