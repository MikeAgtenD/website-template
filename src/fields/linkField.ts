import type { Field } from 'payload'

export const linkField = (name = 'link', label = 'Link'): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Button / Link Text',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'URL',
      admin: {
        description: 'Use relative paths (/contact) or full URLs for external links',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in new tab',
      defaultValue: false,
    },
  ],
})
