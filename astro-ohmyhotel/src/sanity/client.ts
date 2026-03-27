import { sanityClient } from 'sanity:client'
import { createImageUrlBuilder } from '@sanity/image-url'

export { sanityClient }

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
