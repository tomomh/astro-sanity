# Migration Plan: ohmyhotelnco-web to Astro + Sanity

## Overview

**Source:** React Website (`D:\Code\ohmyhotelnco-web`)
**Destination:** Astro + Sanity (`D:\Github\astro-sanity`)

### Decisions Made
- **Sanity Project ID:** `i7q7u7k8`
- **Design Approach:** Giữ nguyên design giống y hệt website gốc
- **Migration Strategy:** Full Migration - làm song song theo từng page

### Current Source Stack
- React 16.8.2 + React Router 4.3.1
- react-intl (4 languages: EN, JA, KO, VI)
- Bootstrap 4.3.1 + SCSS
- react-slick, react-reveal, react-parallax

### Target Stack
- Astro 6.0.8 (SSG/SSR)
- Sanity 5.18.0 (Headless CMS)
- Tailwind CSS 4.2.1
- astro-portabletext

---

## Phase 1: Infrastructure Setup

### 1.1 Unify Project IDs
**Issue:** Astro uses `xgztagdf`, Sanity Studio uses `i7q7u7k8`

**Action:**
- [ ] Choose one project ID for both
- [ ] Update `astro-ohmyhotel/astro.config.mjs`
- [ ] Update `studio-ohmyhotel/sanity.config.ts`
- [ ] Update `studio-ohmyhotel/sanity.cli.ts`

### 1.2 Setup Sanity TypeGen
- [ ] Configure `sanity.cli.ts` with typegen
- [ ] Add `sanity.types.ts` output path
- [ ] Update `tsconfig.json` in Astro project

---

## Phase 2: Sanity Schema Design

### 2.1 Core Document Types

#### Locale (for multilingual support)
```
locale
├── name (string)
├── tag (string: en, ja, ko, vi)
├── fallback (reference -> locale)
└── default (boolean)
```

#### Site Settings (singleton)
```
siteSettings
├── logo (image)
├── logoWhite (image)
├── socialLinks[]
│   ├── platform (string)
│   ├── url (url)
│   └── icon (image)
├── contactEmail (string)
└── footerText (internationalizedArray)
```

#### Navigation (singleton)
```
navigation
├── mainMenu[]
│   ├── title (internationalizedArray)
│   ├── link (reference | url)
│   └── submenu[]
│       ├── title (internationalizedArray)
│       └── link (reference | url)
└── footerMenu[]
```

### 2.2 Page Types

#### Home Page (localized singleton)
```
homePage
├── language (string - hidden)
├── heroBanner
│   ├── headline (internationalizedArray)
│   ├── subheadline (internationalizedArray)
│   └── backgroundImage (image)
├── sections[]
│   ├── twoThings (object)
│   ├── allInOne (object)
│   ├── simpleIntuitive (object)
│   └── friendConfidant (object)
└── seo (object)
```

#### About Us Page (localized singleton)
```
aboutUsPage
├── language (string)
├── banner (object)
├── ceoMessage
│   ├── title (internationalizedArray)
│   ├── content (portableText - localized)
│   ├── ceoName (string)
│   ├── ceoTitle (internationalizedArray)
│   └── ceoImage (image)
├── vision
│   ├── title (internationalizedArray)
│   ├── content (portableText)
│   └── image (image)
├── history[]
│   ├── year (string)
│   ├── title (internationalizedArray)
│   └── description (internationalizedArray)
├── corporateIdentity
│   ├── intro (portableText)
│   ├── colorSystem (object)
│   └── signatures (image[])
├── locations[]
│   ├── name (internationalizedArray)
│   ├── address (internationalizedArray)
│   ├── phone (string)
│   └── image (image)
└── seo (object)
```

#### Business Page (localized singleton)
```
businessPage
├── language (string)
├── banner (object)
├── intro (portableText)
└── seo (object)
```

