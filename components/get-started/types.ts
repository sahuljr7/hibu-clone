/**
 * TypeScript interfaces for the Request Demo Landing Page
 */

/**
 * Form data structure for demo request form
 */
export interface DemoRequestFormData {
  firstName: string
  lastName: string
  email: string
  businessName: string
  businessPhone: string
}

/**
 * Form state management
 */
export interface FormState {
  isSubmitting: boolean
  submitStatus: 'idle' | 'success' | 'error'
  errorMessage?: string
}

/**
 * Complete demo request data including metadata
 */
export interface DemoRequestData extends DemoRequestFormData {
  submittedAt: Date
  source: 'get-started-2026'
}
