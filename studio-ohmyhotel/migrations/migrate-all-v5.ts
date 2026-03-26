/**
 * Migration script to update ALL documents from v4 to v5 internationalized-array format
 * This script migrates both published and draft documents
 *
 * Usage: npx tsx migrations/migrate-all-v5.ts
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'i7q7u7k8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

const DOCUMENT_TYPES = [
  'homePage',
  'careersPage',
  'aboutUsPage',
  'businessPage',
  'privacyPage',
  'product',
  'jobListing',
  'siteSettings',
  'navigation',
]

const LANG_CODES = ['en', 'ja', 'ko', 'vi']

interface ArrayItem {
  _key: string
  _type?: string
  language?: string
  value?: any
  [key: string]: any
}

function migrateArrayItem(item: ArrayItem): ArrayItem {
  // If item already has language field, skip
  if (item.language) {
    return item
  }

  // If _key is a language code, add language field
  if (LANG_CODES.includes(item._key)) {
    return {
      ...item,
      language: item._key,
    }
  }

  return item
}

function migrateValue(value: any): any {
  if (Array.isArray(value)) {
    return value.map(item => {
      if (item && typeof item === 'object') {
        // First migrate the item itself
        const migratedItem = migrateArrayItem(item)

        // Then recursively migrate nested values
        const result: any = {}
        for (const key of Object.keys(migratedItem)) {
          result[key] = migrateValue(migratedItem[key])
        }
        return result
      }
      return item
    })
  }

  if (value && typeof value === 'object' && !value._type?.startsWith('image')) {
    const result: any = {}
    for (const key of Object.keys(value)) {
      result[key] = migrateValue(value[key])
    }
    return result
  }

  return value
}

function migrateDocument(doc: any): any {
  const migrated: any = {}

  for (const key of Object.keys(doc)) {
    if (key.startsWith('_')) {
      migrated[key] = doc[key]
    } else {
      migrated[key] = migrateValue(doc[key])
    }
  }

  return migrated
}

async function main() {
  console.log('Fetching ALL documents (published + drafts)...')

  // Query for all documents of our types (both published and drafts)
  const query = `*[_type in $types]`
  const docs = await client.fetch(query, {types: DOCUMENT_TYPES})

  console.log(`Found ${docs.length} documents`)

  if (docs.length === 0) {
    console.log('No documents to migrate')
    return
  }

  let migratedCount = 0
  let skippedCount = 0

  for (const doc of docs) {
    const migrated = migrateDocument(doc)

    // Check if document changed
    const original = JSON.stringify(doc)
    const updated = JSON.stringify(migrated)

    if (original === updated) {
      skippedCount++
      continue
    }

    console.log(`\nMigrating: ${doc._id} (${doc._type})`)

    try {
      await client.createOrReplace(migrated)
      console.log('  ✓ Updated successfully')
      migratedCount++
    } catch (error) {
      console.error(`  ✗ Error updating: ${error}`)
    }
  }

  console.log(`\n========================================`)
  console.log(`Migration complete!`)
  console.log(`  Migrated: ${migratedCount}`)
  console.log(`  Skipped (no changes): ${skippedCount}`)
  console.log(`========================================`)
}

main().catch(console.error)
