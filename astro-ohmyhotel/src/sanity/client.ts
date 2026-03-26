import { sanityClient } from 'sanity:client'
import imageUrlBuilder from '@sanity/image-url'

export { sanityClient }

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}
