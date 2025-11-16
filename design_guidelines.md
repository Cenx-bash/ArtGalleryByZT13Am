# Design Guidelines: Premium Minimalist Filipino Art Gallery

## Design Approach
**Reference-Based**: Draw inspiration from museum websites like The Met, MoMA, and Tate Modern, combined with minimalist galleries like Unsplash and Artsy. Focus on letting the artwork breathe with generous whitespace and museum-quality presentation.

## Typography
**Single Font Family**: Poppins (via Google Fonts CDN)
- Hero/H1: Poppins Light (300), 3.5rem desktop / 2.5rem mobile
- Section Headings/H2: Poppins Regular (400), 2.5rem desktop / 1.75rem mobile
- Card Titles/H3: Poppins Medium (500), 1.5rem
- Body Text: Poppins Regular (400), 1rem, line-height 1.6
- Metadata/Captions: Poppins Light (300), 0.875rem
- Navigation: Poppins Medium (500), 0.95rem, letter-spacing: 0.025em

## Color Palette
Inspired by Philippine textiles and natural landscapes:
- Background: Warm off-white (#FAFAF8)
- Text Primary: Deep charcoal (#2A2A2A)
- Accent: Muted terracotta/rust from traditional Filipino weaving (#B8735C)
- Neutral Gray: For borders and subtle elements (#E5E5E3)
- Pure white for modals and cards

## Layout System
**Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistency
- Section padding: py-20 desktop / py-12 mobile
- Container max-width: 1400px with px-6 mobile / px-12 desktop
- Card spacing: gap-8 desktop / gap-6 mobile
- Generous margins between major sections (mb-32 desktop / mb-20 mobile)

## Component Library

**Navigation**
- Fixed header with subtle shadow on scroll
- Logo left, menu items center-right, clean horizontal layout
- Mobile: Hamburger menu with full-screen overlay

**Hero Section**
- Full-width featured Filipino artwork as background (60-70vh height)
- Overlay with semi-transparent dark gradient (bottom to top)
- Centered mission statement with blurred-background button (no hover effects on blur)
- Large, impactful typography

**Artwork Grid**
- Responsive: 1 column mobile / 2 columns tablet / 3 columns desktop
- Cards with 4:5 aspect ratio images
- Hover state: Gentle lift (translateY -4px) + metadata overlay fade-in
- Quick metadata: Artist name, title, year in overlay

**Filter Bar**
- Horizontal category pills with active state in accent color
- Search input with clean border styling
- Sticky positioning below header when scrolling

**Featured Artists Cards**
- Horizontal layout with circular artist photo (200px)
- Artist name, specialty, brief bio (2-3 lines)
- 2 columns desktop / 1 column mobile

**Exhibitions Timeline/Carousel**
- Horizontal scroll with snap points
- Exhibition cards with image, title, dates, venue
- Navigation arrows in accent color

**Artwork Detail Modal**
- Centered modal (max-width 1200px) with dark overlay
- Large artwork image (left 60%) + metadata panel (right 40%)
- Full metadata: Title, Artist, Year, Medium, Dimensions, Description
- Close button (X) top-right, keyboard accessible (ESC to close)

**Footer**
- Three-column layout: About snippet, Quick links, Newsletter signup
- Social icons in accent color
- Credits and copyright in smaller text

## Images
**Required Images**:
1. **Hero**: Large, striking Filipino artwork (painting or contemporary piece), landscape orientation, high-quality
2. **Artwork Samples (6 minimum)**: Mix of Visual Arts (2), Literary Arts (1), Applied Arts (2), Performance Arts (1) - use portrait-oriented images
3. **Featured Artists (4)**: Professional headshots or artist photos, square format
4. **Exhibitions (3-4)**: Exhibition hall or artwork installation photos

Use lazy-loading for all artwork images. Hero loads immediately for impact.

## Interactions & Animations
**Micro-animations** (subtle and refined):
- Page load: Stagger fade-in for artwork cards (100ms delay each)
- Hover: Artwork cards lift 4px with 0.3s ease
- Modal: Fade-in background overlay + scale-in modal (0.2s)
- Filter clicks: Smooth transition for grid re-arrangement
- Scroll: Gentle parallax on hero image (0.5 speed)

**No animations on**:
- Buttons with blurred backgrounds
- Text or typography
- Navigation items (simple underline on hover)

## Accessibility
- All interactive elements keyboard navigable
- Modal: aria-modal="true", focus trap, ESC key closes
- Carousel: aria-label for navigation buttons
- Images: Descriptive alt text for all artwork
- Color contrast ratio minimum 4.5:1 for text