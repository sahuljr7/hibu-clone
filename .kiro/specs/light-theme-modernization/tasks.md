# Implementation Plan: Light Theme Modernization

## Overview

This implementation plan breaks down the Light Theme modernization into discrete, incremental steps. The approach prioritizes CSS variable updates first, followed by component enhancements, and concludes with comprehensive testing. Each task builds on previous work to ensure a cohesive, functional implementation.

## Tasks

- [x] 1. Update Light Theme CSS Variables
  - Update `:root` scope CSS variables in `app/globals.css` with modernized color palette
  - Add new CSS variables for hover states: `--primary-hover`, `--secondary-hover`, `--accent-hover`, `--card-border`
  - Verify all HSL values are valid and properly formatted
  - Ensure `.dark` scope remains completely untouched
  - _Requirements: 1.1, 5.2_

- [ ]* 1.1 Write property test for Dark Theme isolation
  - **Property 2: Dark Theme Isolation**
  - **Validates: Requirements 4.1, 5.1, 5.2**

- [ ]* 1.2 Write unit tests for CSS variable definitions
  - Test that all required light theme variables are defined in `:root`
  - Test that all color values use valid HSL format
  - _Requirements: 1.1_

- [x] 2. Update Dynamic Background Gradients
  - Modify `.dynamic-fluid-bg` class in `app/globals.css` to use reduced opacity gradients
  - Add slight blue tint to base gradient for warmer appearance
  - Verify animations remain unchanged (do not modify keyframes)
  - Test that `prefers-reduced-motion` still works correctly
  - _Requirements: 1.1, 4.2_

- [ ]* 2.1 Write property test for animation preservation
  - **Property 6: Animation Preservation**
  - **Validates: Requirements 4.2**

- [x] 3. Enhance Button Component Base Styles
  - Update `components/ui/button.tsx` button variants with modernized styling
  - Increase padding to `px-6 py-3` for default size
  - Change border radius to `rounded-xl` for modern feel
  - Add shadow utilities: `shadow-md hover:shadow-lg`
  - Update transition to `transition-all duration-200`
  - Add hover state color variables for primary, secondary, and accent variants
  - _Requirements: 2.1, 2.3, 2.4_

- [ ]* 3.1 Write property test for button hover transitions
  - **Property 3: Button Hover Transitions**
  - **Validates: Requirements 2.3**

- [ ]* 3.2 Write property test for button variant differentiation
  - **Property 4: Button Variant Differentiation**
  - **Validates: Requirements 2.4**

- [ ]* 3.3 Write property test for WCAG contrast compliance on buttons
  - **Property 1: WCAG Contrast Compliance**
  - **Validates: Requirements 2.2, 2.5, 6.1, 6.2, 6.4**

- [x] 4. Update CTA Button Components
  - Refine `components/cta-buttons.tsx` with enhanced shadows and refined hover scale
  - Add `shadow-md hover:shadow-xl` for depth
  - Adjust hover scale from `1.05` to `1.03` for subtlety
  - Ensure border-2 is used for outline variant
  - Verify smooth transitions and accessibility
  - _Requirements: 2.1, 2.3, 2.5_

- [x] 5. Checkpoint - Verify Button Styling
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create Modernized Card Styling Pattern
  - Define new card class pattern: `p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200`
  - Document the pattern for consistent application across components
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 7. Update Feature Card Component
  - Enhance `components/feature-card.tsx` with improved border visibility
  - Update border to `border-2 border-card-border/60` for light theme
  - Maintain all existing glassmorphism effects and animations
  - Verify gradient border animation still works
  - Test hover states and transitions
  - _Requirements: 3.1, 3.2, 4.2_

- [ ]* 7.1 Write property test for hover state perceivability
  - **Property 5: Hover State Perceivability**
  - **Validates: Requirements 6.5**

