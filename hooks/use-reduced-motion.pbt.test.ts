/**
 * Property-Based Tests for useReducedMotion Hook
 * 
 * Property 3: Motion Preference Respect
 * Validates: Requirements 3.7, 4.10, 8.1
 * 
 * These tests verify that the useReducedMotion hook correctly detects and responds
 * to the user's prefers-reduced-motion setting across all possible states and transitions.
 */

import { renderHook, act } from '@testing-library/react'
import * as fc from 'fast-check'
import { useReducedMotion } from './use-reduced-motion'

describe('useReducedMotion - Property-Based Tests', () => {
  describe('Property 3: Motion Preference Respect', () => {
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
        configurable: true,
        value: matchMediaMock,
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
      listeners = []
    })

    /**
     * Property: For any initial prefers-reduced-motion state (enabled or disabled),
     * the hook should return the correct boolean value matching that state.
     */
    it('should return correct value for any initial motion preference state', () => {
      fc.assert(
        fc.property(
          fc.boolean(), // Arbitrary initial motion preference state
          (prefersReducedMotion) => {
            // Setup: Configure matchMedia to return the arbitrary state
            matchMediaMock.mockReturnValue({
              matches: prefersReducedMotion,
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

            // Act: Render the hook
            const { result, unmount } = renderHook(() => useReducedMotion())

            // Assert: Hook should return the same value as the media query
            const hookReturnsCorrectValue = result.current === prefersReducedMotion

            // Cleanup
            unmount()
            listeners = []

            return hookReturnsCorrectValue
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * Property: For any sequence of preference changes, the hook should always
     * reflect the most recent preference state.
     */
    it('should update to reflect any sequence of preference changes', () => {
      fc.assert(
        fc.property(
          fc.boolean(), // Initial state
          fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }), // Sequence of state changes
          (initialState, stateChanges) => {
            // Setup: Configure initial state
            matchMediaMock.mockReturnValue({
              matches: initialState,
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

            // Act: Render the hook
            const { result, unmount } = renderHook(() => useReducedMotion())

            // Verify initial state
            let allStatesCorrect = result.current === initialState

            // Apply each state change and verify
            stateChanges.forEach((newState) => {
              act(() => {
                listeners.forEach(listener => {
                  listener({ matches: newState } as MediaQueryListEvent)
                })
              })

              // After each change, hook should reflect the new state
              allStatesCorrect = allStatesCorrect && (result.current === newState)
            })

            // Cleanup
            unmount()
            listeners = []

            return allStatesCorrect
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * Property: For any preference state, when the hook unmounts, it should
     * properly clean up event listeners (no memory leaks).
     */
    it('should clean up event listeners for any preference state', () => {
      fc.assert(
        fc.property(
          fc.boolean(), // Arbitrary initial state
          (prefersReducedMotion) => {
            const removeEventListenerSpy = jest.fn()
            
            matchMediaMock.mockReturnValue({
              matches: prefersReducedMotion,
              media: '(prefers-reduced-motion: reduce)',
              onchange: null,
              addListener: jest.fn(),
              removeListener: jest.fn(),
              addEventListener: jest.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
                listeners.push(handler)
              }),
              removeEventListener: removeEventListenerSpy,
              dispatchEvent: jest.fn(),
            })

            // Act: Render and unmount the hook
            const { unmount } = renderHook(() => useReducedMotion())
            unmount()

            // Assert: removeEventListener should be called exactly once with 'change' event
            const cleanedUpCorrectly = 
              removeEventListenerSpy.mock.calls.length === 1 &&
              removeEventListenerSpy.mock.calls[0][0] === 'change' &&
              typeof removeEventListenerSpy.mock.calls[0][1] === 'function'

            // Cleanup
            listeners = []

            return cleanedUpCorrectly
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * Property: The hook should always query the correct media query string
     * regardless of the initial state.
     */
    it('should always use the correct prefers-reduced-motion media query', () => {
      fc.assert(
        fc.property(
          fc.boolean(), // Arbitrary initial state
          (prefersReducedMotion) => {
            matchMediaMock.mockReturnValue({
              matches: prefersReducedMotion,
              media: '(prefers-reduced-motion: reduce)',
              onchange: null,
              addListener: jest.fn(),
              removeListener: jest.fn(),
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            })

            // Act: Render the hook
            const { unmount } = renderHook(() => useReducedMotion())

            // Assert: matchMedia should be called with the correct query
            const usedCorrectQuery = matchMediaMock.mock.calls.some(
              call => call[0] === '(prefers-reduced-motion: reduce)'
            )

            // Cleanup
            unmount()
            listeners = []

            return usedCorrectQuery
          }
        ),
        { numRuns: 100 }
      )
    })

    /**
     * Property: For any rapid sequence of preference toggles, the hook should
     * always end up in the final state (no race conditions or missed updates).
     */
    it('should handle rapid preference changes and end in the final state', () => {
      fc.assert(
        fc.property(
          fc.boolean(), // Initial state
          fc.array(fc.boolean(), { minLength: 5, maxLength: 20 }), // Rapid changes
          (initialState, rapidChanges) => {
            // Setup
            matchMediaMock.mockReturnValue({
              matches: initialState,
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

            // Act: Render the hook
            const { result, unmount } = renderHook(() => useReducedMotion())

            // Apply all changes rapidly in a single act
            act(() => {
              rapidChanges.forEach((newState) => {
                listeners.forEach(listener => {
                  listener({ matches: newState } as MediaQueryListEvent)
                })
              })
            })

            // Assert: Hook should reflect the final state
            const finalState = rapidChanges[rapidChanges.length - 1]
            const endsInCorrectState = result.current === finalState

            // Cleanup
            unmount()
            listeners = []

            return endsInCorrectState
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
