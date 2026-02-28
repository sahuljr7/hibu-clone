# Design Document: Client Support Contact Page

## Overview

The Client Support Contact Page is a dedicated route at `/client-support` that provides existing Hibu clients with multiple ways to contact support. The page features a two-column responsive layout with contact information on the left and an interactive support form on the right. The design emphasizes accessibility, smooth animations, and a clean SaaS aesthetic consistent with the existing Hibu website.

## Architecture

### High-Level Structure

```
app/
  client-support/
    page.tsx                    # Main page component (Server Component)
    
components/
  client-support/
    client-support-form.tsx     # Form component (Client Component)
    client-support-contact.tsx  # Contact info component
    validation.ts               # Zod validation schema
    
app/api/
  client-support/
    route.ts                    # API endpoint for form submission
```

### Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with existing design system
- **Form Management**: react-hook-form with zod validation
- **Animations**: Framer Motion (already in use)
- **UI Components**: shadcn/ui components (Button, Input, Select, Textarea, Form)
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

### Design Patterns

1. **Server/Client Component Split**: Page is a Server Component, form is a Client Component
2. **Form Validation**: Client-side validation with zod schema, server-side validation in API route
3. **Progressive Enhancement**: Form works without JavaScript, enhanced with animations when available
4. **Responsive Design**: Mobile-first approach with breakpoints at sm (640px), md (768px), lg (1024px)

## Components and Interfaces

### 1. Client Support Page Component

**File**: `app/client-support/page.tsx`

**Purpose**: Server Component that renders the main page layout

**Structure**:
```typescript
export default function ClientSupportPage() {
  return (
    <main>
      <Navbar />
      <section className="container">
        <div className="grid lg:grid-cols-2">
          <ClientSupportContact />
          <ClientSupportForm />
        </div>
      </section>
    </main>
  )
}
```

**Metadata**:
- Title: "Client Support | Hibu"
- Description: "Contact Hibu client support for assistance with your digital marketing services"

### 2. Client Support Contact Component

**File**: `components/client-support/client-support-contact.tsx`

**Purpose**: Displays contact information, phone number, hours, and dashboard link

**Content Structure**:
- Section label: "CLIENT SUPPORT" (text-xs uppercase tracking-wide)
- Main heading: "Already a Hibu client? Contact us." (text-4xl font-bold)
- Supporting text: "Our service and support teams are ready to assist by phone, live chat or message."
- Phone number: Clickable `tel:` link with "877-237-6120"
- Availability hours:
  - "Digital Marketing Client Support available"
  - "Mon – Fri: 8am – 8pm ET"
  - "Sat: 9am – 2pm ET"
- Dashboard link: Link to dashboard with feature list
  - "Log into your Hibu Performance Dashboard"
  - Features: View results, Update email & text preferences, Preview ads, Manage website

**Animations**:
- Fade-in on page load with staggered timing for each section
- Uses `useReducedMotion` hook to respect user preferences

### 3. Client Support Form Component

**File**: `components/client-support/client-support-form.tsx`

**Purpose**: Interactive form for submitting support inquiries

**Form Fields**:
```typescript
interface ClientSupportFormData {
  firstName: string
  lastName: string
  companyName: string
  phoneNumber: string
  email: string
  inquiryType: 'technical' | 'product' | 'feedback' | 'inappropriate' | 'sales' | 'other'
  message: string
}
```

**Field Specifications**:
- First Name: Text input, required, max 50 chars
- Last Name: Text input, required, max 50 chars
- Company Name: Text input, required, max 100 chars
- Phone Number: Tel input, required, format validation
- Email: Email input, required, email format validation
- Inquiry Type: Select dropdown with 6 options
- Message: Textarea, required, min 10 chars, max 1000 chars

**UI States**:
- Idle: Form ready for input
- Validating: Real-time validation on blur
- Submitting: Loading spinner, disabled button
- Success: Success message displayed, form cleared
- Error: Error message displayed, retry enabled

**Animations**:
- Staggered fade-in for form fields on page load
- Focus animations: border glow (ring-2 ring-purple-500)
- Hover animations on submit button: scale-105, shadow-lg
- Loading animation: spinning icon
- Success/error messages: fade-in with slide-up

### 4. Validation Schema

**File**: `components/client-support/validation.ts`

**Purpose**: Zod schema for form validation

```typescript
import * as z from 'zod'

export const clientSupportFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name too long'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long'),
  
  companyName: z.string()
    .min(1, 'Company name is required')
    .max(100, 'Company name too long'),
  
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number too long')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Invalid phone number format'),
  
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  
  inquiryType: z.enum([
    'technical',
    'product',
    'feedback',
    'inappropriate',
    'sales',
    'other'
  ], { required_error: 'Please select an inquiry type' }),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message too long'),
})

export type ClientSupportFormData = z.infer<typeof clientSupportFormSchema>
```

