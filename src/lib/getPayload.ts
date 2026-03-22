import { getPayload as payloadGetPayload } from 'payload'
import config from '@payload-config'

// Cache the Payload instance across hot reloads in development
let cached: Awaited<ReturnType<typeof payloadGetPayload>> | undefined

export async function getPayload() {
  if (cached) return cached
  cached = await payloadGetPayload({ config })
  return cached
}
