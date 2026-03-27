import { sanityClient } from 'sanity:client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

// Image URL builder instance
const builder = createImageUrlBuilder(sanityClient);

/**
 * Generate optimized image URL from Sanity image asset
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get image URL with common options
 */
export function getImageUrl(
  source: SanityImageSource,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  }
) {
  let img = builder.image(source).auto('format');

  if (options?.width) img = img.width(options.width);
  if (options?.height) img = img.height(options.height);
  if (options?.quality) img = img.quality(options.quality);
  if (options?.format) img = img.format(options.format);

  return img.url();
}

/**
 * Helper to get localized value from internationalized array
 */
export function getLocalizedValue<T>(
  array: Array<{ language: string; value: T }> | undefined,
  lang: string,
  fallbackLang: string = 'en'
): T | undefined {
  if (!array || array.length === 0) return undefined;

  // Find exact match
  const exact = array.find(item => item.language === lang);
  if (exact) return exact.value;

  // Fallback to default language
  const fallback = array.find(item => item.language === fallbackLang);
  if (fallback) return fallback.value;

  // Return first available
  return array[0]?.value;
}

/**
 * Re-export sanity client for direct use
 */
export { sanityClient };
