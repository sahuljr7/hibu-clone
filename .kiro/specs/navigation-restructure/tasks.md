# Implementation Plan: Navigation Restructure

## Overview

This implementation plan converts the navigation system from mega menu dropdowns to dedicated landing pages for Digital Marketing Services, Industries, Resources, and Company, while preserving the Client Support & Login dropdown. The approach follows an incremental strategy: refactor the navbar first, create landing pages with shared components, implement animations and responsive behavior, and finally add comprehensive testing.

## Tasks

- [x] 1. Refactor Navbar Component
  - [x] 1.1 Remove mega menu state and logic for converted items
    - Remove state variables: `showMegaMenu`, `showIndustriesMegaMenu`, `showResourcesMegaMenu`, `showCompanyMegaMenu`
    - Remove `onMouseEnter` and `onMouseLeave` handlers for converted navigation items
    - Remove conditional rendering of mega menu components (MegaMenu, IndustriesMegaMenu, ResourcesMegaMenu, CompanyMegaMenu)
    - _Requirements: 1.4, 2.4, 3.4, 4.4, 9.4, 13.2_

  - [x] 1.2 Convert navigation items to Next.js Links
    - Replace button elements with Next.js Link components for Digital Marketing Services, Industries, Resources, and Company
    - Remove ChevronDown icons from converted navigation items
    - Update styling to remove dropdown-specific classes and hover states
    - Maintain consistent spacing and alignment after removing dropdown indicators
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 9.1, 9.5_

  - [x] 1.3 Implement active page highlighting
    - Use Next.js usePathname hook to get current route
    - Apply active styling (text-primary and border-b-2) to navigation items matching current route
    - Ensure active highlighting works across all responsive breakpoints
    - Update active state when route changes
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 1.4 Update mobile menu for converted items
    - Convert Digital Marketing Services, Industries, Resources, and Company to direct links in mobile menu
    - Remove expandable dropdown behavior for converted items in mobile menu
    - Ensure mobile menu closes after navigation item tap
    - Maintain Client Support & Login as expandable dropdown in mobile menu
    - _Requirements: 11.3, 11.4, 11.6_

  - [ ]* 1.5 Write property test for navigation routing
    - **Property 1: Converted navigation items route to dedicated pages**
    - **Property 2: Navigation routing uses client-side transitions**
    - **Property 3: All navigation links point to valid routes**
    - **Validates: Requirements 1.1, 1.4, 2.1, 2.4, 3.1, 3.4, 4.1, 4.4, 9.2, 9.3**

  - [ ]* 1.6 Write unit tests for navbar refactoring
    - Test that converted items render as Link components without ChevronDown icons
    - Test that converted items have no dropdown styling classes
    - Test that mega menu components are not rendered
    - Test that navigation spacing is consistent
    - _Requirements: 1.2, 1.3, 2.2, 2.3, 3.2, 3.3, 4.2, 4.3, 9.5_

- [x] 2. Create Shared Landing Page Components
  - [x] 2.1 Create HeroSection component
    - Build reusable hero section with title, subtitle, and description props
    - Implement gradient background support
    - Add Framer Motion fade-in animation on mount
    - Ensure responsive typography and spacing
    - _Requirements: 6.1, 7.1_

  - [x] 2.2 Create ContentSection component
    - Build reusable content section with badge, title, and children props
    - Support variant prop for default, featured, and dark styles
    - Implement scroll-triggered reveal animations using Intersection Observer + Framer Motion
    - Ensure responsive grid layouts
    - _Requirements: 6.5, 7.2_

  - [x] 2.3 Create LandingPageLayout component
    - Build base layout wrapper with consistent structure
    - Include semantic HTML (header, main, section tags)
    - Implement proper heading hierarchy
    - Add SEO metadata support (title, description, Open Graph tags)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [ ]* 2.4 Write property tests for shared components
    - **Property 11: Scroll-triggered animations reveal content**
    - **Property 13: Typography hierarchy is consistent**
    - **Property 14: Heading hierarchy follows semantic order**
    - **Validates: Requirements 6.2, 7.2, 12.5**

  - [ ]* 2.5 Write unit tests for shared components
    - Test HeroSection renders with correct props and animations
    - Test ContentSection applies scroll animations
    - Test LandingPageLayout includes semantic HTML structure
    - _Requirements: 6.1, 6.5, 7.1, 7.2, 12.1_

