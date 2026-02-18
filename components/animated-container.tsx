import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface AnimatedContainerProps {
  children: ReactNode
  delay?: number
  animation?: 'fade-in' | 'slide-in-right' | 'float'
  className?: string
}

export function AnimatedContainer({
  children,
  delay = 0,
  animation = 'fade-in',
  className = '',
}: AnimatedContainerProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`${
        isVisible ? `animate-${animation}` : 'opacity-0'
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}
