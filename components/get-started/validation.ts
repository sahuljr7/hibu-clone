/**
 * Form validation schema using Zod
 * Validates: Requirements 4.1, 5.1, 5.2
 */

import * as z from 'zod'

/**
 * Zod schema for demo request form validation
 */
export const demoRequestFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name too long'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name too long'),
  
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email too long'),
  
  businessName: z.string()
    .min(1, 'Business name is required')
    .max(100, 'Business name too long'),
  
  businessPhone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number too long')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Invalid phone number format'),
})

/**
 * Type inference from schema
 */
export type DemoRequestFormData = z.infer<typeof demoRequestFormSchema>
