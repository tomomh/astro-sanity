# Component Reference Guide

Quick reference for all Astro components created for the Ohmyhotel & Co website.

---

## Layouts

### BaseLayout
**Path:** `src/layouts/BaseLayout.astro`

```astro
<BaseLayout title="Page Title" description="Page description" lang="ja">
  <!-- Content -->
</BaseLayout>
```

**Props:**
- `title?: string` - Page title (default: "Ohmyhotel & Co")
- `description?: string` - Meta description (default: "Hotel Technology Solutions")
- `lang?: string` - Language code (default: "ja")

---

### PageLayout
**Path:** `src/layouts/PageLayout.astro`

```astro
<PageLayout title="Page Title" description="Page description" lang="ja">
  <!-- Page content -->
</PageLayout>
```

**Props:**
- Same as BaseLayout
- Automatically includes Header and Footer

---

## Common Components

### Button
**Path:** `src/components/common/Button.astro`

```astro
<!-- Link button -->
<Button variant="primary" size="large" href="/contact">
  Contact Us
</Button>

<!-- Form button -->
<Button variant="secondary" type="submit" disabled={false}>
  Submit
</Button>

<!-- Outline button -->
<Button variant="outline" size="small" href="#section">
  Learn More
</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style (default: 'primary')
- `size?: 'small' | 'medium' | 'large'` - Button size (default: 'medium')
- `href?: string` - Link URL (renders as `<a>` if provided)
- `type?: 'button' | 'submit' | 'reset'` - Button type (default: 'button')
- `disabled?: boolean` - Disable state (default: false)
- `target?: string` - Link target attribute
- `rel?: string` - Link rel attribute
- `class?: string` - Additional CSS classes
- `id?: string` - Element ID

**Variants:**
- **primary** - Gradient background with brand colors
- **secondary** - White background with border
- **outline** - Transparent with colored border

**Sizes:**
- **small** - Compact button (0.6rem padding, 1.2rem font)
- **medium** - Standard button (1rem padding, 1.4rem font)
- **large** - Prominent button (1.4rem padding, 1.6rem font)

---

### Banner
**Path:** `src/components/common/Banner.astro`

```astro
<!-- Image banner with overlay -->
<Banner
  title="Welcome to Ohmyhotel"
  subtitle="Hotel Technology Solutions"
  backgroundImage="/images/hero-bg.jpg"
  overlay={true}
  overlayOpacity={0.5}
  height="50rem"
  textAlign="center"
>
  <Button variant="primary" size="large" href="/contact">
    Get Started
  </Button>
</Banner>

<!-- Simple colored banner -->
<Banner
  title="Our Services"
  backgroundColor="var(--background-color-lightblue)"
  height="30rem"
  textAlign="left"
/>
```

**Props:**
- `title?: string` - Banner heading
- `subtitle?: string` - Banner subheading
- `backgroundImage?: string` - Background image URL
- `backgroundColor?: string` - Background color (default: var(--background-color-lightblue))
- `height?: string` - Banner height (default: '40rem')
- `overlay?: boolean` - Show dark overlay (default: false)
- `overlayOpacity?: number` - Overlay opacity 0-1 (default: 0.5)
- `textAlign?: 'left' | 'center' | 'right'` - Text alignment (default: 'center')
- `class?: string` - Additional CSS classes

**Features:**
- Responsive height on mobile
- Automatic text color adjustment
- Slot for custom content
- Background image cover sizing

---

### Card
**Path:** `src/components/common/Card.astro`

```astro
<!-- Default vertical card -->
<Card
  title="Product Name"
  description="Product description text"
  image="/images/product.jpg"
  imageAlt="Product"
  ctaText="Learn More"
  ctaHref="/products/product-name"
  variant="default"
/>

<!-- Horizontal card -->
<Card
  title="Feature Title"
  image="/images/feature.jpg"
  variant="horizontal"
>
  <p>Custom content in the card body</p>
</Card>

<!-- Minimal card -->
<Card
  title="Simple Card"
  description="Minimal design"
  variant="minimal"
