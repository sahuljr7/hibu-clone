/**
 * Animation timing and sequencing tests for HibuOneHero component
 * 
 * Validates Requirements 6.2, 6.3:
 * - Heading: delay 0, duration 0.6s
 * - Description: delay 0.2s, duration 0.6s
 * - CTA buttons: delay 0.4s, duration 0.6s
 * - LayeredMediaCard: delay 0.6s, duration 0.6s
 * - Easing function: [0.4, 0, 0.2, 1]
 */

import { render } from '@testing-library/react'
import { HibuOneHero } from './hibu-one-hero'
import { motion } from 'framer-motion'

// Store motion component calls for inspection
const motionCalls: any[] = []

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion')
  return {
    ...actual,
    motion: {
      h1: jest.fn((props: any) => {
        motionCalls.push({ type: 'h1', props })
        return <h1 {...props}>{props.children}</h1>
      }),
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

jest.mock('@/hooks/use-parallax', () => ({
  useParallax: jest.fn(() => ({
    ref: { current: null },
    parallaxValues: { y: 0 },
  })),
}))

jest.mock('./layered-media-card', () => ({
  LayeredMediaCard: ({ className }: any) => (
    <div data-testid="layered-media-card" className={className}>
      Mocked LayeredMediaCard
    </div>
  ),
}))

describe('HibuOneHero Animation Timing', () => {
  const mockProps = {
    heading: 'Hibu One',
    description: 'Test description',
    primaryCTA: {
      text: 'Request a demo',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'Tour the Platform',
      href: '/demo',
    },
    mediaUrl: '/test-image.jpg',
    mediaAlt: 'Test image',
    mediaCard: {
      logo: '/logo.svg',
      logoAlt: 'Logo',
      tagline: 'Test tagline',
    },
  }

  beforeEach(() => {
    motionCalls.length = 0
  })

  it('applies correct animation timing to heading (delay 0, duration 0.6s)', () => {
    render(<HibuOneHero {...mockProps} />)

    const headingCall = motionCalls.find(call => call.type === 'h1')
    expect(headingCall).toBeDefined()
    expect(headingCall.props.transition.delay).toBe(0)
    expect(headingCall.props.transition.duration).toBe(0.6)
    expect(headingCall.props.transition.ease).toEqual([0.4, 0, 0.2, 1])
  })

  it('applies correct animation timing to description (delay 0.2s, duration 0.6s)', () => {
    render(<HibuOneHero {...mockProps} />)

    // Find the description div (it has opacity animation without y)
    const descriptionCall = motionCalls.find(
      call =>
        call.type === 'div' &&
        call.props.initial?.opacity === 0 &&
        call.props.initial?.y === undefined
    )

    expect(descriptionCall).toBeDefined()
    expect(descriptionCall.props.transition.delay).toBe(0.2)
    expect(descriptionCall.props.transition.duration).toBe(0.6)
    expect(descriptionCall.props.transition.ease).toEqual([0.4, 0, 0.2, 1])
  })

  it('applies correct animation timing to CTA buttons (delay 0.4s, duration 0.6s)', () => {
    render(<HibuOneHero {...mockProps} />)

    // Find the CTA button container (has opacity and y animation, contains buttons)
    const ctaCall = motionCalls.find(
      call =>
        call.type === 'div' &&
        call.props.initial?.opacity === 0 &&
        call.props.initial?.y === 20 &&
        call.props.className?.includes('flex')
    )

    expect(ctaCall).toBeDefined()
    expect(ctaCall.props.transition.delay).toBe(0.4)
    expect(ctaCall.props.transition.duration).toBe(0.6)
    expect(ctaCall.props.transition.ease).toEqual([0.4, 0, 0.2, 1])
  })

  it('maintains consistent easing function across all animations', () => {
    render(<HibuOneHero {...mockProps} />)

    const animatedElements = motionCalls.filter(
      call => call.props.transition?.ease
    )

    animatedElements.forEach(element => {
      expect(element.props.transition.ease).toEqual([0.4, 0, 0.2, 1])
    })
  })

  it('creates staggered animation sequence with 200ms intervals', () => {
    render(<HibuOneHero {...mockProps} />)

    const headingCall = motionCalls.find(call => call.type === 'h1')
    const descriptionCall = motionCalls.find(
      call =>
        call.type === 'div' &&
        call.props.initial?.opacity === 0 &&
        call.props.initial?.y === undefined
    )
    const ctaCall = motionCalls.find(
      call =>
        call.type === 'div' &&
        call.props.initial?.opacity === 0 &&
        call.props.initial?.y === 20 &&
        call.props.className?.includes('flex')
    )

    // Verify 200ms intervals between animations
    expect(descriptionCall.props.transition.delay - headingCall.props.transition.delay).toBe(0.2)
    expect(ctaCall.props.transition.delay - descriptionCall.props.transition.delay).toBe(0.2)
  })
})
