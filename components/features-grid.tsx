'use client'

import { FeatureCard } from './feature-card'
import {
  MapPin,
  Star,
  MessageSquare,
  Mail,
  Globe,
  BarChart3,
  Zap,
  TrendingUp,
  Settings,
} from 'lucide-react'

const features = [
  {
    icon: <MapPin size={28} />,
    title: 'Listings Management',
    description: 'Correct and protect your most important business information to make sure it\'s consistent everywhere',
  },
  {
    icon: <Star size={28} />,
    title: 'Review Generation',
    description: 'Build trust by collecting and highlighting reviews from your customers on Google, your website and more',
  },
  {
    icon: <MessageSquare size={28} />,
    title: 'Reputation Management',
    description: 'Monitor and respond to everything your customers say about your business online to make the right first impression',
  },
  {
    icon: <Mail size={28} />,
    title: 'Marketing Automation',
    description: 'Automate your email and text marketing, turning more leads into new customers and repeat buyers',
  },
  {
    icon: <Globe size={28} />,
    title: 'Hibu One Smart Site',
    description: 'Get a professionally built website designed to get you found and turn site visitors into new customers',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'All-in-one Dashboard',
    description: 'Keep track of all of your marketing results and manage all your messages and leads in one simple dashboard',
  },
  {
    icon: <Zap size={28} />,
    title: 'Ad Campaigns',
    description: 'Target your ideal customers with paid ad campaigns on Google, Facebook, Amazon, Bing and more — all powered by Hibu One',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Organic Marketing',
    description: 'Maximize your visibility in AI search results, on Google and more with a dedicated SEO campaign — powered by Hibu One',
  },
  {
    icon: <Settings size={28} />,
    title: 'Campaign Management',
    description: 'AI insights and hands-on monitoring from your Hibu team keep your marketing optimized and working better together',
  },
]

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
  )
}
