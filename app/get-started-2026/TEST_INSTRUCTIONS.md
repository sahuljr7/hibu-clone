# Integration Test Instructions - Request Demo Landing Page

## Overview

This document provides instructions for running the complete user flow integration test for the Request Demo Landing Page (Task 13.1).

## Prerequisites

Before running the tests, you need to install the required testing dependencies:

```bash
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

## Test File

The integration test is located at:
- `app/get-started-2026/page.integration.test.tsx`

## Running the Tests

### Run all tests
```bash
pnpm test
```

### Run only the integration test
```bash
pnpm test page.integration.test
```

### Run tests in watch mode
```bash
pnpm test:watch page.integration.test
```

### Run with coverage
```bash
pnpm test:coverage page.integration.test
```

## Test Coverage

The integration test validates all aspects of Task 13.1:

### 1. Navigation to Landing Page
- ✅ Navigation from homepage CTA to `/get-started-2026`
- ✅ Landing page renders with all sections

### 2. Form Filling and Submission
- ✅ Successfully fill out all form fields
- ✅ Form submission with correct data
- ✅ Loading state during submission

### 3. Success Message Display
- ✅ Success message appears after submission
- ✅ Form resets after successful submission

### 4. Error Scenarios
- ✅ Validation errors for empty form
- ✅ Invalid email format error
- ✅ Invalid phone number error
- ✅ Server error handling
- ✅ Network failure handling
- ✅ Focus management on validation errors

### 5. Theme Switching
- ✅ Renders correctly in light mode
- ✅ Renders correctly in dark mode
- ✅ Theme-responsive classes on form fields
- ✅ Theme-responsive classes on buttons

### 6. Multiple Viewport Sizes
- ✅ Mobile viewport (375x667)
- ✅ Tablet viewport (768x1024)
- ✅ Desktop viewport (1920x1080)
- ✅ Responsive grid classes
- ✅ Responsive layout for name fields

### 7. Accessibility Features
- ✅ ARIA labels on all form fields
- ✅ aria-required on required fields
- ✅ Visible focus indicators
- ✅ Minimum touch target sizes
- ✅ Screen reader announcements

### 8. Complete End-to-End Flow
- ✅ Full user journey from page load to successful submission

### 9. Testimonials Section
- ✅ All testimonial content renders
- ✅ Download link in case study card

### 10. Benefits List
- ✅ All three benefits with numbered badges

## Test Structure

The test suite is organized into 10 main describe blocks:

1. **Navigation to Landing Page** - Tests route accessibility and page rendering
2. **Form Filling and Submission** - Tests form interaction and submission
3. **Success Message Display** - Tests success state and form reset
4. **Error Scenarios** - Tests all error conditions and validation
5. **Theme Switching** - Tests light/dark mode rendering
6. **Responsive Design** - Tests multiple viewport sizes
7. **Accessibility Features** - Tests ARIA attributes and keyboard navigation
8. **Complete End-to-End Flow** - Tests full user journey
9. **Testimonials Section** - Tests testimonials content
10. **Benefits List** - Tests benefits display

## Mocked Dependencies

The test mocks the following:
- `next/navigation` - Router functionality
- `framer-motion` - Animation library
- `@/hooks/use-reduced-motion` - Reduced motion preference
- `@/hooks/use-in-view` - Intersection observer
- `global.fetch` - API calls

## Expected Results

All tests should pass, validating:
- ✅ All Requirements (1-12) from the spec
- ✅ Complete user flow functionality
- ✅ Error handling and validation
- ✅ Theme support
- ✅ Responsive design
- ✅ Accessibility compliance

## Troubleshooting

### If tests fail due to missing dependencies:
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

### If tests fail due to module resolution:
Check that `jest.config.js` has the correct `moduleNameMapper` configuration.

### If tests timeout:
Increase the timeout in `jest.config.js`:
```javascript
testTimeout: 10000
```

## Next Steps

After running the integration test:
1. Verify all tests pass
2. Review any failures and fix issues
3. Run manual testing on actual browsers
4. Test on real devices for mobile/tablet viewports
5. Perform accessibility testing with screen readers

## Manual Testing Checklist

In addition to automated tests, perform these manual checks:

- [ ] Navigate from homepage to landing page
- [ ] Fill out form with valid data and submit
- [ ] Verify success message appears
- [ ] Test with invalid email format
- [ ] Test with short phone number
- [ ] Toggle between light and dark themes
- [ ] Test on mobile device (< 768px)
- [ ] Test on tablet device (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Test keyboard navigation (Tab, Enter)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify animations are smooth (60fps)
- [ ] Check contrast ratios meet WCAG AA
- [ ] Verify touch targets are at least 44x44px

## Requirements Validation

This test validates all requirements from the spec:

- **Requirement 1**: Route Configuration ✅
- **Requirement 2**: Button Navigation Updates ✅
- **Requirement 3**: Demo Form Section Layout ✅
- **Requirement 4**: Form Fields and Structure ✅
- **Requirement 5**: Form Validation and Submission ✅
- **Requirement 6**: Testimonials Section Layout ✅
- **Requirement 7**: Video Testimonial Card ✅
- **Requirement 8**: Client Review and Case Study Blocks ✅
- **Requirement 9**: Theme Support ✅
- **Requirement 10**: Animations and Transitions ✅
- **Requirement 11**: Accessibility ✅
- **Requirement 12**: Responsive Design ✅
