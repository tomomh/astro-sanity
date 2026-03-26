import { defineQuery } from 'groq'

// Helper to get localized value from internationalized array
export function getLocalizedValue(
  field: Array<{ _key: string; value: string }> | undefined,
  lang: string,
  fallbackLang = 'en'
): string {
  if (!field) return ''
  const localized = field.find((f) => f._key === lang)
  if (localized?.value) return localized.value
  const fallback = field.find((f) => f._key === fallbackLang)
  return fallback?.value || ''
}

// Site Settings
export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0] {
    title,
    logo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    logoWhite {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    favicon,
    socialLinks[] {
      _key,
      platform,
      url
    },
    contactEmail,
    contactPhone,
    footerText
  }
`)

// Navigation
export const NAVIGATION_QUERY = defineQuery(/* groq */ `
  *[_type == "navigation"][0] {
    title,
    mainMenu[] {
      _key,
      title,
      linkType,
      internalLink->{
        _type,
        slug,
        "pageSlug": slug.current
      },
      externalUrl,
      submenu[] {
        _key,
        title,
        linkType,
        internalLink->{
          _type,
          slug,
          "pageSlug": slug.current
        },
        externalUrl
      }
    },
    footerMenu[] {
      _key,
      title,
      linkType,
      internalLink->{
        _type,
        slug,
        "pageSlug": slug.current
      },
      externalUrl
    }
  }
`)

// Locales
export const LOCALES_QUERY = defineQuery(/* groq */ `
  *[_type == "locale"] | order(name asc) {
    _id,
    name,
    tag,
    "isDefault": default
  }
`)

// Home Page
export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homePage"][0] {
    heroTitle1,
    heroTitle2,
    heroImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    twoThingsTitle,
    twoThingsSubtitle,
    twoThingsItems[] {
      _key,
      title,
      description,
      image {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      }
    },
    allInOneTitle,
    allInOneSubtitle,
    allInOneImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    allInOneFeatures[] {
      _key,
      title,
      icon {
        asset->{ _id, url }
      }
    },
    simpleTitle,
    simpleDescription,
    simpleImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    friendTitle,
    friendDescription,
    friendImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    friendCta {
      text,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalUrl
    },
    seo
  }
`)

// About Us Page
export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "aboutUsPage"][0] {
    banner {
      title,
      subtitle,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      },
      overlay
    },
    ceoTitle,
    ceoMessage,
    ceoName,
    ceoImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    ceoSignature {
      asset->{ _id, url }
    },
    visionTitle,
    visionItems[] {
      _key,
      title,
      description,
      icon {
        asset->{ _id, url }
      }
    },
    historyTitle,
    historyTimeline[] {
      _key,
      year,
      month,
      event
    },
    ciTitle,
    ciDescription,
    ciLogo {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    brandColors[] {
      _key,
      name,
      hex
    },
    locationTitle,
    offices[] {
      _key,
      name,
      address,
      phone,
      email,
      mapEmbed,
      image {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      }
    },
    seo
  }
`)

// Business Page
export const BUSINESS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "businessPage"][0] {
    banner {
      title,
      subtitle,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      },
      overlay
    },
    introTitle,
    introDescription,
    productCategories[] {
      _key,
      title,
      description,
      products[]->{
        _id,
        name,
        slug,
        title,
        subtitle,
        icon {
          asset->{ _id, url }
        },
        shortDescription
      }
    },
    featuredProducts[]->{
      _id,
      name,
      slug,
      title,
      subtitle,
      icon {
        asset->{ _id, url }
      },
      shortDescription,
      productImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      }
    },
    seo
  }
`)

// Product by Slug
export const PRODUCT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    title,
    subtitle,
    icon {
      asset->{ _id, url }
    },
    banner {
      title,
      subtitle,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      },
      overlay
    },
    shortDescription,
    fullDescription,
    productImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    features[] {
      _key,
      title,
      description,
      icon {
        asset->{ _id, url }
      },
      image {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      }
    },
    screenshots[] {
      _key,
      caption,
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
    partners[] {
      _key,
      name,
      logo {
        asset->{ _id, url }
      },
      url
    },
    cta {
      text,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalUrl
    },
    seo
  }
`)

// All Products (for static paths)
export const ALL_PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "product"] {
    _id,
    name,
    "slug": slug.current
  }
`)

// Careers Page
export const CAREERS_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "careersPage"][0] {
    banner {
      title,
      subtitle,
      backgroundImage {
        asset->{
          _id,
          url,
          metadata { lqip, dimensions }
        }
      },
      overlay
    },
    introTitle,
    introDescription,
    desiredTraitsTitle,
    desiredTraits[] {
      _key,
      title,
      description,
      icon {
        asset->{ _id, url }
      }
    },
    benefitsTitle,
    benefits[] {
      _key,
      title,
      description,
      icon {
        asset->{ _id, url }
      }
    },
    jobOpportunitiesCta {
      text,
      linkType,
      internalLink->{
        _type,
        slug
      },
      externalUrl
    },
    seo
  }
`)

// Job Listings
export const JOB_LISTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "jobListing" && isActive == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    department,
    location,
    employmentType,
    description,
    applicationUrl,
    publishedAt
  }
`)

// Privacy Page
export const PRIVACY_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "privacyPage"][0] {
    pageTitle,
    bannerTitle,
    sections[] {
      _key,
      title,
      content,
      isHtml
    },
    contactInfo,
    seo
  }
`)
