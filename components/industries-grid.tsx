'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'

interface IndustryItem {
  name: string
  href: string
}

interface IndustryCategory {
  name: string
  badge: string
  items: IndustryItem[]
}

const industryCategories: IndustryCategory[] = [
  {
    name: 'Automotive Services',
    badge: 'AUTOMOTIVE SERVICES',
    items: [
      { name: 'Auto Body', href: '#' },
      { name: 'Auto Parts', href: '#' },
      { name: 'Auto Repair and Service', href: '#' },
      { name: 'Towing Services', href: '#' },
      { name: 'Window and Glass', href: '#' },
    ],
  },
  {
    name: 'Pet Services',
    badge: 'PET SERVICES',
    items: [
      { name: 'Pet Care and Supplies', href: '#' },
      { name: 'Veterinarians', href: '#' },
    ],
  },
  {
    name: 'Professional Services',
    badge: 'PROFESSIONAL SERVICES',
    items: [
      { name: 'Accounting & Tax Services', href: '#' },
      { name: 'Insurance Providers', href: '#' },
      { name: 'Law Firms', href: '#' },
      { name: 'Other Local Businesses', href: '#' },
    ],
  },
  {
    name: 'Medical',
    badge: 'MEDICAL',
    items: [
      { name: 'Chiropractors', href: '#' },
      { name: 'Dentists', href: '#' },
      { name: 'Medical Services', href: '#' },
      { name: 'Optical Goods & Services', href: '#' },
    ],
  },
  {
    name: 'Home Services',
    badge: 'HOME SERVICES',
    items: [
      { name: 'Appliance Sales and Repair', href: '#' },
      { name: 'Building & Home Improvement', href: '#' },
      { name: 'Cleaning Services', href: '#' },
      { name: 'Contractors', href: '#' },
      { name: 'Electricians', href: '#' },
      { name: 'HVAC', href: '#' },
      { name: 'Painters', href: '#' },
      { name: 'Pest Control', href: '#' },
      { name: 'Plumbers', href: '#' },
    ],
  },
  {
    name: 'Home Services - Exterior',
    badge: 'HOME SERVICES — EXTERIOR',
    items: [
      { name: 'Concrete and Paving Contractors', href: '#' },
      { name: 'Garage Door Services', href: '#' },
      { name: 'Landscapers', href: '#' },
      { name: 'Roofers', href: '#' },
      { name: 'Septic and Sewer', href: '#' },
      { name: 'Tree Services', href: '#' },
      { name: 'Window & Glass', href: '#' },
    ],
  },
  {
    name: 'Brands',
    badge: 'BRANDS',
    items: [
      { name: 'Franchise', href: '#' },
    ],
  },
]

interface IndustryCategoryCardProps {
  category: IndustryCategory
  index: number
}

function IndustryCategoryCard({ category, index }: IndustryCategoryCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border-2 border-card-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide">
          {category.badge}
        </span>
      </div>

      {/* Industry Items */}
      <ul className="space-y-2.5">
        {category.items.map((item, itemIndex) => (
          <motion.li
            key={itemIndex}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
          >
            <a
              href={item.href}
              className={cn(
                'text-sm text-foreground hover:text-primary transition-colors duration-200',
                'inline-block hover:translate-x-1 transform transition-transform'
              )}
            >
              {item.name}
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function IndustriesGrid() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Explore Our Industry Expertise
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Discover how Hibu's digital marketing solutions are tailored to meet the unique needs of your industry.
          </p>
        </div>

        {/* Responsive Grid: 1 column mobile, 2 columns tablet, 4 columns desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industryCategories.map((category, index) => (
            <IndustryCategoryCard
              key={index}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
