# Card Styling Pattern - Light Theme Modernization

## Overview

This document defines the modernized card styling pattern for the Light Theme. The pattern provides a consistent, contemporary appearance across all card components with enhanced visual separation, depth, and interactivity.

## Modernized Card Pattern

### Base Pattern

```tsx
className="p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200"
```

### Pattern Breakdown

| Class | Purpose | Value |
|-------|---------|-------|
| `p-6` | Internal padding | 1.5rem (24px) all sides |
| `rounded-xl` | Border radius | 0.75rem (12px) - modern, soft corners |
| `border-2` | Border width | 2px - enhanced visibility |
| `border-card-border` | Border color | Uses CSS variable `--card-border` (HSL: 220 15% 88%) |
| `bg-card` | Background | Uses CSS variable `--card` (HSL: 0 0% 100%) |
| `shadow-sm` | Base shadow | Subtle depth in default state |
| `hover:shadow-md` | Hover shadow | Enhanced depth on interaction |
| `transition-all` | Transition property | Smooth animation for all properties |
| `duration-200` | Transition duration | 200ms - quick, responsive feel |

## CSS Variables

The pattern uses the following CSS variables defined in `app/globals.css`:

```css
:root {
  --card: 0 0% 100%;              /* Pure white background */
  --card-border: 220 15% 88%;     /* Soft blue-gray border */
  --card-foreground: 220 20% 15%; /* Text color for card content */
}
```

## Key Improvements Over Previous Pattern

### Previous Pattern
```tsx
className="p-6 rounded-lg border border-border bg-card"
```

### Changes Made

1. **Border Radius**: `rounded-lg` (8px) → `rounded-xl` (12px)
   - More modern, aligns with current design trends
   - Softer, more approachable aesthetic

2. **Border Width**: `border` (1px) → `border-2` (2px)
   - Better visibility on high-DPI displays
   - Improved visual separation between cards
   - Enhanced accessibility for users with low vision

3. **Border Color**: `border-border` → `border-card-border`
   - Dedicated card border color for better control
   - Softer, more visible in light theme

4. **Shadow**: Added `shadow-sm` base state
   - Creates subtle depth and elevation
   - Helps distinguish cards from background
   - Provides visual hierarchy

5. **Hover State**: Added `hover:shadow-md`
   - Interactive feedback for clickable cards
   - Smooth elevation change on hover
   - Enhances perceived interactivity

6. **Transitions**: Added `transition-all duration-200`
   - Smooth animations for all property changes
   - 200ms duration for responsive feel
   - Applies to shadows, borders, and transforms

## Usage Guidelines

### Standard Card (Non-Interactive)

For cards that are purely informational and not clickable:

```tsx
<div className="p-6 rounded-xl border-2 border-card-border bg-card shadow-sm transition-all duration-200">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</div>
```

### Interactive Card (Clickable/Hoverable)

For cards that are clickable or have hover interactions:

```tsx
<Link
  href="/destination"
  className="group p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200"
>
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</Link>
```

### Card with Enhanced Hover Effects

For cards that need additional hover effects (e.g., border color change):

```tsx
<Link
  href="/destination"
  className="group p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200"
>
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</Link>
```

### Card Grid Layout

When displaying multiple cards in a grid, use increased spacing:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Card components */}
</div>
```

**Note**: Gap increased from `gap-6` (1.5rem) to `gap-8` (2rem) for better visual separation.

## Component-Specific Patterns

### Feature Cards

Feature cards may include additional styling for icons, gradients, or special effects:

```tsx
<div className="p-6 rounded-xl border-2 border-card-border/60 bg-card shadow-sm hover:shadow-md transition-all duration-200">
  {/* Icon or visual element */}
  <div className="mb-4">
    <Icon className="w-12 h-12 text-primary" />
  </div>
  
  {/* Content */}
  <h3 className="text-xl font-semibold mb-2">Feature Title</h3>
  <p className="text-muted-foreground">Feature description</p>
</div>
```

**Note**: Border opacity reduced to `border-card-border/60` for glassmorphism effects.

### Resource/Tool Cards

Cards linking to resources or tools with enhanced hover states:

```tsx
<Link
  href="/tool"
  className="group p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
>
  <div className="space-y-3">
    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
      Tool Name
    </h3>
    <p className="text-muted-foreground">Tool description</p>
  </div>
