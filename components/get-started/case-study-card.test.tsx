import { render, screen } from '@testing-library/react'
import { CaseStudyCard } from './case-study-card'

describe('CaseStudyCard', () => {
  it('renders the label correctly', () => {
    render(<CaseStudyCard />)
    expect(screen.getByText('Auto Body Case Study')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<CaseStudyCard />)
    expect(
      screen.getByText(/Discover how a local auto body shop increased their online visibility/i)
    ).toBeInTheDocument()
  })

  it('renders the download link with correct text', () => {
    render(<CaseStudyCard />)
    const link = screen.getByRole('link', { name: /Download the case study/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/resources/case-studies/auto-body')
  })

  it('applies card styling with theme support classes', () => {
    const { container } = render(<CaseStudyCard />)
    const card = container.firstChild as HTMLElement

    expect(card).toHaveClass('p-6')
    expect(card).toHaveClass('rounded-xl')
    expect(card).toHaveClass('bg-card')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-border')
    expect(card).toHaveClass('shadow-md')
    expect(card).toHaveClass('transition-colors')
  })

  it('renders yellow square icon container with magnifying glass', () => {
    const { container } = render(<CaseStudyCard />)
    const iconContainer = container.querySelector('.bg-yellow-400')

    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('w-16')
    expect(iconContainer).toHaveClass('h-16')
    expect(iconContainer).toHaveClass('rounded-lg')
    expect(iconContainer).toHaveClass('dark:bg-yellow-500')
  })

  it('renders download icon in the link', () => {
    render(<CaseStudyCard />)
    const link = screen.getByRole('link', { name: /Download the case study/i })
    // The Download icon from lucide-react should be present
    expect(link.querySelector('svg')).toBeInTheDocument()
  })
})
