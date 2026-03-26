/**
 * Migration script to convert internationalized array fields from v4 to v5 format
 *
 * v4 format: { _key: "en", value: "..." }
 * v5 format: { _key: "unique-key", language: "en", value: "..." }
 */

import {createClient} from '@sanity/client'
import {v4 as uuidv4} from 'uuid'

const client = createClient({
  projectId: 'i7q7u7k8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Need write token
})

const SUPPORTED_LANGUAGES = ['en', 'ja', 'ko', 'vi']

// Check if array item is v4 format (language stored in _key)
function isV4Format(item: any): boolean {
  return item && typeof item._key === 'string' && SUPPORTED_LANGUAGES.includes(item._key) && !item.language
}

// Convert v4 item to v5 format
function convertToV5(item: any): any {
  if (!isV4Format(item)) return item

  return {
    _key: uuidv4().slice(0, 12),
    language: item._key,
    value: item.value,
  }
}

// Recursively convert all internationalized arrays in an object
function migrateObject(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj

  if (Array.isArray(obj)) {
    // Check if this is an internationalized array (all items have language _key)
    const isInternationalizedArray = obj.length > 0 && obj.every(item => isV4Format(item))

    if (isInternationalizedArray) {
      return obj.map(convertToV5)
    }

    // Otherwise, recursively process array items
    return obj.map(item => migrateObject(item))
  }

  // Process object properties
  const result: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('_')) {
      result[key] = value // Keep system fields as-is
    } else {
      result[key] = migrateObject(value)
    }
  }
  return result
}

async function migrate() {
  console.log('Starting v4 to v5 migration for internationalized arrays...\n')

  // Document types that use internationalized arrays
  const documentTypes = [
    'homePage',
    'aboutUsPage',
    'businessPage',
    'careersPage',
    'privacyPage',
    'product',
    'jobListing',
    'siteSettings',
    'navigation',
  ]

  for (const docType of documentTypes) {
    console.log(`Processing ${docType}...`)

    const documents = await client.fetch(`*[_type == "${docType}"]`)

    for (const doc of documents) {
      const migratedDoc = migrateObject(doc)

      // Check if anything changed
      if (JSON.stringify(doc) !== JSON.stringify(migratedDoc)) {
        console.log(`  Migrating: ${doc._id}`)

        // Create patch
        const patch: any = {}
        for (const [key, value] of Object.entries(migratedDoc)) {
          if (!key.startsWith('_') && JSON.stringify(doc[key]) !== JSON.stringify(value)) {
            patch[key] = value
          }
        }

        if (Object.keys(patch).length > 0) {
          await client.patch(doc._id).set(patch).commit()
          console.log(`    ✓ Updated ${Object.keys(patch).length} fields`)
        }
      } else {
        console.log(`  Skipping: ${doc._id} (already v5 format)`)
      }
    }
  }

  console.log('\nMigration complete!')
}

migrate().catch(console.error)
