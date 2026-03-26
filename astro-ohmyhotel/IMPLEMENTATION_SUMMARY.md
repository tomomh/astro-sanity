# Astro Layouts & Common Components Implementation Summary

## Project Overview
This document summarizes the implementation of Astro layouts and common components for the Ohmyhotel & Co website migration from React to Astro + Sanity.

**Sanity Project ID:** `i7q7u7k8`
**Dataset:** `production`

---

## Files Created

### 1. Sanity Client Configuration
**File:** `src/sanity/client.ts`
- Exports configured Sanity client
- Provides `urlFor()` helper function for image URL generation
- Integrates with `@sanity/image-url` for image transformations

### 2. Layouts

#### BaseLayout (`src/layouts/BaseLayout.astro`)
- Core HTML structure with head tags
- Meta tags for SEO and viewport
- Google Fonts integration (Noto Sans)
- Favicon and generator meta
- Accepts props: `title`, `description`, `lang`
- Imports global CSS styles

#### PageLayout (`src/layouts/PageLayout.astro`)
- Extends BaseLayout
- Includes Header and Footer components
- Main content area with proper spacing (margin-top for fixed header)
- Passes language and path context to child components

### 3. Layout Components

#### Header (`src/components/layout/Header.astro`)
**Features:**
- Fixed position navigation bar
- Logo with link to homepage
- Desktop navigation with dropdown menus:
  - About Us (CEO Message, Vision, History, CI, Location)
  - Business (OTA, Booking Engine, PMS, CMS, Hotel Management)
  - Careers (Desired Traits, Job Opportunities)
- Integrated LanguageSwitcher component
- Mobile hamburger menu toggle
- Active page state highlighting
- Responsive design (mobile/tablet/desktop)
- Multi-language support (ja, en, vi, ko)
- Smooth hover effects with gradient accent

**Styling:**
- Matches original design from React version
- Dropdown menus with arrow indicators
- Box shadows and gradients from design system
- Mobile-first approach with collapsible menu

#### Footer (`src/components/layout/Footer.astro`)
**Features:**
- Company logo (grayscale version)
- Navigation links (About Us, Business, Careers)
- Contact links (Contact Us, Location, Privacy Policy)
- Address, phone, and fax information
- Social media links:
  - Facebook
  - Instagram
  - Naver Blog
  - LinkedIn
  - OMT Partner
  - Kakao
- Copyright notice
- Conditional rendering (hides fax for Vietnamese language)
- Multi-language support

