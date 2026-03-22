import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'

type Args = {
  params: Promise<{ segments?: string[] }>
}

export const generateMetadata = ({ params }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params })

const Page = ({ params }: Args) => RootPage({ config, params })

export default Page
