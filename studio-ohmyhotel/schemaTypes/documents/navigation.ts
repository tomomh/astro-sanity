import {MenuIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal name for this navigation (not displayed on site)',
      initialValue: 'Main Navigation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainMenu',
      title: 'Main Menu',
      type: 'array',
      of: [{type: 'menuItem'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footerMenu',
      title: 'Footer Menu',
      type: 'array',
      of: [{type: 'menuItem'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
