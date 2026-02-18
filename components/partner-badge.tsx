'use client'

interface PartnerBadgeProps {
  name: string
  icon?: React.ReactNode
}

export function PartnerBadge({ name, icon }: PartnerBadgeProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/30 hover:border-border/60 flex-shrink-0">
      {icon && (
        <div className="mb-2 text-lg sm:text-xl opacity-75 hover:opacity-100 transition-opacity">
          {icon}
        </div>
      )}
      <span className="text-xs sm:text-sm font-medium text-foreground text-center line-clamp-2 max-w-20 sm:max-w-24">
        {name}
      </span>
    </div>
  )
}
