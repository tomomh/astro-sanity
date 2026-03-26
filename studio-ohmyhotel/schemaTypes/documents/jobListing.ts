import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const jobListing = defineType({
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => {
          const titleArray = doc.title as Array<{value: string; _key: string}>
          return titleArray?.find((t) => t._key === 'en')?.value || ''
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Engineering', value: 'engineering'},
          {title: 'Design', value: 'design'},
          {title: 'Sales', value: 'sales'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Operations', value: 'operations'},
          {title: 'HR', value: 'hr'},
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'fulltime'},
          {title: 'Part-time', value: 'parttime'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url',
      description: 'External link to apply for this job',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this job listing currently active?',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      isActive: 'isActive',
    },
    prepare({title, department, isActive}) {
      const displayTitle = title?.[0]?.value || 'Untitled Job'
      return {
        title: displayTitle,
        subtitle: `${department || 'No department'} ${isActive ? '✓' : '(Inactive)'}`,
      }
    },
  },
})
