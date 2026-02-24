'use client'

import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { MegaMenu } from './mega-menu'
import { AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [showMegaMenu, setShowMegaMenu] = useState(false)

  const menuItems = [
    {
      label: 'Digital Marketing Services',
      href: '#',
      hasDropdown: true,
      isMegaMenu: true,
    },
    {
      label: 'Industries',
      href: '#',
      hasDropdown: true,
      isMegaMenu: false,
    },
    {
      label: 'Resources',
      href: '#',
      hasDropdown: true,
      isMegaMenu: false,
    },
    {
      label: 'Company',
      href: '#',
      hasDropdown: true,
      isMegaMenu: false,
    },
  ]

  return (
    <nav className="w-full bg-background border-b border-border sticky top-14 sm:top-12 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo with colored dots */}
        <div className="flex-shrink-0">
          <div className="flex items-center gap-1">
            <div className="flex gap-1 mr-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground font-display transition-all duration-300">
              hibu
            </h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                setOpenDropdown(item.label)
                if (item.isMegaMenu) setShowMegaMenu(true)
              }}
              onMouseLeave={() => {
                setOpenDropdown(null)
                setShowMegaMenu(false)
              }}
            >
              <button className={`flex items-center gap-1 transition-all duration-300 font-medium relative group py-2 ${
                item.label === 'Digital Marketing Services' && showMegaMenu
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}>
                <span className="relative">
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    item.label === 'Digital Marketing Services' && showMegaMenu ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </span>
                {item.hasDropdown && (
                  <ChevronDown size={16} className={`transition-transform duration-300 ${
                    item.label === 'Digital Marketing Services' && showMegaMenu ? 'rotate-180' : 'group-hover:rotate-180'
                  }`} />
                )}
              </button>

              {/* Mega Menu for Digital Marketing Services */}
              {item.isMegaMenu && showMegaMenu && <MegaMenu />}

              {/* Regular Dropdown Menu */}
              {item.hasDropdown && !item.isMegaMenu && (
                <div className="absolute left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 space-y-2">
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                    >
                      Option 1
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                    >
                      Option 2
                    </a>
                    <a
                      href="#"
                      className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                    >
                      Option 3
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side - Client Support & Theme Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
              Client Support & Login
              <ChevronDown size={16} />
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-3 space-y-2">
                <a
                  href="#"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                >
                  Support
                </a>
                <a
                  href="/login"
                  className="block px-3 py-2 text-sm text-foreground hover:bg-secondary rounded transition-colors"
                >
                  Login
                </a>
              </div>
            </div>
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground hover:text-primary active:text-primary/80 transition-colors p-2 rounded-lg touch-manipulation hover:bg-secondary/30"
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
            {menuItems.map((item) => (
              <div key={item.label} className="space-y-2">
                <button className="flex items-center justify-between text-foreground hover:text-primary transition-colors font-medium w-full py-2 px-2 rounded hover:bg-secondary/50">
                  <span className="text-sm">{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown size={16} className="flex-shrink-0" />
                  )}
                </button>
                {item.hasDropdown && (
                  <div className="pl-4 space-y-1.5">
                    <a
                      href="#"
                      className="block text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 rounded hover:bg-secondary/30"
                    >
                      Option 1
                    </a>
                    <a
                      href="#"
                      className="block text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 rounded hover:bg-secondary/30"
                    >
                      Option 2
                    </a>
                    <a
                      href="#"
                      className="block text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 rounded hover:bg-secondary/30"
                    >
                      Option 3
                    </a>
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-border pt-3 mt-3 space-y-2">
              <button className="flex items-center justify-between text-foreground hover:text-primary transition-colors font-medium w-full py-2 px-2 rounded hover:bg-secondary/50">
                <span className="text-sm">Client Support & Login</span>
                <ChevronDown size={16} className="flex-shrink-0" />
              </button>
              <div className="pl-4 space-y-1.5">
                <a
                  href="#"
                  className="block text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 rounded hover:bg-secondary/30"
                >
                  Support
                </a>
                <a
                  href="/login"
                  className="block text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 rounded hover:bg-secondary/30"
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
