import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'authorName' },
  access: { read: () => true },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Role / Company (optional)',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating (1–5)',
      min: 1,
      max: 5,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Author Photo (optional)',
    },
  ],
}
