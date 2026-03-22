import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'overline',
      type: 'text',
      label: 'Overline (small text above title)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title (H1)',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle / Intro text',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      label: 'Secondary Button (optional)',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Background Image',
    },
  ],
}
