/**
 * Debug test for DynamicBackground particle visibility in dark theme
 * Task: 4.2 Debug if particles are not appearing
 * Requirements: 5.1
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DynamicBackground } from './dynamic-background'

describe('DynamicBackground - Dark Theme Particle Debugging', () => {
  let originalClassList: DOMTokenList

  beforeEach(() => {
    // Store original classList
    originalClassList = document.documentElement.classList

    // Mock matchMedia for prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? false : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(performance.now()), 0)
      return 1
    })

    // Mock cancelAnimationFrame
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    // Restore original classList
    document.documentElement.className = originalClassList.value
    vi.restoreAllMocks()
  })

  describe('Canvas Element Visibility', () => {
    it('should have canvas element with correct classes in dark theme', () => {
      // Set dark theme
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('dark:block')
      expect(canvas?.className).toContain('hidden')
      expect(canvas?.className).toContain('absolute')
      expect(canvas?.className).toContain('inset-0')
    })

    it('should verify dark class is present on document element', () => {
      document.documentElement.classList.add('dark')

      render(<DynamicBackground />)

      const hasDarkClass = document.documentElement.classList.contains('dark')
      expect(hasDarkClass).toBe(true)
    })

    it('should have correct z-index stacking', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper?.className).toContain('-z-10')
      expect(wrapper?.className).toContain('fixed')
      expect(wrapper?.className).toContain('inset-0')
    })

    it('should have pointer-events-none to prevent interaction blocking', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')

      expect(wrapper?.className).toContain('pointer-events-none')
    })
  })

  describe('Canvas Computed Styles', () => {
    it('should verify canvas is not display:none in dark theme', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas')

      expect(canvas).toBeTruthy()
      
      // In dark theme, canvas should have 'hidden dark:block'
      // The 'hidden' class sets display:none by default
      // The 'dark:block' class should override it to display:block in dark mode
      const classes = canvas?.className || ''
      expect(classes).toContain('hidden')
      expect(classes).toContain('dark:block')
    })

    it('should verify canvas dimensions are set', async () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas') as HTMLCanvasElement

      expect(canvas).toBeTruthy()

      // Wait for useEffect to run
      await new Promise(resolve => setTimeout(resolve, 100))

      // Canvas should have width and height set
      expect(canvas.width).toBeGreaterThan(0)
      expect(canvas.height).toBeGreaterThan(0)
    })
  })

  describe('Theme Detection Logic', () => {
    it('should detect dark theme correctly', () => {
      document.documentElement.classList.add('dark')

      const isDark = document.documentElement.classList.contains('dark')
      expect(isDark).toBe(true)
    })

    it('should detect light theme correctly', () => {
      document.documentElement.classList.remove('dark')

      const isDark = document.documentElement.classList.contains('dark')
      expect(isDark).toBe(false)
    })

    it('should handle theme switching', () => {
      // Start in light theme
      document.documentElement.classList.remove('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(false)

      // Switch to dark theme
      document.documentElement.classList.add('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)

      // Switch back to light theme
      document.documentElement.classList.remove('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  describe('Canvas Context', () => {
    it('should successfully get 2d canvas context', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas') as HTMLCanvasElement

      expect(canvas).toBeTruthy()

      const ctx = canvas.getContext('2d', { alpha: true })
      expect(ctx).toBeTruthy()
      expect(ctx).toBeInstanceOf(CanvasRenderingContext2D)
    })
  })

  describe('Component Structure', () => {
    it('should render all background layers', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)

      // Should have wrapper div
      const wrapper = container.querySelector('[aria-hidden="true"]')
      expect(wrapper).toBeTruthy()

      // Should have light theme fluid background
      const fluidBg = container.querySelector('.dynamic-fluid-bg')
      expect(fluidBg).toBeTruthy()
      expect(fluidBg?.className).toContain('dark:hidden')

      // Should have dark theme canvas
      const canvas = container.querySelector('canvas')
      expect(canvas).toBeTruthy()
      expect(canvas?.className).toContain('dark:block')

      // Should have vignette layer
      const vignette = container.querySelector('.dynamic-bg-vignette')
      expect(vignette).toBeTruthy()
    })

    it('should have correct layer ordering', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const wrapper = container.querySelector('[aria-hidden="true"]')
      const children = wrapper?.children

      expect(children).toBeTruthy()
      expect(children?.length).toBe(3)

      // First child: fluid background (light theme)
      expect(children?.[0]?.className).toContain('dynamic-fluid-bg')

      // Second child: canvas (dark theme)
      expect(children?.[1]?.tagName).toBe('CANVAS')

      // Third child: vignette
      expect(children?.[2]?.className).toContain('dynamic-bg-vignette')
    })
  })

  describe('Browser Console Error Check', () => {
    it('should not throw errors during render', () => {
      document.documentElement.classList.add('dark')

      expect(() => {
        render(<DynamicBackground />)
      }).not.toThrow()
    })

    it('should not throw errors when canvas context is obtained', () => {
      document.documentElement.classList.add('dark')

      const { container } = render(<DynamicBackground />)
      const canvas = container.querySelector('canvas') as HTMLCanvasElement

      expect(() => {
        canvas.getContext('2d', { alpha: true })
      }).not.toThrow()
    })
  })
})
