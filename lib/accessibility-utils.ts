/**
 * Accessibility Utilities
 * Helper functions for verifying WCAG 2.1 AA compliance
 */

/**
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0, g = 0, b = 0

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  ]
}

/**
 * Calculate relative luminance
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(
  color1: [number, number, number],
  color2: [number, number, number]
): number {
  const l1 = getRelativeLuminance(...color1)
  const l2 = getRelativeLuminance(...color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if contrast ratio meets WCAG 2.1 AA standards
 */
export function meetsWCAG_AA(
  contrastRatio: number,
  isLargeText: boolean = false
): boolean {
  // WCAG 2.1 AA requires:
  // - 4.5:1 for normal text
  // - 3:1 for large text (18pt+ or 14pt+ bold)
  const requiredRatio = isLargeText ? 3 : 4.5
  return contrastRatio >= requiredRatio
}

/**
 * Verify contrast for common color combinations in the app
 */
export const colorCombinations = {
  lightMode: {
    // Primary button: purple-600 on white text
    primaryButton: {
      background: hslToRgb(270, 70, 35), // purple-600
      foreground: [255, 255, 255] as [number, number, number], // white
      description: 'Primary button (purple-600 bg, white text)'
    },
    // Form inputs: gray-50 bg with dark text
    formInput: {
      background: hslToRgb(0, 0, 98), // gray-50
      foreground: hslToRgb(270, 10, 12), // foreground
      description: 'Form input (gray-50 bg, dark text)'
    },
    // Green badge: green-600 border and text on white
    greenBadge: {
      background: [255, 255, 255] as [number, number, number], // white
      foreground: [22, 163, 74] as [number, number, number], // green-600
      description: 'Green badge (white bg, green-600 text)'
    },
    // Body text on background
    bodyText: {
      background: hslToRgb(0, 0, 98), // background
      foreground: hslToRgb(270, 10, 12), // foreground
      description: 'Body text (light bg, dark text)'
    },
    // Link text (primary color)
    linkText: {
      background: hslToRgb(0, 0, 98), // background
      foreground: hslToRgb(270, 70, 35), // primary
      description: 'Link text (light bg, purple primary)'
    },
    // Error text
    errorText: {
      background: [254, 242, 242] as [number, number, number], // red-50
      foreground: [153, 27, 27] as [number, number, number], // red-800
      description: 'Error text (red-50 bg, red-800 text)'
    },
    // Success text
    successText: {
      background: [240, 253, 244] as [number, number, number], // green-50
      foreground: [22, 101, 52] as [number, number, number], // green-800
      description: 'Success text (green-50 bg, green-800 text)'
    }
  },
  darkMode: {
    // Primary button: purple-500 on dark text
    primaryButton: {
      background: hslToRgb(270, 60, 55), // purple-500
      foreground: hslToRgb(270, 15, 8), // dark foreground
      description: 'Primary button dark (purple-500 bg, dark text)'
    },
    // Form inputs: gray-900 bg with light text
    formInput: {
      background: hslToRgb(270, 15, 12), // gray-900
      foreground: hslToRgb(0, 0, 98), // light foreground
      description: 'Form input dark (gray-900 bg, light text)'
    },
    // Green badge: green-400 border and text on dark
    greenBadge: {
      background: hslToRgb(270, 15, 12), // gray-900
      foreground: [74, 222, 128] as [number, number, number], // green-400
      description: 'Green badge dark (dark bg, green-400 text)'
    },
    // Body text on background
    bodyText: {
      background: hslToRgb(270, 15, 8), // dark background
      foreground: hslToRgb(0, 0, 98), // light foreground
      description: 'Body text dark (dark bg, light text)'
    },
    // Link text (primary color)
    linkText: {
      background: hslToRgb(270, 15, 8), // dark background
      foreground: hslToRgb(270, 60, 55), // primary light
      description: 'Link text dark (dark bg, purple primary)'
    },
    // Error text
    errorText: {
      background: [127, 29, 29] as [number, number, number], // red-900/20
      foreground: [254, 202, 202] as [number, number, number], // red-200
      description: 'Error text dark (red-900/20 bg, red-200 text)'
    },
    // Success text
    successText: {
      background: [20, 83, 45] as [number, number, number], // green-900/20
      foreground: [187, 247, 208] as [number, number, number], // green-200
      description: 'Success text dark (green-900/20 bg, green-200 text)'
    }
  }
}

/**
 * Verify all color combinations meet WCAG 2.1 AA
 */
export function verifyAllContrasts() {
  const results: Array<{
    mode: string
    combination: string
    ratio: number
    passes: boolean
    isLargeText: boolean
  }> = []

  for (const [mode, combinations] of Object.entries(colorCombinations)) {
    for (const [key, { background, foreground, description }] of Object.entries(combinations)) {
      const ratio = getContrastRatio(background, foreground)
      const isLargeText = key.includes('Button') || key.includes('badge')
      const passes = meetsWCAG_AA(ratio, isLargeText)
      
      results.push({
        mode,
        combination: description,
        ratio: Math.round(ratio * 100) / 100,
        passes,
        isLargeText
      })
    }
  }

  return results
}
