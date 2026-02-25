# Requirements Document

## Introduction

This document specifies the requirements for a conversion-focused "Request a Demo" landing page accessible at `/get-started-2026`. The feature includes creating a new route with a two-section layout (demo request form and client testimonials), updating existing navigation buttons throughout the site, and ensuring full theme support with professional animations and accessibility compliance.

## Glossary

- **Landing_Page**: The new page component served at `/get-started-2026` route
- **Demo_Form**: The form component that collects user information for demo requests
- **Navigation_System**: The Next.js routing and navigation infrastructure
- **Theme_System**: The existing light/dark mode implementation in the application
- **Testimonial_Section**: The section displaying client success stories and case studies
- **Form_Field**: Individual input elements within the Demo_Form
- **CTA_Button**: Call-to-action button labeled "Request a Demo"

## Requirements

### Requirement 1: Route Configuration

**User Story:** As a developer, I want to create a new `/get-started-2026` route, so that users can access the dedicated demo request landing page.

#### Acceptance Criteria

1. WHEN the application starts, THE Navigation_System SHALL register `/get-started-2026` as a valid route
2. WHEN a user navigates to `/get-started-2026`, THE Navigation_System SHALL render the Landing_Page component without full page reload
3. WHEN the route is accessed, THE Navigation_System SHALL use proper Next.js App Router conventions
4. WHEN the page loads, THE Navigation_System SHALL set appropriate metadata including title and description

### Requirement 2: Button Navigation Updates

**User Story:** As a user, I want all "Request a Demo" buttons to navigate to the new landing page, so that I have a consistent experience across the site.

#### Acceptance Criteria

1. WHEN a user clicks any CTA_Button labeled "Request a Demo", THE Navigation_System SHALL navigate to `/get-started-2026` using client-side routing
2. WHEN a user hovers over a CTA_Button, THE CTA_Button SHALL display visual feedback with hover state styling
3. WHEN a user clicks a CTA_Button, THE CTA_Button SHALL display active state styling
4. WHEN a user hovers over a CTA_Button, THE CTA_Button SHALL display a pointer cursor
5. WHERE smooth transitions are enabled, WHEN navigation occurs, THE Navigation_System SHALL apply transition animations with duration between 300-500ms

### Requirement 3: Demo Form Section Layout

**User Story:** As a user, I want to see a clear and inviting form section, so that I understand the benefits and can easily request a demo.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a full-width section with a soft green gradient background as the first section
2. WHEN the viewport is desktop size, THE Demo_Form section SHALL use a two-column layout
3. WHEN the viewport is mobile size, THE Demo_Form section SHALL stack columns vertically
4. THE Demo_Form section left column SHALL display the heading "Ready to get started? Request your digital marketing demo"
5. THE Demo_Form section left column SHALL display three numbered benefits with green outlined circle badges
6. THE Demo_Form section right column SHALL contain the Demo_Form component

### Requirement 4: Form Fields and Structure

**User Story:** As a user, I want to fill out a clear and well-organized form, so that I can request a demo efficiently.

#### Acceptance Criteria

1. THE Demo_Form SHALL include Form_Fields for First Name, Last Name, Email, Business Name, and Business Phone
2. WHEN the viewport is desktop size, THE Demo_Form SHALL display First Name and Last Name fields side-by-side
3. THE Demo_Form SHALL display Email, Business Name, and Business Phone fields in full-width layout
4. THE Demo_Form SHALL include a submit button labeled "Request a demo" with solid purple background
5. THE Demo_Form SHALL display disclaimer text with clickable links to Privacy Policy and California Privacy Rights Notice
6. THE Demo_Form SHALL display footer link text "Already a client? Contact client support."
7. WHEN a Form_Field is empty, THE Form_Field SHALL display placeholder text inside the field
8. THE Demo_Form SHALL style all Form_Fields with light gray background, dark border, rounded corners, and medium height

### Requirement 5: Form Validation and Submission

**User Story:** As a user, I want to receive clear feedback on my form input, so that I can correct errors and successfully submit my demo request.

#### Acceptance Criteria

1. WHEN a user submits the Demo_Form with empty required fields, THE Demo_Form SHALL prevent submission and display error states on invalid Form_Fields
2. WHEN a user enters an invalid email format, THE Demo_Form SHALL display an error message for the Email Form_Field
3. WHEN a user submits the Demo_Form, THE Demo_Form SHALL display a loading state on the submit button
4. WHEN form submission succeeds, THE Demo_Form SHALL display a success message to the user
5. WHEN form submission fails, THE Demo_Form SHALL display an error message to the user
6. WHEN a Form_Field has an error, THE Form_Field SHALL display visual error styling with appropriate color and border

### Requirement 6: Testimonials Section Layout

**User Story:** As a user, I want to see real client success stories, so that I can understand the value of the service.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a full-width Testimonial_Section with light background as the second section
2. THE Testimonial_Section SHALL display the heading "Real clients. Real results."
3. WHEN the viewport is desktop size, THE Testimonial_Section SHALL use a two-column layout
4. WHEN the viewport is mobile size, THE Testimonial_Section SHALL stack columns vertically
5. THE Testimonial_Section left column SHALL display a video testimonial card with label "APPLIANCE SERVICES VIDEO TESTIMONIAL"
6. THE Testimonial_Section right column SHALL display two content blocks: a dental practice review and an auto body case study

