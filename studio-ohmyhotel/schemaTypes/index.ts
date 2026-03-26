// Objects
import {seo} from './objects/seo'
import {banner} from './objects/banner'
import {cta} from './objects/cta'
import {socialLink} from './objects/socialLink'
import {menuItem} from './objects/menuItem'

// Blocks
import {simpleBlockContent} from './blocks/simpleBlockContent'
import {richBlockContent} from './blocks/richBlockContent'

// Documents
import {locale} from './documents/locale'
import {siteSettings} from './documents/siteSettings'
import {navigation} from './documents/navigation'
import {homePage} from './documents/homePage'
import {aboutUsPage} from './documents/aboutUsPage'
import {businessPage} from './documents/businessPage'
import {product} from './documents/product'
import {careersPage} from './documents/careersPage'
import {jobListing} from './documents/jobListing'
import {privacyPage} from './documents/privacyPage'

export const schemaTypes = [
  // Objects (must be first for reference)
  seo,
  banner,
  cta,
  socialLink,
  menuItem,

  // Blocks
  simpleBlockContent,
  richBlockContent,

  // Documents
  locale,
  siteSettings,
  navigation,
  homePage,
  aboutUsPage,
  businessPage,
  product,
  careersPage,
  jobListing,
  privacyPage,
]
