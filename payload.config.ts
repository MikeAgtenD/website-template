import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Pages } from './src/collections/Pages'
import { Services } from './src/collections/Services'
import { Testimonials } from './src/collections/Testimonials'
import { SiteSettings } from './src/globals/SiteSettings'
import { Navigation } from './src/globals/Navigation'
import { FooterSettings } from './src/globals/FooterSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— DH Website Starter',
    },
  },

  collections: [Users, Media, Pages, Services, Testimonials],

  globals: [SiteSettings, Navigation, FooterSettings],

  editor: lexicalEditor({}),

  // SQLite: zero-config for development.
  // For production, swap to @payloadcms/db-postgres or @payloadcms/db-mongodb.
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),

  secret: process.env.PAYLOAD_SECRET || 'dev-fallback-secret-change-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },

  upload: {
    limits: {
      fileSize: 5_000_000, // 5 MB
    },
  },
})
