import {TranslateIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const locale = defineType({
  name: 'locale',
  title: 'Locale',
  type: 'document',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Display name of the language (e.g., "English", "日本語")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Language Tag',
      type: 'string',
      description: 'Language tag (e.g., en, ja, ko, vi)',
      validation: (Rule) =>
        Rule.required().custom((tag) => {
          if (!tag) return true
          if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(tag)) {
            return 'Must be a valid language tag (e.g., en, ja, ko, vi)'
          }
          return true
        }),
    }),
    defineField({
      name: 'fallback',
      title: 'Fallback Language',
      type: 'reference',
      to: [{type: 'locale'}],
      description: 'Language to use if translation is missing',
    }),
    defineField({
      name: 'default',
      title: 'Default Language',
      type: 'boolean',
      description: 'Set as the default language for the site',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      tag: 'tag',
      isDefault: 'default',
    },
    prepare({name, tag, isDefault}) {
      return {
        title: name,
        subtitle: `${tag}${isDefault ? ' (Default)' : ''}`,
      }
    },
  },
})
