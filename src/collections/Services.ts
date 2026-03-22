import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seoFields'
import { ImageTextBlock } from '../blocks/ImageTextBlock'
import { CTABannerBlock } from '../blocks/CTABannerBlock'
import { ProcessBlock } from '../blocks/ProcessBlock'
import { FAQBlock } from '../blocks/FAQBlock'
import { RichTextBlock } from '../blocks/RichTextBlock'
import { StatsBlock } from '../blocks/StatsBlock'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: { description: 'Used on cards and overviews. Max ~160 characters.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Feature Image',
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Service Page Sections',
      blocks: [ImageTextBlock, ProcessBlock, CTABannerBlock, FAQBlock, RichTextBlock, StatsBlock],
    },
    ...seoFields,
  ],
}
