import { render, screen } from '@testing-library/react'
import { SectionDivider } from './section-divider'

// Mock the hooks
jest.mock('@/hooks/use-in-view', () => ({
  useInView: jest.fn(() => ({ ref: { current: null }, isInView: true })),
}))

jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(() => false),
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    path: (props: any) => <path {...props} />,
  },
}))

describe('SectionDivider', () => {
  it('renders line variant by default', () => {
    const { container } = render(<SectionDivider />)
    const divider = container.querySelector('.bg-gradient-to-r')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass('from-transparent', 'via-gray-300', 'to-transparent')
  })

  it('renders gradient variant', () => {
    const { container } = render(<SectionDivider variant="gradient" />)
    const divider = container.querySelector('.bg-gradient-to-r')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass('from-purple-500', 'via-pink-500', 'to-purple-500')
  })

  it('renders wave variant', () => {
    const { container } = render(<SectionDivider variant="wave" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    const path = container.querySelector('path')
    expect(path).toBeInTheDocument()
  })

  it('applies correct styling for line variant', () => {
    const { container } = render(<SectionDivider variant="line" />)
    const divider = container.querySelector('.h-px')
    expect(divider).toBeInTheDocument()
  })

  it('applies correct styling for gradient variant', () => {
    const { container } = render(<SectionDivider variant="gradient" />)
    const divider = container.querySelector('.h-1')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass('rounded-full')
  })
})
