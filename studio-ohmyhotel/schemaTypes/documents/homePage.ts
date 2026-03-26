import {HomeIcon} from '@sanity/icons'
import {defineField, defineType, defineArrayMember} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'twoThings', title: 'Two Things Section'},
    {name: 'allInOne', title: 'All In One Section'},
    {name: 'simpleIntuitive', title: 'Simple & Intuitive'},
    {name: 'friendConfidant', title: 'Friend & Confidant'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Hero Section
    defineField({
      name: 'heroTitle1',
      title: 'Hero Title Line 1',
      type: 'internationalizedArrayString',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle2',
      title: 'Hero Title Line 2',
      type: 'internationalizedArrayString',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
    }),

    // Two Things Section
    defineField({
      name: 'twoThingsTitle',
      title: 'Section Title',
      type: 'internationalizedArrayString',
      group: 'twoThings',
    }),
    defineField({
      name: 'twoThingsSubtitle',
      title: 'Section Subtitle',
      type: 'internationalizedArrayText',
      group: 'twoThings',
    }),
    defineField({
      name: 'twoThingsItems',
      title: 'Two Things Items',
      type: 'array',
      group: 'twoThings',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'internationalizedArrayText',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),

    // All In One Section
    defineField({
      name: 'allInOneTitle',
      title: 'Section Title',
      type: 'internationalizedArrayString',
      group: 'allInOne',
    }),
    defineField({
      name: 'allInOneSubtitle',
      title: 'Section Subtitle',
      type: 'internationalizedArrayText',
      group: 'allInOne',
    }),
    defineField({
      name: 'allInOneImage',
      title: 'Section Image',
      type: 'image',
      group: 'allInOne',
      options: {hotspot: true},
    }),
    defineField({
      name: 'allInOneFeatures',
      title: 'Features',
      type: 'array',
      group: 'allInOne',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
          ],
        }),
      ],
    }),

    // Simple & Intuitive Section
    defineField({
      name: 'simpleTitle',
      title: 'Section Title',
      type: 'internationalizedArrayString',
      group: 'simpleIntuitive',
    }),
    defineField({
      name: 'simpleDescription',
      title: 'Section Description',
      type: 'internationalizedArrayText',
      group: 'simpleIntuitive',
    }),
    defineField({
      name: 'simpleImage',
      title: 'Section Image',
      type: 'image',
      group: 'simpleIntuitive',
      options: {hotspot: true},
    }),

    // Friend & Confidant Section
    defineField({
      name: 'friendTitle',
      title: 'Section Title',
      type: 'internationalizedArrayString',
      group: 'friendConfidant',
    }),
    defineField({
      name: 'friendDescription',
      title: 'Section Description',
      type: 'internationalizedArrayText',
      group: 'friendConfidant',
    }),
    defineField({
      name: 'friendImage',
      title: 'Section Image',
      type: 'image',
      group: 'friendConfidant',
      options: {hotspot: true},
    }),
    defineField({
      name: 'friendSlogans',
      title: 'Slogans (Society, Technology, Happiness)',
      type: 'array',
      group: 'friendConfidant',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'internationalizedArrayText',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
            prepare({title, media}) {
              const enTitle = title?.find((t: any) => t._key === 'en')?.value || 'Slogan'
              return {
                title: enTitle,
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'friendCta',
      title: 'Call to Action',
      type: 'cta',
      group: 'friendConfidant',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
