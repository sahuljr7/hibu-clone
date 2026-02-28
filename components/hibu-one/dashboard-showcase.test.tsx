import { render } from '@testing-library/react'
import { DashboardShowcase } from './dashboard-showcase'
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

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('DashboardShowcase', () => {
  const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>
  const mockUseInView = useInView as jest.MockedFunction<typeof useInView>

  const defaultProps = {
    heading: 'All Your Data in One Dashboard',
    description: 'Get a complete view of your marketing performance',
    dashboardUrl: '/images/hibu-one/dashboard-main.jpg',
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
    const { getByText } = render(<DashboardShowcase {...defaultProps} />)

    expect(getByText('All Your Data in One Dashboard')).toBeInTheDocument()
    expect(getByText('Get a complete view of your marketing performance')).toBeInTheDocument()
  })

  it('should render dashboard image with correct alt text', () => {
    const { getByAltText } = render(<DashboardShowcase {...defaultProps} />)

    const image = getByAltText(/Hibu One all-in-one dashboard/i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/hibu-one/dashboard-main.jpg')
  })

  it('should apply purple gradient background to media card', () => {
    const { container } = render(<DashboardShowcase {...defaultProps} />)

    const mediaCard = container.querySelector('.bg-gradient-to-br')
    expect(mediaCard).toBeInTheDocument()
    expect(mediaCard).toHaveClass('from-purple-500', 'to-purple-700')
  })

  it('should apply rounded-xl corners to media card', () => {
    const { container } = render(<DashboardShowcase {...defaultProps} />)

    const mediaCard = container.querySelector('.rounded-xl')
    expect(mediaCard).toBeInTheDocument()
  })

  it('should apply shadow-2xl to media card', () => {
    const { container } = render(<DashboardShowcase {...defaultProps} />)

    const mediaCard = container.querySelector('.shadow-2xl')
    expect(mediaCard).toBeInTheDocument()
  })

  it('should apply lazy loading to image', () => {
    const { getByAltText } = render(<DashboardShowcase {...defaultProps} />)

    const image = getByAltText(/Hibu One all-in-one dashboard/i)
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('should respect reduced motion preference', () => {
    mockUseReducedMotion.mockReturnValue(true)

    const { container } = render(<DashboardShowcase {...defaultProps} />)

    // Component should still render when reduced motion is enabled
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<DashboardShowcase {...defaultProps} />)

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', 'dashboard-showcase-heading')

    const heading = container.querySelector('#dashboard-showcase-heading')
    expect(heading).toBeInTheDocument()
    expect(heading?.tagName).toBe('H2')
  })

  it('should have centered text layout', () => {
    const { container } = render(<DashboardShowcase {...defaultProps} />)

    const textContainer = container.querySelector('.text-center')
    expect(textContainer).toBeInTheDocument()
  })

  it('should have responsive padding', () => {
    const { container } = render(<DashboardShowcase {...defaultProps} />)

    const section = container.querySelector('.py-12')
    expect(section).toBeInTheDocument()
  })

  it('should have white background', () => {
    const { container } = render(<DashboardShowcase {...defaultProps} />)

    const section = container.querySelector('.bg-white')
    expect(section).toBeInTheDocument()
  })
})
