import { render } from '@testing-library/react'
import { HibuOneFeaturePanel } from './hibu-one-feature-panel'
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
    li: ({ children, ...props }: any) => (
      <li data-testid="motion-li" {...props}>
        {children}
      </li>
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

describe('HibuOneFeaturePanel', () => {
  const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>
  const mockUseInView = useInView as jest.MockedFunction<typeof useInView>

  const defaultProps = {
    heading: 'Test Heading',
    description: 'Test Description',
    dashboardImages: ['/test1.jpg', '/test2.jpg'],
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
    const { getByText } = render(<HibuOneFeaturePanel {...defaultProps} />)

    expect(getByText('Test Heading')).toBeInTheDocument()
    expect(getByText('Test Description')).toBeInTheDocument()
  })

  it('should render dashboard images', () => {
    const { getAllByAltText } = render(<HibuOneFeaturePanel {...defaultProps} />)

    const images = getAllByAltText(/Dashboard mockup/i)
    expect(images).toHaveLength(2)
  })

  it('should render features list when provided', () => {
    const propsWithFeatures = {
      ...defaultProps,
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    }

    const { getByText } = render(<HibuOneFeaturePanel {...propsWithFeatures} />)

    expect(getByText('Feature 1')).toBeInTheDocument()
    expect(getByText('Feature 2')).toBeInTheDocument()
    expect(getByText('Feature 3')).toBeInTheDocument()
  })

  it('should not render features list when not provided', () => {
    const { container } = render(<HibuOneFeaturePanel {...defaultProps} />)

    const featureList = container.querySelector('ul')
    expect(featureList).not.toBeInTheDocument()
  })

  it('should apply green gradient background', () => {
    const { container } = render(<HibuOneFeaturePanel {...defaultProps} />)

    const panel = container.querySelector('.bg-gradient-to-br')
    expect(panel).toBeInTheDocument()
    expect(panel).toHaveClass('from-green-50', 'to-green-100')
  })

  it('should apply rounded corners', () => {
    const { container } = render(<HibuOneFeaturePanel {...defaultProps} />)

    const panel = container.querySelector('.rounded-3xl')
    expect(panel).toBeInTheDocument()
  })

  it('should apply responsive padding', () => {
    const { container } = render(<HibuOneFeaturePanel {...defaultProps} />)

    const panel = container.querySelector('.p-8')
    expect(panel).toBeInTheDocument()
  })

  it('should respect reduced motion preference', () => {
    mockUseReducedMotion.mockReturnValue(true)

    const { container } = render(<HibuOneFeaturePanel {...defaultProps} />)

    // Component should still render when reduced motion is enabled
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<HibuOneFeaturePanel {...defaultProps} />)

    const section = container.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-labelledby', 'feature-panel-heading')

    const heading = container.querySelector('#feature-panel-heading')
    expect(heading).toBeInTheDocument()
    expect(heading?.tagName).toBe('H2')
  })

  it('should apply lazy loading to images', () => {
    const { getAllByAltText } = render(<HibuOneFeaturePanel {...defaultProps} />)

    const images = getAllByAltText(/Dashboard mockup/i)
    images.forEach((img) => {
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })
})
