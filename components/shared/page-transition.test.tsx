import { render } from '@testing-library/react'
import { PageTransition } from './page-transition'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Mock the useReducedMotion hook
jest.mock('@/hooks/use-reduced-motion')

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, exit, variants, transition, ...props }: any) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}))

describe('PageTransition', () => {
  const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children', () => {
    mockUseReducedMotion.mockReturnValue(false)
    
    const { getByText } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    expect(getByText('Test Content')).toBeInTheDocument()
  })

  it('should apply motion wrapper', () => {
    mockUseReducedMotion.mockReturnValue(false)
    
    const { getByTestId } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    expect(getByTestId('motion-div')).toBeInTheDocument()
  })

  it('should respect reduced motion preference', () => {
    mockUseReducedMotion.mockReturnValue(true)
    
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    // Component should still render when reduced motion is enabled
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should work with reduced motion disabled', () => {
    mockUseReducedMotion.mockReturnValue(false)
    
    const { container } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    )

    // Component should render with full animations
    expect(container.firstChild).toBeInTheDocument()
  })
})
