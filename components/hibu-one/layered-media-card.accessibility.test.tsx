import { render, screen } from '@testing-library/react'
import { LayeredMediaCard } from './layered-media-card'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock hooks
jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(() => false),
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('LayeredMediaCard - Accessibility (Task 7)', () => {
  const mockProps = {
    logo: '/logo.svg',
    logoAlt: 'hibu ONE logo',
    tagline: 'Enterprise-level marketing built for local businesses',
    watchCTA: {
      text: 'WATCH NOW ▶',
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
    ],
  }

  describe('Task 7.1: Semantic HTML and ARIA Labels', () => {
    it('provides proper alt text for logo image (Requirement 9.1)', () => {
      render(<LayeredMediaCard {...mockProps} />)

      const logo = screen.getByAltText('hibu ONE logo')
      expect(logo).toBeInTheDocument()
    })

    it('provides proper alt text for all mockup images (Requirement 9.3)', () => {
      render(<LayeredMediaCard {...mockProps} />)

      const mockup1 = screen.getByAltText('Website preview mockup')
      const mockup2 = screen.getByAltText('Review card mockup')

      expect(mockup1).toBeInTheDocument()
      expect(mockup2).toBeInTheDocument()
    })

    it('watch CTA link is keyboard navigable when href is provided (Requirement 9.2)', () => {
      render(<LayeredMediaCard {...mockProps} />)

      const watchLink = screen.getByRole('link', { name: 'WATCH NOW ▶' })
      
      expect(watchLink).toBeInTheDocument()
      expect(watchLink).toHaveAttribute('href', '/video')
    })

    it('watch CTA button is keyboard navigable when no href is provided (Requirement 9.2)', () => {
      const propsWithButton = {
        ...mockProps,
        watchCTA: {
          text: 'WATCH NOW ▶',
        },
      }

      render(<LayeredMediaCard {...propsWithButton} />)

      const watchButton = screen.getByRole('button', { name: 'WATCH NOW ▶' })
      
      expect(watchButton).toBeInTheDocument()
      expect(watchButton).toHaveAttribute('type', 'button')
    })

    it('uses default alt text when logoAlt is not provided', () => {
      const propsWithoutLogoAlt = {
        ...mockProps,
        logoAlt: undefined,
      }

      render(<LayeredMediaCard {...propsWithoutLogoAlt} />)

      const logo = screen.getByAltText('Logo')
      expect(logo).toBeInTheDocument()
    })
  })

  describe('Task 7.2: Color Contrast on Purple Gradient', () => {
    it('applies white text on purple gradient background (Requirement 3.4)', () => {
      const { container } = render(<LayeredMediaCard {...mockProps} />)

      // Check purple gradient background exists
      const purpleGradient = container.querySelector('.bg-gradient-to-br.from-purple-600')
      expect(purpleGradient).toBeInTheDocument()

      // Check tagline uses white text
      const tagline = screen.getByText('Enterprise-level marketing built for local businesses')
      expect(tagline).toHaveClass('text-white')
    })

    it('watch CTA has sufficient contrast with white text (Requirement 9.4)', () => {
      render(<LayeredMediaCard {...mockProps} />)

      const watchLink = screen.getByRole('link', { name: 'WATCH NOW ▶' })
      
      // Watch CTA uses white text on semi-transparent white background
      expect(watchLink).toHaveClass('text-white')
    })

    it('applies green gradient shadow layer (Requirement 5.2)', () => {
      const { container } = render(<LayeredMediaCard {...mockProps} />)

      // Check green shadow layer exists
      const shadowLayer = container.querySelector('.bg-gradient-to-br.from-green-100.to-green-200')
      expect(shadowLayer).toBeInTheDocument()
    })
  })

  describe('Task 7.3: Reduced Motion Preferences', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('respects prefers-reduced-motion for card animation (Requirement 6.3)', () => {
      const { useReducedMotion } = require('@/hooks/use-reduced-motion')
      useReducedMotion.mockReturnValue(true)

      render(<LayeredMediaCard {...mockProps} />)

      expect(useReducedMotion).toHaveBeenCalled()
      expect(screen.getByText('Enterprise-level marketing built for local businesses')).toBeInTheDocument()
    })

    it('respects prefers-reduced-motion for mockup animations (Requirement 9.5)', () => {
      const { useReducedMotion } = require('@/hooks/use-reduced-motion')
      useReducedMotion.mockReturnValue(true)

      render(<LayeredMediaCard {...mockProps} />)

      // All mockups should still render with reduced motion
      expect(screen.getByAltText('Website preview mockup')).toBeInTheDocument()
      expect(screen.getByAltText('Review card mockup')).toBeInTheDocument()
    })

    it('uses normal animation when prefers-reduced-motion is false (Requirement 9.5)', () => {
      const { useReducedMotion } = require('@/hooks/use-reduced-motion')
      useReducedMotion.mockReturnValue(false)

      render(<LayeredMediaCard {...mockProps} />)

      expect(useReducedMotion).toHaveBeenCalled()
      expect(screen.getByText('Enterprise-level marketing built for local businesses')).toBeInTheDocument()
    })
  })

  describe('Decorative Elements', () => {
    it('shadow layer is decorative and does not interfere with accessibility', () => {
      const { container } = render(<LayeredMediaCard {...mockProps} />)

      // Shadow layer should have negative z-index to stay behind content
      const shadowLayer = container.querySelector('.-z-10')
      expect(shadowLayer).toBeInTheDocument()
    })

    it('renders without logo when not provided', () => {
      const propsWithoutLogo = {
        ...mockProps,
        logo: undefined,
      }

      render(<LayeredMediaCard {...propsWithoutLogo} />)

      // Should not throw error and should render other content
      expect(screen.getByText('Enterprise-level marketing built for local businesses')).toBeInTheDocument()
    })

    it('renders without tagline when not provided', () => {
      const propsWithoutTagline = {
        ...mockProps,
        tagline: undefined,
      }

      render(<LayeredMediaCard {...propsWithoutTagline} />)

      // Should not throw error and should render other content
      expect(screen.getByRole('link', { name: 'WATCH NOW ▶' })).toBeInTheDocument()
    })

    it('renders without watch CTA when not provided', () => {
      const propsWithoutWatchCTA = {
        ...mockProps,
        watchCTA: undefined,
      }

      render(<LayeredMediaCard {...propsWithoutWatchCTA} />)

      // Should not throw error and should render other content
      expect(screen.getByText('Enterprise-level marketing built for local businesses')).toBeInTheDocument()
    })

    it('renders without mockups when not provided', () => {
      const propsWithoutMockups = {
        ...mockProps,
        mockups: undefined,
      }

      render(<LayeredMediaCard {...propsWithoutMockups} />)

      // Should not throw error and should render other content
      expect(screen.getByText('Enterprise-level marketing built for local businesses')).toBeInTheDocument()
    })
  })
})
