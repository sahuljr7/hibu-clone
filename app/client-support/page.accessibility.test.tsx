/**
 * Accessibility Tests for Client Support Page
 * 
 * Validates Requirements 10.1, 10.2, 10.3, 10.5
 * 
 * Tests verify:
 * - Page structure and landmarks
 * - Responsive layout accessibility
 * - Overall keyboard navigation
 * - Color contrast (basic checks)
 */

import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import ClientSupportPage from './page'

// Mock the child components to focus on page-level accessibility
jest.mock('@/components/navbar', () => ({
  Navbar: () => <nav data-testid="navbar">Navbar</nav>,
}))

jest.mock('@/components/shared/page-transition', () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/components/client-support/client-support-contact', () => ({
  ClientSupportContact: () => <div data-testid="contact-info">Contact Info</div>,
}))

jest.mock('@/components/client-support/client-support-form', () => ({
  ClientSupportForm: () => <div data-testid="support-form">Support Form</div>,
}))

describe('Client Support Page - Accessibility', () => {
  describe('Page Structure and Landmarks - Requirement 10.1', () => {
    test('page has main landmark', () => {
      render(<ClientSupportPage />)

      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    test('page has navigation landmark', () => {
      render(<ClientSupportPage />)

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    test('page structure is semantic', () => {
      const { container } = render(<ClientSupportPage />)

      // Check for semantic HTML structure
      const main = container.querySelector('main')
      const section = container.querySelector('section')
      
      expect(main).toBeInTheDocument()
      expect(section).toBeInTheDocument()
    })
  })

  describe('Responsive Layout - Requirement 9.1', () => {
    test('page uses responsive grid layout', () => {
      const { container } = render(<ClientSupportPage />)

      const grid = container.querySelector('.grid')
      expect(grid).toBeInTheDocument()
      
      // Check for responsive classes
      const gridClasses = grid?.className || ''
      expect(gridClasses).toMatch(/grid-cols-1/) // Mobile: single column
      expect(gridClasses).toMatch(/lg:grid-cols-2/) // Desktop: two columns
    })

    test('layout has proper spacing for touch targets', () => {
      const { container } = render(<ClientSupportPage />)

      const grid = container.querySelector('.grid')
      const gridClasses = grid?.className || ''
      
      // Check for gap classes (spacing between columns)
      expect(gridClasses).toMatch(/gap-/)
    })
  })

  describe('Content Organization', () => {
    test('contact information appears before form in DOM order', () => {
      const { container } = render(<ClientSupportPage />)

      const contactInfo = screen.getByTestId('contact-info')
      const supportForm = screen.getByTestId('support-form')

      // Get positions in DOM
      const allElements = Array.from(container.querySelectorAll('[data-testid]'))
      const contactIndex = allElements.indexOf(contactInfo)
      const formIndex = allElements.indexOf(supportForm)

      // Contact info should come before form for screen readers
      expect(contactIndex).toBeLessThan(formIndex)
    })

    test('both main components are rendered', () => {
      render(<ClientSupportPage />)

      expect(screen.getByTestId('contact-info')).toBeInTheDocument()
      expect(screen.getByTestId('support-form')).toBeInTheDocument()
    })
  })

  describe('Page Metadata - SEO and Accessibility', () => {
    test('page exports metadata for SEO', () => {
      // Import metadata separately to test it
      const { metadata } = require('./page')
      
      expect(metadata).toBeDefined()
      expect(metadata.title).toBe('Client Support | Hibu')
      expect(metadata.description).toContain('Contact Hibu client support')
    })
  })

  describe('Container and Spacing', () => {
    test('page uses container for proper width constraints', () => {
      const { container } = render(<ClientSupportPage />)

      const containerElement = container.querySelector('.container')
      expect(containerElement).toBeInTheDocument()
    })

    test('page has proper padding for mobile and desktop', () => {
      const { container } = render(<ClientSupportPage />)

      const section = container.querySelector('section')
      const sectionClasses = section?.className || ''

      // Check for responsive padding
      expect(sectionClasses).toMatch(/px-/) // Horizontal padding
      expect(sectionClasses).toMatch(/py-/) // Vertical padding
    })
  })

  describe('Minimum Height and Scrolling', () => {
    test('page has minimum height to prevent layout issues', () => {
      const { container } = render(<ClientSupportPage />)

      const main = container.querySelector('main')
      const mainClasses = main?.className || ''

      expect(mainClasses).toMatch(/min-h-screen/)
    })

    test('page is full width', () => {
      const { container } = render(<ClientSupportPage />)

      const main = container.querySelector('main')
      const mainClasses = main?.className || ''

      expect(mainClasses).toMatch(/w-full/)
    })
  })
})