#### Product Pages (document type)
```
product
├── slug (slug)
├── name (internationalizedArray)
├── shortName (string: OTA, PMS, CMS, BE, etc.)
├── tagline (internationalizedArray)
├── description (portableText - localized)
├── features[]
│   ├── title (internationalizedArray)
│   ├── description (internationalizedArray)
│   ├── icon (image)
│   └── image (image)
├── screenshots[]
│   ├── image (image)
│   └── caption (internationalizedArray)
├── partners[]
│   ├── name (string)
│   ├── logo (image)
│   └── category (string: hotel, service)
├── ctaForm
│   ├── title (internationalizedArray)
│   └── buttonText (internationalizedArray)
├── order (number)
└── seo (object)
```

**Products to create:**
1. OTA - Online Travel Agency
2. BE - Hotel Web/Booking Engine
3. PMS - Property Management System
4. CMS - Channel Manager System
5. CP - Company Profile
6. HM - Hotel Management
7. OMTBIZ
8. PARTNER
9. SYS-Sales-Channel
10. WOC

#### Careers Page (localized singleton)
```
careersPage
├── language (string)
├── banner (object)
├── desiredTraits
│   ├── title (internationalizedArray)
│   ├── description (internationalizedArray)
│   └── traits[]
│       ├── title (internationalizedArray)
│       ├── description (internationalizedArray)
│       └── icon (image)
├── jobOpportunities
│   ├── title (internationalizedArray)
│   └── description (internationalizedArray)
└── seo (object)
```

#### Job Listing (document type)
```
jobListing
├── title (internationalizedArray)
├── slug (slug)
├── department (string)
├── location (internationalizedArray)
├── type (string: full-time, part-time, contract)
├── description (portableText - localized)
├── requirements (portableText - localized)
├── benefits (portableText - localized)
├── isActive (boolean)
└── publishedAt (datetime)
```

#### Privacy Policy Page (localized singleton)
```
privacyPage
├── language (string)
├── banner (object)
├── content (portableText - localized)
├── lastUpdated (datetime)
└── seo (object)
```

### 2.3 Shared Objects

#### SEO Object
```
seo
├── title (internationalizedArray)
├── description (internationalizedArray)
├── ogImage (image)
└── noIndex (boolean)
```

#### Banner Object
```
banner
├── title (internationalizedArray)
├── subtitle (internationalizedArray)
├── backgroundImage (image)
└── overlay (boolean)
```

#### CTA Object
```
cta
├── label (internationalizedArray)
├── linkType (string: internal | external)
├── internalLink (reference)
└── externalUrl (url)
```

### 2.4 Schema File Structure
```
studio-ohmyhotel/schemaTypes/
├── index.ts
├── documents/
│   ├── locale.ts
│   ├── siteSettings.ts
│   ├── navigation.ts
│   ├── homePage.ts
│   ├── aboutUsPage.ts
│   ├── businessPage.ts
│   ├── product.ts
│   ├── careersPage.ts
│   ├── jobListing.ts
│   └── privacyPage.ts
├── objects/
│   ├── seo.ts
│   ├── banner.ts
│   ├── cta.ts
│   ├── socialLink.ts
│   └── menuItem.ts
├── blocks/
│   ├── simpleBlockContent.ts
│   └── richBlockContent.ts
└── shared/
    └── seoFields.ts
```

---

## Phase 3: Content Migration

### 3.1 Translation Files Migration
**Source:** `src/i18n/locales/{en,ja,ko,vi}.json`

**Action:**
- [ ] Parse JSON translation files
- [ ] Create locale documents in Sanity
- [ ] Map translation keys to schema fields
- [ ] Import content to respective document types

### 3.2 Images Migration
**Source:** `public/images/` (246 files, 137 MB)

**Action:**
- [ ] Organize images by category
- [ ] Upload to Sanity Media Library
- [ ] Map to respective schema fields
- [ ] Add alt text from translations

**Image Categories:**
| Folder | Count | Purpose |
|--------|-------|---------|
| logo/ | 5 | SVG logos |
| home/ | ~20 | Homepage images |
| about/ | ~15 | About page images |
| business/BE/ | ~25 | Booking Engine |
| business/OTA/ | ~30 | OTA + partners |
| business/PMS/ | ~20 | PMS screenshots |
| business/CMS/ | ~20 | CMS screenshots |
| business/CP/ | ~30 | Company Profile (multi-lang) |
| business/HM/ | ~15 | Hotel Management |
| career/ | ~10 | Career page |
| flags/ | 4 | Language flags |
| icons/ | ~20 | UI icons |

