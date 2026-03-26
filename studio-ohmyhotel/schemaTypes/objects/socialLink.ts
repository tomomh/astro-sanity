import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Twitter', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'GitHub', value: 'github'},
          {title: 'Naver Blog', value: 'naver'},
          {title: 'Kakao', value: 'kakao'},
          {title: 'Notion', value: 'notion'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'icon',
      title: 'Custom Icon',
      type: 'image',
      description: 'Optional custom icon (leave empty to use default platform icon)',
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({platform, url}) {
      return {
        title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Social Link',
        subtitle: url,
      }
    },
  },
})
