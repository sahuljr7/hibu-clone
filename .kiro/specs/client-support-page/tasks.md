# Implementation Plan: Client Support Contact Page

## Overview

This implementation plan breaks down the client support page feature into incremental coding tasks. Each task builds on previous work, with testing integrated throughout to catch issues early. The approach follows the existing codebase patterns and ensures all components are properly wired together.

## Tasks

- [x] 1. Create validation schema and types
  - Create `components/client-support/validation.ts`
  - Define zod schema for form validation (firstName, lastName, companyName, phoneNumber, email, inquiryType, message)
  - Export TypeScript type from schema
  - Include validation rules: required fields, email format, phone format, message length (10-1000 chars)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 5.2, 5.3_

- [ ]* 1.1 Write property test for validation schema
  - **Property 1: Form field validation rejects invalid inputs**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**

- [x] 2. Create client support contact information component
  - Create `components/client-support/client-support-contact.tsx`
  - Display section label "CLIENT SUPPORT" in small uppercase
  - Display heading "Already a Hibu client? Contact us."
  - Display supporting text about support availability
  - Display phone number "877-237-6120" as clickable tel: link
  - Display availability hours (Mon-Fri: 8am-8pm ET, Sat: 9am-2pm ET)
  - Display dashboard link with feature list (View results, Update preferences, Preview ads, Manage website)
  - Add fade-in animations with staggered timing using Framer Motion
  - Use `useReducedMotion` hook to respect user preferences
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ]* 2.1 Write unit tests for contact information component
  - Test all required text content is displayed
  - Test phone link has correct href
  - Test dashboard link has correct href
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [x] 3. Create client support form component
  - [x] 3.1 Create form component with react-hook-form and zod validation
    - Create `components/client-support/client-support-form.tsx`
    - Set up react-hook-form with zodResolver
    - Create form fields: firstName, lastName, companyName, phoneNumber, email, inquiryType (dropdown), message (textarea)
    - Add proper labels and ARIA attributes for accessibility
    - Implement real-time validation on blur
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 10.1, 10.2_

  - [x] 3.2 Add form submission logic
    - Implement onSubmit handler that calls `/api/client-support`
    - Add loading state with disabled button and spinner
    - Add success state with success message
    - Add error state with error message and retry option
    - Clear form fields after successful submission
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 3.3 Add form animations
    - Add staggered fade-in animations for form fields on page load
    - Add focus animations (border glow with ring-2 ring-purple-500)
    - Add hover animations on submit button (scale-105, shadow-lg)
    - Add loading animation (spinning icon)
    - Add success/error message animations (fade-in with slide-up)
    - Use `useReducedMotion` hook to respect user preferences
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 8.1, 8.3_

  - [x] 3.4 Add legal disclaimer text
    - Add disclaimer below submit button
    - Include text about consent to contact, automated dialing
    - Include links to Privacy Policy and California Privacy Rights Notice
    - _Requirements: 4.9_

  - [ ]* 3.5 Write property test for form validation error clearing
    - **Property 2: Valid field clears error state**
    - **Validates: Requirements 5.5**

  - [ ]* 3.6 Write property test for form submission
    - **Property 3: Form submission with valid data**
    - **Validates: Requirements 6.1, 6.5**

  - [ ]* 3.7 Write property test for accessibility labels
    - **Property 4: Accessibility labels for all form inputs**
    - **Validates: Requirements 10.1, 10.2**

  - [ ]* 3.8 Write property test for screen reader error announcements
    - **Property 5: Error announcements for screen readers**
    - **Validates: Requirements 10.4**

- [x] 4. Create API route for form submission
  - Create `app/api/client-support/route.ts`
  - Implement POST handler that accepts form data
  - Add server-side validation using zod schema
  - Return appropriate responses (200 success, 400 validation error, 500 server error)
  - Log submissions (in production: save to database, send notifications)
  - Handle unsupported HTTP methods (GET, PUT, DELETE) with 405 responses
  - _Requirements: 6.1, 6.3, 6.4_

- [ ]* 4.1 Write unit tests for API route
  - Test successful submission returns 200
  - Test invalid data returns 400 with error details
  - Test server errors return 500
  - Test unsupported methods return 405
  - _Requirements: 6.1, 6.3, 6.4_

- [x] 5. Create client support page
  - Create `app/client-support/page.tsx`
  - Set up page metadata (title: "Client Support | Hibu", description)
  - Create two-column layout using grid (lg:grid-cols-2)
  - Place ClientSupportContact in left column
  - Place ClientSupportForm in right column
  - Make layout responsive (single column on mobile, two columns on desktop)
  - Add page transition animation on load
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 7.1, 9.1_

- [ ]* 5.1 Write unit tests for page layout
  - Test two-column layout on desktop viewport
  - Test single-column layout on mobile viewport
  - Test contact info appears before form on mobile
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 9.1_

- [ ]* 5.2 Write property test for color contrast
  - **Property 6: Color contrast compliance**
  - **Validates: Requirements 10.5**

- [x] 6. Add navigation link to client support page
  - Update existing "Contact Client Support" links to point to `/client-support`
  - Verify link exists in demo request form disclaimer
  - Add link to navbar if needed
  - _Requirements: 1.3_

- [ ]* 6.1 Write unit test for navigation
  - Test clicking "Contact Client Support" link navigates to `/client-support`
  - _Requirements: 1.3_

- [x] 7. Accessibility and keyboard navigation testing
  - Verify all form inputs have proper labels
  - Verify ARIA attributes are correct
  - Test keyboard navigation (tab order)
  - Test focus indicators are visible
  - Verify error messages are announced to screen readers
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 8. Final integration and polish
  - Test complete form submission flow end-to-end
  - Verify animations work correctly and respect reduced motion
  - Test responsive layout at all breakpoints
  - Verify styling matches existing design system
  - Check that all links work correctly
  - Ensure loading states and error states display properly
  - _Requirements: All_

- [x] 9. Checkpoint - Ensure all tests pass
  - Run all unit tests and property tests
  - Fix any failing tests
  - Verify page works in development environment
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests should run minimum 100 iterations each
- Follow existing patterns from `demo-request-form.tsx` for consistency
- Use shadcn/ui components (Button, Input, Select, Textarea, Form)
- Use Framer Motion for animations with reduced motion support
- Ensure all code follows TypeScript best practices and existing project conventions