### 3.3 Content Import Script
- [ ] Create Node.js migration script
- [ ] Use Sanity mutation API
- [ ] Handle image uploads
- [ ] Map translations to fields

---

## Phase 4: Astro Components & Pages

### 4.1 Component Structure
```
astro-ohmyhotel/src/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   └── MobileMenu.astro
│   ├── common/
│   │   ├── Button.astro
│   │   ├── Banner.astro
│   │   ├── Card.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── SEO.astro
│   ├── home/
│   │   ├── HeroBanner.astro
│   │   ├── TwoThings.astro
│   │   ├── AllInOne.astro
│   │   ├── SimpleIntuitive.astro
│   │   └── FriendConfidant.astro
│   ├── about/
│   │   ├── CEOMessage.astro
│   │   ├── Vision.astro
│   │   ├── History.astro
│   │   ├── CorporateIdentity.astro
│   │   └── Location.astro
│   ├── business/
│   │   ├── ProductCard.astro
│   │   ├── ProductFeature.astro
│   │   ├── ProductScreenshots.astro
│   │   ├── PartnerLogos.astro
│   │   └── ContactForm.astro
│   ├── careers/
│   │   ├── DesiredTraits.astro
│   │   ├── JobList.astro
│   │   └── JobCard.astro
│   └── portable-text/
│       └── CustomComponents.astro
├── layouts/
│   ├── BaseLayout.astro
│   └── PageLayout.astro
└── pages/
    └── [lang]/
        ├── index.astro
        ├── about-us/
        │   ├── index.astro
        │   ├── ceo-message.astro
        │   ├── vision.astro
        │   ├── history.astro
        │   ├── ci.astro
        │   └── location.astro
        ├── business/
        │   ├── index.astro
        │   └── [slug].astro
        ├── careers/
        │   ├── index.astro
        │   ├── desired-traits.astro
        │   └── job-opportunities.astro
        └── privacy-policy.astro
```

### 4.2 Page Routing (i18n)
**URL Structure:**
- `/en/` - English homepage
- `/ja/` - Japanese homepage
- `/ko/` - Korean homepage
- `/vi/` - Vietnamese homepage
- `/en/about-us/ceo-message`
- `/en/business/ota`
- etc.

### 4.3 Component Migration Mapping

