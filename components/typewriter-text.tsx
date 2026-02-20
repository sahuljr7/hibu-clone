'use client'

import { useEffect, useState } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
  loop?: boolean
  pauseDuration?: number
  deleteSpeed?: number
}

export function TypewriterText({
  text,
  speed = 80,
  delay = 500,
  className = '',
  cursorClassName = '',
  loop = true,
  pauseDuration = 5000,
  deleteSpeed = 50,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayedText(text)
      return
    }

    if (!text) return

    let timeoutId: NodeJS.Timeout
    let intervalId: NodeJS.Timeout

    const startTyping = () => {
      setIsTyping(true)
      setIsDeleting(false)
      let currentIndex = 0
      const characters = text.split('')

      intervalId = setInterval(() => {
        if (currentIndex < characters.length) {
          setDisplayedText(characters.slice(0, currentIndex + 1).join(''))
          currentIndex++
        } else {
          // Typing complete
          setIsTyping(false)
          clearInterval(intervalId)

          // Pause before delete/restart
          if (loop) {
            timeoutId = setTimeout(() => {
              startDeleting()
            }, pauseDuration)
          }
        }
      }, speed)
    }

    const startDeleting = () => {
      setIsDeleting(true)
      setIsTyping(false)
      let currentText = text

      intervalId = setInterval(() => {
        if (currentText.length > 0) {
          currentText = currentText.slice(0, -1)
          setDisplayedText(currentText)
        } else {
          // Delete complete, restart typing
          setIsDeleting(false)
          clearInterval(intervalId)
          timeoutId = setTimeout(() => {
            startTyping()
          }, 300)
        }
      }, deleteSpeed)
    }

    // Start initial delay
    timeoutId = setTimeout(() => {
      startTyping()
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, speed, delay, loop, pauseDuration, deleteSpeed])

  // Always show cursor while typing or deleting
  const showCursor = isTyping || isDeleting

  return (
    <span className={className} aria-label={text}>
      {displayedText}
      {showCursor && (
        <span
          className={`ml-1 inline-block w-0.5 h-[1em] bg-foreground animate-pulse ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
