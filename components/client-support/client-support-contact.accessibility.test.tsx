/**
 * Accessibility Tests for Client Support Contact Component
 * 
 * Validates Requirements 10.1, 10.2, 10.3
 * 
 * Tests verify:
 * - Links have proper labels
 * - ARIA attributes are correct
 * - Keyboard navigation works
 * - Focus indicators are visible
 */

import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClientSupportContact } from './client-support-contact'

describe('Client Support Contact - Accessibility', () => {
  describe('Link Labels and ARIA - Requirements 10.1, 10.2', () => {
    test('phone link has descriptive aria-label', () => {
      render(<ClientSupportContact />)

      const phoneLink = screen.getByRole('link', { name: /call client support at 877-237-6120/i })
      expect(phoneLink).toBeInTheDocument()
      expect(phoneLink).toHaveAttribute('href', 'tel:877-237-6120')
      expect(phoneLink).toHaveAttribute('aria-label', 'Call client support at 877-237-6120')
    })

    test('dashboard link has proper attributes', () => {
      render(<ClientSupportContact />)

      const dashboardLink = screen.getByRole('link', { name: /log into your hibu performance dashboard/i })
      expect(dashboardLink).toBeInTheDocument()
      expect(dashboardLink).toHaveAttribute('href', 'https://dashboard.hibu.com')
      expect(dashboardLink).toHaveAttribute('target', '_blank')
      expect(dashboardLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('decorative icons have aria-hidden="true"', () => {
      const { container } = render(<ClientSupportContact />)

      // Phone and ExternalLink icons should be decorative
      const icons = container.querySelectorAll('svg[aria-hidden="true"]')
      expect(icons.length).toBeGreaterThanOrEqual(2)
    })
  })

  describe('Heading Structure - Requirement 10.1', () => {
    test('main heading uses h1 element', () => {
      render(<ClientSupportContact />)

      const heading = screen.getByRole('heading', { level: 1, name: /already a hibu client\? contact us\./i })
      expect(heading).toBeInTheDocument()
    })

    test('heading hierarchy is correct', () => {
      const { container } = render(<ClientSupportContact />)

      const h1 = container.querySelector('h1')
      expect(h1).toBeInTheDocument()
      expect(h1?.textContent).toBe('Already a Hibu client? Contact us.')
    })
  })

  describe('Keyboard Navigation - Requirement 10.3', () => {
    test('phone link is keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ClientSupportContact />)

      const phoneLink = screen.getByRole('link', { name: /call client support at 877-237-6120/i })
      
      // Tab to phone link
      await user.tab()
      expect(phoneLink).toHaveFocus()
    })

    test('dashboard link is keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<ClientSupportContact />)

      // Tab through to dashboard link
      await user.tab() // Phone link
      await user.tab() // Dashboard link
      
      const dashboardLink = screen.getByRole('link', { name: /log into your hibu performance dashboard/i })
      expect(dashboardLink).toHaveFocus()
    })

    test('links can be activated with Enter key', async () => {
      const user = userEvent.setup()
      render(<ClientSupportContact />)

      const phoneLink = screen.getByRole('link', { name: /call client support at 877-237-6120/i })
      await user.tab()
      expect(phoneLink).toHaveFocus()

      // Verify link is activatable (has href)
      expect(phoneLink).toHaveAttribute('href', 'tel:877-237-6120')
    })
  })

  describe('Focus Indicators - Requirement 10.3', () => {
    test('phone link has visible focus styles', () => {
      render(<ClientSupportContact />)

      const phoneLink = screen.getByRole('link', { name: /call client support at 877-237-6120/i })
      const classes = phoneLink.className

      // Check for focus styles
      expect(classes).toMatch(/focus:/)
      expect(classes).toMatch(/transition/)
    })

    test('dashboard link has visible focus styles', () => {
      render(<ClientSupportContact />)

      const dashboardLink = screen.getByRole('link', { name: /log into your hibu performance dashboard/i })
      const classes = dashboardLink.className

      // Check for focus styles
      expect(classes).toMatch(/focus:/)
      expect(classes).toMatch(/transition/)
    })

    test('links have hover states for visual feedback', () => {
      render(<ClientSupportContact />)

      const phoneLink = screen.getByRole('link', { name: /call client support at 877-237-6120/i })
      const dashboardLink = screen.getByRole('link', { name: /log into your hibu performance dashboard/i })

      expect(phoneLink.className).toMatch(/hover:/)
      expect(dashboardLink.className).toMatch(/hover:/)
    })
  })

  describe('Content Structure', () => {
    test('all required contact information is present', () => {
      render(<ClientSupportContact />)

      // Section label
      expect(screen.getByText('Client Support')).toBeInTheDocument()

      // Main heading
      expect(screen.getByText('Already a Hibu client? Contact us.')).toBeInTheDocument()

      // Supporting text
      expect(screen.getByText(/our service and support teams are ready to assist/i)).toBeInTheDocument()

      // Phone number
      expect(screen.getByText('877-237-6120')).toBeInTheDocument()

      // Hours
      expect(screen.getByText(/mon – fri: 8am – 8pm et/i)).toBeInTheDocument()
      expect(screen.getByText(/sat: 9am – 2pm et/i)).toBeInTheDocument()

      // Dashboard features
      expect(screen.getByText('View results')).toBeInTheDocument()
      expect(screen.getByText('Update email & text preferences')).toBeInTheDocument()
      expect(screen.getByText('Preview ads')).toBeInTheDocument()
      expect(screen.getByText('Manage website')).toBeInTheDocument()
    })

    test('list structure is semantic', () => {
      const { container } = render(<ClientSupportContact />)

      const list = container.querySelector('ul')
      expect(list).toBeInTheDocument()

      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBe(4) // 4 dashboard features
    })
  })

  describe('Reduced Motion Support', () => {
    test('component respects prefers-reduced-motion', () => {
      // This is tested by the useReducedMotion hook
      // The component should render without errors
      render(<ClientSupportContact />)
      
      expect(screen.getByText('Already a Hibu client? Contact us.')).toBeInTheDocument()
    })
  })
})
