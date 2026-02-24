# Image Optimization Guide

## Overview

This guide documents the image optimization strategy for the navigation restructure feature. Currently, the landing pages do not contain images, but this guide ensures that when images are added, they follow best practices for performance.

## Requirements

**Validates: Requirements 14.3, 14.5**

- Images must use lazy loading for content below the fold
- Images must use optimized formats (WebP with fallbacks)
- Images must use Next.js Image component for automatic optimization

## Implementation Guidelines

### 1. Using Next.js Image Component

Always use the Next.js `Image` component instead of standard `<img>` tags:

```tsx
import Image from 'next/image'

// Example usage
<Image
  src="/images/hero-image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy" // For images below the fold
  priority={false} // Set to true only for above-the-fold images
/>
```

### 2. Lazy Loading

For images below the fold (not immediately visible on page load):

```tsx
<Image
  src="/images/section-image.jpg"
  alt="Section image"
  width={600}
  height={400}
  loading="lazy" // Defers loading until image is near viewport
/>
```

For hero images or above-the-fold content:

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={true} // Preloads the image
/>
```

### 3. Image Formats

Next.js automatically serves WebP format when supported by the browser. To ensure this:

1. Store images in modern formats (WebP, AVIF) in the `public/images` directory
2. Next.js will automatically optimize and serve the best format
3. Fallback to JPEG/PNG is handled automatically

### 4. Responsive Images

Use the `sizes` prop to optimize for different screen sizes:

```tsx
<Image
  src="/images/responsive-image.jpg"
  alt="Responsive image"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
/>
```

### 5. Open Graph Images

The landing pages reference OG images in metadata:

```tsx
export const metadata = {
  ogImage: '/images/og-services.jpg',
}
```

Ensure these images:
- Are 1200x630px (recommended OG image size)
- Are optimized and compressed
- Exist in the `public/images` directory

## Current Status

✅ **Bundle Size Optimized**: Unused mega menu components removed
✅ **Next.js Prefetching Enabled**: Link components use default prefetch behavior
⚠️ **Images**: No images currently in use, but guidelines established for future implementation

## When Adding Images

1. Create a `public/images` directory if it doesn't exist
2. Add optimized images (WebP format preferred)
3. Use Next.js Image component with appropriate props
4. Set `loading="lazy"` for below-the-fold images
5. Set `priority={true}` only for critical above-the-fold images
6. Include descriptive alt text for accessibility

## Testing Image Optimization

When images are added, verify:

1. **Lazy Loading**: Check Network tab - images should load as you scroll
2. **Format**: Verify WebP format is served in supported browsers
3. **Performance**: Run Lighthouse audit - images should not impact LCP
4. **Accessibility**: Verify all images have meaningful alt text

## Next.js Image Configuration

The `next.config.mjs` can be extended with image optimization settings:

```javascript
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

## References

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [WCAG Image Alt Text Guidelines](https://www.w3.org/WAI/tutorials/images/)
