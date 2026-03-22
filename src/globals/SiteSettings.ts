import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: { read: () => true },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      label: 'Site Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo Image',
    },
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo Text (displayed when no logo image is set)',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline / Short Description',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Details',
      fields: [
        { name: 'phone', type: 'text', label: 'Phone Number' },
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'address', type: 'textarea', label: 'Address' },
        { name: 'openingHours', type: 'textarea', label: 'Opening Hours' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO (used when page has no custom SEO)',
      fields: [
        { name: 'title', type: 'text', label: 'Default Meta Title' },
        { name: 'description', type: 'textarea', label: 'Default Meta Description' },
        { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Default OG Image' },
      ],
    },
  ],
}
