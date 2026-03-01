# Hibu Digital Marketing Platform

A modern, enterprise-level digital marketing platform built for local businesses. This Next.js application provides a comprehensive suite of marketing tools, services information, and client resources with a focus on performance, accessibility, and user experience.

## 🚀 Overview

Hibu is a digital marketing services platform that helps local businesses grow through tailored marketing solutions. This web application showcases Hibu's services, provides client support, and offers a performance dashboard for existing customers.

## ✨ Key Features

### 🎨 Modern UI/UX
- **Glassmorphism Effects**: Modern card designs with backdrop blur and transparency
- **Animated Particles Background**: Dynamic particle systems that adapt to theme
- **Dark/Light Theme Support**: Seamless theme switching with `next-themes`
- **Responsive Design**: Fully responsive across all devices (320px - 2560px)
- **Smooth Animations**: Framer Motion powered animations throughout

### 📱 Core Pages

- **Home** (`/`) - Main landing page with hero, features, reviews, and stats
- **Hibu One** (`/hibu-one`) - Marketing platform showcase with feature panels
- **Industries** (`/industries`) - Industry-specific marketing solutions
- **Digital Marketing Services** (`/digital-marketing-services`) - Service offerings
- **Resources** (`/resources`) - Educational content and guides
- **Company** (`/company`) - About Hibu and company information
- **Client Support** (`/client-support`) - Support portal with contact form
- **Login** (`/login`) - Client dashboard authentication
- **Get Started** (`/get-started-2026`) - Demo request and onboarding

### 🎯 Technical Highlights

- **Next.js 16** with App Router and React Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom design system
- **Radix UI** components for accessible primitives
- **Framer Motion** for animations
- **Form Validation** with React Hook Form and Zod
- **Canvas-based Particle Systems** with performance optimizations
- **WCAG AA Compliant** contrast ratios and accessibility features

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 16.1.6
- **React**: 19.2.3
- **TypeScript**: 5.7.3
- **Node.js**: 22+ recommended

### Styling
- **Tailwind CSS**: 3.4.17
- **Tailwind Animate**: Custom animations
- **Class Variance Authority**: Component variants
- **Lucide React**: Icon library

### UI Components
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Recharts**: Data visualization
- **Embla Carousel**: Carousel component

### Forms & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation integration

### Theme & Utilities
- **next-themes**: Theme management
- **clsx & tailwind-merge**: Class name utilities
- **date-fns**: Date manipulation

## 📦 Installation

### Prerequisites
- Node.js 22+ (recommended)
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd hibu-platform

# Install dependencies
pnpm install
# or
npm install

# Run development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Available Scripts

```bash
# Development
pnpm dev          # Start dev server with Turbo
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Testing
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

## 📁 Project Structure

```
hibu-platform/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── client-support/       # Support form endpoint
│   │   └── demo-request/         # Demo request endpoint
│   ├── client-support/           # Client support page
│   ├── company/                  # Company info page
│   ├── digital-marketing-services/ # Services page
│   ├── get-started-2026/         # Demo request page
│   ├── hibu-one/                 # Platform showcase
│   ├── industries/               # Industries page
│   ├── login/                    # Authentication page
│   ├── resources/                # Resources page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── client-support/           # Support form components
│   ├── get-started/              # Demo request components
│   ├── hibu-one/                 # Hibu One feature components
│   ├── ui/                       # Reusable UI components
│   ├── navbar.tsx                # Navigation
│   ├── footer.tsx                # Footer
│   ├── hero-section.tsx          # Hero component
│   ├── login-form.tsx            # Login form
│   ├── login-background.tsx      # Login particles
│   ├── dynamic-background.tsx    # Shared particles
│   └── ...                       # Other components
│
├── lib/                          # Utility functions
│   ├── utils.ts                  # General utilities
│   ├── accessibility-utils.ts    # A11y helpers
│   └── card-patterns.ts          # Card styling patterns
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx            # Mobile detection
│   ├── use-in-view.ts            # Intersection observer
│   ├── use-parallax.ts           # Parallax effects
│   ├── use-reduced-motion.ts     # Motion preferences
│   └── use-scroll-animation.ts   # Scroll animations
│
├── .kiro/                        # Kiro AI specs & documentation
│   └── specs/                    # Feature specifications
│       ├── login-industries-theme-improvements/
│       ├── client-support-page/
│       ├── hibu-one-landing-page/
│       └── ...
│
├── public/                       # Static assets
├── scripts/                      # Build and test scripts
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🎨 Design System

