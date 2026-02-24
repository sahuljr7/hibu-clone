'use client'

import { motion } from 'framer-motion'

interface IndustryCategory {
  name: string
  items: string[]
}

export function IndustriesMegaMenu() {
  const columns: IndustryCategory[][] = [
    // Column 1
    [
      {
        name: 'AUTOMOTIVE SERVICES',
        items: ['Auto Body', 'Auto Parts', 'Auto Repair and Service', 'Towing Services', 'Window and Glass'],
      },
      {
        name: 'PET SERVICES',
        items: ['Pet Care and Supplies', 'Veterinarians'],
      },
    ],
    // Column 2
    [
      {
        name: 'PROFESSIONAL SERVICES',
        items: ['Accounting & Tax Services', 'Insurance Providers', 'Law Firms', 'Other Local Businesses'],
      },
      {
        name: 'MEDICAL',
        items: ['Chiropractors', 'Dentists', 'Medical Services', 'Optical Goods & Services'],
      },
    ],
    // Column 3
    [
      {
        name: 'HOME SERVICES',
        items: [
          'Appliance Sales and Repair',
          'Building & Home Improvement',
          'Cleaning Services',
          'Contractors',
          'Electricians',
          'HVAC',
          'Painters',
          'Pest Control',
          'Plumbers',
        ],
      },
    ],
    // Column 4
    [
      {
        name: 'HOME SERVICES — EXTERIOR',
        items: [
          'Concrete and Paving Contractors',
          'Garage Door Services',
          'Landscapers',
          'Roofers',
          'Septic and Sewer',
          'Tree Services',
          'Window & Glass',
        ],
      },
      {
        name: 'BRANDS',
        items: ['Franchise'],
      },
    ],
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute left-0 top-full mt-0 w-screen bg-gray-50 dark:bg-slate-800 border-b border-border shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-12 p-8">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="space-y-8">
              {column.map((category, catIndex) => (
                <div key={catIndex} className="space-y-3">
                  {/* Category Badge */}
                  <div className="inline-block">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-3 py-1.5 rounded-full">
                      {category.name}
                    </span>
                  </div>

                  {/* Industry Links */}
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href="#"
                          className="text-sm text-foreground hover:text-primary hover:underline transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
