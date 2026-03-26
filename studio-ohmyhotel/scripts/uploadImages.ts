/**
 * Script to upload images from astro-ohmyhotel/public/images to Sanity CDN
 *
 * Usage: npx tsx scripts/uploadImages.ts
 *
 * Requires SANITY_API_TOKEN environment variable with write access
 */

import {createClient} from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const projectId = 'i7q7u7k8'
const dataset = 'production'

// Create Sanity client - requires token with write access
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-29',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Set this environment variable
})

// Path to images directory
const imagesDir = path.resolve(__dirname, '../../astro-ohmyhotel/public/images')
const outputFile = path.resolve(__dirname, '../imageMapping.json')

// Supported image extensions
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp']

interface ImageMapping {
  [localPath: string]: {
    _type: 'image'
    asset: {
      _type: 'reference'
      _ref: string
    }
    originalPath: string
    uploadedAt: string
  }
}

async function getAllImageFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files: string[] = []
  const entries = fs.readdirSync(dir, {withFileTypes: true})

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getAllImageFiles(fullPath, baseDir))
    } else if (imageExtensions.includes(path.extname(entry.name).toLowerCase())) {
      // Get relative path from images directory
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')
      files.push(relativePath)
    }
  }

  return files
}

async function uploadImage(relativePath: string): Promise<{assetId: string; url: string} | null> {
  const fullPath = path.join(imagesDir, relativePath)

  try {
    const fileBuffer = fs.readFileSync(fullPath)
    const filename = path.basename(relativePath)

    console.log(`Uploading: ${relativePath}`)

    const asset = await client.assets.upload('image', fileBuffer, {
      filename,
      // Use relative path as label for easy identification
      label: relativePath,
    })

    console.log(`  ✓ Uploaded: ${asset._id}`)
    return {
      assetId: asset._id,
      url: asset.url,
    }
  } catch (error) {
    console.error(`  ✗ Failed to upload ${relativePath}:`, error)
    return null
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required')
    console.error('Create a token at: https://www.sanity.io/manage/project/i7q7u7k8/api#tokens')
    process.exit(1)
  }

  console.log('Scanning for images in:', imagesDir)
  const imageFiles = await getAllImageFiles(imagesDir)
  console.log(`Found ${imageFiles.length} images\n`)

  // Load existing mapping if exists
  let mapping: ImageMapping = {}
  if (fs.existsSync(outputFile)) {
    try {
      mapping = JSON.parse(fs.readFileSync(outputFile, 'utf-8'))
      console.log(`Loaded existing mapping with ${Object.keys(mapping).length} entries\n`)
    } catch (e) {
      console.log('Starting fresh mapping\n')
    }
  }

  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const relativePath of imageFiles) {
    // Skip if already uploaded
    if (mapping[relativePath]) {
      console.log(`Skipping (already uploaded): ${relativePath}`)
      skipped++
      continue
    }

    const result = await uploadImage(relativePath)

    if (result) {
      mapping[relativePath] = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: result.assetId,
        },
        originalPath: `/images/${relativePath}`,
        uploadedAt: new Date().toISOString(),
      }
      uploaded++

      // Save mapping after each successful upload
      fs.writeFileSync(outputFile, JSON.stringify(mapping, null, 2))
    } else {
      failed++
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log('\n--- Upload Summary ---')
  console.log(`Total images: ${imageFiles.length}`)
  console.log(`Uploaded: ${uploaded}`)
  console.log(`Skipped (already uploaded): ${skipped}`)
  console.log(`Failed: ${failed}`)
  console.log(`\nMapping saved to: ${outputFile}`)
}

main().catch(console.error)
