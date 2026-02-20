'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
}

export function TypewriterText({
  text,
  speed = 50,
  delay = 300,
  className = '',
  cursorClassName = '',
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!text) return

    // Set initial delay before typing starts
    const delayTimer = setTimeout(() => {
      let currentIndex = 0
      const characters = text.split('')

      const typeInterval = setInterval(() => {
        if (currentIndex < characters.length) {
          setDisplayedText(characters.slice(0, currentIndex + 1).join(''))
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(typeInterval)
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <span
          className={`ml-1 inline-block w-0.5 h-[1em] bg-foreground animate-pulse ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
