# Implementation Plan: Request Demo Landing Page

## Overview

This implementation plan breaks down the Request Demo Landing Page feature into discrete, incremental coding tasks. The approach follows a bottom-up strategy: building reusable components first, then composing them into sections, and finally wiring everything together with routing and navigation updates.

## Tasks

- [x] 1. Set up project structure and shared utilities
  - Create `components/get-started/` directory for new components
  - Set up form validation schema with zod
  - Create TypeScript interfaces for form data and state
  - _Requirements: 4.1, 5.1, 5.2_

- [ ] 2. Implement form field components and validation
  - [x] 2.1 Create DemoRequestForm component with form state management
    - Implement react-hook-form integration with zod validation
    - Add form fields: firstName, lastName, email, businessName, businessPhone
    - Implement form submission handler with loading states
    - Add success/error message display
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [ ]* 2.2 Write property test for form validation
    - **Property 5: Form Validation Error Handling**
    - **Property 6: Email Validation**
    - **Validates: Requirements 5.1, 5.2, 5.6**
  
  - [ ]* 2.3 Write unit tests for form submission states
    - Test loading state during submission
    - Test success message display
    - Test error message display
    - _Requirements: 5.3, 5.4, 5.5_

- [ ] 3. Implement form section with benefits list
  - [x] 3.1 Create DemoFormSection component
    - Implement two-column responsive layout
    - Add soft green gradient background with theme support
    - Create left column with heading and benefits list
    - Add numbered circle badges with green outline styling
    - Integrate DemoRequestForm in right column
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.5, 4.6_
  
  - [ ]* 3.2 Write property test for responsive layout
    - **Property 3: Responsive Layout Adaptation**
    - **Validates: Requirements 3.2, 3.3**
  
  - [ ]* 3.3 Write property test for form field consistency
    - **Property 4: Form Field Consistency**
    - **Validates: Requirements 4.7, 4.8**

- [ ] 4. Implement testimonials section components
  - [x] 4.1 Create VideoTestimonialCard component
    - Add label "APPLIANCE SERVICES VIDEO TESTIMONIAL"
    - Create card with video thumbnail/embed area
    - Add brand logo overlay
    - Add "A Client Success Story" text overlay
    - Add person image and name tag "Scott Reilly, Owner"
    - Add Hibu logo at bottom corner
    - Add quote text below card
    - _Requirements: 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  
  - [x] 4.2 Create ClientReviewCard component
    - Add label "DENTAL PRACTICE CLIENT REVIEW"
    - Create yellow square icon with quote and star graphic
    - Add review text with attribution "Samantha N. | Smile Envy"
    - Apply card styling with theme support
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [x] 4.3 Create CaseStudyCard component
    - Add label "AUTO BODY CASE STUDY"
    - Create yellow square icon with magnifying glass graphic
    - Add description text
    - Add "Download the case study" link with icon
    - Apply card styling with theme support
    - _Requirements: 8.4, 8.5, 8.6, 8.7_
  
  - [x] 4.4 Create TestimonialsSection component
    - Add section heading "Real clients. Real results."
    - Implement two-column responsive layout
    - Place VideoTestimonialCard in left column
    - Place ClientReviewCard and CaseStudyCard in right column
    - Add light background with theme support
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_
  
  - [ ]* 4.5 Write unit tests for testimonial components
    - Test VideoTestimonialCard renders all content
    - Test ClientReviewCard renders correctly
    - Test CaseStudyCard renders with link
    - _Requirements: 6.5, 7.1-7.6, 8.1-8.7_

- [x] 5. Checkpoint - Ensure component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement page route and animations
  - [x] 6.1 Create /get-started-2026 page route
    - Create `app/get-started-2026/page.tsx`
    - Add page metadata (title, description)
    - Compose DemoFormSection and TestimonialsSection
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  
  - [x] 6.2 Add page load animations with framer-motion
    - Implement hero section fade-in animation (300-500ms)
    - Add staggered entrance animations for form fields
    - Add scroll-based reveal for testimonials section
    - Implement reduced motion support
    - _Requirements: 10.1, 10.2, 10.6_
  
  - [x] 6.3 Add interaction animations
    - Implement button hover animations
    - Add form field focus micro-interactions
    - Add theme transition animations
    - Ensure all animations use 300-500ms timing
    - _Requirements: 10.3, 10.4, 10.5, 10.7_
  
  - [ ]* 6.4 Write property tests for animations
    - **Property 8: Animation Timing Constraints**
    - **Property 9: Staggered Animation Sequence**
    - **Property 10: Focus Micro-interactions**
    - **Validates: Requirements 2.5, 10.2, 10.5, 10.7**