- [x] 3. Checkpoint - Ensure navbar and shared components work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create Digital Marketing Services Landing Page
  - [x] 4.1 Create page route at app/digital-marketing-services/page.tsx
    - Set up page component with metadata export
    - Use LandingPageLayout wrapper
    - Add hero section with services overview
    - _Requirements: 1.1_

  - [x] 4.2 Implement service sections
    - Create Hibu One Platform section with badge and description
    - Create Ad Campaigns section with features
    - Create Organic Marketing section with SEO details
    - Create Platform Pricing section with CTA
    - Use ContentSection component for each section
    - _Requirements: 1.5_

  - [x] 4.3 Add responsive design and animations
    - Implement mobile stacked layout (< 768px)
    - Implement tablet balanced layout (768px - 1024px)
    - Implement desktop multi-column layout (> 1024px)
    - Add scroll-triggered animations to each section
    - Ensure no horizontal scrolling on mobile
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_

  - [ ]* 4.4 Write unit tests for Digital Marketing Services page
    - Test page renders all expected sections (Hibu One, Ad Campaigns, Organic Marketing, Platform Pricing)
    - Test responsive layouts at different breakpoints
    - Test metadata is correctly set
    - _Requirements: 1.5_

- [x] 5. Create Industries Landing Page
  - [x] 5.1 Create page route at app/industries/page.tsx
    - Set up page component with metadata export
    - Use LandingPageLayout wrapper
    - Add hero section with industries overview
    - _Requirements: 2.1_

  - [x] 5.2 Implement industry categories grid
    - Create data structure for all industry categories (Automotive, Pet Services, Professional Services, Medical, Home Services, Home Services - Exterior, Brands)
    - Render categories with badges and item lists
    - Implement 4-column desktop, 2-column tablet, 1-column mobile grid
    - Add hover effects to industry links
    - _Requirements: 2.5, 7.3_

  - [x] 5.3 Add responsive design and animations
    - Implement responsive grid layouts at all breakpoints
    - Add scroll-triggered animations to category sections
    - Ensure touch-friendly spacing on mobile
    - _Requirements: 8.1, 8.3, 8.6_

  - [ ]* 5.4 Write unit tests for Industries page
    - Test page renders all industry categories
    - Test grid layout adjusts at different breakpoints
    - Test hover effects on industry links
    - _Requirements: 2.5_

- [x] 6. Create Resources Landing Page
  - [x] 6.1 Create page route at app/resources/page.tsx
    - Set up page component with metadata export
    - Use LandingPageLayout wrapper
    - Add hero section with resources overview
    - _Requirements: 3.1_

  - [x] 6.2 Implement resource sections
    - Create Free Tools section with Marketing Quiz, Business Listings Scan, Digital Marketing Score, Social Advertising Calculator
    - Create Learn section with Hibu Blog and articles
    - Create Case Studies section with featured case study and CTA
    - Use ContentSection component with appropriate variants
    - _Requirements: 3.5, 3.6, 3.7_

  - [x] 6.3 Add responsive design and animations
    - Implement 3-column desktop, 2-column tablet, 1-column mobile layout
    - Add scroll-triggered animations to each section
    - Implement hover effects on resource cards
    - _Requirements: 7.3, 8.1, 8.3, 8.6_

  - [ ]* 6.4 Write unit tests for Resources page
    - Test page renders Free Tools, Learn, and Case Studies sections
    - Test all resource items are displayed
    - Test responsive layouts
    - _Requirements: 3.5, 3.6, 3.7_

