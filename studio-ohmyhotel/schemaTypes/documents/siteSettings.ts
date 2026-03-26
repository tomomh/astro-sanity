import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Used in meta tags and as fallback',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main logo (dark version)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoWhite',
      title: 'Logo White',
      type: 'image',
      description: 'White/light logo for dark backgrounds',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Browser tab icon (recommended: 32x32px or 64x64px)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) =>
        Rule.email().error('Must be a valid email address'),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'contactFax',
      title: 'Contact Fax',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'internationalizedArrayText',
      description: 'Company address',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'internationalizedArrayText',
      description: 'Copyright text or additional footer information',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Navigation Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'aboutUs',
          title: 'About Us Label',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'business',
          title: 'Business Label',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'careers',
          title: 'Careers Label',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'location',
          title: 'Location Label',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'contactUs',
          title: 'Contact Us Label',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'privacy',
          title: 'Privacy Policy Label',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})