/>
```

**Props:**
- `title?: string` - Card title
- `description?: string` - Card description
- `image?: string` - Card image URL
- `imageAlt?: string` - Image alt text (default: '')
- `ctaText?: string` - Call-to-action button text
- `ctaHref?: string` - Call-to-action link
- `variant?: 'default' | 'horizontal' | 'minimal'` - Card style (default: 'default')
- `class?: string` - Additional CSS classes

**Variants:**
- **default** - Vertical layout, image on top (24rem height)
- **horizontal** - Side-by-side layout (40% image, 60% content)
- **minimal** - No shadow, simple border

**Features:**
- Image zoom on hover
- Card lift animation
- Flexible content slot
- Responsive design (horizontal becomes vertical on mobile)

---

### LanguageSwitcher
**Path:** `src/components/common/LanguageSwitcher.astro`

```astro
<LanguageSwitcher currentLang="ja" currentPath="/about-us" />
```

**Props:**
- `currentLang: string` - Current language code (ja, en, vi, ko)
- `currentPath: string` - Current URL path

**Languages:**
- 🇯🇵 Japanese (ja) - Default
- 🇬🇧 English (en)
- 🇻🇳 Vietnamese (vi)
- 🇰🇷 Korean (ko)

**Features:**
- Dropdown with flag icons
- Auto-generates language URLs
- Hover to open (desktop)
- Click to toggle (mobile)
- Smooth animations

---

### SEO
**Path:** `src/components/common/SEO.astro`

```astro
<SEO
  title="Page Title"
  description="Page description for search engines"
  image="/images/og-image.jpg"
  canonical="https://ohmyhotel.com/page"
  lang="ja"
  keywords={['hotel', 'technology', 'PMS']}
  alternateLanguages={[
    { lang: 'ja', url: 'https://ohmyhotel.com/page' },
    { lang: 'en', url: 'https://ohmyhotel.com/en/page' },
    { lang: 'vi', url: 'https://ohmyhotel.com/vi/page' },
    { lang: 'ko', url: 'https://ohmyhotel.com/ko/page' }
  ]}
/>
```

**Props:**
- `title: string` - Page title (required)
- `description: string` - Meta description (required)
- `image?: string` - Open Graph image URL
- `imageAlt?: string` - OG image alt text (default: title)
- `canonical?: string` - Canonical URL
- `noindex?: boolean` - Prevent indexing (default: false)
- `nofollow?: boolean` - Prevent following links (default: false)
- `ogType?: 'website' | 'article' | 'product'` - OG type (default: 'website')
- `lang?: string` - Page language (default: 'ja')
- `alternateLanguages?: Array<{lang: string, url: string}>` - Language alternates
- `keywords?: string[]` - SEO keywords
- `author?: string` - Content author (default: 'Ohmyhotel & Co')

**Meta Tags Generated:**
- Primary meta (title, description, keywords, robots)
- Canonical URL
- Open Graph (Facebook)
- Twitter Card
- Language alternates (hreflang)
- Theme color

---

## Layout Components

### Header
**Path:** `src/components/layout/Header.astro`

```astro
<Header currentLang="ja" currentPath="/about-us/ceo-message" />
```

**Props:**
- `currentLang: string` - Current language code
- `currentPath: string` - Current URL path

**Features:**
- Fixed position at top
- Logo with home link
- Dropdown navigation menus
- Language switcher
- Mobile hamburger menu
- Active page highlighting
- Responsive design

**Navigation Structure:**
- **About Us**
  - CEO Message
  - Vision
  - History
  - CI
  - Location
- **Business**
  - OTA
  - Booking Engine
  - PMS
  - CMS
  - Hotel Management
- **Careers**
  - Desired Traits
  - Job Opportunities

---

### Footer
**Path:** `src/components/layout/Footer.astro`

```astro
<Footer currentLang="ja" />
```

**Props:**
- `currentLang: string` - Current language code

**Features:**
- Company logo (grayscale)
- Quick navigation links
- Contact information
- Social media links
- Copyright notice
- Skewed decorative borders
- Language-specific content (hides fax for Vietnamese)

**Social Links:**
- Facebook
- Instagram
- Naver Blog
- LinkedIn
- OMT Partner
- Kakao

---

### Navigation
**Path:** `src/components/layout/Navigation.astro`

```astro
<Navigation currentLang="ja" currentPath="/business/pms" />
```

**Props:**
- `currentLang: string` - Current language code
- `currentPath: string` - Current URL path

**Note:** Standalone navigation component. Can be used independently or is integrated into Header component.

---

### MobileMenu
**Path:** `src/components/layout/MobileMenu.astro`

```astro
<MobileMenu currentLang="ja" currentPath="/careers" />
```

**Props:**
- `currentLang: string` - Current language code
- `currentPath: string` - Current URL path

**Features:**
- Full-screen overlay
- Expandable sections
- Close button
- Smooth animations
- Prevents body scroll

**Note:** Integrated into Header component for mobile devices.

---

## Sanity Queries

### Settings Queries
**Path:** `src/sanity/queries/settings.ts`

```typescript
import {
  getSiteSettings,
  getNavigation,
  getFooterContent,
  getSEOSettings
} from '../sanity/queries/settings';

// Fetch site settings
const settings = await getSiteSettings('ja');

// Fetch navigation menu
const nav = await getNavigation('en');

// Fetch footer content
const footer = await getFooterContent('vi');

// Fetch SEO defaults
const seo = await getSEOSettings('ko');
```

**Functions:**
- `getSiteSettings(lang)` - Global site settings
- `getNavigation(lang)` - Menu structure
- `getFooterContent(lang)` - Footer links and content
- `getSEOSettings(lang)` - Default SEO values

---

### Pages Queries
**Path:** `src/sanity/queries/pages.ts`

```typescript
import {
  getHomepage,
  getAboutUsPage,
  getBusinessPage,
  getCareersPage,
  getPageBySlug,
  getAllPageSlugs
} from '../sanity/queries/pages';

