import { SectionContainer } from '@/components/ui/SectionContainer'
import { ContactForm } from '@/components/forms/ContactForm'

interface ContactDetails {
  phone?: string | null
  email?: string | null
  address?: string | null
  openingHours?: string | null
}

interface ContactSectionProps {
  title?: string | null
  intro?: string | null
  showContactDetails?: boolean | null
  contactDetails?: ContactDetails | null
}

export function ContactSection({ title, intro, showContactDetails, contactDetails }: ContactSectionProps) {
  return (
    <SectionContainer className="bg-neutral-50">
      <div className="text-center mb-12">
        {title && <h2 className="section-title mb-4">{title}</h2>}
        {intro && <p className="section-subtitle max-w-2xl mx-auto">{intro}</p>}
      </div>

      <div
        className={
          showContactDetails && contactDetails
            ? 'grid grid-cols-1 lg:grid-cols-3 gap-10'
            : 'max-w-2xl mx-auto'
        }
      >
        {/* Contact form */}
        <div className={showContactDetails && contactDetails ? 'lg:col-span-2' : ''}>
          <ContactForm />
        </div>

        {/* Contact details sidebar */}
        {showContactDetails && contactDetails && (
          <aside className="space-y-6">
            {contactDetails.phone && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
                  Telefoon
                </p>
                <a href={`tel:${contactDetails.phone}`} className="text-neutral-800 hover:text-brand-primary font-medium">
                  {contactDetails.phone}
                </a>
              </div>
            )}
            {contactDetails.email && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
                  E-mail
                </p>
                <a href={`mailto:${contactDetails.email}`} className="text-neutral-800 hover:text-brand-primary font-medium break-all">
                  {contactDetails.email}
                </a>
              </div>
            )}
            {contactDetails.address && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
                  Adres
                </p>
                <address className="not-italic text-neutral-700 whitespace-pre-line text-sm leading-relaxed">
                  {contactDetails.address}
                </address>
              </div>
            )}
            {contactDetails.openingHours && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
                  Openingsuren
                </p>
                <p className="text-neutral-700 whitespace-pre-line text-sm leading-relaxed">
                  {contactDetails.openingHours}
                </p>
              </div>
            )}
          </aside>
        )}
      </div>
    </SectionContainer>
  )
}
