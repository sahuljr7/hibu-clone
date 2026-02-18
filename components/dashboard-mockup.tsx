'use client'

import { BarChart3, PieChart as PieChartIcon } from 'lucide-react'

export function DashboardMockup() {
  return (
    <div className="relative w-full h-auto min-h-96 sm:min-h-full flex items-center justify-center perspective">
      {/* Background accent layer */}
      <div className="absolute inset-0 rounded-2xl opacity-20 -z-10" />

      {/* Main dashboard card - angled */}
      <div className="relative w-full max-w-md transform transition-transform duration-300 hover:scale-105">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-900/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs sm:text-sm font-semibold text-gray-700">Analytics Dashboard</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Top metric */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Lead Conversion</span>
                <span className="text-lg sm:text-2xl font-bold text-accent">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-accent rounded-full h-2 w-[42%]" />
              </div>
            </div>

            {/* Charts area */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Bar chart */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex items-end justify-center gap-1 h-20 sm:h-24">
                  <div className="bg-gradient-to-t from-accent to-accent/70 rounded w-2 h-12 sm:h-16" />
                  <div className="bg-gradient-to-t from-accent/60 to-accent/30 rounded w-2 h-16 sm:h-20" />
                  <div className="bg-gradient-to-t from-accent/40 to-accent/10 rounded w-2 h-10 sm:h-14" />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Revenue</p>
              </div>

              {/* Pie chart */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 flex items-center justify-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#00d9a3" strokeWidth="12" strokeDasharray="70 314" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#a78bfa" strokeWidth="12" strokeDasharray="120 314" strokeDashoffset="-70" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#60a5fa" strokeWidth="12" strokeDasharray="124 314" strokeDashoffset="-190" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-gray-700">$1.2M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="bg-blue-50 rounded p-2">
                <p className="text-xs text-gray-500 mb-1">Leads</p>
                <p className="text-sm sm:text-base font-bold text-blue-600">2,450</p>
              </div>
              <div className="bg-purple-50 rounded p-2">
                <p className="text-xs text-gray-500 mb-1">Converted</p>
                <p className="text-sm sm:text-base font-bold text-purple-600">1,029</p>
              </div>
              <div className="bg-green-50 rounded p-2">
                <p className="text-xs text-gray-500 mb-1">Revenue</p>
                <p className="text-sm sm:text-base font-bold text-green-600">$85K</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating mobile card - positioned at bottom right */}
      <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 w-20 sm:w-24 opacity-90 hidden sm:block">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-4 border-gray-900/20">
          <div className="bg-gradient-to-b from-primary to-primary/80 px-2 py-3">
            <p className="text-white text-xs font-bold text-center">Mobile App</p>
          </div>
          <div className="p-1.5 space-y-1 text-xs">
            <div className="h-2 bg-gray-200 rounded" />
            <div className="h-1 bg-gray-100 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  )
}
