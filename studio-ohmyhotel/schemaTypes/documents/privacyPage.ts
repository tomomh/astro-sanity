import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy Policy Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bannerTitle',
      title: 'Banner Title',
      type: 'internationalizedArrayString',
      description: 'Title shown in the page banner (can include HTML like <br/>)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Privacy Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'privacySection',
          title: 'Privacy Section',
          fields: [
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'internationalizedArrayString',
              description: 'Optional title for this section',
            }),
            defineField({
              name: 'content',
              title: 'Section Content',
              type: 'internationalizedArrayText',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isHtml',
              title: 'Contains HTML',
              type: 'boolean',
              description: 'If true, content will be rendered as HTML (for lists, etc.)',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({title}) {
              return {
                title: title?.[0]?.value || 'Introduction',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'internationalizedArrayText',
      description: 'Contact information shown at the bottom (can include HTML)',
      validation: (Rule) => Rule.required(),
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
      lastUpdated: 'lastUpdated',
    },
    prepare({language, lastUpdated}) {
      return {
        title: `Privacy Policy${language ? ` (${language})` : ''}`,
        subtitle: lastUpdated ? new Date(lastUpdated).toLocaleDateString() : '',
      }
    },
  },
})
