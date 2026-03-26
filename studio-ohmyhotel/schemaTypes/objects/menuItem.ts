import {MenuIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
          {title: 'No Link (Parent Menu)', value: 'none'},
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
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'submenu',
      title: 'Submenu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
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
              hidden: ({parent}) => parent?.linkType !== 'external',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({title}) {
              return {
                title: title?.[0]?.value || 'Submenu Item',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title?.[0]?.value || 'Menu Item',
      }
    },
  },
})
