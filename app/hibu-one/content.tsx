/**
 * Content data structure for Hibu One landing page
 * Single source of truth for all page content
 */

import React from 'react'

export interface CTAButton {
  text: string
  href: string
  variant: 'primary' | 'secondary' | 'outline'
}

export interface FeatureCard {
  title: string
  description: string
  icon?: string
}

export interface MediaCard {
  url: string
  alt: string
  type: 'image' | 'video'
}

export interface SectionContent {
  heading: string
  subheading?: string
  description: string
  features?: string[]
  ctas?: CTAButton[]
  media?: MediaCard
}

export interface HeroContent extends SectionContent {
  description: string | React.ReactNode
  primaryCTA: CTAButton
  secondaryCTA: CTAButton
  media: MediaCard
  mediaCard?: {
    logo?: string
    logoAlt?: string
    tagline?: string
    watchCTA?: {
      text: string
      href?: string
    }
    mockups?: Array<{
      url: string
      alt: string
      position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
    }>
  }
}

export interface HibuOnePageContent {
  hero: HeroContent
  marketingBenefits: {
    cards: [FeatureCard, FeatureCard]
  }
  featurePanel: SectionContent & {
    dashboardImages: string[]
  }
  adCampaigns: SectionContent & {
    media: MediaCard
  }
  organicMarketing: SectionContent
  dashboardShowcase: SectionContent & {
    media: MediaCard
  }
  finalCTA: SectionContent & {
    cta: CTAButton
  }
}

export const hibuOneContent: HibuOnePageContent = {
  hero: {
    heading: 'Hibu One',
    subheading: 'Simplify Your Digital Marketing',
    description: (
      <>
        We help you <strong>establish your business online</strong>,{' '}
        <strong>promote it everywhere</strong>, and{' '}
        <strong>get the results and support</strong> you need to succeed.
      </>
    ),
    primaryCTA: {
      text: 'Request a demo',
      href: '/contact',
      variant: 'primary',
    },
    secondaryCTA: {
      text: 'Tour the Platform',
      href: '/demo',
      variant: 'outline',
    },
    media: {
      url: '/images/hibu-one/hero-dashboard.jpg',
      alt: 'Hibu One platform overview',
      type: 'image',
    },
    mediaCard: {
      logo: '/images/hibu-one/hibu-one-logo.svg',
      logoAlt: 'hibu ONE logo',
      tagline: 'Enterprise-level marketing built for local businesses',
      watchCTA: {
        text: 'WATCH NOW ▶',
        href: '/demo-video',
      },
      mockups: [
        {
          url: '/images/hibu-one/mockup-website.png',
          alt: 'Website preview mockup',
          position: 'top-left',
        },
        {
          url: '/images/hibu-one/mockup-reviews.png',
          alt: 'Review card mockup',
          position: 'top-right',
        },
        {
          url: '/images/hibu-one/mockup-listings.png',
          alt: 'Local listings mockup',
          position: 'bottom-right',
        },
      ],
    },
  },

  marketingBenefits: {
    cards: [
      {
        title: 'One Platform',
        description:
          'Manage all your marketing channels from a single, intuitive dashboard. No more juggling multiple tools and logins.',
        icon: 'platform',
      },
      {
        title: 'One Provider',
        description:
          'Work with a single trusted partner for all your digital marketing needs. Simplified billing, support, and strategy.',
        icon: 'provider',
      },
    ],
  },

  featurePanel: {
    heading: 'Everything You Need in One Place',
    description:
      'Hibu One brings together all your marketing tools with powerful features designed to help your business grow.',
    features: [
      'Unified campaign management',
      'Real-time performance tracking',
      'Automated reporting and insights',
      'Multi-channel optimization',
    ],
    dashboardImages: [
      '/images/hibu-one/dashboard-overview.jpg',
      '/images/hibu-one/dashboard-analytics.jpg',
      '/images/hibu-one/dashboard-campaigns.jpg',
    ],
  },

  adCampaigns: {
    heading: 'Powerful Ad Campaign Management',
    description:
      'Create, launch, and optimize advertising campaigns across Google, Facebook, and more—all from one platform.',
    features: [
      'Multi-platform ad creation',
      'Budget optimization',
      'Performance tracking',
      'A/B testing tools',
      'Automated bid management',
    ],
    media: {
      url: '/images/hibu-one/ad-campaigns.jpg',
      alt: 'Ad campaign management interface showing multi-platform advertising tools',
      type: 'image',
    },
  },

  organicMarketing: {
    heading: 'Grow Your Organic Presence',
    description:
      'Build your brand with powerful organic marketing tools including SEO, social media management, and content marketing.',
    features: [
      'SEO optimization tools',
      'Social media scheduling',
      'Content calendar management',
      'Review monitoring and response',
      'Local listing management',
    ],
  },

  dashboardShowcase: {
    heading: 'All Your Data in One Dashboard',
    description:
      'Get a complete view of your marketing performance with our intuitive, all-in-one dashboard. Track campaigns, analyze results, and make data-driven decisions.',
    media: {
      url: '/images/hibu-one/dashboard-main.jpg',
      alt: 'Hibu One all-in-one dashboard displaying comprehensive marketing analytics and campaign performance metrics',
      type: 'image',
    },
  },

  finalCTA: {
    heading: 'Ready to Simplify Your Marketing?',
    description:
      'Join thousands of businesses that trust Hibu One to manage their digital marketing. Get started today and see the difference.',
    cta: {
      text: 'Start Your Free Trial',
      href: '/get-started-2026',
      variant: 'primary',
    },
  },
}
