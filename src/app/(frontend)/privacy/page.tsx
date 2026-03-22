import type { Metadata } from 'next'
import { getPayload } from '@/lib/getPayload'
import { buildMetadata } from '@/lib/seo'
import { PageBanner } from '@/components/sections/PageBanner'
import { SectionContainer } from '@/components/ui/SectionContainer'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

  return buildMetadata({
    title: 'Privacybeleid',
    description: 'Ons privacybeleid.',
    siteName: settings?.siteName ?? 'Website',
    noIndex: true,
  })
}

export default async function PrivacyPage() {
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const siteName = settings?.siteName ?? 'Ons bedrijf'
  const email = (settings?.contact as any)?.email ?? 'info@voorbeeld.be'

  return (
    <>
      <PageBanner
        title="Privacybeleid"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacybeleid' }]}
      />

      <SectionContainer as="article">
        <div className="max-w-3xl mx-auto rich-text">
          <p className="text-neutral-500 text-sm mb-8">Laatste update: {new Date().toLocaleDateString('nl-BE')}</p>

          <h2>1. Wie verwerkt uw gegevens?</h2>
          <p>
            {siteName} verwerkt uw persoonsgegevens als verwerkingsverantwoordelijke. Voor vragen over ons privacybeleid
            kunt u ons bereiken via{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>

          <h2>2. Welke gegevens verzamelen wij?</h2>
          <p>Via ons contactformulier verzamelen wij de volgende gegevens:</p>
          <ul>
            <li>Naam</li>
            <li>E-mailadres</li>
            <li>Telefoonnummer (optioneel)</li>
            <li>De inhoud van uw bericht</li>
          </ul>

          <h2>3. Waarvoor gebruiken wij uw gegevens?</h2>
          <p>Uw gegevens worden uitsluitend gebruikt om uw vraag of verzoek te beantwoorden. Wij delen uw gegevens niet met derden, tenzij dit wettelijk vereist is.</p>

          <h2>4. Hoe lang bewaren wij uw gegevens?</h2>
          <p>Uw gegevens worden niet langer bewaard dan noodzakelijk voor de doeleinden waarvoor ze verzameld zijn, en maximaal 2 jaar na het laatste contact.</p>

          <h2>5. Cookies</h2>
          <p>
            Deze website maakt enkel gebruik van functionele cookies die noodzakelijk zijn voor de werking van de site.
            Er worden geen tracking- of advertentiecookies geplaatst zonder uw toestemming.
          </p>

          <h2>6. Uw rechten</h2>
          <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te laten verwijderen. Stuur hiervoor een e-mail naar{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
          <p>U heeft ook het recht om een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA) op{' '}
            <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer">
              www.gegevensbeschermingsautoriteit.be
            </a>.
          </p>

          <h2>7. Beveiliging</h2>
          <p>
            Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen
            tegen ongeoorloofde toegang, verlies of misbruik.
          </p>
        </div>
      </SectionContainer>
    </>
  )
}