### Requirement 7: Video Testimonial Card

**User Story:** As a user, I want to view a video testimonial, so that I can see authentic client feedback.

#### Acceptance Criteria

1. THE video testimonial card SHALL display the Peerless Appliance Services brand logo
2. THE video testimonial card SHALL display overlay text "A Client Success Story"
3. THE video testimonial card SHALL display an image of the business owner
4. THE video testimonial card SHALL display a name tag "Scott Reilly, Owner"
5. THE video testimonial card SHALL display the Hibu logo at the bottom corner
6. THE video testimonial card SHALL display a quote below: "Hibu maximizes my results. I've got little effort put into it [digital marketing] and I've got huge results."

### Requirement 8: Client Review and Case Study Blocks

**User Story:** As a user, I want to read client reviews and access case studies, so that I can learn about specific results.

#### Acceptance Criteria

1. THE dental practice review block SHALL display label "DENTAL PRACTICE CLIENT REVIEW"
2. THE dental practice review block SHALL display a yellow square icon with quote and star graphic
3. THE dental practice review block SHALL display review text with attribution "Samantha N. | Smile Envy"
4. THE auto body case study block SHALL display label "AUTO BODY CASE STUDY"
5. THE auto body case study block SHALL display a yellow square icon with magnifying glass graphic
6. THE auto body case study block SHALL display description text
7. THE auto body case study block SHALL display a clickable link "Download the case study"

### Requirement 9: Theme Support

**User Story:** As a user, I want the landing page to respect my theme preference, so that I have a consistent visual experience.

#### Acceptance Criteria

1. WHEN the Theme_System is set to light mode, THE Landing_Page SHALL display light mode color scheme with proper contrast ratios
2. WHEN the Theme_System is set to dark mode, THE Landing_Page SHALL display dark mode color scheme with proper contrast ratios
3. WHEN the theme changes, THE Landing_Page background SHALL adapt dynamically without page reload
4. WHEN the theme changes, THE Landing_Page text SHALL remain readable with sufficient contrast
5. WHEN the theme changes, THE Demo_Form Form_Fields SHALL update styling to match the active theme
6. WHEN the theme changes, THE CTA_Button and card components SHALL adjust visual styling for the active theme

### Requirement 10: Animations and Transitions

**User Story:** As a user, I want to experience smooth and professional animations, so that the page feels polished and engaging.

#### Acceptance Criteria

1. WHEN the Landing_Page loads, THE hero section SHALL fade in with animation duration between 300-500ms
2. WHEN the Demo_Form renders, THE Form_Fields SHALL appear with staggered entrance animations
3. WHEN a user hovers over the submit button, THE submit button SHALL display hover animation
4. WHEN the theme changes, THE Landing_Page SHALL apply smooth transitions with ease-in-out or cubic-bezier timing
5. WHEN a user focuses on a Form_Field, THE Form_Field SHALL display micro-interaction animation
6. WHERE scroll-based animations are enabled, WHEN a user scrolls to the Testimonial_Section, THE section SHALL reveal with animation
7. THE Landing_Page SHALL ensure all animations use timing between 300-500ms and are subtle and professional

### Requirement 11: Accessibility

**User Story:** As a user with accessibility needs, I want to navigate and use the landing page with assistive technologies, so that I can request a demo independently.

#### Acceptance Criteria

1. WHEN a user navigates using keyboard only, THE Landing_Page SHALL support full keyboard navigation through all interactive elements
2. WHEN a screen reader is active, THE Landing_Page SHALL provide appropriate ARIA labels and semantic HTML
3. WHEN a Form_Field receives focus, THE Form_Field SHALL display a visible focus indicator
4. WHEN form validation errors occur, THE Demo_Form SHALL announce errors to screen readers
5. THE Landing_Page SHALL maintain WCAG 2.1 AA contrast ratios for all text and interactive elements
6. THE CTA_Button and links SHALL have sufficient touch target sizes for mobile devices (minimum 44x44px)

### Requirement 12: Responsive Design

**User Story:** As a user on any device, I want the landing page to display correctly, so that I can request a demo from any screen size.

#### Acceptance Criteria

1. WHEN the viewport width is less than 768px, THE Landing_Page SHALL display mobile-optimized layout
2. WHEN the viewport width is between 768px and 1024px, THE Landing_Page SHALL display tablet-optimized layout
3. WHEN the viewport width is greater than 1024px, THE Landing_Page SHALL display desktop-optimized layout
4. WHEN the viewport changes size, THE Landing_Page SHALL reflow content without horizontal scrolling
5. WHEN viewed on mobile, THE Demo_Form SHALL stack all Form_Fields vertically with appropriate spacing
6. WHEN viewed on mobile, THE Testimonial_Section SHALL stack all content blocks vertically with appropriate spacing
