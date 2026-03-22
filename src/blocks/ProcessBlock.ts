import type { Block } from 'payload'

export const ProcessBlock: Block = {
  slug: 'process',
  labels: { singular: 'Process / Steps', plural: 'Process / Steps' },
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
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 2,
      maxRows: 8,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Step Title' },
        { name: 'description', type: 'textarea', required: true, label: 'Description' },
      ],
    },
  ],
}
