import type { Field } from 'payload'

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Meta Title',
        admin: { description: 'Recommended: 50–60 characters' },
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta Description',
        admin: { description: 'Recommended: 120–160 characters' },
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Open Graph Image',
        admin: { description: 'Recommended: 1200×630 px' },
      },
      {
        name: 'noIndex',
        type: 'checkbox',
        label: 'Hide from search engines (noindex)',
        defaultValue: false,
      },
    ],
  },
]
