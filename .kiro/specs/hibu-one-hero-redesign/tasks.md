# Implementation Plan: Hibu One Hero Redesign

## Overview

This plan implements a visual redesign of the Hibu One landing page hero section, transforming it from a two-column layout to a centered, single-column design with a soft green gradient background and a distinctive layered media card component. The implementation preserves all existing functionality, props, hooks, and accessibility features while updating the visual presentation to match the approved design.

## Tasks

- [x] 1. Set up Tailwind configuration for custom green color shades
  - Add custom green-25 color (hsl(142, 76%, 97%)) to tailwind.config.ts
  - Add custom green-50 color (hsl(142, 76%, 94%)) if not already present
  - Verify gradient classes are available for use
  - _Requirements: 2.1, 2.2, 2.3_

- [x] 2. Update content data structure to support rich text and layered media card
  - [x] 2.1 Update HeroContent interface in app/hibu-one/content.ts to support React.ReactNode for description
    - Change description type from string to string | React.ReactNode
    - Add optional mediaCard configuration object with logo, tagline, watchCTA, and mockups array
    - _Requirements: 3.5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 10.1, 10.2, 10.3, 10.4_
  
  - [x] 2.2 Update hibuOneContent.hero object with new content
    - Change heading to "Hibu One"
    - Replace description with JSX containing bold emphasis on key phrases
    - Swap button order (secondary first, primary second)
    - Add mediaCard configuration with logo, tagline, watchCTA, and mockup positions
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3, 5.3, 5.4, 5.5, 5.6, 10.5_

- [x] 3. Create LayeredMediaCard component
  - [x] 3.1 Create components/hibu-one/layered-media-card.tsx with TypeScript interface
    - Define LayeredMediaCardProps interface with logo, tagline, watchCTA, mockups, and className
    - Set up component structure with shadow layer and primary layer containers
    - _Requirements: 5.1, 5.2, 6.1_
  
  - [x] 3.2 Implement shadow layer with green gradient
    - Create absolute positioned div with green gradient (from-green-100 to-green-200)
    - Apply 20px offset to right and bottom using Tailwind classes
    - Add rounded-3xl corners and -z-10 for layering
    - _Requirements: 5.2, 5.7_
  
  - [x] 3.3 Implement primary layer with purple gradient
    - Create relative positioned div with purple gradient (from-purple-600 via-purple-500 to-purple-700)
    - Add rounded-3xl corners, padding (p-8 md:p-12), and shadow-2xl
    - Set overflow-hidden for mockup positioning
    - _Requirements: 5.1, 5.7_
  
  - [x] 3.4 Add logo, tagline, and watch CTA elements
    - Position logo in top-left corner using Next.js Image component
    - Center tagline text with appropriate typography classes
    - Center watch CTA button/link with styling
    - _Requirements: 5.3, 5.4, 5.5_
  
  - [x] 3.5 Implement floating mockup positioning system
    - Create position mapping object for top-left, top-right, bottom-left, bottom-right, center
    - Render mockups with absolute positioning based on position prop
    - Use Next.js Image component with appropriate sizes attribute
    - Apply responsive scaling for different viewport sizes
    - _Requirements: 5.6, 7.4, 8.2_
  
  - [x] 3.6 Add Framer Motion animations to LayeredMediaCard
    - Wrap component in motion.div with initial opacity 0, y: 30
    - Animate to opacity 1, y: 0 with 0.6s duration and 0.6s delay
    - Respect useReducedMotion preferences
    - _Requirements: 6.2, 6.3, 9.5_

