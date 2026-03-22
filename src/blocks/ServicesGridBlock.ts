import type { Block } from 'payload'

export const ServicesGridBlock: Block = {
  slug: 'services-grid',
  labels: { singular: 'Services Grid', plural: 'Services Grids' },
  fields: [
    {
      name: 'overline',
      type: 'text',
      label: 'Overline',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Grid columns',
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Services to display',
      admin: { description: 'Select which services appear in this grid' },
    },
  ],
}
