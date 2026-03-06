import { render, screen } from '@testing-library/react'
import { LayeredMediaCard } from './layered-media-card'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock useReducedMotion hook
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

describe('LayeredMediaCard', () => {
  it('renders with minimal props', () => {
    const { container } = render(<LayeredMediaCard />)

    // Check for shadow layer
    const shadowLayer = container.querySelector('.bg-gradient-to-br.from-green-100')
    expect(shadowLayer).toBeInTheDocument()

    // Check for primary layer
    const primaryLayer = container.querySelector('.bg-gradient-to-br.from-purple-600')
    expect(primaryLayer).toBeInTheDocument()
  })

  it('renders logo when provided', () => {
    render(<LayeredMediaCard logo="/logo.svg" logoAlt="Test Logo" />)

    const logo = screen.getByAltText('Test Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/logo.svg')
  })

  it('renders tagline when provided', () => {
    render(<LayeredMediaCard tagline="Enterprise-level marketing" />)

    expect(screen.getByText('Enterprise-level marketing')).toBeInTheDocument()
  })

  it('renders watch CTA as link when href is provided', () => {
    render(
      <LayeredMediaCard
        watchCTA={{
          text: 'WATCH NOW ▶',
          href: '/video',
        }}
      />
    )

    const link = screen.getByRole('link', { name: 'WATCH NOW ▶' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/video')
  })

  it('renders watch CTA as button when href is not provided', () => {
    render(
      <LayeredMediaCard
        watchCTA={{
          text: 'WATCH NOW ▶',
        }}
      />
    )

    const button = screen.getByRole('button', { name: 'WATCH NOW ▶' })
    expect(button).toBeInTheDocument()
  })

  it('renders mockups with correct positioning', () => {
    const mockups = [
      {
        url: '/mockup1.png',
        alt: 'Mockup 1',
        position: 'top-left' as const,
      },
      {
        url: '/mockup2.png',
        alt: 'Mockup 2',
        position: 'bottom-right' as const,
      },
    ]

    render(<LayeredMediaCard mockups={mockups} />)

    expect(screen.getByAltText('Mockup 1')).toBeInTheDocument()
    expect(screen.getByAltText('Mockup 2')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<LayeredMediaCard className="custom-class" />)

    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('custom-class')
  })

  it('renders all elements together', () => {
    render(
      <LayeredMediaCard
        logo="/logo.svg"
        logoAlt="Logo"
        tagline="Test tagline"
        watchCTA={{
          text: 'WATCH NOW',
          href: '/video',
        }}
        mockups={[
          {
            url: '/mockup.png',
            alt: 'Mockup',
            position: 'center',
          },
        ]}
      />
    )

    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByText('Test tagline')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'WATCH NOW' })).toBeInTheDocument()
    expect(screen.getByAltText('Mockup')).toBeInTheDocument()
  })

  describe('Responsive Layout - Tablet (768px - 1023px)', () => {
    it('applies responsive padding for tablet', () => {
      const { container } = render(<LayeredMediaCard tagline="Test" />)

      // Primary layer should have responsive padding (p-8 md:p-12)
      const primaryLayer = container.querySelector('.p-8.md\\:p-12')
      expect(primaryLayer).toBeInTheDocument()
    })

    it('applies responsive logo sizing for tablet', () => {
      const { container } = render(<LayeredMediaCard logo="/logo.svg" logoAlt="Logo" />)

      // Logo container should have responsive positioning
      const logoContainer = container.querySelector('.top-6.left-6.md\\:top-8.md\\:left-8')
      expect(logoContainer).toBeInTheDocument()

      // Logo should have responsive height classes
      const logo = screen.getByAltText('Logo')
      expect(logo).toHaveClass('h-8', 'md:h-10')
    })

    it('applies responsive spacing to content for tablet', () => {
      const { container } = render(
        <LayeredMediaCard tagline="Test" watchCTA={{ text: 'WATCH' }} />
      )

      // Content container should have responsive spacing
      const contentContainer = container.querySelector('.space-y-6.md\\:space-y-8')
      expect(contentContainer).toBeInTheDocument()
    })

    it('applies responsive min-height for tablet', () => {
      const { container } = render(<LayeredMediaCard tagline="Test" />)

      // Content container should have responsive min-height
      const contentContainer = container.querySelector('.min-h-\\[300px\\].md\\:min-h-\\[400px\\]')
      expect(contentContainer).toBeInTheDocument()
    })

    it('applies responsive font sizes to tagline for tablet', () => {
      const { container } = render(<LayeredMediaCard tagline="Test tagline" />)

      // Tagline should have responsive text sizes
      const tagline = screen.getByText('Test tagline')
      expect(tagline).toHaveClass('text-xl', 'md:text-2xl', 'lg:text-3xl')
    })

    it('applies responsive font sizes to watch CTA for tablet', () => {
      render(<LayeredMediaCard watchCTA={{ text: 'WATCH NOW' }} />)

      // Watch CTA should have responsive text sizes
      const watchCTA = screen.getByRole('button', { name: 'WATCH NOW' })
      expect(watchCTA).toHaveClass('text-sm', 'md:text-base')
    })

    it('applies responsive positioning to mockups for tablet', () => {
      const { container } = render(
        <LayeredMediaCard
          mockups={[
            { url: '/mockup.png', alt: 'Mockup', position: 'top-left' },
          ]}
        />
      )

      // Mockup should have responsive positioning classes
      const mockupContainer = container.querySelector('.top-4.left-4.md\\:top-6.md\\:left-6')
      expect(mockupContainer).toBeInTheDocument()
    })

    it('scales mockup images proportionally for tablet', () => {
      render(
        <LayeredMediaCard
          mockups={[
            { url: '/mockup.png', alt: 'Mockup', position: 'center' },
          ]}
        />
      )

      // Mockup image should have responsive width classes
      const mockup = screen.getByAltText('Mockup')
      expect(mockup).toHaveClass('w-24', 'sm:w-32', 'md:w-40', 'lg:w-48')
    })
  })

  describe('Responsive Layout - Mobile (<768px)', () => {
    it('applies base padding for mobile', () => {
      const { container } = render(<LayeredMediaCard tagline="Test" />)

      // Primary layer should have base padding (p-8)
      const primaryLayer = container.querySelector('.p-8')
      expect(primaryLayer).toBeInTheDocument()
    })

    it('applies base logo sizing for mobile', () => {
      render(<LayeredMediaCard logo="/logo.svg" logoAlt="Logo" />)

      // Logo should have base height class (h-8)
      const logo = screen.getByAltText('Logo')
      expect(logo).toHaveClass('h-8')
    })

    it('applies base spacing to content for mobile', () => {
      const { container } = render(
        <LayeredMediaCard tagline="Test" watchCTA={{ text: 'WATCH' }} />
      )

      // Content container should have base spacing (space-y-6)
      const contentContainer = container.querySelector('.space-y-6')
      expect(contentContainer).toBeInTheDocument()
    })

    it('applies base min-height for mobile', () => {
      const { container } = render(<LayeredMediaCard tagline="Test" />)

      // Content container should have base min-height (min-h-[300px])
      const contentContainer = container.querySelector('.min-h-\\[300px\\]')
      expect(contentContainer).toBeInTheDocument()
    })

    it('applies base font size to tagline for mobile', () => {
      render(<LayeredMediaCard tagline="Test tagline" />)

      // Tagline should have base text size (text-xl)
      const tagline = screen.getByText('Test tagline')
      expect(tagline).toHaveClass('text-xl')
    })

    it('applies base font size to watch CTA for mobile', () => {
      render(<LayeredMediaCard watchCTA={{ text: 'WATCH NOW' }} />)

      // Watch CTA should have base text size (text-sm)
      const watchCTA = screen.getByRole('button', { name: 'WATCH NOW' })
      expect(watchCTA).toHaveClass('text-sm')
    })

    it('applies base positioning to mockups for mobile', () => {
      const { container } = render(
        <LayeredMediaCard
          mockups={[
            { url: '/mockup.png', alt: 'Mockup', position: 'bottom-right' },
          ]}
        />
      )

      // Mockup should have base positioning classes (bottom-4 right-4)
      const mockupContainer = container.querySelector('.bottom-4.right-4')
      expect(mockupContainer).toBeInTheDocument()
    })

    it('scales mockup images for mobile', () => {
      render(
        <LayeredMediaCard
          mockups={[
            { url: '/mockup.png', alt: 'Mockup', position: 'center' },
          ]}
        />
      )

      // Mockup image should have base width class (w-24)
      const mockup = screen.getByAltText('Mockup')
      expect(mockup).toHaveClass('w-24')
    })

    it('maintains aspect ratio with h-auto on mobile', () => {
      render(
        <LayeredMediaCard
          mockups={[
            { url: '/mockup.png', alt: 'Mockup', position: 'center' },
          ]}
        />
      )

      // Mockup image should have h-auto to maintain aspect ratio
      const mockup = screen.getByAltText('Mockup')
      expect(mockup).toHaveClass('h-auto')
    })

    it('maintains layered design effect on mobile', () => {
      const { container } = render(<LayeredMediaCard tagline="Test" />)

      // Shadow layer should be present
      const shadowLayer = container.querySelector('.bg-gradient-to-br.from-green-100')
      expect(shadowLayer).toBeInTheDocument()
      expect(shadowLayer).toHaveClass('absolute', '-z-10')

      // Primary layer should be present
      const primaryLayer = container.querySelector('.bg-gradient-to-br.from-purple-600')
      expect(primaryLayer).toBeInTheDocument()
      expect(primaryLayer).toHaveClass('relative')
    })
  })
})
