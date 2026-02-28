# Card Styling Pattern - Quick Reference

## Modernized Card Pattern

```tsx
className="p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200"
```

## Common Variations

### Standard Card (Non-Interactive)
```tsx
<div className="p-6 rounded-xl border-2 border-card-border bg-card shadow-sm transition-all duration-200">
  {/* Content */}
</div>
```

### Interactive Card (Clickable)
```tsx
<Link
  href="/path"
  className="group p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200"
>
  {/* Content */}
</Link>
```

### Card with Enhanced Hover
```tsx
<Link
  href="/path"
  className="group p-6 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
>
  {/* Content */}
</Link>
```

### Large Content Card
```tsx
<div className="p-8 rounded-xl border-2 border-card-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
  {/* Content */}
</div>
```

## Grid Layout

Use `gap-8` for card grids:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards */}
</div>
```

## Key Changes from Old Pattern

- `rounded-lg` → `rounded-xl` (8px → 12px)
- `border` → `border-2` (1px → 2px)
- `border-border` → `border-card-border` (dedicated card border color)
- Added `shadow-sm` base state
- Added `hover:shadow-md` for interactive cards
- Added `transition-all duration-200` for smooth animations
- Grid gap: `gap-6` → `gap-8`

## Full Documentation

See [CARD_STYLING_PATTERN.md](../CARD_STYLING_PATTERN.md) for complete documentation, usage guidelines, and accessibility considerations.

## Requirements

Validates Requirements: 3.1, 3.2, 3.3 from Light Theme Modernization spec.
