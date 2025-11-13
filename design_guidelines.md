# BM Creations IMVU E-Commerce Design Guidelines

## Design Approach

**Reference-Based Approach**: Gaming and futuristic e-commerce platforms with IMVU-inspired aesthetics. Draw inspiration from gaming marketplaces, cyberpunk interfaces, and modern dark-themed tech platforms while maintaining unique IMVU brand identity.

## Core Design Principles

1. **Futuristic Gaming Aesthetic**: Dark mode foundation with neon accents creating an immersive, IMVU-inspired experience
2. **Trust and Professionalism**: Despite the gaming theme, maintain credibility through clean layouts and clear information hierarchy
3. **Visual Impact**: Use glowing effects, 3D elements, and animations strategically to enhance engagement without compromising performance

## Visual Theme

### Color Palette
- **Primary Background**: Deep black (#000000 to #0a0a0a)
- **Secondary Background**: Dark gray with purple tint (#1a1a2e, #16213e)
- **Accent Colors**: Neon purple (#a855f7, #c026d3), electric blue (#3b82f6, #2563eb)
- **Glow Effects**: Purple and blue gradients for buttons, borders, and highlights
- **Text**: White (#ffffff) for primary, light gray (#e5e7eb) for secondary

### Typography
- **Font Families**: Modern tech/gaming fonts (Orbitron, Exo 2, Rajdhana, or similar sci-fi style fonts via Google Fonts)
- **Hierarchy**:
  - Headings: Bold, large sizes (3xl to 6xl) with letter-spacing
  - Subheadings: Medium weight (xl to 2xl)
  - Body: Regular weight, optimized for readability
  - Buttons/CTAs: Uppercase, semi-bold with tracking

## Layout System

### Spacing
Use Tailwind spacing units: **4, 6, 8, 12, 16, 20** for consistent rhythm
- Section padding: py-16 to py-24
- Component spacing: gap-6 to gap-8
- Card padding: p-6 to p-8

### Container Structure
- Max-width: 7xl (1280px) for main content
- Full-width sections for hero and immersive backgrounds
- Responsive grid: 1 column mobile, 2-3 columns tablet, 3-4 columns desktop

## Component Library

### Navigation
- **Header**: Sticky dark navigation with blur backdrop, logo left, nav center, CTA right
- **Links**: Glowing underline on hover, smooth transitions
- **Mobile**: Hamburger menu with slide-in overlay

### Buttons
- **Primary CTA**: Neon purple/blue gradient background with glow effect, rounded corners, uppercase text
- **Secondary**: Outlined with gradient border, transparent background
- **Hover State**: Intensified glow, scale transform (1.05), smooth 300ms transition
- **Hero Buttons**: Blurred background with strong neon borders when overlaying images

### Cards (Products)
- Dark background with subtle gradient
- Rounded corners (xl or 2xl)
- Purple/blue glowing border on hover
- Image at top, content below with clear typography hierarchy
- "Buy Now" button prominent at bottom
- Include price badge with neon accent

### Modal/Popup (Payment)
- **Backdrop**: Dark overlay with blur (backdrop-blur-md)
- **Container**: Centered card with strong glow effect and neon border
- **Animation**: Fade and slide-in from center
- **Close Button**: Top-right with X icon, glowing on hover

### Forms
- Dark input fields with light borders
- Neon purple/blue focus glow
- Floating labels or clear placeholders
- Upload buttons styled as gradient CTAs

### Chat Widget
- **Position**: Fixed bottom-right, floating above content
- **Icon**: Neon purple/pink glowing circle with chat icon
- **Window**: Dark card with rounded corners, purple accent border
- **Messages**: User messages right-aligned (blue), bot messages left-aligned (purple)
- **Animation**: Smooth slide-up open/close

## Page-Specific Layouts

### Home Page
- **Hero**: Full viewport height with animated particle background or 3D IMVU avatars, centered headline and CTAs with blurred button backgrounds
- **Features/Products Preview**: Grid layout showcasing top products with glowing cards
- **Trust Indicators**: Customer count, ratings displayed with neon badges

### Shop/Products
- **Category Filters**: Horizontal tabs with active state glow
- **Product Grid**: 3-4 columns desktop, responsive to 1 column mobile
- **Product Cards**: Image, title, short description, price, "Buy Now" button

### Track Order
- **Search Section**: Centered form with large input and glowing submit button
- **Status Display**: Timeline/progress bar with neon indicators for each stage (Pending → Processing → Completed → Rejected)

### About Us
- **Layout**: Single column with max-w-4xl, centered text
- **Visual**: Subtle background pattern or glow effects

### Contact
- **Two-Column**: Form on left, contact info/social links on right
- **Social Icons**: Large, glowing on hover with brand colors

## Visual Effects & Animations

### Glow Effects
- Box shadows with purple/blue spread on buttons, cards, borders
- Text-shadow for headlines to create neon sign effect
- Use sparingly to maintain performance

### Hover Animations
- Scale transforms (1.02-1.05)
- Glow intensity increase
- Color transitions (300ms ease)

### Background Effects
- Animated gradient backgrounds for hero sections
- Particle effects using lightweight libraries
- Subtle parallax scrolling (minimal)

### Loading States
- Glowing skeleton screens with purple shimmer
- Spinner with neon ring animation

## Images

### Hero Section
- **Type**: Futuristic IMVU-themed background - either animated particles, 3D avatar showcase, or stylized gaming environment
- **Treatment**: Dark overlay (opacity 60-70%) to ensure text readability
- **Placement**: Full-width background behind hero content

### Product Images
- **Format**: Square or 16:9 aspect ratio
- **Treatment**: Clean product shots with subtle glow border on card hover
- **Placement**: Top of product cards

### About/Trust Badges
- Optional IMVU-style graphics or customer testimonial images with circular frames and neon borders

## Responsive Behavior

### Breakpoints
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2 column grids, condensed spacing)
- Desktop: > 1024px (full multi-column layouts, expanded spacing)

### Mobile Optimizations
- Larger tap targets (min 44x44px)
- Simplified animations
- Stacked navigation with hamburger menu
- Reduced glow effects for performance

## Accessibility

- Maintain WCAG AA contrast ratios despite dark theme (white text on dark backgrounds)
- Keyboard navigation for all interactive elements
- Focus states with visible neon outline
- Alt text for all product images
- ARIA labels for icon-only buttons

## Performance Considerations

- Optimize animations using CSS transforms and opacity
- Lazy load images below fold
- Use CSS gradients over image gradients where possible
- Minimal JavaScript for visual effects
- Compress all images and use modern formats (WebP)

## Trust & Professional Elements

- Clear pricing with no hidden fees
- Prominent customer support options (chat widget, Discord, contact form)
- Security badges and payment method icons
- Professional copywriting avoiding gaming slang in critical sections
- Clear order tracking and status updates
- Footer disclaimer about IMVU trademark

---

**Final Note**: Balance the futuristic gaming aesthetic with professional e-commerce UX patterns. Every visual flourish should enhance usability, not distract from the core shopping experience.