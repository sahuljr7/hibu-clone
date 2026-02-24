# Design Document: Navigation Restructure

## Overview

This design outlines the restructuring of the navigation system from a mega menu-based approach to a hybrid model where most navigation items link to dedicated landing pages, while preserving dropdown functionality for Client Support & Login. The implementation will leverage Next.js App Router, TypeScript, React, Tailwind CSS, and Framer Motion for animations.

### Goals

1. Simplify navigation architecture by removing unnecessary dropdown complexity
2. Create dedicated, SEO-friendly landing pages for major site sections
3. Improve user experience with clear navigation patterns
4. Maintain smooth animations and responsive behavior across all devices
5. Preserve dropdown functionality only where it provides value (Client Support & Login)

### Key Design Decisions

- **Next.js App Router**: Use the modern App Router for file-based routing and improved performance
- **Component Refactoring**: Remove mega menu components and logic for converted navigation items
- **Responsive-First**: Design landing pages with mobile-first approach, progressively enhancing for larger screens
- **Animation Library**: Continue using Framer Motion for consistent, smooth animations
- **Type Safety**: Maintain TypeScript throughout for better developer experience and fewer runtime errors

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Navbar Component                      │
│  ┌────────────┬────────────┬────────────┬────────────────┐ │
│  │  Services  │ Industries │ Resources  │ Client Support │ │
│  │   (Link)   │   (Link)   │   (Link)   │   (Dropdown)   │ │
│  └─────┬──────┴─────┬──────┴─────┬──────┴────────┬───────┘ │
└────────┼────────────┼────────────┼───────────────┼─────────┘
         │            │            │               │
         ▼            ▼            ▼               ▼
    ┌────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐
    │Services│  │Industries│  │Resources │  │Client Support│
    │  Page  │  │   Page   │  │   Page   │  │   Dropdown   │
    └────────┘  └──────────┘  └──────────┘  └──────────────┘
         │            │            │
         ▼            ▼            ▼
    ┌────────┐  ┌──────────┐  ┌──────────┐
    │ Hero   │  │  Hero    │  │  Hero    │
    │Section │  │ Section  │  │ Section  │
    └────────┘  └──────────┘  └──────────┘
         │            │            │
         ▼            ▼            ▼
    ┌────────┐  ┌──────────┐  ┌──────────┐
    │Content │  │ Content  │  │ Content  │
    │Sections│  │ Sections │  │ Sections │
    └────────┘  └──────────┘  └──────────┘
```

### Navigation Flow

1. **User clicks navigation item** → Next.js Link component handles routing
2. **Page transition** → Next.js prefetching ensures fast navigation
3. **Landing page loads** → Hero section appears with fade-in animation
4. **User scrolls** → Content sections reveal with scroll-triggered animations
5. **Active page highlighting** → Navigation bar reflects current page

### Component Hierarchy

```
App Layout
├── Navbar (refactored)
│   ├── Logo
│   ├── Desktop Navigation
│   │   ├── Services Link (no dropdown)
│   │   ├── Industries Link (no dropdown)
│   │   ├── Resources Link (no dropdown)
│   │   ├── Company Link (no dropdown)
│   │   └── Client Support Dropdown (preserved)
│   └── Mobile Navigation
│       ├── Hamburger Menu
│       └── Mobile Menu Panel
│           ├── Services Link
│           ├── Industries Link
│           ├── Resources Link
│           ├── Company Link
│           └── Client Support Dropdown
├── Page Routes
│   ├── /digital-marketing-services
│   │   ├── Hero Section
│   │   ├── Hibu One Platform Section
│   │   ├── Ad Campaigns Section
│   │   ├── Organic Marketing Section
│   │   └── Platform Pricing Section
│   ├── /industries
│   │   ├── Hero Section
│   │   └── Industry Categories Grid
│   ├── /resources
│   │   ├── Hero Section
│   │   ├── Free Tools Section
│   │   ├── Learn Section
│   │   └── Case Studies Section
│   └── /company
│       ├── Hero Section
│       ├── Who We Are Section
│       ├── Careers & Newsroom Section
│       ├── Contact Us Section
│       └── Success Stories Section
```

## Components and Interfaces

### 1. Navbar Component (Refactored)

**Purpose**: Main navigation component with simplified link-based navigation for most items

**Interface**:
```typescript
interface NavItem {
  label: string
  href: string
  hasDropdown: boolean
  preserveDropdown?: boolean // Only true for Client Support
}

