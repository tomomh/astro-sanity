import {defineMigration, at, setIfMissing} from 'sanity/migrate'

const INTERNATIONALIZED_ARRAY_TYPES = [
  'internationalizedArrayString',
  'internationalizedArrayText',
  'internationalizedArraySimpleBlockContent',
  'internationalizedArrayRichBlockContent',
]

export default defineMigration({
  title: 'Migrate internationalized arrays to v5 format',
  documentTypes: ['homePage', 'careersPage', 'aboutUsPage', 'businessPage', 'privacyPage', 'product', 'jobListing', 'siteSettings', 'navigation'],

  migrate: {
    document(doc) {
      const patches: ReturnType<typeof at>[] = []

      function processValue(value: any, path: string) {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item && typeof item === 'object' && item._key && !item.language) {
              // Check if this looks like an internationalized array item
              // It has _key that matches a language code (en, ja, ko, vi)
              const langCodes = ['en', 'ja', 'ko', 'vi']
              if (langCodes.includes(item._key)) {
                patches.push(
                  at(`${path}[${index}]`, setIfMissing('language', item._key))
                )
              }
            }
            // Recursively check nested objects
            if (item && typeof item === 'object') {
              Object.keys(item).forEach(key => {
                if (key !== '_key' && key !== '_type') {
                  processValue(item[key], `${path}[${index}].${key}`)
                }
              })
            }
          })
        } else if (value && typeof value === 'object') {
          Object.keys(value).forEach(key => {
            processValue(value[key], `${path}.${key}`)
          })
        }
      }

      // Process all fields in the document
      Object.keys(doc).forEach(key => {
        if (!key.startsWith('_')) {
          processValue(doc[key], key)
        }
      })

      return patches
    }
  }
})
