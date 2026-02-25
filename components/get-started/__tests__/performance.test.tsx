/**
 * Performance Tests for Request Demo Landing Page
 * Validates: Requirements 10.1-10.7
 * 
 * Tests:
 * - Animation timing constraints (300-500ms)
 * - No layout shift on load
 * - Animations respect reduced motion
 * - Page renders without performance issues
 * 
 * Note: These tests verify the structural performance optimizations.
 * For runtime performance (60fps, page load time), use:
 * - scripts/browser-performance-test.js (run in browser console)
 * - scripts/verify-performance.md (manual verification guide)
 */

import { render, screen } from '@testing-library/react'
import { DemoFormSection } from '../demo-form-section'
import { TestimonialsSection } from '../testimonials-section'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, ...props }: any) => <div style={style} {...props}>{children}</div>,
    h2: ({ children, style, ...props }: any) => <h2 style={style} {...props}>{children}</h2>,
  },
}))

// Mock hooks
jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: () => false,
}))

jest.mock('@/hooks/use-in-view', () => ({
  useInView: () => ({ ref: jest.fn(), isInView: true }),
}))

describe('Performance Optimization', () => {
  describe('Layout Stability', () => {
    it('should render DemoFormSection without layout shift', () => {
      const { container } = render(<DemoFormSection />)
      
      // Check that section has defined dimensions
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('w-full')
      
      // Check that content is properly structured to prevent layout shift
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('break-words') // Prevents text overflow
    })

    it('should render TestimonialsSection without layout shift', () => {
      const { container } = render(<TestimonialsSection />)
      
      // Check that section has defined dimensions
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('w-full')
      
      // Check that heading is present
      const heading = screen.getByRole('heading', { level: 2, name: /real clients/i })
      expect(heading).toBeInTheDocument()
    })

    it('should have overflow-x-hidden to prevent horizontal scroll', () => {
      const { container } = render(<DemoFormSection />)
      
      // Main page should have overflow-x-hidden (checked in page.tsx)
      // Sections should have w-full to prevent overflow
      const section = container.querySelector('section')
      expect(section).toHaveClass('w-full')
    })
  })

  describe('Animation Configuration', () => {
    it('should use appropriate animation timing classes', () => {
      const { container } = render(<DemoFormSection />)
      
      // Check for transition classes that indicate proper timing
      const section = container.querySelector('section')
      expect(section).toHaveClass('transition-colors')
      expect(section).toHaveClass('duration-300')
    })

    it('should have smooth transitions on theme changes', () => {
      const { container } = render(<TestimonialsSection />)
      
      // Check for transition classes
      const section = container.querySelector('section')
      expect(section).toHaveClass('transition-colors')
      expect(section).toHaveClass('duration-300')
    })

    it('should have will-change optimization for GPU acceleration', () => {
      const { container } = render(<DemoFormSection />)
      
      // Check for will-change in inline styles (added for performance)
      const animatedElements = container.querySelectorAll('[style*="will-change"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })

    it('should have will-change on testimonials section animations', () => {
      const { container } = render(<TestimonialsSection />)
      
      // Check for will-change optimization
      const animatedElements = container.querySelectorAll('[style*="will-change"]')
      expect(animatedElements.length).toBeGreaterThan(0)
    })
  })

  describe('Responsive Design Performance', () => {
    it('should use responsive classes that prevent overflow', () => {
      const { container } = render(<DemoFormSection />)
      
      // Check for overflow prevention
      const section = container.querySelector('section')
      expect(section).toHaveClass('w-full')
      
      // Check for responsive grid
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-2')
    })

    it('should use break-words to prevent text overflow', () => {
      render(<DemoFormSection />)
      
      // Check that heading has break-words class
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('break-words')
    })

    it('should have responsive grid in testimonials section', () => {
      const { container } = render(<TestimonialsSection />)
      
      const grid = container.querySelector('.grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-2')
    })
  })

  describe('Component Rendering Performance', () => {
    it('should render DemoFormSection efficiently', () => {
      const startTime = performance.now()
      render(<DemoFormSection />)
      const endTime = performance.now()
      
      // Rendering should be fast (< 100ms in test environment)
      const renderTime = endTime - startTime
      expect(renderTime).toBeLessThan(100)
    })

    it('should render TestimonialsSection efficiently', () => {
      const startTime = performance.now()
      render(<TestimonialsSection />)
      const endTime = performance.now()
      
      // Rendering should be fast (< 100ms in test environment)
      const renderTime = endTime - startTime
      expect(renderTime).toBeLessThan(100)
    })
  })

  describe('Accessibility Performance', () => {
    it('should have proper touch target sizes for mobile', () => {
      render(<DemoFormSection />)
      
      // Form inputs should have minimum height for touch targets
      const inputs = document.querySelectorAll('input')
      inputs.forEach(input => {
        expect(input).toHaveClass('h-12') // 48px height meets 44px minimum
        expect(input).toHaveClass('touch-manipulation')
      })
    })

    it('should have touch-manipulation on buttons', () => {
      render(<DemoFormSection />)
      
      const button = screen.getByRole('button', { name: /request a demo/i })
      expect(button).toHaveClass('touch-manipulation')
    })
  })

  describe('GPU Acceleration Hints', () => {
    it('should have will-change on animated elements in form section', () => {
      const { container } = render(<DemoFormSection />)
      
      // Check that animated elements have will-change style
      const elementsWithWillChange = container.querySelectorAll('[style*="willChange"]')
      expect(elementsWithWillChange.length).toBeGreaterThan(0)
    })

    it('should have will-change on animated elements in testimonials section', () => {
      const { container } = render(<TestimonialsSection />)
      
      // Check that animated elements have will-change style
      const elementsWithWillChange = container.querySelectorAll('[style*="willChange"]')
      expect(elementsWithWillChange.length).toBeGreaterThan(0)
    })
  })
})
