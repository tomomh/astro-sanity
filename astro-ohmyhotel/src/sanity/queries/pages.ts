import { sanityClient } from '../client';

/**
 * Homepage Query
 * Fetches homepage content with all sections
 */
export async function getHomepage(lang: string = 'ja') {
  const query = `*[_type == "homepage"][0] {
    _id,
    "title": title.${lang},
    "description": description.${lang},
    seo {
      "title": title.${lang},
      "description": description.${lang},
      image {
        asset-> {
          _id,
          url
        }
      },
      keywords
    },
    hero {
      "title": title.${lang},
      "subtitle": subtitle.${lang},
      backgroundImage {
        asset-> {
          _id,
          url
        }
      },
      ctaText {
        ${lang}
      },
      ctaLink
    },
    sections[] {
      _key,
      _type,
      "title": title.${lang},
      "content": content.${lang},
      "description": description.${lang},
      image {
        asset-> {
          _id,
          url
        }
      },
      items[] {
        _key,
        "title": title.${lang},
        "description": description.${lang},
        image {
          asset-> {
            _id,
            url
          }
        },
        link
      }
    }
  }`;

  try {
    const homepage = await sanityClient.fetch(query);
    return homepage;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

/**
 * About Us Pages Query
 * Fetches all about us related pages (CEO Message, Vision, History, CI, Location)
 */
export async function getAboutUsPage(slug: string, lang: string = 'ja') {
  const query = `*[_type == "aboutUsPage" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title.${lang},
    "description": description.${lang},
    seo {
      "title": title.${lang},
      "description": description.${lang},
      image {
        asset-> {
          _id,
          url
        }
      },
      keywords
    },
    banner {
      "title": title.${lang},
      "subtitle": subtitle.${lang},
      backgroundImage {
        asset-> {
          _id,
          url
        }
      }
    },
    content[] {
      _key,
      _type,
      "heading": heading.${lang},
      "text": text.${lang},
      "content": content.${lang},
      image {
        asset-> {
          _id,
          url
        }
      },
      items[] {
        _key,
        "title": title.${lang},
        "description": description.${lang},
        "content": content.${lang},
        date,
        image {
          asset-> {
            _id,
            url
          }
        }
      }
    }
  }`;

  try {
    const page = await sanityClient.fetch(query, { slug });
    return page;
  } catch (error) {
    console.error(`Error fetching about us page (${slug}):`, error);
    return null;
  }
}

/**
 * Business Pages Query
 * Fetches business-related pages (OTA, Booking Engine, PMS, CMS, etc.)
 */
export async function getBusinessPage(slug: string, lang: string = 'ja') {
  const query = `*[_type == "businessPage" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title.${lang},
    "description": description.${lang},
    seo {
      "title": title.${lang},
      "description": description.${lang},
      image {
        asset-> {
          _id,
          url
        }
      },
      keywords
    },
    banner {
      "title": title.${lang},
      "subtitle": subtitle.${lang},
      backgroundImage {
        asset-> {
          _id,
          url
        }
      }
    },
    features[] {
      _key,
      "title": title.${lang},
      "description": description.${lang},
      icon {
        asset-> {
          _id,
          url
        }
      },
      image {
        asset-> {
          _id,
          url
        }
      }
    },
    content[] {
      _key,
      _type,
      "heading": heading.${lang},
      "text": text.${lang},
      "content": content.${lang},
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  }`;

  try {
    const page = await sanityClient.fetch(query, { slug });
    return page;
  } catch (error) {
    console.error(`Error fetching business page (${slug}):`, error);
    return null;
  }
}

/**
 * Careers Pages Query
 * Fetches career-related pages (Desired Traits, Job Opportunities)
 */
export async function getCareersPage(slug: string, lang: string = 'ja') {
  const query = `*[_type == "careersPage" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title.${lang},
    "description": description.${lang},
    seo {
      "title": title.${lang},
      "description": description.${lang},
      image {
        asset-> {
          _id,
          url
        }
      },
      keywords
    },
    banner {
      "title": title.${lang},
      "subtitle": subtitle.${lang},
      backgroundImage {
        asset-> {
          _id,
          url
        }
      }
    },
    content[] {
      _key,
      _type,
      "heading": heading.${lang},
      "text": text.${lang},
      "content": content.${lang},
      image {
        asset-> {
          _id,
          url
        }
      }
    },
    jobPostings[] -> {
      _id,
      "title": title.${lang},
      "description": description.${lang},
      "location": location.${lang},
      "type": type.${lang},
      "requirements": requirements[].${lang},
      "responsibilities": responsibilities[].${lang},
      postedDate,
      deadline
    }
  }`;

  try {
    const page = await sanityClient.fetch(query, { slug });
    return page;
  } catch (error) {
    console.error(`Error fetching careers page (${slug}):`, error);
    return null;
  }
}

/**
 * Generic Page Query
 * Fetches any generic page by slug
 */
export async function getPageBySlug(slug: string, lang: string = 'ja') {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    "title": title.${lang},
    "description": description.${lang},
    seo {
      "title": title.${lang},
      "description": description.${lang},
      image {
        asset-> {
          _id,
          url
        }
      },
      keywords
    },
    content[] {
      _key,
      _type,
      "heading": heading.${lang},
      "text": text.${lang},
      "content": content.${lang},
      image {
        asset-> {
          _id,
          url
        }
      }
    }
  }`;

  try {
    const page = await sanityClient.fetch(query, { slug });
    return page;
  } catch (error) {
    console.error(`Error fetching page (${slug}):`, error);
    return null;
  }
}

/**
 * Get All Page Slugs
 * Used for static site generation - gets all page slugs
 */
export async function getAllPageSlugs(pageType?: string) {
  const typeFilter = pageType ? `_type == "${pageType}"` : '_type in ["homepage", "aboutUsPage", "businessPage", "careersPage", "page"]';

  const query = `*[${typeFilter}] {
    _type,
    "slug": slug.current
  }`;

  try {
    const slugs = await sanityClient.fetch(query);
    return slugs;
  } catch (error) {
    console.error('Error fetching page slugs:', error);
    return [];
  }
}
