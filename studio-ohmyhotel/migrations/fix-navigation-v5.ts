/**
 * Fix Navigation document: v4 to v5 format + convert external URLs to internal links
 *
 * Usage: npx tsx migrations/fix-navigation-v5.ts
 */

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'i7q7u7k8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

const LANG_CODES = ['en', 'ja', 'ko', 'vi']

// Add language field to internationalized array items
function migrateI18nArray(arr: any[]): any[] {
  return arr.map(item => {
    if (item && typeof item === 'object' && LANG_CODES.includes(item._key) && !item.language) {
      return {
        ...item,
        language: item._key,
      }
    }
    return item
  })
}

// Process menu item - fix title and submenu
function processMenuItem(item: any): any {
  const result = { ...item }

  // Fix title array
  if (Array.isArray(result.title)) {
    result.title = migrateI18nArray(result.title)
  }

  // Fix linkType and externalUrl - convert to "none" since these are relative paths
  // The frontend uses hardcoded URLs anyway, so we just clear the invalid external URLs
  if (result.linkType === 'external' && result.externalUrl && !result.externalUrl.startsWith('http')) {
    // Clear the invalid external URL
    delete result.externalUrl
    result.linkType = 'none'
  }

  // Process submenu items recursively
  if (Array.isArray(result.submenu)) {
    result.submenu = result.submenu.map((subItem: any) => {
      const processed = { ...subItem }

      // Fix submenu item title
      if (Array.isArray(processed.title)) {
        processed.title = migrateI18nArray(processed.title)
      }

      // Fix submenu external URLs
      if (processed.linkType === 'external' && processed.externalUrl && !processed.externalUrl.startsWith('http')) {
        delete processed.externalUrl
        processed.linkType = 'none'
      }

      return processed
    })
  }

  return result
}

async function main() {
  console.log('Fetching Navigation document...')

  const query = `*[_type == "navigation"][0]`
  const doc = await client.fetch(query)

  if (!doc) {
    console.log('No Navigation document found')
    return
  }

  console.log(`Found: ${doc._id} - ${doc.title}`)

  // Process the document
  const migrated = {
    ...doc,
    mainMenu: doc.mainMenu?.map(processMenuItem) || [],
    footerMenu: doc.footerMenu?.map(processMenuItem) || [],
  }

  // Check if document changed
  const original = JSON.stringify(doc)
  const updated = JSON.stringify(migrated)

  if (original === updated) {
    console.log('No changes needed')
    return
  }

  console.log('\nChanges detected. Updating document...')

  try {
    await client.createOrReplace(migrated)
    console.log('✓ Navigation document updated successfully')
  } catch (error) {
    console.error(`✗ Error updating: ${error}`)
  }
}

main().catch(console.error)
