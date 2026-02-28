/**
 * Form validation schema using Zod for Client Support Form
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 5.2, 5.3
 */

import * as z from 'zod'

/**
 * Zod schema for client support form validation
 */
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

/**
 * Type inference from schema
 */
export type ClientSupportFormData = z.infer<typeof clientSupportFormSchema>
