import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  access: { read: () => true },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Navigation Items',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Menu Label' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items (optional)',
          fields: [
            { name: 'label', type: 'text', required: true, label: 'Label' },
            { name: 'url', type: 'text', required: true, label: 'URL' },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Header CTA Button (optional)',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
  ],
}
