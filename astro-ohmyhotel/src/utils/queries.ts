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
    title,
    content,
    ceoName,
    ceoTitle,
    ceoImage,
    ceoSignature
  },
  vision{
    title,
    content,
    image
  },
  history[]{
    _key,
    year,
    title,
    description
  },
  corporateIdentity{
    intro,
    colorSystem{
      description,
      colors[]{
        _key,
        name,
        hex,
        rgb,
        pantone
      }
    },
    signatures[]
  },
  locations[]{
    _key,
    name,
    address,
    phone,
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
  employmentType,
  description,
  requirements,
  slug
}`;

// Product Query
export const productQuery = (slug: string) => `*[_type == "product" && slug.current == "${slug}"][0]{
  title,
  subtitle,
  slug,
  banner,
  logo,
  shortDescription,
  description,
  features[]{
    _key,
    title,
    description,
    icon
  },
  screenshots[],
  cta
}`;

// Products List Query
export const productsListQuery = `*[_type == "product"] | order(order asc){
  _id,
  title,
  slug,
  shortDescription,
  logo
}`;

// Site Settings Query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteName,
  footerLinks{
    aboutUs,
    business,
    careers,
    location,
    contactUs,
    privacy
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
