/**
 * Content data structure for Hibu One landing page
 * Single source of truth for all page content
 */

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

export interface HibuOnePageContent {
  hero: SectionContent & {
    primaryCTA: CTAButton
    secondaryCTA: CTAButton
    media: MediaCard
  }
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
    heading: 'Hibu One: Your All-in-One Marketing Platform',
    subheading: 'Simplify Your Digital Marketing',
    description:
      'Manage all your digital marketing campaigns from one powerful platform. Hibu One combines advertising, organic marketing, and analytics into a seamless experience.',
    primaryCTA: {
      text: 'Get Started',
      href: '/contact',
      variant: 'primary',
    },
    secondaryCTA: {
      text: 'Watch Demo',
      href: '/demo',
      variant: 'outline',
    },
    media: {
      url: '/images/hibu-one/hero-dashboard.jpg',
      alt: 'Hibu One dashboard showing unified marketing platform interface',
      type: 'image',
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
