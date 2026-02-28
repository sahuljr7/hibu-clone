/**
 * Card Pattern Examples
 * 
 * This file demonstrates the usage of the modernized card styling pattern.
 * These examples can be used as reference when implementing cards in components.
 * 
 * @see CARD_STYLING_PATTERN.md for full documentation
 * @see lib/card-patterns.ts for reusable pattern constants
 */

import Link from 'next/link';
import { 
  CARD_BASE, 
  CARD_INTERACTIVE, 
  CARD_INTERACTIVE_ENHANCED,
  CARD_CONTENT_LARGE,
  CARD_GRID_LAYOUTS 
} from '@/lib/card-patterns';

/**
 * Example 1: Basic Non-Interactive Card
 */
export function BasicCardExample() {
  return (
    <div className={CARD_BASE}>
      <h3 className="text-xl font-semibold mb-2">Basic Card</h3>
      <p className="text-muted-foreground">
        This is a non-interactive card with the base styling pattern.
      </p>
    </div>
  );
}

/**
 * Example 2: Interactive Card (Clickable)
 */
export function InteractiveCardExample() {
  return (
    <Link href="/destination" className={CARD_INTERACTIVE}>
      <h3 className="text-xl font-semibold mb-2">Interactive Card</h3>
      <p className="text-muted-foreground">
        This card has hover effects with shadow elevation.
      </p>
    </Link>
  );
}

/**
 * Example 3: Enhanced Interactive Card with Border Hover
 */
export function EnhancedCardExample() {
  return (
    <Link href="/destination" className={CARD_INTERACTIVE_ENHANCED}>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        Enhanced Card
      </h3>
      <p className="text-muted-foreground">
        This card has both shadow and border color changes on hover.
      </p>
    </Link>
  );
}

/**
 * Example 4: Large Content Card
 */
export function LargeContentCardExample() {
  return (
    <Link href="/content" className={CARD_CONTENT_LARGE}>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
          Large Content Card
        </h3>
        <p className="text-muted-foreground">
          This card uses larger padding (p-8) for content-heavy sections like blog posts or guides.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Read more →</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Example 5: Card Grid Layout
 */
export function CardGridExample() {
  const cards = [
    { id: 1, title: 'Card 1', description: 'First card description' },
    { id: 2, title: 'Card 2', description: 'Second card description' },
    { id: 3, title: 'Card 3', description: 'Third card description' },
  ];

  return (
    <div className={CARD_GRID_LAYOUTS.standard}>
      {cards.map((card) => (
        <div key={card.id} className={CARD_INTERACTIVE}>
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-muted-foreground">{card.description}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Example 6: Card with Icon
 */
export function CardWithIconExample() {
  return (
    <div className={CARD_INTERACTIVE}>
      <div className="mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-primary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 10V3L4 14h7v7l9-11h-7z" 
            />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">Feature Card</h3>
      <p className="text-muted-foreground">
        Card with an icon element at the top.
      </p>
    </div>
  );
}

/**
 * Example 7: Card with Custom Inline Classes
 * 
 * When you need to add additional classes beyond the pattern
 */
export function CustomCardExample() {
  return (
    <Link 
      href="/destination" 
      className={`${CARD_INTERACTIVE} group relative overflow-hidden`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          Custom Styled Card
        </h3>
        <p className="text-muted-foreground">
          This card combines the base pattern with additional custom styling.
        </p>
      </div>
    </Link>
  );
}

/**
 * Example 8: Manual Pattern (without constants)
 * 
 * If you prefer to write the classes directly
 */
export function ManualPatternExample() {
  return (
    <div className="p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
      <h3 className="text-xl font-semibold mb-2">Manual Pattern</h3>
      <p className="text-muted-foreground">
        This card uses the pattern written directly in className.
      </p>
    </div>
  );
}

/**
 * Complete Page Example
 * 
 * Shows how to use cards in a full page layout
 */
export function CardPageExample() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive suite of digital marketing solutions
        </p>
      </div>

      {/* Card Grid */}
      <div className={CARD_GRID_LAYOUTS.standard}>
        <Link 
          href="/service-1" 
          className={CARD_INTERACTIVE_ENHANCED}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              Service One
            </h3>
            <p className="text-muted-foreground">
              Description of the first service offering and its key benefits.
            </p>
          </div>
        </Link>

        <Link 
          href="/service-2" 
          className={CARD_INTERACTIVE_ENHANCED}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              Service Two
            </h3>
            <p className="text-muted-foreground">
              Description of the second service offering and its key benefits.
            </p>
          </div>
        </Link>

        <Link 
          href="/service-3" 
          className={CARD_INTERACTIVE_ENHANCED}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              Service Three
            </h3>
            <p className="text-muted-foreground">
              Description of the third service offering and its key benefits.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
