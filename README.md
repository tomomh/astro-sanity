# OHMYHOTEL & CO - Corporate Website

A multilingual corporate website built with **Astro** frontend and **Sanity CMS** backend.

## Project Structure

```
astro-sanity/
├── astro-ohmyhotel/     # Astro frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── layouts/     # Page layouts
│   │   ├── pages/       # Route pages
│   │   └── utils/       # Helper functions (i18n, queries, sanity)
│   └── public/          # Static assets
│
└── studio-ohmyhotel/    # Sanity Studio (CMS)
    └── schemaTypes/     # Content schemas
        ├── documents/   # Document types (pages, products, jobs)
        └── objects/     # Reusable object types (banner, seo, cta)
```

## Features

- **Multilingual Support**: English, Japanese, Korean, Vietnamese
- **Sanity CMS**: Headless content management with real-time editing
- **Astro SSR**: Server-side rendering with Node.js adapter
- **Tailwind CSS**: Utility-first styling

## Prerequisites

- Node.js >= 22.12.0
- npm or yarn

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd astro-sanity

# Install Astro frontend dependencies
cd astro-ohmyhotel
npm install

# Install Sanity Studio dependencies
cd ../studio-ohmyhotel
npm install
```

### 2. Environment Setup

Create `.env` file in `astro-ohmyhotel/`:

```env
PUBLIC_SANITY_PROJECT_ID=i7q7u7k8
PUBLIC_SANITY_DATASET=production
```

### 3. Run Development Servers

**Terminal 1 - Sanity Studio:**
```bash
cd studio-ohmyhotel
npm run dev
# Opens at http://localhost:3333
```

**Terminal 2 - Astro Frontend:**
```bash
cd astro-ohmyhotel
npm run dev
# Opens at http://localhost:4321
```

## Internationalization (i18n)

### Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `ja` | Japanese |
| `ko` | Korean |
| `vi` | Vietnamese |

### URL Structure

- Default (English): `/` or `/en/`
- Japanese: `/ja/`
- Korean: `/ko/`
- Vietnamese: `/vi/`

### Adding Content Translations

In Sanity Studio, internationalized fields show language tabs. Fill in content for each language:

1. Open a document in Sanity Studio
2. Click on language tabs (EN, JA, KO, VI)
3. Enter content for each language
4. Publish the document

### Using i18n in Code

```typescript
import { getLangFromUrl, getLocalizedValue } from '../utils/i18n';

// Get current language from URL
const lang = getLangFromUrl(Astro.url);

// Get localized value from Sanity data
const title = getLocalizedValue(document.title, lang);
```

## Content Types

### Pages
- **Home Page** - Landing page with hero, features
- **About Us** - Company info, CEO message, history, vision
- **Business** - Products/services listing
- **Careers** - Job listings, desired traits
- **Privacy Policy** - Legal content

### Documents
- **Product** - Business products/services
- **Job Listing** - Career opportunities
- **Navigation** - Site navigation structure

## Scripts

### Astro Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Sanity Studio
```bash
npm run dev      # Start Studio locally
npm run build    # Build Studio for deployment
npm run deploy   # Deploy Studio to Sanity cloud
```

## Deployment

### Astro (Vercel/Netlify)
```bash
cd astro-ohmyhotel
npm run build
```

### Sanity Studio
```bash
cd studio-ohmyhotel
npm run deploy
```

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity + Astro Integration](https://www.sanity.io/plugins/sanity-astro)
