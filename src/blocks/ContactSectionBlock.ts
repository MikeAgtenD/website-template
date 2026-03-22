import type { Block } from 'payload'

export const ContactSectionBlock: Block = {
  slug: 'contact-section',
  labels: { singular: 'Contact Section', plural: 'Contact Sections' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro Text',
    },
    {
      name: 'showContactDetails',
      type: 'checkbox',
      label: 'Show contact details alongside form',
      defaultValue: true,
    },
  ],
}