| React Component | Astro Component |
|-----------------|-----------------|
| Header/index.js | layout/Header.astro |
| Footer/index.js | layout/Footer.astro |
| SubMenu/index.js | layout/Navigation.astro |
| HomeBanner.js | home/HeroBanner.astro |
| HomeTwoThings.js | home/TwoThings.astro |
| HomeAllInOne.js | home/AllInOne.astro |
| HomeSimpleIntuitive.js | home/SimpleIntuitive.astro |
| HomeYourFriendConfidant.js | home/FriendConfidant.astro |
| CEOMessage/index.js | about/CEOMessage.astro |
| Vision/index.js | about/Vision.astro |
| History/index.js | about/History.astro |
| CI/*.js | about/CorporateIdentity.astro |
| Location/index.js | about/Location.astro |
| BE/*.js | business/ProductFeature.astro |
| OTA/*.js | business/ProductFeature.astro |
| PMS/*.js | business/ProductFeature.astro |
| CMS/*.js | business/ProductFeature.astro |
| DesiredTraits/index.js | careers/DesiredTraits.astro |
| JobOpportunities/index.js | careers/JobList.astro |
| PrivacyContent.js | (Portable Text render) |

---

## Phase 5: Styling Migration

### 5.1 Color Palette (from _variables.scss)
Convert SCSS variables to Tailwind CSS custom properties:

```css
/* global.css */
@theme {
  --color-primary: #ff6600;
  --color-secondary: #333333;
  --color-accent: #0066cc;
  /* ... extract from _variables.scss */
}
```

### 5.2 Typography
- [ ] Extract font-face declarations
- [ ] Configure Tailwind typography
- [ ] Add custom GOTHIC fonts

### 5.3 Responsive Breakpoints
| SCSS | Tailwind |
|------|----------|
| 576px | sm |
| 768px | md |
| 992px | lg |
| 1200px | xl |

### 5.4 Animation Migration
- [ ] react-reveal -> Astro View Transitions / CSS animations
- [ ] react-parallax -> CSS parallax or vanilla JS
- [ ] react-slick -> Swiper or CSS scroll-snap

---

## Phase 6: i18n Implementation

### 6.1 Astro i18n Setup
- [ ] Install and configure `astro-i18n` or custom solution
- [ ] Create `[lang]` dynamic routes
- [ ] Setup language detection middleware
- [ ] Create LanguageSwitcher component

### 6.2 Sanity Localization
- [ ] Configure `sanity-plugin-internationalized-array`
- [ ] Create locale documents
- [ ] Setup document-level localization for pages

### 6.3 GROQ Queries with Locale
```groq
// Get localized content
*[_type == "homePage" && language == $locale][0]{
  heroBanner {
    headline[_key == $locale][0].value,
    subheadline[_key == $locale][0].value,
    backgroundImage
  }
}
```

---

## Phase 7: Utilities & Helpers

### 7.1 Sanity Client Setup
```
astro-ohmyhotel/src/sanity/
├── client.ts
├── queries/
│   ├── settings.ts
│   ├── navigation.ts
│   ├── pages.ts
│   └── products.ts
├── fragments/
│   ├── image.ts
│   └── seo.ts
└── utils/
    ├── imageUrl.ts
    └── portableText.ts
