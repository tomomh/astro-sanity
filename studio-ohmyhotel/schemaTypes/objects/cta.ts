import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Link', value: 'internal'},
          {title: 'External URL', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      to: [
        {type: 'homePage'},
        {type: 'aboutUsPage'},
        {type: 'businessPage'},
        {type: 'product'},
        {type: 'careersPage'},
        {type: 'privacyPage'},
      ],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      linkType: 'linkType',
    },
    prepare({label, linkType}) {
      return {
        title: label?.[0]?.value || 'CTA',
        subtitle: linkType === 'internal' ? 'Internal Link' : 'External URL',
      }
    },
  },
})