### 5. API Route

**File**: `app/api/client-support/route.ts`

**Purpose**: Handle form submissions

**Endpoint**: POST `/api/client-support`

**Request Body**:
```typescript
{
  firstName: string
  lastName: string
  companyName: string
  phoneNumber: string
  email: string
  inquiryType: string
  message: string
  submittedAt: string
  source: 'client-support-page'
}
```

**Response**:
- Success (200): `{ message: string, success: true }`
- Validation Error (400): `{ message: string, errors: object }`
- Server Error (500): `{ message: string, error: string }`

**Processing Steps**:
1. Parse and validate request body
2. Server-side validation with zod schema
3. Log submission (in production: save to database, send notifications)
4. Return success/error response

## Data Models

### ClientSupportFormData

```typescript
interface ClientSupportFormData {
  firstName: string        // 1-50 chars
  lastName: string         // 1-50 chars
  companyName: string      // 1-100 chars
  phoneNumber: string      // 10-20 chars, format: digits, spaces, dashes, parens, plus
  email: string            // Valid email format, max 100 chars
  inquiryType: InquiryType // Enum of 6 types
  message: string          // 10-1000 chars
}

type InquiryType = 
  | 'technical'      // Technical Support
  | 'product'        // Product Support
  | 'feedback'       // Feedback
  | 'inappropriate'  // Report Inappropriate Content
  | 'sales'          // Sales
  | 'other'          // Other
```

### FormSubmissionPayload

