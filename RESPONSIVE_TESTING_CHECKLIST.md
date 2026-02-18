# Responsive Design Testing Checklist

## Quick Test Devices & Screen Sizes

### Mobile Devices
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 12 Pro Max (430px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] Pixel 6 (412px)
- [ ] Generic small phone (320px)

### Tablets
- [ ] iPad (768px, portrait)
- [ ] iPad (1024px, landscape)
- [ ] iPad Pro 11" (834px, portrait)
- [ ] iPad Pro 12.9" (1024px, portrait)
- [ ] Generic tablet (600-800px)

### Laptops & Desktops
- [ ] MacBook Air 13" (1440px)
- [ ] MacBook Pro 16" (1728px)
- [ ] Desktop 1920×1080
- [ ] Ultra-wide monitor (2560px+)
- [ ] Small laptop (1280px)

## Component Testing Matrix

### 1. Rating Bar
**Mobile (< 640px)**
- [ ] Layout stacks vertically
- [ ] "Request a demo" button is accessible
- [ ] Phone number appears below rating
- [ ] Text abbreviated correctly
- [ ] No horizontal scrolling
- [ ] Touch target size adequate (44px+)
- [ ] Icons scale properly

**Tablet (640px - 1024px)**
- [ ] Layout becomes horizontal
- [ ] All text fully visible
- [ ] Spacing looks balanced

**Desktop (1024px+)**
- [ ] Phone number visible inline
- [ ] Full rating text displays
- [ ] Proper spacing maintained

### 2. Navbar
**Mobile (< 768px)**
- [ ] Hamburger menu appears
- [ ] Menu toggles on click
- [ ] Mobile menu slides in/out smoothly
- [ ] Theme toggle is visible
- [ ] Menu items are readable
- [ ] Dropdown items indent properly
- [ ] Menu closes when item selected
- [ ] No overlap with rating bar
- [ ] Touch targets are 44px+

**Tablet (768px - 1024px)**
- [ ] Hamburger menu still present
- [ ] Menu smoothly transforms

**Desktop (≥ 1024px)**
- [ ] Horizontal menu displayed
- [ ] Dropdown menus appear on hover
- [ ] Underline animation works
- [ ] "Client Support & Login" dropdown works
- [ ] No overlapping elements
- [ ] Smooth transitions on hover

### 3. Hero Section
**Mobile (< 640px)**
- [ ] Single column layout
- [ ] Content flows top to bottom
- [ ] Heading readable (text-3xl)
- [ ] Video card properly sized
- [ ] CTA buttons stack vertically
- [ ] "Learn More" short text used
- [ ] No text cut off
- [ ] Padding scales properly
- [ ] Background gradient displays
- [ ] No horizontal scrolling

**Tablet (640px - 768px)**
- [ ] Text scales up smoothly
- [ ] Layout remains single column
- [ ] Heading size increases (text-4xl)

**Desktop (≥ 1024px)**
- [ ] Two-column grid displays
- [ ] Content on left, video on right
- [ ] Proper column gap (gap-12)
- [ ] Heading large and readable (text-5xl+)
- [ ] CTA buttons display horizontally
- [ ] Full button text visible
- [ ] Animations trigger on scroll/load

### 4. Video Preview Card
**Mobile (< 640px)**
- [ ] No offset accent layer (hidden)
- [ ] Card properly rounded (rounded-xl)
- [ ] Padding comfortable (p-6)
- [ ] Play button accessible
- [ ] Review cards readable
- [ ] Text doesn't overflow (line-clamp-2)
- [ ] Card fits in viewport
- [ ] Hover effects work

**Tablet (640px+)**
- [ ] Accent layer becomes visible
- [ ] Larger corner radius (rounded-2xl)
- [ ] Padding increases (p-8+)
- [ ] Play button larger
- [ ] All content readable

**Desktop (≥ 1024px)**
- [ ] Full parallax effect on accent layer
- [ ] Maximum padding applied
- [ ] All animations smooth
- [ ] Shadow effects prominent

### 5. CTA Buttons
**Mobile (< 640px)**
- [ ] Full width stacked layout
- [ ] Small padding appropriate
- [ ] Short text visible
- [ ] Icon shows next to text
- [ ] Arrow animation works
- [ ] Active state visible on tap
- [ ] Touch target 44px+

**Tablet (640px+)**
- [ ] Buttons side-by-side
- [ ] Text expands to full version
- [ ] Padding increases
- [ ] Hover effects work
- [ ] Icon animation smooth
- [ ] Scale transform on hover

