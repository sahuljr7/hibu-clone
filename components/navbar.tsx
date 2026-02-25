'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { ClientSupportLoginDropdown } from './client-support-login-dropdown'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showClientSupportDropdown, setShowClientSupportDropdown] = useState(false)
  const [showMobileClientSupport, setShowMobileClientSupport] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowClientSupportDropdown(false)
      }
    }

    if (showClientSupportDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showClientSupportDropdown])

  const menuItems = [
    {
      label: 'Digital Marketing Services',
      href: '/digital-marketing-services',
    },
    {
      label: 'Industries',
      href: '/industries',
    },
    {
      label: 'Resources',
      href: '/resources',
    },
    {
      label: 'Company',
      href: '/company',
    },
  ]

  return (
    <nav className="w-full bg-background border-b border-border sticky top-14 sm:top-12 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo with colored dots - clickable to home */}
        <Link href="/" className="flex-shrink-0 cursor-pointer group">
          <div className="flex items-center gap-1">
            <div className="flex gap-1 mr-1 transition-transform duration-300 group-hover:scale-110">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground font-display transition-all duration-300 group-hover:text-primary">
              hibu
            </h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-all duration-300 font-medium relative group py-2 ${
                  isActive
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <span className="relative">
                  {item.label}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full" />
                  )}
                </span>
              </Link>
            )
          })}
        </div>

        {/* Right Side - Client Support & Theme Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <div
            ref={dropdownRef}
            className="relative"
          >
            <button 
              onClick={() => setShowClientSupportDropdown(!showClientSupportDropdown)}
              className={`flex items-center gap-1 transition-all duration-300 font-medium py-2 ${
                showClientSupportDropdown
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              <span className="relative">
                Client Support & Login
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  showClientSupportDropdown ? 'w-full' : 'w-0'
                }`} />
              </span>
              <ChevronDown size={16} className={`transition-transform duration-300 ${
                showClientSupportDropdown ? 'rotate-180' : ''
              }`} />
            </button>

            {showClientSupportDropdown && <ClientSupportLoginDropdown />}
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:text-primary active:text-primary/80 transition-colors p-2.5 rounded-lg touch-manipulation hover:bg-secondary/30 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in max-h-screen overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center transition-colors font-medium w-full py-3 px-3 rounded hover:bg-secondary/50 touch-manipulation min-h-[44px] ${
                    isActive
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                </Link>
              )
            })}

            <div className="border-t border-border pt-3 mt-3 space-y-2">
              <button 
                onClick={() => setShowMobileClientSupport(!showMobileClientSupport)}
                className={`flex items-center justify-between transition-colors font-medium w-full py-3 px-3 rounded hover:bg-secondary/50 touch-manipulation min-h-[44px] ${
                  showMobileClientSupport ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                <span className="text-sm">Client Support & Login</span>
                <ChevronDown size={16} className={`flex-shrink-0 transition-transform duration-300 ${
                  showMobileClientSupport ? 'rotate-180' : ''
                }`} />
              </button>
              {showMobileClientSupport && (
                <div className="pl-4 space-y-1.5 animate-fade-in">
                  <a
                    href="#"
                    className="block text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded hover:bg-secondary/30 touch-manipulation min-h-[44px] flex items-center"
                  >
                    Support
                  </a>
                  <a
                    href="/login"
                    className="block text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-3 px-3 rounded hover:bg-secondary/30 touch-manipulation min-h-[44px] flex items-center"
                  >
                    Login
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