- [ ] 7. Implement theme support
  - [x] 7.1 Add theme-responsive styling to all components
    - Update DemoFormSection with light/dark mode colors
    - Update form fields with theme-specific styling
    - Update testimonials section with theme support
    - Update all cards with theme-specific colors
    - Ensure proper contrast ratios in both themes
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_
  
  - [ ]* 7.2 Write property test for theme-responsive styling
    - **Property 7: Theme-Responsive Styling**
    - **Validates: Requirements 9.3, 9.4, 9.5, 9.6**
  
  - [ ]* 7.3 Write unit tests for theme switching
    - Test light mode renders correctly
    - Test dark mode renders correctly
    - Test theme toggle doesn't cause page reload
    - _Requirements: 9.1, 9.2, 9.3_

- [ ] 8. Update existing CTA buttons
  - [x] 8.1 Update CTAButtons component navigation
    - Change "Request a demo" button href to `/get-started-2026`
    - Ensure client-side navigation with Next.js Link
    - Verify hover, active, and pointer cursor states
    - Add smooth transition animation (300-500ms)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 8.2 Update HibuOneFinalCTA component navigation
    - Change ctaHref to `/get-started-2026`
    - Verify button interaction states
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [x] 8.3 Search and update any other "Request a Demo" buttons
    - Use grep to find all instances
    - Update each to navigate to `/get-started-2026`
    - _Requirements: 2.1_
  
  - [ ]* 8.4 Write property test for CTA button navigation
    - **Property 1: CTA Button Navigation Consistency**
    - **Property 2: Button Interaction States**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**

- [ ] 9. Implement accessibility features
  - [x] 9.1 Add ARIA labels and semantic HTML
    - Add aria-labels to all form fields
    - Add aria-required to required fields
    - Add aria-invalid and aria-describedby for error states
    - Add role="alert" to error messages
    - Add aria-live region for form submission status
    - Use semantic HTML elements (form, section, button, etc.)
    - _Requirements: 11.2, 11.4_
  
  - [x] 9.2 Implement keyboard navigation support
    - Ensure all interactive elements are keyboard accessible
    - Implement logical tab order
    - Add visible focus indicators to all form fields
    - Implement focus management on validation errors
    - _Requirements: 11.1, 11.3_
  
  - [x] 9.3 Ensure touch target sizes and contrast ratios
    - Verify all buttons and links are minimum 44x44px
    - Calculate and verify contrast ratios meet WCAG 2.1 AA
    - Add touch-manipulation class to interactive elements
    - _Requirements: 11.5, 11.6_
  
  - [ ]* 9.4 Write property tests for accessibility
    - **Property 11: Keyboard Navigation Completeness**
    - **Property 12: Accessibility Markup Presence**
    - **Property 13: Focus Indicator Visibility**
    - **Property 14: Contrast Ratio Compliance**
    - **Property 15: Touch Target Size Compliance**
    - **Validates: Requirements 11.1, 11.2, 11.3, 11.5, 11.6**

- [ ] 10. Implement responsive design
  - [x] 10.1 Add responsive breakpoints and layouts
    - Implement mobile layout (< 768px) with stacked columns
    - Implement tablet layout (768px - 1024px)
    - Implement desktop layout (> 1024px) with two columns
    - Ensure form fields stack vertically on mobile
    - Ensure testimonials stack vertically on mobile
    - Prevent horizontal scrolling at all viewport sizes
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_
  
  - [ ]* 10.2 Write property test for responsive overflow prevention
    - **Property 16: Responsive Overflow Prevention**
    - **Validates: Requirements 12.4**
  
  - [ ]* 10.3 Write unit tests for responsive breakpoints
    - Test mobile layout (< 768px)
    - Test tablet layout (768px - 1024px)
    - Test desktop layout (> 1024px)
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 11. Create API endpoint for form submission
  - [x] 11.1 Create /api/demo-request endpoint
    - Create `app/api/demo-request/route.ts`
    - Implement POST handler for form data
    - Add server-side validation
    - Add error handling for network and server errors
    - Return appropriate status codes and messages
    - _Requirements: 5.1, 5.2, 5.4, 5.5_
  
  - [ ]* 11.2 Write unit tests for API endpoint
    - Test successful submission
    - Test validation errors
    - Test server errors
    - _Requirements: 5.4, 5.5_

- [x] 12. Final checkpoint - Integration testing
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Final integration and polish
  - [x] 13.1 Test complete user flow
    - Navigate from homepage CTA to landing page
    - Fill out and submit form
    - Verify success message
    - Test error scenarios
    - Verify theme switching works throughout
    - Test on multiple viewport sizes
    - _Requirements: All_
  
  - [x] 13.2 Performance optimization
    - Verify animations run at 60fps
    - Check page load time
    - Optimize images if needed
    - Ensure no layout shift on load
    - _Requirements: 10.1-10.7_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with minimum 100 iterations each
- Unit tests validate specific examples and edge cases
- All components should be built with TypeScript for type safety
- Use existing shadcn/ui components where possible (Input, Button, Card)
- Follow existing animation patterns from the codebase (framer-motion with useReducedMotion)
- Maintain consistency with existing theme system (next-themes with Tailwind dark: prefix)
