import { sanityClient } from './sanity';

// Home Page Query
export const homePageQuery = `*[_type == "homePage"][0]{
  heroTitle1,
  heroTitle2,
  heroImage,
  twoThingsTitle,
  twoThingsSubtitle,
  twoThingsItems[]{
    _key,
    title,
    description,
    image
  },
  allInOneTitle,
  allInOneSubtitle,
  allInOneImage,
  allInOneFeatures[]{
    _key,
    title,
    icon
  },
  simpleTitle,
  simpleDescription,
  simpleImage,
  friendTitle,
  friendDescription,
  friendImage,
  friendSlogans[]{
    _key,
    icon,
    title,
    content
  },
  friendCta
}`;

// About Us Page Query
export const aboutUsPageQuery = `*[_type == "aboutUsPage"][0]{
  banner,
  ceoMessage{
    greeting,
    title,
    content,
    ceoName,
    ceoTitle,
    ceoImage,
    ceoSignature
  },
  vision{
    title,
    slogan,
    image,
    items[]{
      _key,
      title,
      description
    }
  },
  history[]{
    _key,
    year,
    month,
    flag,
    event,
    lastOfYear
  },
  corporateIdentity{
    intro,
    introTitle,
    introImages{
      mainLogo,
      secondaryLogo,
      aiDownloadUrl,
      jpgDownloadUrl
    },
    colorSystem{
      description,
      colors[]{
        _key,
        name,
        type,
        hex,
        rgb,
        cmyk,
        pantone,
        gradientColors
      }
    },
    signatureDescription,
    signatures[]{
      _key,
      backgroundColor,
      image1,
      image2
    }
  },
  locations[]{
    _key,
    flag,
    name,
    address,
    phone,
    fax,
    email,
    image
  }
}`;

// Careers Page Query
export const careersPageQuery = `*[_type == "careersPage"][0]{
  banner,
  desiredTraits{
    title,
    description,
    traits[]{
      _key,
      title,
      description,
      icon
    }
  },
  jobOpportunitiesTitle,
  jobOpportunitiesDescription
}`;

// Job Listings Query
export const jobListingsQuery = `*[_type == "jobListing"] | order(publishedAt desc){
  _id,
  title,
  department,
  location,
  flag,
  employmentType,
  description,
  requirements,
  applicationUrl,
  isActive,
  slug
}`;

// Product Query
export const productQuery = (slug: string) => `*[_type == "product" && slug.current == "${slug}"][0]{
  name,
  title,
  subtitle,
  slug,
  icon,
  banner,
  shortDescription,
  fullDescription,
  productImage,
  features[]{
    _key,
    title,
    description,
    icon,
    image
  },
  screenshots[]{
    _key,
    asset,
    caption
  },
  partners[]{
    _key,
    name,
    logo,
    url
  },
  downloads[]{
    _key,
    title,
    description,
    file,
    icon
  },
  showContactForm,
  contactFormTitle,
  contactFormDescription,
  cta
}`;

// Products List Query
export const productsListQuery = `*[_type == "product"] | order(_createdAt asc){
  _id,
  name,
  title,
  slug,
  shortDescription,
  icon
}`;

// Site Settings Query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  logo,
  logoWhite,
  logoGray,
  footerLinks{
    aboutUs,
    business,
    careers,
    location,
    contactUs,
    privacy
  },
  footerIcons{
    location,
    phone,
    fax
  },
  address,
  contactEmail,
  contactPhone,
  contactFax,
  socialLinks[]{
    _key,
    platform,
    url,
    icon
  },
  footerText
}`;

// Fetch functions
export async function fetchHomePage() {
  return sanityClient.fetch(homePageQuery);
}

export async function fetchAboutUsPage() {
  return sanityClient.fetch(aboutUsPageQuery);
}

export async function fetchCareersPage() {
  return sanityClient.fetch(careersPageQuery);
}

export async function fetchJobListings() {
  return sanityClient.fetch(jobListingsQuery);
}

export async function fetchProduct(slug: string) {
  return sanityClient.fetch(productQuery(slug));
}

export async function fetchProductsList() {
  return sanityClient.fetch(productsListQuery);
}

export async function fetchSiteSettings() {
  return sanityClient.fetch(siteSettingsQuery);
}