interface NavbarProps {
  currentPath?: string // For active page highlighting
}
```

**Behavior**:
- Remove `showMegaMenu`, `showIndustriesMegaMenu`, `showResourcesMegaMenu`, `showCompanyMegaMenu` state
- Remove `onMouseEnter` and `onMouseLeave` handlers for converted items
- Replace dropdown buttons with Next.js Link components for Services, Industries, Resources, Company
- Remove ChevronDown icons from converted navigation items
- Preserve dropdown functionality only for Client Support & Login
- Implement active page highlighting based on current route
- Maintain responsive mobile menu with proper touch interactions

**Key Changes**:
```typescript
// Before: Button with dropdown
<button className="flex items-center gap-1">
  Digital Marketing Services
  <ChevronDown size={16} />
</button>

// After: Link without dropdown indicator
<Link href="/digital-marketing-services" className="...">
  Digital Marketing Services
</Link>
```

### 2. Landing Page Components

#### Base Landing Page Layout

**Purpose**: Reusable layout structure for all landing pages

**Interface**:
```typescript
interface LandingPageProps {
  children: React.ReactNode
  title: string
  description: string
}

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  backgroundGradient?: string
}

interface ContentSectionProps {
  title: string
  badge?: string
  children: React.ReactNode
  variant?: 'default' | 'featured' | 'dark'
}
```

**Structure**:
- Hero section with title, subtitle, and description
- Content sections with consistent spacing and typography
- Responsive grid layouts for content organization
- Scroll-triggered reveal animations
- SEO metadata integration

#### Digital Marketing Services Page

**Route**: `/digital-marketing-services`

**Sections**:
1. **Hero Section**: Overview of digital marketing services
2. **Hibu One Platform**: Platform features and benefits with badge
3. **Ad Campaigns**: Search, display, and social ads information
4. **Organic Marketing**: SEO services details
5. **Platform Pricing**: Pricing information and CTA

**Content Structure**:
```typescript
interface ServiceSection {
  id: string
  badge?: string
  title: string
  description: string
  features?: string[]
  cta?: {
    text: string
    href: string
  }
}
```

#### Industries Page

**Route**: `/industries`

**Sections**:
1. **Hero Section**: Overview of industries served
2. **Industry Categories Grid**: All industry categories organized by type

**Content Structure**:
```typescript
interface IndustryCategory {
  name: string
  badge: string
  items: IndustryItem[]
}

interface IndustryItem {
  name: string
  href: string
  description?: string
}
```

**Layout**: 4-column grid on desktop, 2-column on tablet, 1-column on mobile

#### Resources Page

**Route**: `/resources`

**Sections**:
1. **Hero Section**: Overview of available resources
2. **Free Tools Section**: Marketing tools with descriptions
3. **Learn Section**: Blog and educational content
4. **Case Studies Section**: Featured case study with CTA

**Content Structure**:
```typescript
interface ResourceItem {
  title: string
  description: string
  href: string
  type: 'tool' | 'article' | 'case-study'
}

interface ResourceSection {
  badge: string
  title: string
  items: ResourceItem[]
}
```

#### Company Page

**Route**: `/company`

**Sections**:
1. **Hero Section**: Company overview
2. **Who We Are**: About Us and Leadership
3. **Careers & Newsroom**: Career opportunities and news
4. **Contact Us**: Contact information and form
5. **Success Stories**: Client reviews, video testimonials, employee reviews

**Content Structure**:
```typescript
interface CompanySection {
  badge: string
  title: string
  items: CompanyItem[]
}

interface CompanyItem {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
}
```

### 3. Client Support Dropdown (Preserved)

**Purpose**: Maintain existing dropdown functionality for quick access to support and login

**Interface**:
```typescript
interface ClientSupportDropdownProps {
  isOpen: boolean
  onToggle: () => void
}

