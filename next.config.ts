import { withPayload } from '@payloadcms/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '*.vercel.app' },
    ],
  },
}

export default withPayload(nextConfig)
