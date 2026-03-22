import type { CollectionConfig } from 'payload'
import { seoFields } from '../fields/seoFields'
import { HeroBlock } from '../blocks/HeroBlock'
import { ServicesGridBlock } from '../blocks/ServicesGridBlock'
import { ImageTextBlock } from '../blocks/ImageTextBlock'
import { CTABannerBlock } from '../blocks/CTABannerBlock'
import { ProcessBlock } from '../blocks/ProcessBlock'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { FAQBlock } from '../blocks/FAQBlock'
import { StatsBlock } from '../blocks/StatsBlock'
import { RichTextBlock } from '../blocks/RichTextBlock'
import { ContactSectionBlock } from '../blocks/ContactSectionBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
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
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Used in the URL. Use "home" for the homepage.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Sections',
      blocks: [
        HeroBlock,
        ServicesGridBlock,
        ImageTextBlock,
        CTABannerBlock,
        ProcessBlock,
        TestimonialsBlock,
        FAQBlock,
        StatsBlock,
        RichTextBlock,
        ContactSectionBlock,
      ],
    },
    ...seoFields,
  ],
}
