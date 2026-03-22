import type { Block } from 'payload'

export const ImageTextBlock: Block = {
  slug: 'image-text',
  labels: { singular: 'Image + Text', plural: 'Image + Text Sections' },
  fields: [
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'overline',
      type: 'text',
      label: 'Overline',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action (optional)',
      fields: [
        { name: 'label', type: 'text', label: 'Button Text' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
  ],
}
