import { render, screen } from '@testing-library/react'
import { TestimonialsSection } from './testimonials-section'
import { useInView } from '@/hooks/use-in-view'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// Mock the hooks
jest.mock('@/hooks/use-in-view')
jest.mock('@/hooks/use-reduced-motion')

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('TestimonialsSection', () => {
  const mockUseInView = useInView as jest.MockedFunction<typeof useInView>
  const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseReducedMotion.mockReturnValue(false)
    mockUseInView.mockReturnValue({
      ref: { current: null },
      isInView: true,
    })
  })
  it('renders the section heading', () => {
    render(<TestimonialsSection />)
    
    expect(screen.getByText('Real clients. Real results.')).toBeInTheDocument()
  })

  it('renders the section heading as h2', () => {
    render(<TestimonialsSection />)
    
    const heading = screen.getByText('Real clients. Real results.')
    expect(heading.tagName).toBe('H2')
  })

  it('renders VideoTestimonialCard component', () => {
    render(<TestimonialsSection />)
    
    // Check for video testimonial label
    expect(screen.getByText('Appliance Services Video Testimonial')).toBeInTheDocument()
  })

  it('renders ClientReviewCard component', () => {
    render(<TestimonialsSection />)
    
    // Check for client review label
    expect(screen.getByText('Dental Practice Client Review')).toBeInTheDocument()
  })

  it('renders CaseStudyCard component', () => {
    render(<TestimonialsSection />)
    
    // Check for case study label
    expect(screen.getByText('Auto Body Case Study')).toBeInTheDocument()
  })

  it('has light background with theme support', () => {
    render(<TestimonialsSection />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('bg-gray-50', 'dark:bg-gray-900/50')
  })

  it('uses two-column responsive layout', () => {
    render(<TestimonialsSection />)
    
    // Check for grid layout classes
    const grid = document.querySelector('.grid')
    expect(grid).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
  })

  it('places ClientReviewCard and CaseStudyCard in right column container', () => {
    render(<TestimonialsSection />)
    
    // Check for space-y container that holds both cards
    const rightColumn = document.querySelector('.space-y-6')
    expect(rightColumn).toBeInTheDocument()
  })

  it('applies responsive padding', () => {
    render(<TestimonialsSection />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('py-16', 'sm:py-20', 'md:py-24')
  })

  it('applies responsive gap between columns', () => {
    render(<TestimonialsSection />)
    
    const grid = document.querySelector('.grid')
    expect(grid).toHaveClass('gap-8', 'lg:gap-12')
  })

  it('includes transition-colors for theme switching', () => {
    render(<TestimonialsSection />)
    
    const section = document.querySelector('section')
    expect(section).toHaveClass('transition-colors', 'duration-300')
  })

  it('centers the heading text', () => {
    render(<TestimonialsSection />)
    
    const heading = screen.getByText('Real clients. Real results.')
    expect(heading).toHaveClass('text-center')
  })

  it('applies responsive heading font sizes', () => {
    render(<TestimonialsSection />)
    
    const heading = screen.getByText('Real clients. Real results.')
    expect(heading).toHaveClass('text-3xl', 'sm:text-4xl', 'md:text-5xl')
  })

  it('applies responsive heading margin', () => {
    render(<TestimonialsSection />)
    
    const heading = screen.getByText('Real clients. Real results.')
    expect(heading).toHaveClass('mb-12', 'sm:mb-16')
  })

  it('uses container with responsive padding', () => {
    render(<TestimonialsSection />)
    
    const container = document.querySelector('.container')
    expect(container).toHaveClass('px-4', 'sm:px-6')
  })
})
