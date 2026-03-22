/**
 * Seed script — populates the database with realistic demo content.
 * Run: npm run seed
 *
 * Safe to run multiple times: existing records with matching slugs are skipped.
 */

import { getPayload } from 'payload'
import config from '../../payload.config'

async function seed() {
  const payload = await getPayload({ config })
  console.log('🌱  Starting seed...')

  // ─── Admin user ─────────────────────────────────────────────────────────────
  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'Admin1234!',
        name: 'Admin',
      },
    })
    console.log('  ✓ Admin user created (admin@example.com / Admin1234!)')
  }

  // ─── Testimonials ───────────────────────────────────────────────────────────
  const testimonialData = [
    {
      authorName: 'Marie Dupont',
      authorRole: 'Eigenaar woning, Gent',
      quote: 'Uitstekende service en vakmanschap. Het team was professioneel en leverde op tijd. Absolute aanrader!',
      rating: 5,
    },
    {
      authorName: 'Jan Peeters',
      authorRole: 'Zaakvoerder, KMO Brussel',
      quote: 'Snelle reactie, correcte offerte en kwaliteitswerk. We zijn zeer tevreden met het resultaat.',
      rating: 5,
    },
    {
      authorName: 'Sophie Claes',
      authorRole: 'Particulier, Antwerpen',
      quote: 'Vriendelijk en deskundig team. Ze denken mee en stellen goede alternatieven voor. Top ervaring!',
      rating: 5,
    },
  ]

  const createdTestimonialIds: string[] = []
  for (const t of testimonialData) {
    const result = await payload.create({ collection: 'testimonials', data: t as any })
    createdTestimonialIds.push(result.id as string)
  }
  console.log(`  ✓ ${testimonialData.length} testimonials created`)

  // ─── Services ───────────────────────────────────────────────────────────────
  const serviceData = [
    {
      title: 'Installatie & Montage',
      slug: 'installatie-montage',
      shortDescription:
        'Professionele installatie van apparatuur en systemen, van A tot Z begeleid door onze ervaren technici.',
      layout: [
        {
          blockType: 'image-text',
          imagePosition: 'left',
          overline: 'Onze aanpak',
          title: 'Vakkundige installatie op maat',
          content:
            'Met jarenlange ervaring in de sector zorgen wij voor een perfecte installatie, afgestemd op uw specifieke situatie en wensen. Wij werken met kwalitatieve materialen en respecteren elke deadline.',
          cta: { label: 'Vraag een offerte aan', url: '/contact' },
        },
        {
          blockType: 'process',
          overline: 'Hoe werkt het?',
          title: 'Ons installatieproces',
          steps: [
            { title: 'Inspectie & offerte', description: 'We komen ter plaatse voor een gratis inspectie en bezorgen u een duidelijke offerte.' },
            { title: 'Planning', description: 'We plannen de werken op een moment dat u past, zonder onverwachte verrassingen.' },
            { title: 'Uitvoering', description: 'Onze technici voeren de installatie professioneel en net uit.' },
            { title: 'Oplevering', description: 'We leveren op, geven instructies en zorgen voor een perfecte afwerking.' },
          ],
        },
        {
          blockType: 'cta-banner',
          title: 'Klaar voor een vrijblijvende offerte?',
          subtitle: 'Contacteer ons vandaag en wij helpen u verder.',
          primaryCTA: { label: 'Contacteer ons', url: '/contact' },
          variant: 'brand',
        },
      ],
    },
    {
      title: 'Onderhoud & Herstellingen',
      slug: 'onderhoud-herstellingen',
      shortDescription:
        'Regelmatig onderhoud en snelle herstellingen om uw installaties optimaal te houden en pannes te voorkomen.',
      layout: [
        {
          blockType: 'image-text',
          imagePosition: 'right',
          overline: 'Betrouwbaar & snel',
          title: 'Preventief onderhoud en snelle interventie',
          content:
            'Een goed onderhouden installatie werkt efficiënter en gaat langer mee. Wij bieden zowel preventieve onderhoudscontracten als snelle interventie bij storingen.',
          cta: { label: 'Plan een onderhoudsbeurt', url: '/contact' },
        },
        {
          blockType: 'cta-banner',
          title: 'Dringende herstelling nodig?',
          subtitle: 'Wij staan voor u klaar — ook buiten de kantooruren.',
          primaryCTA: { label: 'Bel ons nu', url: '/contact' },
          variant: 'dark',
        },
      ],
    },
    {
      title: 'Advies & Studies',
      slug: 'advies-studies',
      shortDescription:
        'Deskundig advies en technische studies voor uw renovatie- of nieuwbouwproject, met oog voor budgetbeheer.',
      layout: [
        {
          blockType: 'image-text',
          imagePosition: 'left',
          overline: 'Expertise',
          title: 'De juiste keuzes maken van bij het begin',
          content:
            'Een goed project begint bij een doordacht plan. Wij helpen u met technische studies, materialenkeuze en budgetplanning zodat u achteraf geen onaangename verrassingen krijgt.',
          cta: { label: 'Vraag een studiegesprek aan', url: '/contact' },
        },
      ],
    },
  ]

  const createdServiceIds: string[] = []
  for (const s of serviceData) {
    const existing = await payload.find({ collection: 'services', where: { slug: { equals: s.slug } }, limit: 1 })
    if (existing.totalDocs === 0) {
      const result = await payload.create({ collection: 'services', data: s as any })
      createdServiceIds.push(result.id as string)
    } else {
      createdServiceIds.push((existing.docs[0] as any).id as string)
    }
  }
  console.log(`  ✓ ${serviceData.length} services created`)

  // ─── Homepage ────────────────────────────────────────────────────────────────
  const existingHome = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
  if (existingHome.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Home',
        slug: 'home',
        layout: [
          {
            blockType: 'hero',
            overline: 'Welkom',
            title: 'Vakmanschap dat u kunt vertrouwen',
            subtitle:
              'Professionele installatie, onderhoud en advies voor particulieren en bedrijven in de regio. Vraag vandaag nog uw vrijblijvende offerte aan.',
            primaryCTA: { label: 'Onze diensten bekijken', url: '/diensten' },
            secondaryCTA: { label: 'Contacteer ons', url: '/contact' },
          },
          {
            blockType: 'stats',
            items: [
              { value: '15+', label: 'Jaar ervaring' },
              { value: '500+', label: 'Projecten afgerond' },
              { value: '98%', label: 'Tevreden klanten' },
              { value: '24u', label: 'Reactietijd' },
            ],
          },
          {
            blockType: 'services-grid',
            overline: 'Wat wij doen',
            title: 'Onze diensten',
            subtitle: 'Een volledig aanbod van installatie tot onderhoud, steeds met kwaliteit en vakmanschap als prioriteit.',
            columns: '3',
            services: createdServiceIds,
          },
          {
            blockType: 'image-text',
            imagePosition: 'left',
            overline: 'Over ons',
            title: 'Een vertrouwde partner in uw regio',
            content:
              'Al meer dan 15 jaar staan wij voor onze klanten klaar met eerlijk advies, kwaliteitswerk en een persoonlijke aanpak. Als familiebedrijf hechten wij groot belang aan langetermijnrelaties en een vlekkeloze afwerking.',
            cta: { label: 'Meer over ons', url: '/over-ons' },
          },
          {
            blockType: 'testimonials',
            overline: 'Wat klanten zeggen',
            title: 'Tevreden klanten aan het woord',
            testimonials: createdTestimonialIds,
          },
          {
            blockType: 'cta-banner',
            title: 'Klaar om samen te werken?',
            subtitle: 'Neem contact op voor een vrijblijvende offerte of een eerste gesprek.',
            primaryCTA: { label: 'Contacteer ons', url: '/contact' },
            secondaryCTA: { label: 'Onze diensten', url: '/diensten' },
            variant: 'brand',
          },
        ],
        seo: {
          title: 'Home — Vakmanschap dat u kunt vertrouwen',
          description: 'Professionele installatie, onderhoud en advies voor particulieren en bedrijven. Vraag uw vrijblijvende offerte aan.',
        },
      } as any,
    })
    console.log('  ✓ Homepage created')
  }

  // ─── About page ──────────────────────────────────────────────────────────────
  const existingAbout = await payload.find({ collection: 'pages', where: { slug: { equals: 'over-ons' } }, limit: 1 })
  if (existingAbout.totalDocs === 0) {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Over ons',
        slug: 'over-ons',
        layout: [
          {
            blockType: 'image-text',
            imagePosition: 'left',
            overline: 'Ons verhaal',
            title: 'Een familiebedrijf met passie voor vakmanschap',
            content:
              'Opgericht in 2009 door Jan en Marie Janssen, is ons bedrijf uitgegroeid tot een gerenommeerde speler in de sector. Wij werken met een vast team van gecertificeerde technici en leggen de nadruk op kwaliteit, eerlijkheid en langetermijnrelaties met onze klanten.\n\nOns doel is eenvoudig: elke klant tevreden naar huis sturen met een installatie of dienst die zijn geld meer dan waard is.',
            cta: { label: 'Onze diensten bekijken', url: '/diensten' },
          },
          {
            blockType: 'stats',
            items: [
              { value: '15+', label: 'Jaar ervaring' },
              { value: '8', label: 'Medewerkers' },
              { value: '500+', label: 'Afgewerkte projecten' },
              { value: '3', label: 'Provincies actief' },
            ],
          },
          {
            blockType: 'process',
            overline: 'Onze waarden',
            title: 'Waarom klanten ons kiezen',
            steps: [
              { title: 'Kwaliteit boven alles', description: 'Wij werken enkel met gecertificeerde materialen en volgen alle veiligheidsnormen strikt op.' },
              { title: 'Transparantie', description: 'Heldere offertes zonder verborgen kosten. U weet altijd waar u aan toe bent.' },
              { title: 'Persoonlijke aanpak', description: 'Elk project is uniek. Wij luisteren naar uw wensen en passen onze aanpak aan.' },
              { title: 'Snelle service', description: 'Wij reageren snel op uw aanvraag en plannen werken in op een moment dat u past.' },
            ],
          },
          {
            blockType: 'testimonials',
            overline: 'Referenties',
            title: 'Wat onze klanten zeggen',
            testimonials: createdTestimonialIds,
          },
        ],
        seo: {
          title: 'Over ons',
          description: 'Leer ons familiebedrijf kennen. Meer dan 15 jaar ervaring in installatie, onderhoud en advies.',
        },
      } as any,
    })
    console.log('  ✓ About page created')
  }

  // ─── Site Settings global ────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Janssen Technieken',
      logoText: 'Janssen Technieken',
      tagline: 'Vakmanschap dat u kunt vertrouwen.',
      contact: {
        phone: '+32 11 00 00 00',
        email: 'info@janssen-technieken.be',
        address: 'Voorbeeldstraat 12\n3500 Hasselt\nBelgië',
        openingHours: 'Ma–Vr: 08:00–17:30\nZa: 09:00–12:00 (op afspraak)',
      },
      social: {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
      },
      defaultSeo: {
        title: 'Janssen Technieken — Vakmanschap dat u kunt vertrouwen',
        description: 'Professionele installatie, onderhoud en advies voor particulieren en bedrijven in de regio.',
      },
    } as any,
  })
  console.log('  ✓ Site settings updated')

  // ─── Navigation global ───────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      items: [
        { label: 'Home', url: '/' },
        { label: 'Diensten', url: '/diensten' },
        { label: 'Over ons', url: '/over-ons' },
        { label: 'Contact', url: '/contact' },
      ],
      ctaButton: { label: 'Offerte aanvragen', url: '/contact' },
    } as any,
  })
  console.log('  ✓ Navigation updated')

  // ─── Footer global ───────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'footer-settings',
    data: {
      intro: 'Uw betrouwbare partner voor installatie, onderhoud en advies. Al meer dan 15 jaar actief in de regio.',
      navItems: [
        { label: 'Home', url: '/' },
        { label: 'Diensten', url: '/diensten' },
        { label: 'Over ons', url: '/over-ons' },
        { label: 'Contact', url: '/contact' },
      ],
      legalItems: [
        { label: 'Privacybeleid', url: '/privacy' },
        { label: 'Sitemap', url: '/sitemap.xml' },
      ],
    } as any,
  })
  console.log('  ✓ Footer settings updated')

  console.log('\n✅  Seed complete!')
  console.log('   Admin panel: http://localhost:3000/admin')
  console.log('   Login: admin@example.com / Admin1234!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err)
  process.exit(1)
})
