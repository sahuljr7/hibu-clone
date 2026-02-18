'use client'

export function FooterBottom() {
  const legalLinks = [
    { label: 'Privacy policy', href: '#' },
    { label: 'California Privacy Rights', href: '#' },
    { label: 'Conditions of use', href: '#' },
    { label: 'Legal', href: '#' },
    { label: 'Do Not Sell or Share My Personal Info', href: '#' },
    { label: 'Accessibility', href: '#' },
  ]

  return (
    <div className="pt-8 sm:pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        {/* Logo Section */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground font-display">
            hibu
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Local. Digital. Solutions.
          </p>
        </div>

        {/* Empty space for alignment on desktop */}
        <div className="hidden sm:block" />
      </div>

      {/* Legal Links */}
      <div className="flex flex-wrap gap-2 sm:gap-0 mb-6 sm:mb-8 text-xs sm:text-sm">
        {legalLinks.map((link, index) => (
          <div key={link.label} className="flex items-center gap-2">
            <a
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
            {index < legalLinks.length - 1 && (
              <span className="text-muted-foreground hidden sm:inline">|</span>
            )}
          </div>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-xs sm:text-sm text-muted-foreground">
        ©2025 Hibu Inc. All rights reserved. Hibu and the Hibu logo are trademarks of Hibu Inc.
      </p>
    </div>
  )
}
