'use client'

import Link from 'next/link'
import { ChevronDown, Phone, Star } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Digital Marketing Services', href: '/digital-marketing-services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Resources', href: '/resources' },
  { label: 'Company', href: '/company' },
]

export function HibuOneHeader() {
  const [showClientLinks, setShowClientLinks] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-slate-200">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 text-sm md:px-6">
          <div className="flex items-center gap-2 text-slate-800">
            <span className="font-semibold">4.4</span>
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="text-slate-600">(2405 Ratings & Reviews)</span>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <a href="tel:8772376120" className="hidden items-center gap-1 text-slate-700 md:flex">
              <Phone className="h-4 w-4" />
              <span className="font-medium">877.237.6120</span>
            </a>
            <Link
              href="/get-started-2026"
              className="rounded-full bg-[#6022ad] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#4e1b8f] md:text-sm"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="text-3xl font-bold tracking-tight text-[#342052]">
            hibu
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-[#6022ad]"
              >
                {item.label}
                <ChevronDown className="h-4 w-4" />
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setShowClientLinks((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-[#6022ad]"
            >
              Client Support & Login
              <ChevronDown className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>

      {showClientLinks && (
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-4 py-3 md:px-6">
            <Link href="/client-support" className="text-sm text-slate-700 hover:text-[#6022ad]">
              Support
            </Link>
            <Link href="/login" className="text-sm text-slate-700 hover:text-[#6022ad]">
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
