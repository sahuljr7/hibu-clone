# DashboardShowcase Component

## Overview

The `DashboardShowcase` component displays the all-in-one dashboard section with a large purple media card. It features fade-in and slide-up animations, rounded corners, and shadow effects.

## Features

- Large purple gradient media card
- Fade-in and slide-up animations
- Rounded corners (rounded-3xl)
- Shadow effect (shadow-2xl)
- Subtle hover effect (scale 1.02)
- Lazy loading for images
- Respects prefers-reduced-motion accessibility preference
- Fully responsive design
- Semantic HTML structure with ARIA labels

## Props

```typescript
interface DashboardShowcaseProps {
  heading: string        // Main section heading
  description: string    // Section description text
  dashboardUrl: string   // URL/path to dashboard image
}
```

## Usage

```tsx
import { DashboardShowcase } from '@/components/hibu-one/dashboard-showcase'

export default function Page() {
  return (
    <DashboardShowcase
      heading="All Your Data in One Dashboard"
      description="Get a complete view of your marketing performance with our intuitive, all-in-one dashboard."
      dashboardUrl="/images/hibu-one/dashboard-main.jpg"
    />
  )
}
```

## Styling

- **Background**: White (`bg-white`)
- **Media Card**: Purple gradient (`from-purple-500 to-purple-700`)
- **Corners**: Rounded 3xl (`rounded-3xl`)
- **Shadow**: Extra large shadow (`shadow-2xl`)
- **Layout**: Centered content with max-width container

## Animations

- **Heading**: Fade-in + slide-up (0.6s duration)
- **Description**: Fade-in with 0.2s delay
- **Media Card**: Fade-in + slide-up with 0.3s delay
- **Hover Effect**: Subtle scale to 1.02 (disabled with reduced motion)
- **Easing**: Cubic-bezier (0.4, 0, 0.2, 1)

## Accessibility

- Uses semantic HTML (`<section>`, `<h2>`)
- Includes ARIA labels (`aria-labelledby`)
- Respects `prefers-reduced-motion` user preference
- Descriptive alt text for images
- Proper heading hierarchy

## Requirements

Validates the following requirements:
- **2.7**: All-in-one Dashboard section display
- **9.2**: Large cards with rounded corners
- **9.3**: Purple gradient on Media_Card components

## Related Components

- `AdCampaignsSection` - Similar purple media card pattern
- `HibuOneFeaturePanel` - Similar panel layout with different styling
- `OrganicMarketingSection` - Similar section structure
