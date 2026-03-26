/**
 * Script to update Sanity documents with uploaded image references
 *
 * Usage: npx tsx scripts/updateDocumentImages.ts
 *
 * Requires SANITY_API_TOKEN environment variable with write access
 */

import {createClient} from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const projectId = 'i7q7u7k8'
const dataset = 'production'

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-29',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Load image mapping
const mappingFile = path.resolve(__dirname, '../imageMapping.json')
const imageMapping: Record<string, {
  _type: 'image',
  asset: { _type: 'reference', _ref: string },
  originalPath: string,
}> = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'))

// Helper to get image reference by original path
function getImageRef(imagePath: string) {
  // Convert /images/xxx to xxx format
  const key = imagePath.replace(/^\/images\//, '')
  const mapping = imageMapping[key]

  if (!mapping) {
    console.warn(`Image not found in mapping: ${imagePath}`)
    return null
  }

  return {
    _type: 'image' as const,
    asset: mapping.asset,
  }
}

async function updateHomePage() {
  console.log('\n--- Updating Home Page ---')

  const homePageId = 'homePage'

  // Check if document exists
  const existing = await client.fetch(`*[_type == "homePage"][0]._id`)
  if (!existing) {
    console.log('Home page document not found, skipping...')
    return
  }

  const updates: Record<string, any> = {}

  // Hero image
  const heroImage = getImageRef('/images/home/banner-2-2026.jpg')
  if (heroImage) updates.heroImage = heroImage

  // All In One image
  const allInOneImage = getImageRef('/images/home/all-in-one.svg')
  if (allInOneImage) updates.allInOneImage = allInOneImage

  // Simple & Intuitive image
  const simpleImage = getImageRef('/images/home/simple.svg')
  if (simpleImage) updates.simpleImage = simpleImage

  // Friend & Confidant image
  const friendImage = getImageRef('/images/home/friend.svg')
  if (friendImage) updates.friendImage = friendImage

  if (Object.keys(updates).length > 0) {
    await client.patch(existing).set(updates).commit()
    console.log(`Updated home page with ${Object.keys(updates).length} images`)
  } else {
    console.log('No images to update for home page')
  }
}

async function updateAboutUsPage() {
  console.log('\n--- Updating About Us Page ---')

  // About Us uses document internationalization, so we need to find all language variants
  const aboutPages = await client.fetch(`*[_type == "aboutUsPage"]{ _id, language }`)

  if (aboutPages.length === 0) {
    console.log('About Us page documents not found, skipping...')
    return
  }

  for (const page of aboutPages) {
    const updates: Record<string, any> = {}

    // CEO Image
    const ceoImage = getImageRef('/images/about/img-ceo-2026.png')
    if (ceoImage) updates['ceoMessage.ceoImage'] = ceoImage

    // CEO Signature
    const ceoSignature = getImageRef('/images/about/sign.svg')
    if (ceoSignature) updates['ceoMessage.ceoSignature'] = ceoSignature

    // Vision image
    const visionImage = getImageRef('/images/about/vision.svg')
    if (visionImage) updates['vision.image'] = visionImage

    // Banner image
    const bannerImage = getImageRef('/images/about/about-banner.jpg')
    if (bannerImage) updates['banner.image'] = bannerImage

    if (Object.keys(updates).length > 0) {
      await client.patch(page._id).set(updates).commit()
      console.log(`Updated about page (${page.language || 'default'}) with ${Object.keys(updates).length} images`)
    }
  }
}

async function updateProducts() {
  console.log('\n--- Updating Products ---')

  const products = await client.fetch(`*[_type == "product"]{ _id, slug }`)

  if (products.length === 0) {
    console.log('No product documents found, skipping...')
    return
  }

  // Product image mappings
  const productImages: Record<string, { banner?: string, logo?: string, screenshots?: string[] }> = {
    'ota': {
      banner: '/images/business/OTA/ota-banner.jpg',
      logo: '/images/business/OTA/ota-logo.svg',
    },
    'pms': {
      banner: '/images/business/PMS/pms-banner.jpg',
      logo: '/images/business/PMS/pms-logo.svg',
    },
    'cms': {
      banner: '/images/business/CMS/cms-banner.jpg',
      logo: '/images/business/CMS/cms.svg',
    },
    'be': {
      banner: '/images/business/BE/booking.jpg',
      logo: '/images/business/BE/booking.svg',
    },
    'hm': {
      banner: '/images/business/HM/hm-banner.jpg',
      logo: '/images/business/HM/hm-logo.svg',
    },
    'omtbiz': {
      banner: '/images/business/OMTBIZ/omtbiz-banner.jpg',
    },
    'cp': {
      banner: '/images/business/CP/cp-banner.jpg',
    },
  }

  for (const product of products) {
    const slug = product.slug?.current || ''
    const images = productImages[slug.toLowerCase()]

    if (!images) continue

    const updates: Record<string, any> = {}

    if (images.banner) {
      const bannerImg = getImageRef(images.banner)
      if (bannerImg) updates['banner.image'] = bannerImg
    }

    if (images.logo) {
      const logoImg = getImageRef(images.logo)
      if (logoImg) updates.logo = logoImg
    }

    if (Object.keys(updates).length > 0) {
      await client.patch(product._id).set(updates).commit()
      console.log(`Updated product ${slug} with ${Object.keys(updates).length} images`)
    }
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN environment variable is required')
    process.exit(1)
  }

  console.log('Updating Sanity documents with image references...\n')

  try {
    await updateHomePage()
    await updateAboutUsPage()
    await updateProducts()

    console.log('\n--- Done! ---')
  } catch (error) {
    console.error('Error updating documents:', error)
    process.exit(1)
  }
}

main()