- [x] 7. Create Company Landing Page
  - [x] 7.1 Create page route at app/company/page.tsx
    - Set up page component with metadata export
    - Use LandingPageLayout wrapper
    - Add hero section with company overview
    - _Requirements: 4.1_

  - [x] 7.2 Implement company sections
    - Create Who We Are section (About Us, Leadership)
    - Create Careers & Newsroom section
    - Create Contact Us section
    - Create Success Stories section (Client Reviews, Video Testimonials, Employee Reviews)
    - Use ContentSection component with dark variant for Success Stories
    - _Requirements: 4.5, 4.6, 4.7, 4.8_

  - [x] 7.3 Add responsive design and animations
    - Implement responsive grid layouts at all breakpoints
    - Add scroll-triggered animations to each section
    - Implement hover effects on company links
    - _Requirements: 7.3, 8.1, 8.3, 8.6_

  - [ ]* 7.4 Write unit tests for Company page
    - Test page renders all company sections
    - Test responsive layouts
    - Test Success Stories section uses dark variant
    - _Requirements: 4.5, 4.6, 4.7, 4.8_

- [x] 8. Checkpoint - Ensure all landing pages are functional
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement Client Support Dropdown Preservation
  - [x] 9.1 Verify Client Support dropdown functionality
    - Ensure dropdown opens on click
    - Ensure dropdown closes on outside click
    - Ensure ChevronDown icon rotates on open/close
    - Maintain smooth animations
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 9.2 Test dropdown across responsive breakpoints
    - Verify dropdown works correctly on desktop (> 1024px)
    - Verify dropdown works correctly on tablet (768px - 1024px)
    - Verify dropdown works correctly on mobile (< 768px)
    - Ensure proper z-index layering without overflow
    - _Requirements: 5.5, 5.6_

  - [ ]* 9.3 Write property tests for Client Support dropdown
    - **Property 4: Client Support dropdown toggles on interaction**
    - **Property 5: Dropdown closes on outside click**
    - **Property 6: Dropdown functions across all breakpoints**
    - **Validates: Requirements 5.1, 5.3, 5.4, 5.6**

  - [ ]* 9.4 Write unit tests for Client Support dropdown
    - Test dropdown indicator is present
    - Test dropdown has proper z-index
    - Test dropdown animation classes are applied
    - _Requirements: 5.2, 5.5_

- [x] 10. Implement Mobile Navigation Enhancements
  - [x] 10.1 Enhance mobile menu interactions
    - Ensure hamburger menu button is visible at mobile breakpoint
    - Implement smooth expand/collapse animations
    - Ensure touch targets are minimum 44x44px
    - Add proper touch-manipulation CSS
    - _Requirements: 11.1, 11.2, 11.5_

  - [ ]* 10.2 Write property tests for mobile navigation
    - **Property 8: Mobile menu expands and collapses**
    - **Property 9: Mobile navigation closes after item selection**
    - **Property 10: Touch targets meet minimum size requirements**
    - **Validates: Requirements 11.2, 11.5, 11.6**

  - [ ]* 10.3 Write unit tests for mobile navigation
    - Test hamburger button renders at mobile breakpoint
    - Test mobile menu shows converted items as links
    - Test mobile menu shows Client Support as dropdown
    - _Requirements: 11.1, 11.3, 11.4_

- [x] 11. Implement Animation and Interaction Enhancements
  - [x] 11.1 Add hover effects to interactive elements
    - Implement hover effects on all buttons and links
    - Use Tailwind hover: utilities for consistency
    - Ensure smooth transitions (duration-300)
    - Test hover effects across all landing pages
    - _Requirements: 7.3_

  - [x] 11.2 Optimize scroll animations
    - Use Intersection Observer for performance
    - Implement threshold and rootMargin for optimal trigger points
    - Add stagger delays for multiple elements
    - Respect prefers-reduced-motion media query
    - _Requirements: 7.2_

  - [ ]* 11.3 Write property tests for animations
    - **Property 12: Interactive elements have hover effects**
    - **Validates: Requirements 7.3**

- [x] 12. Implement SEO and Metadata
  - [x] 12.1 Add metadata to all landing pages
    - Create metadata objects for each page with title, description, keywords
    - Add Open Graph tags (og:title, og:description, og:image, og:type)
    - Add Twitter Card tags
    - Ensure metadata is unique and descriptive for each page
    - _Requirements: 12.2, 12.3, 12.4_

  - [x] 12.2 Verify semantic HTML structure
    - Ensure all pages use proper semantic tags (header, main, section, article)
    - Verify heading hierarchy (h1 → h2 → h3) without skips
    - Add ARIA labels where appropriate
    - Test with accessibility tools (axe-core)
    - _Requirements: 12.1, 12.5_

  - [ ]* 12.3 Write property tests for SEO
    - **Property 15: Pages include required meta tags**
    - **Validates: Requirements 12.2, 12.3, 12.4**

  - [ ]* 12.4 Write unit tests for metadata
    - Test each page exports correct metadata
    - Test semantic HTML structure is present
    - Test heading hierarchy is correct
    - _Requirements: 12.1, 12.5_

