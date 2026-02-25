import { render } from '@testing-library/react'
import { HibuOneFinalCTA } from './hibu-one-final-cta'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useInView } from '@/hooks/use-in-view'

// Mock the hooks
jest.mock('@/hooks/use-reduced-motion')
jest.mock('@/hooks/use-in-view')

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 data-testid="motion-h2" {...props}>
        {children}
      </h2>
    ),
    p: ({ children, ...props }: any) => (
      <p data-testid="motion-p" {...props}>
        {children}
      </p>
    ),
  },
}))

describe('HibuOneFinalCTA', () => {
  const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>
  const mockUseInView = useInView as jest.MockedFunction<typeof useInView>

  const defaultProps = {
    heading: 'Ready to Simplify Your Marketing?',
    description: 'Join thousands of businesses that trust Hibu One',
    ctaText: 'Start Your Free Trial',
    ctaHref: '/signup',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseReducedMotion.mockReturnValue(false)
    mockUseInView.mockReturnValue({
      ref: { current: null },
      isInView: true,
    })
  })

  it('should render with required props', () => {
    const { getByText } = render(<HibuOneFinalCTA {...defaultProps} />)

    expect(getByText('Ready to Simplify Your Marketing?')).toBeInTheDocument()
    expect(getByText('Join thousands of businesses that trust Hibu One')).toBeInTheDocument()
    expect(getByText('Start Your Free Trial')).toBeInTheDocument()
  })

  it('should render CTA button with correct href', () => {
    const { getByText } = render(<HibuOneFinalCTA {...defaultProps} />)

    const ctaButton = getByText('Start Your Free Trial')
    expect(ctaButton).toHaveAttribute('href', '/signup')
  })

  it('should apply dark navy background', () => {
    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    const section = container.querySelector('.bg-slate-900')
    expect(section).toBeInTheDocument()
  })

  it('should apply white text to heading', () => {
    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    const heading = container.querySelector('.text-white')
    expect(heading).toBeInTheDocument()
  })

  it('should apply centered text layout', () => {
    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    const textContainer = container.querySelector('.text-center')
    expect(textContainer).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', 'final-cta-heading')

    const heading = container.querySelector('#final-cta-heading')
    expect(heading).toBeInTheDocument()
    expect(heading?.tagName).toBe('H2')
  })

  it('should have responsive padding', () => {
    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    const section = container.querySelector('.py-16')
    expect(section).toBeInTheDocument()
  })

  it('should respect reduced motion preference', () => {
    mockUseReducedMotion.mockReturnValue(true)

    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    // Component should still render when reduced motion is enabled
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should apply primary button styling to CTA', () => {
    const { getByText } = render(<HibuOneFinalCTA {...defaultProps} />)

    const ctaButton = getByText('Start Your Free Trial')
    expect(ctaButton).toHaveClass('bg-primary')
  })

  it('should have keyboard accessible CTA button', () => {
    const { getByText } = render(<HibuOneFinalCTA {...defaultProps} />)

    const ctaButton = getByText('Start Your Free Trial')
    expect(ctaButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary')
  })

  it('should have proper focus ring offset for dark background', () => {
    const { getByText } = render(<HibuOneFinalCTA {...defaultProps} />)

    const ctaButton = getByText('Start Your Free Trial')
    expect(ctaButton).toHaveClass('focus:ring-offset-slate-900')
  })

  it('should apply slate-300 text color to description', () => {
    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    const description = container.querySelector('.text-slate-300')
    expect(description).toBeInTheDocument()
  })

  it('should have max-width constraint on content', () => {
    const { container } = render(<HibuOneFinalCTA {...defaultProps} />)

    const contentContainer = container.querySelector('.max-w-4xl')
    expect(contentContainer).toBeInTheDocument()
  })
})
