/**
 * Card Styling Patterns - Light Theme Modernization
 * 
 * This file provides reusable card styling patterns as constants
 * for consistent application across components.
 * 
 * @see CARD_STYLING_PATTERN.md for full documentation
 */

/**
 * Base card pattern for non-interactive cards
 * 
 * Includes:
 * - Padding: p-6 (24px)
 * - Border radius: rounded-xl (12px)
 * - Border: 2px solid card-border
 * - Background: card
 * - Shadow: subtle base shadow
 * - Transitions: smooth 200ms
 */
export const CARD_BASE = "p-6 rounded-xl border-2 border-card-border bg-card shadow-sm transition-all duration-200";

/**
 * Interactive card pattern for clickable/hoverable cards
 * 
 * Extends base pattern with:
 * - Hover shadow: enhanced depth on interaction
 */
export const CARD_INTERACTIVE = "p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200";

/**
 * Enhanced interactive card with border color change on hover
 * 
 * Extends interactive pattern with:
 * - Hover border: primary color at 50% opacity
 * - Slightly longer transition: 300ms
 */
export const CARD_INTERACTIVE_ENHANCED = "p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300";

/**
 * Large content card pattern (e.g., blog posts, guides)
 * 
 * Similar to interactive pattern but with:
 * - Increased padding: p-8 (32px)
 */
export const CARD_CONTENT_LARGE = "p-8 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200";

/**
 * Large content card with enhanced hover effects
 * 
 * Combines large padding with enhanced hover:
 * - Padding: p-8 (32px)
 * - Hover border: primary color at 50% opacity
 * - Transition: 300ms
 */
export const CARD_CONTENT_LARGE_ENHANCED = "p-8 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300";

/**
 * Feature card pattern with reduced border opacity
 * 
 * Used for cards with glassmorphism or special effects:
 * - Border opacity: 60%
 */
export const CARD_FEATURE = "p-6 rounded-xl border-2 border-card-border/60 bg-card shadow-sm hover:shadow-md transition-all duration-200";

/**
 * Grid gap for card layouts
 * 
 * Increased from gap-6 to gap-8 for better visual separation
 */
export const CARD_GRID_GAP = "gap-8";

/**
 * Common grid layouts for cards
 */
export const CARD_GRID_LAYOUTS = {
  /** Single column on mobile, 2 columns on tablet, 3 columns on desktop */
  standard: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  
  /** Single column on mobile, 2 columns on tablet and up */
  twoColumn: "grid grid-cols-1 md:grid-cols-2 gap-8",
  
  /** Single column on mobile, 3 columns on tablet, 4 columns on desktop */
  fourColumn: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8",
  
  /** Always single column */
  singleColumn: "grid grid-cols-1 gap-8",
} as const;

/**
 * Helper function to combine card pattern with additional classes
 * 
 * @param pattern - Base card pattern constant
 * @param additionalClasses - Additional Tailwind classes to append
 * @returns Combined class string
 * 
 * @example
 * ```tsx
 * <div className={combineCardClasses(CARD_INTERACTIVE, "group")}>
 *   {/* Content *\/}
 * </div>
 * ```
 */
export function combineCardClasses(pattern: string, additionalClasses: string = ""): string {
  return additionalClasses ? `${pattern} ${additionalClasses}` : pattern;
}

/**
 * Type-safe card pattern variants
 */
export type CardPattern = 
  | typeof CARD_BASE
  | typeof CARD_INTERACTIVE
  | typeof CARD_INTERACTIVE_ENHANCED
  | typeof CARD_CONTENT_LARGE
  | typeof CARD_CONTENT_LARGE_ENHANCED
  | typeof CARD_FEATURE;

/**
 * Card pattern configuration object for programmatic usage
 */
export const CARD_PATTERNS = {
  base: CARD_BASE,
  interactive: CARD_INTERACTIVE,
  interactiveEnhanced: CARD_INTERACTIVE_ENHANCED,
  contentLarge: CARD_CONTENT_LARGE,
  contentLargeEnhanced: CARD_CONTENT_LARGE_ENHANCED,
  feature: CARD_FEATURE,
} as const;

/**
 * Example usage in components:
 * 
 * ```tsx
 * import { CARD_INTERACTIVE, CARD_GRID_LAYOUTS } from '@/lib/card-patterns';
 * 
 * export function MyComponent() {
 *   return (
 *     <div className={CARD_GRID_LAYOUTS.standard}>
 *       <Link href="/path" className={CARD_INTERACTIVE}>
 *         <h3>Card Title</h3>
 *         <p>Card content</p>
 *       </Link>
 *     </div>
 *   );
 * }
 * ```
 */
