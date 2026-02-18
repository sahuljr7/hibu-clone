'use client'

import { FooterTop } from './footer-top'
import { FooterBottom } from './footer-bottom'

export function Footer() {
  return (
    <footer className="w-full bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <FooterTop />
        <FooterBottom />
      </div>
    </footer>
  )
}