interface DropdownItem {
  label: string
  href: string
  icon?: React.ReactNode
}
```

**Behavior**:
- Open on click (not just hover)
- Close on outside click
- Smooth open/close animations
- Proper z-index layering
- Responsive behavior on all devices

### 4. Animation Components

#### Page Transition Animation

**Purpose**: Smooth fade-in animation when landing pages load

**Implementation**:
```typescript
interface PageTransitionProps {
  children: React.ReactNode
}

// Using Framer Motion
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}
```

#### Scroll Reveal Animation

**Purpose**: Reveal content sections as user scrolls

**Implementation**:
```typescript
interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

// Using Intersection Observer + Framer Motion
const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}
```

### 5. Active Page Highlighting

**Purpose**: Visual indication of current page in navigation

**Implementation**:
```typescript
interface ActiveLinkProps {
  href: string
  children: React.ReactNode
  currentPath: string
}

// Styling logic
const isActive = currentPath === href || currentPath.startsWith(href + '/')
const linkClassName = isActive 
  ? 'text-primary border-b-2 border-primary' 
  : 'text-foreground hover:text-primary'
```

## Data Models

### Navigation Configuration

```typescript
interface NavigationConfig {
  items: NavItem[]
}

interface NavItem {
  id: string
  label: string
  href: string
  hasDropdown: boolean
  preserveDropdown: boolean
  mobileOnly?: boolean
}

// Example configuration
const navigationConfig: NavigationConfig = {
  items: [
    {
      id: 'services',
      label: 'Digital Marketing Services',
      href: '/digital-marketing-services',
      hasDropdown: false,
      preserveDropdown: false
    },
    {
      id: 'industries',
      label: 'Industries',
      href: '/industries',
      hasDropdown: false,
      preserveDropdown: false
    },
    {
      id: 'resources',
      label: 'Resources',
      href: '/resources',
      hasDropdown: false,
      preserveDropdown: false
    },
    {
      id: 'company',
      label: 'Company',
      href: '/company',
      hasDropdown: false,
      preserveDropdown: false
    },
    {
      id: 'client-support',
      label: 'Client Support & Login',
      href: '#',
      hasDropdown: true,
      preserveDropdown: true
    }
  ]
}
```

### Page Metadata

```typescript
interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
}

// Example for Digital Marketing Services page
const servicesMetadata: PageMetadata = {
  title: 'Digital Marketing Services | Hibu',
  description: 'Comprehensive digital marketing services powered by Hibu One platform. Search ads, display ads, social media marketing, and SEO services for local businesses.',
  keywords: ['digital marketing', 'SEO', 'PPC', 'social media marketing'],
  ogImage: '/images/og-services.jpg',
  ogType: 'website'
}
```

### Landing Page Content

```typescript
interface LandingPageContent {
  hero: HeroContent
  sections: ContentSection[]
  metadata: PageMetadata
}

interface HeroContent {
  title: string
  subtitle?: string
  description: string
  backgroundGradient: string
  cta?: CallToAction
}

interface ContentSection {
  id: string
  type: 'grid' | 'list' | 'featured' | 'promo'
  badge?: string
  title: string
  description?: string
  items: ContentItem[]
  layout?: {
    columns: {
      mobile: number
      tablet: number
      desktop: number
    }
  }
}

interface ContentItem {
  title: string
  description: string
  href?: string
  icon?: string
  image?: string
}

