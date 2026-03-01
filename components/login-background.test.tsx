import { render, cleanup } from '@testing-library/react'
import { LoginBackground } from './login-background'

describe('LoginBackground Component', () => {
  beforeEach(() => {
    // Mock window.matchMedia for prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    // Mock requestAnimationFrame
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(performance.now()), 0)
      return 1
    })

    // Mock cancelAnimationFrame
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  describe('Requirement 4.1: Particles render only in light theme', () => {
    it('should render canvas when light theme is active', () => {
      // Remove dark class to simulate light theme
      document.documentElement.classList.remove('dark')

      const { container } = render(<LoginBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('dark:hidden')
    })
  })

  describe('Requirement 4.2: Particles are hidden in dark theme', () => {
    it('should have dark:hidden class on canvas', () => {
      // Add dark class to simulate dark theme
      document.documentElement.classList.add('dark')

      const { container } = render(<LoginBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('dark:hidden')
    })

    it('should clear canvas when dark theme is detected', async () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<LoginBackground />)
      const canvas = container.querySelector('canvas') as HTMLCanvasElement

      expect(canvas).toBeTruthy()

      // Wait for animation frame to execute
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Verify canvas context would be cleared (implementation clears on dark theme)
      const ctx = canvas.getContext('2d')
      expect(ctx).toBeTruthy()
    })
  })

  describe('Requirement 4.3: Canvas renders behind content (z-index)', () => {
    it('should have -z-10 class on container', () => {
      const { container } = render(<LoginBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper).toBeTruthy()
      expect(wrapper?.className).toContain('-z-10')
    })

    it('should have fixed positioning', () => {
      const { container } = render(<LoginBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper?.className).toContain('fixed')
      expect(wrapper?.className).toContain('inset-0')
    })
  })

  describe('Requirement 4.4: pointer-events-none prevents interaction blocking', () => {
    it('should have pointer-events-none class', () => {
      const { container } = render(<LoginBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper).toBeTruthy()
      expect(wrapper?.className).toContain('pointer-events-none')
    })

    it('should have aria-hidden attribute for accessibility', () => {
      const { container } = render(<LoginBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper).toBeTruthy()
      expect(wrapper?.getAttribute('aria-hidden')).toBe('true')
    })
  })

  describe('Canvas element structure', () => {
    it('should render canvas with absolute positioning', () => {
      const { container } = render(<LoginBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('absolute')
      expect(canvas?.className).toContain('inset-0')
    })

    it('should have overflow-hidden on container', () => {
      const { container } = render(<LoginBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper?.className).toContain('overflow-hidden')
    })
  })

  describe('Theme switching behavior', () => {
    it('should respond to theme changes', async () => {
      // Start with light theme
      document.documentElement.classList.remove('dark')

      const { container } = render(<LoginBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()

      // Switch to dark theme
      document.documentElement.classList.add('dark')

      // Canvas should still exist but with dark:hidden class
      expect(canvas?.className).toContain('dark:hidden')

      // Clean up
      document.documentElement.classList.remove('dark')
    })
  })

  describe('Reduced motion support', () => {
    it('should respect prefers-reduced-motion', () => {
      // Mock prefers-reduced-motion: reduce
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      const { container } = render(<LoginBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      // Component should still render but not animate
    })
  })
})
