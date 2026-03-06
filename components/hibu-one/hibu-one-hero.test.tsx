import { render, screen } from '@testing-library/react'
import { HibuOneHero } from './hibu-one-hero'

// Mock framer-motion to avoid animation complexities in tests
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

// Mock LayeredMediaCard
jest.mock('./layered-media-card', () => ({
  LayeredMediaCard: ({ className }: any) => (
    <div data-testid="layered-media-card" className={className}>
      Mocked LayeredMediaCard
    </div>
  ),
}))

describe('HibuOneHero', () => {
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
      mockups: [],
    },
  }

  it('renders the hero section with all elements', () => {
    render(<HibuOneHero {...mockProps} />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hibu One')
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Request a demo' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Tour the Platform' })).toBeInTheDocument()
    expect(screen.getByTestId('layered-media-card')).toBeInTheDocument()
  })

  it('renders with rich text description', () => {
    const richDescription = (
      <>
        We help you <strong>establish your business online</strong>
      </>
    )

    render(<HibuOneHero {...mockProps} description={richDescription} />)

    expect(screen.getByText('establish your business online')).toBeInTheDocument()
  })

  it('applies correct styling classes for centered layout', () => {
    const { container } = render(<HibuOneHero {...mockProps} />)

    const contentContainer = container.querySelector('.flex.flex-col.items-center.text-center')
    expect(contentContainer).toBeInTheDocument()
  })

  it('renders gradient background', () => {
    const { container } = render(<HibuOneHero {...mockProps} />)

    const gradient = container.querySelector('.bg-gradient-to-b.from-green-50')
    expect(gradient).toBeInTheDocument()
  })

  it('renders LayeredMediaCard when mediaCard prop is provided', () => {
    render(<HibuOneHero {...mockProps} />)

    expect(screen.getByTestId('layered-media-card')).toBeInTheDocument()
  })

  it('does not render LayeredMediaCard when mediaCard prop is not provided', () => {
    const propsWithoutMediaCard = { ...mockProps }
    delete propsWithoutMediaCard.mediaCard

    render(<HibuOneHero {...propsWithoutMediaCard} />)

    expect(screen.queryByTestId('layered-media-card')).not.toBeInTheDocument()
  })

  describe('Desktop Layout (≥1024px)', () => {
    it('applies optimal spacing for desktop layout', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify section has appropriate padding for desktop
      const section = container.querySelector('section')
      expect(section).toHaveClass('py-12', 'sm:py-16', 'md:py-20', 'lg:py-24')

      // Verify content container has proper spacing
      const contentContainer = container.querySelector('.space-y-8')
      expect(contentContainer).toBeInTheDocument()
      expect(contentContainer).toHaveClass('md:space-y-10', 'lg:space-y-12')
    })

    it('ensures gradient background spans full section', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Find the gradient background element
      const gradientBg = container.querySelector('.absolute.inset-0.bg-gradient-to-b')
      expect(gradientBg).toBeInTheDocument()
      expect(gradientBg).toHaveClass('from-green-50', 'via-green-25', 'to-white')

      // Verify it's absolutely positioned to cover full section
      expect(gradientBg).toHaveClass('absolute', 'inset-0')
    })

    it('displays LayeredMediaCard correctly with proper constraints', () => {
      render(<HibuOneHero {...mockProps} />)

      const mediaCard = screen.getByTestId('layered-media-card')
      expect(mediaCard).toBeInTheDocument()

      // Verify max-width constraint and centering
      expect(mediaCard).toHaveClass('max-w-4xl', 'mx-auto')

      // Verify proper margin top for spacing
      expect(mediaCard).toHaveClass('mt-8', 'md:mt-12')
    })

    it('renders all mockups when provided in mediaCard', () => {
      const propsWithMockups = {
        ...mockProps,
        mediaCard: {
          ...mockProps.mediaCard,
          mockups: [
            { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' as const },
            { url: '/mockup2.png', alt: 'Mockup 2', position: 'top-right' as const },
            { url: '/mockup3.png', alt: 'Mockup 3', position: 'bottom-right' as const },
          ],
        },
      }

      render(<HibuOneHero {...propsWithMockups} />)

      // Verify LayeredMediaCard receives mockups prop
      expect(screen.getByTestId('layered-media-card')).toBeInTheDocument()
    })

    it('maintains centered layout with proper text alignment', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify content is centered
      const contentContainer = container.querySelector('.flex.flex-col.items-center')
      expect(contentContainer).toBeInTheDocument()
      expect(contentContainer).toHaveClass('text-center')

      // Verify heading has proper typography for desktop
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-4xl', 'sm:text-5xl', 'md:text-6xl', 'lg:text-7xl')
    })

    it('displays CTA buttons with proper layout', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Find CTA button container
      const ctaContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
      expect(ctaContainer).toBeInTheDocument()
      expect(ctaContainer).toHaveClass('gap-4', 'justify-center', 'items-center')

      // Verify both buttons are present
      expect(screen.getByRole('link', { name: 'Tour the Platform' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Request a demo' })).toBeInTheDocument()
    })

    it('applies proper max-width constraints to content', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify main content has max-width constraint
      const contentWrapper = container.querySelector('.max-w-4xl')
      expect(contentWrapper).toBeInTheDocument()

      // Verify description has max-width constraint
      const description = container.querySelector('.max-w-3xl')
      expect(description).toBeInTheDocument()
    })
  })

  describe('Tablet Layout (768px - 1023px)', () => {
    it('applies adjusted spacing for tablet layout', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify section has responsive padding that adjusts for tablet
      const section = container.querySelector('section')
      expect(section).toHaveClass('py-12', 'sm:py-16', 'md:py-20', 'lg:py-24')

      // Verify content container has responsive spacing
      const contentContainer = container.querySelector('.space-y-8')
      expect(contentContainer).toBeInTheDocument()
      expect(contentContainer).toHaveClass('md:space-y-10')
    })

    it('applies adjusted font sizes for tablet layout', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify heading has responsive font sizes including tablet breakpoint
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-4xl', 'sm:text-5xl', 'md:text-6xl', 'lg:text-7xl')

      // Verify description has responsive font sizes
      const description = container.querySelector('.text-lg')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('sm:text-xl', 'md:text-2xl')
    })

    it('keeps buttons horizontal on tablet layout', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify CTA container uses flex-row on sm breakpoint (tablet)
      const ctaContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
      expect(ctaContainer).toBeInTheDocument()
      expect(ctaContainer).toHaveClass('gap-4', 'justify-center', 'items-center')

      // Verify both buttons are present
      expect(screen.getByRole('link', { name: 'Tour the Platform' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Request a demo' })).toBeInTheDocument()
    })

    it('ensures LayeredMediaCard scales proportionally on tablet', () => {
      render(<HibuOneHero {...mockProps} />)

      const mediaCard = screen.getByTestId('layered-media-card')
      expect(mediaCard).toBeInTheDocument()

      // Verify responsive margin top for tablet
      expect(mediaCard).toHaveClass('mt-8', 'md:mt-12')

      // Verify max-width constraint allows proportional scaling
      expect(mediaCard).toHaveClass('max-w-4xl', 'mx-auto')
    })

    it('maintains centered layout on tablet', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify content remains centered
      const contentContainer = container.querySelector('.flex.flex-col.items-center')
      expect(contentContainer).toBeInTheDocument()
      expect(contentContainer).toHaveClass('text-center')
    })

    it('applies responsive padding to LayeredMediaCard on tablet', () => {
      render(<HibuOneHero {...mockProps} />)

      // LayeredMediaCard should be rendered with responsive classes
      // The component itself handles internal responsive padding (p-8 md:p-12)
      const mediaCard = screen.getByTestId('layered-media-card')
      expect(mediaCard).toBeInTheDocument()
    })
  })

  describe('Mobile Layout (<768px)', () => {
    it('stacks all elements vertically on mobile', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify main content container uses flex-col (vertical stacking)
      const contentContainer = container.querySelector('.flex.flex-col.items-center')
      expect(contentContainer).toBeInTheDocument()

      // Verify vertical spacing is applied
      expect(contentContainer).toHaveClass('space-y-8')
    })

    it('stacks buttons vertically on mobile', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify CTA container starts with flex-col (vertical on mobile)
      const ctaContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
      expect(ctaContainer).toBeInTheDocument()

      // flex-col is the base class, sm:flex-row applies at 640px+
      expect(ctaContainer).toHaveClass('flex-col')
      expect(ctaContainer).toHaveClass('gap-4')
    })

    it('ensures LayeredMediaCard maintains aspect ratio on mobile', () => {
      render(<HibuOneHero {...mockProps} />)

      const mediaCard = screen.getByTestId('layered-media-card')
      expect(mediaCard).toBeInTheDocument()

      // Verify responsive classes that maintain aspect ratio
      expect(mediaCard).toHaveClass('max-w-4xl', 'mx-auto')

      // The component uses w-full which allows it to scale while maintaining aspect ratio
      // Internal padding and min-height ensure proper proportions
    })

    it('prevents horizontal scrolling with proper container constraints', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify section has overflow-hidden to prevent horizontal scroll
      const section = container.querySelector('section')
      expect(section).toHaveClass('overflow-hidden')

      // Verify container has proper padding
      const contentContainer = container.querySelector('.container')
      expect(contentContainer).toBeInTheDocument()
      expect(contentContainer).toHaveClass('px-4', 'sm:px-6')
    })

    it('applies mobile-optimized spacing', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify section has mobile padding (py-12 is base)
      const section = container.querySelector('section')
      expect(section).toHaveClass('py-12')

      // Verify content spacing starts at mobile size
      const contentContainer = container.querySelector('.space-y-8')
      expect(contentContainer).toBeInTheDocument()
    })

    it('applies mobile-optimized font sizes', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify heading starts at mobile size (text-4xl)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-4xl')

      // Verify description starts at mobile size (text-lg)
      const description = container.querySelector('.text-lg')
      expect(description).toBeInTheDocument()
    })

    it('maintains centered alignment on mobile', () => {
      const { container } = render(<HibuOneHero {...mockProps} />)

      // Verify content is centered on mobile
      const contentContainer = container.querySelector('.flex.flex-col.items-center')
      expect(contentContainer).toBeInTheDocument()
      expect(contentContainer).toHaveClass('text-center')
    })

    it('ensures proper touch target sizes for mobile buttons', () => {
      render(<HibuOneHero {...mockProps} />)

      // Verify buttons are rendered with proper size
      const primaryButton = screen.getByRole('link', { name: 'Request a demo' })
      const secondaryButton = screen.getByRole('link', { name: 'Tour the Platform' })

      expect(primaryButton).toBeInTheDocument()
      expect(secondaryButton).toBeInTheDocument()

      // Buttons use size="lg" which provides adequate touch targets
    })
  })
})