- [x] 8. Update Card Components in Resource Pages
  - Apply modernized card pattern to `app/resources/page.tsx`
  - Update all card instances with new border, shadow, and spacing classes
  - Increase grid gap from `gap-6` to `gap-8` for better separation
  - Verify hover states work correctly
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 9. Update Card Components in Digital Marketing Services
  - Apply modernized card pattern to `app/digital-marketing-services/page.tsx`
  - Update all card instances with new styling
  - Increase spacing between cards
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 10. Update Card Components in Company Pages
  - Apply modernized card pattern to `app/company/page.tsx`
  - Update all card instances with new styling
  - Ensure consistent spacing and shadows
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 11. Update Card Components in Hibu One Section
  - Apply modernized card pattern to Hibu One related components
  - Search for card usage in `components/hibu-one/` directory
  - Update with consistent styling
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 12. Update Card Components in Get Started Section
  - Update `components/get-started/case-study-card.tsx` with modernized pattern
  - Update `components/get-started/client-review-card.tsx` with modernized pattern
  - Ensure border-2 and shadow classes are applied
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 13. Update Shared Card Components
  - Apply modernized pattern to `components/content-section.tsx` and `components/content-section.example.tsx`
  - Update `components/industries-grid.tsx` card styling
  - Update `components/landing-page-layout.example.tsx` card examples
  - Ensure all shared components use consistent card pattern
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [x] 14. Checkpoint - Verify Card Styling Consistency
  - Ensure all tests pass, ask the user if questions arise.

- [~] 15. Update Typography Spacing
  - Increase section padding from `py-16` to `py-20` in major sections
  - Increase heading margins for clearer hierarchy
  - Verify text remains readable with new spacing
  - _Requirements: 1.3, 1.4_

- [ ]* 15.1 Write unit tests for typography and spacing
  - Test that major sections use `py-20` padding
  - Test that headings have appropriate margins
  - _Requirements: 1.3, 1.4_

- [~] 16. Verify Parallax Effects Preservation
  - Check that all parallax-related code in components remains unchanged
  - Test parallax effects still work correctly in Light Theme
  - Verify `use-parallax.ts` hook is unmodified
  - _Requirements: 4.3_

- [ ]* 16.1 Write property test for parallax preservation
  - **Property 7: Parallax Effect Preservation**
  - **Validates: Requirements 4.3**

- [~] 17. Implement Theme Switching Test
  - Create integration test for theme toggle functionality
  - Verify switching between light and dark themes works correctly
  - Ensure no visual glitches during transition
  - Test that theme preference persists
  - _Requirements: 5.3_

- [ ]* 17.1 Write unit test for theme switching mechanism
  - Test that toggling dark class switches computed styles
  - Verify theme toggle component functionality
  - _Requirements: 5.3_

- [~] 18. Run Accessibility Verification
  - Use `scripts/verify-accessibility.ts` to check contrast ratios
  - Verify all color combinations meet WCAG AA standards
  - Generate accessibility report
  - Fix any contrast issues found
  - _Requirements: 6.1, 6.2, 6.4_

- [ ]* 18.1 Write comprehensive WCAG contrast property test
  - **Property 1: WCAG Contrast Compliance**
  - Test all light theme color combinations
  - Verify minimum contrast ratios (4.5:1 for normal text, 3:1 for large text)
  - _Requirements: 2.2, 2.5, 6.1, 6.2, 6.4_

- [~] 19. Cross-Browser Testing
  - Test Light Theme in Chrome, Firefox, Safari, and Edge
  - Verify CSS variables render correctly in all browsers
  - Test on mobile devices (iOS Safari, Chrome Mobile)
  - Document any browser-specific issues
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [~] 20. Visual Regression Verification
  - Capture screenshots of all major pages in Light Theme
  - Compare with baseline screenshots (if available)
  - Verify Dark Theme screenshots remain identical
  - Document any unintended visual changes
  - _Requirements: 4.1, 5.1, 5.4_

- [~] 21. Final Checkpoint - Complete Testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples and integration points
- CSS variable updates must be done carefully to avoid breaking Dark Theme
- All card component updates should follow the same pattern for consistency
- Accessibility testing is critical and should not be skipped
