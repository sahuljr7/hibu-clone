'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    if (!mounted) return

    const html = document.documentElement
    const newIsDark = !isDark

    if (newIsDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    setIsDark(newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary hover:bg-muted active:bg-muted/80 transition-colors text-foreground touch-manipulation"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Theme: ${isDark ? 'Dark' : 'Light'}`}
    >
      {isDark ? <Sun size={20} className="flex-shrink-0" /> : <Moon size={20} className="flex-shrink-0" />}
    </button>
  )
}
