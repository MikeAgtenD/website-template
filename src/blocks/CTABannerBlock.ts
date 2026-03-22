import type { Block } from 'payload'

export const CTABannerBlock: Block = {
  slug: 'cta-banner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle (optional)',
    },
    {
      name: 'primaryCTA',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Button Text' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
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
      name: 'variant',
      type: 'select',
      label: 'Visual Style',
      defaultValue: 'brand',
      options: [
        { label: 'Brand (primary color)', value: 'brand' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
}
