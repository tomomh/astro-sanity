import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const careersPage = defineType({
  name: 'careersPage',
  title: 'Careers Page',
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
      name: 'desiredTraits',
      title: 'Desired Traits Section',
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
          type: 'internationalizedArraySimpleBlockContent',
        }),
        defineField({
          name: 'traits',
          title: 'Traits',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'internationalizedArrayString',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'internationalizedArrayText',
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'image',
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'icon',
                },
                prepare({title, media}) {
                  return {
                    title: title?.[0]?.value || 'Trait',
                    media,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'jobOpportunities',
      title: 'Job Opportunities Section',
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
          type: 'internationalizedArraySimpleBlockContent',
        }),
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
        title: `Careers Page${language ? ` (${language})` : ''}`,
      }
    },
  },
})
