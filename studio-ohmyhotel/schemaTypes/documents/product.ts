import {PackageIcon} from '@sanity/icons'
import {defineField, defineType, defineArrayMember} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  groups: [
    {name: 'basic', title: 'Basic Info'},
    {name: 'details', title: 'Details'},
    {name: 'features', title: 'Features'},
    {name: 'gallery', title: 'Gallery'},
    {name: 'partners', title: 'Partners'},
    {name: 'downloads', title: 'Downloads'},
    {name: 'contact', title: 'Contact Form'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'internationalizedArrayString',
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'internationalizedArrayString',
      group: 'basic',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'internationalizedArrayString',
      group: 'basic',
    }),
    defineField({
      name: 'icon',
      title: 'Product Icon',
      type: 'image',
      group: 'basic',
    }),
    defineField({
      name: 'banner',
      title: 'Product Banner',
      type: 'banner',
      group: 'basic',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'internationalizedArrayText',
      group: 'details',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'internationalizedArrayText',
      group: 'details',
    }),
    defineField({
      name: 'productImage',
      title: 'Main Product Image',
      type: 'image',
      group: 'details',
      options: {hotspot: true},
    }),
    defineField({
      name: 'features',
      title: 'Product Features',
      type: 'array',
      group: 'features',
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
              name: 'description',
              title: 'Feature Description',
              type: 'internationalizedArrayText',
            }),
            defineField({
              name: 'icon',
              title: 'Feature Icon',
              type: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      group: 'gallery',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'internationalizedArrayString',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partners / Clients',
      type: 'array',
      group: 'partners',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Partner Name',
              type: 'string',
            }),
            defineField({
              name: 'logo',
              title: 'Partner Logo',
              type: 'image',
            }),
            defineField({
              name: 'url',
              title: 'Website URL',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
      group: 'details',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloadable Files',
      type: 'array',
      group: 'downloads',
      description: 'PDF documents or other files for download (e.g., Company Profile)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Download Title',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'internationalizedArrayText',
            }),
            defineField({
              name: 'file',
              title: 'File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip',
              },
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
    defineField({
      name: 'showContactForm',
      title: 'Show Contact Form',
      type: 'boolean',
      group: 'contact',
      initialValue: true,
      description: 'Display contact form at the bottom of the page',
    }),
    defineField({
      name: 'contactFormTitle',
      title: 'Contact Form Title',
      type: 'internationalizedArrayString',
      group: 'contact',
    }),
    defineField({
      name: 'contactFormDescription',
      title: 'Contact Form Description',
      type: 'internationalizedArrayText',
      group: 'contact',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      media: 'icon',
    },
    prepare({name, media}) {
      // Extract the English value from internationalized array, or first available
      const title = Array.isArray(name)
        ? name.find((item: {_key: string; value: string}) => item._key === 'en')?.value ||
          name[0]?.value ||
          'Untitled'
        : name || 'Untitled'
      return {
        title,
        media,
      }
    },
  },
})