**Styling:**
- Skewed decorative borders (top)
- Light blue background (#fafcff)
- Icon containers with circular design
- Responsive layout for mobile/tablet

#### Navigation (`src/components/layout/Navigation.astro`)
- Standalone desktop navigation component
- Can be used independently or as part of Header
- Dropdown menu structure with hover effects
- Multi-level navigation support

#### MobileMenu (`src/components/layout/MobileMenu.astro`)
- Full-screen mobile menu overlay
- Expandable/collapsible sections
- Smooth animations
- Close button
- Prevents body scroll when open

### 4. Common Components

#### Button (`src/components/common/Button.astro`)
**Props:**
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'small' | 'medium' | 'large'
- `href`: Optional link URL
- `type`: Button type for form submission
- `disabled`: Disable button
- `target`, `rel`: Link attributes

**Variants:**
- **Primary:** Gradient background with brand colors
- **Secondary:** White background with border
- **Outline:** Transparent with colored border

**Features:**
- Renders as `<a>` or `<button>` based on href prop
- Hover effects with transform and shadow
- Focus states for accessibility
- Disabled state styling

#### Banner (`src/components/common/Banner.astro`)
**Props:**
- `title`: Banner heading
- `subtitle`: Banner subheading
- `backgroundImage`: Background image URL
- `backgroundColor`: Fallback background color
- `height`: Banner height (default: 40rem)
- `overlay`: Boolean to show dark overlay
- `overlayOpacity`: Opacity level (0-1)
- `textAlign`: 'left' | 'center' | 'right'

**Features:**
- Full-width responsive banner
- Background image with cover sizing
- Optional dark overlay for better text contrast
- Flexible text alignment
- Slot for custom content
- Responsive text sizing

#### Card (`src/components/common/Card.astro`)
**Props:**
- `title`: Card title
- `description`: Card description
- `image`: Card image URL
- `imageAlt`: Image alt text
- `ctaText`: Call-to-action button text
- `ctaHref`: Call-to-action link
- `variant`: 'default' | 'horizontal' | 'minimal'

**Variants:**
- **Default:** Vertical card with image on top
- **Horizontal:** Side-by-side layout (40% image, 60% content)
- **Minimal:** No shadow, simple border

**Features:**
- Image hover zoom effect
- Hover lift animation
- Integrates with Button component
- Flexible content slot
- Responsive design

#### LanguageSwitcher (`src/components/common/LanguageSwitcher.astro`)
**Features:**
- Dropdown with 4 language options (ja, en, vi, ko)
- Flag icons for each language
- Current language display
- Generates proper language URLs
- Hover and click interactions
- Desktop: Hover to open
- Mobile: Click to toggle
- Smooth animations

#### SEO (`src/components/common/SEO.astro`)
**Props:**
- `title`: Page title
- `description`: Meta description
- `image`: OG image URL
- `imageAlt`: OG image alt text
- `canonical`: Canonical URL
- `noindex`, `nofollow`: Robot directives
- `ogType`: Open Graph type
- `lang`: Page language
- `alternateLanguages`: Array of alternate language URLs
- `keywords`: SEO keywords array
- `author`: Content author

**Features:**
- Primary meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Language alternates (hreflang)
- Canonical URL
- Robots meta
- Theme color
- Proper length validation for titles/descriptions

### 5. Sanity Queries

#### Settings Queries (`src/sanity/queries/settings.ts`)
**Functions:**
- `getSiteSettings(lang)`: Fetches global site settings
- `getNavigation(lang)`: Fetches navigation menu structure
- `getFooterContent(lang)`: Fetches footer-specific content
- `getSEOSettings(lang)`: Fetches default SEO settings

**Features:**
- Localized content queries
- Error handling
- Type-safe responses
- Supports all 4 languages

#### Pages Queries (`src/sanity/queries/pages.ts`)
**Functions:**
- `getHomepage(lang)`: Homepage with hero and sections
- `getAboutUsPage(slug, lang)`: About us pages (CEO, Vision, etc.)
- `getBusinessPage(slug, lang)`: Business pages (OTA, PMS, etc.)
- `getCareersPage(slug, lang)`: Career pages
- `getPageBySlug(slug, lang)`: Generic page query
- `getAllPageSlugs(pageType?)`: Get all slugs for static generation

**Features:**
- Rich content querying with nested objects
- Image asset resolution
- SEO data extraction
- Multi-language support
- Flexible content blocks

### 6. Global Styles

#### CSS Variables (`src/styles/global.css`)
**Variables from original design:**
```css
--primary-text-color: #444444
--primary-header-color: #2c2c2c
--primary-box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1)
--primary-box-shadow-inset: inset 0 0.4rem 1.5rem 0 rgba(0, 0, 0, 0.1)
--primary-border: 1px solid #eee
--border-linear: linear-gradient(270deg, #FFFFFF 0%, #E3E3E3 51.39%, #FFFFFF 100%)
--brand-color-gradient: linear-gradient(311.56deg, #EE8768 0%, #EE8768 27.3%, #EAB65A 100%)
--background-color-lightblue: #F7FAFD
```

**Base Styles:**
- HTML font size: 62.5% (10px base for rem calculations)
- Body: Noto Sans font family, 1.6rem base size
- Smooth scrolling
- Link hover effects
- Utility classes (container, alignment, etc.)

**Typography:**
- Headings with proper weights and line heights
- Gradient text class for brand colors

**Utilities:**
- Container class (max-width: 1140px)
- Flexbox utilities
- Text alignment classes
- Disable scroll class for modal states

---

## Design System Match

### Colors
All colors match the original SCSS variables:
- Primary text: #444444
- Headers: #2c2c2c
- Brand gradient: Orange to yellow (#EE8768 to #EAB65A)
- Light blue background: #F7FAFD

### Typography
- Font family: Noto Sans (loaded from Google Fonts)
- Base size: 1.6rem (16px)
- Responsive scaling for mobile/tablet

### Spacing
- Consistent use of rem units
- Matches original padding/margin values
- Responsive breakpoints:
  - Mobile: ≤767px
  - Tablet: 768px-991px
  - Desktop: ≥992px

### Shadows & Effects
- Box shadows match original design
- Inset shadows for icon containers
- Gradient effects on hover
- Smooth transitions (0.2s-0.3s)

---

## Multi-Language Support

### Supported Languages
1. **Japanese (ja)** - Default
2. **English (en)**
3. **Vietnamese (vi)**
4. **Korean (ko)**

### Implementation
- Translation objects in each component
- URL structure: `/[lang]/path`
- Language switcher with flag icons
- Conditional content (e.g., fax number for non-Vietnamese)
- SEO alternate language tags

---

## Responsive Design

### Breakpoints
- **Mobile:** 0-767px
  - Hamburger menu
  - Stacked layouts
  - Full-width components
  - Larger touch targets

- **Tablet:** 768-991px
  - Adjusted spacing
  - Some elements remain stacked
  - Optimized for iPad

- **Desktop:** 992px+
  - Full navigation bar
  - Multi-column layouts
  - Hover interactions

### Mobile Menu Features
- Full-screen overlay
- Slide-in animation
- Expandable sections
- Close button
- Scroll prevention

---

## Usage Examples

### Basic Page Setup
```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import SEO from '../components/common/SEO.astro';
import Banner from '../components/common/Banner.astro';

const lang = 'ja';
const title = 'Page Title';
---

<PageLayout lang={lang} title={title}>
  <SEO
    title={title}
    description="Page description"
    lang={lang}
  />

  <Banner
    title="Welcome"
    subtitle="Subtitle text"
    backgroundImage="/images/banner.jpg"
    overlay={true}
  />

  <!-- Page content -->
</PageLayout>
```

### Using Components
```astro
---
import Button from '../components/common/Button.astro';
import Card from '../components/common/Card.astro';
---

<Button variant="primary" size="large" href="/contact">
  Contact Us
</Button>

<Card
  title="Feature Title"
  description="Description text"
  image="/images/feature.jpg"
  ctaText="Learn More"
  ctaHref="/learn-more"
  variant="default"
/>
```

### Fetching Sanity Data
```astro
---
import { getHomepage } from '../sanity/queries/pages';

const lang = 'ja';
const homepage = await getHomepage(lang);
---

<h1>{homepage?.title}</h1>
<p>{homepage?.description}</p>
```

---

## File Structure

```
astro-ohmyhotel/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Banner.astro
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── LanguageSwitcher.astro
│   │   │   └── SEO.astro
│   │   └── layout/
│   │       ├── Footer.astro
│   │       ├── Header.astro
│   │       ├── MobileMenu.astro
│   │       └── Navigation.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── sanity/
│   │   ├── client.ts
│   │   └── queries/
│   │       ├── pages.ts
│   │       └── settings.ts
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── i18n.ts
├── astro.config.mjs (configured with projectId: i7q7u7k8)
└── package.json
```

---

## Next Steps

### To Complete the Migration:
1. **Create page templates** for each section (About Us, Business, Careers)
2. **Add images and assets** to `/public/images/`
3. **Implement content blocks** for Sanity portable text
4. **Add form handling** for contact forms
5. **Set up dynamic routing** for blog posts or job listings
6. **Configure Sanity schemas** to match the query structures
7. **Add analytics** and tracking
8. **Implement search** functionality if needed
9. **Test all languages** and responsive layouts
10. **Deploy** to hosting platform

### Assets Needed:
- Logo images (SVG): `/images/logo/logo.svg`, `/images/footer/logo-gray.svg`
- Flag icons: `/images/flags/[ja|en|vi|ko].svg`
- Social icons: `/images/footer/[instagram|naver-blog|linkedIn|omt-partner|kakao].svg`
- UI icons: `/images/icons/[close|chevron|facebook].svg`
- Footer icons: `/images/footer/[location|phone|fax].svg`
- Default OG image: `/images/og-default.jpg`

---

## Technical Notes

### Astro Features Used:
- Component-based architecture
- TypeScript for type safety
- Scoped CSS styling
- Client-side scripts for interactivity
- Props with TypeScript interfaces
- Slots for flexible content

### Performance Considerations:
- CSS is scoped and optimized
- Images should use Sanity's image optimization
- Minimal JavaScript (only for interactive components)
- Static site generation for better performance
- Lazy loading can be added for images

### Accessibility:
- Semantic HTML elements
- ARIA labels on buttons and toggles
- Keyboard navigation support
- Focus states on interactive elements
- Alt text for images
- Proper heading hierarchy

---

## Maintenance

### Updating Translations:
Edit the translation objects in each component:
```typescript
const translations: Record<string, Record<string, string>> = {
  ja: { key: 'value' },
  en: { key: 'value' },
  // ...
};
```

### Adding New Components:
1. Create component in appropriate directory
2. Follow existing naming conventions
3. Include TypeScript props interface
4. Add responsive styles
5. Support all languages if content is displayed

### Modifying Styles:
- Global variables: `src/styles/global.css`
- Component styles: Scoped `<style>` blocks
- Maintain consistency with design system

---

## Support & Documentation

- **Astro Docs:** https://docs.astro.build
- **Sanity Docs:** https://www.sanity.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Original React Code:** `D:\Code\ohmyhotelnco-web\`

---

**Implementation Date:** March 26, 2026
**Developer:** Claude (Anthropic)
**Project Status:** Core layouts and components complete, ready for content population
