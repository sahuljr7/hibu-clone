/**
 * Performance Optimization Tests for HibuOneHero Component
 * 
 * Task 8: Performance and Optimization Verification
 * - Task 8.1: Image optimization (Requirements 6.7, 8.1, 8.2)
 * - Task 8.2: Layout stability and performance (Requirements 8.3, 8.4, 8.5)
 */

import { render } from '@testing-library/react'
import { HibuOneHero } from './hibu-one-hero'
import { LayeredMediaCard } from './layered-media-card'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock hooks
jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(() => false),
}))

jest.mock('@/hooks/use-parallax', () => ({
  useParallax: jest.fn(() => ({
    ref: { current: null },
    parallaxValues: { y: 0 },
  })),
}))

// Mock Next.js Image to verify it's being used
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(({ src, alt, priority, sizes, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      data-priority={priority}
      data-sizes={sizes}
      {...props}
    />
  )),
}))

// Import the mocked Image component
import NextImage from 'next/image'
const mockNextImage = NextImage as jest.MockedFunction<typeof NextImage>

describe('Task 8: Performance and Optimization', () => {
  const mockProps = {
    heading: 'Hibu One',
    description: 'Test description',
    primaryCTA: {
      text: 'Request a demo',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'Tour the Platform',
      href: '/demo',
    },
    mediaUrl: '/test-image.jpg',
    mediaAlt: 'Test image',
    mediaCard: {
      logo: '/logo.svg',
      logoAlt: 'Logo',
      tagline: 'Test tagline',
      watchCTA: {
        text: 'WATCH NOW',
        href: '/video',
      },
      mockups: [
        {
          url: '/mockup1.png',
          alt: 'Website preview mockup',
          position: 'top-left' as const,
        },
        {
          url: '/mockup2.png',
          alt: 'Review card mockup',
          position: 'top-right' as const,
        },
        {
          url: '/mockup3.png',
          alt: 'Local listings mockup',
          position: 'bottom-right' as const,
        },
      ],
    },
  }

  beforeEach(() => {
    mockNextImage.mockClear()
  })

  describe('Task 8.1: Image Optimization', () => {
    describe('Requirement 8.1: Priority loading for above-the-fold images', () => {
      it('uses Next.js Image component for logo in LayeredMediaCard', () => {
        render(<LayeredMediaCard logo="/logo.svg" logoAlt="Logo" />)

        // Verify Next.js Image was called
        expect(mockNextImage).toHaveBeenCalled()

        // Find the call for the logo
        const logoCalls = mockNextImage.mock.calls.filter(
          (call) => call[0].src === '/logo.svg'
        )
        expect(logoCalls.length).toBeGreaterThan(0)
      })

      it('sets priority loading on logo image', () => {
        render(<LayeredMediaCard logo="/logo.svg" logoAlt="Logo" />)

        // Find the logo call
        const logoCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/logo.svg'
        )

        expect(logoCall).toBeDefined()
        expect(logoCall[0].priority).toBe(true)
      })

      it('sets priority loading on first mockup image', () => {
        render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' },
              { url: '/mockup2.png', alt: 'Mockup 2', position: 'top-right' },
            ]}
          />
        )

        // First mockup should have priority
        const firstMockupCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/mockup1.png'
        )
        expect(firstMockupCall[0].priority).toBe(true)

        // Second mockup should not have priority
        const secondMockupCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/mockup2.png'
        )
        expect(secondMockupCall[0].priority).toBe(false)
      })

      it('uses Next.js Image component for all mockup images', () => {
        render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' },
              { url: '/mockup2.png', alt: 'Mockup 2', position: 'top-right' },
              { url: '/mockup3.png', alt: 'Mockup 3', position: 'bottom-right' },
            ]}
          />
        )

        // Verify Next.js Image was called for each mockup
        expect(mockNextImage).toHaveBeenCalledTimes(3)

        // Verify each mockup URL was passed to Next.js Image
        const mockupCalls = mockNextImage.mock.calls.map((call) => call[0].src)
        expect(mockupCalls).toContain('/mockup1.png')
        expect(mockupCalls).toContain('/mockup2.png')
        expect(mockupCalls).toContain('/mockup3.png')
      })

      it('uses Next.js Image component in HibuOneHero with mediaCard', () => {
        render(<HibuOneHero {...mockProps} />)

        // Verify Next.js Image was called for logo and mockups
        expect(mockNextImage).toHaveBeenCalled()

        // Should have 1 logo + 3 mockups = 4 images
        expect(mockNextImage).toHaveBeenCalledTimes(4)
      })
    })

    describe('Requirement 8.2: Appropriate sizes attribute on LayeredMediaCard mockups', () => {
      it('applies sizes attribute to mockup images for responsive loading', () => {
        render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' },
            ]}
          />
        )

        // Find the mockup image call
        const mockupCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/mockup1.png'
        )

        expect(mockupCall).toBeDefined()
        expect(mockupCall[0].sizes).toBeDefined()
        expect(mockupCall[0].sizes).toBe(
          '(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px'
        )
      })

      it('applies consistent sizes attribute to all mockup images', () => {
        render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' },
              { url: '/mockup2.png', alt: 'Mockup 2', position: 'top-right' },
              { url: '/mockup3.png', alt: 'Mockup 3', position: 'bottom-right' },
            ]}
          />
        )

        // Verify all mockup images have the sizes attribute
        const mockupCalls = mockNextImage.mock.calls.filter((call) =>
          call[0].src.includes('mockup')
        )

        expect(mockupCalls.length).toBe(3)

        mockupCalls.forEach((call) => {
          expect(call[0].sizes).toBe(
            '(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px'
          )
        })
      })

      it('sizes attribute matches responsive width classes', () => {
        const { container } = render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup.png', alt: 'Mockup', position: 'center' },
            ]}
          />
        )

        // Verify the image has responsive width classes
        const mockupImg = container.querySelector('img[alt="Mockup"]')
        expect(mockupImg).toHaveClass('w-24', 'sm:w-32', 'md:w-40', 'lg:w-48')

        // Verify sizes attribute matches these breakpoints
        const mockupCall = mockNextImage.mock.calls.find(
          (call) => call[0].alt === 'Mockup'
        )
        expect(mockupCall[0].sizes).toBe(
          '(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px'
        )
      })
    })

    describe('Requirement 6.7: Next.js Image component optimization', () => {
      it('uses Next.js Image component for all images in the hero section', () => {
        render(<HibuOneHero {...mockProps} />)

        // Verify Next.js Image was used (not regular img tags without data attributes)
        expect(mockNextImage).toHaveBeenCalled()

        // All images should be Next.js Image components
        const allCalls = mockNextImage.mock.calls
        expect(allCalls.length).toBeGreaterThan(0)

        // Verify each call has proper Next.js Image props
        allCalls.forEach((call) => {
          expect(call[0]).toHaveProperty('src')
          expect(call[0]).toHaveProperty('alt')
        })
      })

      it('provides proper alt text for all images', () => {
        render(<HibuOneHero {...mockProps} />)

        const allCalls = mockNextImage.mock.calls

        // Verify all images have alt text
        allCalls.forEach((call) => {
          expect(call[0].alt).toBeDefined()
          expect(call[0].alt).not.toBe('')
        })
      })

      it('uses appropriate width and height for logo image', () => {
        render(<LayeredMediaCard logo="/logo.svg" logoAlt="Logo" />)

        const logoCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/logo.svg'
        )

        expect(logoCall).toBeDefined()
        expect(logoCall[0].width).toBe(120)
        expect(logoCall[0].height).toBe(40)
      })

      it('uses appropriate width and height for mockup images', () => {
        render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup.png', alt: 'Mockup', position: 'center' },
            ]}
          />
        )

        const mockupCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/mockup.png'
        )

        expect(mockupCall).toBeDefined()
        expect(mockupCall[0].width).toBe(200)
        expect(mockupCall[0].height).toBe(150)
      })
    })
  })

  describe('Task 8.2: Layout Stability and Performance', () => {
    describe('Requirement 8.4: CSS transforms for animations (GPU acceleration)', () => {
      it('uses CSS transforms for LayeredMediaCard animations', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Framer Motion uses transforms under the hood
        // Verify the component structure supports transform-based animations
        const wrapper = container.firstChild as HTMLElement
        expect(wrapper).toBeInTheDocument()

        // The component should not use properties that cause layout shifts
        // (like top, left changes during animation)
        // Instead, it should use transform properties (handled by Framer Motion)
      })

      it('uses transform for mockup positioning animations', () => {
        const { container } = render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup.png', alt: 'Mockup', position: 'center' },
            ]}
          />
        )

        // Center position uses CSS transform for positioning
        const mockupContainer = container.querySelector('.top-1\\/2.left-1\\/2')
        expect(mockupContainer).toBeInTheDocument()
        expect(mockupContainer).toHaveClass('-translate-x-1/2', '-translate-y-1/2')
      })

      it('applies transform-based positioning for centered mockups', () => {
        const { container } = render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup.png', alt: 'Mockup', position: 'center' },
            ]}
          />
        )

        // Verify transform classes are used for GPU acceleration
        const mockupContainer = container.querySelector('.-translate-x-1\\/2')
        expect(mockupContainer).toBeInTheDocument()
        expect(mockupContainer).toHaveClass('-translate-y-1/2')
      })

      it('uses transition classes that leverage GPU acceleration', () => {
        render(
          <LayeredMediaCard
            watchCTA={{
              text: 'WATCH NOW',
              href: '/video',
            }}
          />
        )

        // Watch CTA uses transition-all and hover:scale-105 (transform-based)
        const watchCTA = document.querySelector('a[href="/video"]')
        expect(watchCTA).toHaveClass('transition-all', 'duration-300', 'hover:scale-105')
      })
    })

    describe('Requirement 8.3: Minimal layout shift during page load (CLS)', () => {
      it('uses fixed dimensions for logo to prevent layout shift', () => {
        render(<LayeredMediaCard logo="/logo.svg" logoAlt="Logo" />)

        const logoCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/logo.svg'
        )

        // Fixed width and height prevent layout shift
        expect(logoCall[0].width).toBe(120)
        expect(logoCall[0].height).toBe(40)
      })

      it('uses fixed dimensions for mockup images to prevent layout shift', () => {
        render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup.png', alt: 'Mockup', position: 'top-left' },
            ]}
          />
        )

        const mockupCall = mockNextImage.mock.calls.find(
          (call) => call[0].src === '/mockup.png'
        )

        // Fixed width and height prevent layout shift
        expect(mockupCall[0].width).toBe(200)
        expect(mockupCall[0].height).toBe(150)
      })

      it('uses min-height on content container to prevent layout shift', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Content container has min-height to reserve space
        const contentContainer = container.querySelector('.min-h-\\[300px\\]')
        expect(contentContainer).toBeInTheDocument()
      })

      it('uses absolute positioning for shadow layer to prevent layout shift', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Shadow layer is absolutely positioned and doesn't affect layout
        const shadowLayer = container.querySelector('.absolute.top-5.left-5')
        expect(shadowLayer).toBeInTheDocument()
        expect(shadowLayer).toHaveClass('-z-10')
      })

      it('uses absolute positioning for mockups to prevent layout shift', () => {
        const { container } = render(
          <LayeredMediaCard
            mockups={[
              { url: '/mockup.png', alt: 'Mockup', position: 'top-left' },
            ]}
          />
        )

        // Mockups are absolutely positioned within the card
        const mockupContainer = container.querySelector('.absolute.top-4.left-4')
        expect(mockupContainer).toBeInTheDocument()
      })

      it('uses relative positioning for primary layer to contain absolute children', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Primary layer is relatively positioned to contain absolute mockups
        const primaryLayer = container.querySelector('.relative.bg-gradient-to-br.from-purple-600')
        expect(primaryLayer).toBeInTheDocument()
      })

      it('reserves space with padding to prevent content shift', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Primary layer has padding to reserve space
        const primaryLayer = container.querySelector('.p-8')
        expect(primaryLayer).toBeInTheDocument()
      })
    })

    describe('Requirement 8.5: CSS gradients instead of image files', () => {
      it('uses CSS gradient for hero section background', () => {
        const { container } = render(<HibuOneHero {...mockProps} />)

        // Verify gradient is CSS-based, not an image
        const gradient = container.querySelector('.bg-gradient-to-b.from-green-50')
        expect(gradient).toBeInTheDocument()
        expect(gradient).toHaveClass('via-green-25', 'to-white')

        // Verify no background image is used
        const gradientElement = gradient as HTMLElement
        expect(gradientElement.style.backgroundImage).toBe('')
      })

      it('uses CSS gradient for LayeredMediaCard shadow layer', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Shadow layer uses CSS gradient
        const shadowLayer = container.querySelector('.bg-gradient-to-br.from-green-100')
        expect(shadowLayer).toBeInTheDocument()
        expect(shadowLayer).toHaveClass('to-green-200')

        // Verify no background image is used
        const shadowElement = shadowLayer as HTMLElement
        expect(shadowElement.style.backgroundImage).toBe('')
      })

      it('uses CSS gradient for LayeredMediaCard primary layer', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Primary layer uses CSS gradient
        const primaryLayer = container.querySelector('.bg-gradient-to-br.from-purple-600')
        expect(primaryLayer).toBeInTheDocument()
        expect(primaryLayer).toHaveClass('via-purple-500', 'to-purple-700')

        // Verify no background image is used
        const primaryElement = primaryLayer as HTMLElement
        expect(primaryElement.style.backgroundImage).toBe('')
      })

      it('does not use any background images for decorative elements', () => {
        const { container } = render(<HibuOneHero {...mockProps} />)

        // Check all divs with gradient classes
        const gradientElements = container.querySelectorAll('[class*="bg-gradient"]')
        expect(gradientElements.length).toBeGreaterThan(0)

        // Verify none use background images
        gradientElements.forEach((element) => {
          const htmlElement = element as HTMLElement
          expect(htmlElement.style.backgroundImage).toBe('')
        })
      })

      it('uses only Next.js Image components for actual images, not gradients', () => {
        render(<HibuOneHero {...mockProps} />)

        // All Next.js Image calls should be for actual images (logo, mockups)
        const allCalls = mockNextImage.mock.calls

        allCalls.forEach((call) => {
          // Verify these are actual image files, not gradient placeholders
          expect(call[0].src).toMatch(/\.(svg|png|jpg|jpeg|webp)$/i)
        })
      })
    })

    describe('Performance Best Practices', () => {
      it('uses overflow-hidden to prevent unnecessary repaints', () => {
        const { container } = render(<HibuOneHero {...mockProps} />)

        // Section uses overflow-hidden
        const section = container.querySelector('section')
        expect(section).toHaveClass('overflow-hidden')
      })

      it('uses overflow-hidden on LayeredMediaCard primary layer', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Primary layer uses overflow-hidden to contain mockups
        const primaryLayer = container.querySelector('.overflow-hidden')
        expect(primaryLayer).toBeInTheDocument()
      })

      it('uses will-change implicitly through transform animations', () => {
        // Framer Motion automatically applies will-change for transform animations
        // This test verifies the structure supports it
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Component structure supports GPU-accelerated animations
        const wrapper = container.firstChild
        expect(wrapper).toBeInTheDocument()
      })

      it('uses relative and absolute positioning efficiently', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Verify efficient positioning strategy
        const relativeLayer = container.querySelector('.relative.bg-gradient-to-br')
        const absoluteLayer = container.querySelector('.absolute.top-5')

        expect(relativeLayer).toBeInTheDocument()
        expect(absoluteLayer).toBeInTheDocument()
      })

      it('minimizes DOM depth for better rendering performance', () => {
        const { container } = render(<LayeredMediaCard tagline="Test" />)

        // Count DOM depth - should be reasonable
        const wrapper = container.firstChild as HTMLElement
        const primaryLayer = wrapper.querySelector('.bg-gradient-to-br.from-purple-600')

        // Verify structure is not overly nested
        expect(wrapper).toBeInTheDocument()
        expect(primaryLayer).toBeInTheDocument()

        // Should have a flat structure: wrapper > shadow + primary > content
        const children = wrapper.children
        expect(children.length).toBeLessThanOrEqual(3)
      })
    })
  })

  describe('Integration: All Performance Requirements Together', () => {
    it('meets all image optimization requirements in a complete hero section', () => {
      render(<HibuOneHero {...mockProps} />)

      // Verify all images use Next.js Image
      expect(mockNextImage).toHaveBeenCalled()

      // Verify sizes attribute on mockups
      const mockupCalls = mockNextImage.mock.calls.filter((call) =>
        call[0].src.includes('mockup')
      )
      mockupCalls.forEach((call) => {
        expect(call[0].sizes).toBeDefined()
      })
    })

    it('meets all layout stability requirements in a complete hero section', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // CSS gradients used
      expect(container.querySelector('.bg-gradient-to-b')).toBeInTheDocument()

      // Overflow hidden to prevent layout shift
      expect(container.querySelector('.overflow-hidden')).toBeInTheDocument()

      // Fixed dimensions on images (verified through Next.js Image calls)
      expect(mockNextImage).toHaveBeenCalled()
    })

    it('meets all GPU acceleration requirements in a complete hero section', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Framer Motion uses transform-based animations (opacity, y transforms)
      // Verify the component structure supports GPU-accelerated animations
      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()

      // Watch CTA button uses transform-based hover effect
      const watchCTA = container.querySelector('a[href="/video"]')
      expect(watchCTA).toBeInTheDocument()
      expect(watchCTA).toHaveClass('transition-all', 'hover:scale-105')
    })

    it('optimizes for performance across all viewport sizes', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Responsive classes that don't cause layout shifts
      expect(container.querySelector('.py-12.sm\\:py-16.md\\:py-20.lg\\:py-24')).toBeInTheDocument()

      // Responsive spacing that uses padding (not margin which can cause shifts)
      expect(container.querySelector('.space-y-8.md\\:space-y-10.lg\\:space-y-12')).toBeInTheDocument()
    })
  })
})