### Theme
- **Light Theme**: Clean, professional with subtle particles
- **Dark Theme**: Modern, high-contrast with animated particles
- **System Theme**: Respects OS preference

### Colors
- Primary: Blue (`#3B82F6`)
- Secondary: Purple (`#B450FF`)
- Accent: Pink, Green
- Neutrals: Slate scale

### Typography
- Font Family: Geist Sans, Geist Mono
- Responsive sizing with Tailwind utilities
- WCAG AA compliant contrast ratios

### Components
- Glassmorphism cards with hover effects
- Animated particles backgrounds
- Smooth transitions (300ms default)
- Accessible form controls
- Responsive navigation

## ♿ Accessibility

- **WCAG AA Compliant**: Minimum 4.5:1 contrast ratios
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Indicators**: Visible focus states
- **Form Validation**: Clear error messages

## 🎯 Performance

### Optimizations
- **Canvas Particle Systems**: Capped at 30-64 particles
- **Device Pixel Ratio**: Limited to 2x for memory efficiency
- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Automatic with Next.js
- **Frame Rate**: Target 30+ FPS (60 FPS ideal)

### Metrics
- **Page Load**: <200ms additional load time for particles
- **Theme Switch**: <300ms transition time
- **Hover Effects**: 300ms smooth animations
- **FPS**: 30+ on standard devices, 60+ on modern hardware

## 🧪 Testing

### Test Coverage
- Unit tests for components
- Integration tests for forms
- Accessibility tests with @axe-core
- Property-based tests for correctness

### Running Tests
```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### Theme Configuration
Theme settings are managed via `next-themes` in `components/theme-provider.tsx`:
- Default: System preference
- Options: light, dark, system
- Persisted in localStorage

## 📚 Documentation

Additional documentation can be found in:
- `.kiro/specs/` - Feature specifications and design documents
- Component-specific `.md` files - Usage examples and patterns
- `TESTING_GUIDE.md` - Comprehensive testing instructions

## 🤝 Contributing

1. Follow the existing code style and conventions
2. Write tests for new features
3. Ensure accessibility compliance
4. Test across browsers and devices
5. Update documentation as needed

## 📄 License

Private - All rights reserved

## 🔗 Links

- **Production**: [Add production URL]
- **Staging**: [Add staging URL]
- **Documentation**: [Add docs URL]

## 💡 Key Features by Page

### Home Page
- Hero section with CTA
- Growth statistics
- Marketing features showcase
- Client reviews and testimonials
- Partner logos
- Video feature section

### Hibu One
- Platform dashboard showcase
- Feature panels with animations
- Ad campaigns section
- Organic marketing benefits
- Final CTA with smooth scroll

### Industries
- Industry-specific solutions grid
- Dark theme particles background
- Responsive card layouts

### Login
- Glassmorphism card design
- Light theme particles
- Smooth hover effects
- Form validation

### Client Support
- Contact form with validation
- Support resources
- Accessibility compliant

### Get Started
- Demo request form
- Client testimonials
- Case studies
- Video testimonials

## 🐛 Known Issues

- Safari <15.4: Limited backdrop-filter support
- IE11: Not supported (modern CSS features required)
- Low-end devices: May experience <30 FPS with particles

## 🚀 Future Enhancements

- [ ] Add more industry-specific pages
- [ ] Implement analytics dashboard
- [ ] Add multi-language support
- [ ] Enhance mobile performance
- [ ] Add more interactive demos

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