```typescript
interface FormSubmissionPayload extends ClientSupportFormData {
  submittedAt: string  // ISO 8601 timestamp
  source: string       // 'client-support-page'
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Form field validation rejects invalid inputs

*For any* form field with validation rules, when an invalid value is provided (empty required field, invalid email format, invalid phone format), the Form_Validator should display an appropriate error message and prevent form submission.

**Validates: Requirements 5.1, 5.2, 5.3, 5.4**

### Property 2: Valid field clears error state

*For any* form field that was previously invalid, when a valid value is provided, the Form_Validator should remove the error message for that field.

**Validates: Requirements 5.5**

### Property 3: Form submission with valid data

*For any* valid form data, when submitted, the Support_Form should send the data to the API endpoint, display a loading state, and upon success, display a success message and clear all form fields.

**Validates: Requirements 6.1, 6.5**

### Property 4: Accessibility labels for all form inputs

*For any* form input or interactive element, it should have either a visible label element properly associated with it or an ARIA label for screen reader accessibility.

**Validates: Requirements 10.1, 10.2**

### Property 5: Error announcements for screen readers

*For any* validation error that occurs, the Form_Validator should include ARIA live regions or appropriate ARIA attributes so that errors are announced to screen readers.

**Validates: Requirements 10.4**

### Property 6: Color contrast compliance

*For all* text elements on the Client_Support_Page, the color contrast ratio between text and background should meet WCAG AA standards (minimum 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 10.5**

## Error Handling

### Client-Side Errors

1. **Validation Errors**:
   - Display inline error messages below each field
   - Use red color scheme (red-600 text, red-50 background)
   - Include ARIA attributes for screen readers
   - Prevent form submission until resolved

2. **Network Errors**:
   - Display error message above form
   - Provide retry button
   - Maintain form data (don't clear on error)
   - Log error to console for debugging

3. **Timeout Errors**:
   - Set 30-second timeout for API calls
   - Display timeout message with retry option
   - Suggest alternative contact methods (phone)

### Server-Side Errors

1. **Validation Errors (400)**:
   - Return field-specific error messages
   - Client displays errors inline
   - Log validation failures for monitoring

2. **Server Errors (500)**:
   - Return generic error message
   - Log full error details server-side
   - Display user-friendly message client-side
   - Provide alternative contact methods

3. **Rate Limiting**:
   - Implement rate limiting (e.g., 5 submissions per IP per hour)
   - Return 429 status with retry-after header
   - Display message: "Too many requests. Please try again later."

## Testing Strategy

### Unit Tests

Unit tests focus on specific examples, edge cases, and error conditions. They complement property-based tests by validating concrete scenarios.

**Component Tests**:
- Client Support Page renders correctly
- Contact information displays all required content
- Form renders all required fields
- Dropdown contains all inquiry type options
- Legal disclaimer text is present
- Dashboard link is present with correct href

**Validation Tests**:
- Empty required fields trigger errors
- Invalid email formats trigger errors
- Invalid phone formats trigger errors
- Valid inputs pass validation
- Error messages clear when fields become valid

**Form Submission Tests**:
- Successful submission shows success message
- Failed submission shows error message
- Loading state displays during submission
- Form clears after successful submission
- Submit button is disabled during submission

**Responsive Tests**:
- Two-column layout on desktop (lg breakpoint)
- Single-column layout on mobile
- Contact info appears above form on mobile

**Accessibility Tests**:
- All form inputs have associated labels
- ARIA labels present on interactive elements
- Keyboard navigation works (tab order)
- Error messages have aria-live regions
- Color contrast meets WCAG AA standards

### Property-Based Tests

Property-based tests verify universal properties across many generated inputs. Each test should run a minimum of 100 iterations.

**Test Library**: fast-check (for TypeScript/JavaScript)

**Property Test 1: Form field validation rejects invalid inputs**
- Generate random invalid form data (empty strings, invalid emails, invalid phones)
- Submit form
- Assert: Validation errors are displayed, submission is prevented
- **Tag**: Feature: client-support-page, Property 1: Form field validation rejects invalid inputs

**Property Test 2: Valid field clears error state**
- Generate random form field
- Set invalid value, trigger validation
- Set valid value, trigger validation
- Assert: Error message is removed
- **Tag**: Feature: client-support-page, Property 2: Valid field clears error state

**Property Test 3: Form submission with valid data**
- Generate random valid form data
- Submit form
- Assert: API called with correct data, success message shown, form cleared
- **Tag**: Feature: client-support-page, Property 3: Form submission with valid data

**Property Test 4: Accessibility labels for all form inputs**
- For each form input
- Assert: Has associated label or ARIA label
- **Tag**: Feature: client-support-page, Property 4: Accessibility labels for all form inputs

**Property Test 5: Error announcements for screen readers**
- Generate random validation error
- Trigger error
- Assert: Error has aria-live region or appropriate ARIA attributes
- **Tag**: Feature: client-support-page, Property 5: Error announcements for screen readers

**Property Test 6: Color contrast compliance**
- For each text element on page
- Calculate contrast ratio
- Assert: Meets WCAG AA standards (4.5:1 for normal, 3:1 for large)
- **Tag**: Feature: client-support-page, Property 6: Color contrast compliance

### Integration Tests

- End-to-end form submission flow
- API route handles valid submissions
- API route rejects invalid submissions
- Navigation from other pages to `/client-support`

### Visual Regression Tests

- Page layout at different breakpoints
- Form states (idle, validating, submitting, success, error)
- Animation states (if testing framework supports)

## Implementation Notes

### Styling Approach

Follow existing patterns from `demo-request-form.tsx`:
- Use Tailwind CSS utility classes
- Purple color scheme for primary actions (purple-600, purple-700)
- Gray backgrounds for inputs (gray-50 light, gray-900 dark)
- Green for success messages (green-50 bg, green-800 text)
- Red for error messages (red-50 bg, red-800 text)
- Consistent spacing with space-y-5 for form fields
- Rounded corners (rounded-lg)
- Focus rings (ring-2 ring-purple-500)

### Animation Configuration

Use Framer Motion with reduced motion support:
```typescript
const prefersReducedMotion = useReducedMotion()
const animationDuration = prefersReducedMotion ? 0.1 : 0.4
const easing = [0.4, 0, 0.2, 1] // cubic-bezier

// Staggered animations
const getFieldAnimation = (index: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: animationDuration,
    delay: index * 0.1,
    ease: easing,
  },
})
```

### Responsive Breakpoints

- **Mobile** (< 640px): Single column, full width
- **Tablet** (640px - 1023px): Single column, max-width container
- **Desktop** (≥ 1024px): Two columns (lg:grid-cols-2)

### Accessibility Checklist

- [ ] All form inputs have associated labels
- [ ] ARIA labels on all interactive elements
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Focus indicators visible on all interactive elements
- [ ] Error messages announced to screen readers (aria-live)
- [ ] Form validation errors have aria-invalid and aria-describedby
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works (tab order logical)
- [ ] Touch targets minimum 44x44px
- [ ] Screen reader only text for context (sr-only class)

### Performance Considerations

- Server Component for static content (contact info)
- Client Component only for interactive form
- Lazy load Framer Motion animations
- Optimize form validation (debounce on input, validate on blur)
- Use Next.js Image component for any images
- Minimize bundle size (tree-shake unused UI components)

### Security Considerations

- Server-side validation (never trust client)
- Rate limiting on API endpoint
- CSRF protection (Next.js handles this)
- Input sanitization before storing/displaying
- No sensitive data in client-side code
- HTTPS only (enforced by Next.js in production)
