'use client'

const features = [
  {
    title: 'Powered by AI and predictive target marketing',
    description: 'the optimization engine that drives the success of your ad campaigns and organic marketing',
  },
  {
    title: 'Backed by decades of proprietary local business data',
    description: 'and campaign management expertise',
  },
  {
    title: 'More than just lead generation',
    description: 'all the tools you need to manage, convert and retain those leads as high-value customers',
  },
]

export function FeatureBullets() {
  return (
    <ul className="space-y-3 sm:space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex gap-3 sm:gap-4">
          <span className="text-accent flex-shrink-0 pt-1 sm:pt-1.5">●</span>
          <span className="text-sm sm:text-base text-white/90 leading-relaxed">
            <span className="font-semibold text-white">{feature.title}</span> — {feature.description}
          </span>
        </li>
      ))}
    </ul>
  )
}
