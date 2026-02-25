import { renderHook, act } from '@testing-library/react'
import { useReducedMotion } from './use-reduced-motion'

describe('useReducedMotion', () => {
  let matchMediaMock: jest.Mock
  let listeners: Array<(event: MediaQueryListEvent) => void>

  beforeEach(() => {
    listeners = []
    
    matchMediaMock = jest.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        listeners.push(handler)
      }),
      removeEventListener: jest.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        const index = listeners.indexOf(handler)
        if (index > -1) {
          listeners.splice(index, 1)
        }
      }),
      dispatchEvent: jest.fn(),
    }))

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return false when prefers-reduced-motion is not set', () => {
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('should return true when prefers-reduced-motion is enabled', () => {
    matchMediaMock.mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        listeners.push(handler)
      }),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })

    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('should update when media query preference changes', () => {
    const { result } = renderHook(() => useReducedMotion())
    
    expect(result.current).toBe(false)

    // Simulate preference change
    act(() => {
      listeners.forEach(listener => {
        listener({ matches: true } as MediaQueryListEvent)
      })
    })

    expect(result.current).toBe(true)
  })

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = jest.fn()
    
    matchMediaMock.mockReturnValue({
      matches: false,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerSpy,
      dispatchEvent: jest.fn(),
    })

    const { unmount } = renderHook(() => useReducedMotion())
    
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should use the correct media query', () => {
    renderHook(() => useReducedMotion())
    
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })
})
