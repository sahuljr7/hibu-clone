import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { DemoRequestForm } from './demo-request-form'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Mock the hooks
jest.mock('@/hooks/use-reduced-motion')

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock fetch
global.fetch = jest.fn()

describe('DemoRequestForm', () => {
  const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseReducedMotion.mockReturnValue(false)
  })

  it('renders all form fields', () => {
    render(<DemoRequestForm />)
    
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Business Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Business Phone')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<DemoRequestForm />)
    
    expect(screen.getByRole('button', { name: /request a demo/i })).toBeInTheDocument()
  })

  it('displays validation errors when submitting empty form', async () => {
    render(<DemoRequestForm />)
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      expect(screen.getByText('Business name is required')).toBeInTheDocument()
      expect(screen.getByText('Phone number must be at least 10 digits')).toBeInTheDocument()
    })
  })

  it('displays error for invalid email format', async () => {
    render(<DemoRequestForm />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    })
  })

  it('displays loading state during submission', async () => {
    ;(global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: () => ({}) }), 100))
    )
    
    render(<DemoRequestForm />)
    
    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'Acme Corp' } })
    fireEvent.change(screen.getByPlaceholderText('Business Phone'), { target: { value: '1234567890' } })
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    // Check for loading state
    expect(screen.getByText(/submitting/i)).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('displays success message on successful submission', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })
    
    render(<DemoRequestForm />)
    
    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'Acme Corp' } })
    fireEvent.change(screen.getByPlaceholderText('Business Phone'), { target: { value: '1234567890' } })
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/thank you! your demo request has been submitted successfully/i)).toBeInTheDocument()
    })
  })

  it('displays error message on failed submission', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Server error occurred' }),
    })
    
    render(<DemoRequestForm />)
    
    // Fill in all required fields
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'Acme Corp' } })
    fireEvent.change(screen.getByPlaceholderText('Business Phone'), { target: { value: '1234567890' } })
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Server error occurred')).toBeInTheDocument()
    })
  })

  it('resets form after successful submission', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })
    
    render(<DemoRequestForm />)
    
    const firstNameInput = screen.getByPlaceholderText('First Name') as HTMLInputElement
    const lastNameInput = screen.getByPlaceholderText('Last Name') as HTMLInputElement
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement
    
    // Fill in fields
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'Acme Corp' } })
    fireEvent.change(screen.getByPlaceholderText('Business Phone'), { target: { value: '1234567890' } })
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(firstNameInput.value).toBe('')
      expect(lastNameInput.value).toBe('')
      expect(emailInput.value).toBe('')
    })
  })

  it('includes disclaimer text with links', () => {
    render(<DemoRequestForm />)
    
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument()
    expect(screen.getByText(/california privacy rights notice/i)).toBeInTheDocument()
    expect(screen.getByText(/already a client/i)).toBeInTheDocument()
  })

  it('has proper ARIA attributes for accessibility', () => {
    render(<DemoRequestForm />)
    
    const firstNameInput = screen.getByPlaceholderText('First Name')
    expect(firstNameInput).toHaveAttribute('aria-label', 'First name')
    expect(firstNameInput).toHaveAttribute('aria-required', 'true')
    expect(firstNameInput).toHaveAttribute('aria-invalid', 'false')
    
    const emailInput = screen.getByPlaceholderText('Email')
    expect(emailInput).toHaveAttribute('aria-label', 'Email address')
    expect(emailInput).toHaveAttribute('aria-required', 'true')
    expect(emailInput).toHaveAttribute('aria-invalid', 'false')
    
    const businessNameInput = screen.getByPlaceholderText('Business Name')
    expect(businessNameInput).toHaveAttribute('aria-label', 'Business name')
    expect(businessNameInput).toHaveAttribute('aria-required', 'true')
    expect(businessNameInput).toHaveAttribute('aria-invalid', 'false')
    
    const businessPhoneInput = screen.getByPlaceholderText('Business Phone')
    expect(businessPhoneInput).toHaveAttribute('aria-label', 'Business phone')
    expect(businessPhoneInput).toHaveAttribute('aria-required', 'true')
    expect(businessPhoneInput).toHaveAttribute('aria-invalid', 'false')
  })

  it('sets aria-invalid and aria-describedby on fields with errors', async () => {
    render(<DemoRequestForm />)
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      const firstNameInput = screen.getByPlaceholderText('First Name')
      expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
      expect(firstNameInput).toHaveAttribute('aria-describedby', 'firstName-error')
      
      const emailInput = screen.getByPlaceholderText('Email')
      expect(emailInput).toHaveAttribute('aria-invalid', 'true')
      expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
    })
  })

  it('has role="alert" on error messages', async () => {
    render(<DemoRequestForm />)
    
    const submitButton = screen.getByRole('button', { name: /request a demo/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      const errorMessages = screen.getAllByRole('alert')
      expect(errorMessages.length).toBeGreaterThan(0)
    })
  })
})

  describe('Keyboard Navigation', () => {
    it('allows keyboard navigation through all form fields', () => {
      render(<DemoRequestForm />)
      
      const firstNameInput = screen.getByPlaceholderText('First Name')
      const lastNameInput = screen.getByPlaceholderText('Last Name')
      const emailInput = screen.getByPlaceholderText('Email')
      const businessNameInput = screen.getByPlaceholderText('Business Name')
      const businessPhoneInput = screen.getByPlaceholderText('Business Phone')
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      
      // All interactive elements should be keyboard accessible (no tabIndex=-1)
      expect(firstNameInput).not.toHaveAttribute('tabindex', '-1')
      expect(lastNameInput).not.toHaveAttribute('tabindex', '-1')
      expect(emailInput).not.toHaveAttribute('tabindex', '-1')
      expect(businessNameInput).not.toHaveAttribute('tabindex', '-1')
      expect(businessPhoneInput).not.toHaveAttribute('tabindex', '-1')
      expect(submitButton).not.toHaveAttribute('tabindex', '-1')
    })

    it('has visible focus indicators on all form fields', () => {
      render(<DemoRequestForm />)
      
      const firstNameInput = screen.getByPlaceholderText('First Name')
      const lastNameInput = screen.getByPlaceholderText('Last Name')
      const emailInput = screen.getByPlaceholderText('Email')
      const businessNameInput = screen.getByPlaceholderText('Business Name')
      const businessPhoneInput = screen.getByPlaceholderText('Business Phone')
      
      // Check that focus-visible ring classes are present
      expect(firstNameInput.className).toContain('focus-visible:ring-2')
      expect(firstNameInput.className).toContain('focus-visible:ring-green-500')
      expect(lastNameInput.className).toContain('focus-visible:ring-2')
      expect(emailInput.className).toContain('focus-visible:ring-2')
      expect(businessNameInput.className).toContain('focus-visible:ring-2')
      expect(businessPhoneInput.className).toContain('focus-visible:ring-2')
    })

    it('focuses first error field on validation failure', async () => {
      render(<DemoRequestForm />)
      
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      const firstNameInput = screen.getByPlaceholderText('First Name')
      
      // Submit empty form
      fireEvent.click(submitButton)
      
      // Wait for validation and focus management
      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument()
      })
      
      // First error field should receive focus
      await waitFor(() => {
        expect(document.activeElement).toBe(firstNameInput)
      })
    })

    it('focuses email field when email validation fails', async () => {
      render(<DemoRequestForm />)
      
      // Fill in all fields except email with valid data
      fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } })
      fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } })
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid' } })
      fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'Acme' } })
      fireEvent.change(screen.getByPlaceholderText('Business Phone'), { target: { value: '1234567890' } })
      
      const submitButton = screen.getByRole('button', { name: /request a demo/i })
      const emailInput = screen.getByPlaceholderText('Email')
      
      fireEvent.click(submitButton)
      
      // Wait for validation
      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument()
      })
      
      // Email field should receive focus
      await waitFor(() => {
        expect(document.activeElement).toBe(emailInput)
      })
    })

    it('allows form submission with Enter key', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      })
      
      render(<DemoRequestForm />)
      
      // Fill in all required fields
      fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } })
      fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } })
      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } })
      fireEvent.change(screen.getByPlaceholderText('Business Name'), { target: { value: 'Acme Corp' } })
      
      const businessPhoneInput = screen.getByPlaceholderText('Business Phone')
      fireEvent.change(businessPhoneInput, { target: { value: '1234567890' } })
      
      // Press Enter key on the last field
      fireEvent.keyDown(businessPhoneInput, { key: 'Enter', code: 'Enter' })
      
      await waitFor(() => {
        expect(screen.getByText(/thank you! your demo request has been submitted successfully/i)).toBeInTheDocument()
      })
    })
  })
})
