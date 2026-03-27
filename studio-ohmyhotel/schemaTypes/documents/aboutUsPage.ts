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
          name: 'greeting',
          title: 'Greeting',
          type: 'internationalizedArrayString',
          description: 'The opening greeting message (e.g., "Thank you for visiting...")',
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
          name: 'slogan',
          title: 'Slogan',
          type: 'internationalizedArrayString',
          description: 'Text displayed on top of the vision image (e.g., "Your Friend and Confidant")',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'items',
          title: 'Vision Items',
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
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: 'title',
                },
                prepare({title}) {
                  return {
                    title: title?.[0]?.value || 'Vision Item',
                  }
                },
              },
            },
          ],
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
              description: 'Leave empty if same year as previous entry',
            }),
            defineField({
              name: 'month',
              title: 'Month',
              type: 'string',
              description: 'Optional month (e.g., "01", "12")',
            }),
            defineField({
              name: 'flag',
              title: 'Flag/Country',
              type: 'string',
              options: {
                list: [
                  {title: 'International', value: 'international'},
                  {title: 'Korea', value: 'ko'},
                  {title: 'Japan', value: 'ja'},
                  {title: 'Vietnam', value: 'vi'},
                  {title: 'Singapore', value: 'singapore'},
                  {title: 'Taiwan', value: 'taiwan'},
                ],
              },
            }),
            defineField({
              name: 'event',
              title: 'Event',
              type: 'internationalizedArrayString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'lastOfYear',
              title: 'Last entry of this year?',
              type: 'boolean',
              description: 'Check if this is the last event for this year (adds visual separator)',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              year: 'year',
              month: 'month',
              event: 'event',
            },
            prepare({year, month, event}) {
              const dateStr = [year, month].filter(Boolean).join('/');
              return {
                title: dateStr || 'History Entry',
                subtitle: event?.[0]?.value || '',
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
          name: 'introTitle',
          title: 'Introduction Title',
          type: 'internationalizedArrayString',
          description: 'Title above the introduction text',
        }),
        defineField({
          name: 'introImages',
          title: 'CI Intro Images',
          type: 'object',
          fields: [
            defineField({
              name: 'mainLogo',
              title: 'Main Logo Image',
              type: 'image',
            }),
            defineField({
              name: 'secondaryLogo',
              title: 'Secondary Logo Image',
              type: 'image',
            }),
            defineField({
              name: 'aiDownloadUrl',
              title: 'AI Download URL',
              type: 'url',
            }),
            defineField({
              name: 'jpgDownloadUrl',
              title: 'JPG Download URL',
              type: 'url',
            }),
          ],
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
                      name: 'type',
                      title: 'Color Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Solid Color', value: 'solid'},
                          {title: 'Gradient', value: 'gradient'},
                        ],
                      },
                      initialValue: 'solid',
                    }),
                    defineField({
                      name: 'hex',
                      title: 'HEX Code',
                      type: 'string',
                      description: 'For solid colors',
                    }),
                    defineField({
                      name: 'rgb',
                      title: 'RGB',
                      type: 'string',
                    }),
                    defineField({
                      name: 'cmyk',
                      title: 'CMYK',
                      type: 'string',
                    }),
                    defineField({
                      name: 'pantone',
                      title: 'Pantone',
                      type: 'string',
                    }),
                    defineField({
                      name: 'gradientColors',
                      title: 'Gradient Colors',
                      type: 'string',
                      description: 'CSS gradient (e.g., "linear-gradient(90deg, #BD1819 0%, #F1C400 100%)")',
                    }),
                  ],
                  preview: {
                    select: {
                      name: 'name',
                      hex: 'hex',
                    },
                    prepare({name, hex}) {
                      return {
                        title: name || 'Color',
                        subtitle: hex,
                      }
                    },
                  },
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'signatureDescription',
          title: 'Signature Section Description',
          type: 'internationalizedArrayText',
        }),
        defineField({
          name: 'signatures',
          title: 'Corporate Signatures',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'backgroundColor',
                  title: 'Background Color',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'White', value: 'white'},
                      {title: 'Cream', value: 'cream'},
                      {title: 'Orange', value: 'orange'},
                    ],
                  },
                }),
                defineField({
                  name: 'image1',
                  title: 'First Image',
                  type: 'image',
                }),
                defineField({
                  name: 'image2',
                  title: 'Second Image',
                  type: 'image',
                }),
              ],
              preview: {
                select: {
                  bg: 'backgroundColor',
                  media: 'image1',
                },
                prepare({bg, media}) {
                  return {
                    title: `Signature (${bg || 'default'})`,
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
      name: 'locations',
      title: 'Office Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'flag',
              title: 'Country Flag',
              type: 'string',
              options: {
                list: [
                  {title: 'Korea', value: 'ko'},
                  {title: 'Japan', value: 'ja'},
                  {title: 'Vietnam', value: 'vi'},
                  {title: 'Singapore', value: 'singapore'},
                  {title: 'International', value: 'international'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
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
              name: 'fax',
              title: 'Fax',
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
              flag: 'flag',
              media: 'image',
            },
            prepare({name, flag, media}) {
              return {
                title: name?.[0]?.value || 'Office',
                subtitle: flag,
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