- [x] 13. Implement Performance Optimizations
  - [x] 13.1 Optimize images
    - Convert images to WebP format with fallbacks
    - Add loading="lazy" to images below the fold
    - Use Next.js Image component for automatic optimization
    - Ensure proper alt text for accessibility
    - _Requirements: 14.3, 14.5_

  - [x] 13.2 Optimize bundle size
    - Remove unused mega menu component imports
    - Verify tree-shaking removes dead code
    - Use dynamic imports for heavy components if needed
    - Measure bundle size reduction after refactoring
    - _Requirements: 14.4_

  - [x] 13.3 Enable Next.js prefetching
    - Verify Link components have prefetch enabled (default)
    - Test that hovering over links prefetches pages
    - Monitor network tab for prefetch requests
    - _Requirements: 14.1_

  - [ ]* 13.4 Write unit tests for performance features
    - Test images use lazy loading attribute
    - Test images use WebP format
    - Test Link components have prefetch enabled
    - Test unused mega menu components are not imported
    - _Requirements: 14.1, 14.3, 14.4, 14.5_

- [x] 14. Implement Active Page Highlighting
  - [x] 14.1 Add active state logic to navbar
    - Use Next.js usePathname hook to get current route
    - Compare current path with navigation item hrefs
    - Apply active classes (text-primary, border-b-2 border-primary)
    - Handle nested routes (e.g., /digital-marketing-services/pricing)
    - _Requirements: 10.1, 10.2_

  - [x] 14.2 Test active highlighting across breakpoints
    - Verify active styling appears on desktop
    - Verify active styling appears on tablet
    - Verify active styling appears on mobile
    - Ensure active state updates on navigation
    - _Requirements: 10.3, 10.4_

  - [ ]* 14.3 Write property tests for active highlighting
    - **Property 7: Active page is highlighted in navigation**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4**

- [x] 15. Final Integration and Testing
  - [x] 15.1 Perform end-to-end testing
    - Test complete navigation flow from home to all landing pages
    - Test mobile menu functionality on actual devices
    - Test Client Support dropdown on all breakpoints
    - Test active page highlighting during navigation
    - Verify no console errors or warnings
    - _Requirements: All_

  - [x] 15.2 Verify responsive design
    - Test all pages at mobile breakpoint (375px, 414px)
    - Test all pages at tablet breakpoint (768px, 1024px)
    - Test all pages at desktop breakpoint (1280px, 1920px)
    - Verify no horizontal scrolling at any breakpoint
    - Test touch interactions on mobile devices
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 15.3 Run accessibility audit
    - Run axe-core accessibility tests
    - Verify keyboard navigation works for all interactive elements
    - Test with screen reader (manual verification)
    - Ensure color contrast meets WCAG AA standards
    - Verify touch targets meet minimum size requirements
    - _Requirements: 11.5_

  - [x] 15.4 Run performance audit
    - Run Lighthouse performance audit
    - Verify Core Web Vitals (LCP, FID, CLS)
    - Check bundle size reduction
    - Verify image optimization
    - Test page load times
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 15.5 Write integration tests
    - Test navigation flow from home to each landing page
    - Test mobile menu open, navigate, close flow
    - Test Client Support dropdown across breakpoints
    - Test active highlighting updates during navigation
    - _Requirements: All_

- [x] 16. Final Checkpoint - Production Readiness
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation follows a logical progression: refactor navbar → create shared components → build landing pages → enhance interactions → optimize performance
- All landing pages use shared components for consistency and maintainability
- Client Support dropdown functionality is preserved throughout the refactoring
- Responsive design is implemented at every step, not as an afterthought
- SEO and accessibility are built-in from the start
