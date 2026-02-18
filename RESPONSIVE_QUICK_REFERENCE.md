# Responsive Design Quick Reference Card

## Breakpoint Sizes
```
xs:  320px   sm:  640px   md:  768px   lg:  1024px   xl:  1280px   2xl: 1536px
     Phone        Tablet      Tablet      Laptop       Large      Desktop
```

## Common Responsive Patterns

### Responsive Text Sizing
```jsx
// Small to large
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Heading
</h1>

// Body text
<p className="text-sm sm:text-base md:text-lg lg:text-xl">
  Body text
</p>
```

### Responsive Layout (Stacking)
```jsx
// Single column → Two columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

// Vertical → Horizontal buttons
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  <button>Button 1</button>
  <button>Button 2</button>
</div>
```

### Responsive Padding/Spacing
```jsx
// Container padding scales
<div className="px-4 sm:px-6 md:px-8 lg:px-10">Content</div>

// Section spacing
<section className="py-8 sm:py-12 md:py-20 lg:py-28">Content</section>

// Gap between items
<div className="gap-3 sm:gap-4 md:gap-6 lg:gap-8">Items</div>
```

### Responsive Visibility
```jsx
// Hide on mobile, show on desktop
<div className="hidden md:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="md:hidden">Mobile only</div>

// Show different text at different sizes
<span className="hidden sm:inline">Full text for tablet+</span>
<span className="sm:hidden">Short text for mobile</span>
```

### Touch-Friendly Button
```jsx
<button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground 
  hover:bg-primary/90 active:bg-primary/75 
  touch-manipulation transition-colors">
  Tap Me
</button>
```

### Responsive Navigation
```jsx
// Desktop: horizontal, Mobile: hidden
<nav className="hidden md:flex gap-8">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
</nav>

// Mobile: hamburger menu
<button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? '✕' : '☰'}
</button>
```

---

## Touch-Friendly Design Rules

### Button Sizes
```
Minimum tap target: 44×44px
Spacing between buttons: 8px+ gap
Mobile padding: p-2 or p-3 (8-12px)
Desktop padding: p-3 or p-4 (12-16px)
```

### Interactive Elements
```jsx
// Always add active state for touch
className="... active:scale-95 active:bg-opacity-80"

// Use touch-manipulation for all buttons
className="... touch-manipulation"

// Add sufficient padding around clickable areas
className="px-3 py-2 sm:px-4 sm:py-3 ..."
```

---

## Mobile-First CSS Pattern

❌ **Wrong** (Desktop-first)
```css
/* Desktop styles first */
h1 { font-size: 48px; }

/* Override for mobile */
@media (max-width: 640px) {
  h1 { font-size: 30px; }
}
```

✅ **Right** (Mobile-first)
```css
/* Mobile first */
h1 { font-size: 30px; }

/* Add to larger screens */
@media (min-width: 640px) {
  h1 { font-size: 48px; }
}
```

---

## Tailwind Mobile-First Classes

```
NO PREFIX = Mobile (smallest breakpoint)
sm:        = 640px and up
md:        = 768px and up
lg:        = 1024px and up
xl:        = 1280px and up
2xl:       = 1536px and up
```

**Always write classes mobile-first, then add breakpoint prefixes:**
```jsx
className="text-sm sm:text-base md:text-lg"
//        ↑     ↑        ↑        ↑
//      mobile  tablet   large   desktop
```

---

## Common Responsive Sizes

### Spacing
```
Mobile:  gap-2, gap-3, gap-4      (8px, 12px, 16px)
Tablet:  gap-4, gap-6, gap-8      (16px, 24px, 32px)
Desktop: gap-6, gap-8, gap-12     (24px, 32px, 48px)
```

### Padding
```
Mobile:  px-4, py-3              (16px)
Tablet:  px-6, py-4              (24px)
Desktop: px-8, py-6              (32px)
```

### Font Sizes
```
Mobile:  text-2xl, text-3xl          (24px, 30px)
Tablet:  text-3xl, text-4xl          (30px, 36px)
Desktop: text-4xl, text-5xl, text-6xl (36px, 48px, 60px)
```

