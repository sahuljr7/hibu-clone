'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

import { demoRequestFormSchema, type DemoRequestFormData } from './validation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Demo Request Form Component
 * Implements react-hook-form with zod validation
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5, 10.2
 */
export function DemoRequestForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const prefersReducedMotion = useReducedMotion()

  const form = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      businessName: '',
      businessPhone: '',
    },
  })

  const isSubmitting = form.formState.isSubmitting

  // Focus management: Focus first error field on validation failure
  // Validates: Requirements 11.1, 11.3
  useEffect(() => {
    const errors = form.formState.errors
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0] as keyof DemoRequestFormData
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      if (element instanceof HTMLElement) {
        element.focus()
      }
    }
  }, [form.formState.errors])

  // Animation configuration - respects reduced motion preference
  const animationDuration = prefersReducedMotion ? 0.1 : 0.4
  const easing = [0.4, 0, 0.2, 1] // cubic-bezier easing

  // Helper function to create staggered animation props
  const getFieldAnimation = (index: number) => {
    if (prefersReducedMotion) {
      return {}
    }
    return {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: {
        duration: animationDuration,
        delay: index * 0.1, // Stagger by 100ms
        ease: easing,
      },
      style: { willChange: 'opacity, transform' },
    }
  }

  async function onSubmit(data: DemoRequestFormData) {
    try {
      setSubmitStatus('idle')
      setErrorMessage('')

      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'get-started-2026',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Submission failed')
      }

      setSubmitStatus('success')
      form.reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      )
    }
  }

  return (
    <div className="w-full max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* First Name and Last Name - Side by side on desktop */}
          <motion.div 
            {...getFieldAnimation(0)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                const hasError = !!form.formState.errors.firstName
                return (
                  <FormItem>
                    <FormLabel className="sr-only">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-300 focus:scale-[1.02] focus:shadow-md touch-manipulation"
                        aria-label="First name"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? 'firstName-error' : undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="firstName-error" role="alert" />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                const hasError = !!form.formState.errors.lastName
                return (
                  <FormItem>
                    <FormLabel className="sr-only">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-300 focus:scale-[1.02] focus:shadow-md touch-manipulation"
                        aria-label="Last name"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? 'lastName-error' : undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="lastName-error" role="alert" />
                  </FormItem>
                )
              }}
            />
          </motion.div>

          {/* Email - Full width */}
          <motion.div {...getFieldAnimation(1)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const hasError = !!form.formState.errors.email
                return (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-300 focus:scale-[1.02] focus:shadow-md touch-manipulation"
                        aria-label="Email address"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? 'email-error' : undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="email-error" role="alert" />
                  </FormItem>
                )
              }}
            />
          </motion.div>

          {/* Business Name - Full width */}
          <motion.div {...getFieldAnimation(2)}>
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => {
                const hasError = !!form.formState.errors.businessName
                return (
                  <FormItem>
                    <FormLabel className="sr-only">Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Business Name"
                        className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-300 focus:scale-[1.02] focus:shadow-md touch-manipulation"
                        aria-label="Business name"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? 'businessName-error' : undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="businessName-error" role="alert" />
                  </FormItem>
                )
              }}
            />
          </motion.div>

          {/* Business Phone - Full width */}
          <motion.div {...getFieldAnimation(3)}>
            <FormField
              control={form.control}
              name="businessPhone"
              render={({ field }) => {
                const hasError = !!form.formState.errors.businessPhone
                return (
                  <FormItem>
                    <FormLabel className="sr-only">Business Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Business Phone"
                        className="h-12 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-lg focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-300 focus:scale-[1.02] focus:shadow-md touch-manipulation"
                        aria-label="Business phone"
                        aria-required="true"
                        aria-invalid={hasError}
                        aria-describedby={hasError ? 'businessPhone-error' : undefined}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="businessPhone-error" role="alert" />
                  </FormItem>
                )
              }}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div {...getFieldAnimation(4)}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none touch-manipulation"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Request a demo'
              )}
            </Button>
          </motion.div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              role="status"
              aria-live="polite"
              style={{ willChange: 'opacity, transform' }}
            >
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                Thank you! Your demo request has been submitted successfully. We'll be in touch soon.
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              role="alert"
              aria-live="assertive"
              style={{ willChange: 'opacity, transform' }}
            >
              <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                {errorMessage}
              </p>
            </motion.div>
          )}

          {/* Disclaimer Text */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              By submitting this form, you agree to our{' '}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline font-medium transition-all duration-300 touch-manipulation inline-block min-h-[44px] flex items-center"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                href="/california-privacy-rights"
                className="text-primary hover:underline font-medium transition-all duration-300 touch-manipulation inline-block min-h-[44px] flex items-center"
              >
                California Privacy Rights Notice
              </Link>
              .
            </p>
            <p>
              Already a client?{' '}
              <Link
                href="/client-support"
                className="text-primary hover:underline font-medium transition-all duration-300 touch-manipulation inline-block min-h-[44px] flex items-center"
              >
                Contact client support
              </Link>
              .
            </p>
          </div>

          {/* Screen reader announcement for form status */}
          <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
            {submitStatus === 'success' && 'Form submitted successfully'}
            {submitStatus === 'error' && 'Form submission failed. Please try again.'}
          </div>
        </form>
      </Form>
    </div>
  )
}