## Specific Responsive Features to Test

### Font Scaling
- [ ] Heading text readable at all sizes (no zooming needed)
- [ ] Body text minimum 14px at all sizes
- [ ] CTA button text 12px+ at all sizes
- [ ] Line-height proper (1.4-1.6 for body)

### Touch Interactions
- [ ] All buttons have active states
- [ ] No "ghost" hover effects on mobile
- [ ] Double-tap to zoom works (if intentional)
- [ ] Tap response is immediate (< 100ms)
- [ ] No 300ms tap delays on iOS

### Animations & Performance
- [ ] Animations disabled for `prefers-reduced-motion`
- [ ] Fade-in animations on mobile (0.4s)
- [ ] Hover animations on desktop
- [ ] Play button pulse animation smooth
- [ ] No jank or frame drops at 60fps

### Spacing & Alignment
- [ ] No text running into edges (padding: px-4 minimum)
- [ ] Elements properly centered
- [ ] Gap between elements consistent
- [ ] Section padding scales (py-8 to py-28)

### Color & Contrast
- [ ] Text contrast meets WCAG AA standard (4.5:1)
- [ ] Light mode colors appropriate
- [ ] Dark mode colors readable
- [ ] Hover states have sufficient contrast
- [ ] Focus states visible

### Overflow & Scrolling
- [ ] No horizontal scrolling on mobile
- [ ] No cut-off text or images
- [ ] Overflow hidden properly applied
- [ ] Scroll behavior smooth
- [ ] Mobile menu scrollable if too tall

## Browser Testing

### Chrome/Edge
- [ ] Mobile view (DevTools)
- [ ] Responsive design mode
- [ ] Different device emulations
- [ ] Touch emulation enabled

### Firefox
- [ ] Responsive design mode
- [ ] Mobile view testing
- [ ] Dark mode support
- [ ] Zoom levels (75%, 100%, 125%, 150%)

### Safari
- [ ] iOS Safari (iPhone)
- [ ] iPadOS Safari (iPad)
- [ ] macOS Safari
- [ ] Dark mode switching

## Performance Testing

### Mobile
- [ ] Page load time < 3s (3G)
- [ ] First contentful paint < 1s
- [ ] Time to interactive < 3s
- [ ] No layout shifts (CLS < 0.1)

### Desktop
- [ ] Page load time < 2s
- [ ] Smooth animations (60fps)
- [ ] No jank during scrolling

## Accessibility Testing

### Screen Readers
- [ ] Navbar menu items readable
- [ ] Button labels clear
- [ ] Image alt text present
- [ ] ARIA labels appropriate

### Keyboard Navigation
- [ ] Tab order logical
- [ ] Focus states visible
- [ ] All interactive elements accessible
- [ ] No keyboard traps

### Color Contrast
- [ ] Text on background: 4.5:1
- [ ] Large text: 3:1
- [ ] Icon-only buttons have sufficient color contrast

## OS-Specific Testing

### iOS
- [ ] Safe area padding applied
- [ ] Notch/dynamic island doesn't cover content
- [ ] Dark mode colors correct
- [ ] Touch interaction smooth
- [ ] Status bar color matches theme

### Android
- [ ] Navigation bar doesn't overlap
- [ ] System font scaling respected
- [ ] Touch feedback visible
- [ ] Back button works properly

## Final Sign-Off

- [ ] All breakpoints tested and working
- [ ] Mobile-first approach validated
- [ ] No horizontal scrolling on any device
- [ ] Touch interactions responsive
- [ ] Animations performant
- [ ] Accessibility standards met
- [ ] Cross-browser compatible
- [ ] No console errors or warnings
- [ ] Ready for production deployment

---

## Quick Mobile Check (2-5 minutes)

1. Open on actual iPhone/Android device
2. Scroll from top to bottom
3. Test hamburger menu
4. Test theme toggle
5. Tap both CTA buttons
6. Check for horizontal scrolling
7. Verify text is readable without zoom
8. Test portrait and landscape orientation
9. Verify no elements are cut off

## Quick Desktop Check (2-5 minutes)

1. Open in Chrome DevTools
2. Test at 1920×1080
3. Hover over menu items
4. Hover over buttons
5. Check dropdown menus
6. Verify two-column layout
7. Test animations are smooth
8. Check theme toggle dark/light
