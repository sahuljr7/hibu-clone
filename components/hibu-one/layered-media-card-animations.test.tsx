/**
 * Animation timing tests for LayeredMediaCard component
 * 
 * Validates Requirements 6.2, 6.3:
 * - LayeredMediaCard: delay 0.6s, duration 0.6s
 * - Easing function: [0.4, 0, 0.2, 1]
 * - Mockups: staggered animation starting at 0.8s with 0.1s intervals
 */

import { render } from '@testing-library/react'
import { LayeredMediaCard } from './layered-media-card'

// Store motion component calls for inspection
const motionCalls: any[] = []

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion')
  return {
    ...actual,
    motion: {
      div: jest.fn((props: any) => {
        motionCalls.push({ type: 'div', props })
        return <div {...props}>{props.children}</div>
      }),
    },
  }
})

jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: jest.fn(() => false),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('LayeredMediaCard Animation Timing', () => {
  beforeEach(() => {
    motionCalls.length = 0
  })

  it('applies correct animation timing to card (delay 0.6s, duration 0.6s)', () => {
    render(<LayeredMediaCard tagline="Test tagline" />)

    // The first motion.div call is the card wrapper
    const cardCall = motionCalls[0]
    expect(cardCall).toBeDefined()
    expect(cardCall.props.transition.delay).toBe(0.6)
    expect(cardCall.props.transition.duration).toBe(0.6)
    expect(cardCall.props.transition.ease).toEqual([0.4, 0, 0.2, 1])
  })

  it('applies correct initial and animate states to card', () => {
    render(<LayeredMediaCard tagline="Test tagline" />)

    const cardCall = motionCalls[0]
    expect(cardCall.props.initial).toEqual({ opacity: 0, y: 30 })
    expect(cardCall.props.animate).toEqual({ opacity: 1, y: 0 })
  })

  it('applies staggered animation to mockups starting at 0.8s', () => {
    const mockups = [
      { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' as const },
      { url: '/mockup2.png', alt: 'Mockup 2', position: 'top-right' as const },
      { url: '/mockup3.png', alt: 'Mockup 3', position: 'bottom-right' as const },
    ]

    render(<LayeredMediaCard mockups={mockups} />)

    // First call is the card wrapper, subsequent calls are mockups
    const mockupCalls = motionCalls.slice(1)

    expect(mockupCalls).toHaveLength(3)

    // Verify staggered delays: 0.8s, 0.9s, 1.0s
    expect(mockupCalls[0].props.transition.delay).toBe(0.8)
    expect(mockupCalls[1].props.transition.delay).toBe(0.9)
    expect(mockupCalls[2].props.transition.delay).toBe(1.0)

    // Verify all have same duration and easing
    mockupCalls.forEach(call => {
      expect(call.props.transition.duration).toBe(0.6)
      expect(call.props.transition.ease).toEqual([0.4, 0, 0.2, 1])
    })
  })

  it('applies correct initial and animate states to mockups', () => {
    const mockups = [
      { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' as const },
    ]

    render(<LayeredMediaCard mockups={mockups} />)

    const mockupCall = motionCalls[1]
    expect(mockupCall.props.initial).toEqual({ opacity: 0, scale: 0.8 })
    expect(mockupCall.props.animate).toEqual({ opacity: 1, scale: 1 })
  })

  it('maintains consistent easing function across card and mockups', () => {
    const mockups = [
      { url: '/mockup1.png', alt: 'Mockup 1', position: 'top-left' as const },
      { url: '/mockup2.png', alt: 'Mockup 2', position: 'bottom-right' as const },
    ]

    render(<LayeredMediaCard mockups={mockups} tagline="Test" />)

    // All motion calls should have the same easing
    motionCalls.forEach(call => {
      expect(call.props.transition.ease).toEqual([0.4, 0, 0.2, 1])
    })
  })

  it('respects reduced motion preference', () => {
    const { useReducedMotion } = require('@/hooks/use-reduced-motion')
    useReducedMotion.mockReturnValue(true)

    motionCalls.length = 0

    render(<LayeredMediaCard tagline="Test tagline" />)

    const cardCall = motionCalls[0]
    
    // With reduced motion, delay should be 0 and duration should be 0.1
    expect(cardCall.props.transition.delay).toBe(0)
    expect(cardCall.props.transition.duration).toBe(0.1)
    expect(cardCall.props.initial).toEqual({})
  })
})
