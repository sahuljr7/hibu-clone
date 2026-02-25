import { render, screen } from '@testing-library/react'
import { ClientReviewCard } from './client-review-card'

describe('ClientReviewCard', () => {
  it('renders the label correctly', () => {
    render(<ClientReviewCard />)
    expect(screen.getByText('Dental Practice Client Review')).toBeInTheDocument()
  })

  it('renders the review text', () => {
    render(<ClientReviewCard />)
    expect(
      screen.getByText(/Working with Hibu has transformed our online presence/i)
    ).toBeInTheDocument()
  })

  it('renders the attribution with name and business', () => {
    render(<ClientReviewCard />)
    expect(screen.getByText('Samantha N. | Smile Envy')).toBeInTheDocument()
  })

  it('applies card styling with theme support classes', () => {
    const { container } = render(<ClientReviewCard />)
    const card = container.firstChild as HTMLElement

    expect(card).toHaveClass('p-6')
    expect(card).toHaveClass('rounded-xl')
    expect(card).toHaveClass('bg-card')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-border')
    expect(card).toHaveClass('shadow-md')
    expect(card).toHaveClass('transition-colors')
  })

  it('renders yellow square icon container', () => {
    const { container } = render(<ClientReviewCard />)
    const iconContainer = container.querySelector('.bg-yellow-400')

    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('w-16')
    expect(iconContainer).toHaveClass('h-16')
    expect(iconContainer).toHaveClass('rounded-lg')
    expect(iconContainer).toHaveClass('dark:bg-yellow-500')
  })
})