</Link>
```

### Content Cards (Blog, Guides)

Larger cards for content with more padding:

```tsx
<Link
  href="/content"
  className="group p-8 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
>
  <div className="space-y-4">
    <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
      Content Title
    </h3>
    <p className="text-muted-foreground">Content description or excerpt</p>
  </div>
</Link>
```

**Note**: Padding increased to `p-8` for larger content cards.

## Accessibility Considerations

### Contrast Requirements

The card pattern meets WCAG AA standards:

- **Card background to page background**: Sufficient contrast for visual separation
- **Card border**: Visible to users with low vision (2px width, soft color)
- **Text on card background**: High contrast ratio (4.5:1 minimum)

### Hover States

Hover effects include multiple visual changes for accessibility:

1. **Shadow change**: Perceivable without color vision
2. **Border color change** (optional): Additional visual feedback
3. **Smooth transitions**: Helps users track state changes

### Keyboard Navigation

For interactive cards:

- Ensure proper focus states are visible
- Use semantic HTML (`<Link>`, `<button>`)
- Maintain logical tab order

## Dark Theme Compatibility

The pattern uses CSS variables that automatically adapt to dark theme:

```css
.dark {
  --card: 270 15% 12%;              /* Dark background */
  --card-foreground: 0 0% 98%;      /* Light text */
  /* Note: --card-border not defined in dark theme, falls back to --border */
}
```

**Important**: When implementing dark theme card borders, add `--card-border` to `.dark` scope in `app/globals.css`.

## Migration Guide

### Updating Existing Cards

To update existing cards to the new pattern:

1. **Find**: `rounded-lg border border-border`
2. **Replace with**: `rounded-xl border-2 border-card-border`
3. **Add**: `shadow-sm hover:shadow-md transition-all duration-200`

### Example Migration

**Before**:
```tsx
<div className="p-6 rounded-lg border border-border bg-card">
```

**After**:
```tsx
<div className="p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
```

### Batch Update Locations

Cards need to be updated in the following locations:

- `app/resources/page.tsx` - Tool and resource cards
- `app/digital-marketing-services/page.tsx` - Service feature cards
- `app/company/page.tsx` - Company section cards
- `components/feature-card.tsx` - Feature card component
- `components/get-started/case-study-card.tsx` - Case study cards
- `components/get-started/client-review-card.tsx` - Review cards
- `components/content-section.tsx` - Content section cards
- `components/content-section.example.tsx` - Example cards
- `components/industries-grid.tsx` - Industry cards
- `components/landing-page-layout.example.tsx` - Example layout cards
- `components/hibu-one/` - Hibu One related cards

## Testing Checklist

When implementing the card pattern:

- [ ] Visual appearance matches design specifications
- [ ] Border is clearly visible in light theme
- [ ] Shadow provides subtle depth without being heavy
- [ ] Hover states transition smoothly (200ms)
- [ ] Pattern is consistent across all card instances
- [ ] Grid spacing uses `gap-8` for proper separation
- [ ] Dark theme cards render correctly (if applicable)
- [ ] Keyboard focus states are visible
- [ ] Screen readers announce cards correctly
- [ ] Touch targets are adequate on mobile (minimum 44x44px)

## Performance Considerations

### CSS Optimization

- Use Tailwind's utility classes for optimal CSS bundle size
- Transitions are GPU-accelerated (shadow, transform)
- CSS variables enable efficient theme switching

### Animation Performance

- `transition-all` is acceptable for cards (limited properties change)
- 200ms duration is fast enough to feel responsive
- Shadows use `box-shadow` which is GPU-accelerated

## Related Documentation

- [Light Theme Modernization Spec](.kiro/specs/light-theme-modernization/)
- [Design Document](.kiro/specs/light-theme-modernization/design.md)
- [Requirements Document](.kiro/specs/light-theme-modernization/requirements.md)
- [Responsive Design Guide](RESPONSIVE_DESIGN.md)
- [Animation Enhancements](ANIMATION_ENHANCEMENTS.md)

## Questions or Issues?

If you encounter issues with the card pattern or need clarification:

1. Check the design document for detailed specifications
2. Review existing implementations in the codebase
3. Verify CSS variables are defined correctly in `app/globals.css`
4. Test in both light and dark themes
5. Consult the accessibility verification script: `scripts/verify-accessibility.ts`

---

**Last Updated**: Light Theme Modernization - Task 6
**Pattern Version**: 1.0
**Status**: Active