---

## Testing on Different Devices

### DevTools Responsive Mode
```
Chrome: Ctrl+Shift+M (Win) / Cmd+Shift+M (Mac)
Firefox: Ctrl+Shift+M (Win) / Cmd+Shift+M (Mac)
Safari: Develop → Enter Responsive Design Mode
```

### Common Device Sizes
```
iPhone SE:        375px
iPhone 12/13/14:  390px
iPhone 14 Pro Max: 430px
iPad (portrait):  768px
iPad (landscape): 1024px
MacBook 13":      1440px
Desktop 1920×1080: 1920px
```

### Quick Test Command
```bash
# In DevTools, test at these widths:
320px, 375px, 640px, 768px, 1024px, 1440px, 1920px
```

---

## Color & Theme Classes

### Light Mode (Default)
```
bg-background    = Light gray background
text-foreground  = Dark text
bg-primary       = Deep purple (#5B3FB5)
text-primary     = Purple text
bg-accent        = Bright teal (#20C997)
```

### Dark Mode (Add `dark:` prefix)
```
dark:bg-background   = Dark purple background
dark:text-foreground = Light text
dark:bg-primary      = Light purple button
```

### Using Theme Colors
```jsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground hover:bg-primary/90">
    Click me
  </button>
</div>
```

---

## Animation Classes

### Available Animations
```
animate-fade-in        = Fade and slide up (0.6s)
animate-fade-in-up     = Fade and slide up (0.7s, delayed)
animate-slide-in-right = Slide in from right (0.6s)
animate-float          = Floating motion (3s, infinite)
animate-pulse-glow     = Pulsing glow effect (2s, infinite)
```

### Mobile Animation Performance
- Animations are 40% faster on mobile (0.4s vs 0.6s)
- Respects `prefers-reduced-motion: reduce` setting
- All animations are hardware-accelerated

---

## Accessibility Checklist

- [x] All buttons have labels or aria-label
- [x] Color contrast 4.5:1 minimum
- [x] Touch targets 44×44px minimum
- [x] Focus states visible
- [x] Keyboard navigation works
- [x] Dark mode supported
- [x] No motion required to use
- [x] Images have alt text
- [x] Links are underlined or otherwise distinguished

---

## Performance Tips

### Do's ✅
- Use responsive breakpoints to hide/show elements
- Use `flex` and `grid` for responsive layouts
- Use Tailwind utility classes (no custom CSS)
- Test performance on actual mobile devices
- Optimize images for mobile
- Lazy load images below the fold

### Don'ts ❌
- Don't use inline styles
- Don't write responsive CSS without breakpoints
- Don't forget touch-friendly sizes
- Don't test only on DevTools (test real devices!)
- Don't ignore performance metrics
- Don't use auto-generated images

---

## Useful Links

- [Tailwind Responsive](https://tailwindcss.com/docs/responsive-design)
- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Core Web Vitals](https://web.dev/vitals/)

---

## Emergency Fixes

### Horizontal Scrolling
```jsx
// Add to any component
className="overflow-x-hidden"

// Or globally in HTML
<html className="overflow-x-hidden">
```

### Text Too Large on Mobile
```jsx
// Reduce on mobile first
<h1 className="text-2xl sm:text-3xl md:text-4xl">
  Use smaller base size
</h1>
```

### Buttons Not Touch-Friendly
```jsx
// Ensure 44px minimum
<button className="px-4 py-3 sm:px-6 sm:py-4">
  Increase padding
</button>
```

### Menu Overlapping Content
```jsx
// Add z-index and sticky positioning
<nav className="sticky top-0 z-50 ...">
  Navigation content
</nav>
```

---

## Copy-Paste Template

```jsx
// Full responsive component template
export function MyComponent() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Desktop: 2 cols, Mobile: 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Column 1 */}
          <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Heading
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Description
            </p>
          </div>
          
          {/* Column 2 */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">Content</div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

**Remember**: Mobile-first, test on real devices, accessibility first! 🚀