- [ ] 4. Checkpoint - Verify LayeredMediaCard component
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Redesign HibuOneHero component layout and styling
  - [x] 5.1 Update section container background to soft green gradient
    - Replace existing background with absolute positioned gradient layer
    - Apply bg-gradient-to-b from-green-50 via-green-25 to-white
    - Ensure gradient spans full width and height with inset-0
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 5.2 Transform layout from two-column grid to single-column centered
    - Remove grid layout classes
    - Apply flex flex-col items-center text-center to content container
    - Add appropriate vertical spacing (space-y-8 md:space-y-10 lg:space-y-12)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 5.3 Update heading and description rendering
    - Remove subheading display (keep prop for compatibility)
    - Update heading typography to text-4xl sm:text-5xl md:text-6xl lg:text-7xl
    - Support rich text description rendering (check if React.ReactNode)
    - Apply center alignment and max-w-3xl constraint to description
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.1_
  
  - [x] 5.4 Update CTA button group layout and order
    - Change to flex flex-col sm:flex-row for responsive stacking
    - Swap button rendering order (secondary first, primary second)
    - Maintain center alignment and gap-4 spacing
    - Preserve all button props and accessibility features
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.5_
  
  - [x] 5.5 Replace media card with LayeredMediaCard component
    - Import LayeredMediaCard component
    - Pass mediaCard props (logo, tagline, watchCTA, mockups) if available
    - Position below CTA buttons with appropriate margin
    - Apply max-w-4xl constraint and center alignment
    - _Requirements: 1.3, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [x] 5.6 Disable parallax effect for new centered design
    - Set parallax offset to 0 or disabled: true in useParallax hook
    - Maintain hook implementation for compatibility
    - _Requirements: 6.4_
  
  - [x] 5.7 Update animation timing and sequencing
    - Heading: delay 0, duration 0.6s
    - Description: delay 0.2s, duration 0.6s
    - CTA buttons: delay 0.4s, duration 0.6s
    - LayeredMediaCard: delay 0.6s, duration 0.6s
    - Maintain easing function [0.4, 0, 0.2, 1]
    - _Requirements: 6.2, 6.3_

- [x] 6. Ensure responsive behavior across all viewport sizes
  - [x] 6.1 Verify desktop layout (≥1024px)
    - Test full layout with optimal spacing
    - Verify gradient background spans full section
    - Check LayeredMediaCard displays correctly with all mockups
    - _Requirements: 7.1, 7.5_
  
  - [ ] 6.2 Verify tablet layout (768px - 1023px)
    - Test adjusted spacing and font sizes
    - Verify buttons remain horizontal
    - Check LayeredMediaCard scales proportionally
    - _Requirements: 7.2, 7.4, 7.5_
  
  - [x] 6.3 Verify mobile layout (<768px)
    - Test vertical stacking of all elements
    - Verify buttons stack vertically
    - Check LayeredMediaCard maintains aspect ratio
    - Ensure no horizontal scrolling
    - _Requirements: 1.4, 4.5, 7.3, 7.4, 7.5_

- [x] 7. Verify accessibility compliance
  - [x] 7.1 Check semantic HTML and heading hierarchy
    - Verify h1 is used for main heading
    - Check proper ARIA labels on interactive elements
    - Test keyboard navigation for all buttons and links
    - _Requirements: 9.1, 9.2, 6.5_
  
  - [x] 7.2 Verify color contrast ratios
    - Test text contrast against green gradient background meets WCAG AA (4.5:1)
    - Test button text contrast meets WCAG AA standards
    - Check LayeredMediaCard text contrast on purple gradient
    - _Requirements: 3.4, 9.4_
  
  - [x] 7.3 Test reduced motion preferences
    - Verify useReducedMotion hook reduces animation duration to 0.1s
    - Test all animations respect prefers-reduced-motion
    - _Requirements: 6.3, 9.5_

- [-] 8. Verify performance optimization
  - [x] 8.1 Check image optimization
    - Verify Next.js Image component used for all images
    - Test priority loading for hero images
    - Check appropriate sizes attribute on LayeredMediaCard mockups
    - _Requirements: 6.7, 8.1, 8.2_
  
  - [x] 8.2 Test layout stability and performance
    - Verify minimal layout shift during page load (CLS)
    - Check CSS transforms used for animations (GPU acceleration)
    - Confirm gradient backgrounds use CSS, not image files
    - _Requirements: 8.3, 8.4, 8.5_

- [ ] 9. Final checkpoint - Comprehensive testing
  - Ensure all tests pass, ask the user if questions arise.
  - Verify visual accuracy against screenshot design
  - Test all responsive breakpoints
  - Confirm accessibility compliance
  - Validate performance metrics

## Notes

- All existing props, hooks, and functionality are preserved for backward compatibility
- The subheading prop is maintained but not displayed in the new design
- Parallax effect is disabled but the hook remains for potential future use
- All animations respect user motion preferences via useReducedMotion
- Content updates can be made through app/hibu-one/content.ts without component changes
- TypeScript interfaces ensure type safety throughout the implementation
