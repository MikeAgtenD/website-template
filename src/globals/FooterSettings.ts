import type { GlobalConfig } from 'payload'

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  label: 'Footer',
  access: { read: () => true },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      label: 'Footer Intro Text (shown below logo)',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Footer Navigation Links',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
    {
      name: 'legalItems',
      type: 'array',
      label: 'Legal / Subfooter Links (e.g. Privacy Policy, Sitemap)',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Label' },
        { name: 'url', type: 'text', required: true, label: 'URL' },
      ],
    },
  ],
}
