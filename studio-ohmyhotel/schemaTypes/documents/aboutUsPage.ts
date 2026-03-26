import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const aboutUsPage = defineType({
  name: 'aboutUsPage',
  title: 'About Us Page',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'banner',
      title: 'Banner',
      type: 'banner',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ceoMessage',
      title: 'CEO Message',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'internationalizedArraySimpleBlockContent',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ceoName',
          title: 'CEO Name',
          type: 'string',
        }),
        defineField({
          name: 'ceoTitle',
          title: 'CEO Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'ceoImage',
          title: 'CEO Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'ceoSignature',
          title: 'CEO Signature',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'internationalizedArraySimpleBlockContent',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'history',
      title: 'Company History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
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
          ],
          preview: {
            select: {
              year: 'year',
              title: 'title',
            },
            prepare({year, title}) {
              return {
                title: year,
                subtitle: title?.[0]?.value || '',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'corporateIdentity',
      title: 'Corporate Identity (CI)',
      type: 'object',
      fields: [
        defineField({
          name: 'intro',
          title: 'Introduction',
          type: 'internationalizedArraySimpleBlockContent',
        }),
        defineField({
          name: 'colorSystem',
          title: 'Color System',
          type: 'object',
          fields: [
            defineField({
              name: 'description',
              title: 'Description',
              type: 'internationalizedArrayText',
            }),
            defineField({
              name: 'colors',
              title: 'Colors',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'hex',
                      title: 'HEX Code',
                      type: 'string',
                    }),
                    defineField({
                      name: 'rgb',
                      title: 'RGB',
                      type: 'string',
                    }),
                    defineField({
                      name: 'pantone',
                      title: 'Pantone',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'signatures',
          title: 'Corporate Signatures',
          type: 'array',
          of: [
            {
              type: 'image',
              fields: [
                defineField({
                  name: 'caption',
                  title: 'Caption',
                  type: 'internationalizedArrayString',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Office Name',
              type: 'internationalizedArrayString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'address',
              title: 'Address',
              type: 'internationalizedArrayText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'phone',
              title: 'Phone',
              type: 'string',
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              name: 'name',
              media: 'image',
            },
            prepare({name, media}) {
              return {
                title: name?.[0]?.value || 'Office',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      language: 'language',
    },
    prepare({language}) {
      return {
        title: `About Us Page${language ? ` (${language})` : ''}`,
      }
    },
  },
})