interface CallToAction {
  text: string
  href: string
  variant: 'primary' | 'secondary' | 'outline'
}
```

### Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: '< 768px',
  tablet: '768px - 1024px',
  desktop: '> 1024px'
} as const

type Breakpoint = keyof typeof breakpoints

interface ResponsiveConfig<T> {
  mobile: T
  tablet: T
  desktop: T
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Navigation Routing Properties

**Property 1: Converted navigation items route to dedicated pages**

*For any* converted navigation item (Digital Marketing Services, Industries, Resources, Company), clicking the item should navigate to its corresponding dedicated page route without triggering any dropdown behavior.

**Validates: Requirements 1.1, 1.4, 2.1, 2.4, 3.1, 3.4, 4.1, 4.4**

**Property 2: Navigation routing uses client-side transitions**

*For any* navigation item click, the system should perform client-side routing without full page reload, maintaining application state.

**Validates: Requirements 9.2**

**Property 3: All navigation links point to valid routes**

*For any* navigation link in the system, the href value should correspond to an existing route definition in the application.

**Validates: Requirements 9.3**

### Dropdown Behavior Properties

**Property 4: Client Support dropdown toggles on interaction**

*For any* interaction with the Client Support & Login navigation item, the dropdown should toggle between open and closed states with proper animation.

**Validates: Requirements 5.1, 5.3**

**Property 5: Dropdown closes on outside click**

*For any* click event outside the Client Support dropdown when it is open, the dropdown should close.

**Validates: Requirements 5.4**

**Property 6: Dropdown functions across all breakpoints**

*For any* responsive breakpoint (mobile, tablet, desktop), the Client Support dropdown should open, close, and display correctly.

**Validates: Requirements 5.6**

### Active Page Highlighting Properties

**Property 7: Active page is highlighted in navigation**

*For any* page in the application, the corresponding navigation item should display active styling (distinct color or underline) when that page is the current route.

**Validates: Requirements 10.1, 10.2, 10.3, 10.4**

### Mobile Navigation Properties

**Property 8: Mobile menu expands and collapses**

*For any* tap on the hamburger menu button at mobile breakpoint, the mobile menu should toggle between expanded and collapsed states.

**Validates: Requirements 11.2**

**Property 9: Mobile navigation closes after item selection**

*For any* navigation item tap in the mobile menu, the system should navigate to the target page and close the mobile menu.

**Validates: Requirements 11.6**

**Property 10: Touch targets meet minimum size requirements**

*For any* interactive element (buttons, links, navigation items), the touch target size should be at least 44x44 pixels to ensure accessibility and usability.

**Validates: Requirements 11.5**

### Animation Properties

**Property 11: Scroll-triggered animations reveal content**

*For any* content section on a landing page, scrolling the section into the viewport should trigger a reveal animation.

**Validates: Requirements 7.2**

**Property 12: Interactive elements have hover effects**

*For any* button or link element, hovering should apply visual feedback through style changes.

**Validates: Requirements 7.3**

### Responsive Design Properties

**Property 13: Typography hierarchy is consistent**

*For any* landing page, heading elements (h1, h2, h3) should use consistent font sizes and weights according to the design system.

**Validates: Requirements 6.2**

**Property 14: Heading hierarchy follows semantic order**

*For any* landing page, heading elements should follow proper hierarchical order (h1 → h2 → h3) without skipping levels.

**Validates: Requirements 12.5**

### SEO and Metadata Properties

**Property 15: Pages include required meta tags**

*For any* landing page, the HTML head should include title, description, and Open Graph meta tags with non-empty values.

**Validates: Requirements 12.2, 12.3, 12.4**

### Content Rendering Examples

The following are specific examples that verify correct content structure on each landing page:

**Example 1: Digital Marketing Services page structure**

The /digital-marketing-services page should render:
- Hero section with page title
- Hibu One Platform section with badge
- Ad Campaigns section
- Organic Marketing section
- Platform Pricing section

**Validates: Requirements 1.5**

**Example 2: Industries page displays all categories**

The /industries page should render all industry categories from the mega menu in a grid layout:
- Automotive Services
- Pet Services
- Professional Services
- Medical
- Home Services
- Home Services - Exterior
- Brands

**Validates: Requirements 2.5**

**Example 3: Resources page sections**

The /resources page should render:
- Free Tools section with Marketing Quiz, Business Listings Scan, Digital Marketing Score, Social Advertising Calculator
- Learn section with Hibu Blog
- Case Studies section

**Validates: Requirements 3.5, 3.6, 3.7**

**Example 4: Company page sections**

The /company page should render:
- Who We Are section (About Us, Leadership)
- Careers and Newsroom section
- Contact Us section
- Success Stories section (Client Reviews, Video Testimonials, Employee Reviews)

**Validates: Requirements 4.5, 4.6, 4.7, 4.8**

**Example 5: Converted navigation items have no dropdown indicators**

The navigation items for Digital Marketing Services, Industries, Resources, and Company should not render ChevronDown icons or any dropdown indicators.

**Validates: Requirements 1.2, 2.2, 3.2, 4.2**

**Example 6: Converted navigation items use link styling**

The navigation items for Digital Marketing Services, Industries, Resources, and Company should be styled as standard links without dropdown-specific classes or hover states that suggest dropdown behavior.

**Validates: Requirements 1.3, 2.3, 3.3, 4.3**

**Example 7: Client Support dropdown has indicator**

The Client Support & Login navigation item should render a ChevronDown icon that rotates when the dropdown is open.

**Validates: Requirements 5.2**

**Example 8: Client Support dropdown has proper z-index**

The Client Support dropdown should have z-index values that ensure it appears above other content without causing overflow issues.

**Validates: Requirements 5.5**

**Example 9: Landing pages use semantic HTML**

Each landing page should use semantic HTML structure with header, main, and section elements.

**Validates: Requirements 12.1**

**Example 10: Landing pages use grid or flex layouts**

Content sections on landing pages should use CSS Grid or Flexbox for layout organization.

**Validates: Requirements 6.5**

**Example 11: Hero section appears on all landing pages**

Each landing page should render a hero section at the top with title and description.

**Validates: Requirements 6.1**

**Example 12: Page load animations are applied**

Landing pages should apply fade-in animations to content on initial load using Framer Motion.

**Validates: Requirements 7.1**

**Example 13: Mobile layout is stacked**

At mobile breakpoint (< 768px), landing page content should display in a single-column stacked layout with appropriate spacing.

**Validates: Requirements 8.1**

**Example 14: Mobile prevents horizontal scroll**

At mobile breakpoint, landing pages should have max-width constraints that prevent horizontal scrolling.

**Validates: Requirements 8.3**

**Example 15: Mobile uses readable font sizes**

At mobile breakpoint, text elements should use minimum font sizes (14px for body, 24px for h1) for readability.

**Validates: Requirements 8.2**

**Example 16: Desktop uses multi-column layouts**

At desktop breakpoint (> 1024px), landing page sections should use multi-column grid layouts where appropriate.

**Validates: Requirements 8.5**

**Example 17: Responsive breakpoints match specification**

Media queries and responsive logic should use breakpoints at 768px (mobile/tablet) and 1024px (tablet/desktop).

**Validates: Requirements 8.6**

**Example 18: Navigation uses Next.js Link components**

All navigation items should be implemented using Next.js Link components, not standard anchor tags.

**Validates: Requirements 9.1**

**Example 19: Unused mega menu code is removed**

The codebase should not contain imports or references to MegaMenu, IndustriesMegaMenu, ResourcesMegaMenu, or CompanyMegaMenu components in the navbar.

**Validates: Requirements 9.4, 13.2**

**Example 20: Navigation spacing is consistent**

Navigation items should have consistent horizontal spacing (gap-8 or equivalent) after removing dropdown indicators.

**Validates: Requirements 9.5**

**Example 21: Mobile menu shows hamburger button**

At mobile breakpoint, the navigation should display a hamburger menu button instead of full navigation items.

**Validates: Requirements 11.1**

**Example 22: Mobile menu shows converted items as links**

In the mobile menu, Digital Marketing Services, Industries, Resources, and Company should appear as direct links without expandable behavior.

**Validates: Requirements 11.3**

**Example 23: Mobile menu shows Client Support as dropdown**

In the mobile menu, Client Support & Login should appear with expandable dropdown functionality.

**Validates: Requirements 11.4**

**Example 24: TypeScript is used throughout**

All component files should use .tsx or .ts extensions and include proper TypeScript type annotations.

**Validates: Requirements 13.1**

**Example 25: Reusable components are used**

Landing pages should import and use shared components (HeroSection, ContentSection) rather than duplicating code.

**Validates: Requirements 13.4**

**Example 26: No layout shift occurs**

Removing dropdown indicators should not cause cumulative layout shift (CLS) - navigation bar height and item positions should remain stable.

**Validates: Requirements 13.5**

**Example 27: Next.js prefetching is enabled**

Link components should have prefetch enabled (default behavior) for improved navigation performance.

**Validates: Requirements 14.1**

**Example 28: Images use lazy loading**

Image elements below the fold should include loading="lazy" attribute.

**Validates: Requirements 14.3**

**Example 29: Bundle size is reduced**

The JavaScript bundle size should be smaller after removing unused mega menu components (measurable via build output).

**Validates: Requirements 14.4**

**Example 30: Images use WebP format**

Image elements should use WebP format with fallback formats for browser compatibility.

**Validates: Requirements 14.5**

## Error Handling

### Navigation Errors

**Invalid Route Handling**:
- If a navigation link points to a non-existent route, Next.js will display a 404 page
- Implement custom 404 page with navigation back to home or main sections
- Log navigation errors to monitoring service for debugging

**Broken Link Detection**:
- During build time, validate all internal links point to existing routes
- Use Next.js link checking or custom script to detect broken links
- Fail build if critical navigation links are broken

### Dropdown Interaction Errors

**Click Outside Detection**:
- Use event listener with proper cleanup to prevent memory leaks
- Handle edge cases where dropdown is open during route transition
- Ensure dropdown closes when navigation occurs

**Animation Errors**:
- Wrap Framer Motion animations in error boundaries
- Provide fallback rendering if animation library fails to load
- Gracefully degrade to no animation rather than breaking UI

### Responsive Breakpoint Errors

**Viewport Detection**:
- Use reliable viewport detection (window.matchMedia)
- Handle server-side rendering where window is undefined
- Provide sensible defaults for initial render

**Layout Shift Prevention**:
- Reserve space for navigation elements during loading
- Use CSS to prevent layout shifts when removing dropdown indicators
- Test with Chrome DevTools Lighthouse for CLS metrics

### Content Loading Errors

**Missing Content**:
- Provide fallback content if page data fails to load
- Display user-friendly error messages
- Implement retry logic for transient failures

**Image Loading Failures**:
- Use alt text for accessibility when images fail
- Provide placeholder or fallback images
- Handle WebP format fallback for unsupported browsers

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and component rendering
- **Property tests**: Verify universal properties across all inputs and states
- Both approaches are complementary and necessary for production readiness

### Unit Testing

Unit tests should focus on:

1. **Component Rendering**:
   - Verify each landing page renders with correct structure
   - Test that navigation items render with/without dropdown indicators
   - Verify Client Support dropdown renders correctly
   - Test mobile menu rendering at different breakpoints

2. **Specific Examples**:
   - Test that Digital Marketing Services page shows all expected sections
   - Test that Industries page displays all category badges
   - Test that Resources page shows Free Tools, Learn, and Case Studies
   - Test that Company page shows all company information sections

3. **Edge Cases**:
   - Test navigation behavior when already on target page
   - Test dropdown behavior with rapid open/close clicks
   - Test mobile menu behavior during orientation changes
   - Test animation behavior with reduced motion preferences

4. **Integration Points**:
   - Test Next.js Link component integration
   - Test Framer Motion animation integration
   - Test responsive breakpoint transitions
   - Test active page highlighting with Next.js router

### Property-Based Testing

**Library Selection**: Use **fast-check** for TypeScript/JavaScript property-based testing

**Configuration**: Each property test should run minimum 100 iterations

**Test Tagging**: Each test must reference its design property using the format:
```typescript
// Feature: navigation-restructure, Property 1: Converted navigation items route to dedicated pages
```

**Property Test Implementation**:

1. **Property 1: Converted navigation items route to dedicated pages**
   - Generate: Random navigation item from converted list
   - Action: Simulate click event
   - Assert: Route changes to expected path, no dropdown appears
   - Tag: `Feature: navigation-restructure, Property 1`

2. **Property 2: Navigation routing uses client-side transitions**
   - Generate: Random navigation item
   - Action: Simulate click and monitor page reload events
   - Assert: No full page reload occurs
   - Tag: `Feature: navigation-restructure, Property 2`

3. **Property 3: All navigation links point to valid routes**
   - Generate: All navigation items
   - Action: Extract href values
   - Assert: Each href corresponds to existing route
   - Tag: `Feature: navigation-restructure, Property 3`

4. **Property 4: Client Support dropdown toggles on interaction**
   - Generate: Random number of toggle clicks (1-10)
   - Action: Simulate clicks on Client Support item
   - Assert: Dropdown state alternates correctly
   - Tag: `Feature: navigation-restructure, Property 4`

5. **Property 5: Dropdown closes on outside click**
   - Generate: Random DOM element outside dropdown
   - Action: Open dropdown, click outside element
   - Assert: Dropdown closes
   - Tag: `Feature: navigation-restructure, Property 5`

6. **Property 6: Dropdown functions across all breakpoints**
   - Generate: Random viewport width from each breakpoint range
   - Action: Open and close dropdown
   - Assert: Dropdown functions correctly at each width
   - Tag: `Feature: navigation-restructure, Property 6`

7. **Property 7: Active page is highlighted in navigation**
   - Generate: Random page route
   - Action: Navigate to page
   - Assert: Corresponding nav item has active styling
   - Tag: `Feature: navigation-restructure, Property 7`

8. **Property 8: Mobile menu expands and collapses**
   - Generate: Random number of hamburger clicks (1-10)
   - Action: Simulate clicks at mobile breakpoint
   - Assert: Menu state alternates correctly
   - Tag: `Feature: navigation-restructure, Property 8`

9. **Property 9: Mobile navigation closes after item selection**
   - Generate: Random navigation item
   - Action: Open mobile menu, click item
   - Assert: Navigation occurs and menu closes
   - Tag: `Feature: navigation-restructure, Property 9`

10. **Property 10: Touch targets meet minimum size requirements**
    - Generate: All interactive elements
    - Action: Measure computed dimensions
    - Assert: Width and height >= 44px
    - Tag: `Feature: navigation-restructure, Property 10`

11. **Property 11: Scroll-triggered animations reveal content**
    - Generate: Random content section
    - Action: Scroll section into viewport
    - Assert: Animation classes are applied
    - Tag: `Feature: navigation-restructure, Property 11`

12. **Property 12: Interactive elements have hover effects**
    - Generate: Random button or link element
    - Action: Simulate hover event
    - Assert: Styles change on hover
    - Tag: `Feature: navigation-restructure, Property 12`

13. **Property 13: Typography hierarchy is consistent**
    - Generate: All landing pages
    - Action: Extract heading font sizes
    - Assert: Same heading levels use same font sizes
    - Tag: `Feature: navigation-restructure, Property 13`

14. **Property 14: Heading hierarchy follows semantic order**
    - Generate: Random landing page
    - Action: Extract heading levels in order
    - Assert: No level skips (e.g., h1 → h3)
    - Tag: `Feature: navigation-restructure, Property 14`

15. **Property 15: Pages include required meta tags**
    - Generate: All landing pages
    - Action: Query for meta tags
    - Assert: Title, description, and OG tags present and non-empty
    - Tag: `Feature: navigation-restructure, Property 15`

### Testing Tools and Frameworks

- **Unit Testing**: Jest + React Testing Library
- **Property Testing**: fast-check
- **E2E Testing**: Playwright (for integration scenarios)
- **Visual Regression**: Percy or Chromatic (optional)
- **Accessibility**: axe-core + jest-axe

### Test Coverage Goals

- Unit test coverage: > 80% for navigation components
- Property test coverage: All 15 properties implemented
- E2E test coverage: Critical user flows (navigation, mobile menu, dropdown)
- Accessibility: WCAG 2.1 AA compliance (manual verification required)

### Continuous Integration

- Run all tests on every pull request
- Block merges if tests fail
- Generate coverage reports
- Run visual regression tests on UI changes
- Perform Lighthouse audits for performance and accessibility
