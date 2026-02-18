'use client'

import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'vimeo'

interface SocialIconProps {
  platform: SocialPlatform
  href: string
  label: string
}

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  vimeo: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.3 5.6c0-1.6-1.3-2.9-2.9-2.9h-11c-1.6 0-2.9 1.3-2.9 2.9v8.8c0 1.6 1.3 2.9 2.9 2.9h11c1.6 0 2.9-1.3 2.9-2.9V5.6zm-5.3 6.1c-1.1.7-2.1.4-2.5-.6-.3-1 0-2.5 1.1-3.2 1.1-.7 2.1-.4 2.5.6.3 1 0 2.5-1.1 3.2z" />
    </svg>
  ),
}

export function SocialIcon({ platform, href, label }: SocialIconProps) {
  const Icon = platform === 'vimeo' ? socialIcons.vimeo : socialIcons[platform as keyof typeof socialIcons]

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110 touch-manipulation"
    >
      <Icon size={20} />
    </a>
  )
}
