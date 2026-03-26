import { sanityClient } from '../client';

/**
 * Site Settings Query
 * Fetches global site settings like site title, description, social links, etc.
 */
export async function getSiteSettings(lang: string = 'ja') {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    keywords,
    logo {
      asset-> {
        _id,
        url
      }
    },
    favicon {
      asset-> {
        _id,
        url
      }
    },
    socialLinks {
      facebook,
      instagram,
      linkedin,
      naverBlog,
      kakao,
      omtPartner
    },
    contactInfo {
      email,
      phone,
      fax,
      "address": address.${lang}
    },
    footerText
  }`;

  try {
    const settings = await sanityClient.fetch(query);
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

/**
 * Navigation Query
 * Fetches navigation menu structure with localized labels
 */
export async function getNavigation(lang: string = 'ja') {
  const query = `*[_type == "navigation"][0] {
    _id,
    mainMenu[] {
      _key,
      "label": label.${lang},
      "slug": slug.current,
      subMenu[] {
        _key,
        "label": label.${lang},
        "slug": slug.current,
        page-> {
          _id,
          "slug": slug.current
        }
      }
    }
  }`;

  try {
    const navigation = await sanityClient.fetch(query);
    return navigation;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
}

/**
 * Footer Content Query
 * Fetches footer-specific content and links
 */
export async function getFooterContent(lang: string = 'ja') {
  const query = `*[_type == "footer"][0] {
    _id,
    "copyrightText": copyrightText.${lang},
    links[] {
      _key,
      "label": label.${lang},
      "slug": slug.current,
      external,
      url
    },
    showFaxByLanguage[] {
      language,
      show
    }
  }`;

  try {
    const footer = await sanityClient.fetch(query);
    return footer;
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return null;
  }
}

/**
 * SEO Settings Query
 * Fetches default SEO settings for meta tags
 */
export async function getSEOSettings(lang: string = 'ja') {
  const query = `*[_type == "seoSettings"][0] {
    _id,
    "defaultTitle": defaultTitle.${lang},
    "defaultDescription": defaultDescription.${lang},
    defaultImage {
      asset-> {
        _id,
        url
      }
    },
    defaultKeywords,
    twitterHandle,
    ogType
  }`;

  try {
    const seoSettings = await sanityClient.fetch(query);
    return seoSettings;
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return null;
  }
}
