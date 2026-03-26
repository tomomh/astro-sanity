import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const businessPage = defineType({
  name: 'businessPage',
  title: 'Business Page',
  type: 'document',
  icon: CaseIcon,
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
      name: 'intro',
      title: 'Introduction',
      type: 'internationalizedArraySimpleBlockContent',
    }),
    defineField({
      name: 'productsTitle',
      title: 'Products Section Title',
      type: 'internationalizedArrayString',
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
        title: `Business Page${language ? ` (${language})` : ''}`,
      }
    },
  },
})
