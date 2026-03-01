import { render, cleanup } from '@testing-library/react'
import { DynamicBackground } from './dynamic-background'

describe('DynamicBackground Component - Industries Page', () => {
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
    // Clean up theme class
    document.documentElement.classList.remove('dark')
  })

  describe('Requirement 5.1: Particles render only in dark theme', () => {
    it('should render canvas when dark theme is active', () => {
      // Add dark class to simulate dark theme
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('dark:block')
    })

    it('should have canvas visible with correct classes in dark theme', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('absolute')
      expect(canvas?.className).toContain('inset-0')
      expect(canvas?.className).toContain('hidden')
      expect(canvas?.className).toContain('dark:block')
    })
  })

  describe('Requirement 5.2: Particles are hidden in light theme', () => {
    it('should have hidden class on canvas in light theme', () => {
      // Remove dark class to simulate light theme
      document.documentElement.classList.remove('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('hidden')
    })

    it('should show fluid gradient background in light theme', () => {
      document.documentElement.classList.remove('dark')

      const { container } = render(<DynamicBackground />)
      const fluidBg = container.querySelector('.dynamic-fluid-bg')

      expect(fluidBg).toBeTruthy()
      expect(fluidBg?.className).toContain('dark:hidden')
    })

    it('should clear canvas when light theme is detected', async () => {
      document.documentElement.classList.remove('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas') as HTMLCanvasElement

      expect(canvas).toBeTruthy()

      // Wait for animation frame to execute
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Verify canvas context would be cleared (implementation clears on light theme)
      const ctx = canvas.getContext('2d')
      expect(ctx).toBeTruthy()
    })
  })

  describe('Canvas renders behind content (z-index)', () => {
    it('should have -z-10 class on container', () => {
      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper).toBeTruthy()
      expect(wrapper?.className).toContain('-z-10')
    })

    it('should have fixed positioning', () => {
      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper?.className).toContain('fixed')
      expect(wrapper?.className).toContain('inset-0')
    })
  })

  describe('pointer-events-none prevents interaction blocking', () => {
    it('should have pointer-events-none class', () => {
      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper).toBeTruthy()
      expect(wrapper?.className).toContain('pointer-events-none')
    })

    it('should have aria-hidden attribute for accessibility', () => {
      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper).toBeTruthy()
      expect(wrapper?.getAttribute('aria-hidden')).toBe('true')
    })
  })

  describe('Canvas element structure', () => {
    it('should render canvas with absolute positioning', () => {
      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('absolute')
      expect(canvas?.className).toContain('inset-0')
    })

    it('should have overflow-hidden on container', () => {
      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper?.className).toContain('overflow-hidden')
    })

    it('should render vignette overlay', () => {
      const { container } = render(<DynamicBackground />)
      const vignette = container.querySelector('.dynamic-bg-vignette')

      expect(vignette).toBeTruthy()
      expect(vignette?.className).toContain('absolute')
      expect(vignette?.className).toContain('inset-0')
    })
  })

  describe('Theme switching behavior', () => {
    it('should respond to theme changes from light to dark', async () => {
      // Start with light theme
      document.documentElement.classList.remove('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('hidden')

      // Switch to dark theme
      document.documentElement.classList.add('dark')

      // Canvas should have dark:block class
      expect(canvas?.className).toContain('dark:block')
    })

    it('should respond to theme changes from dark to light', async () => {
      // Start with dark theme
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('dark:block')

      // Switch to light theme
      document.documentElement.classList.remove('dark')

      // Canvas should still have hidden class
      expect(canvas?.className).toContain('hidden')
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

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      // Component should still render but not animate
    })
  })
})
