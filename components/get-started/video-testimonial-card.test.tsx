import { render, screen } from '@testing-library/react'
import { VideoTestimonialCard } from './video-testimonial-card'

describe('VideoTestimonialCard', () => {
  it('renders the label text', () => {
    render(<VideoTestimonialCard />)
    
    expect(screen.getByText('Appliance Services Video Testimonial')).toBeInTheDocument()
  })

  it('renders the brand logo overlay', () => {
    render(<VideoTestimonialCard />)
    
    expect(screen.getByText('Peerless Appliance')).toBeInTheDocument()
  })

  it('renders "A Client Success Story" text overlay', () => {
    render(<VideoTestimonialCard />)
    
    expect(screen.getByText('A Client Success Story')).toBeInTheDocument()
  })

  it('renders the person name tag', () => {
    render(<VideoTestimonialCard />)
    
    expect(screen.getByText('Scott Reilly, Owner')).toBeInTheDocument()
  })

  it('renders the Hibu logo', () => {
    render(<VideoTestimonialCard />)
    
    expect(screen.getByText('hibu')).toBeInTheDocument()
  })

  it('renders the quote text', () => {
    render(<VideoTestimonialCard />)
    
    const quote = screen.getByText(/Hibu maximizes my results/i)
    expect(quote).toBeInTheDocument()
    expect(quote.tagName).toBe('BLOCKQUOTE')
  })

  it('renders video play button icon', () => {
    render(<VideoTestimonialCard />)
    
    // Check for SVG play icon
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg?.querySelector('path')).toHaveAttribute('d', 'M8 5v14l11-7z')
  })

  it('has proper aspect ratio for video area', () => {
    render(<VideoTestimonialCard />)
    
    // Check for aspect-video class
    const videoArea = document.querySelector('.aspect-video')
    expect(videoArea).toBeInTheDocument()
  })

  it('applies theme-responsive styling classes', () => {
    render(<VideoTestimonialCard />)
    
    // Check for dark mode classes
    const card = document.querySelector('.bg-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('border', 'border-border', 'shadow-lg')
  })

  it('includes transition-colors for theme switching', () => {
    render(<VideoTestimonialCard />)
    
    // Check for transition classes
    const transitionElements = document.querySelectorAll('.transition-colors')
    expect(transitionElements.length).toBeGreaterThan(0)
  })
})
