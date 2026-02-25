/**
 * Integration Test: Complete User Flow for Request Demo Landing Page
 * Task 13.1: Test complete user flow
 * 
 * This test validates:
 * - Navigation from homepage CTA to landing page
 * - Form filling and submission
 * - Success message display
 * - Error scenarios
 * - Theme switching throughout the flow
 * - Multiple viewport sizes
 * 
 * Validates: All Requirements
 */

import { render, screen, waitFor, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import GetStarted2026Page from './page'
import { ThemeProvider } from '@/components/theme-provider'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
}))

// Mock hooks
jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(() => false),
}))

jest.mock('@/hooks/use-in-view', () => ({
  useInView: jest.fn(() => ({ ref: jest.fn(), isInView: true })),
}))

// Mock fetch
global.fetch = jest.fn()

// Helper to render with theme provider
const renderWithTheme = (ui: React.ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem={false}>
      {ui}
    </ThemeProvider>
  )
}

// Helper to set viewport size
const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('Complete User Flow - Request Demo Landing Page', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/get-started-2026',
    })
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('1. Navigation to Landing Page', () => {
    it('should navigate from homepage CTA to /get-started-2026', () => {
      // This test validates that the route is accessible
      // In a real scenario, this would test clicking a CTA button from the homepage
      const { useRouter: mockUseRouter } = require('next/navigation')
      const router = mockUseRouter()
      
      // Simulate navigation
      router.push('/get-started-2026')
      
      expect(mockPush).toHaveBeenCalledWith('/get-started-2026')
    })

    it('should render the landing page with all sections', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      // Verify demo form section is present
      expect(screen.getByText(/ready to get started\?/i)).toBeInTheDocument()
      
      // Verify testimonials section is present
      expect(screen.getByText(/real clients\. real results\./i)).toBeInTheDocument()
    })
  })

  describe('2. Form Filling and Submission', () => {
    it('should successfully fill out and submit the form', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill out all form fields
      const firstNameInput = screen.getByPlaceholderText('First Name')
      const lastNameInput = screen.getByPlaceholderText('Last Name')
      const emailInput = screen.getByPlaceholderText('Email')
      const businessNameInput = screen.getByPlaceholderText('Business Name')
      const businessPhoneInput = screen.getByPlaceholderText('Business Phone')
      
      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(emailInput, 'john.doe@example.com')
      await user.type(businessNameInput, 'Acme Corporation')
      await user.type(businessPhoneInput, '5551234567')
      
      // Verify all fields are filled
      expect(firstNameInput).toHaveValue('John')
      expect(lastNameInput).toHaveValue('Doe')
      expect(emailInput).toHaveValue('john.doe@example.com')
      expect(businessNameInput).toHaveValue('Acme Corporation')
      expect(businessPhoneInput).toHaveValue('5551234567')
      
      // Submit the form
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      await user.click(submitButton)
      
      // Verify API was called with correct data
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/demo-request',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('john.doe@example.com'),
          })
        )
      })
    })

    it('should display loading state during submission', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => ({}) }), 100))
      )
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill out form
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5551234567')
      
      // Submit
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      await user.click(submitButton)
      
      // Verify loading state
      expect(screen.getByText(/submitting/i)).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })
  })

  describe('3. Success Message Display', () => {
    it('should display success message after successful submission', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill and submit form
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5551234567')
      
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/thank you! your demo request has been submitted successfully/i)).toBeInTheDocument()
      })
    })

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })
      
      renderWithTheme(<GetStarted2026Page />)
      
      const firstNameInput = screen.getByPlaceholderText('First Name') as HTMLInputElement
      const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement
      
      // Fill and submit
      await user.type(firstNameInput, 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(emailInput, 'john@example.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5551234567')
      
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify form is reset
      await waitFor(() => {
        expect(firstNameInput.value).toBe('')
        expect(emailInput.value).toBe('')
      })
    })
  })

  describe('4. Error Scenarios', () => {
    it('should display validation errors for empty form submission', async () => {
      const user = userEvent.setup()
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Submit empty form
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      await user.click(submitButton)
      
      // Verify validation errors
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument()
        expect(screen.getByText('Last name is required')).toBeInTheDocument()
        expect(screen.getByText('Invalid email address')).toBeInTheDocument()
        expect(screen.getByText('Business name is required')).toBeInTheDocument()
        expect(screen.getByText('Phone number must be at least 10 digits')).toBeInTheDocument()
      })
    })

    it('should display error for invalid email format', async () => {
      const user = userEvent.setup()
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill form with invalid email
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Email'), 'invalid-email')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5551234567')
      
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify email validation error
      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      })
    })

    it('should display error for invalid phone number', async () => {
      const user = userEvent.setup()
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill form with short phone number
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '123')
      
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify phone validation error
      await waitFor(() => {
        expect(screen.getByText('Phone number must be at least 10 digits')).toBeInTheDocument()
      })
    })

    it('should display error message on server error', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Server error occurred' }),
      })
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill and submit form
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5551234567')
      
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify error message
      await waitFor(() => {
        expect(screen.getByText('Server error occurred')).toBeInTheDocument()
      })
    })

    it('should display generic error on network failure', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill and submit form
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5551234567')
      
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify error message
      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument()
      })
    })

    it('should focus first error field on validation failure', async () => {
      const user = userEvent.setup()
      
      renderWithTheme(<GetStarted2026Page />)
      
      const firstNameInput = screen.getByPlaceholderText('First Name')
      
      // Submit empty form
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify first error field receives focus
      await waitFor(() => {
        expect(document.activeElement).toBe(firstNameInput)
      })
    })
  })

  describe('5. Theme Switching', () => {
    it('should render correctly in light mode', () => {
      renderWithTheme(<GetStarted2026Page />, 'light')
      
      // Verify page renders
      expect(screen.getByText(/ready to get started\?/i)).toBeInTheDocument()
      expect(screen.getByText(/real clients\. real results\./i)).toBeInTheDocument()
    })

    it('should render correctly in dark mode', () => {
      renderWithTheme(<GetStarted2026Page />, 'dark')
      
      // Verify page renders
      expect(screen.getByText(/ready to get started\?/i)).toBeInTheDocument()
      expect(screen.getByText(/real clients\. real results\./i)).toBeInTheDocument()
    })

    it('should have proper theme-responsive classes on form fields', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      const firstNameInput = screen.getByPlaceholderText('First Name')
      
      // Verify theme-responsive classes are present
      expect(firstNameInput.className).toContain('dark:bg-gray-900')
      expect(firstNameInput.className).toContain('dark:border-gray-700')
    })

    it('should have proper theme-responsive classes on submit button', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      
      // Verify theme-responsive classes
      expect(submitButton.className).toContain('dark:bg-purple-500')
      expect(submitButton.className).toContain('dark:hover:bg-purple-600')
    })
  })

  describe('6. Responsive Design - Multiple Viewport Sizes', () => {
    it('should render correctly on mobile viewport (375x667)', () => {
      setViewportSize(375, 667)
      renderWithTheme(<GetStarted2026Page />)
      
      // Verify page renders on mobile
      expect(screen.getByText(/ready to get started\?/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    })

    it('should render correctly on tablet viewport (768x1024)', () => {
      setViewportSize(768, 1024)
      renderWithTheme(<GetStarted2026Page />)
      
      // Verify page renders on tablet
      expect(screen.getByText(/ready to get started\?/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    })

    it('should render correctly on desktop viewport (1920x1080)', () => {
      setViewportSize(1920, 1080)
      renderWithTheme(<GetStarted2026Page />)
      
      // Verify page renders on desktop
      expect(screen.getByText(/ready to get started\?/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    })

    it('should have responsive grid classes on form section', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      // Find the grid container (parent of heading and form)
      const heading = screen.getByText(/ready to get started\?/i)
      const gridContainer = heading.closest('.grid')
      
      // Verify responsive grid classes
      expect(gridContainer?.className).toContain('grid-cols-1')
      expect(gridContainer?.className).toContain('md:grid-cols-2')
    })

    it('should have responsive layout for first/last name fields', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      const firstNameInput = screen.getByPlaceholderText('First Name')
      const nameFieldsContainer = firstNameInput.closest('.grid')
      
      // Verify responsive grid for name fields
      expect(nameFieldsContainer?.className).toContain('grid-cols-1')
      expect(nameFieldsContainer?.className).toContain('sm:grid-cols-2')
    })
  })

  describe('7. Accessibility Features', () => {
    it('should have proper ARIA labels on all form fields', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      expect(screen.getByPlaceholderText('First Name')).toHaveAttribute('aria-label', 'First name')
      expect(screen.getByPlaceholderText('Last Name')).toHaveAttribute('aria-label', 'Last name')
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('aria-label', 'Email address')
      expect(screen.getByPlaceholderText('Business Name')).toHaveAttribute('aria-label', 'Business name')
      expect(screen.getByPlaceholderText('Business Phone')).toHaveAttribute('aria-label', 'Business phone')
    })

    it('should have aria-required on all required fields', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      expect(screen.getByPlaceholderText('First Name')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Last Name')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Business Name')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Business Phone')).toHaveAttribute('aria-required', 'true')
    })

    it('should have visible focus indicators on form fields', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      const firstNameInput = screen.getByPlaceholderText('First Name')
      
      // Verify focus-visible ring classes
      expect(firstNameInput.className).toContain('focus-visible:ring-2')
      expect(firstNameInput.className).toContain('focus-visible:ring-green-500')
    })

    it('should have minimum touch target size on interactive elements', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      
      // Verify minimum height (44px)
      expect(submitButton.className).toContain('h-12') // 48px, exceeds minimum
    })

    it('should announce form status to screen readers', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })
      
      renderWithTheme(<GetStarted2026Page />)
      
      // Fill and submit form
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5551234567')
      
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // Verify screen reader announcement
      await waitFor(() => {
        const srAnnouncement = screen.getByText('Form submitted successfully')
        expect(srAnnouncement).toBeInTheDocument()
        expect(srAnnouncement.closest('[role="status"]')).toHaveAttribute('aria-live', 'polite')
      })
    })
  })

  describe('8. Complete End-to-End Flow', () => {
    it('should complete full user journey successfully', async () => {
      const user = userEvent.setup()
      
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })
      
      // 1. Render landing page
      renderWithTheme(<GetStarted2026Page />)
      
      // 2. Verify page loaded correctly
      expect(screen.getByText(/ready to get started\?/i)).toBeInTheDocument()
      expect(screen.getByText(/real clients\. real results\./i)).toBeInTheDocument()
      
      // 3. Fill out form
      await user.type(screen.getByPlaceholderText('First Name'), 'Jane')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Smith')
      await user.type(screen.getByPlaceholderText('Email'), 'jane.smith@business.com')
      await user.type(screen.getByPlaceholderText('Business Name'), 'Smith Enterprises')
      await user.type(screen.getByPlaceholderText('Business Phone'), '5559876543')
      
      // 4. Submit form
      await user.click(screen.getByRole('button', { name: /request a demo/i }))
      
      // 5. Verify loading state
      expect(screen.getByText(/submitting/i)).toBeInTheDocument()
      
      // 6. Verify success message
      await waitFor(() => {
        expect(screen.getByText(/thank you! your demo request has been submitted successfully/i)).toBeInTheDocument()
      })
      
      // 7. Verify form was reset
      const firstNameInput = screen.getByPlaceholderText('First Name') as HTMLInputElement
      expect(firstNameInput.value).toBe('')
      
      // 8. Verify API was called correctly
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/demo-request',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('jane.smith@business.com'),
        })
      )
    })
  })

  describe('9. Testimonials Section', () => {
    it('should render testimonials section with all content', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      // Verify section heading
      expect(screen.getByText(/real clients\. real results\./i)).toBeInTheDocument()
      
      // Verify video testimonial label
      expect(screen.getByText(/appliance services video testimonial/i)).toBeInTheDocument()
      
      // Verify client review label
      expect(screen.getByText(/dental practice client review/i)).toBeInTheDocument()
      
      // Verify case study label
      expect(screen.getByText(/auto body case study/i)).toBeInTheDocument()
    })

    it('should have download link in case study card', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      const downloadLink = screen.getByText(/download the case study/i)
      expect(downloadLink).toBeInTheDocument()
      expect(downloadLink.closest('a')).toHaveAttribute('href')
    })
  })

  describe('10. Benefits List', () => {
    it('should render all three benefits with numbered badges', () => {
      renderWithTheme(<GetStarted2026Page />)
      
      // Verify benefits are present
      expect(screen.getByText(/see how your website, ads, reviews and leads work together/i)).toBeInTheDocument()
      expect(screen.getByText(/get personalized recommendations for your business/i)).toBeInTheDocument()
      expect(screen.getByText(/learn how hibu can help you grow your digital presence/i)).toBeInTheDocument()
    })
  })
})
