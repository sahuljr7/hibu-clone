'use client'

import { FooterColumn } from './footer-column'
import { PodcastSection } from './podcast-section'

export function FooterTop() {
  const aboutUsLinks = [
    { label: 'Leadership Team', href: '#' },
    { label: 'Locations', href: '#' },
    { label: 'National Sales', href: '#' },
    { label: 'Trusted Providers', href: '#' },
    { label: 'News & Press', href: '#' },
  ]

  const workWithUsLinks = [
    { label: 'Careers', href: '#' },
    { label: 'Become a Client', href: '#' },
    { label: 'Client Reviews', href: '#' },
  ]

  const supportLinks = [
    { label: 'Client Support', href: '#' },
    { label: 'Hibu Blog', href: '#' },
    { label: 'Transparency in Coverage', href: '#' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 pb-8 sm:pb-10 border-b border-border">
      <FooterColumn title="About Us" links={aboutUsLinks} />
      <FooterColumn title="Work With Us" links={workWithUsLinks} />
      <FooterColumn title="Support & Resources" links={supportLinks} />
      <PodcastSection />
    </div>
  )
}
