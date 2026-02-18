interface StatsItemProps {
  value: string
  label: string
}

export function StatsItem({ value, label }: StatsItemProps) {
  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      {/* Large Number */}
      <div className="mb-3 sm:mb-4">
        <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground font-display">
          {value}
        </h3>
      </div>

      {/* Label */}
      <p className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground tracking-wider uppercase max-w-xs">
        {label}
      </p>
    </div>
  )
}
