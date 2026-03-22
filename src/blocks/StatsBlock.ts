import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats / Trust Indicators', plural: 'Stats / Trust Indicators' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (optional)',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Stats',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value (e.g. "200+")' },
        { name: 'label', type: 'text', required: true, label: 'Label (e.g. "Tevreden klanten")' },
      ],
    },
  ],
}
