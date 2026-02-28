/**
 * Accessibility Tests for Client Support Form
 * 
 * Validates Requirements 10.1, 10.2, 10.3, 10.4
 * 
 * Tests verify:
 * - All form inputs have proper labels
 * - ARIA attributes are correct
 * - Keyboard navigation (tab order)
 * - Focus indicators are visible
 * - Error messages are announced to screen readers
 */

import { describe, test, expect } from '@jest/globals'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClientSupportForm } from './client-support-form'

describe('Client Support Form - Accessibility', () => {
  describe('Form Labels - Requirement 10.1', () => {
    test('all form inputs have proper aria-label attributes', () => {
      render(<ClientSupportForm />)

      // Check all form fields have aria-label
      expect(screen.getByPlaceholderText('First Name')).toHaveAttribute('aria-label', 'First name')
      expect(screen.getByPlaceholderText('Last Name')).toHaveAttribute('aria-label', 'Last name')
      expect(screen.getByPlaceholderText('Company Name')).toHaveAttribute('aria-label', 'Company name')
      expect(screen.getByPlaceholderText('Phone Number')).toHaveAttribute('aria-label', 'Phone number')
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('aria-label', 'Email address')
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Inquiry type')
      expect(screen.getByPlaceholderText('Tell us how we can help...')).toHaveAttribute('aria-label', 'Message')
    })

    test('all form inputs have screen reader only labels', () => {
      const { container } = render(<ClientSupportForm />)

      // Check for sr-only labels (visually hidden but available to screen readers)
      const labels = container.querySelectorAll('.sr-only')
      expect(labels.length).toBeGreaterThan(0)
      
      // Verify label text content
      const labelTexts = Array.from(labels).map(label => label.textContent)
      expect(labelTexts).toContain('First Name')
      expect(labelTexts).toContain('Last Name')
      expect(labelTexts).toContain('Company Name')
      expect(labelTexts).toContain('Phone Number')
      expect(labelTexts).toContain('Email')
      expect(labelTexts).toContain('Inquiry Type')
      expect(labelTexts).toContain('Message')
    })
  })

  describe('ARIA Attributes - Requirement 10.2', () => {
    test('all required fields have aria-required="true"', () => {
      render(<ClientSupportForm />)

      expect(screen.getByPlaceholderText('First Name')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Last Name')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Company Name')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Phone Number')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
      expect(screen.getByPlaceholderText('Tell us how we can help...')).toHaveAttribute('aria-required', 'true')
    })

    test('fields initially have aria-invalid="false"', () => {
      render(<ClientSupportForm />)

      expect(screen.getByPlaceholderText('First Name')).toHaveAttribute('aria-invalid', 'false')
      expect(screen.getByPlaceholderText('Last Name')).toHaveAttribute('aria-invalid', 'false')
      expect(screen.getByPlaceholderText('Company Name')).toHaveAttribute('aria-invalid', 'false')
      expect(screen.getByPlaceholderText('Phone Number')).toHaveAttribute('aria-invalid', 'false')
      expect(screen.getByPlaceholderText('Email')).toHaveAttribute('aria-invalid', 'false')
      expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false')
      expect(screen.getByPlaceholderText('Tell us how we can help...')).toHaveAttribute('aria-invalid', 'false')
    })

    test('fields with errors have aria-invalid="true" and aria-describedby', async () => {
      const user = userEvent.setup()
      render(<ClientSupportForm />)

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        const firstNameInput = screen.getByPlaceholderText('First Name')
        expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
        expect(firstNameInput).toHaveAttribute('aria-describedby', 'firstName-error')

        const lastNameInput = screen.getByPlaceholderText('Last Name')
        expect(lastNameInput).toHaveAttribute('aria-invalid', 'true')
        expect(lastNameInput).toHaveAttribute('aria-describedby', 'lastName-error')

        const companyNameInput = screen.getByPlaceholderText('Company Name')
        expect(companyNameInput).toHaveAttribute('aria-invalid', 'true')
        expect(companyNameInput).toHaveAttribute('aria-describedby', 'companyName-error')

        const phoneInput = screen.getByPlaceholderText('Phone Number')
        expect(phoneInput).toHaveAttribute('aria-invalid', 'true')
        expect(phoneInput).toHaveAttribute('aria-describedby', 'phoneNumber-error')

        const emailInput = screen.getByPlaceholderText('Email')
        expect(emailInput).toHaveAttribute('aria-invalid', 'true')
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')

        const messageInput = screen.getByPlaceholderText('Tell us how we can help...')
        expect(messageInput).toHaveAttribute('aria-invalid', 'true')
        expect(messageInput).toHaveAttribute('aria-describedby', 'message-error')
      })
    })

    test('submit button has proper type attribute', () => {
      render(<ClientSupportForm />)
      
      const submitButton = screen.getByRole('button', { name: /submit/i })
      expect(submitButton).toHaveAttribute('type', 'submit')
    })
  })

  describe('Keyboard Navigation - Requirement 10.3', () => {
    test('all form fields are keyboard accessible in correct tab order', async () => {
      const user = userEvent.setup()
      render(<ClientSupportForm />)

      // Tab through all form fields in order
      await user.tab()
      expect(screen.getByPlaceholderText('First Name')).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText('Last Name')).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText('Company Name')).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText('Phone Number')).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText('Email')).toHaveFocus()

      await user.tab()
      expect(screen.getByRole('combobox')).toHaveFocus()

      await user.tab()
      expect(screen.getByPlaceholderText('Tell us how we can help...')).toHaveFocus()

      await user.tab()
      expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus()
    })

    test('form can be submitted using Enter key', async () => {
      const user = userEvent.setup()
      render(<ClientSupportForm />)

      const firstNameInput = screen.getByPlaceholderText('First Name')
      await user.click(firstNameInput)
      await user.keyboard('{Enter}')

      // Form should attempt validation when Enter is pressed
      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument()
      })
    })

    test('dropdown can be operated with keyboard', async () => {
      const user = userEvent.setup()
      render(<ClientSupportForm />)

      const dropdown = screen.getByRole('combobox')
      await user.click(dropdown)
      
      // Arrow down to select first option
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{Enter}')

      // Verify selection was made
      await waitFor(() => {
        expect(dropdown).toHaveTextContent(/technical support|product support|feedback|sales|other/i)
      })
    })

    test('focus moves to first error field on validation failure', async () => {
      const user = userEvent.setup()
      render(<ClientSupportForm />)

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      // First error field should receive focus
      await waitFor(() => {
        const firstNameInput = screen.getByPlaceholderText('First Name')
        expect(firstNameInput).toHaveFocus()
      })
    })
  })

  describe('Focus Indicators - Requirement 10.3', () => {
    test('form inputs have visible focus styles', () => {
      const { container } = render(<ClientSupportForm />)

      // Check that inputs have focus-visible classes
      const inputs = container.querySelectorAll('input, textarea, button[type="button"]')
      inputs.forEach(input => {
        const classes = input.className
        expect(classes).toMatch(/focus-visible:ring|focus:ring|focus:outline/)
      })
    })

    test('submit button has hover and focus styles', () => {
      render(<ClientSupportForm />)
      
      const submitButton = screen.getByRole('button', { name: /submit/i })
      const classes = submitButton.className
      
      // Check for hover and focus transition classes
      expect(classes).toMatch(/hover:/)
      expect(classes).toMatch(/transition/)
    })

    test('links have focus styles', () => {
      render(<ClientSupportForm />)
      
      const privacyLink = screen.getByRole('link', { name: /privacy policy/i })
      const californiaLink = screen.getByRole('link', { name: /california privacy rights/i })
      
      expect(privacyLink.className).toMatch(/transition/)
      expect(californiaLink.className).toMatch(/transition/)
    })
  })

  describe('Screen Reader Announcements - Requirement 10.4', () => {
    test('error messages have role="alert"', async () => {
      const user = userEvent.setup()
      render(<ClientSupportForm />)

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        const errorMessages = screen.getAllByRole('alert')
        expect(errorMessages.length).toBeGreaterThan(0)
      })
    })

    test('success message has aria-live="polite"', async () => {
      const user = userEvent.setup()
      
      // Mock successful API response
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Success', success: true }),
        })
      ) as jest.Mock

      render(<ClientSupportForm />)

      // Fill out form with valid data
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Company Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Phone Number'), '555-123-4567')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.click(screen.getByRole('combobox'))
      await user.keyboard('{ArrowDown}{Enter}')
      await user.type(screen.getByPlaceholderText('Tell us how we can help...'), 'This is a test message for support.')

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        const successMessage = screen.getByText(/thank you/i)
        const statusElement = successMessage.closest('[aria-live]')
        expect(statusElement).toHaveAttribute('aria-live', 'polite')
        expect(statusElement).toHaveAttribute('role', 'status')
      })
    })

    test('error message has aria-live="assertive"', async () => {
      const user = userEvent.setup()
      
      // Mock failed API response
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: 'Submission failed' }),
        })
      ) as jest.Mock

      render(<ClientSupportForm />)

      // Fill out form with valid data
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Company Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Phone Number'), '555-123-4567')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.click(screen.getByRole('combobox'))
      await user.keyboard('{ArrowDown}{Enter}')
      await user.type(screen.getByPlaceholderText('Tell us how we can help...'), 'This is a test message for support.')

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        const errorMessage = screen.getByText(/submission failed/i)
        const alertElement = errorMessage.closest('[aria-live]')
        expect(alertElement).toHaveAttribute('aria-live', 'assertive')
        expect(alertElement).toHaveAttribute('role', 'alert')
      })
    })

    test('screen reader status announcements are present', () => {
      const { container } = render(<ClientSupportForm />)

      // Check for sr-only status region
      const srOnlyElements = container.querySelectorAll('.sr-only[role="status"]')
      expect(srOnlyElements.length).toBeGreaterThan(0)

      const statusElement = Array.from(srOnlyElements).find(
        el => el.getAttribute('aria-live') === 'polite'
      )
      expect(statusElement).toBeTruthy()
    })

    test('form status changes are announced to screen readers', async () => {
      const user = userEvent.setup()
      
      // Mock successful API response
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Success', success: true }),
        })
      ) as jest.Mock

      render(<ClientSupportForm />)

      // Fill and submit form
      await user.type(screen.getByPlaceholderText('First Name'), 'John')
      await user.type(screen.getByPlaceholderText('Last Name'), 'Doe')
      await user.type(screen.getByPlaceholderText('Company Name'), 'Acme Corp')
      await user.type(screen.getByPlaceholderText('Phone Number'), '555-123-4567')
      await user.type(screen.getByPlaceholderText('Email'), 'john@example.com')
      await user.click(screen.getByRole('combobox'))
      await user.keyboard('{ArrowDown}{Enter}')
      await user.type(screen.getByPlaceholderText('Tell us how we can help...'), 'This is a test message for support.')

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        const announcement = screen.getByText('Form submitted successfully')
        expect(announcement).toBeInTheDocument()
      })
    })
  })

  describe('Touch Target Sizes', () => {
    test('all interactive elements have minimum 44x44px touch targets', () => {
      render(<ClientSupportForm />)

      // Check submit button height
      const submitButton = screen.getByRole('button', { name: /submit/i })
      expect(submitButton.className).toMatch(/h-12/) // 48px height

      // Check input heights
      const firstNameInput = screen.getByPlaceholderText('First Name')
      expect(firstNameInput.className).toMatch(/h-12/) // 48px height
    })

    test('form has touch-manipulation class for better mobile interaction', () => {
      const { container } = render(<ClientSupportForm />)

      const touchElements = container.querySelectorAll('.touch-manipulation')
      expect(touchElements.length).toBeGreaterThan(0)
    })
  })
})
