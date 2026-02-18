import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/footer'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hibu - Digital Marketing Services',
  description: 'A simpler, smarter, more effective way to market your business. Enterprise-level marketing platform built for local businesses.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    minimumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf6' },
    { media: '(prefers-color-scheme: dark)', color: '#1a0f1f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
