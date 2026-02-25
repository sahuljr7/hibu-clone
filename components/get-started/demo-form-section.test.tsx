import { render, screen } from '@testing-library/react'
import { DemoFormSection } from './demo-form-section'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
}))

// Mock the DemoRequestForm component
jest.mock('./demo-request-form', () => ({
  DemoRequestForm: () => <div data-testid="demo-request-form">Demo Request Form</div>,
}))

describe('DemoFormSection', () => {
  it('renders the heading', () => {
    render(<DemoFormSection />)
    expect(
      screen.getByText(/Ready to get started\? Request your digital marketing demo/i)
    ).toBeInTheDocument()
  })

  it('renders all three benefits with numbered badges', () => {
    render(<DemoFormSection />)

    // Check for numbered badges
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()

    // Check for benefit text
    expect(
      screen.getByText(/See how your website, ads, reviews and leads work together/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Get personalized recommendations for your business/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Learn how Hibu can help you grow your digital presence/i)
    ).toBeInTheDocument()
  })

  it('renders the DemoRequestForm component', () => {
    render(<DemoFormSection />)
    expect(screen.getByTestId('demo-request-form')).toBeInTheDocument()
  })

  it('applies the green gradient background classes', () => {
    const { container } = render(<DemoFormSection />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('bg-gradient-to-br')
    expect(section).toHaveClass('from-green-50')
  })

  it('uses two-column layout on large screens', () => {
    const { container } = render(<DemoFormSection />)
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('lg:grid-cols-2')
  })
})
