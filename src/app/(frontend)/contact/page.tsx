import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { buildMetadata } from '@/lib/seo'
import { PageBanner } from '@/components/sections/PageBanner'
import { ContactSection } from '@/components/sections/ContactSection'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  return buildMetadata({
    title: 'Contact',
    description: 'Neem contact op met ons.',
    siteName: settings?.siteName ?? 'Website',
  })
}

export default async function ContactPage() {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const contact = (settings?.contact as any) ?? null

  return (
    <>
      <PageBanner
        title="Contact"
        subtitle="Wij horen graag van u."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <ContactSection
        title="Stuur ons een bericht"
        intro="Vul het formulier in en wij nemen zo snel mogelijk contact met u op."
        showContactDetails={true}
        contactDetails={contact}
      />
    </>
  )
}