```

### 7.2 Image Optimization
- [ ] Setup @sanity/image-url
- [ ] Create image helper functions
- [ ] Configure responsive image generation

---

## Phase 8: Testing & QA

### 8.1 Content Verification
- [ ] All 4 languages display correctly
- [ ] All images load properly
- [ ] Navigation works across all pages
- [ ] Forms function correctly

### 8.2 Design Comparison
- [ ] Visual regression testing
- [ ] Responsive design check
- [ ] Animation/transition verification
- [ ] Cross-browser testing

### 8.3 Performance
- [ ] Lighthouse audit
- [ ] Image optimization
- [ ] Code splitting
- [ ] CDN configuration

---

## Detailed Task Checklist

### Setup (Est. Tasks: 10)
- [ ] Unify Sanity project IDs
- [ ] Configure Sanity TypeGen
- [ ] Setup Astro i18n routing
- [ ] Configure Tailwind CSS theme
- [ ] Setup image optimization
- [ ] Configure ESLint/Prettier
- [ ] Setup development environment
- [ ] Create project documentation
- [ ] Setup Git branching strategy
- [ ] Configure deployment pipeline

### Sanity Schema (Est. Tasks: 25)
- [ ] Create locale schema
- [ ] Create siteSettings schema
- [ ] Create navigation schema
- [ ] Create homePage schema
- [ ] Create aboutUsPage schema
- [ ] Create businessPage schema
- [ ] Create product schema
- [ ] Create careersPage schema
- [ ] Create jobListing schema
- [ ] Create privacyPage schema
- [ ] Create seo object schema
- [ ] Create banner object schema
- [ ] Create cta object schema
- [ ] Create socialLink object schema
- [ ] Create menuItem object schema
- [ ] Create simpleBlockContent schema
- [ ] Create richBlockContent schema
- [ ] Setup internationalized-array plugin
- [ ] Configure document-internationalization plugin
- [ ] Setup Studio structure
- [ ] Configure preview
- [ ] Add validation rules
- [ ] Test all schemas
- [ ] Deploy schema to Sanity
- [ ] Document schema structure

### Content Migration (Est. Tasks: 15)
- [ ] Create migration script
- [ ] Parse EN translations
- [ ] Parse JA translations
- [ ] Parse KO translations
- [ ] Parse VI translations
- [ ] Upload logo images
- [ ] Upload home page images
- [ ] Upload about page images
- [ ] Upload business images (all products)
- [ ] Upload career images
- [ ] Create locale documents
- [ ] Import homepage content
- [ ] Import about us content
- [ ] Import business/product content
- [ ] Import careers content
- [ ] Import privacy policy content
- [ ] Verify all content imported

### Astro Components (Est. Tasks: 35)
- [ ] Create BaseLayout
- [ ] Create PageLayout
- [ ] Create Header component
- [ ] Create Footer component
- [ ] Create Navigation component
- [ ] Create MobileMenu component
- [ ] Create Button component
- [ ] Create Banner component
- [ ] Create Card component
- [ ] Create LanguageSwitcher
- [ ] Create SEO component
- [ ] Create HeroBanner (home)
- [ ] Create TwoThings (home)
- [ ] Create AllInOne (home)
- [ ] Create SimpleIntuitive (home)
- [ ] Create FriendConfidant (home)
- [ ] Create CEOMessage (about)
- [ ] Create Vision (about)
- [ ] Create History (about)
- [ ] Create CorporateIdentity (about)
- [ ] Create Location (about)
- [ ] Create ProductCard (business)
- [ ] Create ProductFeature (business)
- [ ] Create ProductScreenshots (business)
- [ ] Create PartnerLogos (business)
- [ ] Create ContactForm (business)
- [ ] Create DesiredTraits (careers)
- [ ] Create JobList (careers)
- [ ] Create JobCard (careers)
- [ ] Create PortableText custom components
- [ ] Setup page templates
- [ ] Create 404 page
- [ ] Create loading states
- [ ] Create error boundaries
- [ ] Test all components

### Pages (Est. Tasks: 20)
- [ ] Create homepage ([lang]/index.astro)
- [ ] Create about-us index
- [ ] Create ceo-message page
- [ ] Create vision page
- [ ] Create history page
- [ ] Create ci page
- [ ] Create location page
- [ ] Create business index
- [ ] Create product dynamic page ([slug].astro)
- [ ] Create careers index
- [ ] Create desired-traits page
- [ ] Create job-opportunities page
- [ ] Create privacy-policy page
- [ ] Setup language routing
- [ ] Setup redirects
- [ ] Create sitemap
- [ ] Setup RSS feed
- [ ] Test all pages
- [ ] Test language switching
- [ ] Test navigation

### Styling (Est. Tasks: 12)
- [ ] Extract color palette
- [ ] Setup Tailwind theme
- [ ] Configure typography
- [ ] Add custom fonts
- [ ] Create utility classes
- [ ] Style Header/Footer
- [ ] Style navigation
- [ ] Create animation utilities
- [ ] Implement parallax effects
- [ ] Style forms
- [ ] Responsive testing
- [ ] Dark mode (optional)

### Testing & Launch (Est. Tasks: 10)
- [ ] Content verification (all languages)
- [ ] Visual regression testing
- [ ] Cross-browser testing
- [ ] Performance audit
- [ ] SEO audit
- [ ] Accessibility audit
- [ ] Security review
- [ ] Load testing
- [ ] Final QA
- [ ] Production deployment

---

## Summary

| Phase | Tasks | Priority |
|-------|-------|----------|
| Infrastructure Setup | 10 | High |
| Sanity Schema | 25 | High |
| Content Migration | 17 | High |
| Astro Components | 35 | High |
| Pages | 20 | High |
| Styling | 12 | Medium |
| Testing & Launch | 10 | High |
| **Total** | **129** | - |

---

## Notes

1. **Localization Strategy:** Using field-level localization (`internationalizedArray`) for most content, combined with document-level for page singletons where needed.

2. **Image Strategy:** All images will be uploaded to Sanity's CDN for automatic optimization and responsive delivery.

3. **Design System:** Migrating from Bootstrap to Tailwind CSS requires careful attention to maintain visual consistency.

4. **Progressive Enhancement:** Astro's islands architecture allows for interactive components where needed while keeping most content static.

5. **SEO:** Each page will have proper meta tags, structured data, and language alternates for multilingual SEO.