// Fetch homepage
const home = await getHomepage('ja');

// Fetch about us page
const ceoMessage = await getAboutUsPage('ceo-message', 'en');

// Fetch business page
const pms = await getBusinessPage('pms', 'ja');

// Fetch careers page
const jobs = await getCareersPage('job-opportunities', 'ko');

// Fetch any page by slug
const page = await getPageBySlug('privacy-policy', 'vi');

// Get all slugs for static generation
const slugs = await getAllPageSlugs('businessPage');
```

**Functions:**
- `getHomepage(lang)` - Homepage with hero and sections
- `getAboutUsPage(slug, lang)` - About us pages
- `getBusinessPage(slug, lang)` - Business pages
- `getCareersPage(slug, lang)` - Career pages
- `getPageBySlug(slug, lang)` - Generic page
- `getAllPageSlugs(pageType?)` - All page slugs for SSG

---

## CSS Variables

Available globally via `var(--variable-name)`:

```css
/* Colors */
--primary-text-color: #444444
--primary-header-color: #2c2c2c
--background-color-lightblue: #F7FAFD

/* Shadows */
--primary-box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1)
--primary-box-shadow-inset: inset 0 0.4rem 1.5rem 0 rgba(0, 0, 0, 0.1)

/* Borders */
--primary-border: 1px solid #eee
--border-linear: linear-gradient(270deg, #FFFFFF 0%, #E3E3E3 51.39%, #FFFFFF 100%)

/* Brand */
--brand-color-gradient: linear-gradient(311.56deg, #EE8768 0%, #EE8768 27.3%, #EAB65A 100%)
```

---

## Utility Classes

Available globally:

```css
/* Container */
.container - Max-width container (1140px) with padding

/* Layout */
.content-center - Flex center (both axes)
.content-left - Flex align left
.align-left - Text align left

/* Text */
.gradient-text - Brand gradient text effect

/* Body States */
.disable-scroll - Prevents body scroll (for modals)
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 991.98px) { }

/* Desktop */
@media (min-width: 992px) { }
```

---

## Best Practices

### Component Usage
1. Always provide alt text for images
2. Use semantic HTML elements
3. Include proper TypeScript types for props
4. Test all responsive breakpoints
5. Ensure multi-language support where applicable

### Performance
1. Use Sanity image optimization: `urlFor(image).width(800).format('webp')`
2. Lazy load images when appropriate
3. Minimize client-side JavaScript
4. Leverage Astro's static site generation

### Accessibility
1. Include ARIA labels on interactive elements
2. Ensure keyboard navigation works
3. Use proper heading hierarchy
4. Maintain color contrast ratios
5. Test with screen readers

### Styling
1. Use CSS variables for consistent theming
2. Scope styles to components
3. Follow mobile-first approach
4. Use rem units for sizing
5. Maintain design system consistency

---

## Common Patterns

### Full Page Example
```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import SEO from '../components/common/SEO.astro';
import Banner from '../components/common/Banner.astro';
import Card from '../components/common/Card.astro';
import Button from '../components/common/Button.astro';

const lang = 'ja';
const title = 'Our Services';
---

<PageLayout lang={lang} title={title}>
  <SEO
    title={title}
    description="Explore our hotel technology solutions"
    lang={lang}
  />

  <Banner
    title="Our Services"
    subtitle="Comprehensive hotel technology solutions"
    backgroundImage="/images/services-hero.jpg"
    overlay={true}
    height="50rem"
  />

  <section class="container" style="padding: 6rem 1.5rem;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr)); gap: 3rem;">
      <Card
        title="PMS"
        description="Property Management System"
        image="/images/pms.jpg"
        ctaText="Learn More"
        ctaHref="/business/pms"
      />
      <Card
        title="Booking Engine"
        description="Direct booking solution"
        image="/images/booking.jpg"
        ctaText="Learn More"
        ctaHref="/business/hotel-web"
      />
      <Card
        title="CMS"
        description="Content Management System"
        image="/images/cms.jpg"
        ctaText="Learn More"
        ctaHref="/business/cms"
      />
    </div>
  </section>
</PageLayout>
```

### Fetching Sanity Data
```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import { getBusinessPage } from '../sanity/queries/pages';
import { urlFor } from '../sanity/client';

const { slug } = Astro.params;
const lang = 'ja';
const page = await getBusinessPage(slug, lang);

if (!page) {
  return Astro.redirect('/404');
}
---

<PageLayout lang={lang} title={page.title}>
  <h1>{page.title}</h1>
  <p>{page.description}</p>

  {page.features?.map((feature) => (
    <div>
      <img src={urlFor(feature.image).width(400).url()} alt={feature.title} />
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  ))}
</PageLayout>
```

---

**Last Updated:** March 26, 2026
